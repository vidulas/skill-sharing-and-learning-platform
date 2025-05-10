package com.backend.service;

import com.backend.model.Notification;
import com.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    
    // Create a new notification
    public Notification createNotification(String userId, String message, String type, String link, 
                                          String postId, String commentId, String actorId, String actorName) {
        Notification notification = new Notification(
            userId, message, type, link, postId, commentId, actorId, actorName
        );
        notification.setId(UUID.randomUUID().toString());
        return notificationRepository.save(notification);
    }
    
    // Get notifications for a user
    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    // Get notifications for a user by specific types
    public List<Notification> getUserNotificationsByTypes(String userId, List<String> types) {
        return notificationRepository.findByUserIdAndTypeInOrderByCreatedAtDesc(userId, types);
    }
    
    // Get unread notifications for a user
    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdAndReadOrderByCreatedAtDesc(userId, false);
    }
    
    // Mark a notification as read
    public boolean markAsRead(String notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        if (notification.isPresent()) {
            Notification n = notification.get();
            n.setRead(true);
            notificationRepository.save(n);
            return true;
        }
        return false;
    }
    
    // Mark all notifications as read for a user
    public void markAllAsRead(String userId) {
        List<Notification> notifications = notificationRepository.findByUserIdAndReadOrderByCreatedAtDesc(userId, false);
        notifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(notifications);
    }
    
    // Get count of unread notifications
    public long getUnreadCount(String userId) {
        return notificationRepository.countByUserIdAndRead(userId, false);
    }
    
    // Create a like notification
    public void createLikeNotification(String postOwnerId, String postId, String actorId, String actorName) {
        // Create notification even for self-actions
        String message;
        String type;
        
        if (postOwnerId.equals(actorId)) {
            message = "You liked your own post";
            type = "SELF_LIKE";
        } else {
            message = actorName + " liked your post";
            type = "LIKE";
        }
        
        String link = "/posts/" + postId;
        createNotification(postOwnerId, message, type, link, postId, null, actorId, actorName);
        
        // Also create notification for admin if this is a regular user
        if (!"admin123".equals(actorId)) {
            createNotification("admin123", actorName + " liked a post", type, link, postId, null, actorId, actorName);
        }
    }
    
    // Create a comment notification
    public void createCommentNotification(String postOwnerId, String postId, String commentId, 
                                         String actorId, String actorName) {
        // Create notification even for self-actions
        String message;
        String type;
        
        if (postOwnerId.equals(actorId)) {
            message = "You commented on your post";
            type = "SELF_COMMENT";
        } else {
            message = actorName + " commented on your post";
            type = "COMMENT";
        }
        
        String link = "/posts/" + postId + "#comment-" + commentId;
        createNotification(postOwnerId, message, type, link, postId, commentId, actorId, actorName);
        
        // Also create notification for admin if this is a regular user
        if (!"admin123".equals(actorId)) {
            createNotification("admin123", actorName + " commented on a post", type, link, postId, commentId, actorId, actorName);
        }
    }
    
    // Create a reply notification
    public void createReplyNotification(String commentOwnerId, String postId, String commentId, 
                                       String actorId, String actorName) {
        // Create notification even for self-actions
        String message;
        String type;
        
        if (commentOwnerId.equals(actorId)) {
            message = "You replied to your comment";
            type = "SELF_REPLY";
        } else {
            message = actorName + " replied to your comment";
            type = "REPLY";
        }
        
        String link = "/posts/" + postId + "#comment-" + commentId;
        createNotification(commentOwnerId, message, type, link, postId, commentId, actorId, actorName);
        
        // Also create notification for admin if this is a regular user
        if (!"admin123".equals(actorId)) {
            createNotification("admin123", actorName + " replied to a comment", type, link, postId, commentId, actorId, actorName);
        }
    }
    
    // Create a mention notification
    public void createMentionNotification(String mentionedUserId, String postId, String commentId, 
                                        String actorId, String actorName, String commentContent) {
        // Remove the check that prevents self-notifications
        // For demo purposes, create notification even if user mentions themselves
        String message = actorName + " mentioned you in a comment";
        String link = "/posts/" + postId + "#comment-" + commentId;
        createNotification(mentionedUserId, message, "MENTION", link, postId, commentId, actorId, actorName);
    }
    
    // Method to check for mentions in a comment and create notifications
    public void processMentionsInComment(String content, String postId, String commentId, 
                                       String actorId, String actorName) {
        // Simple pattern to detect mentions: @username
        // In a real app, you would match against actual usernames in your system
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("@(\\w+)");
        java.util.regex.Matcher matcher = pattern.matcher(content);
        
        while (matcher.find()) {
            String username = matcher.group(1);
            // In a real app, look up the user ID from the username
            // For demo, we'll use a mock mapping
            String userId = getUserIdByUsername(username);
            
            if (userId != null) {
                createMentionNotification(userId, postId, commentId, actorId, actorName, content);
            }
        }
    }
    
    // Mock method to get user ID by username
    // In a real app, this would query your user database
    private String getUserIdByUsername(String username) {
        // Mock implementation
        if ("admin".equals(username)) return "admin123";
        if ("john".equals(username)) return "john456";
        // For demo purposes, return a default user ID for any other username
        return "user123";
    }
}
