import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, XCircleIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useQuiz } from '../contexts/QuizContext';
import Button from '../components/Button';
const Quiz = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    getQuizById,
    startQuiz,
    submitAnswer,
    finishQuiz,
    resetQuiz,
    userAnswers,
    currentQuiz
  } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  useEffect(() => {
    if (!id) return;
    const quiz = getQuizById(id);
    if (!quiz) {
      navigate('/dashboard');
      return;
    }
    startQuiz(id);
    setTimeLeft(quiz.timeInMinutes * 60);
    // Reset the component state
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setResults(null);
    return () => {
      // Clean up when component unmounts
      resetQuiz();
    };
  }, [id, getQuizById, navigate, startQuiz, resetQuiz]);
  useEffect(() => {
    if (!timeLeft || quizCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);
  if (!currentQuiz) {
    return <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>;
  }
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const userAnswer = userAnswers.find(answer => answer.questionId === currentQuestion.id);
  const handleSelectOption = (optionIndex: number) => {
    submitAnswer(currentQuestion.id, optionIndex);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  const handleFinishQuiz = () => {
    const result = finishQuiz();
    setQuizCompleted(true);
    setResults(result);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  if (quizCompleted && results) {
    return <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Quiz Completed!</h1>
          <p className="text-gray-600 mb-6">
            You've completed the "{currentQuiz.title}" quiz
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {results.score} / {results.totalQuestions}
            </div>
            <p className="text-gray-600">
              {Math.round(results.score / results.totalQuestions * 100)}%
              Score
            </p>
          </div>
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-medium">{results.totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-medium text-green-600">
                {results.score}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Wrong Answers:</span>
              <span className="font-medium text-red-600">
                {results.totalQuestions - results.score}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => {
            resetQuiz();
            navigate('/dashboard');
          }}>
              Back to Dashboard
            </Button>
            <Button variant="primary" onClick={() => {
            resetQuiz();
            if (id) startQuiz(id);
            setCurrentQuestionIndex(0);
            setQuizCompleted(false);
            setResults(null);
            setTimeLeft(currentQuiz.timeInMinutes * 60);
          }}>
              Try Again
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-indigo-600">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Exit Quiz</span>
        </button>
        <div className="flex items-center text-gray-600">
          <ClockIcon className="h-5 w-5 mr-2 text-indigo-600" />
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 p-6">
          <h1 className="text-xl font-bold mb-2">{currentQuiz.title}</h1>
          <p className="text-gray-600">{currentQuiz.description}</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{
            width: `${(currentQuestionIndex + 1) / currentQuiz.questions.length * 100}%`
          }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>
              Question {currentQuestionIndex + 1} of{' '}
              {currentQuiz.questions.length}
            </span>
            <span>
              {Math.round((currentQuestionIndex + 1) / currentQuiz.questions.length * 100)}
              % complete
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-medium mb-6">{currentQuestion.text}</h2>
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => <button key={index} onClick={() => handleSelectOption(index)} className={`w-full text-left p-4 rounded-md border transition-all ${userAnswer?.selectedOption === index ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}>
                <div className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${userAnswer?.selectedOption === index ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>)}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {currentQuestionIndex === currentQuiz.questions.length - 1 ? <Button variant="primary" onClick={handleFinishQuiz} disabled={userAnswers.length < currentQuiz.questions.length} className="flex items-center">
                Finish Quiz
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              </Button> : <Button variant="primary" onClick={handleNextQuestion} className="flex items-center">
                Next
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Button>}
          </div>
        </div>
      </div>
    </div>;
};
export default Quiz;