package com.backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {
    
    // In a real app, this would be backed by a database
    private static Map<String, String> postOwners = new HashMap<>();
    
    static {
        // Some sample post data
        postOwners.put("1", "post_owner123");
    }
    
    /**
     * Get the user ID of the post owner
     */
    public String getPostOwner(String postId) {
        // For demonstration purposes - in a real app, you would query your database
        return postOwners.getOrDefault(postId, "user123");
    }
    
    /**
     * Check if a post exists
     */
    public boolean postExists(String postId) {
        // In a real app, query the database
        return true; // For demo purposes, assume all posts exist
    }
}
