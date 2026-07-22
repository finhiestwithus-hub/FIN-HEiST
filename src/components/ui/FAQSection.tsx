'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FAQ_ITEMS } from '../../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

export default function FAQSection() {
    const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState<boolean[]>([]);
    const [ctaVisible, setCtaVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observe = (el: HTMLElement | null, onEnter: () => void, onLeave: () => void, margin = '0px 0px -40px 0px') => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) { onEnter(); } else { onLeave(); } },
                { threshold: 0.08, rootMargin: margin }
            );
            obs.observe(el);
            return () => obs.disconnect();
        };

        observe(headerRef.current, () => setHeaderVisible(true), () => setHeaderVisible(false));
        observe(listRef.current, () => {
            FAQ_ITEMS.forEach((_, i) => {
                setTimeout(() => setItemVisible(prev => { const n = [...prev]; n[i] = true; return n; }), i * 80);
            });
        }, () => setItemVisible([]));
        observe(ctaRef.current, () => setCtaVisible(true), () => setCtaVisible(false));
    }, []);

    const toggleAccordion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
            {/* Top strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-3xl mx-auto space-y-3 mb-14 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-slate-600 font-inter">
                        Everything you need to know about our statutory workflows, turnaround speeds, and digital pan-India consultation.
                    </p>
                </div>

                {/* Accordion */}
                <div ref={listRef} className="space-y-3">
                    {FAQ_ITEMS.map((faq, idx) => {
                        const isOpen = openId === faq.id;
                        const isItemVisible = !!itemVisible[idx];
                        return (
                            <div
                                key={faq.id}
                                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${isOpen
                                        ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                                        : 'glass-card glass-card-hover border-slate-200/80 hover:border-amber-400/60 shadow-sm'
                                    } ${isItemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(faq.id)}
                                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-poppins text-base font-bold text-slate-900 hover:text-amber-700 transition-colors"
                                >
                                    <span className="flex items-center gap-3 flex-1">
                                        <span className={`text-xs font-bold shrink-0 px-2.5 py-1 rounded-lg border font-mono ${isOpen ? 'bg-amber-500/20 text-amber-800 border-amber-400/50' : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {faq.category}
                                        </span>
                                        <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 font-inter leading-relaxed animate-fadeIn border-t border-amber-300/50 pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Still Have Questions CTA */}
                <div
                    ref={ctaRef}
                    className={`mt-12 p-8 rounded-3xl glass-card border-2 border-amber-500/40
 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.18)]
 transition-all duration-700 ease-out
 ${ctaVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}
`}
                >
                    <div className="text-left">
                        <h4 className="text-xl font-bold font-poppins text-slate-900">Still have specific compliance questions?</h4>
                        <p className="text-sm text-slate-600 font-medium mt-1">Chat directly with our specialists on WhatsApp for instant guidance.</p>
                    </div>
                    <a
                        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 shrink-0 transition-all transform hover:-translate-y-0.5"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
