import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../utils/api";

const CommentsPage = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((commentsData) => {
      setComments(commentsData);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <div id='comments-page'>
      <h2>Comments for Article {article_id}</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p><strong>{comment.author}</strong>: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPage;
