import React from "react";
import TaskCard from "../components/TaskCard.jsx";
import TaskFilters from "../components/TaskFilters.jsx";
import SearchFilter from "../components/SearchFilter.jsx";

function DashboardPage({
  tasks,
  filters,
  activeFilter,
  isLoading,
  error,
  searchTerm,
  onSearchChange,
  onFilterChange,
  onCompleteTask,
  onDeleteTask,
  onRetry
}) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>All Tasks</h2>
        </div>
        <div className="filters-container">
          <SearchFilter searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <TaskFilters
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      {isLoading && <div className="state-box">Loading tasks...</div>}

      {!isLoading && error && (
        <div className="state-box error-box">
          <p>{error}</p>
          <button onClick={onRetry}>Retry</button>
        </div>
      )}

      {!isLoading && !error && tasks.length === 0 && (
        <div className="state-box">No tasks exist.</div>
      )}

      {!isLoading && !error && tasks.length > 0 && (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onCompleteTask={onCompleteTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
