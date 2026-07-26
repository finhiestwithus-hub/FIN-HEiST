"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GSTCalculator() {
  const [amount, setAmount] = useState<string>('10000');
  const [gstRate, setGstRate] = useState<number>(18);
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [stateType, setStateType] = useState<'intra' | 'inter'>('intra');

  // Calculation Logic
  const results = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const rate = gstRate / 100;
    
    let basePrice = 0;
    let totalGst = 0;
    let finalAmount = 0;

    if (calcType === 'exclusive') {
      basePrice = numAmount;
      totalGst = numAmount * rate;
      finalAmount = numAmount + totalGst;
    } else {
      basePrice = numAmount / (1 + rate);
      totalGst = numAmount - basePrice;
      finalAmount = numAmount;
    }

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (stateType === 'intra') {
      cgst = totalGst / 2;
      sgst = totalGst / 2;
    } else {
      igst = totalGst;
    }

    return {
      basePrice,
      totalGst,
      finalAmount,
      cgst,
      sgst,
      igst
    };
  }, [amount, gstRate, calcType, stateType]);

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-slate-50">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=gst#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                GST Calculator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base">
              Calculate Goods and Services Tax seamlessly. Supports inclusive/exclusive modes, all tax slabs (including the new 40% rate), and Intra-State / Inter-State splits.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-8 items-start relative">
        
        {/* LEFT PANEL - Inputs */}
        <div className="xl:col-span-7 space-y-6">
          
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xl shadow-slate-200/50">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-200">1</span>
              <div>
                <h2 className="font-bold text-slate-900">Transaction Details</h2>
                <p className="text-xs text-slate-500">Enter the amount and select calculation type</p>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              
              {/* Type Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Calculation Mode</label>
                <div className="flex p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setCalcType('exclusive')}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                      calcType === 'exclusive' 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    GST Exclusive (+ Add GST)
                  </button>
                  <button
                    onClick={() => setCalcType('inclusive')}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                      calcType === 'inclusive' 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    GST Inclusive (- Remove GST)
                  </button>
                </div>
              </div>

              {/* Amount & State Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    {calcType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-lg font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Location of Sale</label>
                  <div className="flex p-1 bg-slate-100 rounded-xl h-[60px]">
                    <button
                      onClick={() => setStateType('intra')}
                      className={`flex-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                        stateType === 'intra' 
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Intra-State (Same)
                    </button>
                    <button
                      onClick={() => setStateType('inter')}
                      className={`flex-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                        stateType === 'inter' 
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Inter-State (Diff)
                    </button>
                  </div>
                </div>
              </div>

              {/* GST Rate */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">GST Rate Slab</label>
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {[0, 3, 5, 12, 18, 28, 40].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        gstRate === rate 
                          ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-slate-50'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
                {gstRate === 12 || gstRate === 28 ? (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Note: 12% and 28% slabs were abolished for most goods starting Sept 2025.
                  </p>
                ) : gstRate === 40 ? (
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> The 40% slab applies to luxury and sin goods effective Sept 2025.
                  </p>
                ) : null}
              </div>

            </div>
          </div>
          
        </div>

        {/* RIGHT PANEL - Results */}
        <div className="xl:col-span-5 lg:sticky lg:top-[100px]">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col h-full">
            
            <div className="bg-slate-900 p-6 sm:p-8 text-white">
              <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Total Final Amount</h3>
              <div className="text-2xl sm:text-4xl sm:text-5xl font-extrabold font-poppins text-white mb-2">
                {formatINR(results.finalAmount)}
              </div>
              <p className="text-sm text-slate-400">
                {calcType === 'exclusive' ? 'Base Price + GST' : 'Inclusive of GST'}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white flex-1">
              <div className="space-y-4">
                
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium text-sm">Base Price</span>
                  <span className="text-slate-900 font-bold text-lg">{formatINR(results.basePrice)}</span>
                </div>

                {stateType === 'intra' ? (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <div>
                        <span className="text-slate-500 font-medium text-sm block">CGST</span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{gstRate/2}%</span>
                      </div>
                      <span className="text-slate-900 font-bold text-lg">{formatINR(results.cgst)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <div>
                        <span className="text-slate-500 font-medium text-sm block">SGST / UTGST</span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{gstRate/2}%</span>
                      </div>
                      <span className="text-slate-900 font-bold text-lg">{formatINR(results.sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <div>
                      <span className="text-slate-500 font-medium text-sm block">IGST</span>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{gstRate}%</span>
                    </div>
                    <span className="text-slate-900 font-bold text-lg">{formatINR(results.igst)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-slate-900 border-dashed">
                  <span className="text-slate-900 font-extrabold text-lg uppercase tracking-wide">Total GST</span>
                  <span className="text-amber-600 font-extrabold text-xl">{formatINR(results.totalGst)}</span>
                </div>

              </div>
            </div>
            
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
               <p className="text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> Calculations updated as per Sept 2025 GST Council rules.
               </p>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ & Knowledge Base */}
      <div className="mt-24 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Understanding GST</h2>
          <p className="text-slate-600">Key concepts about Goods and Services Tax in India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-xl">⚖️</span> Intra-State vs Inter-State
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              <strong>Intra-State (Same State):</strong> When the supplier and the place of supply are in the same state or union territory. GST is split equally into CGST (Central) and SGST (State).
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Inter-State (Different State):</strong> When the supplier and the place of supply are in different states. A single IGST is charged and goes to the Central Government.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-xl">📊</span> New 2025 GST Slabs
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              As per the 56th GST Council meeting (effective Sept 2025), the 12% and 28% slabs have been abolished for most goods.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The structure is now simplified to three core rates — <strong>0%, 5%, 18%</strong> — and a new <strong>40% slab</strong> for luxury and sin goods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm md:col-span-2">
            <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-xl">🔄</span> GST Exclusive vs GST Inclusive
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <strong className="text-sm text-slate-900 block mb-1">GST Exclusive (Plus GST)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The price quoted does not include GST. Tax is added on top. E.g., ₹10,000 exclusive of 18% GST means final invoice is ₹11,800.
                </p>
              </div>
              <div>
                <strong className="text-sm text-slate-900 block mb-1">GST Inclusive (Including GST)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The price quoted already includes GST. E.g., ₹11,800 inclusive of 18% GST breaks down to Base ₹10,000 + GST ₹1,800.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
