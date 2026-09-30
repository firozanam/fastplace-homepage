import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, Terminal, Sparkles, TrendingUp, Blocks, Code2, ShieldCheck } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

interface Item {
  id: string;
  title: string;
  category: string;
  icon: any;
  targetId?: string;
}

const ITEMS: Item[] = [
  { id: 'metrics', title: 'Developer Productivity Metrics & ROI Calculator', category: 'Benchmarks', icon: TrendingUp, targetId: 'metrics' },
  { id: 'scalability', title: 'Component Scalability & Modular Monolith Explorer', category: 'Architecture', icon: Layers, targetId: 'scalability' },
  { id: 'csr', title: 'Controller-Service-Repository (CSR) Pipeline', category: 'Architecture', icon: Layers, targetId: 'scalability' },
  { id: 'integrations', title: 'Seamless Integrations Matrix (Python, React, Postgres, Redis)', category: 'Integrations', icon: Blocks, targetId: 'integrations' },
  { id: 'code', title: 'Code Architecture: The Framework in Three Files', category: 'Code', icon: Code2, targetId: 'code' },
  { id: 'ai', title: 'Autonomous AI Infrastructure & @Tool Primitives', category: 'AI', icon: Sparkles, targetId: 'ai' },
  { id: 'cli', title: 'CLI Simulator & Generators (fastplace run dev)', category: 'Tooling', icon: Terminal, targetId: 'terminal' },
  { id: 'testimonials', title: 'Enterprise Production Testimonials & Reliability Case Studies', category: 'Reviews', icon: ShieldCheck, targetId: 'testimonials' },
  { id: 'quickstart', title: 'Getting Started Quickstart Guide', category: 'Docs', icon: BookOpen },
];

export default function CommandPaletteModal({ isOpen, onClose, onSelectAction }: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: Item) => {
    onClose();
    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onSelectAction(item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search docs, architectural patterns, CLI commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No documentation or commands matched "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer text-xs transition-colors ${
                    idx === selectedIndex
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#ff2d20] shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Key Hints */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">↑↓</kbd>
            <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">ESC to close</kbd>
          </div>
          <span>Fastplace 1.0 docs</span>
        </div>
      </div>
    </div>
  );
}
