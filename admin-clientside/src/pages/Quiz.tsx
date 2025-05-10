import React from "react";
import { QuizContainer } from "../components/QuizContainer";

const Quiz: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Skill Sharing Platform
          </h1>
          <p className="text-gray-600 mt-2">
            Test your knowledge with our interactive quizzes
          </p>
        </header>
        <main>
          <QuizContainer />
        </main>
      </div>
    </div>
  );
};
export default Quiz;