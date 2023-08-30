import React, { useState } from 'react';
import './menu.css';

function Menu(props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="toggle-button" onClick={toggleMenu}>
        <span className="icon">{isExpanded ? '➤' : '➔'}</span>
      </div>
      <ul className="menu-items">
        {isExpanded ? (
          <>
            <li>
              <span className="menu-icon">👤</span> User Management
            </li>
            <li>
                <span className="menu-icon">📈</span> Dashboard
            </li>
            <li>
              <span className="menu-icon">📊</span> Reports
            </li>
          </>
        ) : (
          <>
            <li className="collapsed-menu-item">
              <span className="menu-icon">👤</span>
            </li>
            <li className="collapsed-menu-item">
              <span className="menu-icon">📈</span>
            </li>
            <li className="collapsed-menu-item">
              <span className="menu-icon">📊</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Menu;
