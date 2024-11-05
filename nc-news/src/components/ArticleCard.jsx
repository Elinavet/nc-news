import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <section className='article-card'>
      <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
      <p>Topics:{article.topic}</p>
    </section>
  );
}

export default ArticleCard;