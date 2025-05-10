import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { useQuestions, Question } from '../contexts/QuestionsContext';
import QuestionForm from '../components/QuestionForm';
import { ArrowLeftIcon, AlertTriangleIcon } from 'lucide-react';

const UpdateQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getQuestion, updateQuestion, loading } = useQuestions();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!id) return;

      setLoadingQuestion(true);
      setError(null); // reset any previous errors

      try {
        const questionData = await getQuestion(id);
        if (questionData) {
          setQuestion(questionData);
        } else {
          setError('Question not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load question');
      } finally {
        setLoadingQuestion(false);
      }
    };

    fetchQuestion();
  }, [id, getQuestion]);

  const handleSubmit = async (updatedQuestion: Question) => {
    if (!id) return;
    await updateQuestion(id, updatedQuestion);
    navigate('/questions');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/questions')}
          className="mr-4 p-1 rounded-full hover:bg-gray-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Question</h1>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <AlertTriangleIcon className="h-6 w-6 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loadingQuestion ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading question...</p>
        </div>
      ) : question ? (
        <QuestionForm
          initialQuestion={question}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Question not found.</p>
          <button
            onClick={() => navigate('/questions')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
          >
            Back to Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestion;
