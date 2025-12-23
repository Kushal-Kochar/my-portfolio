import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAIResponse } from '../services/aiService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('helpful');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Personalities
  const personalities = {
    helpful: {
      name: 'Helpful Assistant',
      description: 'Professional and informative',
      avatar: '🤖',
      systemPrompt: 'You are a helpful, professional AI assistant.'
    },
    creative: {
      name: 'Creative Genius',
      description: 'Imaginative and artistic',
      avatar: '🎨',
      systemPrompt: 'You are a creative, imaginative AI that loves art, writing, and creative solutions.'
    },
    technical: {
      name: 'Tech Expert',
      description: 'Programming and technology focused',
      avatar: '💻',
      systemPrompt: 'You are a technical AI assistant specialized in programming, technology, and development.'
    },
    friendly: {
      name: 'Friendly Buddy',
      description: 'Casual and conversational',
      avatar: '😊',
      systemPrompt: 'You are a friendly, casual AI companion who loves to chat and help with everyday questions.'
    }
  };

  useEffect(() => {
    // Load conversations from localStorage
    const savedConversations = localStorage.getItem('chatapp_conversations');
    if (savedConversations) {
      try {
        const parsedConversations = JSON.parse(savedConversations);
        setConversations(parsedConversations);
        
        // Set active conversation to the most recent one
        if (parsedConversations.length > 0) {
          setActiveConversationId(parsedConversations[0].id);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save conversations to localStorage whenever they change
    if (conversations.length > 0) {
      localStorage.setItem('chatapp_conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const createNewConversation = (title = null) => {
    const newConversation = {
      id: uuidv4(),
      title: title || `Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      personality: aiPersonality
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    
    return newConversation;
  };

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    
    if (activeConversationId === conversationId) {
      const remainingConversations = conversations.filter(conv => conv.id !== conversationId);
      setActiveConversationId(remainingConversations.length > 0 ? remainingConversations[0].id : null);
    }
  };

  const sendMessage = async (content, type = 'text') => {
    if (!activeConversationId) {
      createNewConversation();
      return;
    }

    const userMessage = {
      id: uuidv4(),
      content,
      type,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Add user message
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? {
            ...conv,
            messages: [...conv.messages, userMessage],
            updatedAt: new Date().toISOString()
          }
        : conv
    ));

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponseContent = await getAIResponse(content, aiPersonality);
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const aiMessage = {
        id: uuidv4(),
        content: aiResponseContent,
        type: 'text',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        personality: aiPersonality
      };

      // Add AI response
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? {
              ...conv,
              messages: [...conv.messages, aiMessage],
              updatedAt: new Date().toISOString(),
              title: conv.messages.length === 0 ? content.substring(0, 50) + '...' : conv.title
            }
          : conv
      ));
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: uuidv4(),
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        type: 'text',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? {
              ...conv,
              messages: [...conv.messages, errorMessage],
              updatedAt: new Date().toISOString()
            }
          : conv
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const getActiveConversation = () => {
    return conversations.find(conv => conv.id === activeConversationId) || null;
  };

  const searchMessages = (query) => {
    setSearchQuery(query);
    // This would be used by components to filter messages
  };

  const exportConversation = (conversationId, format = 'txt') => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (!conversation) return null;

    if (format === 'txt') {
      let content = `Conversation: ${conversation.title}\n`;
      content += `Created: ${new Date(conversation.createdAt).toLocaleString()}\n`;
      content += `AI Personality: ${personalities[conversation.personality]?.name || 'Unknown'}\n\n`;
      
      conversation.messages.forEach(message => {
        const sender = message.sender === 'user' ? 'You' : 'AI Assistant';
        const timestamp = new Date(message.timestamp).toLocaleString();
        content += `[${timestamp}] ${sender}: ${message.content}\n\n`;
      });

      return content;
    }

    return null;
  };

  const clearAllConversations = () => {
    setConversations([]);
    setActiveConversationId(null);
    localStorage.removeItem('chatapp_conversations');
  };

  const value = {
    conversations,
    activeConversationId,
    isTyping,
    aiPersonality,
    personalities,
    searchQuery,
    setActiveConversationId,
    setAiPersonality,
    createNewConversation,
    deleteConversation,
    sendMessage,
    getActiveConversation,
    searchMessages,
    exportConversation,
    clearAllConversations
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
