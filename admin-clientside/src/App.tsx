import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { QuizProvider } from './contexts/QuizContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Quiz from './pages/Quiz';
export function App() {
  return <Router>
      <AuthProvider>
        <PostProvider>
          <QuizProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/quiz" element={<Quiz/>}/>
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                {/* <Route path="/quiz/:id" element={<Quiz />} /> */}
              </Routes>
            </Layout>
          </QuizProvider>
        </PostProvider>
      </AuthProvider>
    </Router>;
}