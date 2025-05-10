import React from 'react';
import type { Question } from '../types/quiz';
import { OptionButton } from './OptionButton';
import { useQuiz } from '../contexts/QuizContext';
interface QuestionCardProps {
  question: Question;
}
export const QuestionCard: React.FC<QuestionCardProps> = ({
  question
}) => {
  const {
    userAnswers,
    submitAnswer
  } = useQuiz();
  const selectedOption = userAnswers[question.id] !== undefined ? userAnswers[question.id] : -1;
  const handleOptionClick = (index: number) => {
    submitAnswer(question.id, index);
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {question.questionText}
      </h3>
      <div className="mt-4">
        {question.options.map((option, index) => <OptionButton key={index} option={option} index={index} isSelected={selectedOption === index} onClick={() => handleOptionClick(index)} />)}
      </div>
    </div>;
};