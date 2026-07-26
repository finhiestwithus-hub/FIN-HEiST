"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, IndianRupee, Calendar, CheckCircle } from 'lucide-react';

type TabMode = 'late-deduction' | 'late-payment' | 'late-filing' | 'all';

// --- Utilities ---
function getTdsDueDate(deductionDateStr: string) {
  if (!deductionDateStr) return null;
  const d = new Date(deductionDateStr);
  const month = d.getMonth(), year = d.getFullYear();
  if (month === 2) return new Date(year, 3, 30);
  let nm = month + 1, ny = year;
  if (nm > 11) { nm = 0; ny++; }
  return new Date(ny, nm, 7);
}

function countMonths(fromDateStr: string, toDateStr: string) {
  if (!fromDateStr || !toDateStr) return 0;
  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);
  
  fromDate.setHours(0,0,0,0);
  toDate.setHours(0,0,0,0);
  
  if (toDate <= fromDate) return 0;
  
  let months = 0;
  let cursor = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
  while (cursor <= toDate) { 
    months++; 
    cursor.setMonth(cursor.getMonth() + 1); 
  }
  return months;
}

function fmtDate(d: Date | string | null) {
  if (!d) return '—';
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dt.getTime())) return '—';
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TdsPenaltyCalculator() {
  const [tab, setTab] = useState<TabMode>('late-deduction');
  const [tdsAmount, setTdsAmount] = useState<string>('');

  // Dates
  const [creditDate, setCreditDate] = useState<string>('');
  const [deductionDate, setDeductionDate] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [filingDueDate, setFilingDueDate] = useState<string>('');
  const [actualFilingDate, setActualFilingDate] = useState<string>('');

  // --- Calculation Logic ---
  const result = useMemo(() => {
    const tds = Number(tdsAmount);
    if (!tds || tds <= 0) return null;

    let totalLiability = 0;
    
    // 1. Late Deduction
    let ldInterest = 0, ldMonths = 0;
    if (['late-deduction', 'all'].includes(tab) && creditDate && deductionDate) {
      ldMonths = countMonths(creditDate, deductionDate);
      ldInterest = Math.round(tds * 0.01 * ldMonths);
    }

    // 2. Late Payment
    let lpInterest = 0, lpMonths = 0;
    let computedDueDate: Date | null = null;
    if (['late-payment', 'all'].includes(tab) && deductionDate && paymentDate) {
      computedDueDate = getTdsDueDate(deductionDate);
      if (computedDueDate) {
        const pd = new Date(paymentDate);
        pd.setHours(0,0,0,0);
        computedDueDate.setHours(0,0,0,0);
        if (pd > computedDueDate) {
          lpMonths = countMonths(deductionDate, paymentDate);
          lpInterest = Math.round(tds * 0.015 * lpMonths);
        }
      }
    }

    // 3. Late Filing (234E)
    let lfFee = 0, lfDays = 0;
    if (['late-filing', 'all'].includes(tab) && filingDueDate && actualFilingDate) {
      const fd = new Date(filingDueDate); fd.setHours(0,0,0,0);
      const fa = new Date(actualFilingDate); fa.setHours(0,0,0,0);
      if (fa > fd) {
        lfDays = Math.floor((fa.getTime() - fd.getTime()) / (1000*60*60*24));
        lfFee = Math.min(lfDays * 200, tds); // Capped at TDS amount
      }
    }

    totalLiability = ldInterest + lpInterest + lfFee;

    return {
      tds,
      ldInterest, ldMonths,
      lpInterest, lpMonths, computedDueDate,
      lfFee, lfDays,
      totalLiability
    };

  }, [tab, tdsAmount, creditDate, deductionDate, paymentDate, filingDueDate, actualFilingDate]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-slate-50/50">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=tds-tcs#calculators" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                TDS Interest & Late Filing Calculator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed">
              Calculate interest on late deduction, late payment & late filing fee (Section 234E) — complete liability summary with applicable sections and rates.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
        {[
          { id: 'late-deduction', label: 'Late Deduction (1%)' },
          { id: 'late-payment', label: 'Late Payment (1.5%)' },
          { id: 'late-filing', label: 'Late Filing 234E' },
          { id: 'all', label: 'All Three' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as TabMode)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              tab === t.id 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-start">
        
        {/* Left - Inputs */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">1</span>
              Transaction Details
            </h3>

            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">TDS Amount (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    value={tdsAmount}
                    onChange={(e) => setTdsAmount(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold text-slate-900"
                    placeholder="Total TDS Deducted"
                  />
                </div>
              </div>

              {['late-deduction', 'all'].includes(tab) && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Date of Credit / Payment to Payee</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="date"
                      value={creditDate}
                      onChange={(e) => setCreditDate(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold text-slate-900"
                    />
                  </div>
                </div>
              )}

              {['late-deduction', 'late-payment', 'all'].includes(tab) && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Date of TDS Deduction</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="date"
                      value={deductionDate}
                      onChange={(e) => setDeductionDate(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold text-slate-900"
                    />
                  </div>
                </div>
              )}

              {['late-payment', 'all'].includes(tab) && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Date of TDS Payment to Govt</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold text-slate-900"
                    />
                  </div>
                </div>
              )}

              {['late-filing', 'all'].includes(tab) && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Due Date for TDS Return Filing</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="date"
                        value={filingDueDate}
                        onChange={(e) => setFilingDueDate(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Actual Date of Filing Return</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="date"
                        value={actualFilingDate}
                        onChange={(e) => setActualFilingDate(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Right - Results */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">2</span>
              Calculation Result
            </h3>

            {!result ? (
              <div className="flex-grow flex flex-col items-center justify-center text-slate-400 py-12">
                <AlertTriangle className="w-16 h-16 opacity-20 mb-4" />
                <p className="font-semibold">Enter details and dates to view statutory liability.</p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                
                {/* Result Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {['late-deduction', 'all'].includes(tab) && (
                    <div className={`rounded-2xl p-4 border ${result.ldInterest > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                      <p className={`text-xs font-bold mb-1 uppercase tracking-wider ${result.ldInterest > 0 ? 'text-rose-700' : 'text-slate-500'}`}>Late Deduction (1%)</p>
                      <p className={`text-2xl font-black ${result.ldInterest > 0 ? 'text-rose-900' : 'text-slate-700'}`}>₹{result.ldInterest.toLocaleString('en-IN')}</p>
                      {result.ldMonths > 0 && <p className="text-xs font-semibold text-slate-500 mt-1">{result.ldMonths} Months Delay</p>}
                    </div>
                  )}

                  {['late-payment', 'all'].includes(tab) && (
                    <div className={`rounded-2xl p-4 border ${result.lpInterest > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                      <p className={`text-xs font-bold mb-1 uppercase tracking-wider ${result.lpInterest > 0 ? 'text-rose-700' : 'text-slate-500'}`}>Late Payment (1.5%)</p>
                      <p className={`text-2xl font-black ${result.lpInterest > 0 ? 'text-rose-900' : 'text-slate-700'}`}>₹{result.lpInterest.toLocaleString('en-IN')}</p>
                      {result.lpMonths > 0 && <p className="text-xs font-semibold text-slate-500 mt-1">{result.lpMonths} Months Delay</p>}
                    </div>
                  )}

                  {['late-filing', 'all'].includes(tab) && (
                    <div className={`rounded-2xl p-4 border ${result.lfFee > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                      <p className={`text-xs font-bold mb-1 uppercase tracking-wider ${result.lfFee > 0 ? 'text-rose-700' : 'text-slate-500'}`}>Late Filing (234E)</p>
                      <p className={`text-2xl font-black ${result.lfFee > 0 ? 'text-rose-900' : 'text-slate-700'}`}>₹{result.lfFee.toLocaleString('en-IN')}</p>
                      {result.lfDays > 0 && <p className="text-xs font-semibold text-slate-500 mt-1">{result.lfDays} Days Delay</p>}
                    </div>
                  )}
                </div>

                {tab === 'all' && (
                  <div className={`rounded-2xl p-6 mb-8 border shadow-sm ${result.totalLiability > 0 ? 'bg-rose-500 border-rose-600 text-white' : 'bg-emerald-500 border-emerald-600 text-white'}`}>
                    <p className="text-sm font-bold opacity-90 mb-1">Total Liability Payable</p>
                    <p className="text-2xl sm:text-4xl font-black tracking-tight">
                      ₹{result.totalLiability.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}

                {result.totalLiability === 0 && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-semibold mb-8">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    No interest or late fee is applicable based on the entered dates.
                  </div>
                )}

                {/* Info Note */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm font-medium text-slate-600 leading-relaxed space-y-2">
                  <p><strong className="text-slate-900">References:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    {['late-deduction', 'all'].includes(tab) && <li><strong>Late deduction (u/s 201(1A)):</strong> 1% per month from date of credit to date of deduction.</li>}
                    {['late-payment', 'all'].includes(tab) && <li><strong>Late payment (u/s 201(1A)):</strong> 1.5% per month from date of deduction to actual payment. Due date is generally 7th of next month (or 30th April for March).</li>}
                    {['late-filing', 'all'].includes(tab) && <li><strong>Late filing fee (u/s 234E):</strong> ₹200 per day capped at the total TDS amount.</li>}
                    <li><strong>Important:</strong> As per IT Rules, part of a month is always counted as a full month for interest calculation.</li>
                  </ul>
                  {result.computedDueDate && (
                    <p className="pt-2 font-bold text-indigo-700">Statutory Due Date for entered Deduction: {fmtDate(result.computedDueDate)}</p>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
