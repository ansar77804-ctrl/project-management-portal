import React from "react";

const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
