import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, CheckCircleIcon, UsersIcon } from 'lucide-react';
import { usePost } from '../contexts/PostContext';
import { useQuiz } from '../contexts/QuizContext';
import PostCard from '../components/PostCard';
import QuizCard from '../components/QuizCard';
import Button from '../components/Button';

const mockQuizzes = [
  {
    id: '1',
    title: 'React Basics',
    description: 'Learn the fundamentals of React.',
    questions: [{}, {}, {}], // Mock 3 questions
    timeInMinutes: 10,
    difficulty: 'Beginner',
    participants: 120,
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Advanced CSS',
    description: 'Master advanced CSS techniques.',
    questions: [{}, {}, {}, {}, {}], // Mock 5 questions
    timeInMinutes: 15,
    difficulty: 'Intermediate',
    participants: 80,
    category: 'Design',
  },
  {
    id: '3',
    title: 'TypeScript Essentials',
    description: 'Get started with TypeScript.',
    questions: [{}, {}, {}, {}], // Mock 4 questions
    timeInMinutes: 12,
    difficulty: 'Advanced',
    participants: 100,
    category: 'Programming',
  },
];


const Home = () => {
  const mockPosts = [];
  const {
    posts,
    loading: postsLoading
  } = usePost();
  const {
    questions,
    loading: quizzesLoading
  } = useQuiz();
  // Get featured posts (most liked)

  const featuredPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);
  // Get featured quizzes (most participants)
  const featuredQuizzes = mockQuizzes
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Share Knowledge, Grow Together
              </h1>
              <p className="text-lg mb-8 text-indigo-100">
                Join our community of learners and experts to share skills,
                knowledge, and experiences. Create posts, take quizzes, and
                connect with like-minded individuals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Join Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-indigo-600">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" alt="People collaborating" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpenIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Share Your Knowledge</h3>
              <p className="text-gray-600">
                Create posts to share your expertise with the community. Help
                others learn and grow while establishing yourself as an expert.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Test Your Skills</h3>
              <p className="text-gray-600">
                Challenge yourself with quizzes on various topics. Track your
                progress and identify areas for improvement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Others</h3>
              <p className="text-gray-600">
                Join a community of learners and experts. Collaborate, discuss,
                and build connections with like-minded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Posts Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Posts</h2>
            <Link to="/dashboard" className="text-indigo-600 font-medium hover:underline">
              View All
            </Link>
          </div>
          {postsLoading ? <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div> : <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map(post => <PostCard key={post.id} id={post.id} title={post.title} excerpt={post.excerpt} author={post.author} category={post.category} createdAt={new Date(post.createdAt).toLocaleDateString()} likes={post.likes} comments={post.comments.length} image={post.image} />)}
            </div>}
        </div>
      </section>
      {/* Featured Quizzes Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Quizzes</h2>
            <Link to="/dashboard" className="text-indigo-600 font-medium hover:underline">
              View All
            </Link>
          </div>
          {quizzesLoading ? <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div> : <div className="grid md:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                description={quiz.description}
                questionsCount={quiz.questions.length}
                timeInMinutes={quiz.timeInMinutes}
                difficulty={quiz.difficulty}
                participants={quiz.participants}
                category={quiz.category}
              />
            ))}
            </div>}
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 px-4 bg-indigo-700 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Sharing Your Knowledge?
          </h2>
          <p className="text-lg mb-8 text-indigo-100">
            Join our community today and start sharing your expertise, learning
            new skills, and connecting with others.
          </p>
          <Link to="/signup">
            <Button variant="primary" size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;