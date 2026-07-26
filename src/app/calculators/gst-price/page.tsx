"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Tag, AlertTriangle, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  cost: number;
  gstRate: number;
  mrp: number;
  calcMode: 'margin' | 'target';
  marginType: 'onCost' | 'onSale';
  marginValue: number;
  targetPrice: number;
}

export default function GSTProductPriceCalculator() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Product 1',
      cost: 1000,
      gstRate: 18,
      mrp: 1500,
      calcMode: 'margin',
      marginType: 'onCost',
      marginValue: 20,
      targetPrice: 1500,
    }
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Product ${products.length + 1}`,
        cost: 0,
        gstRate: 18,
        mrp: 0,
        calcMode: 'margin',
        marginType: 'onCost',
        marginValue: 0,
        targetPrice: 0,
      }
    ]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num || 0);
  };

  // Compute results for each product and totals
  const { computedProducts, totals } = useMemo(() => {
    let totalCost = 0;
    let totalProfit = 0;
    let totalGst = 0;
    let totalFinal = 0;

    const computed = products.map(p => {
      let basePrice = 0;
      let profit = 0;
      let gstAmount = 0;
      let finalPrice = 0;
      let actualMarginOnCost = 0;
      let actualMarginOnSale = 0;

      if (p.calcMode === 'margin') {
        if (p.marginType === 'onCost') {
          profit = p.cost * (p.marginValue / 100);
          basePrice = p.cost + profit;
        } else {
          // margin on sale
          basePrice = p.marginValue < 100 ? p.cost / (1 - (p.marginValue / 100)) : p.cost;
          profit = basePrice - p.cost;
        }
        gstAmount = basePrice * (p.gstRate / 100);
        finalPrice = basePrice + gstAmount;
        
        actualMarginOnCost = p.cost > 0 ? (profit / p.cost) * 100 : 0;
        actualMarginOnSale = basePrice > 0 ? (profit / basePrice) * 100 : 0;
      } else {
        // Target Price mode
        finalPrice = p.targetPrice;
        basePrice = finalPrice / (1 + (p.gstRate / 100));
        gstAmount = finalPrice - basePrice;
        profit = basePrice - p.cost;

        actualMarginOnCost = p.cost > 0 ? (profit / p.cost) * 100 : 0;
        actualMarginOnSale = basePrice > 0 ? (profit / basePrice) * 100 : 0;
      }

      const isMRPCompliant = finalPrice <= p.mrp || p.mrp === 0;

      totalCost += p.cost;
      totalProfit += profit;
      totalGst += gstAmount;
      totalFinal += finalPrice;

      return {
        ...p,
        basePrice,
        profit,
        gstAmount,
        finalPrice,
        actualMarginOnCost,
        actualMarginOnSale,
        isMRPCompliant,
      };
    });

    return { 
      computedProducts: computed, 
      totals: { totalCost, totalProfit, totalGst, totalFinal }
    };
  }, [products]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1760px] mx-auto animate-fadeIn bg-slate-50 pb-40">
      
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/?tab=gst#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
                Product Price & Margin Finder
              </h1>
            </div>
            <p className="text-slate-600 font-inter text-sm sm:text-base">
              Calculate exact selling prices, profit margins, and GST for multiple products. Features a live MRP compliance check to ensure you never overcharge.
            </p>
          </div>
          <button 
            onClick={addProduct}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 whitespace-nowrap shadow-xl shadow-slate-900/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {computedProducts.map((prod, index) => (
          <div key={prod.id} className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xl shadow-slate-200/40 transition-all hover:shadow-2xl hover:shadow-slate-200/60">
            
            {/* Card Header */}
            <div className="px-6 py-4 flex items-center justify-between bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-200">{index + 1}</span>
                <input 
                  type="text" 
                  value={prod.name} 
                  onChange={e => updateProduct(prod.id, 'name', e.target.value)}
                  className="font-bold text-slate-900 bg-transparent border-b border-transparent focus:border-amber-500 focus:outline-none px-1 py-0.5 transition-colors"
                />
              </div>
              {products.length > 1 && (
                <button onClick={() => removeProduct(prod.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Inputs */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Purchase Cost (₹)</label>
                    <input type="number" value={prod.cost || ''} onChange={e => updateProduct(prod.id, 'cost', parseFloat(e.target.value)||0)} placeholder="0" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">GST Rate (%)</label>
                    <select value={prod.gstRate} onChange={e => updateProduct(prod.id, 'gstRate', parseInt(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                      <option value="0">0%</option>
                      <option value="3">3%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                      <option value="40">40%</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">MRP Printed (₹)</label>
                    <input type="number" value={prod.mrp || ''} onChange={e => updateProduct(prod.id, 'mrp', parseFloat(e.target.value)||0)} placeholder="0" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Calculation Mode</label>
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                    <button onClick={() => updateProduct(prod.id, 'calcMode', 'margin')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${prod.calcMode === 'margin' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Target Margin</button>
                    <button onClick={() => updateProduct(prod.id, 'calcMode', 'target')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${prod.calcMode === 'target' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>Target Invoice Price</button>
                  </div>

                  {prod.calcMode === 'margin' ? (
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Margin Type</label>
                        <select value={prod.marginType} onChange={e => updateProduct(prod.id, 'marginType', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500">
                          <option value="onCost">Margin % on Cost</option>
                          <option value="onSale">Margin % on Sales</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Margin (%)</label>
                        <input type="number" value={prod.marginValue || ''} onChange={e => updateProduct(prod.id, 'marginValue', parseFloat(e.target.value)||0)} placeholder="0" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Final Target Price (incl. GST)</label>
                      <input type="number" value={prod.targetPrice || ''} onChange={e => updateProduct(prod.id, 'targetPrice', parseFloat(e.target.value)||0)} placeholder="0" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500" />
                    </div>
                  )}
                </div>

              </div>

              {/* Results */}
              <div className="p-6 bg-slate-900 text-white flex flex-col justify-between">
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Selling Price (Taxable)</h3>
                      <div className="text-2xl font-extrabold text-white">{formatINR(prod.basePrice)}</div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">GST ({prod.gstRate}%)</h3>
                      <div className="text-xl font-bold text-amber-500">{formatINR(prod.gstAmount)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-slate-700/50">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Profit Amount</h3>
                      <div className={`text-lg font-bold ${prod.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {formatINR(prod.profit)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Actual Margins</h3>
                      <div className="text-xs text-slate-300 font-medium">On Cost: {prod.actualMarginOnCost.toFixed(2)}%</div>
                      <div className="text-xs text-slate-300 font-medium">On Sale: {prod.actualMarginOnSale.toFixed(2)}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-end mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Final Invoice Value</h3>
                    <div className="text-xl sm:text-3xl font-black text-white">{formatINR(prod.finalPrice)}</div>
                  </div>

                  {/* MRP Compliance Badge */}
                  {prod.mrp > 0 && (
                    <div className={`p-3 rounded-xl flex items-start gap-2 ${prod.isMRPCompliant ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
                      {prod.isMRPCompliant ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="text-sm font-medium">
                        {prod.isMRPCompliant 
                          ? `MRP Compliant. Final price is ₹${(prod.mrp - prod.finalPrice).toFixed(2)} below MRP.` 
                          : `Compliance Error! Final price exceeds MRP (₹${prod.mrp}) by ₹${(prod.finalPrice - prod.mrp).toFixed(2)}.`
                        }
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Summary Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-4 flex justify-between items-center overflow-x-auto gap-4 sm:gap-8">
          <div className="flex gap-4 sm:gap-8">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Total Products</div>
              <div className="text-lg font-black text-slate-900">{products.length}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Total Cost</div>
              <div className="text-lg font-bold text-slate-700">{formatINR(totals.totalCost)}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Total GST</div>
              <div className="text-lg font-bold text-slate-700">{formatINR(totals.totalGst)}</div>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-8 items-center pl-8 border-l border-slate-200">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500"/> Total Profit</div>
              <div className={`text-xl font-black ${totals.totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {formatINR(totals.totalProfit)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1"><DollarSign className="w-3 h-3 text-amber-500"/> Total Invoice Value</div>
              <div className="text-2xl font-black text-slate-900">
                {formatINR(totals.totalFinal)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
