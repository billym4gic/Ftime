import React, { useState } from 'react';
import { ForecastDay } from '../types/weather';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ForecastWeatherProps {
  forecast: ForecastDay[];
  isLoading: boolean;
}

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ forecast, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 4; // Number of forecast days visible at once

  if (isLoading) {
    return (
      <div className="mt-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 animate-pulse">
        <div className="w-1/3 h-6 bg-white/20 rounded-full mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white/10 rounded-xl p-4 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecast || forecast.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(Math.max(0, Math.min(forecast.length - visibleCount, activeIndex + 1)));
  };

  return (
    <div className="mt-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h3>
      
      <div className="relative">
        {activeIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 bg-white/20 rounded-full p-1 text-white hover:bg-white/30 transition-colors z-10"
            aria-label="See previous days"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        <div className="overflow-hidden">
          <div 
            className="grid grid-cols-4 gap-4 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 25}%)` }}
          >
            {forecast.map((day, index) => (
              <ForecastCard key={day.date} day={day} />
            ))}
          </div>
        </div>
        
        {activeIndex < forecast.length - visibleCount && (
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 bg-white/20 rounded-full p-1 text-white hover:bg-white/30 transition-colors z-10"
            aria-label="See next days"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

interface ForecastCardProps {
  day: ForecastDay;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day }) => {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transition-transform duration-300 hover:transform hover:scale-105 hover:bg-white/15">
      <div className="text-white font-medium">{dayName}</div>
      <div className="text-white/70 text-sm">{monthDay}</div>
      
      <div className="flex justify-center my-2">
        <img 
          src={`https:${day.day.condition.icon}`} 
          alt={day.day.condition.text}
          className="w-12 h-12 object-contain"
        />
      </div>
      
      <div className="text-center mt-1">
        <div className="text-white font-semibold text-lg">{Math.round(day.day.maxtemp_c)}°</div>
        <div className="text-white/70 text-sm">{Math.round(day.day.mintemp_c)}°</div>
      </div>
      
      <div className="mt-1 flex items-center justify-center">
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div 
            className="bg-blue-400 h-1.5 rounded-full"
            style={{ width: `${day.day.daily_chance_of_rain}%` }}
          ></div>
        </div>
        <span className="text-white/70 text-xs ml-1">{day.day.daily_chance_of_rain}%</span>
      </div>
    </div>
  );
};

export default ForecastWeather;