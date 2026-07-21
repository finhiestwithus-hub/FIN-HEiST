'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BENTO_GRID_ITEMS } from '../../data/mockData';
import {
 Users, Tag, Zap, CheckCircle2, Globe, Headphones,
 PackageCheck, TrendingUp, Sparkles, ArrowUpRight, ShieldCheck, Award
} from 'lucide-react';

export default function WhyFinHeist() {
 const iconMap: { [key: string]: any } = {
 Users, Tag, Zap, CheckCircle2, Globe, Headphones, PackageCheck, TrendingUp,
 };

 const [headerVisible, setHeaderVisible] = useState(false);
 const [cardVisible, setCardVisible] = useState<Record<number, boolean>>({});
 const [hoveredCard, setHoveredCard] = useState<number | null>(null);
 const headerRef = useRef<HTMLDivElement>(null);
 const gridRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const el = headerRef.current;
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); } else { setHeaderVisible(false); } },
 { threshold: 0.1 }
 );
 obs.observe(el);
 return () => obs.disconnect();
 }, []);

 useEffect(() => {
 const el = gridRef.current;
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 BENTO_GRID_ITEMS.forEach((_, i) => {
 setTimeout(() => {
 setCardVisible(prev => ({ ...prev, [i]: true }));
 }, i * 110);
 });
 } else {
 setCardVisible({});
 }
 },
 { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
 );
 obs.observe(el);
 return () => obs.disconnect();
 }, []);

 const cardAccents = [
 { border: 'hover:border-amber-500', glow: 'from-amber-500/20 via-yellow-500/10 to-transparent', iconBg: 'from-amber-500 via-yellow-500 to-amber-600', ring: 'ring-amber-500/30' },
 { border: 'hover:border-emerald-500', glow: 'from-emerald-500/20 via-teal-500/10 to-transparent', iconBg: 'from-emerald-500 via-teal-500 to-emerald-600', ring: 'ring-emerald-500/30' },
 { border: 'hover:border-yellow-500', glow: 'from-yellow-500/20 via-amber-500/10 to-transparent', iconBg: 'from-yellow-500 via-amber-500 to-yellow-600', ring: 'ring-yellow-500/30' },
 { border: 'hover:border-amber-600', glow: 'from-amber-600/20 via-orange-500/10 to-transparent', iconBg: 'from-amber-600 via-yellow-600 to-amber-700', ring: 'ring-amber-600/30' },
 { border: 'hover:border-emerald-600', glow: 'from-emerald-600/20 via-green-500/10 to-transparent', iconBg: 'from-emerald-600 via-teal-600 to-emerald-700', ring: 'ring-emerald-600/30' },
 { border: 'hover:border-amber-500', glow: 'from-amber-500/20 via-yellow-500/10 to-transparent', iconBg: 'from-amber-500 via-yellow-500 to-amber-600', ring: 'ring-amber-500/30' },
 { border: 'hover:border-yellow-600', glow: 'from-yellow-600/20 via-amber-500/10 to-transparent', iconBg: 'from-yellow-600 via-amber-600 to-yellow-700', ring: 'ring-yellow-600/30' },
 { border: 'hover:border-amber-600', glow: 'from-amber-600/20 via-yellow-500/10 to-transparent', iconBg: 'from-amber-600 via-yellow-600 to-amber-700', ring: 'ring-amber-600/30' },
 ];

 return (
 <section id="why-us" className="py-28 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80 scroll-mt-24">
 {/* Top Gold Accent Bar */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

 {/* Decorative ambient blobs */}
 <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[140px] pointer-events-none animate-blob" />
 <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-[140px] pointer-events-none animate-blob" />

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

 {/* Section Header */}
 <div
 ref={headerRef}
 className={`text-center max-w-3xl mx-auto space-y-4 mb-16 transition-all duration-700 ease-out ${
 headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
 }`}
 >
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
 The Smart CA Advantage for{' '}
 <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Your Business Compliance</span>
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto leading-relaxed">
 We combine institutional accounting rigor with modern fintech speed and transparency — experiencing zero errors, rapid deliveries, and upfront pricing.
 </p>
 </div>

 {/* Bento Grid with Ultra-Attractive Interactive 3D Glow Cards */}
 <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {BENTO_GRID_ITEMS.map((item, idx) => {
 const Icon = iconMap[item.iconName] || Users;
 const isWide = item.colSpan === 2;
 const accent = cardAccents[idx % cardAccents.length];
 const isVisible = !!cardVisible[idx];
 const isHovered = hoveredCard === idx;
 const floatDelay = idx % 6;

 const floatAnimations = ['', '', ''];
 const chosenFloat = floatAnimations[idx % floatAnimations.length];

 return (
 <div
 key={item.id}
 onMouseEnter={() => setHoveredCard(idx)}
 onMouseLeave={() => setHoveredCard(null)}
 className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden
 bg-gradient-to-br from-white via-slate-50/90 to-white
 border-2 border-slate-200/90 ${accent.border}
 shadow-[0_10px_30px_rgba(0,0,0,0.04)]
 hover:shadow-[0_25px_70px_-15px_rgba(245,158,11,0.25)]
 transition-all duration-700 ease-out transform
 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}
 hover:-translate-y-3 hover:scale-[1.025]
 ${chosenFloat} float-delay-${floatDelay}
 ${isWide ? 'md:col-span-2' : 'md:col-span-1'}
`}
 >
 {/* Background ambient gradient glow on card */}
 <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

 <div className="relative z-10">
 {/* Top Row: 3D Glowing Icon & Premium Badge */}
 <div className="flex items-center justify-between mb-6">
 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.iconBg} text-slate-950 shadow-lg shadow-amber-500/30 flex items-center justify-center ring-4 ${accent.ring} group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
 <Icon className="w-7 h-7 stroke-[2.2]" />
 </div>

 {item.badge && (
 <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-2xs">
 <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
 <span className="text-xs font-extrabold text-amber-800 tracking-wide">
 {item.badge}
 </span>
 </div>
 )}
 </div>

 {/* Title */}
 <h3 className="text-xl font-extrabold font-poppins text-slate-900 mb-3 flex items-center justify-between group-hover:text-amber-600 transition-colors">
 <span>{item.title}</span>
 {isWide && (
 <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
 <ArrowUpRight className="w-4 h-4 text-amber-600 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
 </span>
 )}
 </h3>

 {/* Description */}
 <p className="text-sm sm:text-base text-slate-600 font-inter leading-relaxed mb-6">
 {item.description}
 </p>

 {/* Dynamic Interactive Element for Wide Cards vs Regular Cards */}
 {isWide ? (
 <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 mb-2">
 <div className="flex items-center justify-between text-xs font-bold text-amber-900">
 <span className="flex items-center gap-1.5">
 <Award className="w-4 h-4 text-amber-600" />
 <span>CA Mastery & Quality Verification Check</span>
 </span>
 <span className="text-emerald-700 font-mono font-extrabold">100% Verified</span>
 </div>
 <div className="w-full h-2 rounded-full bg-amber-200/60 overflow-hidden">
 <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full w-full animate-pulse" />
 </div>
 </div>
 ) : (
 <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/60 mb-2">
 <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
 <span>Standard RBI & ICAI Compliant Workflow</span>
 </div>
 )}
 </div>

 {/* Bottom line with interactive hover slide */}
 <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500 font-mono relative z-10 group-hover:text-slate-900 transition-colors">
 <span className="flex items-center gap-1.5">
 <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:scale-125 transition-transform" />
 <span>Fin-Heist Guaranteed Advantage</span>
 </span>
 <span className="text-amber-600 opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300 font-sans font-extrabold flex items-center gap-1">
 Explore <ArrowUpRight className="w-3.5 h-3.5" />
 </span>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
