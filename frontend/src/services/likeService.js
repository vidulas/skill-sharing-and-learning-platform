import api from './api';

const likeService = {
  getLikesByPostId: (postId) => {
    return api.get(`/likes/post/${postId}`);
  },
  
  toggleLike: (postId) => {
    return api.post(`/likes/toggle/${postId}`);
  },
  
  checkIfUserLikedPost: (postId) => {
    return api.get(`/likes/check/${postId}`);
  }
};

export default likeService;
