import React from 'react';
import '../styles/ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  const { dt, main: { temp }, weather: [{ main, icon }] } = forecast;

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
    return iconMap[icon] || '🌤️';
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

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="forecast-card">
      <div className="forecast-day">
        <h4>{getDayName(dt)}</h4>
        <p>{getFormattedDate(dt)}</p>
      </div>
      
      <div className="forecast-icon">
        {getWeatherIcon(icon)}
      </div>
      
      <div className="forecast-temp">
        <span className="temp">{Math.round(temp)}°</span>
      </div>
      
      <div className="forecast-condition">
        <p>{main}</p>
      </div>
    </div>
  );
};

export default ForecastCard;
