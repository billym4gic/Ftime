import React, { useRef } from 'react';
import { ForecastDay } from '../types/weather';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
  forecastDay: ForecastDay | null;
  isLoading: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecastDay, isLoading }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="mt-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 animate-pulse">
        <div className="w-1/3 h-6 bg-white/20 rounded-full mb-4"></div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-20 bg-white/10 rounded-xl p-3 h-28"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecastDay || !forecastDay.hour || forecastDay.hour.length === 0) return null;

  // Get current hour to highlight the current time
  const now = new Date();
  const currentHour = now.getHours();

  // We'll show just part of the day - current hour plus next several hours
  const hourlyData = forecastDay.hour;
  
  // Scroll to current hour
  const scrollToCurrentHour = () => {
    if (scrollContainerRef.current) {
      const currentHourElement = scrollContainerRef.current.querySelector(`[data-hour="${currentHour}"]`);
      if (currentHourElement) {
        scrollContainerRef.current.scrollLeft = (currentHourElement as HTMLElement).offsetLeft - 100;
      }
    }
  };

  return (
    <div className="mt-6 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Hourly Forecast</h3>
        <button 
          onClick={scrollToCurrentHour}
          className="flex items-center text-white/70 text-sm hover:text-white transition-colors"
        >
          <Clock size={14} className="mr-1" />
          Current Hour
        </button>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-3 scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {hourlyData.map((hour, index) => {
          const time = new Date(hour.time);
          const hourNumber = time.getHours();
          const isCurrentHour = hourNumber === currentHour;
          
          return (
            <div 
              key={index}
              data-hour={hourNumber}
              className={`flex-shrink-0 ${
                isCurrentHour 
                  ? 'bg-white/20 ring-2 ring-white/30' 
                  : 'bg-white/10 hover:bg-white/15'
              } backdrop-blur-md rounded-xl p-3 transition-all duration-300`}
            >
              <div className="text-white font-medium text-center">
                {time.getHours() === 0 ? '12 AM' : 
                  time.getHours() < 12 ? `${time.getHours()} AM` : 
                  time.getHours() === 12 ? '12 PM' : 
                  `${time.getHours() - 12} PM`}
              </div>
              
              <div className="flex justify-center my-2">
                <img 
                  src={`https:${hour.condition.icon}`} 
                  alt={hour.condition.text}
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              <div className="text-white text-center font-semibold">{Math.round(hour.temp_c)}°</div>
              
              <div className="flex justify-center items-center mt-1">
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div 
                    className="bg-blue-400 h-1 rounded-full"
                    style={{ width: `${hour.chance_of_rain}%` }}
                  ></div>
                </div>
                <span className="text-white/70 text-xs ml-1">{hour.chance_of_rain}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;