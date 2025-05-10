import React, { useEffect, useState } from 'react';
import type { Question } from '../contexts/QuestionsContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
interface QuestionFormProps {
  initialQuestion?: Question;
  onSubmit: (question: Question) => void;
  isLoading: boolean;
}
const QuestionForm: React.FC<QuestionFormProps> = ({
  initialQuestion,
  onSubmit,
  isLoading
}) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);
  // Initialize form if editing an existing question
  useEffect(() => {
    if (initialQuestion) {
      setQuestionText(initialQuestion.questionText);
      setOptions([...initialQuestion.options]);
      setCorrectOptionIndex(initialQuestion.correctOptionIndex);
    }
  }, [initialQuestion]);
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleAddOption = () => {
    setOptions([...options, '']);
  };
  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return; // Minimum 2 options
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    // Adjust correctOptionIndex if needed
    if (index === correctOptionIndex) {
      setCorrectOptionIndex(0);
    } else if (index < correctOptionIndex) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty options
    const filteredOptions = options.filter(option => option.trim() !== '');
    if (filteredOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }
    if (questionText.trim() === '') {
      alert('Please provide a question');
      return;
    }
    onSubmit({
      ...(initialQuestion?.id ? {
        id: initialQuestion.id
      } : {}),
      questionText,
      options: filteredOptions,
      correctOptionIndex: correctOptionIndex >= filteredOptions.length ? 0 : correctOptionIndex
    });
  };
  return <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea id="questionText" value={questionText} onChange={e => setQuestionText(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={3} placeholder="Enter your question here" required />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Options
        </label>
        <div className="space-y-3">
          {options.map((option, index) => <div key={index} className="flex items-center space-x-3">
              <input type="radio" name="correctOption" checked={correctOptionIndex === index} onChange={() => setCorrectOptionIndex(index)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
              <input type="text" value={option} onChange={e => handleOptionChange(index, e.target.value)} placeholder={`Option ${index + 1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <button type="button" onClick={() => handleRemoveOption(index)} className="text-red-500 hover:text-red-700" disabled={options.length <= 2}>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>)}
        </div>
        <button type="button" onClick={handleAddOption} className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Option
        </button>
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
          {isLoading ? 'Saving...' : initialQuestion ? 'Update Question' : 'Create Question'}
        </button>
      </div>
    </form>;
};
export default QuestionForm;