package com.edu.skillshare.controller;

import com.edu.skillshare.document.UserAnswer;
import com.edu.skillshare.service.UserAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/answers")
@RequiredArgsConstructor
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    @PostMapping("/{userId}")
    public UserAnswer submitAnswer(
            @PathVariable String userId,
            @RequestBody Map<String, Object> requestBody) {

        // Extract the questionId and selectedOptionIndex from the request body
        String questionId = (String) requestBody.get("questionId");

        // Safe casting: Make sure to check the types and handle potential casting errors
        int selectedOptionIndex = (int) Double.parseDouble(requestBody.get("selectedOptionIndex").toString());
        return userAnswerService.submitAnswer(userId, questionId, selectedOptionIndex);
    }


    @GetMapping("/user/{userId}")
    public List<UserAnswer> getAnswersByUser(@PathVariable String userId) {
        return userAnswerService.getUserAnswers(userId);
    }
}