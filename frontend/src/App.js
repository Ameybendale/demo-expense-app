import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ExpenseHome from './pages/ExpenseHome';

function App() {
  const isLoggedIn = !!localStorage.getItem('userId');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected route – if not logged in, redirect to login */}
      <Route
        path="/"
        element={isLoggedIn ? <ExpenseHome /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
