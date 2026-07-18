'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { Mail, CheckCircle2, Award, Shield, ArrowRight } from 'lucide-react';

interface LeadershipSectionProps {
  onOpenModal: (service?: string) => void;
}

export default function LeadershipSection({ onOpenModal }: LeadershipSectionProps) {
  const founders = TEAM_MEMBERS.filter(t => !t.isAdvisory);
  const advisors = TEAM_MEMBERS.filter(t => t.isAdvisory);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [founderVisible, setFounderVisible] = useState<boolean[]>([]);
  const [advisorVisible, setAdvisorVisible] = useState<boolean[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const advisorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observe = (el: HTMLElement | null, onEnter: () => void, onLeave: () => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { onEnter(); } else { onLeave(); } },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      obs.observe(el);
      return () => obs.disconnect();
    };

    observe(headerRef.current, () => setHeaderVisible(true), () => setHeaderVisible(false));
    observe(founderRef.current, () => {
      founders.forEach((_, i) => {
        setTimeout(() => setFounderVisible(prev => { const n = [...prev]; n[i] = true; return n; }), i * 150);
      });
    }, () => setFounderVisible([]));
    observe(advisorRef.current, () => {
      advisors.forEach((_, i) => {
        setTimeout(() => setAdvisorVisible(prev => { const n = [...prev]; n[i] = true; return n; }), i * 120);
      });
    }, () => setAdvisorVisible([]));
  }, []);

  return (
    <section id="leadership" className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
      {/* Top strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto space-y-4 mb-14 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-bold text-amber-800 animate-card-tilt">
            <Award className="w-4 h-4 text-amber-500" />
            <span>CA Finalist Led Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
            Meet Our <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
            Led by dedicated CA Finalists in partnership, combined with a distinguished Advisory Board of experienced Chartered Accountants.
          </p>
        </div>

        {/* Core Founders Grid */}
        <div ref={founderRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {founders.map((member, idx) => {
            const colors = ['border-t-amber-500', 'border-t-yellow-500'];
            const accentColors = ['text-amber-700', 'text-yellow-700'];
            const bgColors = ['bg-amber-500/15 border-amber-500/30', 'bg-yellow-500/15 border-yellow-500/30'];
            const isVisible = !!founderVisible[idx];
            return (
              <div
                key={member.id}
                className={`group relative glass-card glass-card-hover rounded-3xl border border-slate-200/80 border-t-4
                  ${colors[idx % colors.length]} hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/25
                  shadow-md overflow-hidden flex flex-col
                  transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02]
                  animate-card-bob float-delay-${idx}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'}
                `}
              >
                {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0" />

                <div className="p-6 sm:p-8 flex flex-col h-full relative z-10">

                  {/* Avatar + Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-20 h-20 rounded-2xl ${bgColors[idx % bgColors.length]} border flex items-center justify-center text-2xl font-extrabold font-poppins ${accentColors[idx % accentColors.length]} shadow-sm relative shrink-0`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="CA Finalist">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </span>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold font-poppins text-slate-900 group-hover:${accentColors[idx % accentColors.length]} transition-colors`}>
                          {member.name}
                        </h3>
                        <p className={`text-sm font-semibold ${accentColors[idx % accentColors.length]} mt-0.5`}>
                          {member.role}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{member.qualifications}</p>
                      </div>
                    </div>

                    {/* Social buttons */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <a
                        href={member.linkedin || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-600 text-slate-600 hover:text-white transition-all border border-slate-200"
                        title={`LinkedIn: ${member.name}`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.67a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                        </svg>
                      </a>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white transition-all border border-slate-200"
                          title={`Email: ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 font-inter leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-2 mb-5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Core Expertise:</span>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-800"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <button
                      onClick={() => onOpenModal(`Direct Consultation with ${member.name}`)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/35 border border-amber-300/40 group/btn"
                    >
                      <span>Consult with {member.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Board */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
              Statutory & Governance Advisory
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900 mt-2">
              Our Advisory Board & CA Network
            </h3>
            <p className="text-sm text-slate-500 mt-2 font-inter">
              For matters requiring statutory audit, attestation, or specialized corporate compliance, we operate with authoritative Chartered Accountant advisors.
            </p>
          </div>

          <div ref={advisorRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((adv, idx) => {
              const borderColors = ['border-t-amber-500', 'border-t-yellow-500', 'border-t-amber-600'];
              const isVisible = !!advisorVisible[idx];
              return (
                <div
                  key={adv.id}
                  className={`group relative glass-card glass-card-hover rounded-3xl border border-slate-200/80 border-t-4
                    ${borderColors[idx % borderColors.length]}
                    p-6 space-y-4 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 shadow-md flex flex-col justify-between
                    transition-all duration-700 ease-out transform hover:-translate-y-2.5 hover:scale-[1.02]
                    animate-card-diagonal float-delay-${idx + 2}
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                >
                  {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-800 font-mono text-[11px] font-bold border border-amber-500/30">
                        Chartered Accountant
                      </span>
                      <Shield className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-bold font-poppins text-slate-900">{adv.name}</h4>
                    <p className="text-xs text-emerald-600 font-semibold font-mono mt-0.5">{adv.role}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{adv.qualifications}</p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">{adv.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {adv.expertise.slice(0, 3).map((exp, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] text-slate-600 border border-slate-200 font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
