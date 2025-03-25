// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize from localStorage
    setToken(localStorage.getItem('authToken'));
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}