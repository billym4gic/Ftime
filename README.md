# Modern Weather App

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather updates, forecasts, and weather alerts with an elegant, Apple-inspired design.

![Weather App Screenshot](https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🌡️ Real-time weather data and conditions
- 📅 5-day weather forecast
- ⏰ Hourly weather predictions
- 🔍 Location search with recent history
- 🌅 Dynamic backgrounds based on weather conditions
- 🚨 Weather alerts and notifications
- 📱 Fully responsive design
- 🎨 Beautiful frosted glass UI
- 🌓 Time-of-day aware theming

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Weather API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Weather API (via weatherapi.com)
- Lucide React Icons

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx
│   ├── CurrentWeather.tsx
│   ├── ForecastWeather.tsx
│   ├── HourlyForecast.tsx
│   └── WeatherAlert.tsx
├── services/           # API services
│   └── weatherService.ts
├── types/             # TypeScript types
│   └── weather.ts
├── utils/             # Utility functions
│   └── weatherUtils.ts
└── App.tsx            # Main application component
```

## Features in Detail

### Current Weather
- Temperature display (°C/°F)
- Weather condition with icon
- Feels like temperature
- Wind speed and direction
- Humidity percentage
- Visibility
- UV index
- Atmospheric pressure

### Weather Forecast
- 5-day weather prediction
- Daily high and low temperatures
- Precipitation probability
- Weather condition icons
- Sunrise and sunset times

### Search Functionality
- City/location search
- Recent search history
- Auto-complete suggestions
- Geolocation support
- Save favorite locations

### Weather Alerts
- Severe weather warnings
- Color-coded alert severity
- Dismissible notifications
- Alert history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Lucide](https://lucide.dev/)
- Design inspired by Apple Weather
