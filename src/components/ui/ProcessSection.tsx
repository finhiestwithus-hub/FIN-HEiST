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
            How We Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter">
            A frictionless 5-step workflow designed to save your time, eliminate paperwork confusion, and deliver rapid statutory compliance across India.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 z-0 opacity-40" />

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.iconName] || Send;
              const color = stepColors[idx % stepColors.length];
              const isVisible = !!stepVisible[idx];
              return (
                <div
                  key={step.id}
                  className={`group relative flex flex-col items-center text-center glass-card glass-card-hover rounded-3xl
                    border border-slate-200/80 hover:border-amber-400 p-6 shadow-md hover:shadow-2xl hover:shadow-amber-500/25
                    transition-all duration-700 ease-out overflow-hidden transform hover:-translate-y-3 hover:scale-[1.03]
                    animate-card-bob float-delay-${idx}
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                >
                  {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0" />

                  <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Step circle */}
                  <div className={`relative w-16 h-16 rounded-2xl ${color.light} border-2 ${color.border} flex items-center justify-center group-hover:scale-110 transition-transform mb-5`}>
                    <Icon className={`w-7 h-7 ${color.text}`} />
                    <span className={`absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full ${color.num} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                      {step.id}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold font-poppins text-slate-900 group-hover:${color.text} transition-colors mb-1`}>
                    {step.title}
                  </h3>
                  <span className={`text-xs font-bold ${color.text} font-mono uppercase tracking-wider mb-3`}>
                    {step.subtitle}
                  </span>
                  <p className="text-sm text-slate-500 font-inter leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className={`mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${color.light} border ${color.border} ${color.text} text-xs font-semibold`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
              );
            })}
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
