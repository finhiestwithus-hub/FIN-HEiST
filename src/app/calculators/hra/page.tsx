'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(600000);
  const [da, setDa] = useState<number>(0);
  const [hraReceived, setHraReceived] = useState<number>(250000);
  const [rentPaid, setRentPaid] = useState<number>(240000);
  const [isMetro, setIsMetro] = useState<boolean>(true); // Metro: 50%, Non-Metro: 40%

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // HRA Calculation Logic (Annual)
  const salaryForHRA = basicSalary + da;
  
  // Rule 1: Actual HRA Received
  const actualHRA = hraReceived;
  
  // Rule 2: 50% / 40% of Basic Salary
  const percentSalary = isMetro ? salaryForHRA * 0.50 : salaryForHRA * 0.40;
  
  // Rule 3: Actual Rent Paid - 10% of Basic Salary
  const rentMinus10Percent = Math.max(0, rentPaid - (salaryForHRA * 0.10));

  // Exemption is the minimum of the three
  const exemptedHRA = Math.min(actualHRA, percentSalary, rentMinus10Percent);
  const taxableHRA = Math.max(0, actualHRA - exemptedHRA);

  // Chart Data
  const chartData = [
    { name: 'Exempted HRA', value: exemptedHRA, color: '#10b981' }, // emerald-500
    { name: 'Taxable HRA', value: taxableHRA, color: '#ef4444' } // red-500
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
          <Home className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          HRA Exemption <span className="text-amber-600">Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Calculate your House Rent Allowance (HRA) tax exemption under Section 10(13A) of the Income Tax Act. Find out exactly how much of your HRA is taxable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white h-full">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              Annual Salary Details
            </h3>
            
            <div className="space-y-6">
              
              {/* City Type */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">City Type</label>
                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button 
                    onClick={() => setIsMetro(true)}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${isMetro ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Metro (50% Basic)
                  </button>
                  <button 
                    onClick={() => setIsMetro(false)}
                    className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${!isMetro ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Non-Metro (40% Basic)
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-medium px-2">Metros: Delhi, Mumbai, Kolkata, Chennai.</p>
              </div>

              {/* Inputs */}
              {[
                { label: 'Basic Salary (Annual)', value: basicSalary, setter: setBasicSalary, max: 5000000 },
                { label: 'Dearness Allowance (DA)', value: da, setter: setDa, max: 1000000 },
                { label: 'HRA Received (Annual)', value: hraReceived, setter: setHraReceived, max: 2000000 },
                { label: 'Actual Rent Paid (Annual)', value: rentPaid, setter: setRentPaid, max: 2000000 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-700">{item.label}</span>
                    <div className="relative w-1/3 sm:w-1/2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold">₹</span>
                      </div>
                      <input 
                        type="number"
                        value={item.value || ''} 
                        onChange={(e) => item.setter(Number(e.target.value))}
                        className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={item.max} 
                    step="10000" 
                    value={item.value} 
                    onChange={(e) => item.setter(Number(e.target.value))} 
                    className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                  />
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 h-full flex flex-col relative overflow-hidden">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              HRA Exemption Summary
            </h3>

            <div className="flex-1 flex flex-col justify-center">
              
              {/* Highlight Box */}
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-sm mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                <p className="text-emerald-700 font-bold text-sm mb-2">Exempted HRA (Tax Free)</p>
                <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-600 tracking-tight">
                  ₹{formatINR(exemptedHRA)}
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
                  {/* Inner text for chart */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total HRA</div>
                      <div className="text-sm font-mono font-black text-slate-700">₹{formatINR(actualHRA)}</div>
                    </div>
                  </div>
                </div>

                {/* Legend & Breakdown */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      Exempted HRA
                    </div>
                    <div className="text-lg font-mono font-bold text-slate-900 pl-5">
                      ₹{formatINR(exemptedHRA)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      Taxable HRA
                    </div>
                    <div className="text-lg font-mono font-bold text-slate-900 pl-5">
                      ₹{formatINR(taxableHRA)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rules Breakdown */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-600 space-y-2">
                <div className="font-bold text-slate-800 mb-2 border-b border-slate-200 pb-2">Calculation Breakdown (Minimum of):</div>
                <div className="flex justify-between items-center">
                  <span>1. Actual HRA Received</span>
                  <span className="font-mono font-bold text-slate-900">₹{formatINR(actualHRA)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2. {isMetro ? '50%' : '40%'} of Salary (Basic + DA)</span>
                  <span className="font-mono font-bold text-slate-900">₹{formatINR(percentSalary)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>3. Actual Rent - 10% of Salary</span>
                  <span className="font-mono font-bold text-slate-900">₹{formatINR(rentMinus10Percent)}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> The HRA exemption calculated above is strictly for the Old Tax Regime. Under the New Tax Regime, HRA exemption is not available. To claim HRA exemption, you must actually pay rent for a residential accommodation occupied by you, which is not owned by you. For proper tax filing and documentation (like rent receipts and landlord PAN), consult our experts.
        </p>
      </div>

    </div>
  );
}
