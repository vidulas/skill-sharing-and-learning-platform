import api from './api';

const commentService = {
  getCommentsByPostId: (postId) => {
    return api.get(`/comments/post/${postId}`);
  },
  
  addComment: (postId, content, parentId = null) => {
    console.log('Sending comment data:', { postId, content, parentId });
    return api.post('/comments', { postId, content, parentId })
      .then(response => {
        console.log('Comment added successfully:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error adding comment:', error.response ? error.response.data : error.message);
        throw error;
      });
  },
  
  updateComment: (commentId, content) => {
    return api.put(`/comments/${commentId}`, { content });
  },
  
  deleteComment: (commentId) => {
    return api.delete(`/comments/${commentId}`);
  }
};

export default commentService;
