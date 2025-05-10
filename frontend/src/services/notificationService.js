import api from './api';

const notificationService = {
  getUserNotifications: (type = null) => {
    if (type) {
      return api.get(`/notifications?type=${type}`);
    }
    return api.get('/notifications');
  },
  
  markAsRead: (notificationId) => {
    return api.post(`/notifications/${notificationId}/read`);
  },
  
  markAllAsRead: () => {
    return api.post('/notifications/read-all');
  },
  
  getUnreadCount: () => {
    return api.get('/notifications/unread-count');
  },
  
  getUnreadNotifications: () => {
    return api.get('/notifications/unread');
  },
  
  getLikeNotifications: () => {
    return api.get('/notifications?type=LIKE');
  },
  
  getCommentNotifications: () => {
    return api.get('/notifications?type=COMMENT,REPLY');
  },

  // Get self action notifications
  getSelfNotifications: () => {
    return api.get('/notifications?type=SELF_LIKE,SELF_COMMENT,SELF_REPLY');
  },

  // For demo purposes - create a test notification
  createTestNotification: (type = 'COMMENT') => {
    return api.post('/notifications/test', { type });
  },

  // For demo purposes - create a self notification
  createSelfNotification: (type = 'SELF_COMMENT') => {
    return api.post('/notifications/test-self-notification', { type });
  }
};

export default notificationService;
