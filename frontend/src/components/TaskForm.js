import React, { useState } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: editingTask?.title || '',
    description: editingTask?.description || '',
    status: editingTask?.status || 'pending',
    dueDate: editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingTask) {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
      });
    }
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <h2 className="card-title">{editingTask ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            className="input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="input"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            style={{ marginTop: '0.75rem', width: '100%' }}
            disabled={loading}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;