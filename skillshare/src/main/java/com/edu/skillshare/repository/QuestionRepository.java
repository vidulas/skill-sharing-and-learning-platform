package com.edu.skillshare.repository;

import com.edu.skillshare.document.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question,String> {
}
