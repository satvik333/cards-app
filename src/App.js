import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Content from './components/content';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <Menu toggleMenu={toggleMenu} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Content isOpen={isMenuOpen} />
    </div>
  );
}

export default App;
