import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';
import './CommentList.css';

const CommentList = ({ postId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await commentService.getCommentsByPostId(postId);
        console.log('Comments received:', response.data);
        
        // Organize comments into a nested structure
        const rootComments = response.data.filter(comment => !comment.parentId);
        const commentMap = response.data.reduce((map, comment) => {
          map[comment.id] = { ...comment, replies: [] };
          return map;
        }, {});
        
        response.data.forEach(comment => {
          if (comment.parentId && commentMap[comment.parentId]) {
            commentMap[comment.parentId].replies.push(commentMap[comment.id]);
          }
        });
        
        const organizedComments = rootComments.map(comment => commentMap[comment.id]);
        console.log('Organized comments:', organizedComments);
        setComments(organizedComments);
        setError(null);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, refreshKey]);

  const refreshComments = () => {
    setRefreshKey(prevKey => prevKey + 1);
    // Call the parent component's callback if provided
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <CommentForm postId={postId} onCommentAdded={refreshComments} />
      
      {loading ? (
        <div>Loading comments...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                postId={postId}
                onCommentUpdated={refreshComments}
              />
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList;
