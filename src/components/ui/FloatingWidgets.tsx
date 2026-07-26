'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, CheckCircle, Send, Moon, Sun, ArrowUp, Calendar, PhoneCall, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface FloatingWidgetsProps {
 isModalOpen: boolean;
 setIsModalOpen: (open: boolean) => void;
 selectedService?: string;
}

export default function FloatingWidgets({ isModalOpen, setIsModalOpen, selectedService = '' }: FloatingWidgetsProps) {
 const { user, profile, setIsAuthModalOpen, setAuthModalMode } = useAuth();
 const [scrollProgress, setScrollProgress] = useState(0);
 const [showScrollTop, setShowScrollTop] = useState(false);
 const [isDarkMode, setIsDarkMode] = useState(true);
 const [formData, setFormData] = useState({
 fullName: profile?.full_name || '',
 phone: profile?.phone || '',
 email: user?.email || '',
 clientType: 'Business Owner',
 service: selectedService || 'Income Tax / GST Consultation',
 preferredTime: 'Immediate (Within 2 Hours)',
 notes: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 // Handle scroll tracking
 useEffect(() => {
 const handleScroll = () => {
 const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
 const currentScroll = window.scrollY;
 setScrollProgress((currentScroll / totalScroll) * 100);
 setShowScrollTop(currentScroll > 500);
 };

 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Update form service when selectedService or profile changes
 useEffect(() => {
 if (selectedService) {
 setFormData(prev => ({ ...prev, service: selectedService }));
 }
 if (profile) {
 setFormData(prev => ({ ...prev, fullName: profile.full_name || prev.fullName, phone: profile.phone || prev.phone, email: profile.email || prev.email }));
 }
 }, [selectedService, profile]);

 // Initialize dark mode from localStorage or system preference
 useEffect(() => {
   const savedTheme = localStorage.getItem('theme');
   if (savedTheme === 'dark') {
     setIsDarkMode(true);
   } else if (savedTheme === 'light') {
     setIsDarkMode(false);
   } else {
     // Default to false if nothing is set
     setIsDarkMode(false);
   }
 }, []);

 // Toggle dark mode class on document element and save preference
 useEffect(() => {
   if (isDarkMode) {
     document.documentElement.classList.add('dark');
     localStorage.setItem('theme', 'dark');
   } else {
     document.documentElement.classList.remove('dark');
     localStorage.setItem('theme', 'light');
   }
 }, [isDarkMode]);

 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const handleModalSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setErrorMsg('');



 // Secure input validation
 if (!formData.fullName || formData.fullName.trim().length < 2) {
 setErrorMsg('Please provide your full name.');
 return;
 }
 const phoneRegex = /^[0-9+\s-]{8,15}$/;
 if (!formData.phone || !phoneRegex.test(formData.phone)) {
 setErrorMsg('Please enter a valid phone number (10 digits).');
 return;
 }

 setIsSubmitting(true);

 const newEnquiry = {
 id: 'enq-' + Date.now(),
 user_id: user?.id || null,
 client_name: formData.fullName,
 client_phone: formData.phone,
 client_email: formData.email || user?.email || '',
 client_category: formData.clientType,
 service_category: formData.service,
 preferred_time: formData.preferredTime,
 message_notes: formData.notes,
 form_source: 'Header Booking Modal',
 status: 'New Inquiry' as const,
 created_at: new Date().toISOString()
 };

 // Save locally for instant CA Admin portal demo feed
 try {
 const existing = localStorage.getItem('finheist_local_enquiries');
 const parsed = existing ? JSON.parse(existing) : [];
 localStorage.setItem('finheist_local_enquiries', JSON.stringify([newEnquiry, ...parsed]));
 } catch (err) {}

 // Save directly to Supabase if configured
 if (isSupabaseConfigured()) {
 try {
 await supabase.from('enquiries').insert([{
 client_name: formData.fullName,
 client_phone: formData.phone,
 client_email: formData.email || user?.email || '',
 client_category: formData.clientType,
 service_category: formData.service,
 preferred_time: formData.preferredTime,
 message_notes: formData.notes,
 form_source: 'Header Booking Modal',
 status: 'New Inquiry'
 }]);
 } catch (err) {
 console.error('Supabase insert error:', err);
 }
 }

 setTimeout(() => {
 setIsSubmitting(false);
 setIsSubmitted(true);
 confetti({
 particleCount: 80,
 spread: 60,
 origin: { y: 0.6 }
 });
 // Reset form after 3.5 seconds and close modal
 setTimeout(() => {
 setIsSubmitted(false);
 setIsModalOpen(false);
 setFormData({
 fullName: profile?.full_name || '',
 phone: profile?.phone || '',
 email: user?.email || '',
 clientType: 'Business Owner',
 service: 'Income Tax / GST Consultation',
 preferredTime: 'Immediate (Within 2 Hours)',
 notes: ''
 });
 }, 3500);
 }, 1000);
 };

 const openWhatsAppDirect = () => {
 const message = encodeURIComponent(`Hi Fin-Heist Team, I would like to book a free consultation regarding ${formData.service || 'Tax, GST & Financial Compliance'}.`);
 window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
 };

 return (
 <>
 {/* 1. Scroll Progress Indicator (Top Bar) */}
 <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
 <div
 className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
 style={{ width:`${scrollProgress}%` }}
 />
 </div>

 {/* 2. Floating Bottom Right Widgets (WhatsApp & Scroll Top & Dark Mode) */}
 <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
 {/* Dark Mode Toggle */}
 <button
 onClick={() => setIsDarkMode(!isDarkMode)}
 className="w-12 h-12 rounded-full bg-slate-900/90 dark:bg-slate-800/90 text-white border border-slate-700/60 shadow-xl backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all group"
 title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
 >
 {isDarkMode ? (
 <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
 ) : (
 <Moon className="w-5 h-5 text-amber-400 group-hover:-rotate-12 transition-transform" />
 )}
 </button>

 {/* Scroll To Top Button */}
 {showScrollTop && (
 <button
 onClick={scrollToTop}
 className="w-12 h-12 rounded-full bg-amber-500/90 text-slate-950 font-bold border border-amber-300/40 shadow-xl backdrop-blur-md flex items-center justify-center hover:bg-amber-400 hover:scale-110 transition-all"
 title="Scroll to Top"
 >
 <ArrowUp className="w-5 h-5" />
 </button>
 )}

 {/* Floating WhatsApp CTA */}
 <button
 onClick={openWhatsAppDirect}
 className="w-14 h-14 rounded-full bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center justify-center hover:bg-emerald-400 hover:scale-110 transition-all relative group"
 title="Chat with CA Specialists on WhatsApp"
 >
 <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
 <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
 <span className="absolute right-16 top-2 bg-slate-900/95 text-emerald-400 border border-emerald-500/30 font-medium text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
 Chat instantly: +91 9027661642
 </span>
 </button>
 </div>

 {/* 3. Global Consultation Booking Modal */}
 {isModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/65 backdrop-blur-md animate-fadeIn">
 <div className="relative w-full max-w-xl max-h-[95vh] flex flex-col bg-gradient-to-br from-white via-slate-50 to-[#FCFBFA] border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_-15px_rgba(245,158,11,0.3)] overflow-hidden">
 
 {/* Modal Header */}
 <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 py-4 sm:px-7 sm:py-5.5 border-b border-amber-300 flex items-start sm:items-center justify-between shadow-xs shrink-0">
 <div className="flex items-center gap-3.5">
 <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-slate-950/15 border border-slate-950/25 items-center justify-center text-slate-950 font-extrabold shadow-2xs shrink-0">
 <Calendar className="w-6 h-6 stroke-[2.4]" />
 </div>
 <div>
 <h3 className="text-lg sm:text-2xl font-extrabold font-poppins tracking-tight" style={{ color: '#0f172a' }}>Book Free Consultation</h3>
 <p className="text-[10px] sm:text-sm font-semibold font-inter mt-0.5 leading-tight" style={{ color: '#1e293b' }}>Direct consultation with CA Finalist & Compliance Team</p>
 </div>
 </div>
 <button
 onClick={() => setIsModalOpen(false)}
 className="w-9 h-9 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors font-bold shrink-0"
 title="Close Modal"
 >
 <X className="w-5 h-5 stroke-[2.5]" />
 </button>
 </div>

 {/* Modal Content */}
 <div className="p-4 sm:p-7 overflow-y-auto">
 {isSubmitted ? (
 <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-fadeIn">
 <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-md">
 <CheckCircle className="w-10 h-10" />
 </div>
 <h4 className="text-2xl font-extrabold font-poppins text-slate-900 dark:text-slate-900">Consultation Request Received!</h4>
 <p className="text-sm text-slate-600 max-w-sm font-medium leading-relaxed">
 Thank you, <span className="text-emerald-700 font-bold">{formData.fullName}</span>. Our CA specialist will call or WhatsApp you at <span className="text-slate-900 dark:text-slate-900 font-bold">{formData.phone}</span> within 2 hours.
 </p>
 <div className="pt-4 flex flex-wrap gap-3.5 justify-center w-full">
 <button
 onClick={openWhatsAppDirect}
 className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-poppins font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
 >
 <MessageCircle className="w-4 h-4" /> Open WhatsApp Right Now
 </button>
 <button
 onClick={() => setIsModalOpen(false)}
 className="px-6 py-3.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
 >
 Close Window
 </button>
 </div>
 </div>
 ) : (
 <form onSubmit={handleModalSubmit} className="space-y-4 sm:space-y-4.5">
 {errorMsg && (
 <div className="p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2 shadow-2xs">
 <span>⚠️</span> {errorMsg}
 </div>
 )}

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Full Name *
 </label>
 <input
 type="text"
 required
 placeholder="e.g. Rajesh Sharma"
 value={formData.fullName}
 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
 className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 />
 </div>
 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Phone / WhatsApp *
 </label>
 <input
 type="tel"
 required
 placeholder="+91 98765 43210"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Client Category
 </label>
 <select
 value={formData.clientType}
 onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
 className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 >
 <option value="Business Owner">Business Owner / Company</option>
 <option value="Salaried Individual">Salaried Individual / IT Professional</option>
 <option value="Freelancer">Freelancer / Consultant</option>
 <option value="MSME">MSME Enterprise</option>
 <option value="Startup">Early-Stage Startup</option>
 <option value="Other">Other Requirement</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Service Required
 </label>
 <select
 value={formData.service}
 onChange={(e) => setFormData({ ...formData, service: e.target.value })}
 className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 >
 <option value="Income Tax Return & Advisory">Income Tax Return & Advisory</option>
 <option value="GST Registration & Filing">GST Registration & Filing</option>
 <option value="Accounting & Tally Support">Accounting & Tally Support</option>
 <option value="Project Reports & Bank Loans">Project Reports & Bank Loans</option>
 <option value="MSME & Udyam Registration">MSME & Udyam Registration</option>
 <option value="Private Limited / LLP Setup">Private Limited / LLP Setup</option>
 <option value="TDS Return & Compliance">TDS Return & Compliance</option>
 <option value="CA Certificate & Attestation">CA Certificate & Attestation</option>
 <option value="General Financial Consultation">General Financial Consultation</option>
 <option value="Advance Tax Advisory">Advance Tax Advisory</option>
 <option value="Business Registration">Business Registration</option>
 <option value="Other Services Required">Other Services Required</option>
 </select>
 </div>
 </div>

 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Preferred Call Time
 </label>
 <select
 value={formData.preferredTime}
 onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
 className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 >
 <option value="Immediate (Within 2 Hours)">Immediate (Within 2 Hours)</option>
 <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
 <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
 <option value="Evening (6:00 PM - 8:00 PM)">Evening (6:00 PM - 8:00 PM)</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-poppins mb-1.5">
 Brief Requirement Details (Optional)
 </label>
 <textarea
 rows={2}
 placeholder="E.g. Need ITR filing for salaried income plus intraday stock capital gains..."
 value={formData.notes}
 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
 className="w-full px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 dark:text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all shadow-2xs" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
 />
 </div>

 <div className="pt-2 flex flex-col sm:flex-row gap-3">
 <button
 type="submit"
 disabled={isSubmitting}
 className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-base shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 border border-amber-300"
 >
 {isSubmitting ? (
 <>
 <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
 <span>Processing Request...</span>
 </>
 ) : (
 <>
 <Send className="w-5 h-5 text-slate-950 stroke-[2.3]" />
 <span>Confirm Free Consultation</span>
 </>
 )}
 </button>
 <button
 type="button"
 onClick={openWhatsAppDirect}
 className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-poppins font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
 >
 <PhoneCall className="w-4 h-4" /> WhatsApp Us
 </button>
 </div>
 </form>
 )}
 </div>

 {/* Modal Footer Trust Banner */}
 <div className="px-4 py-3 sm:px-7 sm:py-3.5 bg-slate-100/90 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs font-bold text-slate-600 font-inter shrink-0">
 <span className="flex items-center gap-1.5 text-emerald-700">
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
 100% Confidential Data
 </span>
 <span>🔒 Encrypted Portal • No Spam Guaranteed</span>
 </div>
 </div>
 </div>
 )}
 </>
 );
}
