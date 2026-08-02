'use client';

import React from 'react';
import { Target, Eye, ShieldCheck, FileText, CheckCircle, Award, Users, Quote } from 'lucide-react';

interface AboutSectionProps {
    onOpenModal: (service?: string) => void;
}

export default function AboutSection({ onOpenModal }: AboutSectionProps) {
    return (
        <section id="about" className="py-16 lg:py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden scroll-mt-24">
            {/* Top Gold Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Founders */}
                    <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                        <div className="flex flex-row lg:block bg-[#0f172a] lg:bg-transparent rounded-2xl lg:rounded-none overflow-hidden lg:overflow-visible shadow-xl lg:shadow-none">
                            {/* Founders Image */}
                            <div className="w-2/5 lg:w-full lg:rounded-t-3xl overflow-hidden h-[180px] sm:h-[250px] lg:h-[500px] relative bg-slate-200 dark:bg-slate-800 shrink-0">
                                <img
                                    src="/founders.jpg"
                                    alt="FIN-Heist Founders"
                                    className="w-full h-full object-cover object-top lg:scale-105"
                                />
                                {/* Gradient overlay at bottom to blend with card */}
                                <div className="hidden lg:block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent opacity-60"></div>
                            </div>

                            {/* Meet Our Co-Founders Card */}
                            <div className="w-3/5 lg:w-auto relative lg:-mt-16 mx-0 lg:mx-4 sm:mx-8 bg-[#0f172a] dark:bg-black lg:rounded-2xl lg:border-t-4 lg:border-amber-500 lg:shadow-2xl overflow-hidden z-20 flex flex-col justify-center">
                                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500 px-6 py-1.5 rounded-b-xl shadow-md">
                                    <span className="text-slate-950 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Meet Our Co-Founders</span>
                                </div>

                                <div className="p-3 lg:pt-12 lg:pb-8 lg:px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-4 lg:divide-x lg:divide-slate-700/60 justify-center h-full">
                                    {/* Vineet */}
                                    <div className="text-center px-1 sm:px-2 flex flex-col justify-center">
                                        <div className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-amber-500/30 items-center justify-center mb-3 text-amber-500 bg-amber-500/5">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h4 className="font-bold text-[10px] lg:text-sm sm:text-base font-poppins mb-0.5 lg:mb-1" style={{ color: '#ffffff' }}>VINEET CHOUDHARY</h4>
                                        <p className="text-[9px] lg:text-xs lg:mb-0.5" style={{ color: '#cbd5e1' }}>CA Finalist<span className="hidden lg:inline"> <br />B.Com (Hons.)</span><span className="lg:hidden">, B.Com (Hons.)</span></p>
                                        <div className="hidden lg:block border-t border-slate-700/60 pt-3 mx-2 mt-4">
                                            <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Co-Founder</p>
                                        </div>
                                    </div>
                                    {/* Anshika */}
                                    <div className="text-center px-1 sm:px-2 flex flex-col justify-center border-t border-slate-700/60 lg:border-t-0 pt-3 lg:pt-0 mt-1 lg:mt-0">
                                        <div className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-amber-500/30 items-center justify-center mb-3 text-amber-500 bg-amber-500/5">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h4 className="font-bold text-[10px] lg:text-sm sm:text-base font-poppins mb-0.5 lg:mb-1" style={{ color: '#ffffff' }}>ANSHIKA SAHU</h4>
                                        <p className="text-[9px] lg:text-xs lg:mb-0.5" style={{ color: '#cbd5e1' }}>CA Finalist<span className="hidden lg:inline"> <br />B.Com., M.Com.</span><span className="lg:hidden">, B.Com, M.Com</span></p>
                                        <div className="hidden lg:block border-t border-slate-700/60 pt-3 mx-2 mt-4">
                                            <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Co-Founder</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Bar under Founders */}
                        <div className="mt-4 lg:mt-6 mx-0 lg:mx-4 sm:mx-8 bg-[#fdfbf6] rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 relative z-20">
                            <div className="grid grid-cols-3 divide-x divide-amber-900/10">
                                <div className="p-2 sm:p-4 text-center flex flex-col items-center justify-start">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-amber-600 mb-1 sm:mb-2 border border-amber-600/30 bg-white shadow-sm">
                                        <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <h3 className="text-sm sm:text-2xl font-extrabold font-poppins mb-1 leading-none" style={{ color: '#0f172a' }}>1,600+</h3>
                                    <p className="font-semibold text-[8px] sm:text-[12px] mb-0.5 leading-tight" style={{ color: '#1e293b' }}>Combined Filings <br className="hidden sm:block" />& Reports</p>
                                    <p className="text-[7px] sm:text-[10px] mt-0.5" style={{ color: '#475569' }}>Across 18+ States</p>
                                </div>
                                <div className="p-2 sm:p-4 text-center flex flex-col items-center justify-start">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-amber-600 mb-1 sm:mb-2 border border-amber-600/30 bg-white shadow-sm">
                                        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <h3 className="text-sm sm:text-2xl font-extrabold font-poppins mb-1 leading-none" style={{ color: '#0f172a' }}>99.8%</h3>
                                    <p className="font-semibold text-[8px] sm:text-[12px] mb-0.5 leading-tight" style={{ color: '#1e293b' }}>Statutory <br className="hidden sm:block" />Compliance</p>
                                    <p className="text-[7px] sm:text-[10px] mt-0.5" style={{ color: '#475569' }}>Zero Department Penalties</p>
                                </div>
                                <div className="p-2 sm:p-4 text-center flex flex-col items-center justify-start">
                                    <div className="w-6 h-6 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center text-amber-600 mb-1 sm:mb-2 border border-amber-600/30 bg-white shadow-sm">
                                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                    <h3 className="text-[9px] sm:text-base leading-tight font-extrabold font-poppins mb-1" style={{ color: '#0f172a' }}>SaaS Rigor </h3>
                                    <p className="font-medium text-[7px] sm:text-[11px] leading-snug hidden sm:block" style={{ color: '#1e293b' }}>Modern Technology <br />Meets Practical <br />Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="mb-8">
                            <h3 className="text-2xl sm:text-3xl italic text-amber-600 mb-2 font-medium">About Us</h3>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-slate-900 mb-6 leading-[1.1]">
                                About <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">Fin-Heist</span>
                            </h2>
                            <p className="text-slate-700 text-base sm:text-lg mb-4 font-medium leading-relaxed">
                                Fin-Heist is a modern finance, taxation and business compliance firm dedicated to simplifying regulatory requirements for individuals, startups, MSMEs, and growing businesses.
                            </p>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                The firm is led by two CA Finalists in partnership, bringing deep domain experience across Income Tax Filing, GST Compliance, Business Registrations, Accounting & Bookkeeping, TDS Compliance, Financial Documentation, and Bank Loan Assistance.
                            </p>
                        </div>

                        {/* Core Cards */}
                        <div className="space-y-4">
                            {/* Mission */}
                            <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start relative overflow-hidden group">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-amber-500/10 flex-shrink-0 flex items-center justify-center border border-amber-500/30 text-amber-600">
                                    <Target className="w-5 h-5 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-1.5 sm:mb-2 mt-0.5 sm:mt-0">Our Mission</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        To deliver high-quality, value-driven financial and compliance solutions that transform regulatory tasks from stressful hurdles into seamless operational checkpoints.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start relative overflow-hidden group">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-amber-500/10 flex-shrink-0 flex items-center justify-center border border-amber-500/30 text-amber-600">
                                    <Eye className="w-5 h-5 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-1.5 sm:mb-2 mt-0.5 sm:mt-0">Our Vision</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        To become India's most trusted and technologically advanced financial services firm where every entrepreneur, freelancer, and enterprise enjoys enterprise-grade financial clarity.
                                    </p>
                                </div>
                            </div>

                            {/* Core Values */}
                            <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start relative overflow-hidden group">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-amber-500/10 flex-shrink-0 flex items-center justify-center border border-amber-500/30 text-amber-600">
                                    <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm mb-2 sm:mb-4 mt-0.5 sm:mt-0">Our Core Values</h4>
                                    <ul className="space-y-3 sm:space-y-4">
                                        <li className="flex items-start gap-2 sm:gap-3">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 bg-emerald-500/10 rounded-full mt-0.5 sm:mt-0" />
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed"><span className="font-bold text-slate-800">Transparency First:</span> Fixed fees with zero hidden surprises.</p>
                                        </li>
                                        <li className="flex items-start gap-2 sm:gap-3">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 bg-emerald-500/10 rounded-full mt-0.5 sm:mt-0" />
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed"><span className="font-bold text-slate-800">Timely Execution:</span> Respect for statutory timing & deadlines.</p>
                                        </li>
                                        <li className="flex items-start gap-2 sm:gap-3">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 bg-emerald-500/10 rounded-full mt-0.5 sm:mt-0" />
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed"><span className="font-bold text-slate-800">Practical Solutions:</span> Real-world financial advice tailored to your growth.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM QUOTE BANNER */}
                <div className="mt-8 bg-[#0f172a] dark:bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-20">
                    <div className="flex-1 p-5 sm:p-8 relative flex items-center justify-center min-h-[140px] sm:min-h-[180px]">
                        {/* Decorative background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>

                        <Quote className="absolute top-2 left-2 sm:top-4 sm:left-4 w-6 h-6 sm:w-10 sm:h-10 text-slate-800/80 rotate-180 pointer-events-none" />
                        <h3 className="text-[15px] sm:text-2xl lg:text-3xl font-poppins font-semibold text-center leading-[1.4] relative z-10 max-w-3xl px-4 sm:px-6" style={{ color: '#ffffff' }}>
                            "At Fin-Heist, we believe finance should be simple, compliant, and growth-oriented."
                        </h3>
                        <Quote className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-10 sm:h-10 text-slate-800/80 pointer-events-none" />
                    </div>
                    <div className="w-full lg:w-[320px] bg-slate-900 p-5 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col items-center justify-center relative">
                        <div className="flex items-center gap-2 sm:gap-3 text-amber-500 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Connect With</p>
                                <p className="text-base sm:text-xl font-extrabold font-poppins text-white tracking-tight">LEADERSHIP</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-[11px] sm:text-xs text-center mb-4 max-w-[200px] leading-relaxed">
                            Let's build a financially stronger tomorrow together.
                        </p>
                        <button
                            onClick={() => onOpenModal()}
                            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2 sm:py-2.5 px-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.6)] text-xs sm:text-sm"
                        >
                            Book Free Consultation
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
