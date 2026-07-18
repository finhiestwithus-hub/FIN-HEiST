'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TRUST_STATS } from '../../data/mockData';
import { ShieldCheck, TrendingUp, Award, Users } from 'lucide-react';

export default function TrustSection() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'ITR Filings Completed': 0,
    'GST Returns Processed': 0,
    'Business Registrations': 0,
    'Client Satisfaction Rating': 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Scroll animation state for each card
  const [cardVisible, setCardVisible] = useState<boolean[]>([false, false, false, false]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);

          // Stagger cards
          TRUST_STATS.forEach((_, i) => {
            setTimeout(() => {
              setCardVisible(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 100 + i * 110);
          });

          // Count up animation
          TRUST_STATS.forEach((stat) => {
            let current = 0;
            const target = stat.value;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts((prev) => ({ ...prev, [stat.label]: current }));
            }, 30);
          });
        } else {
          setHeaderVisible(false);
          setCardVisible([false, false, false, false]);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const icons = [TrendingUp, ShieldCheck, Award, Users];
  const colors = [
    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-700', iconBg: 'bg-amber-500/15', val: 'text-amber-800' },
    { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-700', iconBg: 'bg-emerald-500/15', val: 'text-emerald-800' },
    { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: 'text-yellow-700', iconBg: 'bg-yellow-500/15', val: 'text-yellow-800' },
    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-700', iconBg: 'bg-amber-500/15', val: 'text-amber-800' },
  ];

  // Float classes alternated so each card bobs at a different phase
  const floatClasses = [
    'animate-card-bob float-delay-0',
    'animate-card-bob float-delay-2',
    'animate-card-bob float-delay-1',
    'animate-card-bob float-delay-3',
  ];

  return (
    <section id="trust-section" ref={sectionRef} className="py-20 bg-mesh-soft border-y border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none" />

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section header — slides in from below */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold mb-2">
            Our Track Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
            Trusted by Individuals, Startups & MSMEs Across India
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base font-inter max-w-2xl mx-auto">Numbers that reflect our commitment to quality, accuracy, and compliance excellence across Dehradun and Pan-India</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            const currentVal = counts[stat.label] || 0;
            return (
              <div
                key={stat.label}
                className={`
                  group relative rounded-2xl glass-card glass-card-hover p-7 border-2 ${color.border}
                  transition-all duration-500 flex flex-col items-center text-center
                  cursor-default shadow-md hover:shadow-xl hover:border-amber-400/50
                  ${cardVisible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  ${floatClasses[idx]}
                `}
                style={{
                  transitionProperty: 'opacity, transform, box-shadow',
                  transitionDuration: cardVisible[idx] ? '600ms' : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className={`w-14 h-14 rounded-2xl ${color.iconBg} border ${color.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${color.icon}`} />
                </div>
                <div className={`text-4xl sm:text-5xl font-extrabold font-poppins ${color.val} tracking-tight flex items-center`}>
                  <span>{stat.prefix}</span>
                  <span>{currentVal}</span>
                  <span className="ml-0.5">{stat.suffix}</span>
                </div>
                <p className="text-sm font-semibold text-slate-600 mt-2 font-inter">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
