'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#050816] text-slate-100 relative selection:bg-blue-600 selection:text-white pt-24">
      {/* 1. Sticky Glassmorphism Navbar */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* 2. Calculator Content */}
      <div className="flex-1 bg-mesh-soft">
        {children}
      </div>

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
