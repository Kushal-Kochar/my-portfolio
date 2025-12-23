import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Components
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import SettingsModal from './SettingsModal';
import UserProfileModal from './UserProfileModal';

import './ChatInterface.css';

const ChatInterface = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { 
    activeConversationId, 
    createNewConversation, 
    getActiveConversation,
    isTyping,
    sendMessage 
  } = useChat();
  
  const chatContainerRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile when screen becomes small
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create initial conversation if none exists
  useEffect(() => {
    if (!activeConversationId) {
      createNewConversation('Welcome Chat');
    }
  }, [activeConversationId, createNewConversation]);

  const handleSendMessage = (message, type = 'text') => {
    sendMessage(message, type);
  };

  const handleNewChat = () => {
    createNewConversation();
    // Close sidebar on mobile after creating new chat
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const activeConversation = getActiveConversation();

  return (
    <div className="chat-interface">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <motion.div
          className="sidebar-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <Sidebar
            isOpen={isSidebarOpen}
            isMobile={isMobile}
            onClose={() => setIsSidebarOpen(false)}
            onNewChat={handleNewChat}
            onSettingsOpen={() => setIsSettingsOpen(true)}
            onProfileOpen={() => setIsProfileOpen(true)}
            onLogout={onLogout}
          />
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className={`chat-main ${isSidebarOpen && !isMobile ? 'with-sidebar' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <motion.button
              className="sidebar-toggle"
              onClick={toggleSidebar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle sidebar"
            >
              <i className={isSidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </motion.button>
            
            <div className="conversation-info">
              <h2>{activeConversation?.title || 'New Conversation'}</h2>
              <span className="conversation-count">
                {activeConversation?.messages?.length || 0} messages
              </span>
            </div>
          </div>

          <div className="header-right">
            <motion.button
              className="theme-toggle-header"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <motion.i
                className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="new-chat-btn"
              onClick={handleNewChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Start new chat"
            >
              <i className="fas fa-plus" />
              <span className="btn-text">New Chat</span>
            </motion.button>

            <div className="user-avatar" onClick={() => setIsProfileOpen(true)}>
              <img src={user?.avatar} alt={user?.name} />
              <div className="user-status online" />
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="chat-container" ref={chatContainerRef}>
          {activeConversation ? (
            <ChatArea 
              conversation={activeConversation}
              isTyping={isTyping}
              containerRef={chatContainerRef}
            />
          ) : (
            <div className="no-conversation">
              <div className="no-conversation-content">
                <i className="fas fa-comments" />
                <h3>Welcome to AI Chat Assistant!</h3>
                <p>Start a new conversation to begin chatting with your AI assistant.</p>
                <motion.button
                  className="start-chat-btn"
                  onClick={handleNewChat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-plus" />
                  Start New Chat
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        {activeConversation && (
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <UserProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;
