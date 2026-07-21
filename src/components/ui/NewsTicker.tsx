'use client';

import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { NewsItem } from '../../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function NewsTicker() {
 const [news, setNews] = useState<NewsItem[]>([]);

 useEffect(() => {
 async function fetchNews() {
 if (!isSupabaseConfigured()) return;
 try {
 const { data, error } = await supabase
 .from('news_ticker')
 .select('*')
 .order('created_at', { ascending: false });
 if (!error && data) {
 setNews(data);
 }
 } catch (e) {
 console.error(e);
 }
 }
 fetchNews();
 }, []);

 if (news.length === 0) return null;

 // Duplicate items enough times to fill an ultra-wide screen so one block is wider than the screen
 const baseItems = [...news, ...news, ...news, ...news, ...news, ...news];

 return (
 <div className="w-full bg-slate-950/95 backdrop-blur-xl text-white overflow-hidden border-y border-amber-500/30 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] relative z-50 flex items-stretch h-14 sm:h-16">
 
 {/* Premium Badge */}
 <div className="px-6 sm:px-10 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-sm sm:text-[15px] uppercase tracking-[0.2em] shrink-0 z-10 shadow-[8px_0_20px_-5px_rgba(245,158,11,0.3)] relative flex items-center justify-center border-r border-amber-400/50">
 <span className="flex items-center gap-2.5">
 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
 Daily News
 </span>
 <div className="absolute top-0 right-[-16px] w-0 h-0 border-t-[28px] sm:border-t-[32px] border-t-transparent border-l-[16px] border-l-amber-600 border-b-[28px] sm:border-b-[32px] border-b-transparent hidden sm:block"></div>
 </div>
 
 {/* Scrolling Marquee */}
 <div className="flex-1 overflow-hidden relative flex items-center mask-image-edges">
 <style dangerouslySetInnerHTML={{ __html:`
 @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
 
 .font-montserrat {
 font-family: 'Montserrat', sans-serif;
 }

 @keyframes slideMarquee {
 0% { transform: translateX(0); }
 100% { transform: translateX(-100%); }
 }
 .animate-marquee-block {
 animation: slideMarquee 40s linear infinite;
 }
 .marquee-container:hover .animate-marquee-block {
 animation-play-state: paused;
 }
 .mask-image-edges {
 -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
 mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
 }
`}} />
 <div className="flex w-max marquee-container items-center h-full">
 {[0, 1].map((blockIdx) => (
 <div key={blockIdx} className="flex items-center gap-12 pr-12 animate-marquee-block shrink-0 h-full">
 {baseItems.map((item, i) => (
 <div key={`${item.id}-${i}`} className="flex items-center shrink-0">
 {item.link ? (
 <a href={item.link} target="_blank" rel="noreferrer" className="text-[17px] sm:text-[19px] font-semibold font-montserrat text-slate-100 hover:text-amber-400 transition-all duration-300 hover:scale-[1.01] flex items-center gap-4 group">
 <span className="flex h-2.5 w-2.5 relative">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
 </span>
 {item.headline}
 <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
 </a>
 ) : (
 <span className="text-[17px] sm:text-[19px] font-semibold font-montserrat text-slate-200 flex items-center gap-4">
 <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
 {item.headline}
 </span>
 )}
 </div>
 ))}
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
