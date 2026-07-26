"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, ShieldAlert, Package, Briefcase, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface GstItem {
  code: string;
  type: 'Goods' | 'Service';
  description: string;
  rate: number;
}

import gstRatesData from '@/data/gstRatesData.json';

const gstDatabase: GstItem[] = gstRatesData as GstItem[];
const ITEMS_PER_PAGE = 24;

export default function GSTRateFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Goods' | 'Service'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Real-time filtering
  const filteredData = useMemo(() => {
    return gstDatabase.filter((item) => {
      // Filter by type
      if (filter !== 'All' && item.type !== filter) return false;
      
      // Filter by search query
      if (searchQuery.trim() === '') return true;
      const query = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, filter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (f: 'All' | 'Goods' | 'Service') => {
    setFilter(f);
    setCurrentPage(1);
  };

  const getRateColor = (rate: number) => {
    switch (rate) {
      case 0: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 3: return 'bg-blue-100 text-blue-700 border-blue-200';
      case 5: return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 18: return 'bg-amber-100 text-amber-700 border-amber-200';
      case 40: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-slate-50">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=gst#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                GST Rate Finder
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base">
              Updated as per <strong>GST 2.0 (22 Sept 2025)</strong>. Search by HSN / SAC code or product/service name to find the new simplified rates: 0%, 5%, 18%, and 40%.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xl shadow-slate-200/50 mb-10 sticky top-4 z-40">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-slate-900 font-medium transition-all"
              placeholder="Search through 1,673 HSN / SAC Codes or Item Descriptions..."
            />
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl self-stretch">
            {(['All', 'Goods', 'Service'] as const).map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  filter === f
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {f === 'All' && <Filter className="w-4 h-4" />}
                {f === 'Goods' && <Package className="w-4 h-4" />}
                {f === 'Service' && <Briefcase className="w-4 h-4" />}
                {f}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Results Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No results found</h3>
          <p className="text-slate-500">We couldn't find any GST rates matching "{searchQuery}". Try different keywords.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm font-bold text-slate-500">
            Showing {paginatedData.length} of {filteredData.length} results
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {paginatedData.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.type === 'Goods' ? 'bg-indigo-50 text-indigo-600' : 'bg-fuchsia-50 text-fuchsia-600'}`}>
                        {item.type}
                      </span>
                      <span className="text-sm font-bold text-slate-400 font-mono">
                        {item.type === 'Goods' ? 'HSN' : 'SAC'} {item.code}
                      </span>
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl border ${getRateColor(item.rate)} flex flex-col items-center justify-center`}>
                      <span className="text-lg font-black">{item.rate}%</span>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium group-hover:text-slate-900 transition-colors line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-16">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-slate-600 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto mt-20 p-4 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
        <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-4">Disclaimer regarding GST Rates</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          This GST Rate Finder reflects rates as revised by the 56th GST Council (GST 2.0), effective 22 September 2025, vide Notification No. 10/2025–Central Tax (Rate) dated 17 September 2025. The 12% and 28% slabs have been withdrawn, and a 40% slab has been introduced for specified sin and luxury goods.
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          While reasonable care has been taken to ensure accuracy, actual GST liability may vary depending on the applicable HSN/SAC classification, nature of supply, place of supply, exemption notifications, and subsequent amendments. This tool is provided purely for general informational and educational purposes. Always consult a qualified Chartered Accountant for professional advice before making any compliance decisions.
        </p>
      </div>

    </div>
  );
}
