"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Plus, X, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type LineItem = {
  id: string;
  name: string;
  amount: number | '';
};

type Category = {
  id: string;
  title: string;
  type: 'asset' | 'liability';
  items: LineItem[];
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'fixed_assets',
    title: 'Fixed Assets',
    type: 'asset',
    items: [
      { id: generateId(), name: 'Residential Property', amount: '' },
      { id: generateId(), name: 'Land / Plot', amount: '' },
      { id: generateId(), name: 'Vehicle', amount: '' },
    ]
  },
  {
    id: 'financial_assets',
    title: 'Financial Assets',
    type: 'asset',
    items: [
      { id: generateId(), name: 'Mutual Funds', amount: '' },
      { id: generateId(), name: 'Stocks / Shares', amount: '' },
      { id: generateId(), name: 'PPF / EPF / NPS', amount: '' },
      { id: generateId(), name: 'Fixed Deposits', amount: '' },
    ]
  },
  {
    id: 'liquid_assets',
    title: 'Liquid Assets',
    type: 'asset',
    items: [
      { id: generateId(), name: 'Bank Savings Account', amount: '' },
      { id: generateId(), name: 'Cash in Hand', amount: '' },
    ]
  },
  {
    id: 'other_assets',
    title: 'Other Assets',
    type: 'asset',
    items: [
      { id: generateId(), name: 'Gold / Jewellery', amount: '' },
      { id: generateId(), name: 'Life Insurance (Surrender Value)', amount: '' },
    ]
  },
  {
    id: 'secured_loans',
    title: 'Secured Loans',
    type: 'liability',
    items: [
      { id: generateId(), name: 'Home Loan', amount: '' },
      { id: generateId(), name: 'Car Loan', amount: '' },
    ]
  },
  {
    id: 'unsecured_loans',
    title: 'Unsecured Loans',
    type: 'liability',
    items: [
      { id: generateId(), name: 'Personal Loan', amount: '' },
      { id: generateId(), name: 'Credit Card Outstanding', amount: '' },
    ]
  },
  {
    id: 'other_liabilities',
    title: 'Other Liabilities',
    type: 'liability',
    items: [
      { id: generateId(), name: 'Loans from Friends/Family', amount: '' },
    ]
  }
];

