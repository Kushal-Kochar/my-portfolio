import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WeatherDashboard from './components/WeatherDashboard';
import TaskManager from './components/TaskManager';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || '/';
      setCurrentRoute(hash);
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial route
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  // Route rendering
  const renderRoute = () => {
    switch (currentRoute) {
      case '/projects/weather-dashboard':
        return <WeatherDashboard />;
      case '/projects/task-manager':
        return <TaskManager />;
      default:
        return (
          <div className="App">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <ThemeToggle />
      {renderRoute()}
    </ThemeProvider>
  );
}

export default App;
