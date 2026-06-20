import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="search-clear-btn">
          ✕ Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
