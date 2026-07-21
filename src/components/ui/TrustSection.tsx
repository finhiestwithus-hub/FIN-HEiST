'use client';

import React, { useRef } from 'react';
import { TRUST_STATS } from '../../data/mockData';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

const descriptions = [
"Successfully completed over 1000 Income Tax Return filings.",
"Processed more than 500 GST returns.",
"Facilitated the registration of over 100 businesses.",
"Achieved a 95% client satisfaction rating."
];

// 3D Pie Chart Math
const angles = [180, 145, 110, 75, 40];
const heights = [40, 90, 140, 200];
const Cx = 500;
const Cy = 380;
const Rx = 400;
const Ry = 140;

const colors = [
 { top: '#f59e0b', outer: '#b45309', step: '#d97706', stroke: '#f59e0b' },
 { top: '#fbbf24', outer: '#d97706', step: '#f59e0b', stroke: '#fbbf24' },
 { top: '#fcd34d', outer: '#f59e0b', step: '#fbbf24', stroke: '#fcd34d' },
 { top: '#fde68a', outer: '#fbbf24', step: '#fcd34d', rightStep: '#d97706', stroke: '#fde68a' },
];

function AnimatedNumber({ mv }: { mv: MotionValue<number> }) {
 const ref = useRef<HTMLSpanElement>(null);
 useMotionValueEvent(mv,"change", (latest) => {
 if (ref.current) {
 ref.current.textContent = Math.round(latest).toString();
 }
 });
 return <span ref={ref}>0</span>;
}

