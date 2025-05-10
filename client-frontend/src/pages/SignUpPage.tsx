import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase';
import './SignUpPage.css';

initializeApp(firebaseConfig);

const SignUpPage: React.FC = () => {
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log('Google Token:', token);
      // Store token in localStorage or context for later use
    } catch (error) {
      console.error('Google Sign-Up Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <button className="signup-button" onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </div>
  );
};

export default SignUpPage;