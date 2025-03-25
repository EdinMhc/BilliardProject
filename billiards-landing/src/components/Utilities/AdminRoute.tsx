import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';
import { isAdmin, isSuperAdmin } from './authUtils';
import React from 'react';

export function AdminRoute({ children, requiredRole = 'Admin' }: { 
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'SuperAdmin';
}) {
  const { token, userRoles } = useAuth();

  const hasAccess = isSuperAdmin(userRoles) || 
                   (requiredRole === 'Admin' && isAdmin(userRoles));

  if (!token || !hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}