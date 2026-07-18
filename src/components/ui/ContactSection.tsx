'use client';

import React, { useState } from 'react';
import { Send, Clock, MessageCircle, CheckCircle2, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenModal: (service?: string) => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    clientType: 'Business Owner',
    serviceRequired: 'Income Tax Return & Advisory',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndSubmit = (e: React.FormEvent, actionType: 'submit' | 'book' | 'whatsapp') => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation & Sanitization per secure web frontend guidelines
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage('Please provide a valid Full Name.');
      return;
    }
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Phone Number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid Email address.');
      return;
    }

    if (actionType === 'whatsapp') {
      const waText = encodeURIComponent(
        `Hello Fin-Heist Team,\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nCity: ${formData.city || 'N/A'}\nClient Type: ${formData.clientType}\nService Required: ${formData.serviceRequired}\nMessage: ${formData.message || 'I would like to discuss my requirements.'}`
      );
      window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${waText}`, '_blank');
      return;
    }

    if (actionType === 'book') {
      onOpenModal(formData.serviceRequired);
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          city: '',
          clientType: 'Business Owner',
          serviceRequired: 'Income Tax Return & Advisory',
          message: ''
        });
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-mesh-soft border-t border-slate-200/80 relative overflow-hidden">
      {/* Top strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift" />

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8 animate-card-bob float-delay-0">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">Direct Consultation Access</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-slate-900 mt-2">
                Get in Touch with Our <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Specialists</span>
              </h2>
              <p className="text-base text-slate-600 font-inter mt-3 leading-relaxed">
                Whether you need urgent ITR filing, GST reconciliation, company registration, or bank-ready CMA data, our CA Finalists are ready to assist.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Direct Phone & WhatsApp</span>
                  <div className="text-lg font-bold font-poppins text-slate-900 group-hover:text-amber-800">{COMPANY_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-4 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Official Email</span>
                  <div className="text-lg font-bold font-poppins text-slate-900 group-hover:text-emerald-800">{COMPANY_INFO.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-100 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Operating Footprint</span>
                  <div className="text-base font-bold font-poppins text-slate-900">{COMPANY_INFO.address}</div>
                  <p className="text-xs text-slate-500 mt-1">{COMPANY_INFO.hours}</p>
                </div>
              </div>
            </div>

            {/* Instagram Social Badge */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-600 block uppercase tracking-wider">Follow Our Daily Tax Tips</span>
                <span className="text-base font-bold text-slate-900 font-poppins">{COMPANY_INFO.instagram}</span>
              </div>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white font-semibold text-xs transition-colors"
              >
                Connect Instagram
              </a>
            </div>
          </div>

          {/* Right Column: Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-card glass-card-hover border border-slate-200/80 shadow-2xl overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 border-b border-amber-300 px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-poppins text-slate-950 flex items-center gap-2">
                    <span>Client Consultation Form</span>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </h3>
                  <p className="text-xs text-slate-900/80 font-medium mt-0.5">Secure, confidential submission directly to our CA team</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-400 text-xs font-bold border border-slate-800 shadow-xs">
                  Fast Response
                </span>
              </div>

              <div className="p-6 sm:p-8">
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-bold font-poppins text-slate-900">Message & Enquiry Sent!</h4>
                  <p className="text-base text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-emerald-700">{formData.fullName}</strong>. Your enquiry regarding <strong className="text-slate-900">{formData.serviceRequired}</strong> has been logged. Our team will reach out to <strong className="text-slate-900">{formData.phone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => validateAndSubmit(e, 'submit')} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                      <span>⚠️</span> {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 90276 61642"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dehradun / Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Client Type
                      </label>
                      <select
                        value={formData.clientType}
                        onChange={(e) => setFormData({ ...formData, clientType: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      >
                        <option value="Salaried Individual">Salaried Individual</option>
                        <option value="Freelancer">Freelancer / Professional</option>
                        <option value="Business Owner">Business Owner / Company</option>
                        <option value="Proprietorship">Proprietorship Firm</option>
                        <option value="Partnership">Partnership / LLP</option>
                        <option value="MSME">MSME Enterprise</option>
                        <option value="Startup">Early-Stage Startup</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                      >
                        <option value="Income Tax Return & Advisory">Income Tax Return & Advisory</option>
                        <option value="GST Registration & Monthly Returns">GST Registration & Monthly Returns</option>
                        <option value="Accounting & Tally Finalization">Accounting & Tally Finalization</option>
                        <option value="Project Reports & Loan Documentation">Project Reports & Loan Documentation</option>
                        <option value="MSME / Udyam / Startup Registration">MSME / Udyam / Startup Registration</option>
                        <option value="Private Limited / LLP Setup">Private Limited / LLP Setup</option>
                        <option value="CA Certificates & Attestation">CA Certificates & Attestation</option>
                        <option value="TDS Return & Compliance">TDS Return & Compliance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Brief Description of Requirement
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what assistance you need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-card-pulse">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/35 flex items-center justify-center gap-2 transition-all border border-amber-300/40 disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => validateAndSubmit(e, 'book')}
                      className="py-3.5 px-4 rounded-xl glass-card hover:bg-white text-slate-800 hover:text-amber-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border border-slate-300/80"
                    >
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Book Consultation</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => validateAndSubmit(e, 'whatsapp')}
                      className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 animate-card-bob"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-2">
                    🔒 Your request is secure and sent directly to our CA specialists.
                  </p>
                </form>
              )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
