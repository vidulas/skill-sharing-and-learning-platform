import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogInIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase';
import Input from '../components/Input';
import Button from '../components/Button';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login,
    loading
  } = useAuth();
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };
  return <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <LogInIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Log in to your SkillShare account
          </p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span>{error}</span>
          </div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input label="Email Address" type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Password" type="password" id="password" name="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
              <button className="login-button" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Login;