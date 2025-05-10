import React, { useState } from 'react';
import commentService from '../../services/commentService';
import './CommentForm.css';

const CommentForm = ({ 
  postId, 
  parentId = null, 
  commentId = null,
  initialValue = '', 
  onCommentAdded,
  isReply = false,
  isEdit = false
}) => {
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Form submission data:', { 
        postId, content, parentId, isEdit, commentId 
      });
      
      if (isEdit) {
        await commentService.updateComment(commentId, content);
      } else {
        await commentService.addComment(postId, content, parentId);
      }
      
      setContent('');
      if (onCommentAdded) {
        // Ensure notification refresh is triggered
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    if (isReply) return "Write a reply... (use @username to mention someone)";
    if (isEdit) return "Edit your comment...";
    return "Write a comment... (use @username to mention someone)";
  };

  return (
    <form className={`comment-form ${isReply ? 'reply-form' : ''}`} onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <textarea
        className="comment-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={getPlaceholder()}
        rows={isReply ? 2 : 3}
        required
      />
      <div className="form-actions">
        {!isEdit && (
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => {
              setContent('');
              setError(null);
              if (onCommentAdded) onCommentAdded();
            }}
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : isReply ? 'Reply' : 'Comment'}
        </button>
      </div>
      {content.includes('@') && (
        <div className="mention-hint">
          You can mention users with @username. They will be notified.
        </div>
      )}
    </form>
  );
};

export default CommentForm;
