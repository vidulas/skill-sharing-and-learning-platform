import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import {
  BookOpenIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserPlusIcon,
  BookIcon,
  LayoutDashboardIcon,
  GoalIcon,
} from "lucide-react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpenIcon className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">SkillShare</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <a
                  href="http://localhost:3000"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <GoalIcon className="h-5 w-5" />
                  <span>Create Goal</span>
                </a>
                <Link
                  to="/create-post"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <BookIcon className="h-5 w-5" />
                  <span>Create Post</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LogInIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>
          {/* Mobile menu button */}
          <div className="md:hidden">
            {/* Mobile menu implementation would go here */}
            <button className="p-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <BookOpenIcon className="h-6 w-6 text-indigo-400" />
                <span className="text-lg font-bold">SkillShare</span>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                A platform for sharing skills and knowledge with others. Learn,
                teach, and grow together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Company
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SkillShare Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
