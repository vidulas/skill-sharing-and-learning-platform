import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import notificationService from '../../services/notificationService';
import './NotificationList.css';

const NotificationList = ({ autoRefresh = true, compact = false, refreshTrigger = 0 }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications more frequently if autoRefresh is enabled
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchNotifications, 5000); // Every 5 seconds for more responsive updates
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshTrigger]); // Add refreshTrigger dependency

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getUserNotifications();
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
          {unreadCount > 0 && (
            <button className="mark-all-read" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
          <button className="refresh-button" onClick={fetchNotifications}>
            Refresh
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
