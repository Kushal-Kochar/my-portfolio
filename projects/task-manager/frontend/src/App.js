import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: taskData.dueDate || null
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: task.status === 'completed' ? 'pending' : 'completed',
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading Task Manager...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <Header />
        
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="app-header">
                    <h1>Task Manager</h1>
                    <p>Stay organized and boost your productivity</p>
                  </div>
                  
                  <TaskStats tasks={tasks} />
                  
                  <div className="task-management">
                    <div className="task-controls">
                      <div className="search-filter-section">
                        <div className="search-container">
                          <i className="fas fa-search search-icon"></i>
                          <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                          />
                        </div>
                        
                        <div className="filter-container">
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                          >
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="task-content">
                      <div className="task-form-section">
                        <TaskForm onAddTask={addTask} />
                      </div>
                      
                      <div className="task-list-section">
                        <TaskList 
                          tasks={filteredTasks}
                          onUpdateTask={updateTask}
                          onDeleteTask={deleteTask}
                          onToggleStatus={toggleTaskStatus}
                        />
                      </div>
                    </div>
                  </div>
                </>
              } />
            </Routes>
          </div>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
