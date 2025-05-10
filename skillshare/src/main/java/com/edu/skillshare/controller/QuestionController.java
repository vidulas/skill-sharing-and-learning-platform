package com.edu.skillshare.controller;

import com.edu.skillshare.document.Question;
import com.edu.skillshare.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor


public class QuestionController {


    private final QuestionService questionService;

    @GetMapping
    public List<Question> getAll() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getById(@PathVariable String id) {
        return questionService.getQuestionById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping
    public Question create(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @PutMapping("/{id}")
    public Question update(@PathVariable String id, @RequestBody Question question) {
        return questionService.updateQuestion(id, question);
    }

    @PatchMapping("/{id}")
    public Question patchUpdate(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        return questionService.patchUpdateQuestion(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        questionService.deleteQuestion(id);
    }
}