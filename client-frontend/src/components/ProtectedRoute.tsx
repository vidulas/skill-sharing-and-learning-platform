// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or a spinner/loading component

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
