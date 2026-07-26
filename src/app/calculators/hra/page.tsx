"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Plus, Trash2, ShieldCheck, FileText } from 'lucide-react';

interface Employer {
  id: string;
  name: string;
  cityType: 'metro' | 'non-metro';
  salary: number;
  hraReceived: number;
  rentPaid: number;
}

export default function HRACalculator() {
  const [empName, setEmpName] = useState('');
  const [empPan, setEmpPan] = useState('');
  const [taxYear, setTaxYear] = useState('2025-26');
  const [employers, setEmployers] = useState<Employer[]>([
    { id: '1', name: '', cityType: 'non-metro', salary: 0, hraReceived: 0, rentPaid: 0 }
  ]);

  const addEmployer = () => {
    setEmployers([
      ...employers,
      { id: Date.now().toString(), name: '', cityType: 'non-metro', salary: 0, hraReceived: 0, rentPaid: 0 }
    ]);
  };

  const removeEmployer = (id: string) => {
    if (employers.length > 1) {
      setEmployers(employers.filter(emp => emp.id !== id));
    }
  };

  const updateEmployer = (id: string, field: keyof Employer, value: any) => {
    setEmployers(employers.map(emp => {
      if (emp.id === id) {
        return { ...emp, [field]: value };
      }
      return emp;
    }));
  };

  const handleNumInput = (id: string, field: keyof Employer, rawValue: string) => {
    const numericStr = rawValue.replace(/[^0-9]/g, '');
    const num = parseInt(numericStr || '0', 10);
    updateEmployer(id, field, num);
  };

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  // Calculation Engine
  const results = useMemo(() => {
    let totalHraReceived = 0;
    let totalRentPaid = 0;
    let totalSalary = 0;
    let totalExempt = 0;
    let totalTaxable = 0;

    const breakdown = employers.map(emp => {
      const a = emp.hraReceived || 0;
      const b = Math.max(0, (emp.rentPaid || 0) - (0.1 * (emp.salary || 0)));
      const c = emp.cityType === 'metro' ? 0.5 * (emp.salary || 0) : 0.4 * (emp.salary || 0);
      
      const exempt = Math.max(0, Math.min(a, b, c));
      const taxable = Math.max(0, a - exempt);

      totalHraReceived += a;
      totalRentPaid += (emp.rentPaid || 0);
      totalSalary += (emp.salary || 0);
      totalExempt += exempt;
      totalTaxable += taxable;

      return { ...emp, a, b, c, exempt, taxable };
    });

    return {
      breakdown,
      totalHraReceived,
      totalRentPaid,
      totalSalary,
      totalExempt,
      totalTaxable
    };
  }, [employers]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=itr#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <Home className="w-5 h-5 text-slate-950" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                HRA Calculator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base">
              Calculate your House Rent Allowance (HRA) tax exemption as per Income Tax Act. Supports multiple employers and job changes during the year.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start relative">
        
        {/* LEFT PANEL - Form Inputs */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          
          {/* Step 1: Employee Details */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">1</span>
              <div>
                <h2 className="font-bold text-slate-900">Employee Details</h2>
                <p className="text-xs text-slate-500">Basic information for this HRA statement</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Employee Name</label>
                <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} placeholder="e.g. Rajesh Kumar" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">PAN</label>
                <input type="text" value={empPan} onChange={(e) => setEmpPan(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCDE1234F" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 uppercase" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Tax Year</label>
                <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                  <option value="2025-26">FY 2025-26 (AY 2026-27)</option>
                  <option value="2024-25">FY 2024-25 (AY 2025-26)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Employer-wise HRA Details */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
            <div className="px-6 py-5 flex items-center justify-between bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">2</span>
                <div>
                  <h2 className="font-bold text-slate-900">Employer-wise HRA & Salary Details</h2>
                  <p className="text-xs text-slate-500">Add each employer separately if you changed jobs during the year.</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              
              {employers.map((emp, index) => (
                <div key={emp.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 relative group">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-xs">{index + 1}</div>
                      Employer Details
                    </h3>
                    {employers.length > 1 && (
                      <button onClick={() => removeEmployer(emp.id)} className="text-rose-400 hover:text-rose-600 transition-colors p-1" title="Remove Employer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Employer Name (Optional)</label>
                      <input type="text" value={emp.name} onChange={(e) => updateEmployer(emp.id, 'name', e.target.value)} placeholder="e.g. TCS" className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">City Type</label>
                      <select value={emp.cityType} onChange={(e) => updateEmployer(emp.id, 'cityType', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                        <option value="non-metro">Non-Metro (40%)</option>
                        <option value="metro">Metro (50%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Salary (Basic+DA)</label>
                      <input type="text" value={formatINR(emp.salary)} onChange={(e) => handleNumInput(emp.id, 'salary', e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">HRA Received</label>
                      <input type="text" value={formatINR(emp.hraReceived)} onChange={(e) => handleNumInput(emp.id, 'hraReceived', e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Rent Paid</label>
                      <input type="text" value={formatINR(emp.rentPaid)} onChange={(e) => handleNumInput(emp.id, 'rentPaid', e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-medium" />
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={addEmployer} className="flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors">
                <Plus className="w-4 h-4" /> Add Another Employer
              </button>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-600">
                <strong className="text-amber-500">Note:</strong> "Salary" for HRA purposes = Basic Pay + Dearness Allowance (only if DA forms part of retirement benefits). It excludes all other allowances, bonuses, or commissions.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Sticky Summary Dashboard */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-[120px] space-y-5">
          <div className="p-1 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-300 shadow-2xl">
            <div className="p-6 rounded-[22px] bg-white">
              <h3 className="text-lg font-bold font-poppins text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" /> HRA Exemption Statement
              </h3>
              <p className="text-xs text-slate-500 mb-6">Summary of HRA exemption</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl border bg-emerald-500/10 border-emerald-500/30">
                  <div className="text-[10px] font-bold uppercase text-slate-600 mb-1">Exempt HRA</div>
                  <div className="text-xl font-black font-poppins text-emerald-500">
                    ₹{formatINR(results.totalExempt)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl border bg-rose-500/10 border-rose-500/30">
                  <div className="text-[10px] font-bold uppercase text-slate-600 mb-1">Taxable HRA</div>
                  <div className="text-xl font-black font-poppins text-rose-500">
                    ₹{formatINR(results.totalTaxable)}
                  </div>
                </div>
              </div>

              {/* Annual Summary Table */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
                  <span className="text-amber-500">★</span> Annual Summary
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Total HRA Received</span>
                  <span className="text-slate-900 font-bold">₹{formatINR(results.totalHraReceived)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Total Rent Paid</span>
                  <span className="text-slate-900 font-bold">₹{formatINR(results.totalRentPaid)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Total Salary (HRA basis)</span>
                  <span className="text-slate-900 font-bold">₹{formatINR(results.totalSalary)}</span>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-1">
                  <span className="text-amber-500">★</span> Employer-wise Breakdown
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-2 font-bold text-slate-500">#</th>
                        <th className="pb-2 font-bold text-slate-500">(a) HRA</th>
                        <th className="pb-2 font-bold text-slate-500">(b) Rent-10%</th>
                        <th className="pb-2 font-bold text-slate-500">(c) City%</th>
                        <th className="pb-2 font-bold text-slate-900 text-right">Exempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.breakdown.map((emp, idx) => (
                        <tr key={emp.id} className="border-b border-slate-100 last:border-0">
                          <td className="py-2 text-slate-600">{idx + 1}</td>
                          <td className="py-2 text-slate-600">₹{formatINR(emp.a)}</td>
                          <td className="py-2 text-slate-600">₹{formatINR(emp.b)}</td>
                          <td className="py-2 text-slate-600">₹{formatINR(emp.c)}</td>
                          <td className="py-2 font-bold text-emerald-500 text-right">₹{formatINR(emp.exempt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-slate-400 leading-tight">
                <strong>Rule:</strong> HRA exemption is the least of (a) Actual HRA, (b) Rent minus 10% of salary, or (c) 50% (Metro) / 40% (Non-Metro) of salary.
              </div>

              <button onClick={() => window.print()} className="mt-6 w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors text-center">
                Print Statement
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