export default function NetWorthCalculator() {
  const [clientName, setClientName] = useState<string>('');
  const [asOnDate, setAsOnDate] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const handleUpdateItem = (categoryId: string, itemId: string, field: 'name' | 'amount', value: string | number) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return { ...item, [field]: value };
        })
      };
    }));
  };

  const handleAddItem = (categoryId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: [...cat.items, { id: generateId(), name: '', amount: '' }]
      };
    }));
  };

  const handleRemoveItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      };
    }));
  };

  // Calculations
  const { totalAssets, totalLiabilities, netWorth, debtToAssetRatio } = useMemo(() => {
    let assets = 0;
    let liabilities = 0;

    categories.forEach(cat => {
      cat.items.forEach(item => {
        const amt = Number(item.amount) || 0;
        if (cat.type === 'asset') assets += amt;
        if (cat.type === 'liability') liabilities += amt;
      });
    });

    const ratio = assets > 0 ? (liabilities / assets) * 100 : 0;

    return {
      totalAssets: assets,
      totalLiabilities: liabilities,
      netWorth: assets - liabilities,
      debtToAssetRatio: ratio
    };
  }, [categories]);

  const chartData = [
    { name: 'Total Assets', value: totalAssets },
    { name: 'Total Liabilities', value: totalLiabilities }
  ];
  const COLORS = ['#10b981', '#ef4444']; // emerald-500, red-500

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
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                Net Worth Calculator
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed">
              Calculate your precise net worth by compiling your assets and liabilities. Ideal for loan applications, visa processes, or personal financial tracking.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-8 items-start">
        
        {/* Left Column - Inputs */}
        <div className="w-full xl:w-[60%] flex flex-col gap-6">
          
          {/* Metadata */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Name of Individual / Entity</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">As On Date</label>
                <input
                  type="date"
                  value={asOnDate}
                  onChange={(e) => setAsOnDate(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-semibold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
              Your Assets
            </h3>
            
            <div className="space-y-8">
              {categories.filter(c => c.type === 'asset').map(category => (
                <div key={category.id} className="bg-white rounded-2xl p-5 border border-emerald-100/50">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">{category.title}</h4>
                  
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="flex-grow w-full sm:w-auto">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(category.id, item.id, 'name', e.target.value)}
                            placeholder="Asset Name"
                            className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div className="w-full sm:w-48 relative flex-shrink-0">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-400 font-medium text-sm">₹</span>
                          </div>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => handleUpdateItem(category.id, item.id, 'amount', e.target.value ? Number(e.target.value) : '')}
                            placeholder="0"
                            className="block w-full pl-8 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem(category.id, item.id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors self-end sm:self-auto"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleAddItem(category.id)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add {category.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <h3 className="text-lg font-bold text-rose-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
              Your Liabilities
            </h3>
            
            <div className="space-y-8">
              {categories.filter(c => c.type === 'liability').map(category => (
                <div key={category.id} className="bg-white rounded-2xl p-5 border border-rose-100/50">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">{category.title}</h4>
                  
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="flex-grow w-full sm:w-auto">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(category.id, item.id, 'name', e.target.value)}
                            placeholder="Liability Name"
                            className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                          />
                        </div>
                        <div className="w-full sm:w-48 relative flex-shrink-0">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-400 font-medium text-sm">₹</span>
                          </div>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => handleUpdateItem(category.id, item.id, 'amount', e.target.value ? Number(e.target.value) : '')}
                            placeholder="0"
                            className="block w-full pl-8 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem(category.id, item.id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors self-end sm:self-auto"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleAddItem(category.id)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add {category.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="w-full xl:w-[40%] flex flex-col gap-6 xl:sticky xl:top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 h-full flex flex-col relative overflow-hidden">
            
            {/* Background flourish */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2 relative z-10">
              <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </span>
              Net Worth Summary
            </h3>

            {/* Main Result */}
            <div className={`rounded-2xl p-6 mb-6 border relative z-10 shadow-sm ${
              netWorth >= 0 
                ? 'bg-amber-500 border-amber-600 text-white' 
                : 'bg-red-500 border-red-600 text-white'
            }`}>
              <p className="text-sm font-bold opacity-90 mb-1">Total Net Worth</p>
              <p className="text-2xl sm:text-4xl font-black tracking-tight">
                {netWorth < 0 ? '-' : ''}₹{Math.abs(netWorth).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>

            {/* Assets & Liabilities Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Total Assets</p>
                <p className="text-xl font-bold text-emerald-600">
                  ₹{totalAssets.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Total Liabilities</p>
                <p className="text-xl font-bold text-rose-600">
                  ₹{totalLiabilities.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Debt to Asset Ratio */}
            <div className={`rounded-2xl p-4 mb-8 border relative z-10 flex items-start gap-3 ${
              debtToAssetRatio > 60 
                ? 'bg-rose-50 border-rose-200 text-rose-900' 
                : debtToAssetRatio > 40
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                debtToAssetRatio > 60 ? 'text-rose-500' : debtToAssetRatio > 40 ? 'text-amber-500' : 'text-emerald-500'
              }`} />
              <div>
                <p className="text-sm font-bold mb-0.5">Debt-to-Asset Ratio: {debtToAssetRatio.toFixed(1)}%</p>
                <p className="text-xs font-medium opacity-80 leading-relaxed">
                  {debtToAssetRatio > 60 
                    ? 'High financial risk. Liabilities exceed 60% of assets.' 
                    : debtToAssetRatio > 40
                      ? 'Moderate risk. Consider reducing debt to improve financial health.'
                      : 'Healthy ratio. Your assets comfortably cover your liabilities.'}
                </p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-grow flex flex-col items-center justify-center min-h-[250px] relative z-10">
              {totalAssets > 0 || totalLiabilities > 0 ? (
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
                  <p className="text-sm font-medium">Add amounts to see breakdown</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
