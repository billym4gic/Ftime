import React from 'react';
import { WeatherData } from '../types/weather';
import { Droplets, Wind, Thermometer, Eye, Sun, Gauge } from 'lucide-react';
import { getWeatherBackground, getTimeOfDay } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  data: WeatherData;
  isLoading: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-md p-8 shadow-lg border border-white/10 animate-pulse h-80">
        <div className="flex flex-col h-full justify-between">
          <div className="w-1/2 h-6 bg-white/20 rounded-full mb-2"></div>
          <div className="w-1/3 h-4 bg-white/20 rounded-full mb-6"></div>
          <div className="w-1/2 h-10 bg-white/20 rounded-full mb-4"></div>
          <div className="w-2/3 h-6 bg-white/20 rounded-full mb-6"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-white/20 rounded-xl"></div>
            <div className="h-16 bg-white/20 rounded-xl"></div>
            <div className="h-16 bg-white/20 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { current, location } = data;
  const timeOfDay = getTimeOfDay(current.is_day);
  const background = getWeatherBackground(current.condition.code, timeOfDay);
  
  // Format the date and time
  const date = new Date(location.localtime);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div 
      className={`relative overflow-hidden rounded-3xl ${background} p-8 shadow-lg border border-white/10 transition-all duration-700 ease-in-out`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-white">{location.name}</h2>
            <p className="text-white/80">{location.country}</p>
            <p className="text-sm text-white/70 mt-1">{formattedDate} • {formattedTime}</p>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={`https:${current.condition.icon}`} 
              alt={current.condition.text}
              className="w-20 h-20 object-contain mb-1"
            />
            <span className="text-white/90 text-sm text-center">{current.condition.text}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-end">
            <h1 className="text-6xl font-bold text-white">{Math.round(current.temp_c)}°</h1>
            <span className="text-xl text-white/80 ml-1 mb-2">C</span>
          </div>
          <p className="text-white/80">Feels like {Math.round(current.feelslike_c)}°C</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <WeatherStat 
            icon={<Droplets size={18} />} 
            value={`${current.humidity}%`} 
            label="Humidity" 
          />
          <WeatherStat 
            icon={<Wind size={18} />} 
            value={`${current.wind_kph} km/h`} 
            label="Wind" 
          />
          <WeatherStat 
            icon={<Gauge size={18} />} 
            value={`${current.pressure_mb} mb`} 
            label="Pressure" 
          />
          <WeatherStat 
            icon={<Eye size={18} />} 
            value={`${current.vis_km} km`} 
            label="Visibility" 
          />
          <WeatherStat 
            icon={<Sun size={18} />} 
            value={`${current.uv}`} 
            label="UV Index" 
          />
          <WeatherStat 
            icon={<Thermometer size={18} />} 
            value={`${current.cloud}%`} 
            label="Cloud" 
          />
        </div>
      </div>
    </div>
  );
};

interface WeatherStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ icon, value, label }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-white transition-transform duration-300 hover:transform hover:scale-105">
    <div className="text-white/70 mb-1">{icon}</div>
    <div className="font-semibold">{value}</div>
    <div className="text-xs text-white/70">{label}</div>
  </div>
);

export default CurrentWeather;