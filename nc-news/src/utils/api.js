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

const voteOnArticle = (articleId, vote) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: vote })
    .then(({ data }) => {
      return data.article; 
    });
};

const getUserByUsername = (username) => {
  return api.get(`/users/${username}`).then(({ data }) => {
    return data.user; 
  });
};

const postComment = (articleId, commentData) => {
  return api.post(`/articles/${articleId}/comments`, commentData).then(({ data }) => {
    return data.comment;
  });
};

export { getArticles, getArticleById, getCommentsByArticleId, voteOnArticle, getUserByUsername, postComment }