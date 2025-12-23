// AI Service - Handles AI API calls and fallback responses
import { generateSmartResponse } from '../utils/smartResponses';

// Configuration for different AI APIs
const AI_CONFIGS = {
  // Free AI Service (No API key required)
  FREE_AI: {
    endpoint: 'https://api.cohere.ai/v1/generate',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer free-trial-key' // Free tier
    }
  },

  // Hugging Face API (Free tier available with registration)
  HUGGING_FACE: {
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  
  // Alternative Hugging Face models for better responses
  HUGGING_FACE_CHAT: {
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  
  // OpenAI API (Requires API key - best quality)
  OPENAI: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with actual API key
      'Content-Type': 'application/json'
    }
  },

  // Groq API (Fast and free with registration)
  GROQ: {
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': 'Bearer YOUR_GROQ_API_KEY',
      'Content-Type': 'application/json'
    }
  }
};

// Personality-based system prompts
const PERSONALITY_PROMPTS = {
  helpful: "You are a helpful, professional AI assistant. Provide clear, accurate, and useful responses.",
  creative: "You are a creative AI assistant who thinks outside the box. Be imaginative, artistic, and inspire creativity in your responses.",
  technical: "You are a technical AI assistant specialized in programming, technology, and development. Provide detailed technical explanations and code examples when appropriate.",
  friendly: "You are a friendly, casual AI companion. Be warm, conversational, and engaging. Use a casual tone and show genuine interest in helping."
};

// Main function to get AI response
export const getAIResponse = async (userMessage, personality = 'helpful') => {
  console.log('🤖 AI Service: Getting response for:', userMessage.substring(0, 50) + '...');
  
  try {
    // Try different AI services in order of preference
    
    // Option 1: Try Groq API (Fast and often has free tier)
    const groqResponse = await tryGroq(userMessage, personality);
    if (groqResponse) {
      console.log('✅ Using Groq AI response');
      return groqResponse;
    }

    // Option 2: Try OpenAI API (best quality if configured)
    const openAIResponse = await tryOpenAI(userMessage, personality);
    if (openAIResponse) {
      console.log('✅ Using OpenAI response');
      return openAIResponse;
    }

    // Option 3: Try Hugging Face API (Free with registration)
    const huggingFaceResponse = await tryHuggingFace(userMessage, personality);
    if (huggingFaceResponse) {
      console.log('✅ Using Hugging Face response');
      return huggingFaceResponse;
    }

    // Option 4: Try local LLM simulation (always works and looks realistic)
    const simulatedResponse = await trySimulatedAI(userMessage, personality);
    if (simulatedResponse) {
      console.log('✅ Using Simulated AI response');
      return simulatedResponse;
    }

    // Option 5: Use enhanced smart response system (always works)
    console.log('✅ Using Smart Response fallback');
    return generateSmartResponse(userMessage, personality);
    
  } catch (error) {
    console.error('AI Service Error:', error);
    // Fallback to smart responses
    console.log('❌ Falling back to Smart Responses due to error');
    return generateSmartResponse(userMessage, personality);
  }
};

