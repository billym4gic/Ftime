// Helper functions for weather data manipulation and UI

// Map weather condition codes to background gradients
export const getWeatherBackground = (conditionCode: number, timeOfDay: 'day' | 'night'): string => {
  // Clear
  if ([1000].includes(conditionCode)) {
    return timeOfDay === 'day' 
      ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
      : 'bg-gradient-to-br from-blue-900 to-indigo-900';
  }
  
  // Partly cloudy
  if ([1003].includes(conditionCode)) {
    return timeOfDay === 'day'
      ? 'bg-gradient-to-br from-blue-400 to-blue-500' 
      : 'bg-gradient-to-br from-slate-800 to-blue-900';
  }
  
  // Cloudy
  if ([1006, 1009].includes(conditionCode)) {
    return timeOfDay === 'day'
      ? 'bg-gradient-to-br from-blue-300 to-slate-400'
      : 'bg-gradient-to-br from-slate-700 to-slate-900';
  }
  
  // Fog, mist
  if ([1030, 1135, 1147].includes(conditionCode)) {
    return 'bg-gradient-to-br from-slate-400 to-slate-600';
  }
  
  // Rain
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(conditionCode)) {
    return 'bg-gradient-to-br from-slate-500 to-blue-700';
  }
  
  // Snow
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(conditionCode)) {
    return 'bg-gradient-to-br from-blue-100 to-blue-300';
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
    return 'bg-gradient-to-br from-slate-700 to-slate-900';
  }
  
  // Default
  return timeOfDay === 'day'
    ? 'bg-gradient-to-br from-blue-400 to-blue-600'
    : 'bg-gradient-to-br from-blue-900 to-indigo-900';
};

// Determine if it's day or night
export const getTimeOfDay = (isDay: number): 'day' | 'night' => {
  return isDay === 1 ? 'day' : 'night';
};

// Format temperatures
export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  return `${Math.round(temp)}°${unit}`;
};

// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

// Format time to 12-hour format
export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Convert wind direction degrees to cardinal direction
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Get a descriptive wind speed label
export const getWindSpeedLabel = (speedKph: number): string => {
  if (speedKph < 1) return 'Calm';
  if (speedKph < 6) return 'Light air';
  if (speedKph < 12) return 'Light breeze';
  if (speedKph < 20) return 'Gentle breeze';
  if (speedKph < 29) return 'Moderate breeze';
  if (speedKph < 39) return 'Fresh breeze';
  if (speedKph < 50) return 'Strong breeze';
  if (speedKph < 62) return 'Near gale';
  if (speedKph < 75) return 'Gale';
  if (speedKph < 89) return 'Strong gale';
  if (speedKph < 103) return 'Storm';
  return 'Hurricane force';
};

// Get UV index description
export const getUVIndexDescription = (uvIndex: number): string => {
  if (uvIndex < 3) return 'Low';
  if (uvIndex < 6) return 'Moderate';
  if (uvIndex < 8) return 'High';
  if (uvIndex < 11) return 'Very High';
  return 'Extreme';
};