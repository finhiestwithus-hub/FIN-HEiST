'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';
import AdminPortalModal from './admin/AdminPortalModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
      <AdminPortalModal />
    </AuthProvider>
  );
}
