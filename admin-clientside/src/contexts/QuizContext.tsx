import React, { useEffect, useState, createContext, useContext } from 'react';
import type { Question, QuizContextType, QuizSubmission } from '../types/quiz';
import { quizApi } from '../services/quizApi';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: React.ReactNode;
  userId: string;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children, userId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [fetchedQuestions, fetchedAnswers] = await Promise.all([
          quizApi.fetchQuestions(),
          quizApi.getAnswersByUserId(userId)
        ]);

        setQuestions(fetchedQuestions);

        // Convert submissions to userAnswers record
        const answersMap: Record<string, number> = {};
        fetchedAnswers.forEach(ans => {
          answersMap[ans.questionId] = ans.selectedOptionIndex;
        });
        setUserAnswers(answersMap);

        setError(null);
      } catch (err) {
        setError('Failed to load quiz data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  const submitAnswer = (questionId: string, selectedOptionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptionIndex
    }));

    const submission: QuizSubmission = {
      userId,
      questionId,
      selectedOptionIndex
    };

    quizApi.submitAnswer(submission).catch(err => {
      console.error('Error submitting answer:', err);
    });
  };

  const value: QuizContextType = {
    questions,
    currentQuestionIndex,
    userAnswers,
    loading,
    error,
    setCurrentQuestionIndex,
    submitAnswer
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};