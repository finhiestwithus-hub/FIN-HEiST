"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Percent, FileText, CheckCircle, ChevronRight, Calculator, IndianRupee, FileSpreadsheet, Building2, User } from 'lucide-react';
import { tdsData, nriData } from '@/data/tdsTcsData';

type TdsEntry = {
  ns: string;
  os: string;
  n: string;
  t: string;
  th?: number;
  thn?: string;
  ri?: number | 'slab' | null;
  ro?: number | 'slab' | null;
  nf?: string;
  of?: string;
  note?: string;
  sal?: boolean;
  kw: string;
};

type NriEntry = {
  sl: string;
  code: string;
  ns: string;
  os: string;
  n: string;
  nature: string;
  payee: string;
  payer: string;
  rate: string;
  rateNum: number | null;
  kw: string;
};

export default function TdsTcsCalculator() {
  const [tab, setTab] = useState<'resident' | 'nri'>('resident');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Wizard State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedResident, setSelectedResident] = useState<TdsEntry | null>(null);
  const [selectedNri, setSelectedNri] = useState<NriEntry | null>(null);
  
  const [amount, setAmount] = useState<string>('');
  const [deducteeType, setDeducteeType] = useState<'individual' | 'others'>('individual');
  const [hasPan, setHasPan] = useState<boolean>(true);

  // Filtering
  const filteredResident = useMemo(() => {
    if (!searchQuery) return tdsData as TdsEntry[];
    const q = searchQuery.toLowerCase();
    return (tdsData as TdsEntry[]).filter(d => 
      d.kw.includes(q) || 
      d.n.toLowerCase().includes(q) || 
      d.ns.toLowerCase().includes(q) || 
      d.os.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredNri = useMemo(() => {
    if (!searchQuery) return nriData as NriEntry[];
    const q = searchQuery.toLowerCase();
    return (nriData as NriEntry[]).filter(d => 
      d.kw.includes(q) || 
      d.n.toLowerCase().includes(q) || 
      d.ns.toLowerCase().includes(q) || 
      d.os.toLowerCase().includes(q) ||
      d.nature.toLowerCase().includes(q) ||
      d.payee.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Actions
  const handleSelectResident = (entry: TdsEntry) => {
    setSelectedResident(entry);
    setStep(2);
    setAmount('');
  };

  const handleSelectNri = (entry: NriEntry) => {
    setSelectedNri(entry);
    setStep(2);
    setAmount('');
  };

  const calculateTax = () => {
    setStep(3);
  };

  const resetCalculator = () => {
    setStep(1);
    setSelectedResident(null);
    setSelectedNri(null);
    setAmount('');
  };

  // Result Calculation Logic
  const getCalculationResult = () => {
    const val = Number(amount);
    if (!val || val <= 0) return null;

    let taxAmount = 0;
    let netPayable = 0;
    let appliedRate = 0;
    let rateStr = '';
    let isBelowThreshold = false;
    let badgeText = '';
    let formStr = '';

    if (tab === 'resident' && selectedResident) {
      const { th, ri, ro, t, nf, of, sal } = selectedResident;
      formStr = `${nf} (Old: ${of})`;

      if (sal) {
        return { isSlab: true, message: 'Salary TDS requires full income and tax slab computation. Please use the specialized Income Tax Calculator.' };
      }

      if (th && val < th) {
        isBelowThreshold = true;
      } else {
        // Determine base rate
        let baseRate = 0;
        if (deducteeType === 'individual' && typeof ri === 'number') baseRate = ri;
        else if (deducteeType === 'others' && typeof ro === 'number') baseRate = ro;
        else if (typeof ri === 'number') baseRate = ri; // fallback
        else if (typeof ro === 'number') baseRate = ro;

        // PAN logic (Sec 206AA) - typically 20% if no PAN for TDS
        if (!hasPan && t === 'TDS') {
          appliedRate = Math.max(baseRate, 0.20);
        } else {
          appliedRate = baseRate;
        }

        taxAmount = val * appliedRate;
        netPayable = t === 'TDS' ? val - taxAmount : val;
        rateStr = `${(appliedRate * 100).toFixed(2)}%`;
        badgeText = t === 'TDS' ? 'TDS Applicable' : 'TCS Applicable';
      }
    } else if (tab === 'nri' && selectedNri) {
      const { rateNum, rate } = selectedNri;
      formStr = `Form 144 (Old: 27Q)`;
      
      if (rateNum === null) {
        return { isVariable: true, message: 'Tax is deducted at Rates in Force depending on DTAA. Consult a professional.' };
      }

      appliedRate = rateNum / 100;
      taxAmount = val * appliedRate;
      netPayable = val - taxAmount;
      rateStr = rate;
      badgeText = 'NRI TDS Applicable';
    }

    return { val, taxAmount, netPayable, appliedRate, rateStr, isBelowThreshold, badgeText, formStr };
  };

  const result = step === 3 ? getCalculationResult() : null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-slate-50/50">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=tds-tcs#calculators" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                TDS & TCS Rate Calculator FY 2026-27
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed">
              As per the new Income Tax Act, 2025 — search by keyword, find the applicable new section with old Act reference, threshold, forms & compute TDS/TCS instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Sidebar - Steps Indicator */}
        <div className="w-full lg:w-64 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-6">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Calculator Steps</h3>
          
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-indigo-600 text-white shadow-md' : step > 1 ? 'bg-indigo-100' : 'bg-slate-200'}`}>
              {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
            </div>
            <span className={`font-semibold ${step === 1 ? 'text-indigo-700' : ''}`}>Select Payment</span>
          </div>

          <div className={`w-0.5 h-8 ml-4 ${step > 1 ? 'bg-indigo-200' : 'bg-slate-200'}`} />

          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-indigo-600 text-white shadow-md' : step > 2 ? 'bg-indigo-100' : 'bg-slate-200'}`}>
              {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
            </div>
            <span className={`font-semibold ${step === 2 ? 'text-indigo-700' : ''}`}>Amount & Deductee</span>
          </div>

          <div className={`w-0.5 h-8 ml-4 ${step > 2 ? 'bg-indigo-200' : 'bg-slate-200'}`} />

          <div className={`flex items-center gap-3 ${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 3 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200'}`}>
              3
            </div>
            <span className={`font-semibold ${step === 3 ? 'text-indigo-700' : ''}`}>View Result</span>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-grow p-6 sm:p-8 xl:p-10 flex flex-col">
          
          {/* STEP 1: SELECT PAYMENT */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Step 1: Select Nature of Payment
              </h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1.5 bg-slate-100 rounded-xl w-fit">
                <button
                  onClick={() => { setTab('resident'); setSearchQuery(''); }}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                    tab === 'resident' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Resident TDS / TCS
                </button>
                <button
                  onClick={() => { setTab('nri'); setSearchQuery(''); }}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                    tab === 'nri' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  NRI / Foreign Co. TDS (Sec 393(2))
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                  placeholder="Search by keyword (e.g. Rent, Salary, 194J, Contractor)..."
                />
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tab === 'resident' ? (
                  <>
                    <button onClick={() => setSearchQuery('salary')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Salary</button>
                    <button onClick={() => setSearchQuery('rent')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Rent</button>
                    <button onClick={() => setSearchQuery('contractor')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Contractor</button>
                    <button onClick={() => setSearchQuery('professional')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Professional Fees</button>
                    <button onClick={() => setSearchQuery('commission')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Commission</button>
                    <button onClick={() => setSearchQuery('tcs')} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100">TCS Goods</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setSearchQuery('interest')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Interest</button>
                    <button onClick={() => setSearchQuery('mutual fund')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Mutual Fund</button>
                    <button onClick={() => setSearchQuery('195')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">Section 195</button>
                    <button onClick={() => setSearchQuery('ltcg')} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100">LTCG</button>
                  </>
                )}
              </div>

              {/* Data Table */}
              <div className="border border-slate-200 rounded-xl bg-white max-h-[500px] overflow-y-auto overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Nature of Payment</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">New Sec</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Rate</th>
                      <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tab === 'resident' ? (
                      filteredResident.length > 0 ? (
                        filteredResident.map((d, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer" onClick={() => handleSelectResident(d)}>
                            <td className="py-3 px-4">
                              <p className="text-sm font-bold text-slate-900">{d.n}</p>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{d.thn}</p>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{d.ns}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm font-bold text-indigo-700">{typeof d.ri === 'number' ? `${(d.ri * 100).toFixed(1)}%` : d.ri}</span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1">Select <ChevronRight className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={4} className="text-center py-12 text-slate-500">No matching entries found.</td></tr>
                      )
                    ) : (
                      filteredNri.length > 0 ? (
                        filteredNri.map((d, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer" onClick={() => handleSelectNri(d)}>
                            <td className="py-3 px-4">
                              <p className="text-sm font-bold text-slate-900">{d.n}</p>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">Payee: {d.payee}</p>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{d.ns}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm font-bold text-indigo-700">{d.rate}</span>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1">Select <ChevronRight className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={4} className="text-center py-12 text-slate-500">No matching entries found.</td></tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 2: AMOUNT & DEDUCTEE */}
          {step === 2 && (
            <div className="animate-fadeIn max-w-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Step 2: Enter Details
                </h2>
                <button onClick={resetCalculator} className="text-sm font-bold text-slate-400 hover:text-slate-600">Change Payment Type</button>
              </div>

              {/* Selected Details Card */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl mb-8">
                <p className="text-sm font-bold text-indigo-700 mb-1">Selected Provision</p>
                <p className="text-lg font-black text-slate-900 mb-2">
                  {tab === 'resident' ? selectedResident?.n : selectedNri?.n}
                </p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500">
                  <span>New Sec: {tab === 'resident' ? selectedResident?.ns : selectedNri?.ns}</span>
                  <span>Old Sec: {tab === 'resident' ? selectedResident?.os : selectedNri?.os}</span>
                  {tab === 'resident' && <span>Threshold: {selectedResident?.thn}</span>}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Transaction / Payment Amount (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-lg text-slate-900"
                      placeholder="e.g. 150000"
                    />
                  </div>
                </div>

                {tab === 'resident' && (
                  <>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Deductee Type (Party receiving payment)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          onClick={() => setDeducteeType('individual')}
                          className={`flex items-center gap-2 p-3 rounded-xl border font-bold text-sm transition-all ${
                            deducteeType === 'individual' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <User className="w-4 h-4" /> Individual / HUF
                        </button>
                        <button
                          onClick={() => setDeducteeType('others')}
                          className={`flex items-center gap-2 p-3 rounded-xl border font-bold text-sm transition-all ${
                            deducteeType === 'others' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Building2 className="w-4 h-4" /> Company / Firm / AOP
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        id="pan-check"
                        checked={hasPan}
                        onChange={(e) => setHasPan(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="pan-check" className="text-sm font-semibold text-slate-700 cursor-pointer">
                        PAN is available for the deductee <span className="font-normal text-slate-500">(Uncheck to apply 20% higher rate u/s 206AA)</span>
                      </label>
                    </div>
                  </>
                )}

                <button
                  onClick={calculateTax}
                  disabled={!amount || Number(amount) <= 0}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold rounded-xl transition-colors shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2"
                >
                  <Calculator className="w-5 h-5" /> Calculate TDS / TCS
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RESULT */}
          {step === 3 && result && (
            <div className="animate-fadeIn max-w-2xl w-full">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Step 3: Calculation Result
                </h2>
                <button onClick={resetCalculator} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Calculate New</button>
              </div>

              {'isSlab' in result ? (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                  <p className="font-bold text-amber-900">{result.message}</p>
                </div>
              ) : 'isVariable' in result ? (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                  <p className="font-bold text-amber-900">{result.message}</p>
                </div>
              ) : result.isBelowThreshold ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 sm:p-8 rounded-3xl text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-emerald-900 mb-2">No TDS / TCS Applicable</h3>
                  <p className="text-emerald-800 font-medium">
                    The entered amount (₹{result.val.toLocaleString('en-IN')}) is below the statutory threshold of {tab === 'resident' ? selectedResident?.thn : selectedNri?.rate}. No deduction is required.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                  <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-wider rounded-lg mb-2">
                        {result.badgeText}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{tab === 'resident' ? selectedResident?.n : selectedNri?.n}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-bold">Transaction Amount</span>
                      <span className="text-lg font-bold text-slate-900">₹{result.val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-bold">Applicable Rate {tab === 'nri' && <span className="text-xs text-amber-600 ml-2">(Excl. Surcharge & 4% Cess)</span>}</span>
                      <span className="text-lg font-bold text-indigo-600">{result.rateStr}</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-900 font-black">{result.badgeText} Amount</span>
                      <span className="text-2xl font-black text-rose-600">- ₹{result.taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Net Payable / Received</span>
                      <span className="text-xl sm:text-3xl font-black text-emerald-600">₹{result.netPayable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 border-t border-indigo-100 flex items-start gap-4">
                    <FileSpreadsheet className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-indigo-900 mb-1">Compliance & Filing</p>
                      <p className="text-sm text-indigo-700/80 font-medium">
                        Return to be filed using <span className="font-bold text-indigo-800">{result.formStr}</span>. Ensure deduction is deposited by the 7th of the following month.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
