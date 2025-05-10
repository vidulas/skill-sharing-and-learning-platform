package com.backend.controller;

import com.backend.model.Comment;
import com.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Map<String, Object>>> getCommentsByPostId(@PathVariable String postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        
        // Transform comments to match frontend expectations (using 'id' instead of 'commentId')
        List<Map<String, Object>> transformedComments = comments.stream()
            .map(this::transformCommentForFrontend)
            .collect(Collectors.toList());
            
        return ResponseEntity.ok(transformedComments);
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Received comment request: " + payload);
            
            if (payload.get("postId") == null) {
                return ResponseEntity.badRequest().body("postId is required");
            }
            
            String postId = (String) payload.get("postId");
            
            Comment comment = new Comment();
            comment.setCommentId(UUID.randomUUID().toString());
            comment.setContent((String) payload.get("content"));
            comment.setPostId(postId);
            
            // Handle parent ID for replies
            if (payload.get("parentId") != null) {
                comment.setParentId((String) payload.get("parentId"));
            }
            
            // For demo purposes, use a fixed user ID and username
            // In a real app with authentication, you would get these from security context
            String userId = "user123"; // Could be "admin123" for admin user
            String username = "Demo User"; // Or "Admin" for admin user
            
            comment.setUserId(userId);
            comment.setUsername(username);
            
            Comment savedComment = commentService.addComment(comment);
            
            // Transform the saved comment to match frontend expectations
            Map<String, Object> response = transformCommentForFrontend(savedComment);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error adding comment: " + e.getMessage());
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable String commentId, @RequestBody Map<String, String> payload) {
        try {
            Comment comment = new Comment();
            comment.setCommentId(commentId);
            comment.setContent(payload.get("content"));
            
            Comment updatedComment = commentService.updateComment(comment);
            if (updatedComment == null) {
                return ResponseEntity.notFound().build();
            }
            
            // Transform the updated comment to match frontend expectations
            Map<String, Object> response = transformCommentForFrontend(updatedComment);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error updating comment: " + e.getMessage());
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentId) {
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }
    
    /**
     * Transform a Comment entity to a format expected by the frontend
     */
    private Map<String, Object> transformCommentForFrontend(Comment comment) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", comment.getCommentId());
        result.put("content", comment.getContent());
        result.put("userId", comment.getUserId());
        result.put("username", comment.getUsername());
        result.put("postId", comment.getPostId());
        result.put("parentId", comment.getParentId());
        result.put("createdAt", comment.getCreatedAt().toString());
        
        if (comment.getUpdatedAt() != null) {
            result.put("updatedAt", comment.getUpdatedAt().toString());
        }
        
        // Add empty replies array for frontend to populate
        result.put("replies", new Object[0]);
        
        return result;
    }
}
