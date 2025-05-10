package com.backend.controller;

import com.backend.model.Notification;
import com.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications(
            @RequestParam(required = false) String type) {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        
        if (type != null && !type.isEmpty()) {
            String[] types = type.split(",");
            return ResponseEntity.ok(
                notificationService.getUserNotificationsByTypes(userId, Arrays.asList(types))
            );
        }
        
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        return ResponseEntity.ok(notificationService.getUnreadNotifications(userId));
    }
    
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        return ResponseEntity.ok(Map.of("count", notificationService.getUnreadCount(userId)));
    }
    
    @PostMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable String id) {
        boolean success = notificationService.markAsRead(id);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead() {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/test")
    public ResponseEntity<Notification> createTestNotification(@RequestBody Map<String, String> payload) {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        String type = payload.getOrDefault("type", "COMMENT");
        
        String message = "This is a test " + type.toLowerCase() + " notification";
        String link = "/posts/1";
        
        Notification notification = notificationService.createNotification(
            userId, message, type, link, "1", null, "testuser", "Test User");
        
        return ResponseEntity.ok(notification);
    }
    
    @PostMapping("/test-self-notification")
    public ResponseEntity<Notification> createSelfTestNotification(@RequestBody Map<String, String> payload) {
        // In a real app, get the user ID from security context
        String userId = "user123"; // Replace with actual user ID from security context
        String type = payload.getOrDefault("type", "SELF_COMMENT");
        
        String message = "This is a test of your own " + type.toLowerCase().replace("self_", "") + " notification";
        String link = "/posts/1";
        
        Notification notification = notificationService.createNotification(
            userId, message, type, link, "1", null, userId, "You");
        
        return ResponseEntity.ok(notification);
    }
}
