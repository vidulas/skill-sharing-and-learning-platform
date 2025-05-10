import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaUser, FaAt, FaReply } from 'react-icons/fa';
import moment from 'moment';
import './NotificationItem.css';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'LIKE':
      case 'SELF_LIKE':
        return <FaHeart className={`notification-icon ${notification.type.includes('SELF') ? 'self-action' : 'like'}`} />;
      case 'COMMENT':
      case 'SELF_COMMENT':
        return <FaComment className={`notification-icon ${notification.type.includes('SELF') ? 'self-action' : 'comment'}`} />;
      case 'REPLY':
      case 'SELF_REPLY':
        return <FaReply className={`notification-icon ${notification.type.includes('SELF') ? 'self-action' : 'reply'}`} />;
      case 'FOLLOW':
        return <FaUser className="notification-icon follow" />;
      case 'MENTION':
        return <FaAt className="notification-icon mention" />;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Link 
      to={notification.link} 
      className={`notification-item ${!notification.read ? 'unread' : ''}`}
      onClick={handleClick}
    >
      <div className="notification-icon-container">
        {getNotificationIcon()}
      </div>
      <div className="notification-content">
        <div className="notification-message">{notification.message}</div>
        <div className="notification-time">{moment(notification.createdAt).fromNow()}</div>
      </div>
      {!notification.read && <div className="unread-indicator"></div>}
    </Link>
  );
};

export default NotificationItem;
