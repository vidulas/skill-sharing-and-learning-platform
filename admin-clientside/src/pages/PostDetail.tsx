import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUpIcon, MessageCircleIcon, ShareIcon, CalendarIcon, TagIcon, ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import Button from '../components/Button';
const PostDetail = () => {
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
    getPostById,
    likePost,
    addComment
  } = usePost();
  const [post, setPost] = useState(id ? getPostById(id) : undefined);
  const [commentText, setCommentText] = useState('');
  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      if (!fetchedPost) {
        navigate('/dashboard');
      } else {
        setPost(fetchedPost);
      }
    }
  }, [id, getPostById, navigate]);
  if (!post) {
    return <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>;
  }
  const handleLike = () => {
    if (id) {
      likePost(id);
      // Update the local post state
      setPost(prev => prev ? {
        ...prev,
        likes: prev.likes + 1
      } : undefined);
    }
  };
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !id || !user) return;
    addComment(id, commentText);
    setCommentText('');
    // Get updated post
    const updatedPost = getPostById(id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-indigo-600 mb-6">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span>Back</span>
      </button>
      {post.image && <div className="rounded-lg overflow-hidden mb-8 h-64 md:h-96">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center mb-6">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{
        __html: post.content
      }} />
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-indigo-600">
              <ThumbsUpIcon className="h-5 w-5 mr-1" />
              <span>{post.likes} likes</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-indigo-600">
              <MessageCircleIcon className="h-5 w-5 mr-1" />
              <span>{post.comments.length} comments</span>
            </button>
          </div>
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <ShareIcon className="h-5 w-5 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">
          Comments ({post.comments.length})
        </h2>
        {user ? <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex items-start space-x-4">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div className="flex-grow">
                <textarea placeholder="Add a comment..." className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" rows={3} value={commentText} onChange={e => setCommentText(e.target.value)} required></textarea>
                <div className="mt-2 flex justify-end">
                  <Button type="submit" variant="primary" disabled={!commentText.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </form> : <div className="bg-gray-50 p-4 rounded-md mb-8 text-center">
            <p className="text-gray-600 mb-2">
              You need to be logged in to comment
            </p>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>}
        {post.comments.length > 0 ? <div className="space-y-6">
            {post.comments.map(comment => <div key={comment.id} className="flex space-x-4">
                <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
                <div className="flex-grow">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                  <div className="mt-2 flex space-x-4">
                    <button className="text-xs text-gray-500 hover:text-indigo-600">
                      Reply
                    </button>
                    <button className="text-xs text-gray-500 hover:text-indigo-600">
                      Like
                    </button>
                  </div>
                </div>
              </div>)}
          </div> : <p className="text-gray-500 text-center py-4">
            No comments yet. Be the first to comment!
          </p>}
      </div>
    </div>;
};
export default PostDetail;