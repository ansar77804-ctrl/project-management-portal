import React from "react";

const Statistics = ({ stats = {} }) => {
  const { total = 0, pending = 0, inProgress = 0, completed = 0, completionPercentage = 0 } = stats;

  return (
    <div className="statistics-container">
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{total}</div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{pending}</div>
          </div>
        </div>

        <div className="stat-card stat-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{inProgress}</div>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{completed}</div>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-bar">
          <div className="progress-label">
            Completion Progress: <strong>{completionPercentage}%</strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
