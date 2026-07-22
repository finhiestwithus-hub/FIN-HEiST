'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, FileCheck,
  BarChart3, RefreshCw, Sparkles, MessageCircle,
  Layers, ArrowUpRight, CheckSquare, Clock, Phone,
  Briefcase, Building2, Scale, FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import NewsTicker from './NewsTicker';

interface HeroProps {
  onOpenModal: (service?: string) => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'itr' | 'gst' | 'accounting' | 'compliance' | 'more'>('itr');
  const [liveScore, setLiveScore] = useState(98.4);
  const [isLoaded, setIsLoaded] = useState(false);

  // Dynamic Financial Quarter (April-March)
  const currentMonth = new Date().getMonth(); // 0-11
  const currentQuarter = currentMonth >= 3 && currentMonth <= 5 ? 'Q1' 
                       : currentMonth >= 6 && currentMonth <= 8 ? 'Q2' 
                       : currentMonth >= 9 && currentMonth <= 11 ? 'Q3' : 'Q4';

  useEffect(() => {
    // Trigger smooth entrance animation on every page refresh / mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveScore(prev => Number((prev + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const trustBadges = [
    { icon: '✔', label: 'Dedicated Relationship Support' },
    { icon: '✔', label: 'Business-Focused Solutions' },
    { icon: '✔', label: 'Pan-India Service' },
    { icon: '✔', label: 'Fast Turnaround' },
  ];

  const dashboardTabs = [
    { id: 'itr', label: 'Tax Return', icon: FileCheck },
    { id: 'gst', label: 'GST Filing', icon: RefreshCw },
    { id: 'accounting', label: 'Accounting & Tally', icon: FileText },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'more', label: 'More Services', icon: Briefcase },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[94vh] lg:min-h-screen w-full flex items-center justify-between pt-36 pb-12 lg:pt-40 lg:pb-24 bg-mesh-hero"
    >
      {/* Background professional CA office photo – light overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      {/* Animated glowing spheres */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-400/25 blur-[150px] pointer-events-none z-0 animate-blob" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] rounded-full bg-yellow-400/25 blur-[150px] pointer-events-none z-0 animate-blob" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-300/20 blur-[170px] pointer-events-none z-0 animate-blob" />

      {/* Gold top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 z-10 animate-gradient-shift" />

      {/* Edge-to-edge News Ticker right below the fixed Navbar & TopBar */}
      <div className="absolute top-[110px] sm:top-[118px] lg:top-[120px] left-0 right-0 z-40">
        <NewsTicker />
      </div>

      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">

          {/* LEFT: Headline & CTA with Page Refresh Staggered Entrance Animation */}
          <div className={`lg:col-span-7 xl:col-span-6 space-y-7 transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}>


            {/* Main Headline */}
            <h1 className={`text-[2.2rem] leading-[1.15] sm:text-5xl lg:text-6xl font-extrabold font-poppins tracking-tight text-slate-900 transition-all duration-700 delay-200 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Tax, Compliance, Accounting{' '}
              {/* <span className="bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 bg-clip-text text-transparent font-black">
 compliant
 </span>{' '} */}
              and{' '}
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 bg-clip-text text-transparent font-black">
                financially efficient.
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg text-slate-600 font-inter leading-relaxed max-w-2xl transition-all duration-700 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <strong className="text-slate-900 font-semibold">FIN-HEIST</strong> is a Accounting, tax & business compliance platform led by two CA Finalists, helping individuals, startups and businesses with Income Tax, GST, Accounting, Company Registration, Financial Documentation and bank-ready CMA & DSCR project reports across India. Instead of FIN-HEIST is a CA practice led by Dual CA Finalists, delivering Income Tax returns, GST compliance, Company registration, and bank-accepted CMA & DSCR project reports across India.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center gap-4 pt-2 transition-all duration-700 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}>
              <button
                onClick={() => onOpenModal('Book Consultation')}
                className="w-full sm:w-auto justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-base shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2.5 group border border-amber-300/40"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="flex w-full sm:w-auto gap-3 items-center">
                <a
                  href="#services"
                  className="flex-1 sm:flex-none justify-center px-3 sm:px-7 py-4 rounded-xl glass-card hover:bg-white text-slate-800 hover:text-amber-600 font-semibold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base shadow-md hover:shadow-lg border border-slate-300/80"
                >
                  <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap">Our Services</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Fin-Heist team, I need expert assistance with tax and compliance.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none justify-center px-3 sm:px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className={`pt-4 border-t border-slate-200 transition-all duration-700 delay-700 transform ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
              }`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {trustBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm hover:border-amber-400 hover:shadow-md transition-all duration-300 leading-tight"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Stats */}
            <div className={`flex items-center gap-6 text-xs text-slate-500 font-inter transition-all duration-700 delay-900 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-700">Dual CA Finalist Led</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-700">1000+ ITRs Processed</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-700">Pan-India Digital Portal</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Dashboard Panel with Page Refresh 3D Slide-in Animation */}
          <div className={`lg:col-span-5 xl:col-span-6 relative transition-all duration-1000 ease-out delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0' : 'opacity-0 translate-y-20 translate-x-12 scale-90 rotate-2'
            }`}>



            {/* Dashboard Frame */}
            <div className="group relative rounded-3xl bg-white border-2 border-slate-200 shadow-2xl shadow-slate-300/80 overflow-hidden transition-all duration-500 hover:border-amber-400 hover:shadow-[0_30px_80px_-15px_rgba(245,158,11,0.3)]">

              {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

              {/* Header bar */}
              <div className="bg-gradient-to-r from-slate-900 via-amber-600 to-slate-900 px-5 py-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                  </div>
                  <span className="text-xs font-mono text-white/90 ml-2 font-bold">FIN-HEIST Dashboard v1.0</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-400/25 border border-amber-300/40 px-2.5 py-1 rounded-full text-[11px] text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Score: {liveScore}%</span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="grid grid-cols-5 gap-0 border-b border-slate-200 bg-slate-50 relative z-10">
                {dashboardTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex flex-col items-center justify-center py-3 px-1 text-[11px] font-bold transition-all border-b-2 ${isActive
                        ? 'border-amber-500 text-amber-700 bg-white shadow-xs'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/60'
                        }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6 min-h-[310px] bg-white relative z-10">

                {/* TAB 1: ITR */}
                {activeTab === 'itr' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold font-mono text-xs shadow-md">
                          ITR-3
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">FY 2025-26 Overview</h4>
                          <p className="text-xs text-slate-500">Business & Professional Tax</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold border border-amber-400/40">
                        Assisted
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                        <span className="text-[11px] text-slate-500 font-mono">Form 26AS & AIS</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-800">100% Reconciled</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-emerald-200 mt-1">
                          <div className="w-full h-full rounded-full bg-emerald-500" />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                        <span className="text-[11px] text-slate-500 font-mono">Estimated Refund</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-amber-800">₹48,250</span>
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-amber-200 mt-1">
                          <div className="w-4/5 h-full rounded-full bg-amber-500 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>Tax Verification Steps</span>
                        <span className="text-emerald-600">3/3 Verified ✓</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {['Capital gains loss adjustment checked', 'Sec 44AD/44ADA limits checked', 'Old vs New Regime optimized'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-emerald-700 font-medium">
                            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: GST */}
                {activeTab === 'gst' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-xs">
                          2A/2B
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">GSTR-3B & ITC Engine</h4>
                          <p className="text-xs text-slate-500">Monthly Compliance Status</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-300">
                        Monthly
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-500/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-600">Net ITC Matched</span>
                        <span className="text-sm font-bold text-emerald-700 font-mono">₹1,24,600</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                        <span>Vendor GSTR-1 Uploads: 142/142</span>
                        <span className="text-emerald-600 font-semibold">Zero Leakage</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-emerald-100">
                        <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[['GSTR-1 Status', 'Filed ✔', 'emerald'], ['GSTR-3B Status', 'Ready ✔', 'emerald']].map(([label, val, color]) => (
                        <div key={label} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <span className="text-slate-600">{label}</span>
                          <span className="text-emerald-600 font-bold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: ACCOUNTING & TALLY */}
                {activeTab === 'accounting' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-xs shadow-sm">
                          A/C
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Accounting & Tally</h4>
                          <p className="text-xs text-slate-500">Bookkeeping, ledger scrutiny and finalisation support</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">
                        Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Ledger Scrutiny', val: '100%', color: 'emerald', note: 'All errors resolved' },
                        { label: 'Trial Balance', val: 'Matched', color: 'emerald', note: 'Ready for finalisation' }
                      ].map(item => (
                        <div key={item.label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-[11px] text-slate-500 font-mono">{item.label}</span>
                          <div className={`text-lg font-bold ${item.color === 'emerald' ? 'text-emerald-600' : 'text-blue-600'} font-mono`}>{item.val}</div>
                          <span className="text-[10px] text-slate-400">{item.note}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-slate-700 flex items-center justify-between shadow-sm">
                      <span>Final Accounts & P&L Statement</span>
                      <span className="text-blue-600 font-bold flex items-center gap-1">Generated <ArrowUpRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                )}

                {/* TAB 4: COMPLIANCE */}
                {activeTab === 'compliance' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">This Month's Compliance</h4>
                          <p className="text-xs text-slate-500">Statutory Calendar Active</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                        On Track
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { text: 'TDS 26Q/24Q Quarterly Return', status: 'Prepared', color: 'slate' },
                        { text: 'Udyam (MSME) Verification', status: 'Covered ✔', color: 'emerald' },
                        { text: `Advance Tax ${currentQuarter} Calculation`, status: 'Assisted', color: 'amber' },
                      ].map(item => (
                        <div key={item.text} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-slate-700 font-medium">{item.text}</span>
                          </div>
                          <span className={item.color === 'emerald' ? 'text-emerald-600 font-semibold' : item.color === 'amber' ? 'text-amber-600 font-semibold' : 'text-slate-600 font-semibold'}>{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: MORE SERVICES */}
                {activeTab === 'more' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Corporate Services</h4>
                          <p className="text-xs text-slate-500">Business & Legal Solutions</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">
                        Explore
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Company Reg.', icon: Building2, bg: 'bg-blue-100', text: 'text-blue-700' },
                        { label: 'Trademark IP', icon: Scale, bg: 'bg-emerald-100', text: 'text-emerald-700' },
                        { label: 'Startup India', icon: Sparkles, bg: 'bg-amber-100', text: 'text-amber-700' },
                        { label: 'Loan Reports', icon: BarChart3, bg: 'bg-slate-200', text: 'text-slate-700' },
                      ].map((svc, i) => {
                        const SvcIcon = svc.icon;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
                            onClick={() => onOpenModal(svc.label)}
                          >
                            <div className={`w-8 h-8 rounded-lg ${svc.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                              <SvcIcon className={`w-4 h-4 ${svc.text}`} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-700 group-hover:text-amber-600 transition-colors">{svc.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 flex items-center justify-between">
                      <span>Need a custom financial solution?</span>
                      <button onClick={() => onOpenModal('Custom Corporate Services')} className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors">
                        View All <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Real-time verification</span>
                  </div>
                  <button
                    onClick={() => onOpenModal('Request Compliance Audit')}
                    className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Request Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Contact Strip at bottom */}
              <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between border-t border-amber-500/30 relative z-10">
                <div className="flex items-center gap-2 text-amber-400 text-xs">
                  <Phone className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-bold">{COMPANY_INFO.phone}</span>
                </div>
                <button
                  onClick={() => onOpenModal()}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs hover:from-amber-600 hover:to-yellow-600 transition-colors shadow-md"
                >
                  Talk to Consultant →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
