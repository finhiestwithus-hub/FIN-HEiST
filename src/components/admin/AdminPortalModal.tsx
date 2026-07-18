'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { X, Shield, Phone, Mail, CheckCircle2, Clock, Filter, MessageCircle, RefreshCw, AlertCircle, FileText, Search } from 'lucide-react';

export interface ClientEnquiry {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  client_category?: string;
  service_category: string;
  preferred_time?: string;
  message_notes?: string;
  form_source?: string;
  status: 'New Inquiry' | 'Assigned to CA' | 'In Review' | 'Resolved';
  created_at: string;
}

const DEMO_ENQUIRIES: ClientEnquiry[] = [
  {
    id: '101',
    client_name: 'Vikramaditya Mehta',
    client_phone: '+91 98112 34567',
    client_email: 'vikram.m@mehtaenterprises.in',
    client_category: 'Business Owner',
    service_category: 'Commercial Business Loans & DSCR',
    preferred_time: 'Immediate (Within 2 Hours)',
    message_notes: 'Need ₹4.5 Crore working capital limit CMA report and DSCR restructuring for FY 2025-26.',
    form_source: 'Bank Loan Assister',
    status: 'New Inquiry',
    created_at: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: '102',
    client_name: 'Priya Sundaram',
    client_phone: '+91 99887 76655',
    client_email: 'priya.s@techconsulting.co',
    client_category: 'Salaried Individual',
    service_category: 'Income Tax Return & Advisory',
    preferred_time: 'Evening (6:00 PM - 8:00 PM)',
    message_notes: 'Salaried income + US RSU stock options capital gains assessment required before July 31 deadline.',
    form_source: 'Header Booking Modal',
    status: 'Assigned to CA',
    created_at: new Date(Date.now() - 120 * 60000).toISOString()
  },
  {
    id: '103',
    client_name: 'Rohan Deshmukh',
    client_phone: '+91 90123 45678',
    client_email: 'rohan@deshmukhlogistics.com',
    client_category: 'MSME',
    service_category: 'GST Registration & Filing',
    preferred_time: 'Morning (10:00 AM - 1:00 PM)',
    message_notes: 'Want to register multi-state GST for 3 warehouse locations across Uttarakhand and UP.',
    form_source: 'Contact Page Form',
    status: 'Resolved',
    created_at: new Date(Date.now() - 360 * 60000).toISOString()
  }
];

