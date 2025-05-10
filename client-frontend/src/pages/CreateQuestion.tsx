import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '../contexts/QuestionsContext';
import QuestionForm from '../components/QuestionForm';
const CreateQuestion: React.FC = () => {
  const {
    createQuestion,
    loading
  } = useQuestions();
  const navigate = useNavigate();
  const handleSubmit = async (question: any) => {
    await createQuestion(question);
    navigate('/questions');
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Question
        </h1>
      </div>
      <QuestionForm onSubmit={handleSubmit} isLoading={loading} />
    </div>;
};
export default CreateQuestion;