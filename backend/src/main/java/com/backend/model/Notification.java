package com.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    
    @Id
    private String id;
    
    private String userId;        // User who will receive the notification
    private String message;       // Notification message content
    private String type;          // LIKE, COMMENT, FOLLOW, etc.
    private String link;          // URL to navigate to when clicked
    private boolean read;         // Whether notification has been read
    private LocalDateTime createdAt;
    
    // Reference IDs
    private String postId;
    private String commentId;
    private String actorId;       // User who triggered the notification
    private String actorName;     // Name of the user who triggered the notification
    
    public Notification(String userId, String message, String type, String link, 
                       String postId, String commentId, String actorId, String actorName) {
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.link = link;
        this.read = false;
        this.createdAt = LocalDateTime.now();
        this.postId = postId;
        this.commentId = commentId;
        this.actorId = actorId;
        this.actorName = actorName;
    }
}
