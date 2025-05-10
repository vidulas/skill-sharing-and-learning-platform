package com.backend.repository;

import com.backend.model.Like;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String> {
    @Query(value = "{ 'commentId': ?0 }", count = true)
    int countByCommentId(String commentId);
    
    @Query(value = "{ 'postId': ?0 }", count = true)
    int countByPostId(String postId);
    
    List<Like> findByPostId(String postId);
    
    boolean existsByUserIdAndCommentId(String userId, String commentId);
    
    boolean existsByUserIdAndPostId(String userId, String postId);
    
    void deleteByUserIdAndCommentId(String userId, String commentId);
    
    void deleteByUserIdAndPostId(String userId, String postId);
}

