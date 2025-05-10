package backend.controller;

import backend.model.Topic;
import backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/topics")
@Validated
public class TopicController {

    private final TopicService service;

    @Autowired
    public TopicController(TopicService service) {
        this.service = service;
    }

    @GetMapping
    public List<Topic> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Topic one(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Topic create(
            @RequestPart("topic") @Valid Topic topic,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws IOException {
        return service.save(topic, files);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Topic update(
            @PathVariable String id,
            @RequestPart("topic") @Valid Topic topic,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws IOException {
        return service.update(id, topic, files);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}

