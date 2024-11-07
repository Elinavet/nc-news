import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from '../utils/api'


const ArticlesList = ()=>{
  const [articles, setArticles] = useState([])
  const [topics, setTopics] = useState([]); 
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get("topic") || "";
  const sort = searchParams.get("sort") || "date_up";

  useEffect(()=>{
    getArticles(selectedTopic, sort).then((articles)=>{
      setArticles(articles)
    })
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
  }, [selectedTopic, sort])

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSearchParams({ topic, sort });
  }

  const handleSortChange = (e) => {
    setSearchParams({ topic: selectedTopic, sort: e.target.value });
  };

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
          onChange={handleTopicChange}
        >
          <option value="">All topics</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>

        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="created_at_up">Date (Ascending)</option>
          <option value="created_at_down">Date (Descending)</option>
          <option value="votes_up">Votes (Ascending)</option>
          <option value="votes_down">Votes (Descending)</option>
          <option value="title_up">Title (A-Z)</option>
          <option value="title_down">Title (Z-A)</option>
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