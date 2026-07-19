import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('waypoint_auth_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse auth session', e);
      }
    }
  }, []);

  const loginWithEmail = (email, password) => {
    const name = email.split('@')[0];
    const mockUser = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      phone: '',
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      searchHistory: JSON.parse(localStorage.getItem(`history_${email}`) || '[]'),
      isOwner: email.includes('owner')
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('waypoint_auth_session', JSON.stringify(mockUser));
  };

  const loginWithPhone = (phone, otp) => {
    const mockUser = {
      name: `User ${phone.slice(-4)}`,
      email: '',
      phone,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${phone}`,
      searchHistory: JSON.parse(localStorage.getItem(`history_${phone}`) || '[]'),
      isOwner: false
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('waypoint_auth_session', JSON.stringify(mockUser));
  };

  const loginWithGoogle = () => {
    const mockUser = {
      name: 'Sanjay Kumar',
      email: 'sanjay.kumar@gmail.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      searchHistory: JSON.parse(localStorage.getItem('history_google') || '[]'),
      isOwner: false
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('waypoint_auth_session', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('waypoint_auth_session');
  };

  const addSearchHistory = (term) => {
    if (!term || term.trim() === '') return;
    setUser(prev => {
      if (!prev) return prev;
      const cleanHistory = (prev.searchHistory || []).filter(h => h !== term);
      const newHistory = [term, ...cleanHistory].slice(0, 10);
      
      const key = prev.email || prev.phone || 'google';
      localStorage.setItem(`history_${key}`, JSON.stringify(newHistory));

      const updated = { ...prev, searchHistory: newHistory };
      localStorage.setItem('waypoint_auth_session', JSON.stringify(updated));
      return updated;
    });
  };

  const clearSearchHistory = () => {
    setUser(prev => {
      if (!prev) return prev;
      const key = prev.email || prev.phone || 'google';
      localStorage.setItem(`history_${key}`, JSON.stringify([]));

      const updated = { ...prev, searchHistory: [] };
      localStorage.setItem('waypoint_auth_session', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginWithEmail,
        loginWithPhone,
        loginWithGoogle,
        logout,
        addSearchHistory,
        clearSearchHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
