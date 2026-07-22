'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, AlertTriangle, Layers } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function GSTPriceCalculator() {
  const [baseCost, setBaseCost] = useState<number>(10000);
  const [marginPercent, setMarginPercent] = useState<number>(25);
  const [gstRate, setGstRate] = useState<number>(18);

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  // Math Logic
  const profitMargin = baseCost * (marginPercent / 100);
  const sellingPriceBase = baseCost + profitMargin;
  const gstAmount = sellingPriceBase * (gstRate / 100);
  const finalSellingPrice = sellingPriceBase + gstAmount;

  // Chart Data
  const chartData = [
    { name: 'Base Cost', value: baseCost, color: '#3b82f6' }, // blue-500
    { name: 'Profit Margin', value: profitMargin, color: '#10b981' }, // emerald-500
    { name: 'GST Amount', value: gstAmount, color: '#f59e0b' } // amber-500
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-6 border border-amber-500/20">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          GST Product Price <span className="text-amber-600">& Margin Finder</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Calculate the perfect selling price for your products. Enter your purchase cost and desired profit margin to instantly compute the selling price and GST.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white h-full">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              Cost & Margin Details
            </h3>
            
            <div className="space-y-8">
              
              {/* Base Cost */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Base/Purchase Cost</span>
                  <div className="relative w-1/3 sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">₹</span>
                    </div>
                    <input 
                      type="number"
                      value={baseCost || ''} 
                      onChange={(e) => setBaseCost(Number(e.target.value))}
                      className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="1000" 
                  value={baseCost} 
                  onChange={(e) => setBaseCost(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
              </div>

              {/* Profit Margin */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Desired Profit Margin (%)</span>
                  <div className="relative w-1/3 sm:w-1/4">
                    <input 
                      type="number"
                      value={marginPercent || ''} 
                      onChange={(e) => setMarginPercent(Number(e.target.value))}
                      className="w-full pr-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="1" 
                  value={marginPercent} 
                  onChange={(e) => setMarginPercent(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
              </div>

              {/* GST Rate */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Applicable GST Rate (%)</label>
                <select
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value={0}>0% (Exempt)</option>
                  <option value={0.1}>0.1%</option>
                  <option value={0.25}>0.25%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={12}>12%</option>
                  <option value={18}>18%</option>
                  <option value={28}>28%</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 h-full flex flex-col relative overflow-hidden">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Pricing Breakdown
            </h3>

            <div className="flex-1 flex flex-col justify-center">
              
              {/* Highlight Box */}
              <div className="text-center mb-8">
                <p className="text-slate-500 font-bold text-sm mb-2">Final Selling Price (Incl. GST)</p>
                <div className="text-4xl sm:text-5xl font-mono font-extrabold text-blue-600 tracking-tight">
                  ₹{formatINR(finalSellingPrice)}
                </div>
              </div>

              {/* Chart & Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
                
                {/* Donut Chart */}
                <div className="w-48 h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => `₹${formatINR(value)}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend & Breakdown */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Base Cost
                    </div>
                    <div className="text-lg font-mono font-bold text-slate-900 pl-5">
                      ₹{formatINR(baseCost)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      Profit Margin ({marginPercent}%)
                    </div>
                    <div className="text-lg font-mono font-bold text-emerald-600 pl-5">
                      + ₹{formatINR(profitMargin)}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-500 mb-1">Pre-Tax Selling Price</div>
                    <div className="text-xl font-mono font-bold text-slate-900">
                      ₹{formatINR(sellingPriceBase)}
                    </div>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      GST Amount ({gstRate}%)
                    </div>
                    <div className="text-lg font-mono font-bold text-amber-600 pl-5">
                      + ₹{formatINR(gstAmount)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
