import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsComposing(e.target.value.length > 0);
  };

  const quickSuggestions = [
    '👋 Hello!',
    '❓ Help me with...',
    '💡 Explain...',
    '🔧 How do I...',
    '📚 Tell me about...',
    '✨ Generate...'
  ];

  const handleQuickSuggestion = (suggestion) => {
    const cleanText = suggestion.replace(/^[^\w\s]+\s*/, ''); // Remove emoji and space
    setMessage(cleanText);
    textareaRef.current?.focus();
  };

  return (
    <div className="message-input-container">
      {/* Quick Suggestions (shown when input is empty) */}
      <AnimatePresence>
        {!isComposing && message.length === 0 && (
          <motion.div
            className="quick-suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className="suggestion-chip"
                onClick={() => handleQuickSuggestion(suggestion)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Area */}
      <form className="message-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          {/* Attachment Button */}
          <motion.button
            type="button"
            className="attachment-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={disabled}
            title="Attach file (Coming soon)"
          >
            <i className="fas fa-paperclip" />
          </motion.button>

          {/* Text Input */}
          <div className="textarea-container">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? 'AI is responding...' : 'Type your message here...'}
              disabled={disabled}
              rows={1}
              maxLength={4000}
            />
            
            {/* Character Counter */}
            <AnimatePresence>
              {message.length > 3500 && (
                <motion.div
                  className="char-counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {4000 - message.length}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Voice Input Button */}
          <motion.button
            type="button"
            className="voice-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={disabled}
            title="Voice input (Coming soon)"
          >
            <i className="fas fa-microphone" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            type="submit"
            className={`send-btn ${message.trim() && !disabled ? 'active' : ''}`}
            disabled={!message.trim() || disabled}
            whileHover={message.trim() && !disabled ? { scale: 1.1 } : {}}
            whileTap={message.trim() && !disabled ? { scale: 0.9 } : {}}
            title={disabled ? 'Please wait...' : 'Send message'}
          >
            <AnimatePresence mode="wait">
              {disabled ? (
                <motion.i
                  key="loading"
                  className="fas fa-spinner fa-spin"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                />
              ) : message.trim() ? (
                <motion.i
                  key="send"
                  className="fas fa-paper-plane"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                />
              ) : (
                <motion.i
                  key="send-disabled"
                  className="fas fa-paper-plane"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Input Footer */}
        <div className="input-footer">
          <div className="input-info">
            <span className="info-text">
              <i className="fas fa-info-circle" />
              Press Enter to send, Shift+Enter for new line
            </span>
          </div>

          <div className="input-actions">
            {/* Format Buttons */}
            <div className="format-buttons">
              <motion.button
                type="button"
                className="format-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const textarea = textareaRef.current;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = message.substring(start, end);
                  const newText = message.substring(0, start) + `**${selectedText}**` + message.substring(end);
                  setMessage(newText);
                  textarea.focus();
                }}
                title="Bold text"
              >
                <i className="fas fa-bold" />
              </motion.button>

              <motion.button
                type="button"
                className="format-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const textarea = textareaRef.current;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = message.substring(start, end);
                  const newText = message.substring(0, start) + `*${selectedText}*` + message.substring(end);
                  setMessage(newText);
                  textarea.focus();
                }}
                title="Italic text"
              >
                <i className="fas fa-italic" />
              </motion.button>

              <motion.button
                type="button"
                className="format-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const textarea = textareaRef.current;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const selectedText = message.substring(start, end);
                  const newText = message.substring(0, start) + `\`${selectedText}\`` + message.substring(end);
                  setMessage(newText);
                  textarea.focus();
                }}
                title="Code"
              >
                <i className="fas fa-code" />
              </motion.button>
            </div>

            {/* Clear Button */}
            <AnimatePresence>
              {message.length > 0 && (
                <motion.button
                  type="button"
                  className="clear-btn"
                  onClick={() => {
                    setMessage('');
                    textareaRef.current?.focus();
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Clear message"
                >
                  <i className="fas fa-trash" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
