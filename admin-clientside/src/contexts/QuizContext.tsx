import React, { useEffect, useState, createContext, useContext } from 'react';
type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
};
export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  timeInMinutes: number;
  participants: number;
};
type UserAnswer = {
  questionId: string;
  selectedOption: number;
};
type QuizResult = {
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: UserAnswer[];
  completedAt: string;
};
type QuizContextType = {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  userAnswers: UserAnswer[];
  quizResults: QuizResult[];
  fetchQuizzes: () => Promise<void>;
  getQuizById: (id: string) => Quiz | undefined;
  startQuiz: (id: string) => void;
  submitAnswer: (questionId: string, selectedOption: number) => void;
  finishQuiz: () => QuizResult | null;
  resetQuiz: () => void;
};
const QuizContext = createContext<QuizContextType | undefined>(undefined);
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
export const QuizProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  // Fetch quizzes on mount
  useEffect(() => {
    fetchQuizzes();
    // Load saved results from localStorage
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      setQuizResults(JSON.parse(savedResults));
    }
  }, []);
  // Save results to localStorage when they change
  useEffect(() => {
    if (quizResults.length > 0) {
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
    }
  }, [quizResults]);
  // Mock fetch quizzes function
  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockQuizzes: Quiz[] = [{
        id: '1',
        title: 'React Fundamentals',
        description: 'Test your knowledge of React basics and core concepts.',
        category: 'Web Development',
        difficulty: 'beginner',
        questions: [{
          id: '101',
          text: 'What is React?',
          options: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system', 'A backend framework'],
          correctAnswer: 0
        }, {
          id: '102',
          text: 'What is JSX?',
          options: ['A JavaScript extension', 'A JavaScript XML syntax', 'A JavaScript compiler', 'A JavaScript testing framework'],
          correctAnswer: 1
        }, {
          id: '103',
          text: 'What is the virtual DOM?',
          options: ['A browser feature', 'A physical component of the computer', 'A lightweight copy of the actual DOM', 'A design pattern'],
          correctAnswer: 2
        }],
        timeInMinutes: 5,
        participants: 1245
      }, {
        id: '2',
        title: 'Advanced CSS Techniques',
        description: 'Challenge yourself with questions about modern CSS features and techniques.',
        category: 'CSS',
        difficulty: 'intermediate',
        questions: [{
          id: '201',
          text: 'Which CSS property is used for creating a grid layout?',
          options: ['display: flex', 'display: grid', 'display: block', 'display: table'],
          correctAnswer: 1
        }, {
          id: '202',
          text: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 2
        }, {
          id: '203',
          text: 'Which property is used to change the font of an element?',
          options: ['font-style', 'font-weight', 'font-size', 'font-family'],
          correctAnswer: 3
        }],
        timeInMinutes: 5,
        participants: 987
      }, {
        id: '3',
        title: 'TypeScript Mastery',
        description: 'Test your TypeScript knowledge with these challenging questions.',
        category: 'TypeScript',
        difficulty: 'advanced',
        questions: [{
          id: '301',
          text: 'What is a TypeScript interface?',
          options: ['A class that implements methods', 'A way to define the structure of an object', 'A function that returns a type', 'A module system'],
          correctAnswer: 1
        }, {
          id: '302',
          text: 'What is the "any" type in TypeScript?',
          options: ['A type that can only hold numbers', 'A type that can only hold strings', 'A type that can hold any value', 'A type that cannot be changed'],
          correctAnswer: 2
        }, {
          id: '303',
          text: 'Which is NOT a built-in type in TypeScript?',
          options: ['number', 'string', 'boolean', 'float'],
          correctAnswer: 3
        }],
        timeInMinutes: 10,
        participants: 543
      }];
      setQuizzes(mockQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError('Failed to fetch quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // Get quiz by ID
  const getQuizById = (id: string) => {
    return quizzes.find(quiz => quiz.id === id);
  };
  // Start a quiz
  const startQuiz = (id: string) => {
    const quiz = getQuizById(id);
    if (quiz) {
      setCurrentQuiz(quiz);
      setUserAnswers([]);
    }
  };
  // Submit an answer
  const submitAnswer = (questionId: string, selectedOption: number) => {
    // Check if answer already exists
    const existingAnswerIndex = userAnswers.findIndex(answer => answer.questionId === questionId);
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      setUserAnswers(prevAnswers => prevAnswers.map((answer, index) => index === existingAnswerIndex ? {
        ...answer,
        selectedOption
      } : answer));
    } else {
      // Add new answer
      setUserAnswers(prevAnswers => [...prevAnswers, {
        questionId,
        selectedOption
      }]);
    }
  };
  // Finish quiz and calculate results
  const finishQuiz = () => {
    if (!currentQuiz) return null;
    let correctAnswers = 0;
    // Calculate score
    currentQuiz.questions.forEach(question => {
      const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const result: QuizResult = {
      quizId: currentQuiz.id,
      score: correctAnswers,
      totalQuestions: currentQuiz.questions.length,
      answers: [...userAnswers],
      completedAt: new Date().toISOString()
    };
    // Save result
    setQuizResults(prevResults => [...prevResults, result]);
    return result;
  };
  // Reset current quiz
  const resetQuiz = () => {
    setCurrentQuiz(null);
    setUserAnswers([]);
  };
  return <QuizContext.Provider value={{
    quizzes,
    currentQuiz,
    loading,
    error,
    userAnswers,
    quizResults,
    fetchQuizzes,
    getQuizById,
    startQuiz,
    submitAnswer,
    finishQuiz,
    resetQuiz
  }}>
      {children}
    </QuizContext.Provider>;
};