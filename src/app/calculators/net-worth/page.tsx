'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Plus, Minus, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function NetWorthCalculator() {
  // Asset States
  const [cash, setCash] = useState<number>(500000);
  const [realEstate, setRealEstate] = useState<number>(8500000);
  const [investments, setInvestments] = useState<number>(1500000);
  const [gold, setGold] = useState<number>(500000);

  // Liability States
  const [homeLoan, setHomeLoan] = useState<number>(4500000);
  const [personalLoan, setPersonalLoan] = useState<number>(0);
  const [creditCard, setCreditCard] = useState<number>(50000);

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // Math Logic
  const totalAssets = cash + realEstate + investments + gold;
  const totalLiabilities = homeLoan + personalLoan + creditCard;
  const netWorth = totalAssets - totalLiabilities;

  // Chart Data
  const chartData = [
    { name: 'Total Assets', value: totalAssets, color: '#10b981' }, // emerald
    { name: 'Total Liabilities', value: totalLiabilities, color: '#ef4444' } // red
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
          <Briefcase className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          Personal Net Worth <span className="text-amber-600">Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Calculate your true financial standing. Enter your assets and liabilities to instantly compute your net worth, often required for VISA applications or bank loans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-emerald-200/90 shadow-xl bg-white mb-6">
            <h3 className="text-xl font-bold font-poppins text-emerald-800 mb-6 border-b border-emerald-100 pb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Your Assets (What you own)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Cash & Bank Balances', value: cash, setter: setCash },
                { label: 'Real Estate / Property', value: realEstate, setter: setRealEstate },
                { label: 'Stocks, Mutual Funds & FDs', value: investments, setter: setInvestments },
                { label: 'Gold & Jewelry', value: gold, setter: setGold },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">{item.label}</span>
                  <div className="relative w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">₹</span>
                    </div>
                    <input 
                      type="number"
                      value={item.value || ''} 
                      onChange={(e) => item.setter(Number(e.target.value))}
                      className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none text-right transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border-2 border-red-200/90 shadow-xl bg-white">
            <h3 className="text-xl font-bold font-poppins text-red-800 mb-6 border-b border-red-100 pb-4 flex items-center gap-2">
              <Minus className="w-5 h-5" />
              Your Liabilities (What you owe)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Home Loan Balance', value: homeLoan, setter: setHomeLoan },
                { label: 'Personal / Car Loans', value: personalLoan, setter: setPersonalLoan },
                { label: 'Credit Card Outstanding', value: creditCard, setter: setCreditCard },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">{item.label}</span>
                  <div className="relative w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">₹</span>
                    </div>
                    <input 
                      type="number"
                      value={item.value || ''} 
                      onChange={(e) => item.setter(Number(e.target.value))}
                      className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none text-right transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-amber-50/30 h-full flex flex-col relative overflow-hidden">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Net Worth Statement
            </h3>

            <div className="flex-1 flex flex-col justify-center">
              
              {/* Highlight Box */}
              <div className="text-center mb-10">
                <p className="text-slate-500 font-bold text-sm mb-2">Your Total Net Worth</p>
                <div className={`text-4xl sm:text-6xl font-mono font-extrabold tracking-tight ${netWorth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ₹{formatINR(netWorth)}
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
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      Total Assets
                    </div>
                    <div className="text-xl font-mono font-bold text-emerald-600 pl-5">
                      ₹{formatINR(totalAssets)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      Total Liabilities
                    </div>
                    <div className="text-xl font-mono font-bold text-red-600 pl-5">
                      - ₹{formatINR(totalLiabilities)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <Link href="/?contact=networth" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              Get CA Certified Net Worth Certificate
            </Link>

          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> This tool provides an uncertified estimation of your net worth based on user inputs. For VISA applications, bank loans, and official franchising requirements, a formally drafted Net Worth Certificate signed and attested by a practicing Chartered Accountant is mandatory. We provide this service across India.
        </p>
      </div>

    </div>
  );
}