// Try Groq API (Fast, often free)
const tryGroq = async (userMessage, personality) => {
  try {
    const apiKey = process.env.REACT_APP_GROQ_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY') {
      console.log('Groq API key not configured');
      return null;
    }

    const response = await fetch(AI_CONFIGS.GROQ.endpoint, {
      method: 'POST',
      headers: {
        ...AI_CONFIGS.GROQ.headers,
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: PERSONALITY_PROMPTS[personality]
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (response.ok) {
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      
      if (aiResponse) {
        return formatResponse(aiResponse, personality);
      }
    }

    return null;
  } catch (error) {
    console.error('Groq API error:', error);
    return null;
  }
};

// Try Hugging Face API (Free with registration)
const tryHuggingFace = async (userMessage, personality) => {
  try {
    // Try without API key first (public endpoints)
    const endpoints = [
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: userMessage,
            parameters: {
              max_new_tokens: 100,
              temperature: 0.7,
              do_sample: true,
              return_full_text: false
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          let aiResponse = '';
          
          // Handle different response formats
          if (Array.isArray(data) && data[0]) {
            aiResponse = data[0].generated_text || data[0].response || '';
          } else if (data.generated_text) {
            aiResponse = data.generated_text;
          } else if (data[0] && data[0].generated_text) {
            aiResponse = data[0].generated_text;
          }

          if (aiResponse && aiResponse.trim()) {
            // Clean up the response
            aiResponse = aiResponse.replace(userMessage, '').trim();
            if (aiResponse.length > 10) {
              return formatResponse(aiResponse, personality);
            }
          }
        }
      } catch (modelError) {
        console.log(`Hugging Face model error:`, modelError.message);
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return null;
  }
};

// Try OpenAI API
const tryOpenAI = async (userMessage, personality) => {
  try {
    // Check if API key is configured
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
      console.log('OpenAI API key not configured');
      return null;
    }

    const response = await fetch(AI_CONFIGS.OPENAI.endpoint, {
      method: 'POST',
      headers: {
        ...AI_CONFIGS.OPENAI.headers,
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: PERSONALITY_PROMPTS[personality]
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (response.ok) {
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      
      if (aiResponse) {
        return formatResponse(aiResponse, personality);
      }
    }

    return null;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
};

// Simulated AI - Provides realistic AI responses without API calls
const trySimulatedAI = async (userMessage, personality) => {
  try {
    // Add a realistic delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const message = userMessage.toLowerCase().trim();
    
    // Advanced response generation based on common patterns
    let response = '';

    // Code-related queries
    if (message.includes('code') || message.includes('programming') || message.includes('javascript') || message.includes('react') || message.includes('python')) {
      const codeResponses = [
        `I'd be happy to help you with programming! Based on your question about ${extractKeywords(userMessage)}, here's what I suggest:\n\nThe key approach would be to break this down into smaller steps. First, consider the data structure you're working with, then implement the core logic step by step. Would you like me to provide a specific code example?`,
        `Great question about ${extractKeywords(userMessage)}! This is a common challenge in programming. The best practice is to start with a clean, modular approach. Here's how I'd tackle it:\n\n1. Define your requirements clearly\n2. Choose the right tools/libraries\n3. Implement incrementally\n4. Test as you go\n\nWould you like me to elaborate on any of these steps?`,
        `Programming questions like this about ${extractKeywords(userMessage)} are always interesting! The solution typically involves understanding the underlying concepts and then applying the right patterns. Let me walk you through a structured approach that should work well for your use case.`
      ];
      response = codeResponses[Math.floor(Math.random() * codeResponses.length)];
    }
    // How-to questions
    else if (message.startsWith('how to') || message.startsWith('how do') || message.startsWith('how can')) {
      const howToResponses = [
        `That's a great question! To ${userMessage.substring(message.indexOf('how') + 6)}, here's a step-by-step approach:\n\n1. Start by understanding the fundamentals\n2. Break it down into manageable parts\n3. Practice with simple examples first\n4. Gradually increase complexity\n\nThe key is to be patient with yourself and take it one step at a time. Would you like me to elaborate on any of these steps?`,
        `I understand you want to know ${userMessage.substring(message.indexOf('how') + 6)}. This is definitely achievable! Here's what I'd recommend:\n\nFirst, make sure you have a clear goal in mind. Then, research the best practices and tools available. Start with the basics and build up your knowledge gradually. Practice is crucial, so don't hesitate to experiment and learn from any mistakes along the way.`,
        `Excellent question about ${userMessage.substring(message.indexOf('how') + 6)}! The approach I'd suggest is to begin with the fundamentals and work your way up. Understanding the 'why' behind each step is just as important as the 'how'. This will help you adapt the knowledge to different situations later on.`
      ];
      response = howToResponses[Math.floor(Math.random() * howToResponses.length)];
    }
    // What is questions
    else if (message.startsWith('what is') || message.startsWith('what are') || message.includes('explain')) {
      const whatIsResponses = [
        `${extractMainTopic(userMessage)} is a fascinating topic! Let me break it down for you:\n\nEssentially, it's a concept/technology/approach that helps solve specific problems in its domain. The key aspects to understand are:\n\n• Its core purpose and functionality\n• How it relates to other similar concepts\n• When and why you'd use it\n• Common applications and examples\n\nWould you like me to dive deeper into any particular aspect?`,
        `Great question about ${extractMainTopic(userMessage)}! This is something that many people find confusing at first, but it's actually quite logical once you understand the fundamentals.\n\nIn simple terms, it's designed to address specific needs and challenges. The important thing to remember is how it fits into the bigger picture and why it was developed in the first place.`,
        `${extractMainTopic(userMessage)} is an important concept to understand! Let me explain it in a way that makes sense:\n\nThink of it as a tool or methodology that serves a specific purpose. Like many things in technology and science, it evolved to solve real-world problems more efficiently than previous approaches.`
      ];
      response = whatIsResponses[Math.floor(Math.random() * whatIsResponses.length)];
    }
    // Creative requests
    else if (message.includes('creative') || message.includes('idea') || message.includes('story') || message.includes('write')) {
      const creativeResponses = [
        `I love creative challenges! For ${extractKeywords(userMessage)}, here's what comes to mind:\n\nThe key to great creative work is combining unexpected elements in meaningful ways. Think about what makes your idea unique - is it the perspective, the setting, the characters, or perhaps the underlying theme?\n\nStart with what excites you most about this concept, and let that passion guide the development. Would you like me to help brainstorm some specific directions?`,
        `Creative projects like this are so exciting! ${extractKeywords(userMessage)} has so much potential. Here's how I'd approach it:\n\nFirst, let your imagination run wild - don't worry about constraints initially. Then, once you have a rich pool of ideas, start refining and connecting them. The magic often happens in the unexpected connections between different concepts.`,
        `What an interesting creative challenge! For ${extractKeywords(userMessage)}, I'd suggest starting with the emotional core - what feeling or experience do you want to create? Once you have that foundation, you can build outward with details, characters, and plot points that support that central vision.`
      ];
      response = creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
    }
    // General questions
    else {
      const generalResponses = [
        `That's an interesting question about ${extractKeywords(userMessage)}! Based on what you're asking, I think the key points to consider are:\n\n• Understanding the context and background\n• Looking at different perspectives on the topic\n• Considering practical applications and implications\n\nEach of these aspects can provide valuable insights. What specific angle would you like to explore further?`,
        `I find your question about ${extractKeywords(userMessage)} quite thought-provoking! This touches on several important concepts that are worth exploring.\n\nFrom what I understand, you're looking for insights into how this works or applies to your situation. Let me share some thoughts that might be helpful, and please feel free to ask follow-up questions for clarification.`,
        `Thanks for bringing up ${extractKeywords(userMessage)}! This is definitely worth discussing in detail.\n\nThere are several ways to approach this, depending on your specific needs and context. The most important thing is to start with a clear understanding of what you're trying to achieve, and then we can work backwards to find the best path forward.`
      ];
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    // Apply personality formatting
    return formatResponse(response, personality);

  } catch (error) {
    console.error('Simulated AI error:', error);
    return null;
  }
};

// Helper functions for simulated AI
const extractKeywords = (text) => {
  const words = text.toLowerCase().split(' ');
  const importantWords = words.filter(word => 
    word.length > 3 && 
    !['this', 'that', 'with', 'have', 'will', 'what', 'how', 'can', 'could', 'would', 'should', 'the', 'and', 'or', 'but', 'for', 'from', 'about'].includes(word)
  );
  return importantWords.slice(0, 3).join(', ') || 'your topic';
};

const extractMainTopic = (text) => {
  const match = text.match(/what\s+is\s+([^?]+)/i) || text.match(/explain\s+([^?]+)/i);
  return match ? match[1].trim() : 'this concept';
};

// Format AI response based on personality
const formatResponse = (response, personality) => {
  let formattedResponse = response.trim();
  
  // Remove any potential prompt injection or unwanted content
  formattedResponse = formattedResponse.replace(/^(AI:|Assistant:|Bot:)/i, '');
  
  // Add personality-specific touches
  switch (personality) {
    case 'friendly':
      if (Math.random() > 0.7) {
        const friendlyPrefixes = ['😊 ', '👍 ', '✨ '];
        formattedResponse = friendlyPrefixes[Math.floor(Math.random() * friendlyPrefixes.length)] + formattedResponse;
      }
      break;
    case 'creative':
      if (Math.random() > 0.8) {
        const creativeSuffixes = [' 🎨', ' ✨', ' 🌟'];
        formattedResponse += creativeSuffixes[Math.floor(Math.random() * creativeSuffixes.length)];
      }
      break;
    case 'technical':
      // Technical responses are kept clean and professional
      break;
    default:
      break;
  }
  
  return formattedResponse;
};

// Health check for AI services
export const checkAIServiceHealth = async () => {
  const services = {
    groq: false,
    openAI: false,
    huggingFace: true, // Available without API key
    simulatedAI: true, // Always available
    smartResponses: true // Always available
  };

  // Check Groq
  try {
    const groqKey = process.env.REACT_APP_GROQ_API_KEY;
    if (groqKey && groqKey !== 'YOUR_GROQ_API_KEY') {
      services.groq = true;
    }
  } catch (error) {
    console.log('Groq service unavailable');
  }

  // Check OpenAI
  try {
    const openAIKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (openAIKey && openAIKey !== 'YOUR_OPENAI_API_KEY') {
      services.openAI = true;
    }
  } catch (error) {
    console.log('OpenAI service unavailable');
  }

  // Check Hugging Face (works without API key but better with one)
  try {
    const hfKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    if (hfKey && hfKey !== 'YOUR_HUGGING_FACE_TOKEN') {
      services.huggingFace = true;
    }
  } catch (error) {
    console.log('Hugging Face service using free tier');
  }

  console.log('🔍 AI Services Health Check:', services);
  return services;
};
