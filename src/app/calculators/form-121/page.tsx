"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, FileText, Printer, Upload, Trash2 } from 'lucide-react';

export default function Form121Generator() {
  // --- STATE ---
  // Identity
  const [dName, setDName] = useState('');
  const [dPan, setDPan] = useState('');
  const [dStatus, setDStatus] = useState('');
  const [dResStatus, setDResStatus] = useState('');
  const [dAge60, setDAge60] = useState('No');
  const [dEmail, setDEmail] = useState('');
  const [dPhone, setDPhone] = useState('');
  const [dTaxYear, setDTaxYear] = useState('2025-26');
  
  // Address
  const [dFlat, setDFlat] = useState('');
  const [dRoad, setDRoad] = useState('');
  const [dArea, setDArea] = useState('');
  const [dDistrict, setDDistrict] = useState('');
  const [dState, setDState] = useState('');
  const [dPin, setDPin] = useState('');
  const [dPo, setDPo] = useState('');
  const [dCountry, setDCountry] = useState('India');

  // Income Details
  const [dIncomeNature, setDIncomeNature] = useState('');
  const [dEstIncome, setDEstIncome] = useState<number>(0);
  const [dEarlierCount, setDEarlierCount] = useState<number>(0);
  const [dEarlierIncome, setDEarlierIncome] = useState<number>(0);
  const [dTotalIncome, setDTotalIncome] = useState<number>(0);

  const aggregateIncome = (dEstIncome || 0) + (dEarlierIncome || 0);

  // ITR Details
  const [itr1, setItr1] = useState({ year: '2024-25', ack: '', income: '' });
  const [itr2, setItr2] = useState({ year: '2023-24', ack: '', income: '' });

  // Payer Details
  const [pName, setPName] = useState('');
  const [pPan, setPPan] = useState('');
  const [pTan, setPTan] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pPhone, setPPhone] = useState('');
  
  // Payer Additional
  const [pUid, setPUid] = useState('');
  const [dDob, setDDob] = useState('');
  const [pReceiptDate, setPReceiptDate] = useState('');

  // Signatures & Place
  const [dPlace, setDPlace] = useState('');
  const [dSignDate, setDSignDate] = useState('');
  const [pPlace, setPPlace] = useState('');
  const [pSignDate, setPSignDate] = useState('');
  const [pAuthName, setPAuthName] = useState('');
  const [pAuthPan, setPAuthPan] = useState('');
  
  const [declSig, setDeclSig] = useState('');
  const [payerSig, setPayerSig] = useState('');

  const formatINR = (num: number) => new Intl.NumberFormat('en-IN').format(num || 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getToday = () => {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-white print:bg-white print:p-0 print:m-0">
      
      {/* Hide Header on Print */}
      <div className="mb-10 flex flex-col gap-4 print:hidden">
        <Link href="/?tab=itr#calculators" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <FileText className="w-5 h-5 text-slate-950" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                Form 121 Generator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base">
              Generate Form No. 121 — Declaration under section 393(6) for receipt of certain incomes without deduction of tax.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-8 items-start relative print:block">
        
        {/* LEFT PANEL - Inputs (Hidden on Print) */}
        <div className="xl:col-span-7 space-y-4 print:hidden">
          
          {/* Identity */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white backdrop-blur-md">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">1</span>
              <div>
                <h2 className="font-bold text-slate-900">Part A — Declarant Details</h2>
                <p className="text-xs text-slate-600">Personal & Contact Information</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name <span className="text-rose-500">*</span></label>
                  <input type="text" value={dName} onChange={e => setDName(e.target.value)} placeholder="Rajesh Kumar" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">PAN <span className="text-rose-500">*</span></label>
                  <input type="text" value={dPan} onChange={e => setDPan(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCDE1234F" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 uppercase" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Status <span className="text-rose-500">*</span></label>
                  <select value={dStatus} onChange={e => setDStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                    <option value="">— Select Status —</option>
                    <option value="Individual (Resident)">Individual (Resident)</option>
                    <option value="Individual (Non-Resident)">Individual (Non-Resident)</option>
                    <option value="HUF">HUF</option>
                    <option value="Firm / LLP">Firm / LLP</option>
                    <option value="AOP / BOI">AOP / BOI</option>
                    <option value="Trust">Trust</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Residential Status <span className="text-rose-500">*</span></label>
                  <select value={dResStatus} onChange={e => setDResStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                    <option value="">— Select —</option>
                    <option value="Resident">Resident</option>
                    <option value="Non-Resident">Non-Resident</option>
                    <option value="Resident but not Ordinarily Resident">Resident but not Ordinarily Resident</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Age 60+ ?</label>
                  <select value={dAge60} onChange={e => setDAge60(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="N/A - Not Individual">N/A - Not Individual</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email / Phone</label>
                  <div className="flex gap-2">
                    <input type="email" value={dEmail} onChange={e => setDEmail(e.target.value)} placeholder="Email" className="w-1/2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    <input type="text" value={dPhone} onChange={e => setDPhone(e.target.value)} placeholder="Phone" className="w-1/2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Tax Year <span className="text-rose-500">*</span></label>
                  <input type="text" value={dTaxYear} onChange={e => setDTaxYear(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              {/* Address */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">🏠 Address of Declarant</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" value={dFlat} onChange={e=>setDFlat(e.target.value)} placeholder="Flat / Door / Building *" className="px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  <input type="text" value={dRoad} onChange={e=>setDRoad(e.target.value)} placeholder="Road / Street / Sector" className="px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  <input type="text" value={dArea} onChange={e=>setDArea(e.target.value)} placeholder="Area / Locality" className="px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  <input type="text" value={dDistrict} onChange={e=>setDDistrict(e.target.value)} placeholder="District / City" className="px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  <div className="flex gap-2">
                    <input type="text" value={dState} onChange={e=>setDState(e.target.value)} placeholder="State" className="w-2/3 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    <input type="text" value={dPin} onChange={e=>setDPin(e.target.value)} placeholder="PIN" className="w-1/3 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={dPo} onChange={e=>setDPo(e.target.value)} placeholder="Post Office" className="w-1/2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    <input type="text" value={dCountry} onChange={e=>setDCountry(e.target.value)} placeholder="Country" className="w-1/2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Income Details */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white backdrop-blur-md">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">2</span>
              <div>
                <h2 className="font-bold text-slate-900">Part A — Income Details</h2>
                <p className="text-xs text-slate-600">Details of income for which this declaration is made</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Nature of Income <span className="text-rose-500">*</span></label>
                <select value={dIncomeNature} onChange={e => setDIncomeNature(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                  <option value="">— Select Nature of Income —</option>
                  <option value="Payment of accumulated balance due to an employee in a recognized provident fund">Payment of accumulated balance — recognised provident fund [Sl. No. (a)]</option>
                  <option value="Insurance commission for soliciting / procuring insurance business including renewal or revival of policies">Insurance commission — soliciting/procuring insurance business [Sl. No. (b)]</option>
                  <option value="Rent from a specified person">Rent from a specified person [Sl. No. (c)]</option>
                  <option value="Income in respect of units of a mutual fund / Administrator of specified undertaking / specified company">Income — units of mutual fund / specified undertaking / specified company [Sl. No. (d)]</option>
                  <option value="Interest on securities / interest other than on securities by banking company or co-operative society / interest by post office on notified scheme">Interest on securities / bank / post office deposit [Sl. No. (e)]</option>
                  <option value="Payment in respect of life insurance policy including bonus allocated">Payment — life insurance policy including bonus [Sl. No. (f)]</option>
                  <option value="Dividend (including preference dividend) declared by a domestic company">Dividend declared by domestic company [Sl. No. (g)]</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Estimated Income (Col 10) <span className="text-rose-500">*</span></label>
                  <input type="number" value={dEstIncome || ''} onChange={e => setDEstIncome(parseInt(e.target.value)||0)} placeholder="0" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">No. of earlier Form 121s (Col 11a)</label>
                  <input type="number" value={dEarlierCount || ''} onChange={e => setDEarlierCount(parseInt(e.target.value)||0)} placeholder="0" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Earlier Aggregate Income (Col 11b)</label>
                  <input type="number" value={dEarlierIncome || ''} onChange={e => setDEarlierIncome(parseInt(e.target.value)||0)} placeholder="0" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Estimated Total Income (Col 13) <span className="text-rose-500">*</span></label>
                  <input type="number" value={dTotalIncome || ''} onChange={e => setDTotalIncome(parseInt(e.target.value)||0)} placeholder="0" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
              </div>

              {/* ITR */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">📋 ITR Details — Previous Two Tax Years (Col 14)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                  <input type="text" value={itr1.year} onChange={e=>setItr1({...itr1, year: e.target.value})} placeholder="Year (e.g. 2024-25)" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                  <input type="text" value={itr1.ack} onChange={e=>setItr1({...itr1, ack: e.target.value})} placeholder="Acknowledgment Number" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                  <input type="text" value={itr1.income} onChange={e=>setItr1({...itr1, income: e.target.value})} placeholder="Return Income (₹)" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input type="text" value={itr2.year} onChange={e=>setItr2({...itr2, year: e.target.value})} placeholder="Year (e.g. 2023-24)" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                  <input type="text" value={itr2.ack} onChange={e=>setItr2({...itr2, ack: e.target.value})} placeholder="Acknowledgment Number" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                  <input type="text" value={itr2.income} onChange={e=>setItr2({...itr2, income: e.target.value})} placeholder="Return Income (₹)" className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Payer Details */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white backdrop-blur-md">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">3</span>
              <div>
                <h2 className="font-bold text-slate-900">Part B — Payer / Deductor Details</h2>
                <p className="text-xs text-slate-600">(Optional — filled by payer after receiving Part A)</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Name of Payer</label>
                  <input type="text" value={pName} onChange={e => setPName(e.target.value)} placeholder="e.g. XYZ Co-operative Bank Ltd." className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">TAN of Payer</label>
                  <input type="text" value={pTan} onChange={e => setPTan(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCD12345E" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">PAN of Payer</label>
                  <input type="text" value={pPan} onChange={e => setPPan(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCDE1234F" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email ID</label>
                  <input type="text" value={pEmail} onChange={e => setPEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Contact Number</label>
                  <input type="text" value={pPhone} onChange={e => setPPhone(e.target.value)} placeholder="Phone" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">📄 Additional Info (Part B)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Unique ID (Col 10)</label>
                    <input type="text" value={pUid} onChange={e => setPUid(e.target.value)} placeholder="Allotted by payer" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Date of Birth / Inc.</label>
                    <input type="text" value={dDob} onChange={e => setDDob(e.target.value)} placeholder="DD/MM/YYYY" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Receipt Date (Col 18)</label>
                    <input type="text" value={pReceiptDate} onChange={e => setPReceiptDate(e.target.value)} placeholder="DD/MM/YYYY" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Place, Date & Generate */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white backdrop-blur-md">
            <div className="px-6 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/30">4</span>
              <div>
                <h2 className="font-bold text-slate-900">Place, Date & Signatures</h2>
                <p className="text-xs text-slate-600">Finalize and preview your Form No. 121</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Place (Declarant Signing)</label>
                  <input type="text" value={dPlace} onChange={e => setDPlace(e.target.value)} placeholder="e.g. Nagpur" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Date (Declarant Signing)</label>
                  <div className="flex gap-2">
                    <input type="text" value={dSignDate} onChange={e => setDSignDate(e.target.value)} placeholder="DD/MM/YYYY" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    <button onClick={() => setDSignDate(getToday())} className="px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-200">Today</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Place (Payer Signing)</label>
                  <input type="text" value={pPlace} onChange={e => setPPlace(e.target.value)} placeholder="e.g. Nagpur" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Date (Payer Signing)</label>
                  <div className="flex gap-2">
                    <input type="text" value={pSignDate} onChange={e => setPSignDate(e.target.value)} placeholder="DD/MM/YYYY" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    <button onClick={() => setPSignDate(getToday())} className="px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-200">Today</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Authorized Person Name (Part B)</label>
                  <input type="text" value={pAuthName} onChange={e => setPAuthName(e.target.value)} placeholder="Name of authorized signatory" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Authorized Person PAN</label>
                  <input type="text" value={pAuthPan} onChange={e => setPAuthPan(e.target.value.toUpperCase())} maxLength={10} placeholder="ABCDE1234F" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 uppercase" />
                </div>
              </div>

              {/* Signature Uploads */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">✍️ Signatures (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Declarant Signature */}
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 relative group">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setDeclSig)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {declSig ? (
                      <div className="flex flex-col items-center z-20 relative">
                        <img src={declSig} alt="Declarant Signature" className="max-h-16 object-contain mb-3" />
                        <button onClick={() => setDeclSig('')} className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold flex items-center gap-1 z-30 hover:bg-rose-200"><Trash2 className="w-3 h-3"/> Remove</button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold text-slate-700">Declarant's Signature</span>
                        <span className="text-xs text-slate-500 mt-1 text-center">Click to upload PNG/JPG</span>
                      </>
                    )}
                  </div>

                  {/* Payer Signature */}
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 relative group">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setPayerSig)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {payerSig ? (
                      <div className="flex flex-col items-center z-20 relative">
                        <img src={payerSig} alt="Payer Signature" className="max-h-16 object-contain mb-3" />
                        <button onClick={() => setPayerSig('')} className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold flex items-center gap-1 z-30 hover:bg-rose-200"><Trash2 className="w-3 h-3"/> Remove</button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold text-slate-700">Payer's Authorized Signatory</span>
                        <span className="text-xs text-slate-500 mt-1 text-center">Click to upload PNG/JPG</span>
                      </>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT PANEL - Preview Dashboard (Expands on Print) */}
        <div className="xl:col-span-5 lg:sticky lg:top-[120px] print:static print:col-span-12 print:w-full print:bg-white print:text-black">
          <div className="rounded-3xl bg-white border border-slate-300 shadow-2xl overflow-hidden print:border-none print:shadow-none print:rounded-none">
            
            {/* Action Bar (Hidden on print) */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center print:hidden">
              <span className="font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-500"/> Document Preview</span>
              <button onClick={() => window.print()} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg text-sm transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>

            {/* Official Form Document */}
            <div className="p-4 sm:p-8 text-[11px] leading-relaxed text-black font-serif print:p-0">
              <div className="text-center mb-6 border-b-2 border-black pb-4">
                <div className="font-bold text-sm tracking-widest uppercase mb-1">Form No. 121</div>
                <div className="font-black text-base">DECLARATION UNDER SECTION 393(6)</div>
                <div className="text-xs italic mt-1">To be made by an individual or a person (not being a company or firm) claiming certain receipts without deduction of tax</div>
              </div>

              <div className="font-bold uppercase mb-2 bg-slate-100 print:bg-white print:border-l-2 border-black px-2 py-1">Part A - Declarant Details</div>
              
              <table className="w-full border-collapse border border-black mb-6">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 w-1/2"><strong>1. Name of Declarant:</strong><br/>{dName || '...........................................'}</td>
                    <td className="border border-black p-2 w-1/2"><strong>2. PAN:</strong><br/>{dPan || '...........................................'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>3. Status:</strong><br/>{dStatus || '...........................'}</td>
                    <td className="border border-black p-2"><strong>4. Residential Status:</strong><br/>{dResStatus || '...........................'}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border border-black p-2">
                      <strong>5. Address:</strong><br/>
                      {[dFlat, dRoad, dArea, dDistrict, dState, dPin, dCountry].filter(Boolean).join(', ') || '......................................................................................................'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>6. Email:</strong><br/>{dEmail || '...........................'}</td>
                    <td className="border border-black p-2"><strong>7. Phone:</strong><br/>{dPhone || '...........................'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>8. Whether age 60 or more?:</strong> {dAge60}</td>
                    <td className="border border-black p-2"><strong>9. Tax Year:</strong> {dTaxYear}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border-collapse border border-black mb-6">
                <tbody>
                  <tr>
                    <td colSpan={2} className="border border-black p-2 bg-slate-50 print:bg-white"><strong>10. Nature of Income:</strong> {dIncomeNature || '......................................................'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 w-1/2"><strong>11. Estimated Income:</strong><br/>₹{formatINR(dEstIncome)}</td>
                    <td className="border border-black p-2 w-1/2"><strong>12. Total Forms Filed:</strong><br/>{dEarlierCount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>13. Aggregate Income (11+12):</strong><br/>₹{formatINR(aggregateIncome)}</td>
                    <td className="border border-black p-2"><strong>14. Total Est. Income for year:</strong><br/>₹{formatINR(dTotalIncome)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="font-bold mb-2">15. Details of Form No. 121 filed earlier during the year</div>
              <table className="w-full border-collapse border border-black mb-6 text-center">
                <thead>
                  <tr className="bg-slate-50 print:bg-white">
                    <th className="border border-black p-1">Year</th>
                    <th className="border border-black p-1">Ack Number</th>
                    <th className="border border-black p-1">Income (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-1">{itr1.year || '-'}</td>
                    <td className="border border-black p-1">{itr1.ack || '-'}</td>
                    <td className="border border-black p-1">₹{itr1.income || '0'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1">{itr2.year || '-'}</td>
                    <td className="border border-black p-1">{itr2.ack || '-'}</td>
                    <td className="border border-black p-1">₹{itr2.income || '0'}</td>
                  </tr>
                </tbody>
              </table>

              <div className="font-bold text-center mb-4 text-sm">DECLARATION / VERIFICATION</div>
              <p className="text-justify mb-8 italic">
                I/We, <strong>{dName || '...........................................'}</strong>, do hereby declare that to the best of my/our knowledge and belief what is stated above is correct, complete and is truly stated. I/We declare that the incomes referred to in this form are not includible in the total income of any other person. I/We further declare that the tax on my/our estimated total income including the income referred to in column 10 computed in accordance with the provisions of the Income-tax Act for the previous year ending on 31st March will be nil.
              </p>

              <div className="flex justify-between items-end mt-12 mb-8">
                <div>
                  Place: {dPlace || '...........................................'}<br/><br/>
                  Date: {dSignDate || '...........................................'}
                </div>
                <div className="text-center flex flex-col items-center">
                  {declSig ? (
                    <img src={declSig} alt="Declarant Signature" className="max-h-12 object-contain mb-1" />
                  ) : (
                    <div className="h-12 border-b border-dashed border-slate-300 w-32 mb-1"></div>
                  )}
                  <strong>Signature of the Declarant</strong>
                </div>
              </div>


              {/* PART B IN PREVIEW */}
              <div className="font-bold uppercase mt-8 mb-2 bg-slate-100 print:bg-white print:border-l-2 border-black px-2 py-1">Part B - Payer Details</div>
              <table className="w-full border-collapse border border-black mb-8">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 w-1/3"><strong>1. Name of Payer:</strong><br/>{pName || '...........................'}</td>
                    <td className="border border-black p-2 w-1/3"><strong>2. PAN:</strong><br/>{pPan || '...........................'}</td>
                    <td className="border border-black p-2 w-1/3"><strong>3. TAN:</strong><br/>{pTan || '...........................'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>4. Email ID:</strong><br/>{pEmail || '...........................'}</td>
                    <td className="border border-black p-2"><strong>5. Contact No:</strong><br/>{pPhone || '...........................'}</td>
                    <td className="border border-black p-2"><strong>6. Unique ID (Col 10):</strong><br/>{pUid || '...........................'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2"><strong>7. DOB / Incorporation:</strong><br/>{dDob || '...........................'}</td>
                    <td colSpan={2} className="border border-black p-2"><strong>8. Date Declaration Received:</strong><br/>{pReceiptDate || '...........................'}</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-justify mb-8 italic">
                Certified that the above declaration has been furnished to me/us by the declarant, and the amount has been paid / credited without deduction of tax.
              </p>

              <div className="flex justify-between items-end mt-12">
                <div>
                  Place: {pPlace || '...........................................'}<br/><br/>
                  Date: {pSignDate || '...........................................'}
                </div>
                <div className="text-center flex flex-col items-center">
                  {payerSig ? (
                    <img src={payerSig} alt="Payer Signature" className="max-h-12 object-contain mb-1" />
                  ) : (
                    <div className="h-12 border-b border-dashed border-slate-300 w-32 mb-1"></div>
                  )}
                  <strong>Signature of Authorized Person</strong><br/>
                  {pAuthName || '......................................'} (PAN: {pAuthPan || '..............'})
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
