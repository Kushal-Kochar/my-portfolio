import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Message.css';

const Message = ({ 
  message, 
  isUser, 
  userName, 
  userAvatar, 
  aiPersonality,
  previousMessage 
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if we should show avatar (first message in sequence or different sender)
  const showAvatar = !previousMessage || previousMessage.sender !== message.sender;

  // Check if message is part of a sequence
  const isSequence = previousMessage && 
    previousMessage.sender === message.sender &&
    new Date(message.timestamp) - new Date(previousMessage.timestamp) < 60000; // Within 1 minute

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className={`message ${isUser ? 'user' : 'ai'} ${isSequence ? 'sequence' : ''} ${message.isError ? 'error' : ''}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.01 }}
      onClick={() => setShowTimestamp(!showTimestamp)}
    >
      {/* Avatar */}
      {showAvatar && (
        <motion.div
          className="message-avatar"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {isUser ? (
            <img src={userAvatar} alt={userName} />
          ) : (
            <div className="ai-avatar">
              <span className="ai-emoji">{aiPersonality?.avatar || '🤖'}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Message Content */}
      <div className="message-content">
        {/* Sender name (for first message in sequence) */}
        {showAvatar && (
          <div className="message-sender">
            {isUser ? userName : aiPersonality?.name || 'AI Assistant'}
            {!isUser && aiPersonality?.description && (
              <span className="ai-description">• {aiPersonality.description}</span>
            )}
          </div>
        )}

        {/* Message bubble */}
        <motion.div
          className="message-bubble"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          {/* Message text with markdown support for AI messages */}
          <div className="message-text">
            {isUser ? (
              <span>{message.content}</span>
            ) : (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        className="code-block"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Message actions */}
          <div className="message-actions">
            {/* Copy button */}
            <motion.button
              className="action-btn copy-btn"
              onClick={(e) => {
                e.stopPropagation();
                copyMessage();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={copied ? 'Copied!' : 'Copy message'}
            >
              <i className={copied ? 'fas fa-check' : 'fas fa-copy'} />
            </motion.button>

            {/* Like/Unlike button (for AI messages) */}
            {!isUser && (
              <>
                <motion.button
                  className="action-btn like-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Like this response"
                >
                  <i className="fas fa-thumbs-up" />
                </motion.button>
                <motion.button
                  className="action-btn dislike-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Dislike this response"
                >
                  <i className="fas fa-thumbs-down" />
                </motion.button>
              </>
            )}

            {/* Regenerate button (for AI messages) */}
            {!isUser && (
              <motion.button
                className="action-btn regenerate-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Regenerate response"
              >
                <i className="fas fa-redo" />
              </motion.button>
            )}
          </div>

          {/* Error indicator */}
          {message.isError && (
            <div className="error-indicator">
              <i className="fas fa-exclamation-triangle" />
              <span>Failed to send</span>
            </div>
          )}
        </motion.div>

        {/* Timestamp */}
        {showTimestamp && (
          <motion.div
            className="message-timestamp"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {formatTimestamp(message.timestamp)}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Message;
