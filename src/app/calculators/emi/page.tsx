'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Landmark, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(15);

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // EMI Calculation
  const r = (interestRate / 12) / 100;
  const n = tenureYears * 12;
  const p = loanAmount;
  
  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;
  
  if (r > 0 && n > 0 && p > 0) {
    emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    totalPayment = emi * n;
    totalInterest = totalPayment - p;
  } else if (p > 0 && n > 0 && r === 0) {
    emi = p / n;
    totalPayment = p;
    totalInterest = 0;
  }

  // Chart Data
  const chartData = [
    { name: 'Principal Amount', value: p, color: '#10b981' }, // emerald-500
    { name: 'Total Interest', value: totalInterest, color: '#f59e0b' } // amber-500
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
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          Loan EMI <span className="text-amber-600">Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Calculate your monthly EMI, total interest payable, and total payment for home loans, personal loans, or business loans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white h-full">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-500" />
              Loan Details
            </h3>
            
            <div className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Loan Amount</span>
                  <div className="relative w-1/3 sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">₹</span>
                    </div>
                    <input 
                      type="number"
                      value={loanAmount || ''} 
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="100000000" 
                  step="50000" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Interest Rate (% P.A.)</span>
                  <div className="relative w-1/3 sm:w-1/4">
                    <input 
                      type="number"
                      value={interestRate || ''} 
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pr-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="0.1" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Loan Tenure (Years)</span>
                  <div className="relative w-1/3 sm:w-1/4">
                    <input 
                      type="number"
                      value={tenureYears || ''} 
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full pr-10 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold text-xs">Yr</span>
                    </div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1" 
                  value={tenureYears} 
                  onChange={(e) => setTenureYears(Number(e.target.value))} 
                  className="w-full h-2 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer" 
                />
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 h-full flex flex-col relative overflow-hidden">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Repayment Summary
            </h3>

            <div className="flex-1 flex flex-col justify-center">
              {/* Monthly EMI Highlight */}
              <div className="text-center mb-8">
                <p className="text-slate-500 font-bold text-sm mb-2">Monthly EMI</p>
                <div className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-600 tracking-tight">
                  ₹{formatINR(Math.round(emi))}
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
                        formatter={(value: any) => `₹${formatINR(Math.round(value))}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Inner text for chart */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Calculator className="w-8 h-8 text-slate-300" />
                  </div>
                </div>

                {/* Legend & Breakdown */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      Principal Amount
                    </div>
                    <div className="text-lg font-mono font-bold text-slate-900 pl-5">
                      ₹{formatINR(Math.round(p))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      Total Interest
                    </div>
                    <div className="text-lg font-mono font-bold text-slate-900 pl-5">
                      ₹{formatINR(Math.round(totalInterest))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-500 mb-1">Total Payment</div>
                    <div className="text-xl font-mono font-black text-slate-900">
                      ₹{formatINR(Math.round(totalPayment))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/?contact=loan" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Apply for Project Report & Bank Loan
            </Link>

          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> This EMI calculator provides an estimation based on the inputs provided and uses a standard reducing balance formula. Actual EMI, interest rates, and loan terms may vary based on your lender's specific policies, processing fees, CIBIL score, and loan type. This tool should not be considered as a guarantee of loan approval or exact financial figures.
        </p>
      </div>

    </div>
  );
}
