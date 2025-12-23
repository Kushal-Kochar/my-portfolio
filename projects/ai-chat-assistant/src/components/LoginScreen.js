import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = login(formData);
      onLogin(userData);
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoData = {
      name: 'Demo User',
      email: 'demo@example.com'
    };
    setFormData(demoData);
    setIsLoading(true);
    
    setTimeout(() => {
      const userData = login(demoData);
      onLogin(userData);
    }, 1000);
  };

  return (
    <div className="login-screen">
      {/* Theme Toggle */}
      <motion.button
        className="theme-toggle-login"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'} />
      </motion.button>

      <div className="login-container">
        <motion.div
          className="login-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Title */}
          <motion.div
            className="login-header"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="login-logo">
              <div className="logo-circle">
                <motion.i
                  className="fas fa-robot"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </div>
            <h1>AI Chat Assistant</h1>
            <p>Your intelligent conversation partner</p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            className="login-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </div>

            {errors.general && (
              <motion.div
                className="general-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-exclamation-circle" />
                {errors.general}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="login-btn primary"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <motion.i
                    className="fas fa-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Starting Chat...
                </>
              ) : (
                <>
                  <i className="fas fa-comments" />
                  Start Chatting
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              className="login-btn demo"
              onClick={handleDemoLogin}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              <i className="fas fa-play" />
              Try Demo
            </motion.button>
          </motion.form>

          {/* Features */}
          <motion.div
            className="login-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="feature-grid">
              <div className="feature">
                <i className="fas fa-brain" />
                <span>Smart AI</span>
              </div>
              <div className="feature">
                <i className="fas fa-lock" />
                <span>Private</span>
              </div>
              <div className="feature">
                <i className="fas fa-mobile-alt" />
                <span>Responsive</span>
              </div>
              <div className="feature">
                <i className="fas fa-palette" />
                <span>Customizable</span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="login-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>By continuing, you agree to have amazing conversations with AI!</p>
            <div className="footer-links">
              <span>Created with ❤️ by Kushal Kochar</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
