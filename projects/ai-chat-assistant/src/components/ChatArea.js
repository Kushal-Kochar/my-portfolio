import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import WelcomeMessage from './WelcomeMessage';
import './ChatArea.css';

const ChatArea = ({ conversation, isTyping, containerRef }) => {
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { personalities, aiPersonality } = useChat();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [conversation?.messages, isTyping]);

  // Show welcome message for empty conversations
  if (!conversation?.messages || conversation.messages.length === 0) {
    return (
      <div className="chat-area">
        <WelcomeMessage 
          userName={user?.name}
          aiPersonality={personalities[aiPersonality]}
        />
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="chat-area">
      <div className="messages-container">
        <AnimatePresence initial={false}>
          {conversation.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                delay: index > conversation.messages.length - 5 ? 0.1 : 0 
              }}
              layout
            >
              <Message
                message={message}
                isUser={message.sender === 'user'}
                userName={user?.name}
                userAvatar={user?.avatar}
                aiPersonality={personalities[message.personality || aiPersonality]}
                previousMessage={index > 0 ? conversation.messages[index - 1] : null}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TypingIndicator 
                aiPersonality={personalities[aiPersonality]}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button (shown when not at bottom) */}
      <ScrollToBottomButton 
        containerRef={containerRef}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

// Scroll to bottom button component
const ScrollToBottomButton = ({ containerRef, messagesEndRef }) => {
  const [showButton, setShowButton] = React.useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className="scroll-to-bottom"
          onClick={scrollToBottom}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Scroll to bottom"
        >
          <i className="fas fa-arrow-down" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ChatArea;
