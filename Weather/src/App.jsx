import { useState, useEffect } from 'react'
import './App.css'
import WeatherDashboard from './components/WeatherDashboard'
import SearchBar from './components/SearchBar'
import CurrentLocationWeather from './components/CurrentLocationWeather'
import { getWeatherByCity, getWeatherByCoordinates } from './services/weatherService'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null)

  // Default cities to show on load
  const defaultCities = ['New York', 'London', 'Tokyo', 'Sydney']

  useEffect(() => {
    // Load weather for default cities on app start
    loadDefaultCities()
    // Try to get user's current location
    getCurrentLocationWeather()
  }, [])

  const loadDefaultCities = async () => {
    setLoading(true)
    try {
      const weatherPromises = defaultCities.map(city => getWeatherByCity(city))
      const results = await Promise.all(weatherPromises)
      setWeatherData(results.filter(result => result !== null))
    } catch (err) {
      setError('Failed to load default cities weather data')
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const weather = await getWeatherByCoordinates(latitude, longitude)
            setCurrentLocationWeather(weather)
          } catch (err) {
            console.error('Failed to get current location weather:', err)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }

  const handleSearch = async (city) => {
    if (!city.trim()) return

    // Check if city already exists
    const existingCity = weatherData.find(
      data => data.name.toLowerCase() === city.toLowerCase()
    )
    if (existingCity) {
      setError('City already added to dashboard')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const weather = await getWeatherByCity(city)
      if (weather) {
        setWeatherData(prev => [...prev, weather])
      } else {
        setError('City not found. Please check the spelling and try again.')
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const removeCity = (cityName) => {
    setWeatherData(prev => prev.filter(data => data.name !== cityName))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Real-time weather information for cities around the world</p>
      </header>

      <div className="app-content">
        {currentLocationWeather && (
          <CurrentLocationWeather weather={currentLocationWeather} />
        )}

        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && <div className="error-message">{error}</div>}

        <WeatherDashboard 
          weatherData={weatherData} 
          loading={loading}
          onRemoveCity={removeCity}
        />
      </div>
    </div>
  )
}

export default App
