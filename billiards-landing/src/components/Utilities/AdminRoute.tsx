import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';
import { isAdmin, isSuperAdmin } from './authUtils';
import React from 'react';

export function AdminRoute({ children, requiredRole = 'Admin' }: { 
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'SuperAdmin';
}) {
  const { token, userRoles, initialized } = useAuth();

  if (!initialized) {
    return null;
  }

  console.log('AdminRoute debug:', { 
    token, 
    userRoles, 
    requiredRole,
    isAdmin: isAdmin(userRoles),
    isSuperAdmin: isSuperAdmin(userRoles)
  });

  const hasAccess = isSuperAdmin(userRoles) || 
                   (requiredRole === 'Admin' && isAdmin(userRoles));

                   if (!token) {
                    console.log('Redirecting: No token');
                    return <Navigate to="/" replace />;
                  }
                
                  if (!hasAccess) {
                    console.log('Redirecting: No access. User roles:', userRoles, 'Required role:', requiredRole);
    return <Navigate to="/" replace />;
  }

  return children;
}