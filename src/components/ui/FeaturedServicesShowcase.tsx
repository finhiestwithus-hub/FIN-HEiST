'use client';

import React, { useState } from 'react';
import { FEATURED_SERVICES } from '../../data/mockData';
import { 
 FileText, Receipt, Calculator, BarChart3, Landmark, 
 CheckCircle2, ArrowRight, Sparkles, TrendingUp, ShieldAlert, Zap, Layers
} from 'lucide-react';

interface FeaturedServicesShowcaseProps {
 onOpenModal: (service?: string) => void;
}

export default function FeaturedServicesShowcase({ onOpenModal }: FeaturedServicesShowcaseProps) {
 const [activeTab, setActiveTab] = useState(FEATURED_SERVICES[0].id);

 const iconMap: { [key: string]: any } = {
 FileText,
 Receipt,
 Calculator,
 BarChart3,
 Landmark,
 };

 const currentService = FEATURED_SERVICES.find(s => s.id === activeTab) || FEATURED_SERVICES[0];

 return (
 <section id="featured-services" className="py-28 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80">
 {/* Top Gold Accent Strip */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

 {/* Decorative ambient blobs */}
 <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-blob" />
 <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-[150px] pointer-events-none animate-blob" />

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
 
 {/* Section Title */}
 <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-bold text-amber-800 shadow-sm">
 <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
 <span>Deep-Dive Practice Areas</span>
 </div>
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
 Featured Services Showcase
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
 Explore our specialized capabilities designed to protect your profits, eliminate tax leakage, and expedite bank financing across India.
 </p>
 </div>

 {/* Horizontal Navigation Pills */}
 <div className="flex overflow-x-auto pb-4 gap-3.5 justify-start lg:justify-center no-scrollbar mb-12">
 {FEATURED_SERVICES.map((item) => {
 const Icon = iconMap[item.iconName] || FileText;
 const isActive = activeTab === item.id;
 return (
 <button
 key={item.id}
 onClick={() => setActiveTab(item.id)}
 className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-poppins text-sm transition-all duration-300 whitespace-nowrap shrink-0 ${
 isActive
 ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/35 border border-amber-300 font-extrabold scale-[1.04]'
 : 'glass-card hover:bg-white text-slate-700 hover:text-amber-800 font-semibold border border-slate-200/80 shadow-sm hover:border-amber-400/60'
 }`}
 >
 <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-amber-600'}`} />
 <span>{item.title}</span>
 </button>
 );
 })}
 </div>

 {/* Large Horizontal Premium Card */}
 <div className="group relative glass-card rounded-3xl p-7 sm:p-12 border-2 border-slate-200/90 hover:border-amber-400 shadow-[0_20px_70px_-15px_rgba(245,158,11,0.18)] overflow-hidden transition-all duration-700 transform hover:-translate-y-2">
 
 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-20">
 
 {/* Left Side: Content & Benefits (7 Columns) */}
 <div className="lg:col-span-7 space-y-6">
 
 <div className="flex flex-wrap items-center gap-3">
 <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-800 font-mono text-xs font-extrabold border border-amber-500/30">
 {currentService.title} Specialist Division
 </span>
 <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
 <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> CA Finalist Verified
 </span>
 </div>

 <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-poppins text-slate-900 leading-tight">
 {currentService.subtitle}
 </h3>

 <p className="text-slate-600 font-inter text-base sm:text-lg leading-relaxed">
 {currentService.description}
 </p>

 {/* Benefits Checklist */}
 <div className="space-y-3 pt-2">
 <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
 <Layers className="w-3.5 h-3.5 text-amber-600" /> Key Strategic Advantages:
 </h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
 {currentService.benefits.map((benefit, idx) => (
 <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs hover:border-amber-400/60 transition-colors">
 <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
 <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">{benefit}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Metrics Bar */}
 <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200/80">
 {currentService.metrics.map((m, idx) => (
 <div key={idx} className="text-left bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/25">
 <div className="text-xl sm:text-2xl font-extrabold font-poppins text-amber-700 tracking-tight">{m.value}</div>
 <div className="text-xs text-slate-600 font-inter font-semibold mt-0.5">{m.label}</div>
 </div>
 ))}
 </div>

 {/* CTA Button */}
 <div className="pt-2 flex flex-wrap gap-4 items-center">
 <button
 onClick={() => onOpenModal(currentService.title)}
 className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-base shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 flex items-center gap-2.5 group transition-all duration-300 transform hover:-translate-y-1 border border-amber-300/40"
 >
 <span>{currentService.ctaText}</span>
 <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
 </button>
 </div>

 </div>

 {/* Right Side: Interactive Illustration & Dashboard Visual (5 Columns) */}
 <div className="lg:col-span-5 relative">
 <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden border-2 border-slate-200/90 shadow-2xl relative space-y-0">
 {/* Photo Header */}
 {currentService.imageUrl && (
 <div className="relative h-48 w-full overflow-hidden border-b border-slate-200">
 <img 
 src={currentService.imageUrl} 
 alt={currentService.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
 <div className="absolute bottom-3 left-4 flex items-center gap-2">
 <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
 <span className="text-xs font-mono font-extrabold text-white uppercase bg-slate-900/80 px-3 py-1 rounded-lg border border-white/20 shadow-sm">
 {currentService.title} Division
 </span>
 </div>
 </div>
 )}

 <div className="p-6 sm:p-7 space-y-5">
 {/* Header of Illustration */}
 <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
 <div className="flex items-center gap-2">
 <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
 <span className="text-xs font-mono font-bold text-slate-800 uppercase">{currentService.title} Engine</span>
 </div>
 <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
 Live System Active
 </span>
 </div>

 {/* Simulated Visual Breakdown depending on tab */}
 {currentService.id === 'income-tax-showcase' && (
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
 <div className="flex justify-between text-xs font-bold">
 <span className="text-slate-800">New vs Old Tax Regime Optimization</span>
 <span className="text-emerald-700">₹64,800 Saved</span>
 </div>
 <div className="w-full h-2 rounded-full bg-amber-200/60">
 <div className="w-[88%] h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 animate-pulse" />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-3 text-xs">
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
 <div className="text-slate-500 text-[11px] font-mono">AIS/Form 26AS</div>
 <div className="text-slate-900 font-bold mt-1">Matched 100%</div>
 </div>
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
 <div className="text-slate-500 text-[11px] font-mono">Refund Processing</div>
 <div className="text-emerald-600 font-bold mt-1">Expedited</div>
 </div>
 </div>
 </div>
 )}

 {currentService.id === 'gst-showcase' && (
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
 <div className="flex justify-between text-xs font-bold">
 <span className="text-slate-800">ITC Reconciliation (2A vs 3B)</span>
 <span className="text-emerald-700 font-mono">100% Eligible</span>
 </div>
 <div className="w-full h-2 rounded-full bg-emerald-200/60">
 <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
 </div>
 </div>
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold shadow-xs">
 <span className="text-slate-700">Notice Advisory Protection</span>
 <span className="text-amber-700">24/7 Monitoring ✔</span>
 </div>
 </div>
 )}

 {currentService.id === 'accounting-showcase' && (
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
 <div className="flex justify-between text-xs font-bold">
 <span className="text-slate-800">Tally Prime / Books Synchronization</span>
 <span className="text-amber-800">Zero Variance</span>
 </div>
 <div className="w-full h-2 rounded-full bg-amber-200/60">
 <div className="w-[96%] h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
 </div>
 </div>
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold shadow-xs">
 <span className="text-slate-700">Bank Reconciliation Speed</span>
 <span className="text-emerald-600">Daily Automated</span>
 </div>
 </div>
 )}

 {currentService.id === 'project-reports-showcase' && (
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
 <div className="flex justify-between text-xs font-bold">
 <span className="text-slate-800">Debt Service Coverage Ratio (DSCR)</span>
 <span className="text-emerald-700 font-mono text-sm font-extrabold">2.18x (Prime)</span>
 </div>
 <div className="w-full h-2 rounded-full bg-amber-200/60">
 <div className="w-[92%] h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 animate-pulse" />
 </div>
 </div>
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold shadow-xs">
 <span className="text-slate-700">CMA Data Format</span>
 <span className="text-amber-700">RBI Standard Verified</span>
 </div>
 </div>
 )}

 {currentService.id === 'loan-documentation-showcase' && (
 <div className="space-y-4">
 <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
 <div className="flex justify-between text-xs font-bold">
 <span className="text-slate-800">MSME & Mudra Loan Dossier Readiness</span>
 <span className="text-amber-800">99% Complete</span>
 </div>
 <div className="w-full h-2 rounded-full bg-amber-200/60">
 <div className="w-[99%] h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
 </div>
 </div>
 <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold shadow-xs">
 <span className="text-slate-700">Document Verification Turnaround</span>
 <span className="text-emerald-600">24-48 Hours</span>
 </div>
 </div>
 )}

 {/* Footer of card illustration */}
 <div className="pt-3 flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-200 font-bold">
 <span>Audited by CA Finalist Team</span>
 <span className="text-amber-600 flex items-center gap-1 font-sans">
 <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> High Precision
 </span>
 </div>
 </div>

 </div>
 </div>

 </div>
 </div>

 </div>
 </section>
 );
}
