package com.edu.skillshare.service;

import com.edu.skillshare.document.UserAnswer;

import java.util.List;

public interface UserAnswerService {
    UserAnswer submitAnswer(String userId, String questionId, int selectedOptionIndex);
    List<UserAnswer> getUserAnswers(String userId);
}
