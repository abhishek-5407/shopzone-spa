/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shopzone_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user state from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopzone_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shopzone_user');
      }
    } catch (error) {
      console.error('Failed to persist user state to localStorage:', error);
    }
  }, [user]);

  const loginAsGuest = () => {
    const guestUser = {
      name: 'Guest Developer',
      email: 'guest@shopzone.io',
      role: 'Guest User',
      isGuest: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    };
    setUser(guestUser);
    return guestUser;
  };

  const loginWithCredentials = (email, password, name = 'Valued Customer') => {
    const authenticatedUser = {
      name: name || email.split('@')[0],
      email: email,
      role: 'Registered Customer',
      isGuest: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    };
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsGuest,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
