package backend.model;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "topics")
public class Topic {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    private List<String> resources = new ArrayList<>();
    private LocalDate deadline;       // nullable → “—” in UI

    @Min(0) @Max(100)
    private Integer progress = 0;     // 0–100

    public Topic() {}

    public Topic(String id,
                 String title,
                 List<String> resources,
                 LocalDate deadline,
                 Integer progress) {
        this.id = id;
        this.title = title;
        this.resources = (resources != null)
                ? new ArrayList<>(resources)
                : new ArrayList<>();
        this.deadline = deadline;
        this.progress = progress;
    }

    // --- getters & setters ---

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getResources() {
        return resources;
    }
    public void setResources(List<String> resources) {
        this.resources = resources;
    }

    public LocalDate getDeadline() {
        return deadline;
    }
    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Integer getProgress() {
        return progress;
    }
    public void setProgress(Integer progress) {
        this.progress = progress;
    }
}
