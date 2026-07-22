'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';

export default function IncomeTaxCalculator() {
  const [itrIncome, setItrIncome] = useState<number>(1200000);
  const [itrDeductions, setItrDeductions] = useState<number>(150000);

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // ITR Calculation (Simplified Old vs New Regime)
  const taxableIncomeNew = Math.max(0, itrIncome - 50000); // Standard deduction of 50k
  let taxNew = 0;
  if (taxableIncomeNew > 700000) {
    if (taxableIncomeNew > 1500000) taxNew += (taxableIncomeNew - 1500000) * 0.30 + 150000;
    else if (taxableIncomeNew > 1200000) taxNew += (taxableIncomeNew - 1200000) * 0.20 + 90000;
    else if (taxableIncomeNew > 900000) taxNew += (taxableIncomeNew - 900000) * 0.15 + 45000;
    else if (taxableIncomeNew > 600000) taxNew += (taxableIncomeNew - 600000) * 0.10 + 15000;
    else if (taxableIncomeNew > 300000) taxNew += (taxableIncomeNew - 300000) * 0.05;
  }

  const taxableIncomeOld = Math.max(0, itrIncome - 50000 - itrDeductions); // Std ded + 80C etc
  let taxOld = 0;
  if (taxableIncomeOld > 500000) {
    if (taxableIncomeOld > 1000000) taxOld += (taxableIncomeOld - 1000000) * 0.30 + 112500;
    else if (taxableIncomeOld > 500000) taxOld += (taxableIncomeOld - 500000) * 0.20 + 12500;
    else if (taxableIncomeOld > 250000) taxOld += (taxableIncomeOld - 250000) * 0.05;
  }

  // Add 4% Health & Education cess
  taxNew = Math.round(taxNew > 0 ? taxNew * 1.04 : 0);
  taxOld = Math.round(taxOld > 0 ? taxOld * 1.04 : 0);

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
          Income Tax Calculator <span className="text-amber-600">FY 2024-25</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Compare your tax liability under the Old and New Tax Regimes to find your best saving strategy. Includes standard deductions and rebate u/s 87A.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Your Income & Investments
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Gross Annual Income</span>
                  <span className="text-emerald-700 font-mono font-extrabold text-xl bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                    ₹{formatINR(itrIncome)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="300000" 
                  max="5000000" 
                  step="50000" 
                  value={itrIncome} 
                  onChange={(e) => setItrIncome(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-emerald-500 cursor-pointer" 
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                  <span>₹3L</span>
                  <span>₹25L</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Total Eligible Deductions (80C, 80D, etc)</span>
                  <span className="text-amber-800 font-mono font-extrabold text-xl bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                    ₹{formatINR(itrDeductions)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="10000" 
                  value={itrDeductions} 
                  onChange={(e) => setItrDeductions(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                  <span>₹0</span>
                  <span>₹5L</span>
                  <span>₹10L</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
              <p className="font-bold text-slate-800 mb-1">Note on Standard Deduction:</p>
              A standard deduction of ₹50,000 is automatically applied to both regimes for salaried individuals.
            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-amber-50/30 h-full flex flex-col justify-center">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">
              Tax Liability Comparison
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Old Regime Box */}
              <div className={`rounded-2xl p-6 border-2 flex flex-col justify-center items-center text-center transition-all duration-300 ${taxOld <= taxNew ? 'bg-emerald-50 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-105 relative z-10' : 'bg-white border-slate-200 shadow-sm'}`}>
                {taxOld <= taxNew && (
                  <div className="absolute -top-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Best Choice
                  </div>
                )}
                <span className={`text-xs font-black uppercase tracking-wider mb-2 ${taxOld <= taxNew ? 'text-emerald-800' : 'text-slate-500'}`}>
                  Old Regime
                </span>
                <span className={`text-3xl sm:text-4xl font-mono font-extrabold ${taxOld <= taxNew ? 'text-emerald-600' : 'text-slate-900'}`}>
                  ₹{formatINR(taxOld)}
                </span>
                <span className="text-xs font-bold text-slate-400 mt-2">Total Tax Payable</span>
              </div>

              {/* New Regime Box */}
              <div className={`rounded-2xl p-6 border-2 flex flex-col justify-center items-center text-center transition-all duration-300 ${taxNew < taxOld ? 'bg-emerald-50 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-105 relative z-10' : 'bg-white border-slate-200 shadow-sm'}`}>
                {taxNew < taxOld && (
                  <div className="absolute -top-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Best Choice
                  </div>
                )}
                <span className={`text-xs font-black uppercase tracking-wider mb-2 ${taxNew < taxOld ? 'text-emerald-800' : 'text-slate-500'}`}>
                  New Regime
                </span>
                <span className={`text-3xl sm:text-4xl font-mono font-extrabold ${taxNew < taxOld ? 'text-emerald-600' : 'text-slate-900'}`}>
                  ₹{formatINR(taxNew)}
                </span>
                <span className="text-xs font-bold text-slate-400 mt-2">Total Tax Payable</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-blue-900 font-bold text-sm mb-1">Our Recommendation</h4>
                <p className="text-sm text-blue-800/80 font-medium leading-relaxed">
                  {taxNew < taxOld 
                    ? `By choosing the New Tax Regime, you will save ₹${formatINR(taxOld - taxNew)} in taxes without needing to lock your money in specific investments.` 
                    : `By sticking to the Old Tax Regime and maximizing your ₹${formatINR(itrDeductions)} deductions, you will save ₹${formatINR(taxNew - taxOld)} in taxes.`}
                </p>
              </div>
            </div>

            <Link href="/?contact=tax" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Optimize & File Your Taxes Now
            </Link>

          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> This calculator provides an estimate of your tax liability based on standard income tax slabs for individuals below 60 years of age and includes a 4% Health and Education Cess. It does not account for specific surcharges, capital gains tax rates, professional tax, or complex exemptions. For exact tax computation and filing, please consult our qualified Chartered Accountants.
        </p>
      </div>

    </div>
  );
}
