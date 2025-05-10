import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import Input from '../components/Input';
import Button from '../components/Button';
const CreatePost = () => {
  const {
    user
  } = useAuth();
  const {
    createPost
  } = usePost();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  if (!user) {
    navigate('/login');
    return null;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      setLoading(true);
      setError('');
      // Create excerpt from content (first 150 characters)
      const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
      await createPost({
        title,
        content,
        excerpt,
        category,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        },
        image: image || undefined
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <BookIcon className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span>{error}</span>
        </div>}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input label="Post Title" id="title" name="title" placeholder="Enter a descriptive title" value={title} onChange={e => setTitle(e.target.value)} required />
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select id="category" name="category" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="DevOps">DevOps</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Career">Career</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input label="Cover Image URL (optional)" id="image" name="image" placeholder="https://example.com/image.jpg" value={image} onChange={e => setImage(e.target.value)} />
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea id="content" name="content" rows={10} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Write your post content here..." value={content} onChange={e => setContent(e.target.value)} required></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>;
};
export default CreatePost;