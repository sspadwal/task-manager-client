import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config'; // Path from src/components/

const TaskForm = ({ task, setTask, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    completed: false,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({ title: '', description: '', priority: 'low', completed: false });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get user object
      const token = user?.token; // Extract token from user object
      if (!token) {
        setMessage('No token found. Please log in.');
        navigate('/login');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = task
        ? `${BASE_URL}/api/tasks/${task._id}` // Update task
        : `${BASE_URL}/api/tasks`; // Create task
      const method = task ? 'put' : 'post';

      const { data } = await axios[method](url, formData, config);
      onSave(data); // Update task list in Dashboard
      setMessage(task ? 'Task updated successfully!' : 'Task created successfully!');
      setFormData({ title: '', description: '', priority: 'low', completed: false });
      setTask(null);
    } catch (error) {
      console.error('Task save error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || 'Error saving task';
      if (error.response?.status === 401) {
        setMessage('Invalid or expired token. Please log in again.');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setMessage(errorMsg);
      }
    }
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="task-form-fields">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            Completed
          </label>
          <button type="submit">{task ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;