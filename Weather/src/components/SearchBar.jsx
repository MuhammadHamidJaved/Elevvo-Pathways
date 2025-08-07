import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim())
      setSearchTerm('')
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city name (e.g., London, Paris, New York)"
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              '🔍'
            )}
          </button>
        </div>
      </form>
      <div className="search-suggestions">
        <p>Popular cities: London, Paris, Tokyo, New York, Sydney, Dubai</p>
      </div>
    </div>
  )
}

export default SearchBar
