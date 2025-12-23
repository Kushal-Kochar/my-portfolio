import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaEye, FaCode } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'A modern, responsive portfolio website built with React.js and Framer Motion. Features smooth animations, interactive components, project showcases, and optimized performance. This very website you are viewing - fully functional and deployed.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'JavaScript', 'Framer Motion', 'CSS3', 'HTML5'],
      category: 'frontend',
      github: 'https://github.com/Kushal-Kochar/my-portfolio',
      live: '#/',
      featured: false
    },
    {
      id: 2,
      title: 'Task Manager App',
      description: 'A fully functional task management application with complete CRUD operations, priority levels, analytics dashboard, search/filter functionality, due date tracking, and local storage persistence. Features smooth animations and responsive design.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'JavaScript', 'Local Storage', 'CSS3', 'HTML5'],
      category: 'frontend',
      github: 'https://github.com/Kushal-Kochar/my-portfolio/tree/main/projects/task-manager',
      live: '#/projects/task-manager',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A real-time weather application displaying current conditions and 5-day forecasts with beautiful UI. Features city search, geolocation services, weather icons, and fully responsive design. Live weather data integration ready.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'JavaScript', 'Weather API', 'Geolocation', 'CSS3'],
      category: 'frontend',
      github: 'https://github.com/Kushal-Kochar/my-portfolio/tree/main/projects/weather-dashboard',
      live: '#/projects/weather-dashboard',
      featured: true
    },
    {
      id: 4,
      title: 'AI Chat Assistant',
      description: 'Intelligent chatbot application with multiple AI integrations (Groq, OpenAI, Hugging Face). Features real-time conversations, different AI personalities, smart fallback responses, user authentication, conversation management, and professional UI/UX.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'Groq API', 'OpenAI API', 'Hugging Face', 'Context API', 'Framer Motion', 'CSS3'],
      category: 'fullstack',
      github: 'https://github.com/Kushal-Kochar/my-portfolio/tree/main/projects/ai-chat-assistant',
      live: 'http://localhost:3001',
      featured: true
    },
    {
      id: 5,
      title: 'Real-time Analytics Dashboard',
      description: 'Comprehensive data visualization dashboard with live charts, metrics tracking, and interactive widgets. Features real-time data updates, customizable layouts, export functionality, and responsive design optimized for business intelligence.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'D3.js', 'Chart.js', 'WebSocket', 'Node.js', 'MongoDB', 'Redis'],
      category: 'fullstack',
      github: 'https://github.com/Kushal-Kochar/analytics-dashboard',
      live: 'https://kushal-analytics-dashboard.netlify.app',
      featured: true
    },
    {
      id: 6,
      title: 'Modern E-commerce Platform',
      description: 'Full-featured e-commerce application with shopping cart, secure checkout, user authentication, product management, order tracking, and payment integration. Built with modern React patterns and state management.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      technologies: ['React.js', 'Redux', 'Stripe API', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'fullstack',
      github: 'https://github.com/Kushal-Kochar/ecommerce-platform',
      live: 'https://kushal-ecommerce.netlify.app',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'backend', name: 'Backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Featured Projects</h2>
          <p>Some of my recent work</p>
        </motion.div>

        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <div className="projects-grid" ref={ref}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                layout
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                        title="View Source Code"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link live"
                        title="View Live Demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <FaEye />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <FaCode />
                      Source Code
                    </a>
                    <a
                      href={project.live}
                      target={project.live.startsWith('#') ? '_self' : '_blank'}
                      rel={project.live.startsWith('#') ? '' : 'noopener noreferrer'}
                      className="btn btn-primary"
                      onClick={project.live.startsWith('#') ? (e) => {
                        e.preventDefault();
                        window.location.hash = project.live.substring(1);
                      } : undefined}
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Interested in working together?</h3>
          <p>Let's discuss your project and see how I can help bring your ideas to life.</p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
