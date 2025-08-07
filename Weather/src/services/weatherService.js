import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Create axios instance with default config
const weatherAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
})

// Get weather data by city name
export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius
      },
    })
    
    const forecastResponse = await weatherAPI.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        cnt: 24, // Get 24 forecasts (3 days worth)
      },
    })

    return {
      ...response.data,
      forecast: processForecastData(forecastResponse.data.list),
    }
  } catch (error) {
    console.error('Error fetching weather by city:', error)
    if (error.response?.status === 404) {
      return null // City not found
    }
    throw error
  }
}

// Get weather data by coordinates
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    })

    const forecastResponse = await weatherAPI.get('/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        cnt: 24,
      },
    })

    return {
      ...response.data,
      forecast: processForecastData(forecastResponse.data.list),
    }
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error)
    throw error
  }
}

// Process forecast data to get daily summaries
const processForecastData = (forecastList) => {
  const dailyForecasts = {}
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString()
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        temps: [],
        weather: item.weather[0],
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      }
    }
    
    dailyForecasts[date].temps.push(item.main.temp)
  })

  // Convert to array and calculate min/max temps for each day
  return Object.values(dailyForecasts)
    .slice(0, 3) // Only get 3 days
    .map(day => ({
      ...day,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
    }))
}

// Get weather icon URL
export const getWeatherIconUrl = (iconCode, size = '2x') => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`
}

// Format temperature
export const formatTemp = (temp) => {
  return `${Math.round(temp)}°C`
}

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}
