import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCode, FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";
import "./About.css";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FaCode,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code that follows best practices and industry standards.",
    },
    {
      icon: FaLightbulb,
      title: "Problem Solver",
      description:
        "Approaching complex challenges with innovative solutions and creative thinking.",
    },
    {
      icon: FaRocket,
      title: "Fast Learner",
      description:
        "Quickly adapting to new technologies and frameworks to deliver cutting-edge solutions.",
    },
    {
      icon: FaUsers,
      title: "Team Player",
      description:
        "Collaborating effectively with cross-functional teams to achieve project goals.",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </motion.div>

        <div className="about-content" ref={ref}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Passionate Software Development Engineer</h3>
            <p>
              I'm a passionate Software Development Engineer based in Mumbai,
              India, with a strong foundation in frontend development and modern
              web technologies. My journey in software development started
              during my Computer Engineering studies and has evolved into a deep
              passion for creating scalable, user-friendly applications.
            </p>
            <p>
              Currently working at Jio Platforms Ltd., I specialize in React.js
              development, creating reusable components and building dynamic
              user interfaces. My experience includes working with modern tech
              stacks including React.js, JavaScript, Java Spring Boot, and CI/CD
              pipelines.
            </p>
            <p>
              I believe in writing clean, maintainable code and optimizing
              application performance. I'm passionate about translating UI/UX
              designs into responsive, cross-platform interfaces and
              continuously learning new technologies to deliver cutting-edge
              solutions.
            </p>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Modules Developed</span>
              </div>
              <div className="stat">
                <span className="stat-number">15-20%</span>
                <span className="stat-label">Efficiency Boost</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-features"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p>Ready to work together on your next project?</p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .querySelector("#contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
