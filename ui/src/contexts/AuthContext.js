import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext(null);

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check local storage for user data
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          // In a real app, you would validate the token with the server
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login function
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise} Authentication result
   */
  const login = async (username, password) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // const response = await axios.post('/api/auth/login', { username, password });
      
      // For demo purposes, simulate successful login with mock data
      if (username === 'admin' && password === 'admin123') {
        const userData = {
          id: '1',
          username: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Store user data and token in local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      } else if (username === 'user' && password === 'user123') {
        const userData = {
          id: '2',
          username: 'user',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user'
        };
        
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Store user data and token in local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Invalid username or password'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'An error occurred during login'
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Registration result
   */
  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // const response = await axios.post('/api/auth/register', userData);
      
      // For demo purposes, simulate successful registration
      const newUser = {
        id: '3',
        username: userData.username,
        name: userData.name,
        email: userData.email,
        role: 'user'
      };
      
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      
      // Store user data and token in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'An error occurred during registration'
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Update result
   */
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // const response = await axios.put('/api/auth/profile', profileData);
      
      // For demo purposes, update local user data
      const updatedUser = { ...user, ...profileData };
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: error.message || 'An error occurred while updating profile'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // The value that will be given to the context
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;