'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, signIn, signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        const res = await signIn(email, password);
        if (res.error) {
          setErrorMsg(res.error);
        }
      } else {
        if (!fullName.trim() || fullName.trim().length < 2) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }

        const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@fin-heist.com').toLowerCase();
        if (email.trim().toLowerCase() === adminEmail || email.toLowerCase().includes('admin@fin-heist')) {
          setErrorMsg('⚠️ Admin accounts cannot be created via Sign Up. CA Admins must sign in directly using credentials set in .env.local.');
          setLoading(false);
          return;
        }

        const res = await signUp(email, password, fullName, phone, 'user');
        if (res.error) {
          setErrorMsg(res.error);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-white via-slate-50 to-[#FCFBFA] border-2 border-slate-200/90 rounded-3xl shadow-[0_25px_80px_-15px_rgba(245,158,11,0.3)] overflow-hidden animate-card-pulse">
        
        {/* Top Gold Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-7 py-5 border-b border-amber-300 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-950/15 border border-slate-950/25 flex items-center justify-center text-slate-950 font-extrabold shadow-2xs">
              <Lock className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-950 tracking-tight">
                {authModalMode === 'login' ? 'Client / CA Admin Sign In' : 'Create Client Account'}
              </h3>
              <p className="text-xs text-slate-900/90 font-semibold font-inter mt-0.5">
                {authModalMode === 'login' ? 'Access your consultation dashboard & CA feed' : 'Secure client portal registration'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-9 h-9 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors font-bold shrink-0"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tabs Mode Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 gap-1.5 mx-7 mt-6 rounded-2xl">
          <button
            type="button"
            onClick={() => { setAuthModalMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl font-poppins font-extrabold text-xs transition-all ${
              authModalMode === 'login'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In to Account
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl font-poppins font-extrabold text-xs transition-all ${
              authModalMode === 'signup'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2 shadow-2xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {authModalMode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 font-poppins mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 font-poppins mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 font-poppins mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com or admin@fin-heist.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 font-poppins mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-base shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 border border-amber-300"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authModalMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                    <ArrowRight className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Info Box */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-600 font-medium">
            💡 <strong className="text-slate-900">CA Admin Security:</strong> Admins cannot register via Sign Up. CA team must Sign In with the exact credentials configured in <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold text-slate-900">.env.local</code>.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-3.5 bg-slate-100/90 border-t border-slate-200/90 flex items-center justify-between text-xs font-bold text-slate-600 font-inter">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            256-Bit SSL Encrypted Auth
          </span>
          <span>🔒 Supabase Secure Portal</span>
        </div>

      </div>
    </div>
  );
}
