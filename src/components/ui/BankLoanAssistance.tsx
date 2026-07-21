'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BANK_LOAN_CATEGORIES } from '../../data/mockData';
import {
 Building, Briefcase, Landmark, Wallet, Home, Truck,
 CheckCircle2, ArrowRight, Calculator, AlertTriangle, ShieldCheck, TrendingUp, Sparkles, Layers
} from 'lucide-react';

interface BankLoanAssistanceProps {
 onOpenModal: (service?: string) => void;
}

export default function BankLoanAssistance({ onOpenModal }: BankLoanAssistanceProps) {
 // Tab State
 const [activeTab, setActiveTab] = useState<'dscr' | 'gst' | 'itr'>('dscr');

 // DSCR State
 const [loanAmount, setLoanAmount] = useState<number>(35); // in Lakhs
 const [annualProfit, setAnnualProfit] = useState<number>(18); // in Lakhs

 // GST State
 const [gstAmount, setGstAmount] = useState<number>(100000);
 const [gstRate, setGstRate] = useState<number>(18); // 5, 12, 18, 28
 const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

 // ITR State
 const [itrIncome, setItrIncome] = useState<number>(1200000);
 const [itrDeductions, setItrDeductions] = useState<number>(150000);

 const [isPaused, setIsPaused] = useState(false);
 const scrollContainerRef = useRef<HTMLDivElement>(null);
 const exactScrollPos = useRef(0);

 useEffect(() => {
 let animationFrameId: number;
 const container = scrollContainerRef.current;
 if (!container) return;

 const autoScroll = () => {
 if (!isPaused && container && container.children.length > BANK_LOAN_CATEGORIES.length) {
 const firstCard = container.children[0] as HTMLElement;
 const secondSetFirstCard = container.children[BANK_LOAN_CATEGORIES.length] as HTMLElement;

 if (firstCard && secondSetFirstCard) {
 // Calculate the exact pixel width of one complete set of cards including gaps
 const singleSetWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;

 // Use our precise float accumulator instead of reading the browser's rounded scrollLeft
 if (exactScrollPos.current >= singleSetWidth) {
 exactScrollPos.current -= singleSetWidth;
 } else {
 exactScrollPos.current += 1.5; // Smooth sub-pixel precision accumulation
 }
 container.scrollLeft = exactScrollPos.current;
 }
 }
 animationFrameId = requestAnimationFrame(autoScroll);
 };

 animationFrameId = requestAnimationFrame(autoScroll);
 return () => cancelAnimationFrame(animationFrameId);
 }, [isPaused]);

 const iconMap: { [key: string]: any } = {
 Building,
 Briefcase,
 Landmark,
 Wallet,
 Home,
 Truck,
 };

 const loanImages: { [key: string]: string } = {
 'msme-loans': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', // MSME - factory/machinery
 'mudra-loans': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600', // Mudra - small business/documents
 'business-loans': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600', // Commercial - corporate building
 'working-capital': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600', // Working capital - finance/accounting
 'home-loans': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600', // Home Loan - beautiful house
 'vehicle-loans': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', // Equipment - heavy machinery
 };

 // Format Currency Helper
 const formatINR = (num: number) => {
 return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
 };

 // 1. DSCR Calculation
 const estimatedEMIYearly = (loanAmount * 100000 * 0.11); // approx 11% interest benchmark
 const simulatedDSCR = annualProfit * 100000 > 0 ? ((annualProfit * 100000) / estimatedEMIYearly).toFixed(2) : '0.00';
 const isHealthy = Number(simulatedDSCR) >= 1.5;

 // 2. GST Calculation
 let baseAmount = 0, totalGst = 0, cgst = 0, sgst = 0, finalAmount = 0;
 if (gstType === 'exclusive') {
 baseAmount = gstAmount;
 totalGst = baseAmount * (gstRate / 100);
 cgst = totalGst / 2;
 sgst = totalGst / 2;
 finalAmount = baseAmount + totalGst;
 } else {
 finalAmount = gstAmount;
 baseAmount = finalAmount / (1 + (gstRate / 100));
 totalGst = finalAmount - baseAmount;
 cgst = totalGst / 2;
 sgst = totalGst / 2;
 }

 // 3. ITR Calculation (Simplified Old vs New Regime)
 const taxableIncomeNew = Math.max(0, itrIncome - 50000);
 let taxNew = 0;
 if (taxableIncomeNew > 700000) {
 if (taxableIncomeNew > 1500000) taxNew += (taxableIncomeNew - 1500000) * 0.30 + 150000;
 else if (taxableIncomeNew > 1200000) taxNew += (taxableIncomeNew - 1200000) * 0.20 + 90000;
 else if (taxableIncomeNew > 900000) taxNew += (taxableIncomeNew - 900000) * 0.15 + 45000;
 else if (taxableIncomeNew > 600000) taxNew += (taxableIncomeNew - 600000) * 0.10 + 15000;
 else if (taxableIncomeNew > 300000) taxNew += (taxableIncomeNew - 300000) * 0.05;
 }

 const taxableIncomeOld = Math.max(0, itrIncome - 50000 - itrDeductions);
 let taxOld = 0;
 if (taxableIncomeOld > 500000) {
 if (taxableIncomeOld > 1000000) taxOld += (taxableIncomeOld - 1000000) * 0.30 + 112500;
 else if (taxableIncomeOld > 500000) taxOld += (taxableIncomeOld - 500000) * 0.20 + 12500;
 else if (taxableIncomeOld > 250000) taxOld += (taxableIncomeOld - 250000) * 0.05;
 }
 // Add 4% cess
 taxNew = Math.round(taxNew * 1.04);
 taxOld = Math.round(taxOld * 1.04);

 return (
 <section id="bank-loans" className="py-28 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80">
 {/* Top Gold Accent Strip */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

 {/* Decorative ambient blobs */}
 <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-blob" />
 <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-[150px] pointer-events-none animate-blob" />

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
 Bank Loan Assistance & <br />
 <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
 Documentation Support
 </span>
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
 Helping businesses prepare professional financial documentation, bank-accepted CMA reports, DSCR optimization, and detailed project reports for loan applications across India.
 </p>
 </div>

 {/* Core Documents & Features Bar */}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
 {[
 { label: 'CMA Data Reports', desc: 'Detailed 5 to 7 Yr Forecasts' },
 { label: 'DSCR Analysis', desc: 'Debt Service Coverage Optimization' },
 { label: 'Projected P&L / B/S', desc: 'Audited Format Projections' },
 { label: 'Business Plans', desc: 'Detailed Unit Economics' },
 { label: 'MPBF Calculation', desc: 'Maximum Working Capital Limits' },
 ].map((item, idx) => (
 <div key={idx} className="p-5 rounded-2xl glass-card border border-slate-200/90 text-center flex flex-col justify-center shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all duration-300">
 <span className="text-sm font-extrabold font-poppins text-amber-800">{item.label}</span>
 <span className="text-xs text-slate-600 font-medium mt-1 leading-snug">{item.desc}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Full-Screen Infinite Auto-scrolling Gallery */}
 <div className="w-full relative overflow-hidden pb-12">
 <style dangerouslySetInnerHTML={{
 __html:`
 .mask-image-edges {
 -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
 mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
 }
 /* Hide scrollbar for Chrome, Safari and Opera */
 .hide-scrollbar::-webkit-scrollbar {
 display: none;
 }
 /* Hide scrollbar for IE, Edge and Firefox */
 .hide-scrollbar {
 -ms-overflow-style: none; /* IE and Edge */
 scrollbar-width: none; /* Firefox */
 }
`}} />
 <div
 ref={scrollContainerRef}
 onMouseEnter={() => setIsPaused(true)}
 onMouseLeave={() => {
 setIsPaused(false);
 // Re-sync the precise accumulator to wherever the user manually dragged it
 if (scrollContainerRef.current) {
 exactScrollPos.current = scrollContainerRef.current.scrollLeft;
 }
 }}
 className="flex gap-6 overflow-x-auto hide-scrollbar items-stretch select-none cursor-grab active:cursor-grabbing px-4 sm:px-8 mask-image-edges transform-gpu w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
 style={{ willChange: 'scroll-position', scrollBehavior: isPaused ? 'smooth' : 'auto' }}
 >
 {/* We duplicate the array 3 times to create a seamless infinite scroll buffer like ServicesSection */}
 {[0, 1, 2].map((blockIdx) => (
 <React.Fragment key={blockIdx}>
 {BANK_LOAN_CATEGORIES.map((cat, idx) => {
 const Icon = iconMap[cat.iconName] || Landmark;

 return (
 <div
 key={`${cat.id}-${blockIdx}`}
 className="w-[360px] sm:w-[420px] lg:w-[450px] shrink-0 group relative glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 hover:border-amber-400 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_70px_-15px_rgba(245,158,11,0.22)] overflow-hidden flex flex-col justify-between transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02]"
 >
 {/* Background Image Optimized for GPU */}
 <img
 src={loanImages[cat.id]}
 alt=""
 className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:scale-110 group-hover:opacity-25 transition-all duration-1000 ease-in-out pointer-events-none z-0"
 />

 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

 <div className="relative z-20">
 {/* Top Row: Glowing Icon Emblem & Max Amount Badge */}
 <div className="flex items-center justify-between mb-4">
 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 flex items-center justify-center ring-4 ring-amber-500/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
 <Icon className="w-7 h-7 stroke-[2.2]" />
 </div>
 <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-extrabold shadow-2xs">
 {cat.maxAmount}
 </span>
 </div>

 {/* Content Body */}
 <div className="flex-1">
 <h3 className="text-xl font-extrabold font-poppins text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
 {cat.title}
 </h3>
 <p className="text-sm text-slate-800 font-semibold font-inter leading-relaxed line-clamp-2">
 {cat.description}
 </p>
 </div>

 {/* Key Requirement Block */}
 <div className="mt-4 p-3.5 rounded-xl bg-white/95 border border-amber-500/30 shadow-sm group-hover:bg-white transition-colors relative z-20">
 <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1 block">Key Requirement:</span>
 <span className="text-xs font-extrabold text-slate-900 line-clamp-2">{cat.keyRequirement}</span>
 </div>
 </div>

 <div className="relative z-20 mt-4 pt-4 border-t border-slate-200/80">
 {/* Interactive Benefits List */}
 <ul className="space-y-1.5 mb-4">
 {cat.features.slice(0, 3).map((benefit, i) => (
 <li key={i} className="flex items-start gap-2.5">
 <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
 <span className="text-sm font-medium text-slate-700">{benefit}</span>
 </li>
 ))}
 </ul>

 {/* Deep-Dive CTA */}
 <button
 onClick={() => onOpenModal(cat.title)}
 className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:shadow-amber-500/20 transform active:scale-95 group/btn"
 >
 <span>Prepare Loan Dossier & CMA</span>
 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
 </button>
 </div>
 </div>
 );
 })}
 </React.Fragment>
 ))}
 </div>
 </div>

 {/* Intersection Gold Line for Calculators Section */}
 <div id="calculators" className="w-full relative mt-16 mb-20 border-t border-slate-200/80 scroll-mt-24">
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />
 </div>

 <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

 {/* Hub Header */}
 <div className="text-center mb-10">
 <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
 Calculators
 </h2>
 <p className="text-sm sm:text-base text-slate-600 font-inter max-w-2xl mx-auto">
 Interactive calculators designed to instantly estimate your loan eligibility, tax liabilities, and GST obligations.
 </p>
 </div>

 {/* Apple-Style Segmented Control */}
 <div className="flex justify-center mb-10">
 <div className="flex items-center gap-1 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-full border border-slate-200/60 shadow-inner relative">
 <div
 className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm border border-slate-200 transition-all duration-300 ease-out"
 style={{
 width: 'calc(33.33% - 4px)',
 left: activeTab === 'dscr' ? '4px' : activeTab === 'gst' ? 'calc(33.33% + 2px)' : 'calc(66.66%)'
 }}
 />
 {[
 { id: 'dscr', label: 'DSCR Analysis', icon: Calculator },
 { id: 'gst', label: 'GST Estimator', icon: Layers },
 { id: 'itr', label: 'ITR Projection', icon: TrendingUp },
 ].map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id as any)}
 className={`relative z-10 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors w-[105px] sm:w-48 ${activeTab === tab.id ? 'text-amber-700' : 'text-slate-500 hover:text-slate-800'
 }`}
 >
 <tab.icon className="w-4 h-4 hidden sm:block" />
 <span className="hidden sm:inline">{tab.label}</span>
 <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
 </button>
 ))}
 </div>
 </div>

 <style dangerouslySetInnerHTML={{
 __html:`
 @keyframes fadeInScale {
 0% { opacity: 0; transform: scale(0.98); }
 100% { opacity: 1; transform: scale(1); }
 }
 .animate-fade-in {
 animation: fadeInScale 0.4s ease-out forwards;
 }
`}} />

 {/* Interactive Workspace Box */}
 <div className="group relative rounded-3xl glass-card p-6 sm:p-12 border-2 border-amber-500/40 shadow-[0_25px_80px_-15px_rgba(245,158,11,0.18)] mb-8 overflow-hidden transition-all duration-500 min-h-[500px]">

 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-20 h-full">

 {/* Left Column (Inputs) */}
 <div className="lg:col-span-6 space-y-6">

 {activeTab === 'dscr' && (
 <div className="space-y-6 animate-fade-in">
 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-800">
 <Calculator className="w-4 h-4 text-amber-600" />
 <span>Quick Financial Engineering Simulator</span>
 </div>
 <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 leading-tight">
 Calculate Your Debt Service Coverage Ratio (DSCR)
 </h3>
 <p className="text-sm text-slate-600 leading-relaxed font-inter">
 Lenders generally require a DSCR between <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">1.50x and 2.00x</span> to sanction commercial loans.
 </p>

 <div className="space-y-5 pt-2">
 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <div className="flex justify-between text-xs sm:text-sm font-bold">
 <span className="text-slate-700">Desired Loan Quantum</span>
 <span className="text-amber-800 font-mono font-extrabold text-base">₹{loanAmount} Lakhs</span>
 </div>
 <input type="range" min="5" max="500" step="5" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" />
 </div>

 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <div className="flex justify-between text-xs sm:text-sm font-bold">
 <span className="text-slate-700">Annual Business Net Profit & Depr.</span>
 <span className="text-emerald-700 font-mono font-extrabold text-base">₹{annualProfit} Lakhs</span>
 </div>
 <input type="range" min="2" max="200" step="1" value={annualProfit} onChange={(e) => setAnnualProfit(Number(e.target.value))} className="w-full h-2 rounded-lg bg-slate-200 accent-emerald-500 cursor-pointer" />
 </div>
 </div>
 </div>
 )}

 {activeTab === 'gst' && (
 <div className="space-y-6 animate-fade-in">
 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-800">
 <Layers className="w-4 h-4 text-amber-600" />
 <span>Instant Tax Computation</span>
 </div>
 <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 leading-tight">
 GST Invoice Estimator
 </h3>
 <p className="text-sm text-slate-600 leading-relaxed font-inter">
 Quickly calculate CGST, SGST, and total invoice amounts. Easily switch between inclusive and exclusive tax modes.
 </p>

 <div className="space-y-5 pt-2">
 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <label className="block text-xs sm:text-sm font-bold text-slate-700">Invoice Amount (₹)</label>
 <input
 type="number"
 value={gstAmount}
 onChange={(e) => setGstAmount(Number(e.target.value))}
 className="w-full p-3 rounded-xl border border-slate-300 bg-white font-mono font-bold text-lg text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
 />
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <label className="block text-xs font-bold text-slate-700">GST Rate (%)</label>
 <select
 value={gstRate}
 onChange={(e) => setGstRate(Number(e.target.value))}
 className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
 >
 <option value={5}>5%</option>
 <option value={12}>12%</option>
 <option value={18}>18%</option>
 <option value={28}>28%</option>
 </select>
 </div>

 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <label className="block text-xs font-bold text-slate-700">Tax Mode</label>
 <select
 value={gstType}
 onChange={(e) => setGstType(e.target.value as any)}
 className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
 >
 <option value="exclusive">Exclusive (+GST)</option>
 <option value="inclusive">Inclusive (in Total)</option>
 </select>
 </div>
 </div>
 </div>
 </div>
 )}

 {activeTab === 'itr' && (
 <div className="space-y-6 animate-fade-in">
 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-800">
 <TrendingUp className="w-4 h-4 text-amber-600" />
 <span>Regime Comparison Simulator</span>
 </div>
 <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 leading-tight">
 Income Tax Projection
 </h3>
 <p className="text-sm text-slate-600 leading-relaxed font-inter">
 Estimate your tax liability instantly. Compare the Old Tax Regime vs the New Tax Regime to find your best saving strategy.
 </p>

 <div className="space-y-5 pt-2">
 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <div className="flex justify-between text-xs sm:text-sm font-bold">
 <span className="text-slate-700">Annual Gross Income</span>
 <span className="text-emerald-700 font-mono font-extrabold text-base">₹{formatINR(itrIncome)}</span>
 </div>
 <input type="range" min="300000" max="5000000" step="50000" value={itrIncome} onChange={(e) => setItrIncome(Number(e.target.value))} className="w-full h-2 rounded-lg bg-slate-200 accent-emerald-500 cursor-pointer" />
 </div>

 <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-3">
 <div className="flex justify-between text-xs sm:text-sm font-bold">
 <span className="text-slate-700">Total Deductions (80C, 80D, etc)</span>
 <span className="text-amber-800 font-mono font-extrabold text-base">₹{formatINR(itrDeductions)}</span>
 </div>
 <input type="range" min="0" max="1000000" step="10000" value={itrDeductions} onChange={(e) => setItrDeductions(Number(e.target.value))} className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" />
 </div>
 </div>
 </div>
 )}

 </div>

 {/* Right Column (Outputs) */}
 <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-white border-2 border-slate-200/90 shadow-xl text-center relative overflow-hidden h-full min-h-[400px]">

 {activeTab === 'dscr' && (
 <div className="animate-fade-in w-full flex flex-col items-center space-y-5">
 <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Estimated DSCR Index</div>
 <div className={`text-5xl sm:text-6xl font-extrabold font-poppins font-mono tracking-tight ${isHealthy ? 'text-emerald-600' : 'text-amber-600'}`}>
 {simulatedDSCR}x
 </div>
 <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold mb-4">
 {isHealthy ? (
 <span className="text-emerald-800 flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300 shadow-2xs">
 <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strong Eligibility (Bank-Ready)
 </span>
 ) : (
 <span className="text-amber-900 flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-2xs">
 <AlertTriangle className="w-4 h-4 text-amber-600" /> CMA Restructuring Required
 </span>
 )}
 </div>
 <button onClick={() => onOpenModal(`DSCR Optimization for ₹${loanAmount} Lakhs Loan`)} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm shadow-lg shadow-amber-500/35 transform hover:-translate-y-0.5 transition-all">
 Get Professional CMA Report
 </button>
 </div>
 )}

 {activeTab === 'gst' && (
 <div className="animate-fade-in w-full flex flex-col space-y-4 text-left justify-center h-full">
 <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
 <div className="flex justify-between items-center">
 <span className="text-sm font-semibold text-slate-600">Base Amount</span>
 <span className="font-mono font-bold text-slate-900">₹{formatINR(baseAmount)}</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-sm font-semibold text-slate-600">CGST ({gstRate / 2}%)</span>
 <span className="font-mono font-bold text-emerald-600">+ ₹{formatINR(cgst)}</span>
 </div>
 <div className="flex justify-between items-center pb-3 border-b border-slate-200">
 <span className="text-sm font-semibold text-slate-600">SGST ({gstRate / 2}%)</span>
 <span className="font-mono font-bold text-emerald-600">+ ₹{formatINR(sgst)}</span>
 </div>
 <div className="flex justify-between items-center pt-1">
 <span className="text-sm font-black text-slate-900">Total Invoice Value</span>
 <span className="text-2xl font-mono font-extrabold text-amber-600">₹{formatINR(finalAmount)}</span>
 </div>
 </div>
 <button onClick={() => onOpenModal(`GST Registration/Filing`)} className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-poppins font-extrabold text-sm shadow-lg shadow-amber-500/35 transform hover:-translate-y-0.5 transition-all mt-4">
 Consult for GST Filing
 </button>
 </div>
 )}

 {activeTab === 'itr' && (
 <div className="animate-fade-in w-full flex flex-col space-y-6 justify-center h-full">
 <div className="grid grid-cols-2 gap-4">
 <div className={`rounded-2xl p-4 border flex flex-col justify-center items-center shadow-sm ${taxOld <= taxNew ? 'bg-emerald-50 border-emerald-200 scale-105 transform transition-transform' : 'bg-slate-50 border-slate-200'}`}>
 <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide mb-1 ${taxOld <= taxNew ? 'text-emerald-700' : 'text-slate-500'}`}>Old Regime</span>
 <span className={`text-xl sm:text-2xl font-mono font-extrabold ${taxOld <= taxNew ? 'text-emerald-600' : 'text-slate-900'}`}>₹{formatINR(taxOld)}</span>
 <span className="text-[10px] text-slate-500 mt-1">Tax Liability</span>
 </div>
 <div className={`rounded-2xl p-4 border flex flex-col justify-center items-center shadow-sm ${taxNew < taxOld ? 'bg-emerald-50 border-emerald-200 scale-105 transform transition-transform' : 'bg-slate-50 border-slate-200'}`}>
 <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide mb-1 ${taxNew < taxOld ? 'text-emerald-700' : 'text-slate-500'}`}>New Regime</span>
 <span className={`text-xl sm:text-2xl font-mono font-extrabold ${taxNew < taxOld ? 'text-emerald-600' : 'text-slate-900'}`}>₹{formatINR(taxNew)}</span>
 <span className="text-[10px] text-slate-500 mt-1">Tax Liability</span>
 </div>
 </div>

 <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-left">
 <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
 <p className="text-xs text-blue-900 font-medium leading-snug">
 {taxNew < taxOld ? 'The New Regime saves you more money without needing investments.' : 'The Old Regime is better for you if you fully utilize your tax deductions.'}
 </p>
 </div>

 <button onClick={() => onOpenModal(`ITR Filing & Tax Planning`)} className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-poppins font-extrabold text-sm shadow-lg shadow-amber-500/35 transform hover:-translate-y-0.5 transition-all">
 Optimize & File Taxes Now
 </button>
 </div>
 )}

 </div>
 </div>
 </div>

 {/* Dynamic Universal Disclaimer */}
 <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-amber-500/30 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed shadow-sm">
 <div className="flex items-center gap-2.5 text-amber-900 font-extrabold font-poppins text-sm sm:text-base mb-1">
 <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
 <span>Important Statutory & Professional Disclaimer</span>
 </div>
 {activeTab === 'dscr' && (
 <p><strong className="text-slate-900">Loan & CMA Disclaimer:</strong> Fin-Heist provides professional loan application structuring, CMA report preparation, and financial engineering support. We are not a bank or NBFC. Loan approval, interest rates, and quantum are solely subject to the discretion of the lending institution. Assistance with a loan application does not guarantee loan approval.</p>
 )}
 {activeTab === 'gst' && (
 <p><strong className="text-slate-900">GST Disclaimer:</strong> This calculator provides a basic estimation. Actual tax applicability, Input Tax Credit (ITC) eligibility, and HSN/SAC classifications require detailed professional assessment. Please consult our experts before filing official returns.</p>
 )}
 {activeTab === 'itr' && (
 <p><strong className="text-slate-900">Tax Liability Disclaimer:</strong> The projected tax liability is an estimate for educational purposes, based on standard slab rates and 4% cess. It does not account for specific surcharges, detailed capital gains, or complex exemptions. Official tax filing requires exact computation by a qualified professional.</p>
 )}
 <p className="pt-3 border-t border-amber-200/60 mt-2">
 <strong className="text-slate-900">Statutory Attestation Note:</strong> Statutory audit, tax audit, financial certifications, balance sheet certification, and all other statutory attestations are undertaken by our panel of experienced and duly qualified Chartered Accountants holding a valid Certificate of Practice (CoP). We are committed to delivering accurate, compliant, and professionally certified documentation in accordance with applicable laws and regulatory standards, ensuring our clients receive reliable and high-quality professional services.
 </p>
 </div>
 </div>
 </section>
 );
}
