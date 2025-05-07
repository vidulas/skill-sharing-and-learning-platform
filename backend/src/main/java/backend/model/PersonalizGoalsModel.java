package backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Document(collection = "goals")
public class PersonalizGoalsModel {

    @Id
    private String id;

    private String userId;
    private String title;
    private String description;
    private int progress;
    private Date targetDate;
    private boolean completed;
    private Date createdAt;

    // No-arg constructor: sets createdAt, progress, completed defaults
    public PersonalizGoalsModel() {
        this.createdAt = new Date();
        this.progress = 0;
        this.completed = false;
    }

    // Convenience constructor
    public PersonalizGoalsModel(String userId, String title, String description, Date targetDate) {
        this();
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.targetDate = targetDate;
    }

    // === Getters & Setters ===

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getProgress() {
        return progress;
    }

    /**
     * Sets the progress percentage. Automatically
     * marks the goal completed if progress >= 100.
     */
    public void setProgress(int progress) {
        this.progress = progress;
        this.completed = (progress >= 100);
    }

    public Date getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(Date targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    /**
     * Manually override completion status.
     */
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * Allows overriding the creation timestamp
     * (e.g., when migrating existing data).
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}