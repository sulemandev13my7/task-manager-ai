import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AIPlanner = ({ showMessage }) => {
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      showMessage('error', 'Please enter a task description');
      return;
    }
    setLoading(true);
    setPlan(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/plan-task`, { description });
      setPlan(response.data.plan);
      showMessage('success', 'AI plan generated successfully!');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to generate AI plan');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge-priority-high';
      case 'medium':
        return 'badge-priority-medium';
      default:
        return 'badge-priority-low';
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">🤖 AI Task Planner</h2>
      <form onSubmit={handleGeneratePlan}>
        <div className="form-group">
          <label>Task Description</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Build a portfolio website within three days"
            style={{ minHeight: '100px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate AI Plan'}
        </button>
      </form>

      {plan && (
        <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.625rem', color: '#0f172a' }}>{plan.summary}</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <span className={`badge ${getPriorityBadgeClass(plan.priority)}`}>
              {plan.priority?.toUpperCase()} PRIORITY
            </span>
            <span style={{ fontSize: '0.75rem', color: '#475569', padding: '0.25rem 0.625rem', background: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              ⏱️ {plan.estimatedHours} hours
            </span>
          </div>
          <div className="ai-steps">
            <h4>Action Steps:</h4>
            <ul>
              {plan.steps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPlanner;