package com.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "likes")
@CompoundIndexes({
    @CompoundIndex(name = "user_comment_idx", def = "{'userId': 1, 'commentId': 1}", unique = true),
    @CompoundIndex(name = "user_post_idx", def = "{'userId': 1, 'postId': 1}", unique = true)
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Like {
    @Id
    private String likeId;

    private String userId;
    private String commentId;
    private String postId;
    private LocalDateTime createdAt;

    public Like(String likeId, String userId, String commentId, String postId) {
        this.likeId = likeId;
        this.userId = userId;
        this.commentId = commentId;
        this.postId = postId;
        this.createdAt = LocalDateTime.now();
    }
}
