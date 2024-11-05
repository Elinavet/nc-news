import axios from "axios"

const api = axios.create({
    baseURL: 'https://my-first-project-the8.onrender.com/api'
})

const getArticles = ()=>{
  return api.get('/articles').then(({data})=>{
    return data.articles
  })
}

const getArticleById = (id)=>{
  return api.get(`/articles/${id}`).then(({data})=>{
    return data.article
  })
}

const getCommentsByArticleId = (articleId) => {
  return api.get(`/articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export { getArticles, getArticleById, getCommentsByArticleId }