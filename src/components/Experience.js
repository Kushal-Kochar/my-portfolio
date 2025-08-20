import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaGraduationCap, FaTrophy, FaCertificate } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const workExperience = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2023 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led a team of 5 developers on a major project',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Innovations Inc.',
      period: '2021 - 2023',
      description: 'Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis', 'Jest'],
      achievements: [
        'Built 3 major applications from concept to deployment',
        'Improved code coverage to 90% through testing',
        'Reduced bug reports by 35% through better error handling'
      ]
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'WebTech Solutions',
      period: '2020 - 2021',
      description: 'Focused on creating responsive and user-friendly interfaces. Worked closely with designers to implement pixel-perfect designs.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Sass'],
      achievements: [
        'Developed 10+ responsive websites',
        'Improved user engagement by 25%',
        'Optimized performance for mobile devices'
      ]
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      period: '2016 - 2020',
      description: 'Specialized in Software Engineering with focus on web technologies and database systems.',
      achievements: ['Graduated with First Class Honours', 'Final Year Project: E-Learning Platform']
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'AWS Certified Developer Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: FaCertificate
    },
    {
      id: 2,
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      icon: FaCertificate
    },
    {
      id: 3,
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022',
      icon: FaCertificate
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Experience & Education</h2>
          <p>My professional journey</p>
        </motion.div>

        <div className="experience-content" ref={ref}>
          {/* Work Experience */}
          <motion.div
            className="experience-section"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>
              <FaBriefcase />
              Work Experience
            </h3>
            <div className="timeline">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h4>{job.title}</h4>
                      <span className="company">{job.company}</span>
                      <span className="period">{job.period}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    
                    <div className="job-technologies">
                      {job.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="job-achievements">
                      <h5>Key Achievements:</h5>
                      <ul>
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="experience-section"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>
              <FaGraduationCap />
              Education
            </h3>
            <div className="timeline">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  <div className="timeline-marker education"></div>
                  <div className="timeline-content">
                    <div className="education-header">
                      <h4>{edu.degree}</h4>
                      <span className="institution">{edu.institution}</span>
                      <span className="period">{edu.period}</span>
                    </div>
                    <p className="education-description">{edu.description}</p>
                    
                    <div className="education-achievements">
                      <h5>Achievements:</h5>
                      <ul>
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="experience-section"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>
              <FaTrophy />
              Certifications & Achievements
            </h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="certification-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="cert-icon">
                    <cert.icon />
                  </div>
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="experience-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3>Ready to bring my experience to your team?</h3>
          <p>Let's discuss how my skills and experience can contribute to your next project.</p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
