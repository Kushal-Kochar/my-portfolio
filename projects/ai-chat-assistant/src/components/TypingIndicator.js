import React from 'react';
import { motion } from 'framer-motion';
import './TypingIndicator.css';

const TypingIndicator = ({ aiPersonality }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -5 },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="typing-indicator"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* AI Avatar */}
      <div className="typing-avatar">
        <div className="ai-avatar">
          <span className="ai-emoji">{aiPersonality?.avatar || '🤖'}</span>
        </div>
      </div>

      {/* Typing Content */}
      <div className="typing-content">
        <div className="typing-sender">
          {aiPersonality?.name || 'AI Assistant'} is typing...
        </div>
        
        <div className="typing-bubble">
          <div className="typing-dots">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="typing-dot"
                variants={dotVariants}
                animate={{
                  y: [-2, -8, -2],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
