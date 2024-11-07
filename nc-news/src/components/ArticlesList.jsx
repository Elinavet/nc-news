import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from '../utils/api';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTopic = searchParams.get("topic") || "";
  const sort = searchParams.get("sort") || "created_at_up";

  useEffect(() => {
    setLoading(true);  
    setError(null);  

    Promise.all([getArticles(selectedTopic, sort), getTopics()])
      .then(([articlesData, topicsData]) => {

        if (selectedTopic && !topicsData.some(topic => topic.slug === selectedTopic)) {
          setError(`Topic "${selectedTopic}" does not exist.`);
        } else {
          setTopics(topicsData);
        }
        if (articlesData.length === 0) {
          setError("No articles found.");
        } else {
          setArticles(articlesData);
        }

        setLoading(false); 
      })
      .catch((err) => {
        setError("Error fetching articles or topics, please try again later.");
        setLoading(false); 
      });
  }, [selectedTopic, sort]);

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSearchParams({ topic, sort });
  };

  const handleSortChange = (e) => {
    setSearchParams({ topic: selectedTopic, sort: e.target.value });
  };

  const filteredArticles = selectedTopic
    ? articles.filter(article => article.topic === selectedTopic)
    : articles;

  return (
    <div id='articles-list'>
      <h2>Articles</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

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

      {filteredArticles.length === 0 && !loading && <p>No articles found</p>}

      <ul>
        {filteredArticles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </div>
  );
};

export default ArticlesList;
