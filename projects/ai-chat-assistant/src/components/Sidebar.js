import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = ({ 
  isOpen, 
  isMobile, 
  onClose, 
  onNewChat, 
  onSettingsOpen, 
  onProfileOpen, 
  onLogout 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  const { user } = useAuth();
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    deleteConversation,
    clearAllConversations,
    personalities,
    aiPersonality,
    setAiPersonality
  } = useChat();

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages.some(msg => 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    if (isMobile) {
      onClose();
    }
  };

  const handleDeleteConversation = (e, conversationId) => {
    e.stopPropagation();
    deleteConversation(conversationId);
    setShowDeleteConfirm(null);
  };

  const handleClearAll = () => {
    clearAllConversations();
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div
      className={`sidebar ${isMobile ? 'mobile' : ''}`}
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="user-info" onClick={onProfileOpen}>
          <img src={user?.avatar} alt={user?.name} className="user-avatar-small" />
          <div className="user-details">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>
        
        {isMobile && (
          <motion.button
            className="close-sidebar"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-times" />
          </motion.button>
        )}
      </div>

      {/* New Chat Button */}
      <motion.button
        className="new-chat-button"
        onClick={onNewChat}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <i className="fas fa-plus" />
        <span>New Conversation</span>
      </motion.button>

      {/* AI Personality Selector */}
      <div className="personality-selector">
        <label>AI Personality</label>
        <select
          value={aiPersonality}
          onChange={(e) => setAiPersonality(e.target.value)}
          className="personality-select"
        >
          {Object.entries(personalities).map(([key, personality]) => (
            <option key={key} value={key}>
              {personality.avatar} {personality.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="conversations-section">
        <div className="section-header">
          <span>Recent Conversations ({filteredConversations.length})</span>
          {conversations.length > 0 && (
            <motion.button
              className="clear-all-btn"
              onClick={() => setShowDeleteConfirm('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear all conversations"
            >
              <i className="fas fa-trash" />
            </motion.button>
          )}
        </div>

        <div className="conversations-list">
          <AnimatePresence>
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  className={`conversation-item ${
                    conversation.id === activeConversationId ? 'active' : ''
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  layout
                >
                  <div className="conversation-content">
                    <div className="conversation-header">
                      <h4 className="conversation-title">{conversation.title}</h4>
                      <span className="conversation-date">
                        {formatDate(conversation.updatedAt)}
                      </span>
                    </div>
                    
                    <div className="conversation-preview">
                      {conversation.messages.length > 0 ? (
                        <span>
                          {conversation.messages[conversation.messages.length - 1].content.substring(0, 60)}
                          {conversation.messages[conversation.messages.length - 1].content.length > 60 ? '...' : ''}
                        </span>
                      ) : (
                        <span className="empty-conversation">No messages yet</span>
                      )}
                    </div>

                    <div className="conversation-meta">
                      <span className="message-count">
                        <i className="fas fa-comment" />
                        {conversation.messages.length}
                      </span>
                      <span className="personality-indicator">
                        {personalities[conversation.personality]?.avatar}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    className="delete-conversation"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(conversation.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete conversation"
                  >
                    <i className="fas fa-trash" />
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="no-conversations">
                {searchTerm ? (
                  <>
                    <i className="fas fa-search" />
                    <p>No conversations found</p>
                    <span>Try adjusting your search terms</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-comments" />
                    <p>No conversations yet</p>
                    <span>Start a new chat to get going!</span>
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <motion.button
          className="footer-button"
          onClick={onSettingsOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-cog" />
          <span>Settings</span>
        </motion.button>
        
        <motion.button
          className="footer-button logout"
          onClick={onLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-sign-out-alt" />
          <span>Logout</span>
        </motion.button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="delete-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              className="delete-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-modal-header">
                <i className="fas fa-exclamation-triangle" />
                <h3>Confirm Deletion</h3>
              </div>
              
              <p>
                {showDeleteConfirm === 'all'
                  ? 'Are you sure you want to delete ALL conversations? This action cannot be undone.'
                  : 'Are you sure you want to delete this conversation? This action cannot be undone.'
                }
              </p>
              
              <div className="delete-modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (showDeleteConfirm === 'all') {
                      handleClearAll();
                    } else {
                      handleDeleteConversation(null, showDeleteConfirm);
                    }
                  }}
                >
                  <i className="fas fa-trash" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
