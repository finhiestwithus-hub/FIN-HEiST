'use client';

import React, { useRef, useEffect, useState } from 'react';
import { PROCESS_STEPS } from '../../data/mockData';
import { Send, MessageSquare, FolderUp, Cpu, CheckSquare, Clock, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
 onOpenModal: (service?: string) => void;
}

export default function ProcessSection({ onOpenModal }: ProcessSectionProps) {
 const iconMap: { [key: string]: any } = {
 Send, MessageSquare, FolderUp, Cpu, CheckSquare,
 };

 const [headerVisible, setHeaderVisible] = useState(false);
 const [stepVisible, setStepVisible] = useState<boolean[]>([]);
 const headerRef = useRef<HTMLDivElement>(null);
 const stepsRef = useRef<HTMLDivElement>(null);

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
 const el = stepsRef.current;
 if (!el) return;
 const obs = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 PROCESS_STEPS.forEach((_, i) => {
 setTimeout(() => {
 setStepVisible(prev => { const n = [...prev]; n[i] = true; return n; });
 }, i * 120);
 });
 } else {
 setStepVisible([]);
 }
 },
 { threshold: 0.05 }
 );
 obs.observe(el);
 return () => obs.disconnect();
 }, []);

 const stepColors = [
 { bg: 'bg-amber-600', light: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-800', num: 'bg-amber-600' },
 { bg: 'bg-yellow-600', light: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-800', num: 'bg-yellow-600' },
 { bg: 'bg-amber-500', light: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-700', num: 'bg-amber-500' },
 { bg: 'bg-emerald-600', light: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-700', num: 'bg-emerald-600' },
 { bg: 'bg-amber-600', light: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-800', num: 'bg-amber-600' },
 ];

 return (
 <section className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
 {/* Top header strip */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

 {/* Section Header */}
 <div
 ref={headerRef}
 className={`text-center max-w-3xl mx-auto space-y-4 mb-16 transition-all duration-700 ease-out ${
 headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
 }`}
 >
 <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
 Seamless Execution Roadmap
 </p>
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900">
 How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">Work</span>
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-inter">
 A frictionless 5-step workflow designed to save your time, eliminate paperwork confusion, and deliver rapid statutory compliance across India.
 </p>
 </div>

 {/* Animated SVG Roadmap */}
 <div ref={stepsRef} className="relative mt-24 mb-16 w-full max-w-7xl mx-auto">
 <style dangerouslySetInnerHTML={{ __html:`
 @keyframes processBeam {
 from { stroke-dashoffset: 2400; }
 to { stroke-dashoffset: 0; }
 }
 .animate-process-beam {
 animation: processBeam 6s linear infinite;
 }
`}} />

 {/* Desktop/Tablet Horizontal Layout (lg+) */}
 <div className="hidden lg:block relative w-full h-[400px]">
 <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
 {/* Dark Track */}
 <path 
 d="M 50 150 C 150 150 150 50 250 50 C 350 50 350 250 500 250 C 650 250 650 50 750 50 C 850 50 850 150 950 150" 
 stroke="#1e293b" strokeWidth="40" strokeLinecap="round" vectorEffect="non-scaling-stroke" 
 />
 {/* Glowing Beam */}
 <path 
 d="M 50 150 C 150 150 150 50 250 50 C 350 50 350 250 500 250 C 650 250 650 50 750 50 C 850 50 850 150 950 150" 
 stroke="url(#desktop-gradient)" strokeWidth="20" strokeLinecap="round" vectorEffect="non-scaling-stroke" 
 className="animate-process-beam" style={{ strokeDasharray: '400, 2000' }}
 />
 <defs>
 <linearGradient id="desktop-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
 <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
 <stop offset="50%" stopColor="#f59e0b" />
 <stop offset="100%" stopColor="#fbbf24" />
 </linearGradient>
 </defs>
 </svg>

 {PROCESS_STEPS.map((step, idx) => {
 const desktopPositions = [
 { left: '5%', top: '50%', labelPos: 'bottom' },
 { left: '25%', top: '16.66%', labelPos: 'bottom' },
 { left: '50%', top: '83.33%', labelPos: 'top' },
 { left: '75%', top: '16.66%', labelPos: 'bottom' },
 { left: '95%', top: '50%', labelPos: 'top' },
 ];
 const pos = desktopPositions[idx];
 const Icon = iconMap[step.iconName] || Send;
 
 return (
 <div key={step.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: pos.left, top: pos.top }}>
 <div className="relative group cursor-default">
 {/* Glowing Node */}
 <div className="w-14 h-14 rounded-full bg-slate-900 border-4 border-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-20">
 <Icon className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
 </div>
 
 {/* Tooltip Label */}
 <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-64 opacity-90 group-hover:opacity-100 transition-opacity ${pos.labelPos === 'bottom' ? 'top-full pt-8' : 'bottom-full pb-8'}`}>
 {/* Dotted connector line */}
 <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-8 border-l-2 border-dashed border-amber-500/50 ${pos.labelPos === 'bottom' ? 'top-0' : 'bottom-0'}`} />
 
 <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col items-center text-center transform group-hover:-translate-y-1 transition-transform">
 <span className="text-xs font-black text-amber-600 uppercase tracking-wider mb-2">{step.subtitle}</span>
 <h3 className="text-base font-extrabold text-slate-900 mb-2">{step.title}</h3>
 <p className="text-xs text-slate-600 font-inter leading-relaxed">{step.description}</p>
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Mobile Vertical Layout (<lg) */}
 <div className="block lg:hidden relative w-full max-w-md mx-auto px-2 sm:px-4 mt-8 mb-12">
   {/* Vertical Line */}
   <div className="absolute left-[2.25rem] sm:left-[3.25rem] top-8 bottom-8 w-1 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 rounded-full opacity-50" />

   <div className="space-y-6 sm:space-y-8 relative">
     {PROCESS_STEPS.map((step, idx) => {
       const Icon = iconMap[step.iconName] || Send;
       const isVisible = !!stepVisible[idx]; 

       return (
         <div 
           key={step.id} 
           className={`relative flex items-center gap-4 sm:gap-6 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
         >
           {/* Timeline Node */}
           <div className="relative shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10 ml-2">
             <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" strokeWidth={2.5} />
           </div>

           {/* Card */}
           <div className="flex-1 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 hover:border-amber-400 transition-colors">
              <span className="text-[10px] sm:text-xs font-black text-amber-600 uppercase tracking-wider mb-1 block">{step.subtitle}</span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5 leading-tight">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-snug">{step.description}</p>
           </div>
         </div>
       );
     })}
   </div>
 </div>
 </div>

 {/* CTA */}
 <div className="mt-14 text-center">
 <button
 onClick={() => onOpenModal('Get Started — Step 1')}
 className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
 >
 <span>Start Your Process Right Now</span>
 <ArrowRight className="w-5 h-5 text-slate-950" />
 </button>
 <p className="mt-3 text-sm text-slate-500 font-inter">
 Free initial consultation — no obligations.
 </p>
 </div>
 </div>
 </section>
 );
}
