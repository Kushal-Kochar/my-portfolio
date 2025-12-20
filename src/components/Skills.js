import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava,
  FaAws, FaDocker, FaGitAlt, FaFigma 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, 
  SiMongodb, SiPostgresql 
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML5', icon: FaHtml5, level: 90, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, level: 88, color: '#1572B6' },
        { name: 'JavaScript', icon: FaJs, level: 85, color: '#F7DF1E' },
        { name: 'React.js', icon: FaReact, level: 90, color: '#61DAFB' }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 75, color: '#339933' },
        { name: 'Java', icon: FaJava, level: 80, color: '#ED8B00' },
        { name: 'Python', icon: FaPython, level: 78, color: '#3776AB' }
      ]
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'SQL', icon: SiPostgresql, level: 75, color: '#336791' },
        { name: 'Git', icon: FaGitAlt, level: 85, color: '#F05032' }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'Spring Boot', icon: FaJava, level: 78, color: '#6DB33F' },
        { name: 'SAP Fiori', icon: FaReact, level: 70, color: '#0FAAFF' }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Skills & Technologies</h2>
          <p>Technologies I work with</p>
        </motion.div>

        <div className="skills-content" ref={ref}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3>{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.1 
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="skill-icon" style={{ color: skill.color }}>
                      <skill.icon />
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="cta-content">
            <h3>Always Learning & Growing</h3>
            <p>
              Technology evolves rapidly, and I'm committed to staying current with the latest 
              trends and best practices. I'm currently exploring new technologies and frameworks 
              to expand my skill set.
            </p>
            <div className="learning-topics">
              <span className="topic">TypeScript</span>
              <span className="topic">Next.js</span>
              <span className="topic">Cloud Technologies</span>
              <span className="topic">Advanced React Patterns</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
