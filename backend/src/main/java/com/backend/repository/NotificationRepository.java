package com.backend.repository;

import com.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
    List<Notification> findByUserIdAndReadOrderByCreatedAtDesc(String userId, boolean read);
    List<Notification> findByUserIdAndTypeInOrderByCreatedAtDesc(String userId, List<String> types);
    long countByUserIdAndRead(String userId, boolean read);
}
