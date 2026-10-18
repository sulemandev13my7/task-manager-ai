import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-completed';
      case 'in-progress':
        return 'badge-in-progress';
      default:
        return 'badge-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <h2 className="card-title">📋 My Tasks ({tasks.length})</h2>
      {loading && !tasks.length ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.title}</h3>
              {task.description && <p className="desc">{task.description}</p>}
              <div className="task-meta">
                <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
                {task.dueDate && (
                  <span className="due-date">📅 Due: {formatDate(task.dueDate)}</span>
                )}
              </div>
              <div className="task-actions">
                <button
                  className="small-btn btn-secondary"
                  onClick={() => onEdit(task)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="small-btn btn-danger"
                  onClick={() => onDelete(task._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;