package com.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "comments")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Comment {

    @Id
    private String commentId;

    private String content;
    private String userId;
    private String username;
    private String postId;
    private String parentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setContent(String content) {
        this.content = content;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
