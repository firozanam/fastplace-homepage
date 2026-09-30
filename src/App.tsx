import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsSection from './components/MetricsSection';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import IntegrationsSection from './components/IntegrationsSection';
import CodeWorkbench from './components/CodeWorkbench';
import AiEngineSection from './components/AiEngineSection';
import CliSimulator from './components/CliSimulator';
import ComparisonTable from './components/ComparisonTable';
import TestimonialsSection from './components/TestimonialsSection';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';
import CommandPaletteModal from './components/CommandPaletteModal';
import QuickstartModal from './components/QuickstartModal';

export default function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickstartOpen, setIsQuickstartOpen] = useState(false);

  const handleSelectPaletteAction = (actionId: string) => {
    if (actionId === 'quickstart') {
      setIsQuickstartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#ff2d20]/15 selection:text-[#ff2d20]">
      {/* Top Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenQuickstart={() => setIsQuickstartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Architecture Toggle */}
        <Hero onOpenQuickstart={() => setIsQuickstartOpen(true)} />

        {/* Developer Productivity Metrics & Interactive ROI Calculator */}
        <MetricsSection />

        {/* Component Scalability & Modular Monolith Explorer */}
        <ArchitectureExplorer />

        {/* Seamless Integration Capabilities & Tools Matrix */}
        <IntegrationsSection />

        {/* Interactive Code Workbench (The Framework in Three Files) */}
        <CodeWorkbench />

        {/* Native AI Infrastructure & Interactive Agent Execution Simulation */}
        <AiEngineSection />

        {/* Unified Developer CLI Simulator */}
        <CliSimulator />

        {/* Enterprise Comparison & Architectural Decision Matrix */}
        <ComparisonTable />

        {/* Enterprise Production Testimonials & Reliability Carousel */}
        <TestimonialsSection />

        {/* Call to Action Band */}
        <CtaBand onOpenQuickstart={() => setIsQuickstartOpen(true)} />
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Interactive Command Palette Modal (⌘K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectPaletteAction}
      />

      {/* Interactive Quickstart Modal */}
      <QuickstartModal
        isOpen={isQuickstartOpen}
        onClose={() => setIsQuickstartOpen(false)}
      />
    </div>
  );
}
