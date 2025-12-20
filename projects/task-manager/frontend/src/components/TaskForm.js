import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import '../styles/TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    try {
      onAddTask(data);
      reset();
      setIsExpanded(false);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: '#10B981', icon: 'fa-arrow-down' },
    { value: 'medium', label: 'Medium Priority', color: '#F59E0B', icon: 'fa-minus' },
    { value: 'high', label: 'High Priority', color: '#EF4444', icon: 'fa-arrow-up' }
  ];

  return (
    <div className="task-form-container">
      <div className="form-header">
        <h3>
          <i className="fas fa-plus-circle"></i>
          Add New Task
        </h3>
        <button
          type="button"
          className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </button>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className={`task-form ${isExpanded ? 'expanded' : ''}`}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-heading"></i>
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { 
                required: 'Task title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              placeholder="Enter task title..."
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">
              <i className="fas fa-align-left"></i>
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Add task description..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">
              <i className="fas fa-exclamation-triangle"></i>
              Priority
            </label>
            <select
              id="priority"
              {...register('priority')}
              defaultValue="medium"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">
              <i className="fas fa-calendar-alt"></i>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate')}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              reset();
              setIsExpanded(false);
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
  );
};

export default TaskForm;
