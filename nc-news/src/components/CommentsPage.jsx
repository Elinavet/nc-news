import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, postComment } from "../utils/api";
import { useUser } from "../components/UserContext";

const CommentsPage = () => {
  const { article_id } = useParams();
  const { user } = useUser()
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error loading comments");
        setIsLoading(false);
      });
  }, [article_id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      setError("You must be signed in to comment");
      return;
    }

    const commentData = {
      body: newComment,
      username: user.username,
    };

    postComment(article_id, commentData)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]); 
        setNewComment(""); 
      })
      .catch((err) => {
        setError("Error posting comment");
      });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id='comments-page'>
      <h2>Comments for Article {article_id}</h2>
      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment here..."
            required
          />
          <button type="submit">Submit Comment</button>
        </form>
      ) : (
        <p>You must be signed in to comment.</p>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p><strong>{comment.author}</strong>: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>{comment.created_at}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPage;
