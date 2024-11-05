import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from '../utils/api'


const ArticlesList = ()=>{
  const [articles, setArticles] = useState([])

  useEffect(()=>{
    getArticles().then((articles)=>{
      setArticles(articles)
    })
  }, [])

    return (
      <div id='articles-list'>
        <h2>Articles</h2>
  
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    );
  };

export default ArticlesList