import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiBell, FiGlobe, FiClock, FiToggleLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    bio: 'Greenhouse enthusiast and plant lover.',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    critical: true,
    updates: true,
    tips: false,
  });
  
  const [units, setUnits] = useState({
    temperature: 'celsius',
    length: 'metric',
    time: '24h',
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const handleUnitChange = (setting, value) => {
    setUnits(prev => ({ ...prev, [setting]: value }));
  };
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    alert('Profile updated successfully!');
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // In a real app, this would verify and change the password
    alert('Password changed successfully!');
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Profile Settings */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FiUser className="mr-2" size={20} />
              Profile Information
            </h2>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={profileForm.role}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          {/* Password Settings */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FiLock className="mr-2" size={20} />
              Change Password
            </h2>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Notification Settings */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FiBell className="mr-2" size={20} />
              Notifications
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email} 
                    onChange={() => handleNotificationToggle('email')}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Push Notifications</h3>
                  <p className="text-xs text-gray-500">Receive push notifications on this device</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.push} 
                    onChange={() => handleNotificationToggle('push')}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Types</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Critical Alerts</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.critical} 
                        onChange={() => handleNotificationToggle('critical')}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">System Updates</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.updates} 
                        onChange={() => handleNotificationToggle('updates')}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Tips & Suggestions</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notificationSettings.tips} 
                        onChange={() => handleNotificationToggle('tips')}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Units & Preferences */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FiGlobe className="mr-2" size={20} />
              Units & Preferences
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Temperature</h3>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="temperature"
                      value="celsius"
                      checked={units.temperature === 'celsius'}
                      onChange={() => handleUnitChange('temperature', 'celsius')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Celsius (°C)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="temperature"
                      value="fahrenheit"
                      checked={units.temperature === 'fahrenheit'}
                      onChange={() => handleUnitChange('temperature', 'fahrenheit')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Fahrenheit (°F)</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Measurement System</h3>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="length"
                      value="metric"
                      checked={units.length === 'metric'}
                      onChange={() => handleUnitChange('length', 'metric')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Metric (cm, m)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="length"
                      value="imperial"
                      checked={units.length === 'imperial'}
                      onChange={() => handleUnitChange('length', 'imperial')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Imperial (in, ft)</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Time Format</h3>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="time"
                      value="24h"
                      checked={units.time === '24h'}
                      onChange={() => handleUnitChange('time', '24h')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">24-hour (14:30)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="time"
                      value="12h"
                      checked={units.time === '12h'}
                      onChange={() => handleUnitChange('time', '12h')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">12-hour (2:30 PM)</span>
                  </label>
                </div>
              </div>
              
              <button className="btn btn-primary w-full">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
