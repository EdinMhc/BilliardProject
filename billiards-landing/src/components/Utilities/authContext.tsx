import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  userRoles: string[];
  login: (token: string, expiresIn?: number) => void;
  logout: () => void;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authData' && !e.newValue && token) {
        logout();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);

  const parseToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      console.log('Token payload:', payload); // Add this line
      
      const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (typeof roles === 'string') {
        return [roles];
      }
      return roles || [];
    } catch (e) {
      console.error("Failed to parse token", e);
      return [];
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        // Check if token is still valid
        if (authData.token && (!authData.expiresAt || authData.expiresAt > Date.now())) {
          setToken(authData.token);
          setUserRoles(parseToken(authData.token));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('authData');
        }
      } catch (e) {
        console.error("Failed to parse stored auth data", e);
        localStorage.removeItem('authData');
      }
    }
    setInitialized(true);
  }, []);

  const login = (newToken: string, expiresIn: number = 3600 * 1000) => {
    const authData = {
      token: newToken,
      expiresAt: Date.now() + expiresIn, // Default to 1 hour if not specified
    };
    
    localStorage.setItem('authData', JSON.stringify(authData));
    
    setToken(newToken);
    setUserRoles(parseToken(newToken));
  };

  const logout = () => {
    console.log('Logout function started'); // Debug log
    
    // Clear all possible auth storage
    ['authData', 'authToken'].forEach(item => {
      localStorage.removeItem(item);
      sessionStorage.removeItem(item);
    });
    
    console.log('Storage cleared'); // Debug log
    
    // Reset state
    setToken(null);
    setUserRoles([]);
    
    console.log('State reset'); // Debug log
    
    // Force all tabs to sync logout state
    window.dispatchEvent(new Event('storage'));
    
    console.log('Storage event dispatched'); // Debug log
    
    // Force a full page reload
    window.location.href = '/';
    console.log('Redirect initiated'); // Debug log
  };

  const value = { token, userRoles, login, logout, initialized };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}