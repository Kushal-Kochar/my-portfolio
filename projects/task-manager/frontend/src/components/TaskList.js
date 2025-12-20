import React, { useState } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleStatus }) => {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date('2099-12-31');
          bValue = b.dueDate ? new Date(b.dueDate) : new Date('2099-12-31');
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const sortedTasks = sortTasks(tasks);
  const pendingTasks = sortedTasks.filter(task => task.status === 'pending');
  const completedTasks = sortedTasks.filter(task => task.status === 'completed');

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'fas fa-sort';
    return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
          <div className="empty-illustration">
            <i className="fas fa-arrow-up"></i>
            <span>Use the form above to add a new task</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div className="task-count">
          <h3>
            <i className="fas fa-list"></i>
            Your Tasks ({tasks.length})
          </h3>
          <div className="task-summary">
            <span className="pending-count">
              <i className="fas fa-clock"></i>
              {pendingTasks.length} pending
            </span>
            <span className="completed-count">
              <i className="fas fa-check-circle"></i>
              {completedTasks.length} completed
            </span>
          </div>
        </div>

        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <button
            className={`sort-btn ${sortBy === 'createdAt' ? 'active' : ''}`}
            onClick={() => handleSortChange('createdAt')}
          >
            <i className={getSortIcon('createdAt')}></i>
            Date
          </button>
          <button
            className={`sort-btn ${sortBy === 'priority' ? 'active' : ''}`}
            onClick={() => handleSortChange('priority')}
          >
            <i className={getSortIcon('priority')}></i>
            Priority
          </button>
          <button
            className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
            onClick={() => handleSortChange('title')}
          >
            <i className={getSortIcon('title')}></i>
            Title
          </button>
          <button
            className={`sort-btn ${sortBy === 'status' ? 'active' : ''}`}
            onClick={() => handleSortChange('status')}
          >
            <i className={getSortIcon('status')}></i>
            Status
          </button>
        </div>
      </div>

      <div className="task-list">
        {pendingTasks.length > 0 && (
          <div className="task-section">
            <h4 className="section-title pending">
              <i className="fas fa-clock"></i>
              Pending Tasks ({pendingTasks.length})
            </h4>
            <div className="task-grid">
              {pendingTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                  onToggleStatus={onToggleStatus}
                />
              ))}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="task-section">
            <h4 className="section-title completed">
              <i className="fas fa-check-circle"></i>
              Completed Tasks ({completedTasks.length})
            </h4>
            <div className="task-grid">
              {completedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                  onToggleStatus={onToggleStatus}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
