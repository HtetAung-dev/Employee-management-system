import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {
  const { token } = useSelector((state) => state.auth); // Get the token from Redux

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
