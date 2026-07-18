'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Target, Eye, Heart, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenModal: (service?: string) => void;
}

export default function AboutSection({ onOpenModal }: AboutSectionProps) {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observe = (el: HTMLElement | null, onEnter: () => void, onLeave: () => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { onEnter(); } else { onLeave(); } },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };
    observe(leftRef.current, () => setLeftVisible(true), () => setLeftVisible(false));
    observe(rightRef.current, () => setRightVisible(true), () => setRightVisible(false));
  }, []);

  return (
    <section id="about" className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
      {/* Top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

      {/* Light background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Practice Profile Card — slides from left */}
          <div
            ref={leftRef}
            className={`lg:col-span-6 relative transition-all duration-700 ease-out animate-card-bob float-delay-1 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Background photo */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                  alt="Fin-Heist CA Practice"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-mono font-bold uppercase tracking-wider opacity-80">Fin-Heist CA Practice</p>
                    <p className="text-white text-sm font-bold font-poppins">Dehradun & Pan-India</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
                    Est. 2023
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 space-y-5">
                {/* Guiding Principle */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xs font-bold text-amber-800 font-mono uppercase tracking-wider mb-2">Our Guiding Principle</p>
                  <p className="text-base font-semibold text-slate-900 italic leading-relaxed">
                    &ldquo;At Fin-Heist, we believe finance should be simple, compliant, and growth-oriented.&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-amber-500/20 mt-2">
                    <span>Led by Dual CA Finalists</span>
                    <span className="text-emerald-600 font-semibold">100% Client-Centric ✓</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: '1,600+', label: 'Combined Filings & Reports', sub: 'Across 18+ States', color: 'amber' },
                    { val: '99.8%', label: 'Statutory Compliance', sub: 'Zero Department Penalties', color: 'emerald' },
                  ].map(item => (
                    <div key={item.val} className={`p-4 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/30 space-y-1`}>
                      <div className={`text-2xl font-extrabold font-poppins text-${item.color}-700`}>{item.val}</div>
                      <div className="text-xs font-semibold text-slate-700">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Award badge */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600 shrink-0" />
                  <div className="text-sm text-slate-700">
                    <strong className="text-slate-900 block">SaaS Rigor + CA Expertise</strong>
                    Modern technology workflows combined with practical experience across Income Tax, GST, and Banking.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: About Content — slides from right */}
          <div
            ref={rightRef}
            className={`lg:col-span-6 space-y-8 transition-all duration-700 ease-out delay-150 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >

            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
                About <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">Fin-Heist</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
                Fin-Heist is a modern finance, taxation and business compliance firm dedicated to simplifying regulatory requirements for individuals, startups, MSMEs, and growing businesses.
              </p>
              <p className="text-sm text-slate-500 font-inter leading-relaxed">
                The firm is led by two CA Finalists in partnership, bringing deep domain experience across Income Tax Filing, GST Compliance, Business Registrations, Accounting & Bookkeeping, TDS Compliance, Financial Documentation, and Bank Loan Assistance.
              </p>
            </div>

            {/* Mission, Vision, Values */}
            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  desc: 'To deliver high-quality, value-driven financial and compliance solutions that transform regulatory tasks from stressful hurdles into seamless operational checkpoints.',
                  color: 'blue',
                },
                {
                  icon: Eye,
                  title: 'Our Vision',
                  desc: "To become India's most trusted and technologically advanced financial services firm where every entrepreneur, freelancer, and enterprise enjoys enterprise-grade financial clarity.",
                  color: 'indigo',
                },
                {
                  icon: Heart,
                  title: 'Our Core Values',
                  desc: null,
                  values: [
                    { label: 'Transparency First', text: 'Fixed fees with zero hidden surprises.' },
                    { label: 'Timely Execution', text: 'Respect for statutory filing deadlines.' },
                    { label: 'Practical Solutions', text: 'Real-world financial advice tailored to your growth.' },
                  ],
                  color: 'emerald',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl glass-card glass-card-hover border border-slate-200/80 hover:border-amber-400/50 shadow-sm hover:shadow-lg transition-all flex items-start gap-4 ${
                      idx === 0 ? 'animate-card-diagonal float-delay-1' : idx === 1 ? 'animate-card-bob float-delay-3' : 'animate-card-tilt float-delay-5'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0 font-bold`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-base font-bold font-poppins text-slate-900 mb-1`}>{item.title}</h4>
                      {item.desc && (
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      )}
                      {item.values && (
                        <ul className="space-y-1 mt-1">
                          {item.values.map(v => (
                            <li key={v.label} className="text-sm text-slate-600 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span><strong className="text-slate-800">{v.label}:</strong> {v.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onOpenModal('Schedule Introductory Call')}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm shadow-xl shadow-amber-500/35 flex items-center gap-2 transition-all transform hover:-translate-y-1 border border-amber-300/40 group animate-card-pulse"
            >
              <span>Connect with Leadership</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
