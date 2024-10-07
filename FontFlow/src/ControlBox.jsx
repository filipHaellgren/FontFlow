import React, { useState } from 'react';
import './css/ControlBox.css';

const ControlBox = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Pass the search term back to the parent component
  };

  return (
    
    <div className="large-box">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search fonts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => onFilterChange('popularity')}>Popularity</button>
        <button onClick={() => onFilterChange('alpha')}>Alphabetical</button>
        <button onClick={() => onFilterChange('date')}>Date Added</button>
        <button onClick={() => onFilterChange('style')}>Number of Styles</button>
        <button onClick={() => onFilterChange('trending')}>Trending</button>
      </div>
    </div>
  );
};

export default ControlBox;
