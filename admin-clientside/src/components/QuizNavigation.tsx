import React from 'react';
import { useQuiz } from '../contexts/QuizContext';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
interface QuizNavigationProps {
  onComplete: () => void;
}
export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onComplete
}) => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers
  } = useQuiz();
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrent = userAnswers[questions[currentQuestionIndex]?.id] !== undefined;
  const hasAnsweredAll = questions.length > 0 && questions.every(q => userAnswers[q.id] !== undefined);
  const goToPrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  return <div className="flex justify-between items-center mt-6">
      <button onClick={goToPrevious} disabled={isFirstQuestion} className={`flex items-center px-4 py-2 rounded-md ${isFirstQuestion ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}>
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Previous
      </button>
      <div className="flex space-x-1">
        {questions.map((_, index) => <button key={index} onClick={() => setCurrentQuestionIndex(index)} className={`w-3 h-3 rounded-full ${index === currentQuestionIndex ? 'bg-blue-600' : userAnswers[questions[index]?.id] !== undefined ? 'bg-green-500' : 'bg-gray-300'}`} aria-label={`Go to question ${index + 1}`} />)}
      </div>
      {isLastQuestion ? <button onClick={onComplete} disabled={!hasAnsweredAll} className={`flex items-center px-4 py-2 rounded-md ${!hasAnsweredAll ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          <CheckIcon className="w-4 h-4 mr-2" />
          Complete Quiz
        </button> : <button onClick={goToNext} disabled={!hasAnsweredCurrent} className={`flex items-center px-4 py-2 rounded-md ${!hasAnsweredCurrent ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}>
          Next
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </button>}
    </div>;
};