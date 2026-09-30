import React, { useState } from 'react';
import { Sparkles, Bot, Terminal, Play, CheckCircle2, ArrowRight, Database, Cpu, Layers } from 'lucide-react';

interface SimulationScenario {
  id: string;
  label: string;
  query: string;
  toolUsed: string;
  vectorDbHit: string;
  streamResponse: string;
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'docs',
    label: 'Search Architecture Blueprints',
    query: 'How does Fastplace enforce boundaries between the Billing and Projects modules?',
    toolUsed: 'search_docs(query="modular monolith import boundaries")',
    vectorDbHit: 'pgvector match: ADR-001 (score: 0.94) in knowledge_base table',
    streamResponse:
      'Fastplace enforces modular monolith boundaries through tooling import linters (`fastplace lint:modules`). Modules communicate strictly via their public `services/` APIs. Importing another module’s repository or ORM model directly fails the build during CI.',
  },
  {
    id: 'billing',
    label: 'Query Enterprise Invoices',
    query: 'Show outstanding draft invoices for project ID 104',
    toolUsed: 'get_project_invoices(project_id=104, status="draft")',
    vectorDbHit: 'ACID query on invoices table joined with clients (3 records found)',
    streamResponse:
      'Found 3 draft invoices for Project #104 totaling $18,400. Invoices were queried through `InvoiceRepository` with eager-loaded client relations inside the current tenant session.',
  },
  {
    id: 'tasks',
    label: 'Autonomous Task Creation',
    query: 'Create a security audit task for Q4 compliance due on Nov 15',
    toolUsed: 'create_task(title="Security audit Q4 compliance", due_date="2026-11-15")',
    vectorDbHit: 'Direct transaction: db.transaction() write to tasks table',
    streamResponse:
      'Task #412 ("Security audit Q4 compliance") created successfully under Project #104. Invariant checks passed: open task limit < 50 verified.',
  },
];

export default function AiEngineSection() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [streamProgress, setStreamProgress] = useState<number>(100);

  const runSimulation = () => {
    setIsRunning(true);
    setStreamProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        setStreamProgress(100);
        setIsRunning(false);
        clearInterval(interval);
      } else {
        setStreamProgress(p);
      }
    }, 120);
  };

  return (
    <section id="ai" className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Autonomous AI Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            Built for agents, not bolted on.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The primitives agents need are framework APIs, not an integration project: tool schemas derived from Python type hints, SSE streaming wired directly to frontend hooks, and vector embeddings residing directly in your operational database.
          </p>
        </div>

        {/* 3 Pillars of AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-[#ff2d20] flex items-center justify-center mb-4">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              @Tool Schema Derivation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Decorate any standard Python function. Fastplace automatically derives the strict JSON tool schema from type hints and docstrings. Functions remain directly callable in unit tests.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Agents That Stream
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <code className="text-slate-900 font-mono font-semibold">agent.stream_response(msg)</code> runs the tool execution loop and yields an SSE stream that <code className="text-blue-700 font-mono font-semibold">useAIStream()</code> hooks render directly on client devices without custom WebSockets.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Vectors in Your Operational DB
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Declare <code className="text-emerald-700 font-mono font-semibold">VectorField(dimensions=1536)</code> on your ORM models. Embeddings sit right next to the transactional rows they describe, eliminating separate vector database billing and synchronization lag.
            </p>
          </div>
        </div>

        {/* Live Interactive Agent Simulation Sandbox */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <div className="text-xs font-mono text-[#ff2d20] uppercase tracking-wider font-semibold mb-1">
                Interactive Agent Lifecycle Sandbox
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Experience the live agent tool execution loop
              </h3>
            </div>

            {/* Scenario Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenario(sc);
                    setStreamProgress(100);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedScenario.id === sc.id
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Agent Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input & Dispatch */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
              <div className="text-xs font-mono text-slate-500 mb-2 uppercase">
                Client Request Payload
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-900 mb-4">
                "{selectedScenario.query}"
              </div>

              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="w-full py-2.5 px-4 rounded-lg bg-[#ff2d20] hover:bg-[#e0261a] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                {isRunning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing Tool Loop...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Test Agent Loop Execution</span>
                  </>
                )}
              </button>

              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>LLM Model Routing:</span>
                  <span className="font-mono text-slate-900 font-semibold">LiteLLM (gpt-4o)</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Vector Index:</span>
                  <span className="font-mono text-emerald-700 font-semibold">pgvector HNSW</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Transport:</span>
                  <span className="font-mono text-blue-700 font-semibold">Server-Sent Events (SSE)</span>
                </div>
              </div>
            </div>

            {/* Execution Trace & Stream Response */}
            <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 p-5 rounded-xl font-mono text-xs text-slate-200 shadow-xl">
              <div className="text-slate-400 uppercase tracking-wider text-[11px] mb-3">
                Agent Execution Pipeline Trace
              </div>

              <div className="space-y-3 mb-5">
                {/* Step 1 */}
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">1. Tool Call Triggered: </span>
                    <span className="text-purple-300">{selectedScenario.toolUsed}</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">2. Data Layer Hit: </span>
                    <span className="text-yellow-300">{selectedScenario.vectorDbHit}</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">3. SSE Token Stream Active: </span>
                    <span className="text-emerald-400">HTTP 200 text/event-stream</span>
                  </div>
                </div>
              </div>

              {/* Streamed Output Box */}
              <div className="p-4 rounded-lg bg-[#070b14] border border-slate-800 text-slate-200 leading-relaxed">
                <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>useAIStream() Client Payload</span>
                  {isRunning && <span className="text-emerald-400 animate-pulse">Streaming...</span>}
                </div>
                <p className="font-sans text-xs sm:text-sm text-slate-200">
                  {streamProgress === 100
                    ? selectedScenario.streamResponse
                    : selectedScenario.streamResponse.slice(
                        0,
                        Math.max(20, Math.floor((selectedScenario.streamResponse.length * streamProgress) / 100))
                      )}
                  {isRunning && <span className="inline-block w-2 h-4 bg-[#ff2d20] ml-1 animate-pulse" />}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
