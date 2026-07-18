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
    <section id="services" className="py-24 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 z-10 animate-gradient-shift" />

      {/* Full screen dynamic container max-w-[1760px] */}
      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

        {/* Section Header & Filters */}
        <div
          ref={headerRef}
          className={`text-center max-w-4xl mx-auto space-y-4 mb-10 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-bold text-amber-700 animate-card-tilt">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dynamic Full-Screen Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
            Comprehensive Financial &{' '}
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Compliance Services</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed max-w-2xl mx-auto">
            Everything your business needs under one trusted partner. Watch our services slide automatically or pause to explore specific practice areas.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setExpandedId(null);
                  if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 font-bold transform -translate-y-0.5 border border-amber-300/40'
                    : 'glass-card text-slate-700 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Marquee Controls Bar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span>Automatic Horizontal Scroll {isPaused ? '(Paused on Hover)' : '(Active)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center gap-1.5 ${
                isPaused
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-white/80 text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-700'
              }`}
              title={isPaused ? 'Resume Auto-Scroll' : 'Pause Auto-Scroll'}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
              <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 transition-all shadow-sm active:scale-95"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 transition-all shadow-sm active:scale-95"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Infinite Automatic Horizontal Scrolling Marquee Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-2 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: isPaused ? 'smooth' : 'auto' }}
        >
          {scrollingServices.map((service, idx) => {
            const Icon = iconMap[service.iconName] || FileText;
            const isExpanded = expandedId === service.id;
            const uniqueKey = `${service.id}-${idx}`;

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

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/50 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl shadow-amber-500/15 animate-card-pulse">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/40 inline-block mb-3">
              Corporate Retainer
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white">Need a custom enterprise compliance package?</h4>
            <p className="text-sm sm:text-base text-amber-200/80 mt-2 font-inter leading-relaxed">
              We structure multi-year retainers, Virtual CFO services, complete statutory audit support, and pan-India multi-branch GST management tailored specifically to your corporate growth.
            </p>
          </div>
          <button
            onClick={() => onOpenModal('Custom Corporate Retainer Package')}
            className="shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-base shadow-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-1 border border-amber-300/50"
          >
            <span>Request Custom Proposal</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
}
