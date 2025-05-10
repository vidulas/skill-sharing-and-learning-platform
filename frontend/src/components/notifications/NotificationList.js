import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import notificationService from '../../services/notificationService';
import './NotificationList.css';

const NotificationList = ({ autoRefresh = true, compact = false, refreshTrigger = 0, showAllTypes = true }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'mentions', 'comments', 'likes'

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications more frequently if autoRefresh is enabled
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchNotifications, 3000); // Every 3 seconds for more responsive updates
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshTrigger, activeFilter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      let response;
      
      // Use the appropriate API based on filter
      switch (activeFilter) {
        case 'likes':
          response = await notificationService.getLikeNotifications();
          break;
        case 'comments':
          response = await notificationService.getCommentNotifications();
          break;
        case 'mentions':
          response = await notificationService.getUserNotifications('MENTION');
          break;
        case 'all':
        default:
          response = await notificationService.getUserNotifications();
          break;
      }
      
      setNotifications(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          read: true
        }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className={`notification-container ${compact ? 'compact' : ''}`}>
      {!compact && (
        <div className="notification-header">
          <h2>Notifications {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}</h2>
          <div className="notification-actions">
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={handleMarkAllAsRead}>
                Mark all as read
              </button>
            )}
            <button className="refresh-button" onClick={fetchNotifications}>
              Refresh
            </button>
          </div>
        </div>
      )}
      
      {!compact && (
        <div className="notification-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveFilter('comments')}
          >
            Comments
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'likes' ? 'active' : ''}`}
            onClick={() => setActiveFilter('likes')}
          >
            Likes
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'mentions' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mentions')}
          >
            Mentions
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="loading">Loading notifications...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="empty-message">
          You have no notifications. When someone likes or comments on your post, you'll see it here.
        </div>
      ) : (
        <div className={`notification-list ${compact ? 'compact' : ''}`}>
          {notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              notification={notification}
              onMarkAsRead={handleNotificationRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
