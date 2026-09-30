import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Terminal, BookOpen, Github, Sparkles } from 'lucide-react';

interface CtaBandProps {
  onOpenQuickstart: () => void;
}

export default function CtaBand({ onOpenQuickstart }: CtaBandProps) {
  const [pkgManager, setPkgManager] = useState<'pip' | 'uv' | 'poetry'>('pip');
  const [copied, setCopied] = useState<boolean>(false);

  const commands = {
    pip: 'pip install fastplace',
    uv: 'uv pip install fastplace',
    poetry: 'poetry add fastplace',
  };

  const currentCmd = commands[pkgManager];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
          Install it, read it, then judge it.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Fastplace is available on PyPI; <code className="text-slate-800 font-mono bg-slate-100 px-1 py-0.5 rounded">@fastplace/react</code> and <code className="text-slate-800 font-mono bg-slate-100 px-1 py-0.5 rounded">@fastplace/ai-react</code> are on npm. Scaffold a full-stack production app in 15 seconds.
        </p>

        {/* Package Manager Selector & Command Block */}
        <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-slate-500">Package Manager:</span>
              {(['pip', 'uv', 'poetry'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setPkgManager(pm)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                    pkgManager === pm
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 p-1 rounded transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900">
              <span className="text-[#ff2d20] select-none font-bold">$</span>
              <span className="select-all font-semibold">{currentCmd}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenQuickstart}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#ff2d20] hover:bg-[#e0261a] active:scale-[0.98] rounded-xl shadow-md shadow-[#ff2d20]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Quickstart Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <Github className="w-4 h-4 text-slate-700" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
