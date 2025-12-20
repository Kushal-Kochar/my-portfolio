import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import './styles/App.css';

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Mumbai');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, using mock data instead of API
      // In production, uncomment the API calls below
      
      // Mock current weather data
      const mockCurrentWeather = {
        name: cityName,
        main: {
          temp: 28,
          feels_like: 32,
          humidity: 68,
          pressure: 1013
        },
        weather: [{
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }],
        wind: {
          speed: 3.5
        },
        visibility: 10000
      };

      // Mock forecast data
      const mockForecast = [
        { dt: Date.now() + 86400000, main: { temp: 30 }, weather: [{ main: 'Sunny', icon: '01d' }] },
        { dt: Date.now() + 172800000, main: { temp: 27 }, weather: [{ main: 'Cloudy', icon: '02d' }] },
        { dt: Date.now() + 259200000, main: { temp: 25 }, weather: [{ main: 'Rain', icon: '09d' }] },
        { dt: Date.now() + 345600000, main: { temp: 29 }, weather: [{ main: 'Sunny', icon: '01d' }] },
        { dt: Date.now() + 432000000, main: { temp: 31 }, weather: [{ main: 'Partly Cloudy', icon: '02d' }] }
      ];

      setCurrentWeather(mockCurrentWeather);
      setForecast(mockForecast);

      /* 
      // Actual API calls (uncomment when you have an API key)
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not found');
      }
      
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      
      setCurrentWeather(currentData);
      setForecast(forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5));
      */
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Mock location-based weather (replace with actual reverse geocoding)
            setCity('Current Location');
            fetchWeatherData('Current Location');
            
            /*
            // Actual geolocation API call
            const response = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            setCurrentWeather(data);
            setCity(data.name);
            */
          } catch (err) {
            setError('Failed to get location-based weather');
          }
        },
        () => {
          setError('Location access denied');
        }
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Real-time weather information at your fingertips</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} onLocationClick={getCurrentLocation} />
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {currentWeather && !loading && (
          <div className="weather-content">
            <WeatherCard weather={currentWeather} />
            
            <div className="forecast-section">
              <h2>5-Day Forecast</h2>
              <div className="forecast-grid">
                {forecast.map((day, index) => (
                  <ForecastCard key={index} forecast={day} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React.js by Kushal Kochar</p>
      </footer>
    </div>
  );
}

export default App;
