import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { getArticleById, voteOnArticle } from "../utils/api";

const SingleArticle = () =>{
  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false);
    }).catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }, [article_id]);



  const handleVote = (vote) => {
    voteOnArticle(article_id, vote)
      .then((updatedArticle) => {
        setArticle((previousArticle) => ({
          ...previousArticle,
          votes: updatedArticle.votes
        }));
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error loading article: {error.message}</p>;

  return (
    <div id='single-article'>
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <img id="single-article-img" src={article.article_img_url} alt="image" />
      <p>{article.body}</p>
      <p>Created by {article.author} at {article.created_at}</p>
      <Link to={`/articles/${article_id}/comments`}>Comments: {article.comment_count}</Link>
      <p>Votes: {article.votes}</p>
      <button onClick={() => handleVote(1)}>Upvote</button>
      <button onClick={() => handleVote(-1)}>Downvote</button>
    </div>
  )
}

export default SingleArticle