import { Link } from 'react-router-dom';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-UK", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

function ArticleCard({ article }) {
  return (
    <section className='article-card'>
      <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
      <p>Topics:{article.topic}</p>
      <p>Author: {article.author}</p>
      <p>Data: {formatDate(article.created_at)}</p>
      <img id="single-article-img" src={article.article_img_url} alt="image" />
    </section>
  );
}

export default ArticleCard;