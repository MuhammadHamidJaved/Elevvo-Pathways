import React from 'react'
import WeatherCard from './WeatherCard'
import LoadingSpinner from './LoadingSpinner'
import './WeatherDashboard.css'

const WeatherDashboard = ({ weatherData, loading, onRemoveCity }) => {
  if (loading && weatherData.length === 0) {
    return (
      <div className="weather-dashboard">
        <LoadingSpinner />
        <p>Loading weather data...</p>
      </div>
    )
  }

  if (weatherData.length === 0) {
    return (
      <div className="weather-dashboard">
        <div className="no-data">
          <h3>No cities added yet</h3>
          <p>Search for a city above to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-dashboard">
      <h2>Cities Weather</h2>
      <div className="weather-grid">
        {weatherData.map((weather) => (
          <WeatherCard 
            key={weather.id}
            weather={weather}
            onRemove={() => onRemoveCity(weather.name)}
          />
        ))}
      </div>
      {loading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default WeatherDashboard
