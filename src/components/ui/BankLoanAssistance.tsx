'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BANK_LOAN_CATEGORIES, UTILITY_CATEGORIES } from '../../data/mockData';
import {
  Building, Briefcase, Landmark, Wallet, Home, Truck,
  CheckCircle2, ArrowRight, Calculator, AlertTriangle, ShieldCheck, TrendingUp, Sparkles, Layers, FileText, Percent, Search, FileSpreadsheet
} from 'lucide-react';
import Link from 'next/link';

interface BankLoanAssistanceProps {
 onOpenModal: (service?: string) => void;
}

export default function BankLoanAssistance({ onOpenModal }: BankLoanAssistanceProps) {
 // Tab State
 const [activeTab, setActiveTab] = useState<'itr' | 'gst' | 'finance' | 'tds-tcs'>('itr');

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
 Calculator,
 FileText,
 Percent,
 Search,
 FileSpreadsheet,
 TrendingUp
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

 {/* Important Notice Disclaimer */}
  <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-12 mb-8 relative z-10">
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-8 flex items-start gap-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-yellow-500"></div>
      <div className="shrink-0 mt-0.5 hidden sm:block">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform duration-300">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5 font-poppins flex items-center gap-2">
          Important Notice
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Disclaimer
          </span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium text-justify">
          FIN-HEIST specializes in preparing professional financial documentation, including CMA reports, DSCR analysis, project reports, projected financial statements, MPBF calculations, and other bank-ready documents. We also provide expert online consultation to help applicants prepare complete and accurate loan documentation. We are not a loan provider or lender, and we do not promise or influence loan approvals. All lending decisions are made exclusively by the respective bank or financial institution. On-ground loan assistance, where available, is currently limited to Dehradun, Uttarakhand.
        </p>
      </div>
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
  <div className="flex justify-center mb-12">
    <div className="flex items-center gap-1 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-full border border-slate-200/60 shadow-inner relative overflow-x-auto hide-scrollbar max-w-full">
      <div
        className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm border border-slate-200 transition-all duration-300 ease-out hidden sm:block"
        style={{
          width: 'calc(25% - 5.5px)',
          left: activeTab === 'itr' ? '6px' : activeTab === 'gst' ? 'calc(25% + 1.5px)' : activeTab === 'finance' ? 'calc(50% - 3px)' : 'calc(75% - 7px)'
        }}
      />
      {UTILITY_CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.iconName] || Calculator;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id as any)}
            className={`relative z-10 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-colors w-auto sm:w-40 shrink-0 ${
              activeTab === cat.id ? 'bg-white sm:bg-transparent text-amber-700 shadow-sm sm:shadow-none' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className="w-4 h-4 hidden sm:block" />
            <span>{cat.label}</span>
          </button>
        );
      })}
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
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}} />

  {/* Utilities Grid */}
  <div className="animate-fade-in min-h-[400px]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {UTILITY_CATEGORIES.find(c => c.id === activeTab)?.subCalculators.map((sub, idx) => {
        const SubIcon = iconMap[sub.iconName] || Calculator;
        return (
          <div key={idx} className="group relative rounded-3xl glass-card p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <SubIcon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase tracking-wider group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                {sub.badge}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold font-poppins text-slate-900 mb-3 group-hover:text-amber-700 transition-colors relative z-10 leading-tight">
              {sub.title}
            </h3>
            
            <p className="text-sm text-slate-600 font-medium font-inter mb-8 flex-grow relative z-10 line-clamp-3">
              {sub.description}
            </p>

            <Link
              href={sub.href}
              className="mt-auto w-full py-3.5 px-6 rounded-xl bg-slate-50 hover:bg-amber-500 text-slate-700 hover:text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all border border-slate-200 hover:border-amber-500 group/btn relative z-10"
            >
              <span>Open Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        );
      })}
    </div>
  </div>

  {/* Dynamic Universal Disclaimer */}
  <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-amber-500/30 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed shadow-sm max-w-5xl mx-auto">
    <div className="flex items-center gap-2.5 text-amber-900 font-extrabold font-poppins text-sm sm:text-base mb-1">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
      <span>Important Statutory & Professional Disclaimer</span>
    </div>
    <p><strong className="text-slate-900">Calculators Disclaimer:</strong> These calculators are provided for basic estimation and educational purposes only. Actual tax applicability, deductions, and liabilities require detailed professional assessment based on your exact financial situation. Official tax filing requires exact computation by a qualified professional. Please consult our experts before making any financial decisions.</p>
  </div>
</div>
</section>
);
}
