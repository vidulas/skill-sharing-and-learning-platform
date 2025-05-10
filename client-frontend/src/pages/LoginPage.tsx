import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase';
import './LoginPage.css';

initializeApp(firebaseConfig);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log('Google Token:', token);
      // Store token in localStorage or context for later use

      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <button className="login-button" onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
