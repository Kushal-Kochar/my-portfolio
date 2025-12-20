import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    onUpdate(task.id, editData);
    setIsEditing(false);
    toast.success('Task updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      toast.success('Task deleted successfully!');
    }
  };

  const handleToggleStatus = () => {
    onToggleStatus(task.id);
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    toast.success(`Task marked as ${newStatus}!`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'fa-arrow-up';
      case 'medium': return 'fa-minus';
      case 'low': return 'fa-arrow-down';
      default: return 'fa-minus';
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

  const isOverdue = (dueDate) => {
    if (!dueDate || task.status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue(task.dueDate);

  return (
    <div className={`task-item ${task.status} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-status-indicator">
          <button
            className={`status-btn ${task.status}`}
            onClick={handleToggleStatus}
            title={`Mark as ${task.status === 'completed' ? 'pending' : 'completed'}`}
          >
            <i className={`fas ${task.status === 'completed' ? 'fa-check-circle' : 'fa-circle'}`}></i>
          </button>
        </div>

        <div 
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
          title={`${task.priority} priority`}
        >
          <i className={`fas ${getPriorityIcon(task.priority)}`}></i>
        </div>

        <div className="task-actions">
          {!isEditing ? (
            <>
              <button
                className="action-btn edit"
                onClick={handleEdit}
                title="Edit task"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="action-btn delete"
                onClick={handleDelete}
                title="Delete task"
              >
                <i className="fas fa-trash"></i>
              </button>
            </>
          ) : (
            <>
              <button
                className="action-btn save"
                onClick={handleSave}
                title="Save changes"
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                className="action-btn cancel"
                onClick={handleCancel}
                title="Cancel editing"
              >
                <i className="fas fa-times"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="task-content">
        {!isEditing ? (
          <>
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </>
        ) : (
          <div className="edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="edit-input title"
              placeholder="Task title"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="edit-input description"
              placeholder="Task description"
              rows="2"
            />
            <div className="edit-controls">
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="edit-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={editData.dueDate || ''}
                onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                className="edit-input date"
              />
            </div>
          </div>
        )}
      </div>

      <div className="task-footer">
        <div className="task-meta">
          <span className="created-date">
            <i className="fas fa-clock"></i>
            Created {formatDate(task.createdAt)}
          </span>
          
          {task.dueDate && (
            <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              <i className="fas fa-calendar-alt"></i>
              Due {formatDate(task.dueDate)}
              {daysUntilDue !== null && (
                <span className="days-info">
                  {daysUntilDue < 0 
                    ? ` (${Math.abs(daysUntilDue)} days overdue)`
                    : daysUntilDue === 0
                    ? ' (Due today)'
                    : ` (${daysUntilDue} days left)`
                  }
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {isOverdue(task.dueDate) && (
        <div className="overdue-badge">
          <i className="fas fa-exclamation-triangle"></i>
          Overdue
        </div>
      )}
    </div>
  );
};

export default TaskItem;
