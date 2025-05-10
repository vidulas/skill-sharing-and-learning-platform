package com.edu.skillshare.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "user_answers")
public class UserAnswer {
    @Id
    private String id;
    private String userId;
    private String questionId;
    private int selectedOptionIndex;
    private boolean isCorrect;
}
