import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ExternalLink, Sparkles, Layers, Database, Cpu, Blocks, BookOpen, Terminal, ShieldCheck, ArrowRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenQuickstart: () => void;
}

export default function Navbar({ onOpenCommandPalette, onOpenQuickstart }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080c14]/95 backdrop-blur-md border-b border-[#1e293b]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6" ref={dropdownRef}>
        
        {/* Left: Red Fastplace Logo + Wordmark */}
        <div className="flex items-center">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Red stylized arrow ribbon icon matching the screenshot */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#f04438] shrink-0 transition-transform duration-150 group-hover:scale-105"
            >
              {/* Up-right arrow head */}
              <path
                d="M21 7H29V15"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29 7L17 19"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Interlocking rounded ribbon loops */}
              <path
                d="M11 28C8 28 6 25.5 6 22.5C6 19 8.5 16.5 13 16.5H23"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 20C12 17 15 12 19 12C23 12 25 14 25 17C25 21 21 23 15 23H8"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* "Fastplace" written in bold red */}
            <span className="text-xl font-bold tracking-tight text-[#f04438] font-['Outfit'] select-none">
              Fastplace
            </span>
          </a>
        </div>

        {/* Center: Framework ▾, Ecosystem ▾, Resources ▾, Docs */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[14px] font-normal text-[#cbd5e1]">
          
          {/* 1. Framework ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('framework')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                activeDropdown === 'framework' ? 'text-white' : 'hover:text-white'
              }`}
            >
              <span>Framework</span>
              <span className="text-[10px] text-[#94a3b8] transition-transform select-none">▾</span>
            </button>

            {activeDropdown === 'framework' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0b1120] border border-[#1e293b] rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <a
                  href="#scalability"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <Layers className="w-4 h-4 text-[#f04438] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#f04438] transition-colors">
                      Modular Monolith
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      One deployable unit with strict internal boundaries.
                    </div>
                  </div>
                </a>

                <a
                  href="#scalability"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <Cpu className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      CSR Layering Pattern
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Controller → Service → Repository data flow.
                    </div>
                  </div>
                </a>

                <a
                  href="#code"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <Blocks className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Server-Driven SPA Bridge
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Inertia-style props injection without REST glue.
                    </div>
                  </div>
                </a>

                <a
                  href="#integrations"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <Database className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">
                      Active-Record ORM
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Async SQLAlchemy 2.x core with fluent API.
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* 2. Ecosystem ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('ecosystem')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                activeDropdown === 'ecosystem' ? 'text-white' : 'hover:text-white'
              }`}
            >
              <span>Ecosystem</span>
              <span className="text-[10px] text-[#94a3b8] transition-transform select-none">▾</span>
            </button>

            {activeDropdown === 'ecosystem' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0b1120] border border-[#1e293b] rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <a
                  href="#integrations"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#f04438] mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#f04438] transition-colors">
                      fastplace
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Python core framework & ASGI runner on PyPI.
                    </div>
                  </div>
                </a>

                <a
                  href="#integrations"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                      @fastplace/react
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Client bridge hooks (usePage, useForm, Link).
                    </div>
                  </div>
                </a>

                <a
                  href="#ai"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      @fastplace/ai-react
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      SSE stream hooks for autonomous agent UI.
                    </div>
                  </div>
                </a>

                <a
                  href="#scalability"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">
                      fastplace-tenancy
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      First-party enterprise multi-tenant RLS package.
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* 3. Resources ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('resources')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                activeDropdown === 'resources' ? 'text-white' : 'hover:text-white'
              }`}
            >
              <span>Resources</span>
              <span className="text-[10px] text-[#94a3b8] transition-transform select-none">▾</span>
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0b1120] border border-[#1e293b] rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <a
                  href="#metrics"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <BookOpen className="w-4 h-4 text-[#f04438] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#f04438] transition-colors">
                      Developer Benchmarks
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Productivity audit & interactive ROI calculator.
                    </div>
                  </div>
                </a>

                <a
                  href="#terminal"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <Terminal className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      CLI Command Reference
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Generators, server runners, and module linters.
                    </div>
                  </div>
                </a>

                <a
                  href="#testimonials"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#151e32] transition-colors group"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">
                      Enterprise Case Studies
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Production uptime and architecture migration wins.
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* 4. Docs */}
          <button
            onClick={onOpenQuickstart}
            className="hover:text-white transition-colors cursor-pointer py-1.5"
          >
            Docs
          </button>
        </nav>

        {/* Right: GitHub + Sun Icon */}
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-normal text-[#cbd5e1] hover:text-white transition-colors"
          >
            GitHub
          </a>

          {/* Sun / Star Icon */}
          <button
            onClick={toggleTheme}
            className="text-amber-400 hover:text-amber-300 transition-transform active:scale-95 cursor-pointer text-lg p-1 flex items-center justify-center"
            title="Toggle theme appearance"
            aria-label="Toggle theme appearance"
          >
            ☀️
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#94a3b8] hover:text-white p-1"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1120] border-b border-[#1e293b] px-4 py-4 space-y-3">
          <a
            href="#scalability"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#cbd5e1] hover:text-white py-1"
          >
            Framework
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#cbd5e1] hover:text-white py-1"
          >
            Ecosystem
          </a>
          <a
            href="#metrics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#cbd5e1] hover:text-white py-1"
          >
            Resources
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuickstart();
            }}
            className="block text-sm text-[#cbd5e1] hover:text-white py-1 text-left w-full"
          >
            Docs
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-[#cbd5e1] hover:text-white py-1"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
