import React, { useState } from 'react'
import { getWeatherIconUrl, formatTemp, formatDate } from '../services/weatherService'
import './WeatherCard.css'

const WeatherCard = ({ weather, onRemove }) => {
  const [showForecast, setShowForecast] = useState(false)

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    weather: [currentWeather],
    wind: { speed },
    forecast = []
  } = weather

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location">
          <h3>{name}, {country}</h3>
        </div>
        <button 
          className="remove-btn"
          onClick={onRemove}
          title="Remove city"
        >
          ✕
        </button>
      </div>

      <div className="current-weather">
        <div className="weather-main">
          <img 
            src={getWeatherIconUrl(currentWeather.icon)}
            alt={currentWeather.description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-main">{formatTemp(temp)}</span>
            <span className="temp-feels">Feels like {formatTemp(feels_like)}</span>
          </div>
        </div>
        
        <div className="weather-description">
          <p>{currentWeather.description}</p>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{speed} m/s</span>
          </div>
        </div>
      </div>

      {forecast.length > 0 && (
        <div className="forecast-section">
          <button 
            className="forecast-toggle"
            onClick={() => setShowForecast(!showForecast)}
          >
            {showForecast ? 'Hide' : 'Show'} 3-Day Forecast
            <span className={`arrow ${showForecast ? 'up' : 'down'}`}>▼</span>
          </button>

          {showForecast && (
            <div className="forecast-list">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-item">
                  <div className="forecast-date">
                    {index === 0 ? 'Today' : formatDate(day.date)}
                  </div>
                  <img 
                    src={getWeatherIconUrl(day.weather.icon, '1x')}
                    alt={day.weather.description}
                    className="forecast-icon"
                  />
                  <div className="forecast-temps">
                    <span className="forecast-high">{day.maxTemp}°</span>
                    <span className="forecast-low">{day.minTemp}°</span>
                  </div>
                  <div className="forecast-desc">{day.weather.main}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WeatherCard
