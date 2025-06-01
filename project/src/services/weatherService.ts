import axios from 'axios';
import { WeatherData } from '../types/weather';

// This would normally be in an environment variable
// For this example, we're using WeatherAPI.com
const API_KEY = 'your-api-key-here'; // Replace with your actual API key when deploying
const BASE_URL = 'https://api.weatherapi.com/v1';

// For the example, we'll use a free weather API that doesn't require API keys for development
const MOCK_API_ENABLED = true;
const MOCK_API_URL = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
const MOCK_HEADERS = {
  'X-RapidAPI-Key': 'placeholder-key',  // Replace with an actual key if using in production
  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
};

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    if (MOCK_API_ENABLED) {
      // For development, return mock data
      return getMockWeatherData(location);
    }
    
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 7,
        aqi: 'yes',
        alerts: 'yes'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Mock data for development purposes
const getMockWeatherData = async (location: string): Promise<WeatherData> => {
  // This is just for demo purposes when you don't have an API key
  const mockData: WeatherData = {
    location: {
      name: location || 'San Francisco',
      country: 'United States',
      localtime: new Date().toLocaleString(),
    },
    current: {
      temp_c: 18,
      temp_f: 64.4,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003
      },
      wind_kph: 14.4,
      wind_degree: 220,
      wind_dir: 'SW',
      pressure_mb: 1012,
      precip_mm: 0,
      humidity: 72,
      cloud: 50,
      feelslike_c: 18,
      feelslike_f: 64.4,
      vis_km: 10,
      uv: 5,
      is_day: 1
    },
    forecast: {
      forecastday: Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          date: date.toISOString().split('T')[0],
          date_epoch: date.getTime() / 1000,
          day: {
            maxtemp_c: 20 + Math.random() * 5,
            maxtemp_f: 68 + Math.random() * 9,
            mintemp_c: 14 + Math.random() * 4,
            mintemp_f: 57.2 + Math.random() * 7.2,
            avgtemp_c: 17 + Math.random() * 3,
            avgtemp_f: 62.6 + Math.random() * 5.4,
            condition: {
              text: ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain', 'Moderate rain'][Math.floor(Math.random() * 5)],
              icon: `//cdn.weatherapi.com/weather/64x64/day/${[113, 116, 119, 296, 302][Math.floor(Math.random() * 5)]}.png`,
              code: [1000, 1003, 1006, 1183, 1189][Math.floor(Math.random() * 5)]
            },
            daily_chance_of_rain: Math.floor(Math.random() * 100),
            totalprecip_mm: Math.random() * 10,
            avgvis_km: 10,
            avghumidity: 60 + Math.floor(Math.random() * 20),
            uv: Math.floor(Math.random() * 10) + 1
          },
          hour: []
        };
      })
    }
  };
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockData), 500); // Simulate network delay
  });
};