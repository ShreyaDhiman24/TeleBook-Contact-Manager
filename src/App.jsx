// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddEditContact from './pages/AddEditContact';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEditContact />} />
            <Route path="/edit/:id" element={<AddEditContact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
