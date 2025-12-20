import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-tasks"></i>
              <span>TaskFlow</span>
            </div>
            <p className="footer-description">
              A modern task management application built with React.js and Spring Boot. 
              Stay organized and boost your productivity.
            </p>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul className="footer-links">
              <li><i className="fas fa-check"></i>Task Management</li>
              <li><i className="fas fa-chart-bar"></i>Analytics Dashboard</li>
              <li><i className="fas fa-mobile-alt"></i>Responsive Design</li>
              <li><i className="fas fa-save"></i>Auto-save</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Technology Stack</h4>
            <ul className="footer-links">
              <li><i className="fab fa-react"></i>React.js</li>
              <li><i className="fas fa-coffee"></i>Spring Boot</li>
              <li><i className="fas fa-database"></i>Local Storage</li>
              <li><i className="fas fa-paint-brush"></i>CSS3</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/Kushal-Kochar" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/kushal-kochar-158b99143" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:kushalrkk19@gmail.com">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <p className="developer-credit">
              Built with ❤️ by <strong>Kushal Kochar</strong>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} TaskFlow. All rights reserved.</p>
            <div className="footer-badges">
              <span className="badge">
                <i className="fas fa-code"></i>
                Open Source
              </span>
              <span className="badge">
                <i className="fas fa-mobile-alt"></i>
                Mobile Friendly
              </span>
              <span className="badge">
                <i className="fas fa-lock"></i>
                Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
