import React, { useState, useEffect } from 'react';
import './App.css';

// Context Providers
import { ChatProvider } from './contexts/ChatContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Check if user was previously logged in
      const savedUser = localStorage.getItem('chatapp_user');
      if (savedUser) {
        setCurrentView('chat');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('chatapp_user', JSON.stringify(userData));
    setCurrentView('chat');
  };

  const handleLogout = () => {
    localStorage.removeItem('chatapp_user');
    setCurrentView('login');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <div className="app">
            {currentView === 'login' ? (
              <LoginScreen onLogin={handleLogin} />
            ) : (
              <ChatInterface onLogout={handleLogout} />
            )}
          </div>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
