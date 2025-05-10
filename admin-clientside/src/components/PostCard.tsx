import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';
type PostCardProps = {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  createdAt: string;
  likes: number;
  comments: number;
  image?: string;
};
const PostCard = ({
  id,
  title,
  excerpt,
  author,
  category,
  createdAt,
  likes,
  comments,
  image
}: PostCardProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {image && <div className="relative h-48 w-full overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>}
      <div className="p-5">
        <Link to={`/post/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center mb-4">
          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">{author.name}</p>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-indigo-600">
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{likes}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-indigo-600">
              <MessageCircleIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{comments}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-indigo-600">
            <BookmarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>;
};
export default PostCard;