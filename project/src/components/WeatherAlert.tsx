import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

// Mock weather alert data
interface WeatherAlertProps {
  alerts?: {
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    time: string;
  }[];
}

const WeatherAlert: React.FC<WeatherAlertProps> = ({ alerts = [] }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  // For demo purposes, we'll add a mock severe weather alert if none are provided
  const mockAlerts = alerts.length > 0 ? alerts : [
    {
      title: 'Potential Severe Weather',
      description: 'Weather conditions may deteriorate in the next 24 hours. Stay informed with the latest updates.',
      severity: 'medium' as const,
      time: new Date().toISOString()
    }
  ];
  
  const visibleAlerts = mockAlerts.filter(alert => !dismissedAlerts.includes(alert.title));
  
  if (visibleAlerts.length === 0) return null;
  
  const handleDismiss = (title: string) => {
    setDismissedAlerts([...dismissedAlerts, title]);
  };
  
  return (
    <div className="mt-6 space-y-4">
      {visibleAlerts.map((alert, index) => {
        // Color based on severity
        const bgColor = 
          alert.severity === 'high' ? 'bg-red-500/20 border-red-500/30' :
          alert.severity === 'medium' ? 'bg-orange-500/20 border-orange-500/30' :
          'bg-yellow-500/20 border-yellow-500/30';
          
        const iconColor = 
          alert.severity === 'high' ? 'text-red-500' :
          alert.severity === 'medium' ? 'text-orange-500' :
          'text-yellow-500';
        
        return (
          <div 
            key={index}
            className={`${bgColor} backdrop-blur-md rounded-2xl p-4 border animate-fadeIn relative overflow-hidden`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`${iconColor} mt-1`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{alert.title}</h4>
                  <p className="text-white/80 text-sm mt-1">{alert.description}</p>
                  <p className="text-white/60 text-xs mt-2">
                    {new Date(alert.time).toLocaleString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleDismiss(alert.title)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Dismiss alert"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Animated pulse in the background */}
            <div className="absolute inset-0 -z-10">
              <div className={`absolute inset-0 ${
                alert.severity === 'high' ? 'bg-red-500/5' :
                alert.severity === 'medium' ? 'bg-orange-500/5' :
                'bg-yellow-500/5'
              } animate-pulse-slow rounded-2xl`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherAlert;