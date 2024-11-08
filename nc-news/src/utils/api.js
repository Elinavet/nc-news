import axios from "axios"

const api = axios.create({
    baseURL: 'https://my-first-project-the8.onrender.com/api'
})

const getArticles = (topic = "", sort = "created_at_up") => {
  const sortMapping = {
    created_at_up: { sortBy: 'created_at', order: 'asc' },
    created_at_down: { sortBy: 'created_at', order: 'desc' },
    votes_up: { sortBy: 'votes', order: 'asc' },
    votes_down: { sortBy: 'votes', order: 'desc' },
    title_up: {sortBy: 'title', order: 'asc'},
    title_down: {sortBy: 'title', order: 'desc'},
  };

  const { sortBy, order } = sortMapping[sort] || sortMapping['created_at_up'];  

  return api.get('/articles', { 
    params: {
      topic,
      sort_by: sortBy,    
      order: order        
    }
  })
  .then(({ data }) => {
    return data.articles;
  })
  .catch((error) => {
    console.error("Error fetching articles:", error.response ? error.response.data : error);
    throw error; 
  });
};

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

const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`)
    .then(({ data }) => {
      return data;
    });
};

const getTopics = () => {
  return api.get('/topics') 
  .then(({ data }) => {
    return data.topics;
  });
};

const getUsers = () => {
  return api.get('/users') 
    .then(({ data }) => {
      return data.users; 
    })
    .catch((error) => {
      console.error("Failed to fetch users:", error);
      throw error;
    });
};

export { getArticles, getArticleById, getCommentsByArticleId, voteOnArticle, getUserByUsername, postComment, deleteComment, getTopics, getUsers }