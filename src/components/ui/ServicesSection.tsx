'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CORE_SERVICES } from '../../data/mockData';
import {
 FileText, Receipt, Calculator, Briefcase, BarChart3,
 ShieldCheck, Building2, Award, FileSpreadsheet, TrendingUp,
 ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Sparkles,
 ChevronLeft, ChevronRight, Pause, Play
} from 'lucide-react';

interface ServicesSectionProps {
 onOpenModal: (service?: string) => void;
}

export default function ServicesSection({ onOpenModal }: ServicesSectionProps) {
 const [expandedId, setExpandedId] = useState<string | null>(null);
 const [activeFilter, setActiveFilter] = useState<string>('all');
 const [headerVisible, setHeaderVisible] = useState(false);
 const [isPaused, setIsPaused] = useState(false);
 const headerRef = useRef<HTMLDivElement>(null);
 const scrollContainerRef = useRef<HTMLDivElement>(null);

 // Header scroll reveal
 useEffect(() => {
 const el = headerRef.current;
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); } else { setHeaderVisible(false); } },
 { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
 );
 obs.observe(el);
 return () => obs.disconnect();
 }, []);

 const iconMap: { [key: string]: any } = {
 FileText, Receipt, Calculator, Briefcase, BarChart3,
 ShieldCheck, Building2, Award, FileSpreadsheet, TrendingUp,
 };

 const categories = [
 { id: 'all', label: 'All Services' },
 { id: 'core', label: 'Taxation & Accounting' },
 { id: 'specialized', label: 'Loan & Project Reports' },
 { id: 'compliance', label: 'Compliance & Registrations' },
 { id: 'advisory', label: 'Certificates & Advisory' },
 ];

 const filteredServices = activeFilter === 'all'
 ? CORE_SERVICES
 : CORE_SERVICES.filter(s => s.category === activeFilter);

 // Duplicate services to create a seamless infinite horizontal scroll
 const scrollingServices = [...filteredServices, ...filteredServices, ...filteredServices];

 // Auto-scroll effect
 useEffect(() => {
 let animationFrameId: number;
 const container = scrollContainerRef.current;
 if (!container) return;

 const autoScroll = () => {
 if (!isPaused && expandedId === null && container) {
 // If we scrolled past the first loop of services, reset to middle loop seamlessly
 const singleSetWidth = container.scrollWidth / 3;
 if (container.scrollLeft >= singleSetWidth * 2 - 5) {
 container.scrollLeft -= singleSetWidth;
 } else {
 container.scrollLeft += 1.2; // Smooth auto scroll speed
 }
 }
 animationFrameId = requestAnimationFrame(autoScroll);
 };

 animationFrameId = requestAnimationFrame(autoScroll);
 return () => cancelAnimationFrame(animationFrameId);
 }, [isPaused, expandedId, activeFilter]);

 const handleManualScroll = (direction: 'left' | 'right') => {
 const container = scrollContainerRef.current;
 if (!container) return;
 const scrollAmount = direction === 'left' ? -460 : 460;
 container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
 };

 return (
 <section id="services" className="pt-24 pb-12 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80 scroll-mt-24">
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 z-10 animate-gradient-shift" />

 {/* Full screen dynamic container max-w-[1760px] */}
 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

 {/* Section Header & Filters */}
 <div
 ref={headerRef}
 className={`text-center max-w-4xl mx-auto space-y-4 mb-4 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
 }`}
 >
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
 Our Core {' '}
 <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Services</span>
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed max-w-2xl mx-auto">
 Everything your business needs under one trusted partner. Watch our services slide automatically or pause to explore specific practice areas.
 </p>

 {/* Category Filter */}
 <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2 w-full px-2">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => {
 setActiveFilter(cat.id);
 setExpandedId(null);
 if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
 }}
 className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === cat.id
 ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 font-bold transform -translate-y-0.5 border border-amber-300/40'
 : 'glass-card text-slate-700 hover:border-amber-400 hover:text-amber-600'
 }`}
 >
 {cat.label}
 </button>
 ))}
 </div>
 </div>

 {/* Dynamic Horizontal Auto-scrolling Gallery */}
 <div
 ref={scrollContainerRef}
 onMouseEnter={() => setIsPaused(true)}
 onMouseLeave={() => setIsPaused(false)}
 onTouchStart={() => setIsPaused(true)}
 onTouchEnd={() => setIsPaused(false)}
 className="flex gap-6 overflow-x-auto no-scrollbar py-8 px-4 sm:px-8 lg:px-12 xl:px-16 cursor-grab active:cursor-grabbing select-none w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
 style={{ scrollBehavior: isPaused ? 'smooth' : 'auto' }}
 >
 {scrollingServices.map((service, idx) => {
 const Icon = iconMap[service.iconName] || FileText;
 const isExpanded = expandedId === service.id;
 const uniqueKey =`${service.id}-${idx}`;

 return (
 <div
 key={uniqueKey}
 className={`group relative glass-card glass-card-hover rounded-3xl w-[360px] sm:w-[420px] lg:w-[450px] shrink-0
 shadow-md hover:shadow-2xl hover:shadow-amber-500/25 hover:border-amber-400 border-2 border-slate-200/80
 overflow-hidden flex flex-col transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.025]
