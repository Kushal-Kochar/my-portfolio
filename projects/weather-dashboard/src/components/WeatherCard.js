import React from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main, description, icon }],
    wind: { speed },
    visibility
  } = weather;

  const getWeatherIcon = (iconCode) => {
    // Using emoji icons for demo, can be replaced with actual weather icons
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
    return iconMap[icon] || '🌤️';
  };

  const formatVisibility = (visibility) => {
    return (visibility / 1000).toFixed(1);
  };

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-info">
          <h2>{name}</h2>
          <div className="temperature">
            <span className="temp-value">{Math.round(temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="weather-description">{description}</p>
          <p className="feels-like">Feels like {Math.round(feels_like)}°C</p>
        </div>
        
        <div className="weather-icon">
          <span className="icon">{getWeatherIcon(icon)}</span>
          <p className="weather-main-text">{main}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">💨 Wind Speed</span>
          <span className="detail-value">{speed} m/s</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">💧 Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">🌡️ Pressure</span>
          <span className="detail-value">{pressure} hPa</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">👁️ Visibility</span>
          <span className="detail-value">{formatVisibility(visibility)} km</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
