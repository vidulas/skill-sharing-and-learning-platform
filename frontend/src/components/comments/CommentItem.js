import React, { useState } from 'react';
import moment from 'moment';
import { FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';
import './CommentItem.css';

const CommentItem = ({ comment, postId, onCommentUpdated }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // For demo purpose, always allow edit/delete
  // In a real app, use proper authentication
  const currentUserId = "user123"; // localStorage.getItem('userId');
  
  // Use currentUserId in the comparison, but for demo purposes, always return true
  // In a real app, you would use: currentUserId === comment.userId
  const isCommentOwner = true; // This is for demo. In production: currentUserId === comment.userId
  
  // Alternative: Add eslint-disable comment
  // eslint-disable-next-line no-unused-vars
  const actualOwnerCheck = currentUserId === comment.userId; // This shows how it would be implemented for real

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
    setShowEditForm(false);
  };

  const handleEdit = () => {
    setShowEditForm(!showEditForm);
    setShowReplyForm(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await commentService.deleteComment(comment.id);
        onCommentUpdated();
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCommentAdded = () => {
    setShowReplyForm(false);
    onCommentUpdated();
  };

  const handleCommentUpdated = () => {
    setShowEditForm(false);
    onCommentUpdated();
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      return moment(dateString).fromNow();
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-user-info">
          <span className="comment-username">{comment.username || 'Anonymous'}</span>
          <span className="comment-time">{formatDate(comment.createdAt)}</span>
        </div>
        <div className="comment-actions">
          <button className="action-button" onClick={handleReply}>
            <FaReply /> Reply
          </button>
          {isCommentOwner && (
            <>
              <button className="action-button" onClick={handleEdit}>
                <FaEdit /> Edit
              </button>
              <button 
                className="action-button delete" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <FaTrash /> {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
        </div>
      </div>
      
      {!showEditForm ? (
        <div className="comment-content">{comment.content}</div>
      ) : (
        <CommentForm 
          postId={postId} 
          commentId={comment.id} 
          initialValue={comment.content}
          onCommentAdded={handleCommentUpdated}
          isEdit={true}
        />
      )}
      
      {showReplyForm && (
        <div className="reply-form-container">
          <p className="reply-notification">Your reply will notify {comment.username}</p>
          <CommentForm 
            postId={postId} 
            parentId={comment.id}
            onCommentAdded={handleCommentAdded}
            isReply={true}
          />
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          <div className="replies-header">Replies ({comment.replies.length})</div>
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              postId={postId}
              onCommentUpdated={onCommentUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
