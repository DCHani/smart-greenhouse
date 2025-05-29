import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('greenhouseUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const signIn = (email, password) => {
    // For demo purposes, we'll just create a mock user
    // In a real app, you would validate credentials with your backend
    const user = {
      id: '1',
      name: 'John Smith',
      email: email,
      role: 'Greenhouse Manager',
      avatar: 'https://i.pravatar.cc/150?img=12'
    };
    
    setCurrentUser(user);
    localStorage.setItem('greenhouseUser', JSON.stringify(user));
    return user;
  };

  // Sign up function
  const signUp = (name, email, password) => {
    // For demo purposes, we'll just create a mock user
    const user = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: 'Greenhouse Owner',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setCurrentUser(user);
    localStorage.setItem('greenhouseUser', JSON.stringify(user));
    return user;
  };

  // Logout function
  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('greenhouseUser');
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
