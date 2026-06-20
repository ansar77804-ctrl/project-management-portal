import React from "react";

function TaskFilters({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar" aria-label="Filter tasks by status">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
