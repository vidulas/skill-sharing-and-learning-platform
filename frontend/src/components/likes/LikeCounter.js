import React, { useState, useEffect } from 'react';
import likeService from '../../services/likeService';
import './LikeCounter.css';

const LikeCounter = ({ postId, refreshTrigger }) => {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await likeService.getLikesByPostId(postId);
        setLikeCount(response.data.length);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikes();
  }, [postId, refreshTrigger]);

  return (
    <div className="like-counter">
      {likeCount} {likeCount === 1 ? 'like' : 'likes'}
    </div>
  );
};

export default LikeCounter;
