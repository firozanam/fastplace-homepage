import React from 'react';
import { Github, BookOpen, ExternalLink, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-[#ff2d20] font-['Outfit']">
                Fastplace
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-sm text-xs sm:text-sm">
              Fastplace is a full-stack, AI-native web framework for Python and React — async backend, server-driven SPA bridge, and AI primitives in one install. This site is built with it.
            </p>

            <div className="flex items-center gap-4 text-xs font-medium pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="https://pypi.org"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                PyPI (v1.0.0)
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="https://npmjs.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                @fastplace/react
              </a>
            </div>
          </div>

          {/* Links Column 1: Documentation */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-slate-900 uppercase text-[11px] font-mono tracking-wider">
              Documentation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#quickstart" className="hover:text-slate-900 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#code" className="hover:text-slate-900 transition-colors">
                  Routing & Controllers
                </a>
              </li>
              <li>
                <a href="#scalability" className="hover:text-slate-900 transition-colors">
                  CSR Pattern
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-slate-900 transition-colors">
                  ORM & Database
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-slate-900 transition-colors">
                  AI Agents & Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Ecosystem */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-slate-900 uppercase text-[11px] font-mono tracking-wider">
              Ecosystem & Packages
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between pr-4">
                <span className="text-slate-900 font-medium">fastplace</span>
                <span className="font-mono text-[10px] text-slate-500">Python Core</span>
              </li>
              <li className="flex items-center justify-between pr-4">
                <span className="text-slate-900 font-medium">@fastplace/react</span>
                <span className="font-mono text-[10px] text-slate-500">Bridge Hooks</span>
              </li>
              <li className="flex items-center justify-between pr-4">
                <span className="text-slate-900 font-medium">@fastplace/ai-react</span>
                <span className="font-mono text-[10px] text-slate-500">SSE Stream Hooks</span>
              </li>
              <li className="flex items-center justify-between pr-4">
                <span className="text-slate-900 font-medium">fastplace-tenancy</span>
                <span className="font-mono text-[10px] text-slate-500">Multi-Tenancy</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Enterprise & Compliance */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-slate-900 uppercase text-[11px] font-mono tracking-wider">
              Enterprise
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#metrics" className="hover:text-slate-900 transition-colors">
                  Productivity Metrics
                </a>
              </li>
              <li>
                <a href="#scalability" className="hover:text-slate-900 transition-colors">
                  Architecture ADR
                </a>
              </li>
              <li>
                <span className="text-slate-700">Security Hardened</span>
              </li>
              <li>
                <span className="text-slate-700">SOC2 / HIPAA Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Fastplace Framework. Open-source under the MIT License.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors">
              Security Disclosures
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors">
              Architecture Blueprint
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
