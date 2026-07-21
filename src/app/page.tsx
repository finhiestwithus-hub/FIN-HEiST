'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import TrustSection from '@/components/ui/TrustSection';
import ServicesSection from '@/components/ui/ServicesSection';
import WhyFinHeist from '@/components/ui/WhyFinHeist';
import ProcessSection from '@/components/ui/ProcessSection';
import BankLoanAssistance from '@/components/ui/BankLoanAssistance';
import AboutSection from '@/components/ui/AboutSection';
import LeadershipSection from '@/components/ui/LeadershipSection';
import FAQSection from '@/components/ui/FAQSection';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';
import FloatingWidgets from '@/components/ui/FloatingWidgets';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Consultation');

  const handleOpenModal = (service = 'General Tax & Compliance Consultation') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#050816] text-slate-100 relative selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Glassmorphism Navbar */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* 2. Unforgettable Full-Screen Hero Section with Floating Finance Dashboard */}
      <Hero onOpenModal={handleOpenModal} />

      {/* 3. Animated Trust Counters Section */}
      <TrustSection />

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
