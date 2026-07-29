import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const AdminRoute = ({ children, onOpenAuth }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ROLE_ADMIN')) {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  if (loading || !user || user.role !== 'ROLE_ADMIN') {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gaming-purple border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm font-gaming uppercase tracking-wider">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
