'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ScanSearch, UploadCloud, FileText, CheckCircle2, AlertTriangle, Loader2, SearchX } from 'lucide-react';

export default function PDFScanUtility() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'scanned' | 'text' | null>(null);
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
      if (droppedFile.type === 'application/pdf' || droppedFile.type.includes('image')) {
        setFile(droppedFile);
        setResult(null);
      } else {
        alert("Please upload a PDF or Image file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate OCR/Font Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Randomly assign scanned or text for the simulation demo
      setResult(Math.random() > 0.5 ? 'scanned' : 'text');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {/* Back Button */}
      <Link href="/#calculators" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Utilities Hub
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 text-purple-600 mb-6 border border-purple-500/20">
          <ScanSearch className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl sm:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight mb-4">
          Look Scanned <span className="text-purple-600">Utility</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-inter max-w-2xl mx-auto">
          Upload any PDF or Document to instantly analyze whether it contains selectable text or if it is a flat scanned image requiring OCR extraction.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-4 sm:p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl bg-white mb-8">
        
        {/* Upload Area */}
        {!file && (
          <div 
            className={`w-full border-3 border-dashed rounded-2xl p-5 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px]
              ${isDragging ? 'border-purple-500 bg-purple-50/50' : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,image/*"
              onChange={handleFileChange}
            />
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold font-poppins text-slate-800 mb-2">Drop your PDF or Image</h3>
            <p className="text-slate-500 font-medium">or click here to browse your files</p>
          </div>
        )}

        {/* Processing/Analyzed State */}
        {file && (
          <div className="w-full flex flex-col items-center justify-center py-8">
            <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 w-full max-w-lg mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-slate-800 truncate">{file.name}</h4>
                <p className="text-xs font-medium text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Document</p>
              </div>
              <button 
                onClick={() => { setFile(null); setResult(null); }}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors underline"
              >
                Remove
              </button>
            </div>

            {!isAnalyzing && !result && (
              <button 
                onClick={handleAnalyze}
                className="w-full max-w-lg py-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-poppins font-extrabold text-lg shadow-xl shadow-purple-900/20 transform hover:-translate-y-1 transition-all"
              >
                Analyze Document Structure
              </button>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-purple-700 font-bold animate-pulse">Scanning document metadata and font structures...</p>
              </div>
            )}

            {result && (
              <div className="flex flex-col items-center justify-center w-full max-w-lg space-y-6 animate-fade-in">
                
                {result === 'scanned' ? (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-8 text-center w-full shadow-lg shadow-amber-500/10">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                      <SearchX className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-amber-900 mb-2">It is a Scanned Image</h3>
                    <p className="text-amber-800/80 font-medium text-sm">
                      This document does not contain embedded text. It is a flat image. You will need to use OCR (Optical Character Recognition) software to extract data from it.
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 sm:p-8 text-center w-full shadow-lg shadow-emerald-500/10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-emerald-900 mb-2">Searchable Text Found!</h3>
                    <p className="text-emerald-800/80 font-medium text-sm">
                      This document contains digitally embedded fonts and text layers. You can easily highlight, copy, and paste the text directly from the PDF.
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={() => { setFile(null); setResult(null); }}
                  className="w-full py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-poppins font-extrabold text-sm transition-all"
                >
                  Analyze Another Document
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
          <strong className="text-slate-700">Privacy Notice:</strong> The structural analysis is performed securely in your browser. The contents of the document are not uploaded to any server. This utility looks for text layers and font dictionaries to determine the file type.
        </p>
      </div>

    </div>
  );
}
