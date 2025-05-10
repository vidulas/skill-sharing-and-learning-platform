import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../contexts/QuestionsContext';
import { EditIcon, TrashIcon, AlertTriangleIcon, SearchIcon } from 'lucide-react';
const ViewQuestions: React.FC = () => {
  const {
    questions,
    loading,
    error,
    deleteQuestion
  } = useQuestions();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredQuestions = questions.filter(question => question.questionText.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(id);
    }
  };
  return <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">All Questions</h1>
        <div className="w-full md:w-auto flex items-center">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search questions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <Link to="/create" className="ml-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
            Add New
          </Link>
        </div>
      </div>
      {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <AlertTriangleIcon className="h-6 w-6 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>}
      {loading ? <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading questions...</p>
        </div> : filteredQuestions.length === 0 ? <div className="bg-white rounded-lg shadow p-6 text-center">
          {searchTerm ? <p className="text-gray-500">No questions match your search.</p> : <div>
              <p className="text-gray-500 mb-4">No questions available.</p>
              <Link to="/create" className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                Create Your First Question
              </Link>
            </div>}
        </div> : <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Answer
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.map(question => <tr key={question.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {question.questionText}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {question.options.length} options
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {question.options[question.correctOptionIndex]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/questions/${question.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <EditIcon className="h-5 w-5 inline-block" />
                    </Link>
                    <button onClick={() => handleDelete(question.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5 inline-block" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
};
export default ViewQuestions;