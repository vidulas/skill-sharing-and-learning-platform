package com.edu.skillshare.service;

import com.edu.skillshare.document.Question;
import com.edu.skillshare.document.UserAnswer;
import com.edu.skillshare.repository.QuestionRepository;
import com.edu.skillshare.repository.UserAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAnswerServiceImpl implements UserAnswerService {

    private final UserAnswerRepository userAnswerRepository;

    private final QuestionRepository questionRepository;

    @Override
    public UserAnswer submitAnswer(String userId, String questionId, int selectedOptionIndex) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        boolean isCorrect = selectedOptionIndex == question.getCorrectOptionIndex();

        UserAnswer answer = new UserAnswer(null, userId, questionId, selectedOptionIndex, isCorrect);
        return userAnswerRepository.save(answer);
    }

    @Override
    public List<UserAnswer> getUserAnswers(String userId) {
        return userAnswerRepository.findByUserId(userId);
    }
}