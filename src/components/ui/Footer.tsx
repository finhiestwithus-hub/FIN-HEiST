'use client';

import React from 'react';
import { Shield, Phone, Mail, ArrowUpRight, Heart, MapPin } from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../../data/mockData';

interface FooterProps {
 onOpenModal: (service?: string) => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
 const quickLinks = [
 { label: 'Home', href: '#home' },
 { label: 'Services Portfolio', href: '#services' },
 { label: 'Why Fin-Heist', href: '#why-us' },
 { label: 'Bank Loan Assistance', href: '#services' },
 { label: 'Leadership Profile', href: '#leadership' },
 { label: 'Frequently Asked Questions', href: '#contact' },
 ];

 return (
 <footer className="bg-[#07080c] text-white pt-16 pb-10 border-t border-amber-500/30 relative overflow-hidden">
 {/* Subtle top gradient */}
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600" />

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
 
 {/* Brand Info */}
 <div className="lg:col-span-4 space-y-5">
 <div className="flex items-center gap-3.5">
 <img 
 src="/logo.jpg" 
 alt="FIN-HEIST Logo" 
 className="w-13 h-13 rounded-xl object-contain border border-amber-500/40 shadow-lg shadow-amber-500/25 bg-[#07080c] p-0.5 shrink-0" 
 />
 <div>
 <span className="text-2xl font-bold font-poppins tracking-tight bg-gradient-to-r from-slate-100 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
 FIN<span className="text-amber-400">-</span>HEIST
 </span>
 <span className="block text-[10px] text-amber-300 font-semibold uppercase tracking-widest mt-0.5">
 Taxation • Compliance • Growth
 </span>
 <span className="block text-[9px] text-amber-300 font-semibold uppercase tracking-widest mt-0.5 opacity-90">
 GSTIN: 05HFLPK7898D1ZT
 </span>
 </div>
 </div>

 <p className="text-sm text-slate-400 font-inter leading-relaxed max-w-sm">
 Professional assistance for Income Tax, GST, Accounting, Business Compliance, Financial Documentation, and Bank Loan Project Reports.
 </p>

 <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-semibold">
 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
 <span>Serving Clients Across India — Online Consultation Available</span>
 </div>

 <div className="flex items-center gap-3">
 <a
 href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
 className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-400 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-colors"
 title="Call Fin-Heist"
 >
 <Phone className="w-4 h-4" />
 </a>
 <a
 href={`mailto:${COMPANY_INFO.email}`}
 className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center transition-colors"
 title="Email Fin-Heist"
 >
 <Mail className="w-4 h-4" />
 </a>
 <a
 href={COMPANY_INFO.instagramUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center transition-colors"
 title="Instagram @finhiestwithus"
 >
 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162Zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4Zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44Z"/>
 </svg>
 </a>
 <MapPin className="w-4 h-4 text-slate-500" />
 </div>
 </div>

 {/* Quick Links (2 Columns) */}
 {/* Quick Links */}
 <div className="lg:col-span-2 space-y-4">
 <h4 className="text-sm font-bold font-poppins uppercase tracking-wider text-white">Quick Links</h4>
 <ul className="space-y-2 text-sm text-slate-400 font-inter">
 {quickLinks.map((link, idx) => (
 <li key={idx}>
 <a href={link.href} className="hover:text-amber-400 transition-colors">
 {link.label}
 </a>
 </li>
 ))}
 </ul>
 </div>

 {/* Core Services */}
 <div className="lg:col-span-3 space-y-4">
 <h4 className="text-sm font-bold font-poppins uppercase tracking-wider text-white">Core Services</h4>
 <ul className="space-y-2 text-sm text-slate-400 font-inter">
 {CORE_SERVICES.slice(0, 6).map((service) => (
 <li key={service.id}>
 <button
 onClick={() => onOpenModal(service.title)}
 className="hover:text-emerald-400 transition-colors text-left flex items-center justify-between w-full group"
 >
 <span>{service.title}</span>
 <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
 </button>
 </li>
 ))}
 </ul>
 </div>

 {/* Contact Details */}
 <div className="lg:col-span-3 space-y-4">
 <h4 className="text-sm font-bold font-poppins uppercase tracking-wider text-white">Contact Details</h4>
 
 <div className="space-y-3 text-sm text-slate-400 font-inter">
 <div className="flex items-start gap-3">
 <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
 <div>
 <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>Direct Phone</span>
 <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="font-semibold hover:text-amber-400 font-mono" style={{ color: '#ffffff' }}>
 {COMPANY_INFO.phone}
 </a>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
 <div>
 <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>Official Email</span>
 <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold hover:text-emerald-400" style={{ color: '#ffffff' }}>
 {COMPANY_INFO.email}
 </a>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <svg className="w-4 h-4 fill-purple-400 shrink-0 mt-0.5" viewBox="0 0 24 24">
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162Zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4Zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44Z"/>
 </svg>
 <div>
 <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>Instagram</span>
 <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-purple-400" style={{ color: '#ffffff' }}>
 {COMPANY_INFO.instagram}
 </a>
 </div>
 </div>
 </div>
 </div>

 </div>

 {/* Bottom Bar */}
 <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-inter gap-4 text-center sm:text-left">
 <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
 <span>© {new Date().getFullYear()} Fin-Heist. All Rights Reserved.</span>
 <span className="text-slate-700 hidden sm:inline">•</span>
 <span className="font-medium text-slate-400">GSTIN: 05HFLPK7898D1ZT</span>
 <span className="text-slate-700 hidden sm:inline">•</span>
 <span>Led by CA Finalists Partnership</span>
 </div>

 <div className="flex items-center gap-5">
 <button onClick={() => onOpenModal('Privacy & Legal Disclaimer')} className="hover:text-slate-300 transition-colors">
 Privacy & Disclaimer
 </button>
 <button onClick={() => onOpenModal('Terms of Engagement')} className="hover:text-slate-300 transition-colors">
 Terms of Engagement
 </button>
 </div>
 </div>

 </div>
 </footer>
 );
}
