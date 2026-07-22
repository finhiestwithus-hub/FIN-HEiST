'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, AlertTriangle, Building, User, FileSignature } from 'lucide-react';

export default function Form121Generator() {
  const [formData, setFormData] = useState({
    companyName: '',
    panNumber: '',
    address: '',
    assessmentYear: '2024-25',
    appealMatter: '',
    taxDisputed: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate generation
    alert("Draft Form 121 has been generated! (This is a preview simulation. In production, this would download a filled PDF).");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-600 mb-6 border border-indigo-500/20">
          <FileSignature className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          Form No. 121 <span className="text-indigo-600">Generator</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Instantly generate a draft Form No. 121 for filing appeals. Enter the basic appellant details to prepare a standardized document for your CA.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-white mb-8">
        <form onSubmit={handleGenerate} className="space-y-8">
          
          {/* Section 1: Appellant Info */}
          <div>
            <h3 className="text-lg font-bold font-poppins text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-indigo-500" />
              Appellant Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Name of Appellant</label>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp Pvt Ltd"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">PAN Number</label>
                <input 
                  type="text" 
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. ABCDE1234F"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-mono uppercase"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-slate-700">Registered Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete registered address of the appellant..."
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium min-h-[100px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Appeal Info */}
          <div>
            <h3 className="text-lg font-bold font-poppins text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building className="w-5 h-5 text-indigo-500" />
              Appeal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Assessment Year</label>
                <select 
                  name="assessmentYear"
                  value={formData.assessmentYear}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-bold cursor-pointer"
                >
                  <option value="2022-23">2022-23</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Tax Amount Disputed (₹)</label>
                <input 
                  type="number" 
                  name="taxDisputed"
                  value={formData.taxDisputed}
                  onChange={handleInputChange}
                  placeholder="e.g. 500000"
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-slate-700">Subject Matter of Appeal</label>
                <textarea 
                  name="appealMatter"
                  value={formData.appealMatter}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the grounds of appeal..."
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium min-h-[120px]"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-poppins font-extrabold text-lg shadow-xl shadow-indigo-900/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            <Download className="w-6 h-6" />
            Generate Draft Form 121 (PDF)
          </button>
        </form>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer:</strong> Form No. 121 generation via this tool is for drafting and educational purposes only. Appeals before the Commissioner of Income Tax (Appeals) require rigorous legal drafting, verified grounds of appeal, and digital signature attachment on the official Income Tax portal. Please consult our panel of Chartered Accountants to legally file your appeal.
        </p>
      </div>

    </div>
  );
}
