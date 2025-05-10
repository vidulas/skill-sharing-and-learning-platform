import React, { useState, useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import { QuestionCard } from './QuestionCard';
import { QuizNavigation } from './QuizNavigation';
import { QuizResults } from './QuizResults';
import { Loader2Icon } from 'lucide-react';

export const QuizContainer: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    loading,
    error,
    userAnswers
  } = useQuiz();

  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    const allAnswered = questions.every(q => userAnswers.hasOwnProperty(q.id));
    if (allAnswered) {
      setIsCompleted(true);
    } else {
      alert('Please answer all questions before completing the quiz.');
    }
  };

  const handleRetry = () => {
    setIsCompleted(false);
    // Optional: clear userAnswers if you want to allow reattempt
    // You can extend context to support resetting answers
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2Icon className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Reload
        </button>
      </div>
    );
  }

  if (isCompleted) {
    return <QuizResults questions={questions} userAnswers={userAnswers} onRetry={handleRetry} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Skill Assessment Quiz</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(currentQuestionIndex + 1) / questions.length * 100}%`
            }}
          ></div>
        </div>
      </div>

      {questions.length > 0 ? (
        <>
          <QuestionCard question={questions[currentQuestionIndex]} />
          <QuizNavigation onComplete={handleComplete} />
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700">No quiz questions available at the moment.</p>
        </div>
      )}
    </div>
  );
};