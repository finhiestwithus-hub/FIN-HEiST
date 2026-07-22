'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Percent, AlertTriangle, FileText } from 'lucide-react';

// Mock Data for TDS Rates
const TDS_RATES_DATA = [
  { section: '192', nature: 'Salary', rate: 'Normal Slab Rates', threshold: 'Basic Exemption Limit', type: 'TDS' },
  { section: '194A', nature: 'Interest other than "Interest on securities"', rate: '10%', threshold: '₹40,000 (₹50,000 for Senior Citizens)', type: 'TDS' },
  { section: '194C', nature: 'Payment to Contractors', rate: '1% (Ind/HUF) | 2% (Others)', threshold: '₹30,000 (Single) | ₹1,00,000 (Aggregate)', type: 'TDS' },
  { section: '194D', nature: 'Insurance Commission', rate: '5%', threshold: '₹15,000', type: 'TDS' },
  { section: '194H', nature: 'Commission or Brokerage', rate: '5%', threshold: '₹15,000', type: 'TDS' },
  { section: '194I(a)', nature: 'Rent (Plant & Machinery)', rate: '2%', threshold: '₹2,40,000', type: 'TDS' },
  { section: '194I(b)', nature: 'Rent (Land & Building or Furniture)', rate: '10%', threshold: '₹2,40,000', type: 'TDS' },
  { section: '194J', nature: 'Professional or Technical Services', rate: '10% (Prof.) | 2% (Tech.)', threshold: '₹30,000', type: 'TDS' },
  { section: '194Q', nature: 'Purchase of Goods', rate: '0.1%', threshold: '₹50,00,000', type: 'TDS' },
  { section: '206C(1H)', nature: 'Sale of Goods', rate: '0.1%', threshold: '₹50,00,000', type: 'TCS' },
];

export default function TDSRatesFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'TDS' | 'TCS'>('All');

  const filteredData = useMemo(() => {
    return TDS_RATES_DATA.filter((item) => {
      const matchesSearch = 
        item.section.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.nature.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All' || item.type === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
          <Percent className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          TDS & TCS Rate <span className="text-red-600">Finder</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Instantly find the applicable TDS or TCS section, prevailing deduction rates, and basic exemption thresholds for FY 2024-25.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xl bg-white mb-8">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium placeholder-slate-400"
              placeholder="Search by Section (e.g. 194J) or Nature (e.g. Rent, Contract)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-slate-100 rounded-xl p-1 md:w-64">
            {['All', 'TDS', 'TCS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto border-2 border-slate-100 rounded-2xl">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-poppins text-xs uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200">Section</th>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200">Nature of Payment</th>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200">TDS/TCS Rate</th>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200">Threshold Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className={`inline-block px-2 py-1 rounded text-xs mr-2 ${item.type === 'TDS' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {item.type}
                      </span>
                      {item.section}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{item.nature}</td>
                    <td className="px-6 py-4 font-bold text-red-600">{item.rate}</td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-500">{item.threshold}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-lg font-bold text-slate-600">No matching sections found.</p>
                      <p className="text-sm">Try adjusting your search terms.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      <div className="text-center mt-6">
        <Link href="/?contact=tds" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-poppins font-extrabold text-sm shadow-xl shadow-slate-900/20 transform hover:-translate-y-1 transition-all gap-2">
          <FileText className="w-5 h-5" />
          Need Help Filing TDS Returns?
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> This utility provides a simplified summary of prevailing TDS and TCS rates for FY 2024-25. Applicable rates may vary based on the payee's PAN status (e.g. 20% if PAN is not furnished), surcharge applicability, and specific sub-sections. Please refer to the official Income Tax Act or consult our Chartered Accountants before deducting tax.
        </p>
      </div>

    </div>
  );
}
