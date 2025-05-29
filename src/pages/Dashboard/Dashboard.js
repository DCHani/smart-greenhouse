import React, { useState, useEffect } from 'react';
import { FiBattery, FiThermometer, FiDroplet, FiActivity, FiTarget } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../../context/AuthContext';

// Mock data for the dashboard
const generateMockData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round((15 + Math.random() * 5) * 10) / 10,
      humidity: Math.round((65 + Math.random() * 15) * 10) / 10,
      co2: Math.round(750 + Math.random() * 100),
    });
  }
  
  return data;
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [fertilizer, setFertilizer] = useState(20);
  const [co2Level, setCo2Level] = useState(800);
  const [treatmentProgress, setTreatmentProgress] = useState(70);
  const [chartData, setChartData] = useState([]);
  const [greenhouseLocation] = useState({ lat: 51.505, lng: -0.09 });
  
  useEffect(() => {
    // Simulate data loading
    setChartData(generateMockData());
    
    // Simulate real-time updates every 5 minutes
    const updateInterval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: Math.round((15 + Math.random() * 5) * 10) / 10,
          humidity: Math.round((65 + Math.random() * 15) * 10) / 10,
          co2: Math.round(750 + Math.random() * 100),
        });
        
        return newData;
      });
      
      // Update other metrics
      setBatteryLevel(prev => Math.max(1, prev - Math.random()));
      setCo2Level(prev => Math.max(400, Math.min(1000, prev + (Math.random() * 20 - 10))));
      setTreatmentProgress(prev => Math.min(100, prev + (Math.random() * 2)));
    }, 300000); // 5 minutes
    
    return () => clearInterval(updateInterval);
  }, []);
  
  const getStatusColor = (value, threshold) => {
    return value < threshold ? 'text-red-500' : 'text-green-500';
  };
  
  return (
    <div className="p-6">
      <div className="mb-8 animate-slideInUp">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {currentUser?.name || 'User'}</h1>
        <p className="text-gray-600">Here's what's happening in your greenhouse today</p>
      </div>
      
      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card animate-fadeIn delay-100 hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Battery Status</h2>
            <FiBattery className={batteryLevel > 30 ? 'text-green-500' : 'text-red-500'} size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Current Level</span>
              <span className={`font-semibold ${batteryLevel > 30 ? 'text-green-500' : 'text-red-500'}`}>
                {batteryLevel.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  batteryLevel > 60 ? 'bg-green-500' : batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${batteryLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="card animate-fadeIn delay-200 hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Fertilizer Level</h2>
            <FiDroplet className={fertilizer > 30 ? 'text-green-500' : 'text-red-500'} size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Current Level</span>
              <span className={`font-semibold ${fertilizer > 30 ? 'text-green-500' : 'text-red-500'}`}>
                {fertilizer}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  fertilizer > 60 ? 'bg-green-500' : fertilizer > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${fertilizer}%` }}
              ></div>
            </div>
            {fertilizer <= 30 && (
              <div className="mt-2 text-sm text-red-500 flex items-center">
                <FiDroplet className="mr-1" size={14} />
                <span>Fertilizer level is low. Refill soon.</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="card animate-fadeIn delay-300 hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">CO₂ Concentration</h2>
            <FiActivity className={co2Level < 900 ? 'text-green-500' : 'text-yellow-500'} size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Current Level</span>
              <span className={`font-semibold ${co2Level < 900 ? 'text-green-500' : 'text-yellow-500'}`}>
                {co2Level} ppm
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  co2Level < 800 ? 'bg-green-500' : co2Level < 900 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(co2Level - 400) / 10}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>400 ppm</span>
              <span>900 ppm</span>
              <span>1400 ppm</span>
            </div>
          </div>
        </div>
        
        <div className="card animate-fadeIn delay-400 hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Treatment Progress</h2>
            <FiTarget className="text-primary" size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Completion</span>
              <span className="font-semibold text-primary">{treatmentProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-primary"
                style={{ width: `${treatmentProgress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Nutrient treatment in progress
            </div>
          </div>
        </div>
      </div>
      
      {/* Temperature chart */}
      <div className="card mb-8 animate-fadeIn delay-500">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Temperature Monitoring</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
                domain={[10, 25]}
              />
              <Tooltip formatter={(value) => [`${value}°C`, 'Temperature']} />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#4CAF50"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Map and humidity chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Greenhouse location */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Greenhouse Location</h2>
          <div className="h-72 rounded-lg overflow-hidden">
            {typeof window !== 'undefined' && (
              <MapContainer 
                center={greenhouseLocation} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={greenhouseLocation}>
                  <Popup>
                    Your Smart Greenhouse <br /> Location
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
        
        {/* Humidity chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Humidity Levels</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  label={{ value: '%', angle: -90, position: 'insideLeft' }}
                  domain={[50, 90]}
                />
                <Tooltip formatter={(value) => [`${value}%`, 'Humidity']} />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#2196F3"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
