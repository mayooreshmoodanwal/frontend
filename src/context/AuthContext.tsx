'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '@/lib/api';

interface UserProfile {
  user_id: string;
  full_name: string;
  email: string;
  created_at?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'forgot';
  isDashboardOpen: boolean;
  openAuthModal: (mode?: 'signin' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  openDashboard: () => void;
  closeDashboard: () => void;
  loginSuccess: (token: string, user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  isAuthModalOpen: false,
  authModalMode: 'signin',
  isDashboardOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  openDashboard: () => {},
  closeDashboard: () => {},
  loginSuccess: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('wishelier_auth_token');
      if (storedToken) {
        setToken(storedToken);
        fetch(getApiUrl('/api/auth/me'), {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Token expired');
          })
          .then((data) => {
            setUser({
              user_id: data.user_id,
              full_name: data.full_name,
              email: data.email,
              created_at: data.created_at,
            });
          })
          .catch(() => {
            localStorage.removeItem('wishelier_auth_token');
            setToken(null);
            setUser(null);
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' | 'forgot' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);

  const loginSuccess = (newToken: string, newUser: UserProfile) => {
    localStorage.setItem('wishelier_auth_token', newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('wishelier_auth_token');
    setToken(null);
    setUser(null);
    setIsDashboardOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthModalOpen,
        authModalMode,
        isDashboardOpen,
        openAuthModal,
        closeAuthModal,
        openDashboard,
        closeDashboard,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
