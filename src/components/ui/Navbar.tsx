'use client';

import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Menu, X, PhoneCall, Mail, MapPin, UserCheck, User, LogOut, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
 onOpenModal: (service?: string) => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
 const { user, profile, setIsAuthModalOpen, setAuthModalMode, setIsAdminModalOpen, signOut } = useAuth();
 const [isScrolled, setIsScrolled] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [activeSection, setActiveSection] = useState('home');
 const [liveLocation, setLiveLocation] = useState(COMPANY_INFO.location);

 useEffect(() => {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
 async (position) => {
 try {
 const { latitude, longitude } = position.coords;
 const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
 const data = await res.json();
 if (data && data.address) {
 const city = data.address.city || data.address.town || data.address.village || data.address.county;
 if (city) {
 setLiveLocation(`${city} City & Pan-India`);
 }
 }
 } catch (err) {
 console.error("Location fetch failed", err);
 }
 },
 (error) => console.error("Geolocation failed", error)
 );
 }
 }, []);

 useEffect(() => {
 const handleScroll = () => {
 setIsScrolled(window.scrollY > 30);
 const sections = ['home', 'services', 'why-us', 'calculators', 'about', 'leadership', 'contact'];
 for (const sectionId of sections) {
 const el = document.getElementById(sectionId);
 if (el) {
 const rect = el.getBoundingClientRect();
 if (rect.top <= 180 && rect.bottom >= 180) {
 setActiveSection(sectionId);
 break;
 }
 }
 }
 };
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    const subject = encodeURIComponent("Consultation Inquiry");
    const body = encodeURIComponent("Hi FIN-HEIST Team,\n\nI would like to schedule a consultation regarding my financial and compliance requirements.\n\nThanks,");
    
    // Check if user is on a mobile device
    const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
    }
  };

 const navLinks = [
 { label: 'Home', href: '#home', id: 'home' },
 { label: 'Services', href: '#services', id: 'services' },
 { label: 'Why Us', href: '#why-us', id: 'why-us' },
 { label: 'Calculators', href: '#calculators', id: 'calculators' },
 { label: 'About Us', href: '#about', id: 'about' },
 { label: 'Leadership', href: '#leadership', id: 'leadership' },
 { label: 'Contact', href: '#contact', id: 'contact' },
 ];

 return (
 <header className="fixed top-0 left-0 right-0 z-50 font-inter">
 {/* Top Contact Bar */}
 <div className="hidden sm:flex bg-[#07080c] text-slate-300 px-4 sm:px-8 lg:px-12 xl:px-16 py-2.5 text-xs border-b border-amber-500/30 items-center justify-between shadow-inner">
 <div className="flex items-center flex-wrap gap-4 sm:gap-6">
 <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium">
 <PhoneCall className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
 <span>{COMPANY_INFO.phone}</span>
 </a>
          <a href="#" onClick={(e) => handleEmailClick(e, COMPANY_INFO.email)} className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{COMPANY_INFO.email}</span>
          </a>
 </div>
 <div className="flex items-center gap-4">
 <div className="hidden lg:flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-amber-400" />
 <span>{liveLocation}</span>
 </div>
 <button
 onClick={() => onOpenModal()}
 className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
 >
 <UserCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-amber-400" />
 <span>Book Free Consultation</span>
 </button>
 </div>
 </div>

 {/* Main Navigation */}
 <nav className={`w-full transition-all duration-300 ${
 isScrolled
 ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/80 py-3'
 : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4'
 }`}>
 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
 {/* Logo */}
 <a 
 href="#home" 
 className="flex items-center gap-3.5 group select-none"
 onDoubleClick={(e) => {
 e.preventDefault();
 setAuthModalMode('login');
 setIsAuthModalOpen(true);
 }}
 >
 <img 
 src="/logo.jpg" 
 alt="FIN-HEIST Logo" 
 className="w-13 h-13 rounded-xl object-contain border border-amber-500/40 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all duration-300 bg-[#07080c] p-0.5 shrink-0" 
 />
 <div>
 <div className="flex items-center gap-2">
 <span className="font-poppins font-extrabold text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
 FIN-HEIST
 </span>
 <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 shadow-2xs">
 Beyond Tax
 </span>
 </div>
 <p className="text-[11px] font-semibold text-slate-600 font-inter hidden sm:block tracking-wide">
 Taxation • Compliance • Growth
 </p>
 </div>
 </a>

 {/* Desktop Navigation */}
 <div className="hidden xl:flex items-center gap-7">
 {navLinks.map((link) => {
 const isActive = activeSection === link.id;
 return (
 <a
 key={link.id}
 href={link.href}
 className={`text-sm font-semibold tracking-wide transition-all duration-200 relative py-1 ${
 isActive
 ? 'text-amber-600 font-extrabold'
 : 'text-slate-700 hover:text-amber-600'
 }`}
 >
 {link.label}
 {isActive && (
 <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-fadeIn" />
 )}
 </a>
 );
 })}
 </div>

 {/* CTA & Auth & Mobile Toggle */}
 <div className="flex items-center gap-2.5 sm:gap-3">
 {profile?.role === 'admin' && (
 <button
 onClick={() => setIsAdminModalOpen(true)}
 className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-950 text-amber-400 hover:bg-slate-900 border border-amber-500/50 font-poppins font-extrabold text-xs shadow-md animate-pulse"
 title="Open CA Admin Enquiries Feed"
 >
 <span>👑 CA Admin Feed</span>
 </button>
 )}

 {user ? (
 <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
 <User className="w-3.5 h-3.5 text-amber-600" />
 <span className="max-w-[100px] truncate">{profile?.full_name?.split(' ')[0] || 'Client'}</span>
 </div>
 <button
 onClick={signOut}
 className="p-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
 title="Sign Out"
 >
 <LogOut className="w-4 h-4" />
 </button>
 </div>
 ) : null}

 <button
 onClick={() => onOpenModal()}
 className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5 group border border-amber-300/40"
 >
 <span>Book Consultation</span>
 <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
 </button>

 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="xl:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 transition-colors"
 aria-label="Toggle menu"
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </div>
 </nav>

 {/* Mobile Menu */}
 {mobileMenuOpen && (
 <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-4 pb-6">
 <div className="flex flex-col gap-2">
 {navLinks.map((link) => (
 <a
 key={link.id}
 href={link.href}
 onClick={() => setMobileMenuOpen(false)}
 className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
 activeSection === link.id
 ? 'bg-amber-50 text-amber-700 border border-amber-200 font-bold'
 : 'text-slate-700 hover:bg-slate-50'
 }`}
 >
 {link.label}
 </a>
 ))}
 <div className="pt-3 border-t border-slate-200 mt-1 flex flex-col gap-2">
 {profile?.role === 'admin' && (
 <button
 onClick={() => { setMobileMenuOpen(false); setIsAdminModalOpen(true); }}
 className="w-full py-3 rounded-xl bg-slate-950 text-amber-400 font-poppins font-extrabold text-sm flex items-center justify-center gap-2 border border-amber-500/50 shadow-sm"
 >
 <span>👑 Open CA Admin Enquiries Feed</span>
 </button>
 )}

 {user ? (
 <div className="flex flex-col gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
 <div className="flex items-center gap-2 mb-2">
 <User className="w-4 h-4 text-amber-600" />
 <span className="font-bold text-slate-800 text-sm truncate">{profile?.full_name || 'Logged In'}</span>
 </div>
 <button
 onClick={() => { signOut(); setMobileMenuOpen(false); }}
 className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors"
 >
 <LogOut className="w-4 h-4" />
 Sign Out
 </button>
 </div>
 ) : null}

 <button
 onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
 >
 <span>Book Free Consultation</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 <a
 href={`tel:${COMPANY_INFO.phone}`}
 className="w-full py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-200"
 >
 <PhoneCall className="w-4 h-4 text-amber-600" />
 <span>Call {COMPANY_INFO.phone}</span>
 </a>
 </div>
 </div>
 </div>
 )}
 </header>
 );
}
