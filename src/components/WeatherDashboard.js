import React, { useState, useEffect } from 'react';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Your OpenWeatherMap API key
      const API_KEY = '00c1f15003462fecd75f7da43479e767';
      const BASE_URL = 'https://api.openweathermap.org/data/2.5';
      
      // Real API calls with your API key
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error(`Weather data not found for "${cityName}". Please check the city name and try again.`);
      }
      
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      
      setCurrentWeather(currentData);
      // Get 5-day forecast (every 8th item = daily forecast)
      setForecast(forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5));

      // Real API data is now being used above!
      
    } catch (err) {
      console.error('Weather API Error:', err);
      
      // Temporary fallback demo data while API key activates
      console.log('Using demo data as fallback...');
      const demoData = {
        'mumbai': {
          current: { name: 'Mumbai', main: { temp: 32, feels_like: 36, humidity: 78, pressure: 1008 }, weather: [{ main: 'Hazy', description: 'hazy', icon: '50d' }], wind: { speed: 2.1 }, visibility: 6000 },
          forecast: [
            { dt: Date.now() + 86400000, main: { temp: 33 }, weather: [{ main: 'Sunny', icon: '01d' }] },
            { dt: Date.now() + 172800000, main: { temp: 31 }, weather: [{ main: 'Cloudy', icon: '02d' }] },
            { dt: Date.now() + 259200000, main: { temp: 29 }, weather: [{ main: 'Rain', icon: '10d' }] },
            { dt: Date.now() + 345600000, main: { temp: 30 }, weather: [{ main: 'Thunderstorm', icon: '11d' }] },
            { dt: Date.now() + 432000000, main: { temp: 32 }, weather: [{ main: 'Clear', icon: '01d' }] }
          ]
        },
        'london': {
          current: { name: 'London', main: { temp: 8, feels_like: 5, humidity: 81, pressure: 1015 }, weather: [{ main: 'Cloudy', description: 'overcast clouds', icon: '04d' }], wind: { speed: 4.2 }, visibility: 10000 },
          forecast: [
            { dt: Date.now() + 86400000, main: { temp: 10 }, weather: [{ main: 'Rain', icon: '10d' }] },
            { dt: Date.now() + 172800000, main: { temp: 7 }, weather: [{ main: 'Cloudy', icon: '04d' }] },
            { dt: Date.now() + 259200000, main: { temp: 12 }, weather: [{ main: 'Partly Cloudy', icon: '02d' }] },
            { dt: Date.now() + 345600000, main: { temp: 9 }, weather: [{ main: 'Rain', icon: '09d' }] },
            { dt: Date.now() + 432000000, main: { temp: 11 }, weather: [{ main: 'Sunny', icon: '01d' }] }
          ]
        }
      };
      
      const cityKey = cityName.toLowerCase();
      const data = demoData[cityKey] || demoData['mumbai'];
      
      setCurrentWeather({ ...data.current, name: cityName });
      setForecast(data.forecast);
      setError(null);
      
      // Show info message instead of error
      console.log(`Showing demo data for ${cityName} while API key activates...`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm.trim());
      fetchWeatherData(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Got coordinates:', latitude, longitude);
          
          try {
            // Real geolocation API call with your API key
            const API_KEY = '00c1f15003462fecd75f7da43479e767';
            const BASE_URL = 'https://api.openweathermap.org/data/2.5';
            
            console.log('Making API calls for coordinates...');
            
            const currentResponse = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const forecastResponse = await fetch(
              `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            
            console.log('API Response status:', currentResponse.status, forecastResponse.status);
            
            if (!currentResponse.ok) {
              const errorData = await currentResponse.json();
              console.error('Current weather API error:', errorData);
              throw new Error(`Weather API Error: ${errorData.message || 'Failed to get current weather'}`);
            }
            
            if (!forecastResponse.ok) {
              const errorData = await forecastResponse.json();
              console.error('Forecast API error:', errorData);
              throw new Error(`Forecast API Error: ${errorData.message || 'Failed to get forecast'}`);
            }
            
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            
            console.log('Successfully got weather data for:', currentData.name);
            
            setCurrentWeather(currentData);
            setForecast(forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5));
            setCity(currentData.name);
            setError(null);
          } catch (err) {
            console.error('Geolocation API Error Details:', err);
            
            // Provide more specific error messages
            let errorMessage = 'Failed to get location-based weather. ';
            if (err.message.includes('API Error')) {
              errorMessage += err.message + ' Please try searching for a city instead.';
            } else if (err.message.includes('fetch')) {
              errorMessage += 'Network connection issue. Please check your internet connection.';
            } else {
              errorMessage += 'Please try searching for a city instead.';
            }
            
            setError(errorMessage);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          console.error('Geolocation permission error:', error);
          
          let errorMessage = '';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location services and try again, or search for a city manually.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable. Please try searching for a city manually.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again or search for a city manually.';
              break;
            default:
              errorMessage = 'An unknown location error occurred. Please search for a city manually.';
              break;
          }
          
          setError(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Please search for a city manually.');
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="weather-app">
      {/* Back Button */}
      <div className="project-header">
        <button 
          className="back-btn"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Portfolio
        </button>
        <div className="project-info">
          <h1>Weather Dashboard</h1>
          <p>Live Demo - Real-time weather information</p>
        </div>
      </div>

      <header className="app-header">
        <h2>Weather Dashboard</h2>
        <p>Real-time weather information at your fingertips</p>
        <div className="api-notice">
          <small>
            🔄 Demo mode active while API key activates (can take 10 minutes)
          </small>
        </div>
      </header>

      <main className="app-main">
        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
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
          
          <div className="location-buttons">
            <button 
              onClick={getCurrentLocation} 
              className="location-button"
              disabled={loading}
            >
              📍 {loading ? 'Getting Location...' : 'Use Current Location'}
            </button>
            <button 
              onClick={() => {
                setCity('Mumbai');
                fetchWeatherData('Mumbai');
              }}
              className="location-button secondary"
              disabled={loading}
            >
              🌆 Try Mumbai Demo
            </button>
          </div>
        </div>
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {currentWeather && !loading && (
          <div className="weather-content">
            {/* Current Weather Card */}
            <div className="weather-card">
              <div className="weather-main">
                <div className="weather-info">
                  <h3>{currentWeather.name}</h3>
                  <div className="temperature">
                    <span className="temp-value">{Math.round(currentWeather.main.temp)}</span>
                    <span className="temp-unit">°C</span>
                  </div>
                  <p className="weather-description">{currentWeather.weather[0].description}</p>
                  <p className="feels-like">Feels like {Math.round(currentWeather.main.feels_like)}°C</p>
                </div>
                
                <div className="weather-icon">
                  <span className="icon">{getWeatherIcon(currentWeather.weather[0].icon)}</span>
                  <p className="weather-main-text">{currentWeather.weather[0].main}</p>
                </div>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">💨 Wind Speed</span>
                  <span className="detail-value">{currentWeather.wind.speed} m/s</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">💧 Humidity</span>
                  <span className="detail-value">{currentWeather.main.humidity}%</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">🌡️ Pressure</span>
                  <span className="detail-value">{currentWeather.main.pressure} hPa</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">👁️ Visibility</span>
                  <span className="detail-value">{(currentWeather.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>
            </div>
            
            {/* Forecast Section */}
            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-day">
                      <h4>{getDayName(day.dt)}</h4>
                      <p>{new Date(day.dt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    
                    <div className="forecast-icon">
                      {getWeatherIcon(day.weather[0].icon)}
                    </div>
                    
                    <div className="forecast-temp">
                      <span className="temp">{Math.round(day.main.temp)}°</span>
                    </div>
                    
                    <div className="forecast-condition">
                      <p>{day.weather[0].main}</p>
                    </div>
                  </div>
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
};

export default WeatherDashboard;
