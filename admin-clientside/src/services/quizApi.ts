import axios from 'axios';
import type { Question, QuizSubmission } from '../types/quiz';

const API_URL = 'http://localhost:8083/api';

export const quizApi = {
  // Fetch questions from the API
  fetchQuestions: async (): Promise<Question[]> => {
    try {
      const response = await axios.get(`${API_URL}/questions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  // Submit a single answer
  submitAnswer: async (submission: QuizSubmission): Promise<void> => {
    try {
      await axios.post(`${API_URL}/answers/123a`, submission);
    } catch (error) {
      console.error("Error submitting answer:", error);
      throw error;
    }
  },

  // Get answers by user ID
  getAnswersByUserId: async (userId: string): Promise<QuizSubmission[]> => {
    try {
      const response = await axios.get(`${API_URL}/answers/user/123a`);
      return response.data;
    } catch (error) {
      console.error("Error fetching answers by user ID:", error);
      throw error;
    }
  }
};