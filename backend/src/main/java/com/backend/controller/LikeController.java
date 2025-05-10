package com.backend.controller;

import com.backend.model.Like;
import com.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin
public class LikeController {
    @Autowired
    private LikeService likeService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Like>> getLikesByPostId(@PathVariable String postId) {
        return ResponseEntity.ok(likeService.getLikesByPostId(postId));
    }
    
    @PostMapping("/toggle/{postId}")
    public ResponseEntity<Void> toggleLike(@PathVariable String postId) {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        likeService.toggleLike(userId, postId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/check/{postId}")
    public ResponseEntity<Boolean> checkIfUserLikedPost(@PathVariable String postId) {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        return ResponseEntity.ok(likeService.checkIfUserLikedPost(userId, postId));
    }
    
    // Keep the old APIs for backward compatibility
    @PostMapping("/like")
    public ResponseEntity<Integer> like(@RequestParam String userId, @RequestParam String commentId) {
        return ResponseEntity.ok(likeService.likeComment(userId, commentId));
    }

    @PostMapping("/unlike")
    public ResponseEntity<Integer> unlike(@RequestParam String userId, @RequestParam String commentId) {
        return ResponseEntity.ok(likeService.unlikeComment(userId, commentId));
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getLikeCount(@RequestParam String commentId) {
        return ResponseEntity.ok(likeService.getLikeCount(commentId));
    }
}
