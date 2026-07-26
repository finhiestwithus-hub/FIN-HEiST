"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Calendar, DollarSign, Percent, PieChart, Info, Target } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function EMICalculator() {
  const [mode, setMode] = useState<'loan' | 'budget'>('loan');
  const [principal, setPrincipal] = useState<number>(5000000);
  const [budgetEmi, setBudgetEmi] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  // EMI & Budget Calculation Logic
  const calculationData = useMemo(() => {
    const R = interestRate;
    const T = tenure;

    if (R <= 0 || T <= 0 || isNaN(R) || isNaN(T)) {
      return {
        emi: 0,
        principal: 0,
        totalInterest: 0,
        totalPayment: 0,
      };
    }

    const n = tenureType === 'years' ? T * 12 : T;
    const r = R / 12 / 100;

    let computedEmi = 0;
    let computedPrincipal = 0;

    if (mode === 'loan') {
      const P = principal;
      if (P <= 0 || isNaN(P)) return { emi: 0, principal: 0, totalInterest: 0, totalPayment: 0 };
      computedPrincipal = P;
      computedEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      const E = budgetEmi;
      if (E <= 0 || isNaN(E)) return { emi: 0, principal: 0, totalInterest: 0, totalPayment: 0 };
      computedEmi = E;
      computedPrincipal = (E * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    const totalPayment = computedEmi * n;
    const totalInterest = totalPayment - computedPrincipal;

    return {
      emi: computedEmi,
      principal: computedPrincipal,
      totalInterest: totalInterest > 0 ? totalInterest : 0,
      totalPayment: totalPayment > 0 ? totalPayment : 0,
    };
  }, [mode, principal, budgetEmi, interestRate, tenure, tenureType]);

  const chartData = [
    { name: 'Principal Loan Amount', value: calculationData.principal },
    { name: 'Total Interest', value: calculationData.totalInterest }
  ];
  const COLORS = ['#f59e0b', '#cbd5e1']; // amber-500, slate-300

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=finance#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                Loan EMI & Budget Calculator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed">
              Calculate your monthly EMI based on a loan amount, or work backward to find your maximum eligible loan amount based on your monthly budget.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="mb-8 flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
        <button
          onClick={() => setMode('loan')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            mode === 'loan' 
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Calculator
        </button>
        <button
          onClick={() => setMode('budget')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            mode === 'budget' 
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Target className="w-4 h-4" />
          Budget &rarr; Loan
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        
        {/* Left Column - Inputs */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">1</span>
              {mode === 'loan' ? 'Loan Details' : 'Budget Details'}
            </h3>

            <div className="space-y-6">
              
              {mode === 'loan' ? (
                /* Principal Input */
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Loan Amount (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-medium">₹</span>
                    </div>
                    <input
                      type="number"
                      value={principal || ''}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="block w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                      placeholder="Enter loan amount"
                    />
                  </div>
                </div>
              ) : (
                /* Budget Input */
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Monthly Budget / EMI (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-medium">₹</span>
                    </div>
                    <input
                      type="number"
                      value={budgetEmi || ''}
                      onChange={(e) => setBudgetEmi(Number(e.target.value))}
                      className="block w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                      placeholder="Max EMI you can afford"
                    />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Enter the maximum EMI you are comfortable paying each month.</p>
                </div>
              )}

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Interest Rate (% per annum)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                    placeholder="e.g. 8.5"
                  />
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-bold text-slate-700">Tenure</label>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setTenureType('years')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${tenureType === 'years' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setTenureType('months')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${tenureType === 'months' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                    placeholder={`Enter tenure in ${tenureType}`}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-100">
            <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              Reducing Balance Method
            </h4>
            <p className="text-xs sm:text-sm text-amber-800/80 leading-relaxed font-medium">
              This calculator uses the reducing balance method standard across all Indian banks. Interest is strictly calculated only on the remaining outstanding principal each month, making it cheaper than flat-rate loans.
            </p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">2</span>
              Calculation Result
            </h3>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {mode === 'loan' ? (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">Monthly EMI</p>
                  <p className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    ₹{calculationData.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                  <p className="text-sm text-amber-700 font-bold mb-1">Max Eligible Loan</p>
                  <p className="text-xl sm:text-3xl font-black text-amber-900 tracking-tight">
                    ₹{calculationData.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
              
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 font-bold mb-1">Total Interest</p>
                <p className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ₹{calculationData.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              
              {mode === 'loan' ? (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">Principal Amount</p>
                  <p className="text-2xl font-bold text-slate-700">
                    ₹{calculationData.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <p className="text-sm text-slate-500 font-bold mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-slate-700">
                    ₹{calculationData.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}

              <div className="bg-amber-500 rounded-2xl p-5 border border-amber-600 shadow-md shadow-amber-500/20 text-white">
                <p className="text-sm text-amber-100 font-bold mb-1">Total Payment (Pr + Int)</p>
                <p className="text-2xl font-bold">
                  ₹{calculationData.totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-grow flex flex-col items-center justify-center min-h-[250px]">
              {calculationData.principal > 0 && calculationData.totalInterest > 0 ? (
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <PieChart className="w-16 h-16 opacity-20 mb-3" />
                  <p className="text-sm font-medium">Enter details to see breakdown</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
