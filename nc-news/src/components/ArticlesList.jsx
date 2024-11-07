import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from '../utils/api'


const ArticlesList = ()=>{
  const [articles, setArticles] = useState([])
  const [topics, setTopics] = useState([]); 
  const [selectedTopic, setSelectedTopic] = useState(''); 

  useEffect(()=>{
    getArticles().then((articles)=>{
      setArticles(articles)
    })
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
  }, [])

  const filteredArticles = selectedTopic 
    ? articles.filter(article => article.topic === selectedTopic)
    : articles;

    return (
      <div id='articles-list'>
        <h2>Articles</h2>
        <label htmlFor="topics-filter">Filter by Topic:</label>
        <select 
          id="topic-filter" 
          value={selectedTopic} 
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">All topics</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
  
        <ul>
          {filteredArticles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    );
  };

export default ArticlesList