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
      title: 'Software Development Engineer-1',
      company: 'Jio Platforms Ltd., Mumbai, India',
      period: 'Dec 2022 - Present',
      description: 'Creating and maintaining reusable, scalable React.js components utilized across multiple projects, boosting development efficiency and ensuring consistent UI standards. Working closely with Backend and DevOps Teams to guarantee smooth end-to-end integration and deployment.',
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Java Spring Boot', 'SAP Fiori', 'CI/CD Pipelines', 'Git'],
      achievements: [
        'Created 6-7 reusable components, resulting in 15-20% boost in development efficiency',
        'Developed and launched 9-10 fully functional application modules from end to end',
        'Spearheaded migration of SAP Fiori application to open-source tech stack using React.js and Spring Boot',
        'Built and fine-tuned REST APIs in Spring Boot to boost performance and system stability',
        'Contributed to CI/CD deployment pipelines with hands-on exposure to automated builds and testing workflows'
      ]
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'B.Tech. in Computer Engineering',
      institution: "SVKM's IOT, Dhule",
      period: '2018 - 2022',
      description: 'Specialized in Computer Engineering with focus on software development, web technologies and programming fundamentals.',
      achievements: ['Strong foundation in programming and software development', 'Developed expertise in modern web technologies and frameworks']
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Data Analysis with Python',
      issuer: 'Programming Certification',
      date: '2023',
      icon: FaCertificate
    },
    {
      id: 2,
      name: 'Python Data Representations',
      issuer: 'Programming Certification',
      date: '2023',
      icon: FaCertificate
    },
    {
      id: 3,
      name: 'Python Programming Essentials',
      issuer: 'Programming Certification',
      date: '2023',
      icon: FaCertificate
    },
    {
      id: 4,
      name: 'Introduction to Web Development',
      issuer: 'Web Development Certification',
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
            
            {/* Publication Achievement */}
            <div className="achievement-section">
              <h4>Publications</h4>
              <div className="achievement-item">
                <div className="achievement-content">
                  <h5>Published Poet</h5>
                  <p>Authored and published a poem in Mirakee, recognized as part of the world's largest poetry anthology.</p>
                  <span className="achievement-year">2023</span>
                </div>
              </div>
            </div>
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
