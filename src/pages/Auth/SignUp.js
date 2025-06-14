import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ParticlesBackground from '../../components/Particles/ParticlesBackground';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      return setError('Please fill in all fields');
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signUp(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Left side - Image and info */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        {/* Greenhouse illustration */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/assets/greenhouse-illustration.png" 
            alt="Smart Greenhouse Illustration" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://i.imgur.com/jYYLGUd.png';
            }}
          />
        </div>
        
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-secondary/70"></div>
        
        {/* Content */}
        <div className="max-w-lg p-12 text-white relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 drop-shadow-md animate-slideInLeft">Join Our Smart Greenhouse Community</h2>
          <p className="mb-8 drop-shadow animate-slideInLeft delay-100">Create an account to start monitoring and controlling your greenhouse environment with our cutting-edge IoT platform.</p>
          <div className="grid grid-cols-2 gap-4 animate-fadeIn delay-200">
            <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover-lift hover-glow">
              <h3 className="font-bold mb-2">Easy Setup</h3>
              <p className="text-sm">Connect your greenhouse devices and start monitoring in minutes.</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover-lift hover-glow">
              <h3 className="font-bold mb-2">Custom Alerts</h3>
              <p className="text-sm">Set personalized notifications for critical greenhouse conditions.</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover-lift hover-glow">
              <h3 className="font-bold mb-2">Mobile Access</h3>
              <p className="text-sm">Manage your greenhouse from anywhere using our responsive web app.</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover-lift hover-glow">
              <h3 className="font-bold mb-2">Advanced Reports</h3>
              <p className="text-sm">Track performance and optimize your greenhouse operations.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - SignUp form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
        {/* Particles background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ParticlesBackground />
        </div>
        <div className="w-full max-w-md relative z-10 bg-white/90 p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join the Smart Greenhouse community</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn delay-100">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-secondary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
