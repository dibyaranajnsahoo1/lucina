import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('lucina_admin_token');
    if (token) {
      getMe()
        .then(res => setAdmin(res.admin))
        .catch(() => localStorage.removeItem('lucina_admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginAdmin = (token, adminData) => {
    localStorage.setItem('lucina_admin_token', token);
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('lucina_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
