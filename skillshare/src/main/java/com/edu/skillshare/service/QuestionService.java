package com.edu.skillshare.service;

import com.edu.skillshare.document.Question;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface QuestionService {

    List<Question> getAllQuestions();
    Optional<Question> getQuestionById(String id);
    Question createQuestion(Question question);
    Question updateQuestion(String id, Question updatedQuestion);
    Question patchUpdateQuestion(String id, Map<String, Object> updates);
    void deleteQuestion(String id);
}
