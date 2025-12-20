import React, { useState, useEffect } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('portfolio-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: formData.dueDate || null
    };
    
    setTasks(prev => [...prev, newTask]);
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsFormExpanded(false);
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

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="task-app loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading Task Manager...</p>
      </div>
    );
  }

  return (
    <div className="task-app">
      {/* Header with back button */}
      <div className="project-header">
        <button 
          className="back-btn"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Portfolio
        </button>
        <div className="project-info">
          <h1>Task Manager</h1>
          <p>Live Demo - Full-featured task management</p>
        </div>
      </div>

      <div className="app-header">
        <h2>Task Manager</h2>
        <p>Stay organized and boost your productivity</p>
      </div>

      <div className="container">
        {/* Statistics Dashboard */}
        <div className="stats-section">
          <div className="stats-header">
            <h3>
              <i className="fas fa-chart-bar"></i>
              Dashboard Overview
            </h3>
            <div className="completion-rate">
              <div className="rate-circle" style={{ '--completion': `${completionRate}%` }}>
                <span className="rate-text">{completionRate}%</span>
              </div>
              <span className="rate-label">Completion Rate</span>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <div className="stat-content">
                <h4>{totalTasks}</h4>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-content">
                <h4>{completedTasks}</h4>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <h4>{pendingTasks}</h4>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <div className="task-form-container">
          <div className="form-header">
            <h3>
              <i className="fas fa-plus-circle"></i>
              Add New Task
            </h3>
            <button
              type="button"
              className={`expand-btn ${isFormExpanded ? 'expanded' : ''}`}
              onClick={() => setIsFormExpanded(!isFormExpanded)}
            >
              <i className={`fas ${isFormExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
          </div>

          <form 
            onSubmit={addTask} 
            className={`task-form ${isFormExpanded ? 'expanded' : ''}`}
          >
            <div className="form-row">
              <div className="form-group">
                <label>
                  <i className="fas fa-heading"></i>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter task title..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <i className="fas fa-align-left"></i>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Add task description..."
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row two-columns">
              <div className="form-group">
                <label>
                  <i className="fas fa-exclamation-triangle"></i>
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-calendar-alt"></i>
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
                  setIsFormExpanded(false);
                }}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filter */}
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

        {/* Task List */}
        <div className="task-list-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>No tasks found</h3>
              <p>{tasks.length === 0 ? 'Create your first task to get started!' : 'Try adjusting your search or filter.'}</p>
            </div>
          ) : (
            <div className="task-grid">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-item ${task.status}`}>
                  <div className="task-header">
                    <button
                      className={`status-btn ${task.status}`}
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      <i className={`fas ${task.status === 'completed' ? 'fa-check-circle' : 'fa-circle'}`}></i>
                    </button>

                    <div 
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      <i className="fas fa-flag"></i>
                    </div>

                    <button
                      className="action-btn delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                  </div>

                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="created-date">
                        <i className="fas fa-clock"></i>
                        Created {formatDate(task.createdAt)}
                      </span>
                      
                      {task.dueDate && (
                        <span className="due-date">
                          <i className="fas fa-calendar-alt"></i>
                          Due {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>Built with React.js by Kushal Kochar</p>
      </footer>
    </div>
  );
};

export default TaskManager;
