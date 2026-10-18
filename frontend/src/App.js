import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AIPlanner from './components/AIPlanner';
import './index.css';

const API_BASE_URL = 'http://localhost:5000/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data.tasks || []);
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/tasks`, taskData);
      showMessage('success', 'Task created successfully!');
      fetchTasks();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
      showMessage('success', 'Task updated successfully!');
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      showMessage('success', 'Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Task Manager</h1>
        <p>Organize tasks efficiently with AI-powered planning</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="main-grid">
        <div>
          <TaskForm
            onSubmit={editingTask ? (data) => handleUpdateTask(editingTask._id, data) : handleCreateTask}
            editingTask={editingTask}
            onCancel={handleCancelEdit}
            loading={loading}
          />
          <AIPlanner showMessage={showMessage} />
        </div>
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;