import React, { useState } from 'react';
import Menu from './components/menu';
import Content from './components/content';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Content isOpen={isMenuOpen} />
    </div>
  );
}

export default App;
