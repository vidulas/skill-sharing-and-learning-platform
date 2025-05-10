import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostItem from './components/posts/PostItem';
import NotificationList from './components/notifications/NotificationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Demo post data (replace with real API call in production)
const demoPost = {
  id: "1",  // Make sure the ID is present and matches expected format
  title: "Introduction to React Hooks",
  content: "React Hooks are a powerful feature that let you use state and other React features without writing a class. They were introduced in React 16.8 and have changed how we write React components.",
  authorName: "John Doe",
  authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
  createdAt: new Date().toISOString(),
  imageUrl: "https://miro.medium.com/max/1200/1*Wt_aX3GhLfX0BlRRXRioLQ.png"
};

// Set a default user ID for demo purposes
localStorage.setItem('userId', 'user123');

function App() {
  return (
    <Router>
      <div className="app-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <h1 className="page-title">Skill Sharing Platform</h1>
                <div className="row">
                  <div className="col-md-8">
                    <PostItem post={demoPost} />
                  </div>
                  <div className="col-md-4">
                    <NotificationList />
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
