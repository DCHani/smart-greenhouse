import React, { useState, useEffect } from 'react';
import { FiBell, FiInfo, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

// Mock notification data
const generateMockNotifications = () => {
  return [
    {
      id: 1,
      title: 'Fertilizer Level Low',
      message: 'Your greenhouse fertilizer level is below 25%. Please refill soon to ensure optimal plant growth.',
      type: 'warning',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: 2,
      title: 'Temperature Alert',
      message: 'Greenhouse temperature exceeded normal range (24°C) for more than 1 hour. Check cooling system.',
      type: 'alert',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
    },
    {
      id: 3,
      title: 'System Update Completed',
      message: 'The Neos Greenhouse System has been updated to version 2.4.0. New features include improved sensor accuracy and water management.',
      type: 'info',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: 4,
      title: 'Weekly Report Available',
      message: 'Your greenhouse performance report for last week is now available. Resource usage improved by 8% compared to previous week.',
      type: 'success',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: 5,
      title: 'CO₂ Levels Normalized',
      message: 'CO₂ levels have returned to optimal range (800 ppm). Ventilation system functioning properly.',
      type: 'success',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
    {
      id: 6,
      title: 'Water Pump Maintenance',
      message: 'Scheduled maintenance for the water pump is recommended. The system has been running continuously for 30 days.',
      type: 'info',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      read: true,
    },
    {
      id: 7,
      title: 'Humidity Fluctuation',
      message: 'Unusual humidity fluctuations detected in the past 24 hours. This might indicate a leak or ventilation issue.',
      type: 'warning',
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
      read: true,
    },
  ];
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Load mock notifications data
    setNotifications(generateMockNotifications());
  }, []);
  
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'alert') return notification.type === 'alert';
    if (filter === 'warning') return notification.type === 'warning';
    if (filter === 'info') return notification.type === 'info' || notification.type === 'success';
    return true;
  });
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'alert':
        return <FiAlertCircle className="text-red-500" size={20} />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" size={20} />;
      case 'success':
        return <FiCheckCircle className="text-green-500" size={20} />;
      case 'info':
      default:
        return <FiInfo className="text-blue-500" size={20} />;
    }
  };
  
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Return formatted date
    return timestamp.toLocaleDateString();
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h1>
        <p className="text-gray-600">Receive alerts and updates from your Neos Greenhouse System</p>
      </div>
      
      {/* Filter and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'unread' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread
          </button>
          <button 
            onClick={() => setFilter('alert')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'alert' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alerts
          </button>
          <button 
            onClick={() => setFilter('warning')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'warning' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Warnings
          </button>
          <button 
            onClick={() => setFilter('info')}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === 'info' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Info
          </button>
        </div>
        
        <button 
          onClick={markAllAsRead}
          className="text-sm text-primary hover:text-secondary flex items-center"
        >
          <FiCheckCircle className="mr-1" size={16} />
          Mark all as read
        </button>
      </div>
      
      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="card py-8 flex flex-col items-center justify-center">
            <FiBell className="text-gray-400 mb-2" size={48} />
            <p className="text-gray-500">No notifications to display</p>
            <p className="text-gray-400 text-sm">Any system alerts or messages will appear here</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`card border-l-4 transition-all ${
                notification.read ? 'border-l-gray-300' : 
                notification.type === 'alert' ? 'border-l-red-500' :
                notification.type === 'warning' ? 'border-l-yellow-500' :
                notification.type === 'success' ? 'border-l-green-500' :
                'border-l-blue-500'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      <span className="text-xs text-gray-500 mr-2">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Delete notification"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  </div>
                  <p className={`mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="mt-2 text-xs text-primary hover:text-secondary font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
