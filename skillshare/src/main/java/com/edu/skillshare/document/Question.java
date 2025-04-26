package com.edu.skillshare.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "questions")
public class Question {

    @Id
    private String id;
    private String questionText;
    private List<String> options; // Size = 4
    private int correctOptionIndex; // Index of the correct answer in the options list (0-3)

}