import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, initialized } = useAuth();

  if (!initialized) {
    return null;
  }

  if (!token) {
    return <Navigate to="/" state={{ showLogin: true }} replace />;
  }

  return children;
}