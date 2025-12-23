// Smart Response Generator - Provides intelligent responses without external APIs

const GREETING_PATTERNS = [
  /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
  /^(what's up|how are you|how's it going)/i
];

const QUESTION_PATTERNS = [
  /^(what|how|why|when|where|who|which|can you|could you|do you|are you|will you)/i,
  /\?$/
];

const CODING_PATTERNS = [
  /(code|programming|javascript|python|react|css|html|function|algorithm|debug|error)/i,
  /(how to code|write a function|create a|build a)/i
];

const CREATIVE_PATTERNS = [
  /(story|poem|creative|write|design|art|music|color|imagine)/i,
  /(create something|be creative|make something)/i
];

const HELP_PATTERNS = [
  /(help|support|assistance|guide|tutorial|explain|teach)/i
];

// Personality-based response templates
const RESPONSE_TEMPLATES = {
  helpful: {
    greetings: [
      "Hello! I'm here to help you with any questions or tasks you might have. What can I assist you with today?",
      "Hi there! I'm ready to help. What would you like to know or discuss?",
      "Hello! How can I be of assistance to you today?",
      "Hi! I'm your AI assistant. What can I help you with?"
    ],
    questions: [
      "That's a great question! Let me provide you with a comprehensive answer.",
      "I'd be happy to help you understand this better.",
      "That's an interesting question. Here's what I can tell you:",
      "I can definitely help you with that. Let me explain:"
    ],
    coding: [
      "I'd be happy to help you with programming! Here's what I suggest:",
      "Great coding question! Let me break this down for you:",
      "Programming is one of my favorite topics to discuss. Here's my take:",
      "I can definitely help you with this coding challenge:"
    ],
    default: [
      "That's an interesting topic! Let me share some thoughts on this.",
      "I understand what you're asking about. Here's my perspective:",
      "Thanks for bringing this up. Here's what I think:",
      "That's worth exploring further. Let me elaborate:"
    ]
  },

  friendly: {
    greetings: [
      "Hey there! 😊 Great to chat with you! What's on your mind?",
      "Hi friend! I'm so excited to talk with you today. What's up?",
      "Hello! 👋 I'm in a great mood and ready to help. How are you doing?",
      "Hey! Nice to meet you! What would you like to chat about?"
    ],
    questions: [
      "Ooh, that's a really good question! 🤔 Let me think about this...",
      "I love questions like this! Here's what I'm thinking:",
      "That's such an interesting thing to ask about! 😄",
      "Great question, friend! I'm excited to share my thoughts:"
    ],
    coding: [
      "Oh awesome, coding talk! 💻 I love this stuff! Here's what I'd do:",
      "Programming is so much fun! 🚀 Let me help you out:",
      "Code time! This is exciting! Here's my suggestion:",
      "Yay, a coding question! I'm all over this! 🎯"
    ],
    default: [
      "That's so cool that you brought this up! 😊 I think:",
      "I'm really enjoying our conversation! Here's my take:",
      "This is fun to talk about! Let me share what I think:",
      "I love chatting about stuff like this! My thoughts:"
    ]
  },

  creative: {
    greetings: [
      "Welcome to a world of infinite possibilities! ✨ What shall we create together?",
      "Greetings, creative soul! 🎨 I'm here to spark inspiration. What moves you?",
      "Hello, visionary! Ready to paint with words and ideas? What's your canvas today?",
      "Ah, a kindred creative spirit! 🌟 Let's explore the realms of imagination together!"
    ],
    questions: [
      "What a delightfully curious question! Let me weave you an answer... ✨",
      "Questions are the seeds of creativity! Here's how I see it blooming:",
      "Like a kaleidoscope turning, your question reveals beautiful patterns:",
      "In the garden of knowledge, your question is a unique flower. Let me nurture it:"
    ],
    coding: [
      "Ah, the art of code! Programming is poetry in logic. Here's my creative approach:",
      "Code is like painting with algorithms! 🎨 Let me sketch out a solution:",
      "In the symphony of software, every function is a note. Here's our melody:",
      "Programming is creative architecture for the digital realm! Let's build:"
    ],
    creative: [
      "Now we're in my element! 🌈 Creativity flows like a river of starlight:",
      "Imagination is the only limit! Let's break boundaries together:",
      "Creative energy is buzzing! ⚡ Here's what springs to mind:",
      "Art and creativity are the heartbeat of innovation! Let's create magic:"
    ],
    default: [
      "Every conversation is a blank canvas! 🎨 Let me paint you a response:",
      "Ideas dance in the realm of possibility. Here's what catches my eye:",
      "Through the prism of creativity, everything has beauty. I see this as:",
      "Like a story waiting to be told, your message inspires me to share:"
    ]
  },

  technical: {
    greetings: [
      "System initialized. Technical support and development assistance active. How may I assist?",
      "Hello. I'm optimized for technical queries, development challenges, and system analysis. What's your requirement?",
      "Technical assistant online. Ready to process programming, development, and technology-related requests.",
      "Greetings. My expertise spans software development, system architecture, and technical problem-solving. Please specify your query."
    ],
    questions: [
      "Processing your query. Here's a comprehensive technical analysis:",
      "Query received. Analyzing parameters and generating solution:",
      "Technical evaluation in progress. Here are the key considerations:",
      "Parsing your requirements. Here's a systematic breakdown:"
    ],
    coding: [
      "Entering development mode. Here's a structured approach to your coding challenge:",
      "Code analysis initiated. Optimal solution pathway identified:",
      "Processing programming request. Here's the recommended implementation:",
      "Technical documentation generating. Code solution follows:"
    ],
    default: [
      "Data processed. Here's a systematic analysis of your request:",
      "Information parsed successfully. Technical response generated:",
      "Query understood. Executing detailed analysis and response protocol:",
      "Processing complete. Here's the technical breakdown:"
    ]
  }
};

