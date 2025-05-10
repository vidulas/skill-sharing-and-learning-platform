export interface Question {
    id: string;
    questionText: string;
    options: string[]; // Size = 4
    correctOptionIndex: number; // Index of the correct answer (0-3)
  }
  export interface QuizSubmission {
    id?: string;
    userId: string;
    questionId: string;
    selectedOptionIndex: number;
  }
  export interface QuizContextType {
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: Record<string, number>;
    loading: boolean;
    error: string | null;
    setCurrentQuestionIndex: (index: number) => void;
    submitAnswer: (questionId: string, selectedOptionIndex: number) => void;
  }