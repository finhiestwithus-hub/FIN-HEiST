'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Layers, AlertTriangle, FileSpreadsheet } from 'lucide-react';

// Mock Data for GST HSN/SAC Rates
const GST_RATES_DATA = [
  { code: '0401', description: 'Milk (not concentrated, without added sugar)', rate: '0%', type: 'HSN' },
  { code: '0406', description: 'Cheese and curd', rate: '12%', type: 'HSN' },
  { code: '0901', description: 'Coffee, whether or not roasted or decaffeinated', rate: '5%', type: 'HSN' },
  { code: '0902', description: 'Tea, whether or not flavoured', rate: '5%', type: 'HSN' },
  { code: '1905', description: 'Bread, pastries, cakes, biscuits and other bakers wares', rate: '18%', type: 'HSN' },
  { code: '2106', description: 'Food preparations not elsewhere specified or included', rate: '18%', type: 'HSN' },
  { code: '3004', description: 'Medicaments consisting of mixed or unmixed products for therapeutic uses', rate: '12%', type: 'HSN' },
  { code: '8471', description: 'Automatic data processing machines (Computers, Laptops)', rate: '18%', type: 'HSN' },
  { code: '8517', description: 'Telephones for cellular networks (Smartphones)', rate: '18%', type: 'HSN' },
  { code: '8703', description: 'Motor cars and other motor vehicles (Passenger Cars)', rate: '28% + Cess', type: 'HSN' },
  
  { code: '9954', description: 'Construction services', rate: '18%', type: 'SAC' },
  { code: '9963', description: 'Accommodation, food and beverage services (Restaurants)', rate: '5% (Without ITC) / 18% (With ITC)', type: 'SAC' },
  { code: '9973', description: 'Leasing or rental services without operator', rate: '18%', type: 'SAC' },
  { code: '9982', description: 'Legal and accounting services', rate: '18%', type: 'SAC' },
  { code: '9983', description: 'Other professional, technical and business services (IT Services)', rate: '18%', type: 'SAC' },
];

export default function GSTRatesFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'HSN (Goods)' | 'SAC (Services)'>('All');

  const filteredData = useMemo(() => {
    return GST_RATES_DATA.filter((item) => {
      const matchesSearch = 
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const tabType = activeTab === 'HSN (Goods)' ? 'HSN' : activeTab === 'SAC (Services)' ? 'SAC' : 'All';
      const matchesTab = tabType === 'All' || item.type === tabType;
      
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 mb-6 border border-blue-500/20">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          GST HSN & SAC <span className="text-blue-600">Code Finder</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Search thousands of goods and services to find the correct HSN/SAC codes and their applicable GST rates for your billing and compliance.
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
              className="block w-full pl-11 pr-4 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder-slate-400"
              placeholder="Search by Product Name (e.g. Coffee, IT Services) or Code (e.g. 9983)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-slate-100 rounded-xl p-1 md:w-96">
            {['All', 'HSN (Goods)', 'SAC (Services)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
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
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200 w-32">HSN / SAC</th>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200">Description of Goods/Services</th>
                <th scope="col" className="px-6 py-4 border-b-2 border-slate-200 w-48 text-right">GST Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className={`inline-block px-2 py-1 rounded text-xs mr-2 ${item.type === 'HSN' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.type}
                      </span>
                      {item.code}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 leading-relaxed">{item.description}</td>
                    <td className="px-6 py-4 font-bold text-blue-600 text-right text-base">{item.rate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-10 w-10 text-slate-300 mb-3" />
                      <p className="text-lg font-bold text-slate-600">No matching HSN/SAC codes found.</p>
                      <p className="text-sm">Try using broader search terms.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      <div className="text-center mt-6">
        <Link href="/?contact=gst" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-poppins font-extrabold text-sm shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 transition-all gap-2">
          <FileSpreadsheet className="w-5 h-5" />
          Consult For GST Registration & e-Invoicing
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> The GST rates and HSN/SAC codes provided in this tool are for informational purposes only and represent a small subset of the complete GST tariff. Rates are subject to change based on GST Council meetings and official notifications. Always consult a qualified Chartered Accountant before issuing official tax invoices or filing GST returns.
        </p>
      </div>

    </div>
  );
}
