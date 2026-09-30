import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface QuickstartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickstartModal({ isOpen, onClose }: QuickstartModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyStep = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Install the CLI binary',
      desc: 'Installs the fastplace CLI with Typer and Rich console formatting.',
      code: 'pip install fastplace',
    },
    {
      num: 2,
      title: 'Scaffold full-stack app with Auth',
      desc: 'Creates modular monolith skeleton, SQLite default DB, auth controllers, and React 19 pages.',
      code: 'fastplace new myapp --auth\ncd myapp',
    },
    {
      num: 3,
      title: 'Run full stack with live reload',
      desc: 'Starts Uvicorn ASGI server and Vite HMR simultaneously on port 3000.',
      code: 'fastplace run dev',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff2d20] uppercase font-bold tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>15-Second Developer Onboarding</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Fastplace Quickstart Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Fastplace requires Python 3.12+ and Node.js 18+. When you run <code className="text-slate-900 font-semibold font-mono bg-slate-100 px-1 py-0.5 rounded">fastplace new</code>, the complete frontend starter corpus is extracted with zero manual configuration.
          </p>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all hover:border-slate-300"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#ff2d20] text-xs font-mono font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-['Outfit']">
                      {step.title}
                    </span>
                  </div>

                  <button
                    onClick={() => copyStep(step.code, step.num)}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedStep === step.num ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 mb-2.5">{step.desc}</p>

                <pre className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-100 overflow-x-auto">
                  <code>{step.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Included Features Callout */}
          <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl">
            <div className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What boots up immediately in your project:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>• Session authentication & remember-me</div>
              <div>• Working <code className="text-slate-900 font-semibold font-mono">/register</code> & <code className="text-slate-900 font-semibold font-mono">/dashboard</code></div>
              <div>• SQLite zero-config database</div>
              <div>• React 19 pages with Vite HMR</div>
              <div>• Rate limiting (<code className="text-slate-900 font-semibold font-mono">throttle:5,60</code>)</div>
              <div>• Alembic migration engine</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Need PostgreSQL or pgvector? Run: <code className="text-slate-800 font-mono font-semibold">fastplace db:configure postgresql</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
