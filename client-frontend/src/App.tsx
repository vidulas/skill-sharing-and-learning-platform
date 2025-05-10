import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionsProvider } from './contexts/QuestionsContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateQuestion from './pages/CreateQuestion';
import ViewQuestions from './pages/ViewQuestions';
import UpdateQuestion from './pages/UpdateQuestion';
export function App() {
  return <QuestionsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateQuestion />} />
            <Route path="/questions" element={<ViewQuestions />} />
            <Route path="/questions/:id" element={<UpdateQuestion />} />
          </Routes>
        </Layout>
      </Router>
    </QuestionsProvider>;
}