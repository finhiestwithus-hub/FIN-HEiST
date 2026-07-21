'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
 const [currentIndex, setCurrentIndex] = useState(0);
 const sectionRef = useRef(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 } else {
 setIsVisible(false);
 }
 },
 { threshold: 0.1 }
 );

 if (sectionRef.current) {
 observer.observe(sectionRef.current);
 }

 return () => {
 observer.disconnect();
 };
 }, []);

 useEffect(() => {
 const timer = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
 }, 6000);
 return () => clearInterval(timer);
 }, []);

 const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
 const handleNext = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
 const currentRev = TESTIMONIALS[currentIndex];

 return (
 <section id="testimonials" ref={sectionRef} className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
 {/* Top strip */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

 {/* Background pattern */}
 <div
 className="absolute inset-0 opacity-[0.03] pointer-events-none"
 style={{
 backgroundImage:`radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)`,
 backgroundSize: '32px 32px',
 }}
 />

 <div
 className={`max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 transition-all duration-700 ease-out ${
 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
 }`}
 >

 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-sm font-bold text-amber-700">
 <Sparkles className="w-4 h-4" />
 <span>Verified Client Feedback</span>
 </div>
 <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900">
 What Founders & Businesses Say
 </h2>
 <p className="text-base text-slate-600 font-inter">
 Read why over 1,000+ taxpayers, growing MSMEs, and startups trust Fin-Heist for compliance and bank loan reports.
 </p>
 </div>

 {/* Testimonial Carousel */}
 <div className="max-w-4xl mx-auto relative">

 <div className="group relative glass-card glass-card-hover rounded-3xl border-2 border-amber-500/30 shadow-2xl p-8 sm:p-12 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2.5 hover:scale-[1.015] hover:shadow-[0_25px_70px_-15px_rgba(245,158,11,0.25)]">
 {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-0" />

 {/* Big quote mark */}
 <Quote className="absolute top-6 right-8 w-20 h-20 text-amber-500/15 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />

 <div className="space-y-6 relative z-10">
 {/* Stars */}
 <div className="flex items-center gap-1">
 {[...Array(currentRev.rating)].map((_, i) => (
 <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
 ))}
 <span className="ml-3 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
 {currentRev.serviceUsed}
 </span>
 </div>

 {/* Review */}
 <p className="text-lg sm:text-xl md:text-2xl font-inter text-slate-800 leading-relaxed italic">
 &ldquo;{currentRev.content}&rdquo;
 </p>

 {/* Author */}
 <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
 <div>
 <h4 className="text-lg font-bold font-poppins text-slate-900">{currentRev.name}</h4>
 <p className="text-sm font-semibold text-amber-700 font-inter">{currentRev.role} • {currentRev.company}</p>
 <p className="text-xs text-slate-400 font-mono mt-0.5">📍 {currentRev.location}</p>
 </div>

 <div className="flex items-center gap-2">
 <button
 onClick={handlePrev}
 className="w-11 h-11 rounded-full bg-slate-100 hover:bg-amber-600 text-slate-600 hover:text-white border border-slate-200 hover:border-amber-600 flex items-center justify-center transition-all shadow-sm"
 aria-label="Previous Review"
 >
 <ChevronLeft className="w-5 h-5" />
 </button>
 <button
 onClick={handleNext}
 className="w-11 h-11 rounded-full bg-slate-100 hover:bg-amber-600 text-slate-600 hover:text-white border border-slate-200 hover:border-amber-600 flex items-center justify-center transition-all shadow-sm"
 aria-label="Next Review"
 >
 <ChevronRight className="w-5 h-5" />
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Dots */}
 <div className="flex items-center justify-center gap-2 mt-6">
 {TESTIMONIALS.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setCurrentIndex(idx)}
 className={`h-2 rounded-full transition-all duration-300 ${
 currentIndex === idx ? 'w-8 bg-amber-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
 }`}
 aria-label={`Go to slide ${idx + 1}`}
 />
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
