import React from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../contexts/QuestionsContext';
import { PlusCircleIcon, ListIcon, EditIcon, AlertTriangleIcon } from 'lucide-react';
const Dashboard: React.FC = () => {
  const {
    questions,
    loading,
    error
  } = useQuestions();
  return <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <AlertTriangleIcon className="h-6 w-6 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-full p-3">
              <ListIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Questions
              </h2>
              <p className="text-3xl font-bold text-gray-700">
                {loading ? '...' : questions.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3">
              <PlusCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Create Questions
              </h2>
              <Link to="/create" className="mt-2 inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                Add New
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3">
              <EditIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Manage Questions
              </h2>
              <Link to="/questions" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Questions
          </h2>
        </div>
        {loading ? <div className="p-6 text-center">Loading...</div> : questions.length === 0 ? <div className="p-6 text-center text-gray-500">
            No questions available. Create your first question!
          </div> : <ul className="divide-y divide-gray-200">
            {questions.slice(0, 5).map(question => <li key={question.id} className="px-6 py-4">
                <p className="font-medium text-gray-800">
                  {question.questionText}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {question.options.length} options • Correct:{' '}
                  {question.options[question.correctOptionIndex]}
                </p>
              </li>)}
          </ul>}
        {questions.length > 0 && <div className="px-6 py-3 bg-gray-50 text-right">
            <Link to="/questions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all questions →
            </Link>
          </div>}
      </div>
    </div>;
};
export default Dashboard;