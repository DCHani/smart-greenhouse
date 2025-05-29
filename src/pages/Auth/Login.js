import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return setError('Please fill in all fields');
    }
    
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your Smart Greenhouse dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-secondary">
                  Forgot your password?
                </Link>
              </div>
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
                ) : "Sign In"}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FaGoogle className="text-red-600" />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FaFacebook className="text-blue-600" />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FaLinkedin className="text-blue-800" />
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-secondary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image and info */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Smart Greenhouse Management System</h2>
          <p className="mb-8">Monitor and control your greenhouse environment from anywhere. Access real-time data, automated systems, and optimize plant growth with our intelligent platform.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Remote Monitoring</h3>
              <p className="text-sm">Track temperature, humidity, and other vital metrics in real-time.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Smart Controls</h3>
              <p className="text-sm">Automate your greenhouse systems or control them manually from anywhere.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Energy Efficient</h3>
              <p className="text-sm">Optimize resource usage with intelligent recommendations and automation.</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Data Analytics</h3>
              <p className="text-sm">Gain insights into your greenhouse performance with detailed reports.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