`}
 >
 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

 {/* Photo Header */}
 {service.imageUrl && (
 <div className="relative h-48 w-full overflow-hidden shrink-0">
 <img
 src={service.imageUrl}
 alt={service.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />

 {/* Popular badge */}
 {service.popular && (
 <div className="absolute top-3 right-3">
 <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-lg border border-amber-300/40">
 Popular
 </span>
 </div>
 )}

 {/* Category pill */}
 <div className="absolute top-3 left-3">
 <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30 backdrop-blur-md">
 {service.category === 'core' ? 'Taxation' : service.category === 'specialized' ? 'Bank Loans' : 'Compliance'}
 </span>
 </div>

 {/* Icon bottom-left */}
 <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white border-2 border-amber-500/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
 <Icon className="w-6 h-6 text-amber-600" />
 </div>
 </div>
 )}

 {/* Card Body */}
 <div className="p-6 flex-1 flex flex-col justify-between bg-white/60 backdrop-blur-sm">
 <div>
 <h3 className="text-xl font-bold font-poppins text-slate-900 mb-2.5 group-hover:text-amber-600 transition-colors">
 {service.title}
 </h3>
 <p className="text-sm text-slate-600 font-inter leading-relaxed mb-5 line-clamp-3">
 {service.description}
 </p>
 </div>

 <div>
 {/* Expandable sub-services */}
 <div className="border-t border-slate-200 pt-3">
 <button
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 setExpandedId(isExpanded ? null : service.id);
 }}
 className="w-full flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-800 py-1.5 transition-colors"
 >
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
 <span>Key Practice Areas ({service.subServices.length})</span>
 </span>
 {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-700" /> : <ChevronDown className="w-4 h-4 text-amber-700" />}
 </button>

 {isExpanded && (
 <ul className="mt-3 space-y-2 text-xs text-slate-700 animate-fadeIn max-h-56 overflow-y-auto pr-1 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
 {service.subServices.map((sub, sIdx) => (
 <li key={sIdx} className="flex items-start gap-2">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
 <span className="font-medium">{sub}</span>
 </li>
 ))}
 </ul>
 )}
 </div>

 {/* CTA Button */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 onOpenModal(service.title);
 }}
 className="mt-4 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 hover:from-amber-500 hover:to-yellow-500 border-2 border-amber-500/40 hover:border-amber-500 text-amber-800 hover:text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group/btn"
 >
 <span>Explore Service & Pricing</span>
 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
 </button>
 </div>
 </div>
 </div>
 );
 })}
 </div>



 </div>
 </section>
 );
}
