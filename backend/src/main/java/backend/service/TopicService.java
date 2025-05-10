package backend.service;

import backend.model.Topic;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface TopicService {
    List<Topic> findAll();
    Topic findById(String id);
    Topic save(Topic topic, List<MultipartFile> files) throws IOException;
    Topic update(String id, Topic topic, List<MultipartFile> files) throws IOException;
    void delete(String id);
}

