import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const DEFAULT_MOCK_USERS = [
  {
    username: 'admin',
    email: 'admin@stagecore.com',
    password: 'admin',
    name: 'StageCore Admin',
    role: 'ROLE_ADMIN',
    dob: '1995-01-01'
  },
  {
    username: 'admin123',
    email: 'admin123@stagecore.com',
    password: 'admin123',
    name: 'StageCore Admin',
    role: 'ROLE_ADMIN',
    dob: '1995-01-01'
  },
  {
    username: 'player',
    email: 'player@stagecore.com',
    password: 'player123',
    name: 'Pro Gamer',
    role: 'ROLE_USER',
    dob: '2000-05-15'
  }
];

const DEMO_PLAYER_USER = {
  username: 'DemoPlayer',
  email: 'demo@stagecore.com',
  name: 'Demo Pro Player',
  role: 'ROLE_USER',
  dob: '2000-01-15'
};

const DEMO_ADMIN_USER = {
  username: 'DemoAdmin',
  email: 'admin@stagecore.com',
  name: 'StageCore Admin',
  role: 'ROLE_ADMIN',
  dob: '1995-05-20'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const demoLogin = (role = 'ROLE_USER') => {
    const selectedUser = role === 'ROLE_ADMIN' ? DEMO_ADMIN_USER : DEMO_PLAYER_USER;
    const demoToken = `stagecore_demo_jwt_token_${Date.now()}`;
    
    try {
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(selectedUser));
    } catch (e) {
      console.warn('LocalStorage error during demo login:', e);
    }
    
    setToken(demoToken);
    setUser(selectedUser);
    return { success: true, user: selectedUser };
  };

  const login = async (username, password) => {
    // Demo build: instantly authenticate as demo user
    return demoLogin(username?.toLowerCase().includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER');
  };

  const register = async (username, email, password, name, dob) => {
    // Demo build: instantly authenticate as demo user
    return demoLogin('ROLE_USER');
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {}
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, demoLogin, logout, loading, API_BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
