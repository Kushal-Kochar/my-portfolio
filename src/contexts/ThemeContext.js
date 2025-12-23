import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    console.log('Theme initialization:', { savedTheme, systemPrefersDark });
    
    if (savedTheme) {
      console.log('Using saved theme:', savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    } else {
      console.log('Using system preference:', systemPrefersDark ? 'dark' : 'light');
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    console.log('Applying theme:', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      console.log('Applied dark-theme class');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      console.log('Applied light-theme class');
    }

    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    console.log('Saved theme to localStorage:', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('toggleTheme called, current isDarkMode:', isDarkMode);
    setIsDarkMode(!isDarkMode);
    console.log('toggleTheme will change to:', !isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
