import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import { WeatherData } from './types/weather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import HourlyForecast from './components/HourlyForecast';
import WeatherAlert from './components/WeatherAlert';
import { Cloud, CloudRain, Loader2 } from 'lucide-react';

function App() {
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get the user's saved location
    const savedLocation = localStorage.getItem('lastLocation');
    
    if (savedLocation) {
      handleSearch(savedLocation);
    } else {
      // Default to a popular city
      handleSearch('San Francisco');
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(query);
      setWeatherData(data);
      setLocation(query);
      
      // Save the location for next time
      localStorage.setItem('lastLocation', query);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Unable to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <CloudRain size={32} className="text-blue-300 mr-2" />
            <h1 className="text-3xl font-bold">Weather Forecast</h1>
          </div>
          <p className="text-blue-200 mb-6">Real-time weather updates and forecasts</p>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 mb-6 text-white border border-red-500/30 animate-fadeIn">
            {error}
          </div>
        )}

        {isLoading && !weatherData && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="text-blue-300 animate-spin mb-4" />
            <p className="text-blue-200">Loading weather data...</p>
          </div>
        )}

        {!isLoading && !weatherData && !error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Cloud size={64} className="text-blue-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Weather Data</h2>
            <p className="text-blue-200 max-w-md">
              Search for a location to see the current weather and forecast.
            </p>
          </div>
        )}

        {weatherData && (
          <main className="animate-fadeIn">
            <CurrentWeather data={weatherData} isLoading={isLoading} />
            <ForecastWeather forecast={weatherData.forecast.forecastday} isLoading={isLoading} />
            <HourlyForecast forecastDay={weatherData.forecast.forecastday[0]} isLoading={isLoading} />
            <WeatherAlert />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;