import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, BrainIcon, UsersIcon } from 'lucide-react';
import Button from './Button';
type QuizCardProps = {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  timeInMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  participants: number;
  category: string;
};
const QuizCard = ({
  id,
  title,
  description,
  questionsCount,
  timeInMinutes,
  difficulty,
  participants,
  category
}: QuizCardProps) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  return <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded">
            {category}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded ${difficultyColor[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        <Link to={`/quiz/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <BrainIcon className="h-4 w-4 mr-1" />
            <span>{questionsCount} questions</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{timeInMinutes} min</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-1" />
            <span>{participants} participants</span>
          </div>
        </div>
        <Link to={'/quiz'}>
          <Button variant="outline" fullWidth>
            Start Quiz
          </Button>
        </Link>
      </div>
    </div>;
};
export default QuizCard;