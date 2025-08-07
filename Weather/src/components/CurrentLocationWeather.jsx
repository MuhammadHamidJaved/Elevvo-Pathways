import React from 'react'
import { getWeatherIconUrl, formatTemp } from '../services/weatherService'
import './CurrentLocationWeather.css'

const CurrentLocationWeather = ({ weather }) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like },
    weather: [currentWeather]
  } = weather

  return (
    <div className="current-location-weather">
      <div className="location-header">
        <h2>📍 Your Location</h2>
        <span className="location-name">{name}, {country}</span>
      </div>
      
      <div className="current-weather-summary">
        <img 
          src={getWeatherIconUrl(currentWeather.icon)}
          alt={currentWeather.description}
          className="current-weather-icon"
        />
        <div className="current-temp-info">
          <span className="current-temp">{formatTemp(temp)}</span>
          <span className="current-feels-like">Feels like {formatTemp(feels_like)}</span>
          <span className="current-description">{currentWeather.description}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentLocationWeather
