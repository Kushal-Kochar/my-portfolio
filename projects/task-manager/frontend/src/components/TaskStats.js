import React from 'react';
import '../styles/TaskStats.css';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const overdueTasks = tasks.filter(task => 
    task.status === 'pending' && 
    task.dueDate && 
    new Date(task.dueDate) < new Date()
  ).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const priorityStats = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  };

  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    return task.dueDate && new Date(task.dueDate).toDateString() === today;
  }).length;

  const stats = [
    {
      id: 'total',
      title: 'Total Tasks',
      value: totalTasks,
      icon: 'fa-clipboard-list',
      color: '#6366F1',
      bgColor: '#EEF2FF'
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedTasks,
      icon: 'fa-check-circle',
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      id: 'pending',
      title: 'Pending',
      value: pendingTasks,
      icon: 'fa-clock',
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      id: 'overdue',
      title: 'Overdue',
      value: overdueTasks,
      icon: 'fa-exclamation-triangle',
      color: '#EF4444',
      bgColor: '#FEF2F2'
    }
  ];

  return (
    <div className="task-stats-container">
      <div className="stats-header">
        <h2>
          <i className="fas fa-chart-bar"></i>
          Dashboard Overview
        </h2>
        <div className="completion-rate">
          <div className="rate-circle">
            <div className="rate-fill" style={{ '--completion': `${completionRate}%` }}>
              <span className="rate-text">{completionRate}%</span>
            </div>
          </div>
          <span className="rate-label">Completion Rate</span>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ '--stat-color': stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="additional-stats">
        <div className="priority-breakdown">
          <h4>
            <i className="fas fa-flag"></i>
            Priority Breakdown
          </h4>
          <div className="priority-stats">
            <div className="priority-item high">
              <div className="priority-bar">
                <div 
                  className="priority-fill" 
                  style={{ width: totalTasks > 0 ? `${(priorityStats.high / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
              <span className="priority-label">
                <i className="fas fa-arrow-up"></i>
                High ({priorityStats.high})
              </span>
            </div>
            <div className="priority-item medium">
              <div className="priority-bar">
                <div 
                  className="priority-fill" 
                  style={{ width: totalTasks > 0 ? `${(priorityStats.medium / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
              <span className="priority-label">
                <i className="fas fa-minus"></i>
                Medium ({priorityStats.medium})
              </span>
            </div>
            <div className="priority-item low">
              <div className="priority-bar">
                <div 
                  className="priority-fill" 
                  style={{ width: totalTasks > 0 ? `${(priorityStats.low / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
              <span className="priority-label">
                <i className="fas fa-arrow-down"></i>
                Low ({priorityStats.low})
              </span>
            </div>
          </div>
        </div>

        <div className="quick-info">
          <div className="info-item">
            <i className="fas fa-calendar-day"></i>
            <div className="info-content">
              <span className="info-value">{todayTasks}</span>
              <span className="info-label">Due Today</span>
            </div>
          </div>
          
          <div className="info-item">
            <i className="fas fa-trophy"></i>
            <div className="info-content">
              <span className="info-value">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </span>
              <span className="info-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
