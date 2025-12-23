import React from 'react';
import { motion } from 'framer-motion';
import './WelcomeMessage.css';

const WelcomeMessage = ({ userName, aiPersonality }) => {
  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const suggestions = [
    {
      icon: '💭',
      text: 'Ask me anything',
      example: 'What can you help me with?'
    },
    {
      icon: '💻',
      text: 'Code assistance',
      example: 'Help me write a function in JavaScript'
    },
    {
      icon: '📚',
      text: 'Learn something new',
      example: 'Explain how machine learning works'
    },
    {
      icon: '🎨',
      text: 'Creative writing',
      example: 'Write a short story about space exploration'
    },
    {
      icon: '🔧',
      text: 'Problem solving',
      example: 'Help me debug this error'
    },
    {
      icon: '📊',
      text: 'Data analysis',
      example: 'How do I analyze this dataset?'
    }
  ];

  return (
    <motion.div
      className="welcome-message"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* AI Avatar with floating animation */}
      <motion.div
        className="welcome-avatar"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="ai-avatar-large">
          <span className="ai-emoji-large">{aiPersonality?.avatar || '🤖'}</span>
        </div>
        <div className="avatar-glow" />
      </motion.div>

      {/* Welcome Text */}
      <motion.div className="welcome-text" variants={itemVariants}>
        <h2>
          {getGreeting()}, {userName?.split(' ')[0] || 'there'}! 👋
        </h2>
        <p className="welcome-subtitle">
          I'm <strong>{aiPersonality?.name || 'your AI Assistant'}</strong> - {aiPersonality?.description || 'here to help with your questions and tasks'}.
        </p>
      </motion.div>

      {/* Capabilities */}
      <motion.div className="welcome-capabilities" variants={itemVariants}>
        <h3>What I can help you with:</h3>
        <div className="capabilities-grid">
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-comments" />
            <span>Natural conversation</span>
          </motion.div>
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-code" />
            <span>Code assistance</span>
          </motion.div>
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-lightbulb" />
            <span>Creative ideas</span>
          </motion.div>
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-graduation-cap" />
            <span>Learning support</span>
          </motion.div>
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-search" />
            <span>Research help</span>
          </motion.div>
          <motion.div className="capability-item" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-tools" />
            <span>Problem solving</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div className="welcome-suggestions" variants={itemVariants}>
        <h3>Try asking me:</h3>
        <div className="suggestions-grid">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              className="suggestion-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="suggestion-icon">{suggestion.icon}</span>
              <div className="suggestion-content">
                <h4>{suggestion.text}</h4>
                <p>"{suggestion.example}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Start */}
      <motion.div className="welcome-quickstart" variants={itemVariants}>
        <div className="quickstart-tip">
          <i className="fas fa-info-circle" />
          <span>
            <strong>Tip:</strong> I can remember our conversation context, so feel free to ask follow-up questions!
          </span>
        </div>
      </motion.div>

      {/* Animated background elements */}
      <div className="welcome-background">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-element"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeMessage;
