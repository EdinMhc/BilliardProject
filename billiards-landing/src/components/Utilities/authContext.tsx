// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  userRoles: string[];
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const parseToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Handle both array and single string roles
      const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return Array.isArray(roles) ? roles : [roles];
    } catch (e) {
      console.error("Failed to parse token", e);
      return [];
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setUserRoles(parseToken(storedToken));
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUserRoles(parseToken(newToken));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUserRoles([]);
  };

  const value = { token, userRoles, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}