export default function AdminPortalModal() {
  const { isAdminModalOpen, setIsAdminModalOpen, profile } = useAuth();
  const [enquiries, setEnquiries] = useState<ClientEnquiry[]>(DEMO_ENQUIRIES);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isAdminModalOpen) {
      fetchEnquiries();
    }
  }, [isAdminModalOpen]);

  const fetchEnquiries = async () => {
    if (!isSupabaseConfigured()) {
      // Use demo data combined with any localStorage additions
      const saved = localStorage.getItem('finheist_local_enquiries');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setEnquiries([...parsed, ...DEMO_ENQUIRIES]);
        } catch (e) {
          setEnquiries(DEMO_ENQUIRIES);
        }
      } else {
        setEnquiries(DEMO_ENQUIRIES);
      }
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
      }
      
      setEnquiries((data as ClientEnquiry[]) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ClientEnquiry['status']) => {
    // Optimistic UI update
    const updated = enquiries.map(item => item.id === id ? { ...item, status: newStatus } : item);
    setEnquiries(updated);

    if (!isSupabaseConfigured()) {
      const localOnly = updated.filter(u => u.id.length > 10);
      localStorage.setItem('finheist_local_enquiries', JSON.stringify(localOnly));
      return;
    }

    try {
      await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', id);
    } catch (err) {
      console.error('Failed status update:', err);
    }
  };

  if (!isAdminModalOpen) return null;

  const filteredEnquiries = enquiries.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.service_category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      item.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client_phone.includes(searchQuery) ||
      (item.message_notes && item.message_notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-gradient-to-br from-white via-slate-50 to-[#FCFBFA] border-2 border-amber-500/50 rounded-3xl shadow-[0_25px_90px_-15px_rgba(245,158,11,0.35)] overflow-hidden">
        
        {/* Top Gold Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-6 sm:px-8 py-5 border-b border-amber-300 flex flex-wrap items-center justify-between gap-4 shadow-sm shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950/20 border border-slate-950/30 flex items-center justify-center text-slate-950 font-extrabold shadow-xs shrink-0">
              <Shield className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-950 tracking-tight">CA Finalists Admin Portal</h3>
                <span className="px-3 py-0.5 rounded-full bg-slate-950 text-amber-400 text-xs font-mono font-extrabold border border-slate-800 shadow-2xs">
                  ROLE: {profile?.role?.toUpperCase() || 'ADMIN'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900/90 font-semibold font-inter mt-0.5">
                Live Client Consultation Requests, Bank Loan CMA Dossiers & GST Compliance Submissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={fetchEnquiries}
              className="px-4 py-2 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="w-10 h-10 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center transition-colors font-bold"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-5 sm:px-8 border-b border-slate-200 bg-slate-100/70 flex flex-wrap items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 font-poppins mr-2">Filter Category:</span>
            {['All', 'Income Tax', 'GST', 'Bank Loans', 'Accounting'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold font-poppins transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-sm border border-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search client name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium text-xs focus:outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>

        </div>

        {/* Enquiries Table Scroll Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-600">Syncing real-time inquiries with Supabase database...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3 glass-card rounded-3xl p-8 border border-slate-200">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto opacity-70" />
              <h4 className="text-lg font-bold font-poppins text-slate-800">No Inquiries Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No submissions match your current filter right now. As clients fill forms on the site while logged in, their dossiers will instantly appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((enq) => {
                const isResolved = enq.status === 'Resolved';
                const statusColors: Record<string, string> = {
                  'New Inquiry': 'bg-amber-100 text-amber-900 border-amber-400',
                  'Assigned to CA': 'bg-blue-100 text-blue-900 border-blue-400',
                  'In Review': 'bg-purple-100 text-purple-900 border-purple-400',
                  'Resolved': 'bg-emerald-100 text-emerald-900 border-emerald-400'
                };

                return (
                  <div
                    key={enq.id}
                    className="p-6 rounded-2xl glass-card border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200/80">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="text-lg font-extrabold font-poppins text-slate-900">{enq.client_name}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold font-poppins">
                            {enq.client_category || 'Business Owner'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${statusColors[enq.status] || 'bg-slate-100 text-slate-800'}`}>
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-amber-800 mt-1">
                          Service Required: <strong className="text-slate-900 font-poppins">{enq.service_category}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 ml-auto">
                        {/* Status Select Changer */}
                        <select
                          value={enq.status}
                          onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                          className="px-3 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-amber-500 shadow-2xs cursor-pointer"
                        >
                          <option value="New Inquiry">Mark: New Inquiry</option>
                          <option value="Assigned to CA">Mark: Assigned to CA</option>
                          <option value="In Review">Mark: In Review</option>
                          <option value="Resolved">Mark: Resolved / Closed</option>
                        </select>

                        {/* Instant WhatsApp Quick Connect Button */}
                        <a
                          href={`https://wa.me/${enq.client_phone.replace(/\s+/g, '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${enq.client_name}, CA Finalist Team from Fin-Heist here regarding your inquiry for "${enq.service_category}". How can we assist you today?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-transform transform hover:-translate-y-0.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Connect WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-inter text-slate-600">
                      <div>
                        <span className="font-bold text-slate-900 block">Contact Details:</span>
                        <span className="font-mono">{enq.client_phone}</span>
                        {enq.client_email && <span className="block">{enq.client_email}</span>}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">Preferred Call Time:</span>
                        <span>{enq.preferred_time || 'Immediate (Within 2 Hours)'}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">Form Source / Source URL:</span>
                        <span className="text-amber-800 font-semibold">{enq.form_source || 'Header Booking Modal'}</span>
                      </div>
                    </div>

                    {enq.message_notes && (
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800 font-medium leading-relaxed">
                        <strong className="text-amber-900 font-bold block mb-0.5">Brief Requirement Details / Notes:</strong>
                        "{enq.message_notes}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600 font-inter shrink-0">
          <span>Total Records Shown: <strong className="text-slate-900">{filteredEnquiries.length}</strong></span>
          <span className="text-emerald-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Supabase RLS Protected Admin Enquiries Stream
          </span>
        </div>

      </div>
    </div>
  );
}
