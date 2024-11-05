import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { getArticleById } from "../utils/api";

const SingleArticle = () =>{
  const { article_id } = useParams()
  const [article, setArticle] = useState({})

  useEffect(()=>{
    getArticleById(article_id).then((articleData)=>{
      setArticle(articleData)
    })
  }, [article_id])

  return (
    <div id='single-article'>
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <img id="single-article-img" src={article.article_img_url} alt="image" />
      <p>{article.body}</p>
      <p>Created by {article.author} at {article.created_at}</p>
      <Link to={`/articles/${article_id}/comments`}>Comments: {article.comment_count}</Link>
      <p>Votes: {article.votes}</p>
    </div>
  )
}

export default SingleArticle