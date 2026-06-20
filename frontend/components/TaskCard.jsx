import React from "react";

const statusClassNames = {
  Pending: "status-pending",
  "In Progress": "status-progress",
  Completed: "status-completed"
};

function TaskCard({ task, onCompleteTask, onDeleteTask }) {
  const createdDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(task.created_at));

  return (
    <article className="task-card">
      <div className="task-card-header">
        <h2>{task.title}</h2>
        <span className={`status-pill ${statusClassNames[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>Created Date</span>
        <strong>{createdDate}</strong>
      </div>
      <div className="task-actions">
        <button
          className="complete-button"
          disabled={task.status === "Completed"}
          onClick={() => onCompleteTask(task.id)}
        >
          Complete Task
        </button>
        <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
          Delete Task
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
