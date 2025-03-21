import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm.jsx';
import { API_BASE_URL } from '../config'; // Import the base URL

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const { data } = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched tasks:', data);
      setTasks(data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error fetching tasks';
      setError(errorMsg);
      console.error('Fetch error:', error.response || error);
    }
  };

  const handleSave = (task) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t._id === task._id);
      if (index !== -1) {
        return prev.map((t) => (t._id === task._id ? task : t));
      }
      return [...prev, task];
    });
  };

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting task');
    }
  };

  // Rest of the code remains unchanged
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm task={selectedTask} setTask={setSelectedTask} onSave={handleSave} />
      <div className="task-list">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.title || 'No Title'}</h3>
              <p>{task.description || 'No Description'}</p>
              <p>Priority: {task.priority || 'Not Set'}</p>
              <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
              <button onClick={() => setSelectedTask(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;