export default function TrustSection() {
 const sectionRef = useRef<HTMLElement>(null);

 // Scroll Tracking for interactive scrubbing
 const { scrollYProgress } = useScroll({
 target: sectionRef,
 offset: ["start start","end end"] // Tracks from when section hits top until you scroll through the 300vh
 });

 // Opacities for the 4 steps (staggered sequentially as you scroll)
 const opacity1 = useTransform(scrollYProgress, [0, 0.26], [0, 1], { clamp: true });
 const opacity2 = useTransform(scrollYProgress, [0.26, 0.52], [0, 1], { clamp: true });
 const opacity3 = useTransform(scrollYProgress, [0.52, 0.79], [0, 1], { clamp: true });
 const opacity4 = useTransform(scrollYProgress, [0.79, 1], [0, 1], { clamp: true });
 const opacities = [opacity1, opacity2, opacity3, opacity4];

 // Arrow & Text appearances (Each fades out and retracts before the next one appears)
 const contentOp1 = useTransform(scrollYProgress, [0.13, 0.26, 0.30, 0.39], [0, 1, 1, 0], { clamp: true });
 const contentOp2 = useTransform(scrollYProgress, [0.39, 0.52, 0.56, 0.65], [0, 1, 1, 0], { clamp: true });
 const contentOp3 = useTransform(scrollYProgress, [0.65, 0.79, 0.83, 0.90], [0, 1, 1, 0], { clamp: true });
 const contentOp4 = useTransform(scrollYProgress, [0.90, 1], [0, 1], { clamp: true });
 const contentOps = [contentOp1, contentOp2, contentOp3, contentOp4];

 // Scrubbed Numbers
 const count1 = useTransform(scrollYProgress, [0.13, 0.26], [0, TRUST_STATS[0].value], { clamp: true });
 const count2 = useTransform(scrollYProgress, [0.39, 0.52], [0, TRUST_STATS[1].value], { clamp: true });
 const count3 = useTransform(scrollYProgress, [0.65, 0.79], [0, TRUST_STATS[2].value], { clamp: true });
 const count4 = useTransform(scrollYProgress, [0.90, 1], [0, TRUST_STATS[3].value], { clamp: true });
 const counts = [count1, count2, count3, count4];

 // Pre-calculate light path
 let lightPath =`M ${Cx + Rx * Math.cos(angles[0] * Math.PI / 180)},${Cy + Ry * Math.sin(angles[0] * Math.PI / 180) - heights[0]}`;
 for (let i = 0; i < 4; i++) {
 const rad2 = angles[i + 1] * Math.PI / 180;
 const x2 = Cx + Rx * Math.cos(rad2);
 const y2 = Cy + Ry * Math.sin(rad2);
 lightPath +=` A ${Rx} ${Ry} 0 0 0 ${x2},${y2 - heights[i]}`;
 if (i < 3) {
 lightPath +=` L ${x2},${y2 - heights[i + 1]}`;
 }
 }

 // Adjust horizontal offsets to prevent text overlapping
 const textOffsetX = [-10, 85, 10, 0];

 const labels = TRUST_STATS.map((stat, i) => {
 // Original center angle of the pie slice
 const midRad = ((angles[i] + angles[i + 1]) / 2) * (Math.PI / 180);
 const originalX = Cx + Rx * Math.cos(midRad);
 
 // Shifted X coordinate to prevent overlap
 const targetX = originalX + textOffsetX[i];
 
 // Calculate the exact Y coordinate on the 3D ellipse surface at the new targetX
 const targetCos = (targetX - Cx) / Rx;
 const targetSin = Math.sqrt(1 - targetCos * targetCos);
 const targetY = Cy + Ry * targetSin - heights[i];

 return {
 ...stat,
 midX: targetX,
 midY: targetY,
 desc: descriptions[i]
 };
 });

 return (
 <section id="trust-section" ref={sectionRef} className="h-[150vh] bg-mesh-soft bg-slate-50 relative border-y border-slate-200/80">
 {/* Top Gold Accent Strip */}
 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift z-50" />
 <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
 <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 relative z-10">
 <div className="text-center mb-4 sm:mb-8 mt-12 sm:mt-0">
 <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-slate-900 tracking-tight">
 <span className="text-amber-600">Achieving Excellence</span> in Financial Services
 </h2>
 <p className="text-slate-600 mt-4 text-base sm:text-lg font-inter max-w-2xl mx-auto">
 Numbers that reflect our commitment to quality, accuracy, and compliance excellence.
 </p>
 </div>

 <div className="relative w-full aspect-[1000/600] max-w-7xl xl:max-w-[1400px] mx-auto mt-4 sm:mt-8">
 
 {/* HTML Text Overlays */}
 <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
 {labels.map((l, i) => (
 <motion.div 
 key={`text-${i}`}
 className="absolute text-center"
 style={{
 left:`${(l.midX / 1000) * 100}%`,
 top:`2%`,
 x: '-50%',
 opacity: contentOps[i]
 }}
 >
 <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-poppins text-slate-800 drop-shadow-sm flex items-center justify-center">
 {l.prefix}<AnimatedNumber mv={counts[i]} />{l.suffix}
 </div>
 <div className="text-xs sm:text-sm font-bold text-amber-600 mb-1.5 whitespace-nowrap">{l.label}</div>
 <div className="text-[10px] sm:text-xs text-slate-500 font-medium max-w-[120px] sm:max-w-[160px] mx-auto leading-snug hidden sm:block">
 {l.desc}
 </div>
 </motion.div>
 ))}
 </div>

 {/* 3D SVG Chart */}
 <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible drop-shadow-2xl">
 <defs>
 <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
 <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
 </marker>
 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
 <feGaussianBlur stdDeviation="5" result="blur" />
 <feMerge>
 <feMergeNode in="blur" />
 <feMergeNode in="blur" />
 <feMergeNode in="SourceGraphic" />
 </feMerge>
 </filter>
 </defs>

 {/* Arrows mapped to scroll progress with pathLength */}
 {labels.map((l, i) => (
 <motion.line 
 key={`arrow-${i}`} 
 x1={l.midX} 
 y1={160} 
 x2={l.midX} 
 y2={l.midY - 15} 
 stroke="#f59e0b" 
 strokeWidth="2" 
 markerEnd="url(#arrow)"
 style={{ 
 opacity: contentOps[i], 
 pathLength: contentOps[i]
 }}
 />
 ))}

 {/* Draw Slices */}
 {angles.slice(0, 4).map((_, i) => {
 const rad1 = angles[i] * (Math.PI / 180);
 const rad2 = angles[i + 1] * (Math.PI / 180);
 const x1 = Cx + Rx * Math.cos(rad1);
 const y1 = Cy + Ry * Math.sin(rad1);
 const x2 = Cx + Rx * Math.cos(rad2);
 const y2 = Cy + Ry * Math.sin(rad2);
 const h = heights[i];
 const prev_h = i === 0 ? 0 : heights[i - 1];
 const color = colors[i];

 return (
 <motion.g 
 key={`slice-${i}`} 
 style={{ 
 opacity: opacities[i]
 }}
 >
 {/* Right Step Wall (only for last slice to cap it off) */}
 {i === 3 && (
 <path d={`M ${Cx},${Cy - h} L ${x2},${y2 - h} L ${x2},${y2} L ${Cx},${Cy} Z`} fill={color.rightStep} stroke={color.rightStep} strokeWidth="1" strokeLinejoin="round" />
 )}

 {/* Left Step Wall */}
 {i > 0 && (
 <path d={`M ${Cx},${Cy - h} L ${x1},${y1 - h} L ${x1},${y1 - prev_h} L ${Cx},${Cy - prev_h} Z`} fill={color.step} stroke={color.step} strokeWidth="1" strokeLinejoin="round" />
 )}

 {/* Outer Wall */}
 <path d={`M ${x1},${y1 - h} A ${Rx} ${Ry} 0 0 0 ${x2},${y2 - h} L ${x2},${y2} A ${Rx} ${Ry} 0 0 1 ${x1},${y1} Z`} fill={color.outer} stroke={color.outer} strokeWidth="1" strokeLinejoin="round" />

 {/* Top Surface */}
 <path d={`M ${Cx},${Cy - h} L ${x1},${y1 - h} A ${Rx} ${Ry} 0 0 0 ${x2},${y2 - h} Z`} fill={color.top} stroke={color.stroke} strokeWidth="1.5" strokeLinejoin="round" />
 </motion.g>
 );
 })}

 {/* Glowing Traveling Light Animation (Scroll Linked, 100% accurate) */}
 <motion.path 
 d={lightPath} 
 fill="none" 
 stroke="#ffffff" 
 strokeWidth="5" 
 filter="url(#glow)" 
 style={{ strokeLinecap: 'round', pathLength: scrollYProgress }}
 />
 {/* Core Light line (unblurred) */}
 <motion.path 
 d={lightPath} 
 fill="none" 
 stroke="#fef3c7" 
 strokeWidth="2" 
 style={{ strokeLinecap: 'round', pathLength: scrollYProgress }}
 />
 </svg>
 </div>
 </div>
 </div>
 </section>
 );
}
