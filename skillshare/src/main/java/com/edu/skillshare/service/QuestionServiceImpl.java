package com.edu.skillshare.service;

import com.edu.skillshare.document.Question;
import com.edu.skillshare.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class QuestionServiceImpl implements QuestionService {


    private final QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(String id, Question updatedQuestion) {
        Optional<Question> existing = questionRepository.findById(id);
        if (existing.isPresent()) {
            Question q = existing.get();
            q.setQuestionText(updatedQuestion.getQuestionText());
            q.setOptions(updatedQuestion.getOptions());
            q.setCorrectOptionIndex(updatedQuestion.getCorrectOptionIndex());
            return questionRepository.save(q);
        } else {
            throw new RuntimeException("Question not found");
        }
    }
    public Question patchUpdateQuestion(String id, Map<String, Object> updates) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        updates.forEach((key, value) -> {
            switch (key) {
                case "questionText":
                    existingQuestion.setQuestionText((String) value);
                    break;
                case "options":
                    existingQuestion.setOptions((List<String>) value);
                    break;
                case "correctOptionIndex":
                    if (value instanceof Integer) {
                        existingQuestion.setCorrectOptionIndex((Integer) value);
                    } else if (value instanceof Number) {
                        existingQuestion.setCorrectOptionIndex(((Number) value).intValue());
                    }
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);
            }
        });

        return questionRepository.save(existingQuestion);
    }


    @Override
    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
}
