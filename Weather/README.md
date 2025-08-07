# 🌤️ Weather Dashboard

A real-time weather dashboard built with React and Vite that fetches weather data from the OpenWeatherMap API. Features a clean, minimal UI with support for multiple cities, 3-day forecasts, and automatic location detection.

## ✨ Features

- **Real-time Weather Data**: Current weather conditions for multiple cities
- **3-Day Forecasts**: Detailed weather predictions with min/max temperatures
- **Search Functionality**: Add any city worldwide with instant search
- **Current Location Support**: Automatic weather detection for your location
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clean UI**: Modern, minimal interface with smooth animations
- **Loading States**: Elegant loading indicators and error handling

## 🛠️ Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data source
- **CSS3** - Modern styling with gradients and animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. **Clone or download the project**
   ```bash
   cd Weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically load weather for default cities
   - Grant location permission for current location weather

## 📱 Usage

### Adding Cities
- Use the search bar to find and add cities
- Type city name and press search or hit Enter
- Cities are displayed in a responsive grid layout

### Weather Information
- **Current Weather**: Temperature, feels-like, humidity, wind speed
- **Weather Icons**: Dynamic icons from OpenWeatherMap
- **Forecasts**: Click "Show 3-Day Forecast" for detailed predictions
- **Remove Cities**: Click the × button to remove a city

### Current Location
- The app automatically requests your location
- Your local weather appears at the top
- Location detection is optional and can be denied

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WeatherDashboard.jsx     # Main dashboard container
│   ├── WeatherCard.jsx          # Individual city weather card
│   ├── SearchBar.jsx            # City search functionality
│   ├── CurrentLocationWeather.jsx # User location weather
│   ├── LoadingSpinner.jsx       # Loading indicator
│   └── *.css                    # Component styles
├── services/
│   └── weatherService.js        # API calls and data processing
├── App.jsx                      # Main app component
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Information

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):
- **Current Weather**: Real-time weather data
- **5-Day Forecast**: Weather predictions (processed to 3-day)
- **Geocoding**: Location-based weather lookup
- **Weather Icons**: Dynamic weather condition icons

## 🎨 Design Features

- **Glassmorphism**: Semi-transparent cards with blur effects
- **Gradient Backgrounds**: Beautiful sky-inspired gradients
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Modern Typography**: Clean, readable fonts

## 🔮 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Hourly forecast details
- [ ] Weather maps integration
- [ ] Favorite cities persistence
- [ ] Dark/light theme toggle
- [ ] Weather charts and graphs
- [ ] Multiple unit systems (Imperial/Metric)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and OpenWeatherMap API
