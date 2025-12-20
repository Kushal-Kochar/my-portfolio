# 🌤️ Weather Dashboard

A modern, responsive weather application built with React.js that provides real-time weather information and 5-day forecasts.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **5-Day Forecast**: View upcoming weather predictions
- **Location Services**: Use your current location for weather data
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Search Functionality**: Search for weather by city name

## 🚀 Technologies Used

- **React.js** - Frontend framework
- **CSS3** - Styling and animations
- **OpenWeatherMap API** - Weather data (configurable)
- **Geolocation API** - Current location services

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kushal-Kochar/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Key** (Optional for demo)
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Create a free account and get your API key
   - Replace `YOUR_API_KEY` in `src/App.js` with your actual API key

4. **Run the application**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

## 📱 Usage

1. **Search by City**: Enter any city name in the search bar
2. **Current Location**: Click "Use Current Location" for local weather
3. **View Forecast**: Scroll down to see the 5-day weather forecast
4. **Responsive**: Use on any device - desktop, tablet, or mobile

## 🎨 Features Showcase

- **Clean Design**: Modern glass-morphism UI elements
- **Smooth Animations**: Fade-in effects and hover interactions
- **Weather Icons**: Emoji-based weather representations
- **Detailed Info**: Temperature, humidity, wind speed, pressure, visibility
- **Mobile-First**: Fully responsive design

## 🔧 Configuration

To use real weather data:

1. Uncomment the API call sections in `src/App.js`
2. Add your OpenWeatherMap API key
3. Replace mock data with actual API responses

## 📂 Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── WeatherCard.js
│   │   ├── SearchBar.js
│   │   └── ForecastCard.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── WeatherCard.css
│   │   ├── SearchBar.css
│   │   ├── ForecastCard.css
│   │   └── index.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🌟 Live Demo

[View Live Demo](https://kushal-weather-dashboard.netlify.app) *(Coming Soon)*

## 📸 Screenshots

*Screenshots will be added after deployment*

## 🚀 Deployment

This project can be deployed on:
- **Netlify** (Recommended)
- **Vercel**
- **GitHub Pages**
- **Heroku**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Kushal Kochar**
- Portfolio: [kushal-kochar.dev](https://kushal-kochar.dev)
- LinkedIn: [@kushal-kochar](https://linkedin.com/in/kushal-kochar-158b99143)
- GitHub: [@Kushal-Kochar](https://github.com/Kushal-Kochar)
- Email: kushalrkk19@gmail.com

## 🔮 Future Enhancements

- [ ] Weather maps integration
- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Multiple location bookmarks
- [ ] Weather charts and graphs
- [ ] Dark/light theme toggle

---

Built with ❤️ by Kushal Kochar
