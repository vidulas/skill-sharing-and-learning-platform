import React, { useState, useEffect } from 'react';
import LikeButton from '../likes/LikeButton';
import LikeCounter from '../likes/LikeCounter';
import CommentList from '../comments/CommentList';
import NotificationList from '../notifications/NotificationList';
import notificationService from '../../services/notificationService';
import { FaBell } from 'react-icons/fa';
import './PostItem.css';

const PostItem = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [refreshLikes, setRefreshLikes] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [refreshNotifications, setRefreshNotifications] = useState(0);

  useEffect(() => {
    // Poll for new notifications every 30 seconds
    const fetchUnreadCount = async () => {
      try {
        const response = await notificationService.getUnreadCount();
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, [refreshNotifications]); // Add refreshNotifications to the dependency array

  const handleLikeToggle = () => {
    setRefreshLikes(prev => prev + 1);
    
    // Force immediate notification refresh with a short delay to allow backend processing
    setTimeout(() => {
      setRefreshNotifications(prev => prev + 1);
      fetchUnreadCount();
    }, 300);
  };

  const handleCommentAdded = () => {
    // Force immediate notification refresh with a short delay to allow backend processing
    setTimeout(() => {
      setRefreshNotifications(prev => prev + 1);
      fetchUnreadCount();
    }, 300);
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // If we're showing notifications, mark all as read
      notificationService.markAllAsRead()
        .then(() => setUnreadCount(0))
        .catch(error => console.error('Error marking notifications as read:', error));
    }
  };

  // Make sure post.id is valid
  const postId = post.id || '1'; // Use a default ID if none exists

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="post-author">
          <img src={post.authorAvatar || '/default-avatar.png'} alt={post.authorName} />
          <div className="author-info">
            <h3>{post.authorName}</h3>
            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="notification-icon" onClick={toggleNotifications}>
          <FaBell />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>
      </div>
      
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-text">{post.content}</p>
        {post.imageUrl && (
          <div className="post-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}
      </div>
      
      <div className="post-actions">
        <div className="like-section">
          <LikeButton postId={postId} onLikeToggle={handleLikeToggle} />
          <LikeCounter postId={postId} refreshTrigger={refreshLikes} />
        </div>
        
        <button className="comment-toggle" onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
      
      {showComments && (
        <CommentList 
          postId={postId} 
          onCommentAdded={handleCommentAdded} 
        />
      )}
      
      {showNotifications && (
        <div className="notification-popup">
          <div className="notification-popup-header">
            <h3>Notifications</h3>
            <button onClick={toggleNotifications}>Close</button>
          </div>
          <div className="notification-popup-content">
            <NotificationList 
              compact={true} 
              autoRefresh={true} 
              refreshTrigger={refreshNotifications}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
