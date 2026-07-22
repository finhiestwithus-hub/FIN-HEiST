'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Receipt, AlertTriangle } from 'lucide-react';

export default function GSTCalculator() {
  const [gstAmount, setGstAmount] = useState<number>(100000);
  const [gstRate, setGstRate] = useState<number>(18); // 5, 12, 18, 28
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  // GST Calculation
  let baseAmount = 0, totalGst = 0, cgst = 0, sgst = 0, finalAmount = 0;
  if (gstType === 'exclusive') {
    baseAmount = gstAmount;
    totalGst = baseAmount * (gstRate / 100);
    cgst = totalGst / 2;
    sgst = totalGst / 2;
    finalAmount = baseAmount + totalGst;
  } else {
    finalAmount = gstAmount;
    baseAmount = finalAmount / (1 + (gstRate / 100));
    totalGst = finalAmount - baseAmount;
    cgst = totalGst / 2;
    sgst = totalGst / 2;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-6 border border-amber-500/20">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          GST Invoice <span className="text-amber-600">Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Quickly compute CGST, SGST, and total invoice amounts. Easily switch between inclusive and exclusive tax modes for accurate billing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white h-full">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-500" />
              Invoice Details
            </h3>
            
            <div className="space-y-8">
              {/* Amount Input */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Invoice Amount (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold">₹</span>
                  </div>
                  <input
                    type="number"
                    value={gstAmount || ''}
                    onChange={(e) => setGstAmount(Number(e.target.value))}
                    className="w-full pl-10 p-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-mono font-bold text-xl text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all"
                    placeholder="e.g. 100000"
                  />
                </div>
              </div>

              {/* Rate & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">GST Rate (%)</label>
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

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Tax Mode</label>
                  <select
                    value={gstType}
                    onChange={(e) => setGstType(e.target.value as 'inclusive' | 'exclusive')}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="exclusive">Exclusive (+GST)</option>
                    <option value="inclusive">Inclusive (in Total)</option>
                  </select>
                </div>
              </div>

              {/* Visual Toggles for Tax Mode */}
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button 
                  onClick={() => setGstType('exclusive')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${gstType === 'exclusive' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Add GST (Exclusive)
                </button>
                <button 
                  onClick={() => setGstType('inclusive')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${gstType === 'inclusive' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Remove GST (Inclusive)
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-amber-50/30 h-full flex flex-col justify-center relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="w-48 h-48" />
            </div>

            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-8 relative z-10">
              Tax Computation Summary
            </h3>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm space-y-4 relative z-10">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-slate-600">Base Taxable Amount</span>
                <span className="font-mono font-bold text-slate-900">₹{formatINR(baseAmount)}</span>
              </div>
              
              <div className="pl-4 border-l-2 border-amber-200 space-y-3 py-2 my-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">CGST ({gstRate / 2}%)</span>
                  <span className="font-mono font-bold text-amber-600">+ ₹{formatINR(cgst)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">SGST ({gstRate / 2}%)</span>
                  <span className="font-mono font-bold text-amber-600">+ ₹{formatINR(sgst)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Total GST Amount</span>
                <span className="font-mono font-bold text-amber-600">₹{formatINR(totalGst)}</span>
              </div>

              <div className="pt-6 mt-4 border-t-2 border-slate-200 border-dashed">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-slate-900">Total Invoice Value</span>
                  <span className="text-3xl font-mono font-extrabold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                    ₹{formatINR(finalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/?contact=gst" className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 relative z-10">
              Consult for GST Filing & Registration
            </Link>

          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> This calculator provides a basic mathematical estimation of GST based on the input amounts and selected rates. It does not determine the correct HSN/SAC code, applicability of GST, or eligibility for Input Tax Credit (ITC). For accurate billing, e-invoicing compliance, and official GST return filing, please consult our qualified tax professionals.
        </p>
      </div>

    </div>
  );
}
