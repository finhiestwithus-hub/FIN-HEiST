'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import NewsTicker from '@/components/ui/NewsTicker';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/context/AuthContext';
import Hero from '@/components/ui/Hero';
import TrustSectionNew from '@/components/ui/TrustSectionNew';
import ServicesSection from '@/components/ui/ServicesSection';
import WhyFinHeist from '@/components/ui/WhyFinHeist';
import ProcessSection from '@/components/ui/ProcessSection';
import BankLoanAssistance from '@/components/ui/BankLoanAssistance';
import AboutSection from '@/components/ui/AboutSection';
import LeadershipSection from '@/components/ui/LeadershipSection';
import FAQSection from '@/components/ui/FAQSection';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';
import ReviewsSection from '@/components/ui/ReviewsSection';
import FloatingWidgets from '@/components/ui/FloatingWidgets';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Consultation');

  const handleOpenModal = (service = 'General Tax & Compliance Consultation') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const { profile } = useAuth();

  if (profile?.role === 'admin') {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative">
        <Navbar onOpenModal={handleOpenModal} />
        
        {/* News Ticker offset by Navbar height */}
        <div className="pt-[110px] sm:pt-[118px] lg:pt-[120px]">
          <NewsTicker />
        </div>
        
        <div className="flex-1 flex flex-col items-center w-full">
          <AdminDashboard />
        </div>
        
        <Footer onOpenModal={handleOpenModal} />
        
        <FloatingWidgets
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedService={selectedService}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Glassmorphism Navbar */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Edge-to-edge News Ticker right below the fixed Navbar */}
      <div className="absolute top-[110px] sm:top-[118px] lg:top-[120px] left-0 right-0 z-40">
        <NewsTicker />
      </div>

      {/* 2. Unforgettable Full-Screen Hero Section with Floating Finance Dashboard */}
      <Hero onOpenModal={handleOpenModal} />

      {/* 3. Animated Trust Counters Section */}
      <TrustSectionNew />

      {/* 4. Complete Financial & Compliance Services Portfolio (10 Core Practice Areas) */}
      <ServicesSection onOpenModal={handleOpenModal} />



      {/* 6. Why Fin-Heist Premium Bento Grid */}
      <WhyFinHeist />

      {/* 7. How We Work (5-Step Execution Workflow & Timeline) */}
      <ProcessSection onOpenModal={handleOpenModal} />

      {/* 8. Bank Loan Assistance & Documentation Support with Live DSCR Simulator */}
      <BankLoanAssistance onOpenModal={handleOpenModal} />

      {/* 9. About Us (Modern Split Section with Mission, Vision & Values) */}
      <AboutSection onOpenModal={handleOpenModal} />

      {/* 10. Luxury Leadership & Team Showcase (Founders & CA Advisory Board) */}
      <LeadershipSection onOpenModal={handleOpenModal} />

      {/* 12. Interactive FAQ Accordion */}
      <FAQSection />

      {/* 13. Luxury Glassmorphism Contact Form & Consultation Scheduling */}
      <ContactSection onOpenModal={handleOpenModal} />

      {/* 13.5 Reviews & Feedback Slider */}
      <ReviewsSection />

      {/* 14. Dark Premium Footer with exact SOP contact information */}
      <Footer onOpenModal={handleOpenModal} />

      {/* 15. Floating Special Features (WhatsApp Button, Scroll Progress Indicator, Dark Toggle, Modal) */}
      <FloatingWidgets
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedService={selectedService}
      />
    </main>
  );
}
