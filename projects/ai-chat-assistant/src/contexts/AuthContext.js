import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data on app start
    const savedUser = localStorage.getItem('chatapp_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('chatapp_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userProfile = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6366f1&color=fff`,
      joinedAt: new Date().toISOString(),
      preferences: {
        aiPersonality: 'helpful',
        notifications: true,
        saveHistory: true
      }
    };

    setUser(userProfile);
    setIsAuthenticated(true);
    localStorage.setItem('chatapp_user', JSON.stringify(userProfile));
    
    return userProfile;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chatapp_user');
    localStorage.removeItem('chatapp_conversations');
    localStorage.removeItem('chatapp_theme');
  };

  const updateUserPreferences = (preferences) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      setUser(updatedUser);
      localStorage.setItem('chatapp_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserPreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
