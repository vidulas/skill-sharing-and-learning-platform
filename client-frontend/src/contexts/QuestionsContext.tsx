import * as React from 'react';
import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';
import axios from 'axios';

// Define the question interface
export interface Question {
  id?: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
}

// Define the context interface
interface QuestionsContextType {
  questions: Question[];
  loading: boolean;
  error: string | null;
  fetchQuestions: () => Promise<void>;
  getQuestion: (id: string) => Promise<Question | undefined>;
  createQuestion: (question: Question) => Promise<void>;
  updateQuestion: (id: string, question: Question) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
}

// Create the context
const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

// API base URL
const API_URL = 'http://localhost:8083/api/questions';

// Provider component
export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Question[]>(API_URL);
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

 // Get a single question by ID
const getQuestion = async (id: string): Promise<Question | undefined> => {
  try {
    const response = await axios.get<Question>(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    setError(`Failed to fetch question ${id}`);
    return undefined;
  }
};


  // Create a new question
  const createQuestion = async (question: Question) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<Question>(API_URL, question);
      setQuestions([...questions, response.data]);
    } catch (err) {
      setError('Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing question
  const updateQuestion = async (id: string, question: Question) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put<Question>(`${API_URL}/${id}`, question);
      setQuestions(questions.map(q => q.id === id ? response.data : q));
    } catch (err) {
      setError(`Failed to update question ${id}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete a question
  const deleteQuestion = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      setError(`Failed to delete question ${id}`);
    } finally {
      setLoading(false);
    }
  };

  // Load questions on initial render
  useEffect(() => {
    fetchQuestions();
  }, []);

  const value: QuestionsContextType = {
    questions,
    loading,
    error,
    fetchQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};

// Custom hook for using the questions context
export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
