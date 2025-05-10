package com.edu.skillshare.repository;

import com.edu.skillshare.document.UserAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserAnswerRepository extends MongoRepository<UserAnswer, String> {
    List<UserAnswer> findByUserId(String userId);
}
