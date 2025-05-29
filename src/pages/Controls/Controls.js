import React, { useState, useEffect } from 'react';
import { 
  FiSun, 
  FiDroplet, 
  FiThermometer, 
  FiWind,
  FiClock,
  FiCalendar,
  FiSettings
} from 'react-icons/fi';

const Controls = () => {
  // Control states
  const [lighting, setLighting] = useState({
    enabled: true,
    brightness: 70,
    autoMode: true,
    schedule: [
      { id: 1, time: '06:00', status: 'on' },
      { id: 2, time: '18:00', status: 'off' }
    ]
  });
  
  const [temperature, setTemperature] = useState({
    enabled: true,
    target: 22,
    current: 24,
    autoMode: true,
    schedule: [
      { id: 1, time: '08:00', value: 22 },
      { id: 2, time: '20:00', value: 18 }
    ]
  });
  
  const [irrigation, setIrrigation] = useState({
    enabled: false,
    duration: 15,
    lastWatered: new Date(new Date().getTime() - 1000 * 60 * 60 * 6), // 6 hours ago
    autoMode: true,
    schedule: [
      { id: 1, time: '07:00', duration: 15 },
      { id: 2, time: '17:00', duration: 15 }
    ]
  });
  
  const [ventilation, setVentilation] = useState({
    enabled: true,
    speed: 50,
    autoMode: true,
    schedule: [
      { id: 1, time: '10:00', value: 60 },
      { id: 2, time: '16:00', value: 40 }
    ]
  });
  
  // Toggle system on/off
  const toggleSystem = (system, value) => {
    switch(system) {
      case 'lighting':
        setLighting(prev => ({ ...prev, enabled: value }));
        break;
      case 'temperature':
        setTemperature(prev => ({ ...prev, enabled: value }));
        break;
      case 'irrigation':
        setIrrigation(prev => ({ ...prev, enabled: value }));
        break;
      case 'ventilation':
        setVentilation(prev => ({ ...prev, enabled: value }));
        break;
      default:
        break;
    }
  };
  
  // Toggle auto mode
  const toggleAutoMode = (system, value) => {
    switch(system) {
      case 'lighting':
        setLighting(prev => ({ ...prev, autoMode: value }));
        break;
      case 'temperature':
        setTemperature(prev => ({ ...prev, autoMode: value }));
        break;
      case 'irrigation':
        setIrrigation(prev => ({ ...prev, autoMode: value }));
        break;
      case 'ventilation':
        setVentilation(prev => ({ ...prev, autoMode: value }));
        break;
      default:
        break;
    }
  };
  
  // Update system value
  const updateSystemValue = (system, value) => {
    switch(system) {
      case 'lighting':
        setLighting(prev => ({ ...prev, brightness: value }));
        break;
      case 'temperature':
        setTemperature(prev => ({ ...prev, target: value }));
        break;
      case 'irrigation':
        setIrrigation(prev => ({ ...prev, duration: value }));
        break;
      case 'ventilation':
        setVentilation(prev => ({ ...prev, speed: value }));
        break;
      default:
        break;
    }
  };
  
  // Format time since last watered
  const formatTimeSince = (date) => {
    const now = new Date();
    const diff = now - date;
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minutes ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a week
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };
  
  // Start manual watering
  const startWatering = () => {
    setIrrigation(prev => ({ 
      ...prev, 
      enabled: true,
      lastWatered: new Date() 
    }));
    
    // Simulate watering for the duration
    setTimeout(() => {
      setIrrigation(prev => ({ ...prev, enabled: false }));
    }, irrigation.duration * 1000);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 animate-slideInUp">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Smart Controls</h1>
        <p className="text-gray-600">Manage your greenhouse systems</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lighting control */}
        <div className="card animate-slideInUp">
          <div className="flex items-start mb-6">
            <div className="p-3 rounded-lg bg-yellow-100 mr-4">
              <FiSun className="text-yellow-500" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Lighting</h2>
              <p className="text-gray-600 text-sm">Control grow lights intensity and scheduling</p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={lighting.enabled} 
                  onChange={(e) => toggleSystem('lighting', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className={`transition-opacity ${lighting.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="mb-6">
              <label className="flex justify-between mb-2 text-sm text-gray-700">
                Brightness: {lighting.brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={lighting.brightness}
                onChange={(e) => updateSystemValue('lighting', parseInt(e.target.value))}
                disabled={!lighting.enabled || lighting.autoMode}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-500" size={18} />
                <span className="text-sm text-gray-700">Auto Schedule</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={lighting.autoMode} 
                  onChange={(e) => toggleAutoMode('lighting', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {lighting.autoMode && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Schedule</h3>
                <div className="space-y-2">
                  {lighting.schedule.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" size={14} />
                        <span>{item.time}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'on' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'on' ? 'Turn On' : 'Turn Off'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Temperature control */}
        <div className="card animate-fadeIn delay-200 hover-lift">
          <div className="flex items-start mb-6">
            <div className="p-3 rounded-lg bg-red-100 mr-4">
              <FiThermometer className="text-red-500" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Temperature</h2>
              <p className="text-gray-600 text-sm">Manage heating and cooling systems</p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={temperature.enabled} 
                  onChange={(e) => toggleSystem('temperature', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className={`transition-opacity ${temperature.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Current</p>
                <p className="text-xl font-semibold">{temperature.current}°C</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Target</p>
                <p className="text-xl font-semibold">{temperature.target}°C</p>
              </div>
            </div>
            
            <div className="mb-6">
              <input
                type="range"
                min="15"
                max="30"
                value={temperature.target}
                onChange={(e) => updateSystemValue('temperature', parseInt(e.target.value))}
                disabled={!temperature.enabled || temperature.autoMode}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15°C</span>
                <span>30°C</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-500" size={18} />
                <span className="text-sm text-gray-700">Auto Schedule</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={temperature.autoMode} 
                  onChange={(e) => toggleAutoMode('temperature', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {temperature.autoMode && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Schedule</h3>
                <div className="space-y-2">
                  {temperature.schedule.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" size={14} />
                        <span>{item.time}</span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {item.value}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Irrigation control */}
        <div className="card animate-fadeIn delay-300 hover-lift">
          <div className="flex items-start mb-6">
            <div className="p-3 rounded-lg bg-blue-100 mr-4">
              <FiDroplet className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Irrigation</h2>
              <p className="text-gray-600 text-sm">Manage watering and moisture levels</p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={irrigation.enabled} 
                  onChange={(e) => toggleSystem('irrigation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className={`transition-opacity ${irrigation.enabled ? 'opacity-100' : 'opacity-50'}`}>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-700">Duration (minutes)</label>
                <span className="text-sm font-medium">{irrigation.duration} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={irrigation.duration}
                onChange={(e) => updateSystemValue('irrigation', parseInt(e.target.value))}
                disabled={irrigation.autoMode}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>30 min</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                Last watered: {formatTimeSince(irrigation.lastWatered)}
              </div>
              <button
                onClick={startWatering}
                disabled={irrigation.enabled || irrigation.autoMode}
                className={`px-4 py-2 rounded-md bg-primary text-white w-full mt-2 ${(irrigation.enabled || irrigation.autoMode) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark animate-pulse'}`}
              >
                Start Manual Watering
              </button>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-500" size={18} />
                <span className="text-sm text-gray-700">Auto Schedule</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={irrigation.autoMode} 
                  onChange={(e) => toggleAutoMode('irrigation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {irrigation.autoMode && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Schedule</h3>
                <div className="space-y-2">
                  {irrigation.schedule.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" size={14} />
                        <span>{item.time}</span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {item.duration} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Ventilation control */}
        <div className="card animate-fadeIn delay-400 hover-lift">
          <div className="flex items-start mb-6">
            <div className="p-3 rounded-lg bg-gray-100 mr-4">
              <FiWind className="text-gray-500" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Ventilation</h2>
              <p className="text-gray-600 text-sm">Control air circulation and exchange</p>
            </div>
            <div className="ml-auto">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={ventilation.enabled} 
                  onChange={(e) => toggleSystem('ventilation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className={`transition-opacity ${ventilation.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-700">Fan Speed</label>
                <span className="text-sm font-medium">{ventilation.speed}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={ventilation.speed}
                onChange={(e) => updateSystemValue('ventilation', parseInt(e.target.value))}
                disabled={!ventilation.enabled || ventilation.autoMode}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Off</span>
                <span>Max</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-500" size={18} />
                <span className="text-sm text-gray-700">Auto Schedule</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={ventilation.autoMode} 
                  onChange={(e) => toggleAutoMode('ventilation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {ventilation.autoMode && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Schedule</h3>
                <div className="space-y-2">
                  {ventilation.schedule.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" size={14} />
                        <span>{item.time}</span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
