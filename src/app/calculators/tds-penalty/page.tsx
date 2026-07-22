'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Calendar, FileText } from 'lucide-react';

export default function TDSPenaltyCalculator() {
  const [tdsAmount, setTdsAmount] = useState<number>(10000);
  const [delayDeduction, setDelayDeduction] = useState<number>(0); // months
  const [delayPayment, setDelayPayment] = useState<number>(2); // months
  const [delayFilingDays, setDelayFilingDays] = useState<number>(15); // days

  const formatINR = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // Logic
  // Sec 201(1A): 1% per month for late deduction
  const interestLateDeduction = tdsAmount * 0.01 * delayDeduction;
  
  // Sec 201(1A): 1.5% per month for late payment
  const interestLatePayment = tdsAmount * 0.015 * delayPayment;
  
  // Sec 234E: 200 per day capped at TDS amount
  const lateFilingFeeRaw = delayFilingDays * 200;
  const lateFilingFee = Math.min(lateFilingFeeRaw, tdsAmount);

  const totalPenalty = interestLateDeduction + interestLatePayment + lateFilingFee;
  const totalPayable = tdsAmount + totalPenalty;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          TDS Interest & Penalty <span className="text-red-600">Calculator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Calculate interest for late deduction (1%), late payment (1.5%) u/s 201(1A), and late filing fees of ₹200/day u/s 234E of the Income Tax Act.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl bg-white h-full">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Default Details
            </h3>
            
            <div className="space-y-8">
              
              {/* TDS Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">TDS Amount (Principal)</span>
                  <div className="relative w-1/3 sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">₹</span>
                    </div>
                    <input 
                      type="number"
                      value={tdsAmount || ''} 
                      onChange={(e) => setTdsAmount(Number(e.target.value))}
                      className="w-full pl-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Delay Deduction */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Delay in Deduction (Months)</span>
                  <div className="relative w-1/4">
                    <input 
                      type="number"
                      value={delayDeduction || ''} 
                      onChange={(e) => setDelayDeduction(Number(e.target.value))}
                      className="w-full pr-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-red-500 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs font-bold">M</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">Part of a month is considered as a full month (1% per month).</p>
              </div>

              {/* Delay Payment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Delay in Payment (Months)</span>
                  <div className="relative w-1/4">
                    <input 
                      type="number"
                      value={delayPayment || ''} 
                      onChange={(e) => setDelayPayment(Number(e.target.value))}
                      className="w-full pr-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-red-500 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs font-bold">M</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">Part of a month is considered as a full month (1.5% per month).</p>
              </div>

              {/* Delay Filing */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Delay in Filing Return (Days)</span>
                  <div className="relative w-1/4">
                    <input 
                      type="number"
                      value={delayFilingDays || ''} 
                      onChange={(e) => setDelayFilingDays(Number(e.target.value))}
                      className="w-full pr-8 p-2 rounded-lg border-2 border-slate-200 bg-slate-50 font-mono font-bold text-slate-900 focus:border-red-500 outline-none text-right"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 text-xs font-bold">D</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">₹200 per day, capped at the total TDS amount.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Outputs */}
        <div className="lg:col-span-6">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-gradient-to-br from-slate-50 via-white to-red-50/30 h-full flex flex-col relative overflow-hidden">
            
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
              Penalty & Interest Summary
            </h3>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border-2 border-red-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600">Original TDS Amount</span>
                  <span className="font-mono font-bold text-slate-900">₹{formatINR(tdsAmount)}</span>
                </div>
                
                <div className="pl-4 border-l-2 border-red-200 space-y-3 py-2 my-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Late Deduction Interest (1%)</span>
                    <span className="font-mono font-bold text-red-600">+ ₹{formatINR(interestLateDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Late Payment Interest (1.5%)</span>
                    <span className="font-mono font-bold text-red-600">+ ₹{formatINR(interestLatePayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-500">Late Filing Fee (₹200/day)</span>
                      {lateFilingFeeRaw > tdsAmount && (
                        <span className="text-[10px] text-emerald-600 font-bold">Capped at TDS Amount (Saved ₹{formatINR(lateFilingFeeRaw - tdsAmount)})</span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-red-600">+ ₹{formatINR(lateFilingFee)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-800">Total Penalty & Interest</span>
                  <span className="font-mono font-bold text-red-600">₹{formatINR(totalPenalty)}</span>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-slate-500 font-bold text-sm mb-2">Total Amount Payable</p>
                <div className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-slate-900">
                  ₹{formatINR(totalPayable)}
                </div>
              </div>

            </div>

            <Link href="/?contact=tds" className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              File Belated TDS Return with Experts
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
}