// Knowledge base for common topics
const KNOWLEDGE_BASE = {
  // Programming topics
  'javascript': "JavaScript is a versatile programming language primarily used for web development. It's essential for creating interactive websites and can also be used for server-side development with Node.js.",
  'react': "React is a popular JavaScript library for building user interfaces, especially single-page applications. It uses a component-based architecture and virtual DOM for efficient rendering.",
  'python': "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, AI, and automation.",
  'html': "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the basic structure and content of websites.",
  'css': "CSS (Cascading Style Sheets) is used for styling and laying out web pages. It controls the visual presentation of HTML elements.",
  
  // General topics
  'ai': "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines. It includes machine learning, natural language processing, and computer vision.",
  'technology': "Technology encompasses the application of scientific knowledge for practical purposes, including computers, software, and digital systems that enhance human capabilities.",
  'science': "Science is a systematic approach to understanding the natural world through observation, experimentation, and analysis. It encompasses physics, chemistry, biology, and many other fields."
};

// Generate contextually appropriate responses
export const generateSmartResponse = (userMessage, personality = 'helpful') => {
  const message = userMessage.toLowerCase().trim();
  const templates = RESPONSE_TEMPLATES[personality] || RESPONSE_TEMPLATES.helpful;
  
  // Check for specific patterns and generate appropriate responses
  
  // Greetings
  if (GREETING_PATTERNS.some(pattern => pattern.test(message))) {
    const greeting = getRandomItem(templates.greetings);
    return greeting;
  }
  
  // Creative requests
  if (personality === 'creative' && CREATIVE_PATTERNS.some(pattern => pattern.test(message))) {
    const creativeResponse = getRandomItem(templates.creative || templates.default);
    return creativeResponse + " " + generateCreativeContent(message);
  }
  
  // Coding questions
  if (CODING_PATTERNS.some(pattern => pattern.test(message))) {
    const codingResponse = getRandomItem(templates.coding || templates.default);
    return codingResponse + " " + generateCodingResponse(message, personality);
  }
  
  // Help requests
  if (HELP_PATTERNS.some(pattern => pattern.test(message))) {
    const helpResponse = getRandomItem(templates.questions || templates.default);
    return helpResponse + " I'm here to assist you with any questions or tasks you might have!";
  }
  
  // Knowledge base lookup
  const knowledgeResponse = checkKnowledgeBase(message);
  if (knowledgeResponse) {
    const prefix = getRandomItem(templates.questions || templates.default);
    return prefix + " " + knowledgeResponse;
  }
  
  // Question patterns
  if (QUESTION_PATTERNS.some(pattern => pattern.test(message))) {
    const questionResponse = getRandomItem(templates.questions || templates.default);
    return questionResponse + " " + generateContextualResponse(message, personality);
  }
  
  // Default response
  const defaultResponse = getRandomItem(templates.default);
  return defaultResponse + " " + generateContextualResponse(message, personality);
};

