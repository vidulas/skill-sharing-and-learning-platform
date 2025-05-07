package backend.controller;

import backend.exception.PersonalizGoalsNotFoundException;
import backend.model.PersonalizGoalsModel;
import backend.repository.PersonalizGoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class PersonalizGoalsController {

    @Autowired
    private PersonalizGoalsRepository repository;

    // Get all goals for a user
    @GetMapping("/user/{userId}")
    public List<PersonalizGoalsModel> getUserGoals(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }

    // Create new goal
    @PostMapping
    public PersonalizGoalsModel newGoal(@RequestBody PersonalizGoalsModel newGoal) {
        return repository.save(newGoal);
    }

    // Get single goal
    @GetMapping("/{id}")
    public PersonalizGoalsModel getGoal(@PathVariable String id) {
        return repository.findById(id)
                .orElseThrow(() -> new PersonalizGoalsNotFoundException(id));
    }

    // Update goal
    @PutMapping("/{id}")
    public PersonalizGoalsModel updateGoal(
            @RequestBody PersonalizGoalsModel updatedGoal,
            @PathVariable String id) {

        return repository.findById(id)
                .map(goal -> {
                    goal.setTitle(updatedGoal.getTitle());
                    goal.setDescription(updatedGoal.getDescription());
                    goal.setProgress(updatedGoal.getProgress());
                    goal.setTargetDate(updatedGoal.getTargetDate());
                    return repository.save(goal);
                })
                .orElseThrow(() -> new PersonalizGoalsNotFoundException(id));
    }

    // Delete goal
    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable String id) {
        repository.deleteById(id);
    }

    // Get completed goals for a user
    @GetMapping("/user/{userId}/completed")
    public List<PersonalizGoalsModel> getCompletedGoals(@PathVariable String userId) {
        return repository.findByUserIdAndCompleted(userId, true);
    }

    // Get in-progress goals for a user
    @GetMapping("/user/{userId}/in-progress")
    public List<PersonalizGoalsModel> getInProgressGoals(@PathVariable String userId) {
        return repository.findByUserIdAndCompleted(userId, false);
    }
}
