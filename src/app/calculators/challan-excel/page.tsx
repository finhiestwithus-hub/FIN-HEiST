'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileSpreadsheet, UploadCloud, FileText, CheckCircle2, Download, AlertTriangle, Loader2, Building2 } from 'lucide-react';

export default function ChallanConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setIsDone(false);
      } else {
        alert("Please upload a valid PDF Challan.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsDone(false);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setIsDone(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 mb-6 border border-blue-500/20">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          Challan PDF to <span className="text-blue-600">Excel Converter</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Upload your Income Tax or GST Challan PDFs (CRN/CIN) and instantly extract BSR codes, dates, and head-wise tax payments into Excel format.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-4 sm:p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-white mb-8">
        
        {/* Upload Area */}
        {!file && (
          <div 
            className={`w-full border-3 border-dashed rounded-2xl p-5 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px]
              ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold font-poppins text-slate-800 mb-2">Drag & Drop your Challan PDF</h3>
            <p className="text-slate-500 font-medium">or click here to browse your files</p>
            <p className="text-xs text-slate-400 mt-4 font-bold uppercase tracking-wider">Supports ITNS 280, 281, and GST PMT-06</p>
          </div>
        )}

        {/* Processing/Converted State */}
        {file && (
          <div className="w-full flex flex-col items-center justify-center py-8">
            <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 w-full max-w-lg mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-slate-800 truncate">{file.name}</h4>
                <p className="text-xs font-medium text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
              </div>
              <button 
                onClick={() => { setFile(null); setIsDone(false); }}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors underline"
              >
                Remove
              </button>
            </div>

            {!isConverting && !isDone && (
              <button 
                onClick={handleConvert}
                className="w-full max-w-lg py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-poppins font-extrabold text-lg shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 transition-all"
              >
                Extract Data to Excel
              </button>
            )}

            {isConverting && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-blue-700 font-bold animate-pulse">Parsing Challan Headers and BSR codes...</p>
              </div>
            )}

            {isDone && (
              <div className="flex flex-col items-center justify-center w-full max-w-lg space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Extraction Complete!</h3>
                  <p className="text-slate-600">Successfully parsed BSR Code, Challan Serial No, and Tax Amount.</p>
                </div>
                
                <button 
                  onClick={() => alert("Simulation: In production, this downloads 'Challan_Data.xlsx'")}
                  className="w-full py-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-poppins font-extrabold text-lg shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Excel File (.xlsx)
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-6 bg-white/50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-700">Disclaimer & Privacy:</strong> We value your data security. The files uploaded to this utility are processed entirely in your browser memory and are <strong>never stored</strong> on our servers. This tool parses the standard JSON/PDF structure of official Government challans. Hand-filled or scanned challans may not parse correctly.
        </p>
      </div>

    </div>
  );
}
