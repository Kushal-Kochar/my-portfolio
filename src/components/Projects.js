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
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, product management, shopping cart, and payment integration.',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=E-Commerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://via.placeholder.com/400x250/f093fb/ffffff?text=Task+App',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      category: 'frontend',
      github: 'https://github.com/yourusername/task-app',
      live: 'https://task-app-demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'REST API Service',
      description: 'A scalable REST API built with Node.js, Express, and PostgreSQL. Includes authentication, rate limiting, and comprehensive documentation.',
      image: 'https://via.placeholder.com/400x250/4facfe/ffffff?text=API+Service',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      category: 'backend',
      github: 'https://github.com/yourusername/api-service',
      live: 'https://api-docs.com',
      featured: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Framer Motion. Features smooth animations and optimized performance.',
      image: 'https://via.placeholder.com/400x250/43e97b/ffffff?text=Portfolio',
      technologies: ['React', 'Framer Motion', 'CSS3', 'Responsive Design'],
      category: 'frontend',
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://portfolio-demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'A weather application that displays current and forecasted weather data with interactive charts and location-based services.',
      image: 'https://via.placeholder.com/400x250/fa709a/ffffff?text=Weather+App',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'Geolocation'],
      category: 'frontend',
      github: 'https://github.com/yourusername/weather-app',
      live: 'https://weather-demo.com',
      featured: false
    },
    {
      id: 6,
      title: 'Microservices Architecture',
      description: 'A microservices-based application demonstrating distributed system design with Docker, Kubernetes, and message queues.',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=Microservices',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'Redis', 'RabbitMQ'],
      category: 'devops',
      github: 'https://github.com/yourusername/microservices',
      live: 'https://microservices-demo.com',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'devops', name: 'DevOps' }
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
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
