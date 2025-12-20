import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <i className="fas fa-tasks"></i>
          <span>TaskFlow</span>
        </div>
        
        <nav className="navigation">
          <a href="#home" className="nav-link active">
            <i className="fas fa-home"></i>
            Dashboard
          </a>
          <a href="#tasks" className="nav-link">
            <i className="fas fa-list-check"></i>
            Tasks
          </a>
          <a href="#analytics" className="nav-link">
            <i className="fas fa-chart-bar"></i>
            Analytics
          </a>
        </nav>
        
        <div className="header-actions">
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-profile">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <span className="user-name">Kushal K.</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
