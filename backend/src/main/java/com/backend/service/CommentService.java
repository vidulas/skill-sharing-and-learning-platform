package com.backend.service;

import com.backend.model.Comment;
import com.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private PostService postService; // You'll need to create this service

    // Fetch all comments
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    
    // Get comments by post ID
    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    // Add a new comment
    public Comment addComment(Comment comment) {
        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(LocalDateTime.now());
        }
        comment.setUpdatedAt(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);
        
        // Create notification
        String postId = comment.getPostId();
        String parentId = comment.getParentId();
        String userId = comment.getUserId();
        String username = comment.getUsername();
        
        // Process any @mentions in the comment content
        notificationService.processMentionsInComment(
            comment.getContent(), postId, savedComment.getCommentId(), userId, username
        );
        
        if (parentId == null) {
            // This is a comment on a post, notify the post owner
            String postOwnerId = postService.getPostOwner(postId);
            
            if (postOwnerId != null && !postOwnerId.equals(userId)) {
                notificationService.createCommentNotification(
                    postOwnerId, postId, savedComment.getCommentId(), userId, username
                );
            }
        } else {
            // This is a reply to a comment, notify the comment owner
            Optional<Comment> parentComment = commentRepository.findById(parentId);
            if (parentComment.isPresent()) {
                String commentOwnerId = parentComment.get().getUserId();
                
                if (!commentOwnerId.equals(userId)) {
                    notificationService.createReplyNotification(
                        commentOwnerId, postId, savedComment.getCommentId(), userId, username
                    );
                }
            }
        }
        
        return savedComment;
    }

    // Update an existing comment safely
    public Comment updateComment(Comment comment) {
        Comment existingComment = commentRepository.findById(comment.getCommentId()).orElse(null);

        if (existingComment == null) {
            return null;
        }

        existingComment.setContent(comment.getContent());
        existingComment.setUpdatedAt(LocalDateTime.now());

        // Save updated comment
        return commentRepository.save(existingComment);
    }

    // Delete a comment
    public String deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
        return "Comment Deleted";
    }
}
