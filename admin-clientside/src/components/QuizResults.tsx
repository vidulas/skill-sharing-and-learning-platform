import React from 'react';
import type { Question } from '../types/quiz';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
interface QuizResultsProps {
  questions: Question[];
  userAnswers: Record<string, number>;
  onRetry: () => void;
}
export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  userAnswers,
  onRetry
}) => {
  const correctAnswers = questions.filter(q => userAnswers[q.id] === q.correctOptionIndex).length;
  const score = correctAnswers / questions.length * 100;
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
          <span className="text-3xl font-bold text-blue-700">
            {Math.round(score)}%
          </span>
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="text-lg">
          You got{' '}
          <span className="font-bold text-blue-700">{correctAnswers}</span> out
          of <span className="font-bold">{questions.length}</span> questions
          correct!
        </p>
      </div>
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-medium mb-4">Review Questions</h3>
        {questions.map((question, index) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correctOptionIndex;
        return <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {isCorrect ? <CheckCircleIcon className="w-5 h-5 text-green-600" /> : <XCircleIcon className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="font-medium">{`${index + 1}. ${question.questionText}`}</p>
                  <p className="mt-2">
                    <span className="text-gray-600">Your answer: </span>
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {question.options[userAnswer]}
                    </span>
                  </p>
                  {!isCorrect && <p className="mt-1">
                      <span className="text-gray-600">Correct answer: </span>
                      <span className="text-green-600">
                        {question.options[question.correctOptionIndex]}
                      </span>
                    </p>}
                </div>
              </div>
            </div>;
      })}
      </div>
      <div className="mt-8 text-center">
        <button onClick={onRetry} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    </div>;
};