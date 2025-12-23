import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import './UserProfileModal.css';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUserPreferences } = useAuth();
  const { conversations, personalities } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const modalVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    console.log('Profile updated:', editData);
  };

  const handleAvatarChange = () => {
    // In a real app, this would open file picker or avatar selection
    console.log('Avatar change requested');
  };

  const getActivityStats = () => {
    const totalMessages = conversations.reduce((total, conv) => total + conv.messages.length, 0);
    const userMessages = conversations.reduce((total, conv) => 
      total + conv.messages.filter(msg => msg.sender === 'user').length, 0
    );
    const aiMessages = totalMessages - userMessages;
    
    const personalityUsage = {};
    conversations.forEach(conv => {
      const personality = conv.personality || 'helpful';
      personalityUsage[personality] = (personalityUsage[personality] || 0) + 1;
    });

    const mostUsedPersonality = Object.entries(personalityUsage).reduce(
      (max, [key, count]) => count > max.count ? { personality: key, count } : max,
      { personality: 'helpful', count: 0 }
    );

    return {
      totalConversations: conversations.length,
      totalMessages,
      userMessages,
      aiMessages,
      mostUsedPersonality: personalities[mostUsedPersonality.personality] || personalities.helpful,
      joinDate: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'
    };
  };

  const stats = getActivityStats();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="profile-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="profile-modal"
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="header-content">
              <i className="fas fa-user-circle" />
              <h2>User Profile</h2>
            </div>
            <motion.button
              className="close-modal"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar-section">
                <div className="profile-avatar-container">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="profile-avatar-large"
                  />
                  <motion.button
                    className="avatar-edit-btn"
                    onClick={handleAvatarChange}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Change avatar"
                  >
                    <i className="fas fa-camera" />
                  </motion.button>
                </div>
                <div className="profile-status">
                  <div className="status-indicator online" />
                  <span>Online</span>
                </div>
              </div>

              <div className="profile-info">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="edit-actions">
                      <button
                        className="cancel-btn"
                        onClick={() => {
                          setIsEditing(false);
                          setEditData({ name: user?.name || '', email: user?.email || '' });
                        }}
                      >
                        Cancel
                      </button>
                      <motion.button
                        className="save-btn"
                        onClick={handleSaveProfile}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="fas fa-check" />
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-display">
                    <h3>{user?.name}</h3>
                    <p className="user-email">{user?.email}</p>
                    <p className="join-date">
                      <i className="fas fa-calendar" />
                      Joined {stats.joinDate}
                    </p>
                    <motion.button
                      className="edit-profile-btn"
                      onClick={() => setIsEditing(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fas fa-edit" />
                      Edit Profile
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* Activity Stats */}
            <div className="activity-section">
              <h3>Activity Statistics</h3>
              <div className="stats-grid">
                <motion.div 
                  className="stat-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="stat-icon">
                    <i className="fas fa-comments" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.totalConversations}</span>
                    <span className="stat-label">Conversations</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="stat-icon">
                    <i className="fas fa-comment" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.totalMessages}</span>
                    <span className="stat-label">Total Messages</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="stat-icon">
                    <i className="fas fa-user" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.userMessages}</span>
                    <span className="stat-label">Your Messages</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="stat-card"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="stat-icon">
                    <i className="fas fa-robot" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.aiMessages}</span>
                    <span className="stat-label">AI Responses</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Preferences Preview */}
            <div className="preferences-section">
              <h3>Quick Preferences</h3>
              
              <div className="preference-item">
                <div className="preference-info">
                  <i className="fas fa-robot" />
                  <div>
                    <span className="preference-label">Favorite AI Personality</span>
                    <span className="preference-value">
                      {stats.mostUsedPersonality.avatar} {stats.mostUsedPersonality.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <i className="fas fa-bell" />
                  <div>
                    <span className="preference-label">Notifications</span>
                    <span className="preference-value">
                      {user?.preferences?.notifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <i className="fas fa-history" />
                  <div>
                    <span className="preference-label">Save History</span>
                    <span className="preference-value">
                      {user?.preferences?.saveHistory ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Section */}
            <div className="achievements-section">
              <h3>Achievements</h3>
              <div className="achievements-grid">
                <motion.div 
                  className={`achievement-badge ${stats.totalConversations >= 1 ? 'earned' : 'locked'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-comment" />
                  <span>First Chat</span>
                </motion.div>

                <motion.div 
                  className={`achievement-badge ${stats.totalConversations >= 5 ? 'earned' : 'locked'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-comments" />
                  <span>Conversationalist</span>
                </motion.div>

                <motion.div 
                  className={`achievement-badge ${stats.totalMessages >= 50 ? 'earned' : 'locked'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-medal" />
                  <span>Chatty</span>
                </motion.div>

                <motion.div 
                  className={`achievement-badge ${stats.totalMessages >= 100 ? 'earned' : 'locked'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-trophy" />
                  <span>Chat Master</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <div className="footer-info">
              <p>Your data is stored locally in your browser and is never shared with third parties.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileModal;
