'use client';

import React, { useState } from 'react';
import { BANK_LOAN_CATEGORIES } from '../../data/mockData';
import { 
  Building, Briefcase, Landmark, Wallet, Home, Truck, 
  CheckCircle2, ArrowRight, Calculator, AlertTriangle, ShieldCheck, TrendingUp, Sparkles, Layers 
} from 'lucide-react';

interface BankLoanAssistanceProps {
  onOpenModal: (service?: string) => void;
}

export default function BankLoanAssistance({ onOpenModal }: BankLoanAssistanceProps) {
  const [loanAmount, setLoanAmount] = useState<number>(35); // in Lakhs
  const [annualProfit, setAnnualProfit] = useState<number>(18); // in Lakhs

  const iconMap: { [key: string]: any } = {
    Building,
    Briefcase,
    Landmark,
    Wallet,
    Home,
    Truck,
  };

  // Simple DSCR simulation calculation
  const estimatedEMIYearly = (loanAmount * 100000 * 0.11); // approx 11% interest benchmark
  const simulatedDSCR = annualProfit * 100000 > 0 ? ((annualProfit * 100000) / estimatedEMIYearly).toFixed(2) : '0.00';
  const isHealthy = Number(simulatedDSCR) >= 1.5;

  return (
    <section id="bank-loans" className="py-28 bg-mesh-soft relative overflow-hidden border-t border-slate-200/80">
      {/* Top Gold Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

      {/* Decorative ambient blobs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-blob" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-[150px] pointer-events-none animate-blob float-delay-3" />

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-bold text-amber-800 animate-card-tilt shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Specialized Supporting Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 tracking-tight">
            Bank Loan Assistance & <br />
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
              Documentation Support
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
            Helping businesses prepare professional financial documentation, bank-accepted CMA reports, DSCR optimization, and detailed project reports for loan applications across India.
          </p>
        </div>

        {/* Core Documents & Features Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {[
            { label: 'CMA Data Reports', desc: 'Detailed 5 to 7 Yr Forecasts' },
            { label: 'DSCR Analysis', desc: 'Debt Service Coverage Optimization' },
            { label: 'Projected P&L / B/S', desc: 'Audited Format Projections' },
            { label: 'Business Plans', desc: 'Detailed Unit Economics' },
            { label: 'MPBF Calculation', desc: 'Maximum Working Capital Limits' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl glass-card border border-slate-200/90 text-center flex flex-col justify-center shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all duration-300">
              <span className="text-sm font-extrabold font-poppins text-amber-800">{item.label}</span>
              <span className="text-xs text-slate-600 font-medium mt-1 leading-snug">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* 6 Loan Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {BANK_LOAN_CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.iconName] || Landmark;
            const floatAnimations = ['animate-float-slow', 'animate-float-medium', 'animate-card-pulse'];
            const chosenFloat = floatAnimations[idx % floatAnimations.length];

            return (
              <div
                key={cat.id}
                className={`group relative glass-card glass-card-hover rounded-3xl p-7 sm:p-8 border-2 border-slate-200/90 hover:border-amber-400 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_70px_-15px_rgba(245,158,11,0.22)] overflow-hidden flex flex-col justify-between transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.02] ${chosenFloat} float-delay-${idx % 6}`}
              >
                {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                <div className="relative z-20">
                  {/* Top Row: Glowing Icon Emblem & Max Amount Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 flex items-center justify-center ring-4 ring-amber-500/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-extrabold shadow-2xs">
                      {cat.maxAmount}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold font-poppins text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 font-inter leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Key Requirement Pill */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6 text-xs shadow-2xs">
                    <span className="text-amber-900 font-bold font-mono block text-[10px] uppercase tracking-wider mb-0.5">Key Requirement:</span>
                    <span className="text-slate-800 font-semibold leading-snug">{cat.keyRequirement}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                    {cat.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-5 mt-auto border-t border-slate-200/80 relative z-20">
                  <button
                    onClick={() => onOpenModal(`${cat.title} Documentation & CMA Report`)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/45 border border-amber-300/40 group/btn"
                  >
                    <span>Prepare Loan Dossier & CMA</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive DSCR & Loan Eligibility Estimator Simulator Box */}
        <div className="group relative rounded-3xl glass-card p-8 sm:p-12 border-2 border-amber-500/40 shadow-[0_25px_80px_-15px_rgba(245,158,11,0.18)] mb-16 animate-card-pulse overflow-hidden">
          
          {/* Animated Diagonal Golden Shimmer Light Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-20">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-800">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>Quick Financial Engineering Simulator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900 leading-tight">
                Calculate Your Debt Service Coverage Ratio (DSCR)
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-inter">
                Lenders generally require a DSCR between <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">1.50x and 2.00x</span> to sanction commercial and MSME loans. Adjust the sliders below to check your current eligibility status.
              </p>

              <div className="space-y-6 pt-3">
                <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-700">Desired Loan Quantum (₹ Lakhs)</span>
                    <span className="text-amber-800 font-mono font-extrabold text-base">₹{loanAmount} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2.5 rounded-lg bg-slate-200 accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-700">Annual Business Net Profit & Depreciation (₹ Lakhs)</span>
                    <span className="text-emerald-700 font-mono font-extrabold text-base">₹{annualProfit} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="200"
                    step="1"
                    value={annualProfit}
                    onChange={(e) => setAnnualProfit(Number(e.target.value))}
                    className="w-full h-2.5 rounded-lg bg-slate-200 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center justify-center p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-white border-2 border-slate-200/90 shadow-xl text-center space-y-5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Estimated DSCR Index</div>
              <div className={`text-5xl sm:text-6xl font-extrabold font-poppins font-mono tracking-tight ${isHealthy ? 'text-emerald-600' : 'text-amber-600'}`}>
                {simulatedDSCR}x
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold">
                {isHealthy ? (
                  <span className="text-emerald-800 flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strong Eligibility (Bank-Ready Profile)
                  </span>
                ) : (
                  <span className="text-amber-900 flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-2xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> CMA Restructuring Recommended
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-inter">
                Our CA team optimizes your depreciation schedules and cash flow allocations to boost your official DSCR score prior to bank submission.
              </p>
              <button
                onClick={() => onOpenModal(`DSCR Optimization for ₹${loanAmount} Lakhs Loan`)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-poppins font-extrabold text-sm transition-all shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 border border-amber-300/40 transform hover:-translate-y-0.5"
              >
                Get Professional CMA Report Now →
              </button>
            </div>

          </div>
        </div>

        {/* Prominent SOP Loan Disclaimer */}
        <div className="p-7 sm:p-9 rounded-3xl bg-amber-50/60 border border-amber-500/30 text-xs sm:text-sm text-slate-700 space-y-3.5 leading-relaxed shadow-sm">
          <div className="flex items-center gap-2.5 text-amber-900 font-extrabold font-poppins text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Important Statutory Loan & Professional Disclaimer</span>
          </div>
          <p>
            <strong className="text-slate-900">Loan Disclaimer:</strong> Fin-Heist provides professional loan application structuring, documentation, CMA report preparation, and financial engineering support. We are not a bank, NBFC, or lending institution and do not directly sanction or provide loans. Loan approval, interest rates, loan quantum, and repayment terms are solely subject to the eligibility criteria, credit assessment, guidelines, and discretion of the respective bank or financial institution. Assistance with a loan application does not guarantee loan approval.
          </p>
          <p className="text-slate-600 text-xs pt-2.5 border-t border-amber-200/60">
            <strong className="text-slate-900">Statutory Attestation Note:</strong> Services requiring statutory audit, tax audit under Section 44AB of the Income Tax Act, formal balance sheet certification, attestation, or professional signing under applicable statutory laws are handled by or referred to appropriately qualified Chartered Accountants holding a valid Certificate of Practice (CoP) and authorized professionals, wherever applicable.
          </p>
        </div>

      </div>
    </section>
  );
}
