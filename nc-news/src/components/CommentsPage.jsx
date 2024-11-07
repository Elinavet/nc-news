import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, postComment, deleteComment } from "../utils/api";
import { useUser } from "../components/UserContext";

const CommentsPage = () => {
  const { article_id } = useParams();
  const { user } = useUser()
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

    setIsSubmitting(true); 

    const commentData = {
      body: newComment,
      username: user.username,
    };

    postComment(article_id, commentData)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]); 
        setNewComment(""); 
        setIsSubmitting(false);
      })
      .catch((err) => {
        setError("Error posting comment");
        setIsSubmitting(false);
      });
  };

  const handleDeleteComment = (commentId) => {
    setIsDeleting(true);
    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
        setIsDeleting(false);
      })
      .catch((err) => {
        setError("Error deleting comment");
        setIsDeleting(false);
      });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id='comments-page'>
      <h2>Comments</h2>
      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment here..."
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
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
            {user && user.username === comment.author && (
              <>
                <button id="delete-button"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={isDeleting} 
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                {isDeleting && <p>Deleting...</p>}
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPage;
