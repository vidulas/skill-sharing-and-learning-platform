package backend.service;

import backend.model.Topic;
import backend.repository.TopicRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository repo;
    private final Path uploadDir;

    public TopicServiceImpl(TopicRepository repo,
                            @Value("${app.upload.dir:uploads}") String uploadDir) {
        this.repo = repo;
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(uploadDir);
    }

    @Override
    public List<Topic> findAll() {
        return repo.findAll();
    }

    @Override
    public Topic findById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Topic not found"));
    }

    @Override
    public Topic save(Topic topic, List<MultipartFile> files) throws IOException {
        topic.setId(null);                         // force insert
        handleFilesAndSetResources(topic, files, null);
        return repo.save(topic);
    }

    @Override
    public Topic update(String id, Topic incoming, List<MultipartFile> files)
            throws IOException {
        Topic current = findById(id);
        current.setTitle(incoming.getTitle());
        current.setDeadline(incoming.getDeadline());
        current.setProgress(incoming.getProgress());
        handleFilesAndSetResources(current, files, incoming.getResources());
        return repo.save(current);
    }

    @Override
    public void delete(String id) {
        repo.deleteById(id);
    }

    private void handleFilesAndSetResources(
            Topic topic,
            List<MultipartFile> files,
            List<String> fallbackResources
    ) throws IOException {
        // start with whatever was already there (or empty list)
        List<String> urls = (fallbackResources != null)
                ? new ArrayList<>(fallbackResources)
                : new ArrayList<>();

        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String filename = UUID.randomUUID() + "_"
                            + StringUtils.cleanPath(file.getOriginalFilename());
                    Path target = uploadDir.resolve(filename);
                    Files.copy(file.getInputStream(), target,
                            StandardCopyOption.REPLACE_EXISTING);
                    urls.add("/uploads/" + filename);
                }
            }
        }

        topic.setResources(urls);
    }
}

