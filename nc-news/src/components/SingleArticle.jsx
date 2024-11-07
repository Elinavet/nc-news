import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, voteOnArticle } from "../utils/api";
import { useUser } from "../components/UserContext";

const SingleArticle = () => {
  const { article_id } = useParams();
  const { user } = useUser(); 
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null); 

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);

        if (user) {
          const storedVote = localStorage.getItem(`userVote-${user.username}-${article_id}`);
          setUserVote(storedVote ? JSON.parse(storedVote) : null); 
        }
      })
      .catch((err) => {
        setError("Article not found.");
        setIsLoading(false);
      });
  }, [article_id, user]); 
  const handleVote = (vote) => {
    if (!user) {
      setError("You must be signed in to vote.");
      return;
    }

    if (userVote !== null) {
      return;
    }

    setUserVote(vote);
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + vote,
    }));
    localStorage.setItem(`userVote-${user.username}-${article_id}`, JSON.stringify(vote)); 

    voteOnArticle(article_id, vote)
    .then((updatedArticle) => {
      setArticle((prevArticle) => ({
        ...updatedArticle,
        comment_count: prevArticle.comment_count,
      }));
    })
    .catch((err) => {
      setError("Error voting on article");
      setUserVote(null);
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - vote,
      }));
    });
  };

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error loading article: {error}</p>;

  return (
    <div id="single-article">
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <img id="single-article-img" src={article.article_img_url} alt="image" />
      <p>{article.body}</p>
      <p>Created by {article.author} at {article.created_at}</p>
      <Link to={`/articles/${article_id}/comments`}>Comments: {article.comment_count}</Link>
      <p>Votes: {article.votes}</p>
      <div>
        {user ? (
          <>
            <button
              onClick={() => handleVote(1)}
              disabled={userVote !== null} 
            >
              Upvote
            </button>
            {userVote !== null && <p>You have already voted</p>} 
          </>
        ) : (
          <p>You must be signed in to vote</p>
        )}
      </div>
    </div>
  );
};

export default SingleArticle;

