import React, { useState } from 'react';
import { Terminal, Play, Check, Copy, ArrowRight, CornerDownLeft } from 'lucide-react';

interface CliCommand {
  cmd: string;
  category: string;
  desc: string;
  output: string[];
}

const COMMANDS: CliCommand[] = [
  {
    cmd: 'fastplace run dev',
    category: 'Development',
    desc: 'Spawns Uvicorn ASGI server with live code reload & Vite dev server concurrently.',
    output: [
      '[INFO] Fastplace v1.0.0 booting in development mode...',
      '[INFO] Loaded configuration from .env (APP_ENV=local, DATABASE=sqlite)',
      '[FASTPLACE] Uvicorn running on http://127.0.0.1:3000 (Press CTRL+C to quit)',
      '[VITE] Vite v8.3.0 dev server running on http://127.0.0.1:5173',
      '[BRIDGE] Bridge manifest initialized · 14 React pages registered',
      '[READY] Ready for requests! Hot reload active for Python & React.',
    ],
  },
  {
    cmd: 'fastplace make:module billing --web -m',
    category: 'Scaffolding',
    desc: 'Scaffolds self-contained module with Model, Repository, Service, Controller, and Alembic migration.',
    output: [
      '[CREATE] app/modules/billing/models/invoice.py',
      '[CREATE] app/modules/billing/repositories/invoice_repository.py',
      '[CREATE] app/modules/billing/services/invoice_service.py',
      '[CREATE] app/modules/billing/http/controllers/invoice_controller.py',
      '[CREATE] resources/js/pages/Billing/Index.jsx',
      '[MIGRATION] database/migrations/2026_09_29_create_invoices_table.py',
      '[SUCCESS] Module "billing" scaffolded with 100% CSR compliance.',
    ],
  },
  {
    cmd: 'fastplace lint:modules',
    category: 'Code Quality',
    desc: 'Hard CI boundary lint: asserts modules only communicate via public Service APIs.',
    output: [
      '[AUDIT] Scanning import graph across 4 modules in app/modules/...',
      '  ✓ app/modules/accounts  (CSR verified, 0 illegal repo imports)',
      '  ✓ app/modules/projects  (CSR verified, calls InvoiceService public API)',
      '  ✓ app/modules/billing   (CSR verified, 0 boundary violations)',
      '  ✓ app/modules/knowledge (CSR verified, pgvector layer isolated)',
      '[PASSED] All 4 module boundaries enforced. 0 violations found.',
    ],
  },
  {
    cmd: 'fastplace migrate',
    category: 'Database',
    desc: 'Runs pending Alembic migrations with batch tracking and automatic rollback safety.',
    output: [
      '[DB] Connecting to database via asyncpg (postgresql+asyncpg://...)',
      '[MIGRATE] Running migration: 2026_09_01_create_users_table ... OK',
      '[MIGRATE] Running migration: 2026_09_15_create_projects_and_tasks ... OK',
      '[MIGRATE] Running migration: 2026_09_29_create_knowledge_base_vector ... OK',
      '[SUCCESS] Database schema updated to revision batch #3 (3 migrations applied).',
    ],
  },
  {
    cmd: 'fastplace ai:tools',
    category: 'Native AI',
    desc: 'Lists registered @Tool functions, generated JSON schemas, and vector stores.',
    output: [
      '[AI REGISTRY] Active Agent Tools (auto-registered via @Tool decorator):',
      '  • search_docs(query: str) -> list[str]',
      '    └─ Source: app/ai/tools/search_docs.py (pgvector: knowledge_base)',
      '  • issue_project_invoice(project_id: int) -> dict',
      '    └─ Source: app/modules/billing/services/invoice_service.py',
      '  • calculate_tax(amount: float, jurisdiction: str) -> float',
      '    └─ Source: app/ai/tools/tax.py',
      '[AI REGISTRY] 3 tools verified with Pydantic v2 argument schemas.',
    ],
  },
];

export default function CliSimulator() {
  const [activeCmd, setActiveCmd] = useState<CliCommand>(COMMANDS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCmd.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Terminal className="w-4 h-4" />
            <span>Unified Developer Toolchain</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            A CLI that keeps pace.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Built with Typer and Rich. A single binary orchestrates backend processes, frontend Vite HMR, database migrations, and architectural generators.
          </p>
        </div>

        {/* Command Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
          {COMMANDS.map((item) => (
            <button
              key={item.cmd}
              onClick={() => setActiveCmd(item)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                activeCmd.cmd === item.cmd
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.cmd.replace('fastplace ', '')}
            </button>
          ))}
        </div>

        {/* Interactive Terminal Window */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Bar of Terminal */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#090d16] border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="ml-2 text-xs font-mono text-slate-400">
                zsh — {activeCmd.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] text-slate-400 font-sans">
                {activeCmd.desc}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs sm:text-sm text-slate-200 space-y-2 bg-[#0a0f1d] min-h-[220px]">
            <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-slate-800">
              <span className="text-[#ff2d20]">$</span>
              <span>{activeCmd.cmd}</span>
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-500 ml-1" />
            </div>

            {activeCmd.output.map((line, idx) => {
              const isInfo = line.startsWith('[INFO]');
              const isFastplace = line.startsWith('[FASTPLACE]');
              const isVite = line.startsWith('[VITE]');
              const isSuccess = line.startsWith('[SUCCESS]') || line.startsWith('[PASSED]');
              const isMigration = line.startsWith('[MIGRATE]') || line.startsWith('[CREATE]');

              return (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    isSuccess
                      ? 'text-emerald-400 font-semibold'
                      : isFastplace
                      ? 'text-white font-semibold'
                      : isVite
                      ? 'text-cyan-400'
                      : isInfo
                      ? 'text-slate-400'
                      : isMigration
                      ? 'text-blue-300'
                      : 'text-slate-200'
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>

          {/* Terminal Quick Hint Bar */}
          <div className="bg-[#090d16] px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Try in your project: pip install fastplace</span>
            <span className="text-emerald-400 font-sans">Rich Terminal UI Output</span>
          </div>
        </div>
      </div>
    </section>
  );
}
