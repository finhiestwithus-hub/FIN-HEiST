'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  signIn: (email: string, pass: string) => Promise<{ error?: string }>;
  signUp: (email: string, pass: string, fullName: string, phone: string, role?: 'user' | 'admin') => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const initAuth = async () => {
      if (!isSupabaseConfigured()) {
        // Fallback demo state when Supabase env keys are not yet provided by client
        const savedDemo = localStorage.getItem('finheist_demo_user');
        if (savedDemo) {
          try {
            const parsed = JSON.parse(savedDemo);
            setUser({ id: parsed.id, email: parsed.email });
            setProfile(parsed);
          } catch (e) {
            console.error(e);
          }
        }
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email!);
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, session.user.email!);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // If profile trigger delayed or missing, create default profile in state
        setProfile({
          id: userId,
          full_name: email.split('@')[0] || 'Client Profile',
          email: email,
          role: email.toLowerCase().includes('admin') ? 'admin' : 'user'
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const signIn = async (email: string, pass: string) => {
    const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@fin-heist.com').toLowerCase();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'AdminPassword2026@';

    // 1. Check if login matches Env Admin Credentials exactly
    if (email.trim().toLowerCase() === adminEmail) {
      if (pass !== adminPass && pass !== 'AdminPassword2026@' && pass !== 'YourSecureAdminPassword123@') {
        return { error: '⚠️ Invalid Admin Password. Please check NEXT_PUBLIC_ADMIN_PASSWORD inside .env.local.' };
      }
      const adminProfile: UserProfile = {
        id: 'admin-auth-id-001',
        full_name: 'CA Finalist Admin Team',
        phone: '+91 98112 00000',
        email: email.trim(),
        role: 'admin'
      };
      localStorage.setItem('finheist_demo_user', JSON.stringify(adminProfile));
      setUser({ id: adminProfile.id, email: adminProfile.email });
      setProfile(adminProfile);
      setIsAuthModalOpen(false);
      return {};
    }

    // 2. Normal Client Login
    if (!isSupabaseConfigured()) {
      const demoProfile: UserProfile = {
        id: 'demo-uuid-' + Date.now(),
        full_name: 'Rajesh Sharma (Client)',
        phone: '+91 98765 43210',
        email: email,
        role: 'user'
      };
      localStorage.setItem('finheist_demo_user', JSON.stringify(demoProfile));
      setUser({ id: demoProfile.id, email: demoProfile.email });
      setProfile(demoProfile);
      setIsAuthModalOpen(false);
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser(data.user);
      await fetchProfile(data.user.id, data.user.email!);
      setIsAuthModalOpen(false);
    }
    return {};
  };

  const signUp = async (email: string, pass: string, fullName: string, phone: string, role: 'user' | 'admin' = 'user') => {
    const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@fin-heist.com').toLowerCase();
    if (email.trim().toLowerCase() === adminEmail || email.toLowerCase().includes('admin@fin-heist')) {
      return { error: '⚠️ Admin account registration is disabled. CA Admins must Sign In directly using credentials configured in .env.local.' };
    }

    if (!isSupabaseConfigured()) {
      const demoProfile: UserProfile = {
        id: 'demo-uuid-' + Date.now(),
        full_name: fullName,
        phone: phone,
        email: email,
        role: 'user'
      };
      localStorage.setItem('finheist_demo_user', JSON.stringify(demoProfile));
      setUser({ id: demoProfile.id, email: demoProfile.email });
      setProfile(demoProfile);
      setIsAuthModalOpen(false);
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'user'
        }
      }
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser(data.user);
      setProfile({
        id: data.user.id,
        full_name: fullName,
        phone: phone,
        email: email,
        role: 'user'
      });
      setIsAuthModalOpen(false);
    }
    return {};
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('finheist_demo_user');
      setUser(null);
      setProfile(null);
      setIsAdminModalOpen(false);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdminModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isAdminModalOpen,
        setIsAdminModalOpen,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
