import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [exportFormat, setExportFormat] = useState('txt');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { isDarkMode, toggleTheme } = useTheme();
  const { updateUserPreferences, user } = useAuth();
  const { 
    aiPersonality, 
    setAiPersonality, 
    personalities, 
    conversations,
    exportConversation,
    clearAllConversations
  } = useChat();

  const [localPreferences, setLocalPreferences] = useState({
    notifications: user?.preferences?.notifications ?? true,
    saveHistory: user?.preferences?.saveHistory ?? true,
    autoScroll: user?.preferences?.autoScroll ?? true,
    soundEffects: user?.preferences?.soundEffects ?? false
  });

  const handlePreferenceChange = (key, value) => {
    const newPreferences = { ...localPreferences, [key]: value };
    setLocalPreferences(newPreferences);
    updateUserPreferences(newPreferences);
  };

  const handleExportAllConversations = () => {
    conversations.forEach(conversation => {
      const content = exportConversation(conversation.id, exportFormat);
      if (content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${conversation.title}.${exportFormat}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleClearAllData = () => {
    clearAllConversations();
    setShowDeleteConfirm(false);
    onClose();
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'ai', label: 'AI Settings', icon: 'fas fa-robot' },
    { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
    { id: 'data', label: 'Data & Privacy', icon: 'fas fa-shield-alt' }
  ];

  const modalVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const tabContentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="settings-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="settings-modal"
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="header-content">
              <i className="fas fa-cog" />
              <h2>Settings</h2>
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
            {/* Tabs */}
            <div className="settings-tabs">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={tab.icon} />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <AnimatePresence mode="wait">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <motion.div
                    key="general"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="settings-section"
                  >
                    <h3>General Preferences</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Enable Notifications</label>
                        <span>Get notified about new features and updates</span>
                      </div>
                      <motion.label className="toggle-switch" whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          checked={localPreferences.notifications}
                          onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                        />
                        <span className="toggle-slider" />
                      </motion.label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Save Chat History</label>
                        <span>Automatically save conversations locally</span>
                      </div>
                      <motion.label className="toggle-switch" whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          checked={localPreferences.saveHistory}
                          onChange={(e) => handlePreferenceChange('saveHistory', e.target.checked)}
                        />
                        <span className="toggle-slider" />
                      </motion.label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Auto-scroll to New Messages</label>
                        <span>Automatically scroll to the latest message</span>
                      </div>
                      <motion.label className="toggle-switch" whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          checked={localPreferences.autoScroll}
                          onChange={(e) => handlePreferenceChange('autoScroll', e.target.checked)}
                        />
                        <span className="toggle-slider" />
                      </motion.label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Sound Effects</label>
                        <span>Play sounds for message notifications</span>
                      </div>
                      <motion.label className="toggle-switch" whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          checked={localPreferences.soundEffects}
                          onChange={(e) => handlePreferenceChange('soundEffects', e.target.checked)}
                        />
                        <span className="toggle-slider" />
                      </motion.label>
                    </div>
                  </motion.div>
                )}

                {/* AI Settings */}
                {activeTab === 'ai' && (
                  <motion.div
                    key="ai"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="settings-section"
                  >
                    <h3>AI Assistant Configuration</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Default AI Personality</label>
                        <span>Choose the default personality for new conversations</span>
                      </div>
                      <select
                        value={aiPersonality}
                        onChange={(e) => setAiPersonality(e.target.value)}
                        className="setting-select"
                      >
                        {Object.entries(personalities).map(([key, personality]) => (
                          <option key={key} value={key}>
                            {personality.avatar} {personality.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="personality-preview">
                      <h4>Current Personality: {personalities[aiPersonality]?.name}</h4>
                      <div className="personality-card">
                        <div className="personality-avatar">
                          {personalities[aiPersonality]?.avatar}
                        </div>
                        <div className="personality-details">
                          <p><strong>Description:</strong> {personalities[aiPersonality]?.description}</p>
                          <p><strong>Style:</strong> {personalities[aiPersonality]?.systemPrompt}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <motion.div
                    key="appearance"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="settings-section"
                  >
                    <h3>Appearance & Theme</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Dark Mode</label>
                        <span>Switch between light and dark themes</span>
                      </div>
                      <motion.label className="toggle-switch" whileTap={{ scale: 0.95 }}>
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={toggleTheme}
                        />
                        <span className="toggle-slider" />
                      </motion.label>
                    </div>

                    <div className="theme-preview">
                      <h4>Current Theme: {isDarkMode ? 'Dark' : 'Light'}</h4>
                      <div className="theme-demo">
                        <div className="demo-message user">
                          <div className="demo-avatar">👤</div>
                          <div className="demo-bubble">This is how your messages look!</div>
                        </div>
                        <div className="demo-message ai">
                          <div className="demo-avatar">🤖</div>
                          <div className="demo-bubble">And this is how I respond to you!</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Data & Privacy Settings */}
                {activeTab === 'data' && (
                  <motion.div
                    key="data"
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="settings-section"
                  >
                    <h3>Data Management & Privacy</h3>
                    
                    <div className="data-stats">
                      <div className="stat-item">
                        <i className="fas fa-comments" />
                        <div>
                          <span className="stat-number">{conversations.length}</span>
                          <span className="stat-label">Conversations</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <i className="fas fa-comment" />
                        <div>
                          <span className="stat-number">
                            {conversations.reduce((total, conv) => total + conv.messages.length, 0)}
                          </span>
                          <span className="stat-label">Messages</span>
                        </div>
                      </div>
                    </div>

                    <div className="data-actions">
                      <h4>Export Data</h4>
                      <div className="export-section">
                        <select
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="export-format"
                        >
                          <option value="txt">Text (.txt)</option>
                          <option value="json">JSON (.json)</option>
                        </select>
                        <motion.button
                          className="export-btn"
                          onClick={handleExportAllConversations}
                          disabled={conversations.length === 0}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className="fas fa-download" />
                          Export All Conversations
                        </motion.button>
                      </div>
                    </div>

                    <div className="danger-zone">
                      <h4>Danger Zone</h4>
                      <div className="danger-actions">
                        <motion.button
                          className="danger-btn"
                          onClick={() => setShowDeleteConfirm(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className="fas fa-trash" />
                          Clear All Data
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                className="confirm-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                <motion.div
                  className="confirm-modal"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="confirm-header">
                    <i className="fas fa-exclamation-triangle" />
                    <h3>Clear All Data</h3>
                  </div>
                  <p>
                    This will permanently delete all your conversations, settings, and user data. 
                    This action cannot be undone.
                  </p>
                  <div className="confirm-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-btn"
                      onClick={handleClearAllData}
                    >
                      <i className="fas fa-trash" />
                      Clear All Data
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
