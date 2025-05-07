package backend.repository;

import backend.model.PersonalizGoalsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PersonalizGoalsRepository
        extends MongoRepository<PersonalizGoalsModel, String> {
    List<PersonalizGoalsModel> findByUserId(String userId);
    List<PersonalizGoalsModel> findByUserIdAndCompleted(String userId, boolean completed);
}