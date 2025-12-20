import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, onLocationClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city name (e.g., London, Mumbai, Tokyo)"
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>
      
      <button onClick={onLocationClick} className="location-button">
        📍 Use Current Location
      </button>
    </div>
  );
};

export default SearchBar;
