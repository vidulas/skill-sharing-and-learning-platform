import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import likeService from '../../services/likeService';
import './LikeButton.css';

const LikeButton = ({ postId, onLikeToggle }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user already liked this post
    const checkIfLiked = async () => {
      try {
        const response = await likeService.checkIfUserLikedPost(postId);
        setLiked(response.data);
      } catch (error) {
        console.error('Error checking if post is liked:', error);
      }
    };

    checkIfLiked();
  }, [postId]);

  const handleToggleLike = async () => {
    setIsLoading(true);
    try {
      await likeService.toggleLike(postId);
      setLiked(!liked);
      
      // Notify parent component
      if (onLikeToggle) {
        onLikeToggle();
      }
      
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`like-button ${liked ? 'liked' : ''}`} 
      onClick={handleToggleLike}
      disabled={isLoading}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