// Helper function to get random item from array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Check knowledge base for relevant information
const checkKnowledgeBase = (message) => {
  for (const [topic, info] of Object.entries(KNOWLEDGE_BASE)) {
    if (message.includes(topic)) {
      return info;
    }
  }
  return null;
};

// Generate creative content
const generateCreativeContent = (message) => {
  const creativePrompts = [
    "Let your imagination soar! Picture a world where colors have emotions and dreams take physical form.",
    "Creativity flows like a river of possibilities. What if we combined unexpected elements to create something entirely new?",
    "In the realm of creation, there are no limits. Let's blend art, technology, and pure imagination!",
    "Every creative journey starts with a single spark. Let's fan that flame into something magnificent!"
  ];
  
  return getRandomItem(creativePrompts);
};

// Generate coding response
const generateCodingResponse = (message, personality) => {
  const codingTips = [
    "Start by breaking down the problem into smaller, manageable pieces. Then tackle each piece systematically.",
    "Consider using modern development practices like clean code principles, proper error handling, and comprehensive testing.",
    "Think about user experience and performance optimization from the beginning of your development process.",
    "Don't forget to document your code and consider how other developers might interact with your solution."
  ];
  
  if (personality === 'technical') {
    return "Here's a systematic approach: 1) Analyze requirements, 2) Design architecture, 3) Implement core functionality, 4) Test and optimize, 5) Deploy and monitor.";
  } else if (personality === 'creative') {
    return "Code is like digital poetry! Let's craft an elegant solution that's both functional and beautiful.";
  } else if (personality === 'friendly') {
    return "Let's tackle this together! " + getRandomItem(codingTips);
  }
  
  return getRandomItem(codingTips);
};

// Generate contextual response based on message content
const generateContextualResponse = (message, personality) => {
  const contextualResponses = {
    helpful: [
      "I hope this information is helpful! Is there anything specific you'd like me to elaborate on?",
      "Let me know if you need any clarification or have follow-up questions.",
      "I'm here to help with any additional questions or concerns you might have."
    ],
    friendly: [
      "Hope this helps, friend! Feel free to ask me anything else that's on your mind! 😊",
      "Always happy to chat and help out! What else would you like to know?",
      "This is fun! I love having conversations like this. What's next?"
    ],
    creative: [
      "May this spark new ideas and creative possibilities in your mind! ✨",
      "Let inspiration guide your next steps on this creative journey!",
      "The canvas of possibility is vast - what masterpiece will you create?"
    ],
    technical: [
      "Implementation details and further optimization strategies available upon request.",
      "For additional technical specifications or advanced configurations, please specify requirements.",
      "System analysis complete. Additional technical support available as needed."
    ]
  };
  
  const responses = contextualResponses[personality] || contextualResponses.helpful;
  return getRandomItem(responses);
};
