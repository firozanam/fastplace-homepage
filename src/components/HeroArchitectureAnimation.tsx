import React, { useState, useEffect } from 'react';
import { Layers, Database, Sparkles, Cpu, Globe, Smartphone, ArrowRight, ShieldCheck, Zap, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

type FlowMode = 'spa' | 'ai' | 'transaction';

interface ModeDetails {
  id: FlowMode;
  name: string;
  badge: string;
  description: string;
  latency: string;
  packetSummary: string;
  header: string;
  flowColor: string;
}

const MODES: Record<FlowMode, ModeDetails> = {
  spa: {
    id: 'spa',
    name: 'Server-Driven SPA Bridge',
    badge: 'Zero REST Boilerplate',
    description: 'React link click triggers async request with X-Fastplace-Request. Python controller delegates to service, and returns component props for instant hydration without full page reload.',
    latency: '18ms P95',
    packetSummary: '{"component": "Dashboard/Index", "props": {"user": "Alex", "stats": {"completed": 42}}}',
    header: 'X-Fastplace-Request: true',
    flowColor: '#f04438',
  },
  ai: {
    id: 'ai',
    name: 'Autonomous AI Agent & pgvector',
    badge: 'Native Operational AI',
    description: 'Agent triggers @Tool decorator function. Service queries pgvector cosine similarity in Postgres, then streams SSE tokens directly to frontend useAIStream() hook.',
    latency: '34ms TTFT',
    packetSummary: 'data: {"token": "ADR-001 enforces modular monolith boundaries..."}\nevent: tool_call',
    header: 'Accept: text/event-stream',
    flowColor: '#10b981',
  },
  transaction: {
    id: 'transaction',
    name: 'Single-Process ACID Transaction',
    badge: 'No Distributed Sagas',
    description: 'ProjectService and InvoiceService execute inside one async with db.transaction() scope. If billing fails, project status automatically rolls back.',
    latency: '12ms Commit',
    packetSummary: 'BEGIN TRANSACTION -> UPDATE projects -> INSERT invoices -> COMMIT (Atomic)',
    header: 'X-Transaction-Isolation: Read-Committed',
    flowColor: '#3b82f6',
  },
};

export default function HeroArchitectureAnimation() {
  const [activeMode, setActiveMode] = useState<FlowMode>('spa');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pulseCount, setPulseCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((c) => c + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const mode = MODES[activeMode];

  return (
    <div className="w-full bg-[#070b14] border border-[#1e293b] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Controls: Mode Switcher & Live Telemetry Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Live Framework Runtime Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-emerald-400 border border-emerald-500/20">
                Active Simulation
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">
              Select an architectural pipeline to visualize real-time data pulses and process flow
            </p>
          </div>
        </div>

        {/* Interactive Mode Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0b1120] p-1.5 rounded-xl border border-[#1e293b]">
          <button
            onClick={() => setActiveMode('spa')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'spa'
                ? 'bg-[#f04438] text-white shadow-md shadow-[#f04438]/20 font-semibold'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>React SPA Bridge</span>
          </button>

          <button
            onClick={() => setActiveMode('ai')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'ai'
                ? 'bg-[#10b981] text-white shadow-md shadow-[#10b981]/20 font-semibold'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Native AI & pgvector</span>
          </button>

          <button
            onClick={() => setActiveMode('transaction')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'transaction'
                ? 'bg-[#3b82f6] text-white shadow-md shadow-[#3b82f6]/20 font-semibold'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Atomic ACID Scope</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative py-4 my-2 overflow-x-auto">
        <svg
          viewBox="0 0 960 410"
          className="w-full min-w-[760px] h-auto select-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="fastplaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f04438" />
              <stop offset="100%" stopColor="#b42318" />
            </linearGradient>

            <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="monolithBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b1120" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#080c14" stopOpacity="0.95" />
            </linearGradient>

            {/* Neon Glow Filters */}
            <filter id="glowCoral" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Animated Path Dash Markers */}
            <style>{`
              @keyframes dashFlowForward {
                from { stroke-dashoffset: 60; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes dashFlowReverse {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: 60; }
              }
              @keyframes pulseCircle {
                0% { r: 4px; opacity: 1; }
                50% { r: 9px; opacity: 0.4; }
                100% { r: 4px; opacity: 1; }
              }
              @keyframes packetTravel1 {
                0% { offset-distance: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { offset-distance: 100%; opacity: 0; }
              }
              .active-path-spa {
                stroke-dasharray: 8 6;
                animation: dashFlowForward 1.4s linear infinite;
              }
              .active-path-ai {
                stroke-dasharray: 6 5;
                animation: dashFlowForward 1.2s linear infinite;
              }
              .active-path-tx {
                stroke-dasharray: 7 5;
                animation: dashFlowForward 1.1s linear infinite;
              }
              .pulsing-node {
                animation: pulseCircle 2.2s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* ========================================================= */}
          {/* REGION 1: CLIENT PRESENTATION EDGE (X: 30 to 190)         */}
          {/* ========================================================= */}
          <g transform="translate(30, 30)">
            {/* Group Label */}
            <text x="0" y="10" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="1">
              01 // PRESENTATION CLIENTS
            </text>

            {/* Node 1: Web React SPA */}
            <g
              transform="translate(0, 30)"
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredNode('react')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="160"
                height="125"
                rx="14"
                fill="#0b1120"
                stroke={activeMode === 'spa' ? '#f04438' : '#1e293b'}
                strokeWidth={activeMode === 'spa' ? '2' : '1'}
                filter={activeMode === 'spa' ? 'url(#glowCoral)' : undefined}
              />
              <circle cx="28" cy="30" r="14" fill="#1e293b" />
              <path d="M22 30 C22 23, 34 23, 34 30 C34 37, 22 37, 22 30" fill="none" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="28" cy="30" r="2.5" fill="#38bdf8" />
              
              <text x="50" y="27" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                React 19 SPA
              </text>
              <text x="50" y="42" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                @fastplace/react
              </text>
              <line x1="16" y1="58" x2="144" y2="58" stroke="#1e293b" />
              <text x="16" y="76" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                usePage().props
              </text>
              <text x="16" y="93" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                useAIStream()
              </text>
              <rect x="16" y="102" width="70" height="15" rx="4" fill="#f04438" fillOpacity="0.15" />
              <text x="22" y="113" fill="#f04438" fontSize="8.5" fontFamily="monospace" fontWeight="600">
                HYDRATED SPA
              </text>
            </g>

            {/* Node 2: Mobile / Unified API Client */}
            <g
              transform="translate(0, 195)"
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredNode('mobile')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="160"
                height="115"
                rx="14"
                fill="#0b1120"
                stroke={activeMode === 'transaction' ? '#3b82f6' : '#1e293b'}
                strokeWidth={activeMode === 'transaction' ? '2' : '1'}
              />
              <circle cx="28" cy="28" r="14" fill="#1e293b" />
              <rect x="23" y="21" width="10" height="15" rx="2" fill="none" stroke="#a855f7" strokeWidth="1.8" />
              
              <text x="50" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                Mobile & API
              </text>
              <text x="50" y="40" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                iOS, Android, CLI
              </text>
              <line x1="16" y1="56" x2="144" y2="56" stroke="#1e293b" />
              <text x="16" y="74" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                routes/api.py
              </text>
              <text x="16" y="91" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                Bearer Auth / JSON
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* CONNECTOR PATHS: CLIENTS -> GATEWAY / CORE                */}
          {/* ========================================================= */}
          {/* Web SPA to Controller */}
          <path
            id="path-web-to-controller"
            d="M 190 120 L 290 120"
            fill="none"
            stroke={activeMode === 'spa' || activeMode === 'ai' ? '#f04438' : '#334155'}
            strokeWidth={activeMode === 'spa' ? '3' : '1.5'}
            className={activeMode === 'spa' ? 'active-path-spa' : ''}
          />
          {/* Return path for props */}
          <path
            d="M 290 135 L 190 135"
            fill="none"
            stroke={activeMode === 'spa' ? '#10b981' : '#1e293b'}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Mobile to API Gateway */}
          <path
            d="M 190 260 L 290 260"
            fill="none"
            stroke={activeMode === 'transaction' ? '#3b82f6' : '#334155'}
            strokeWidth={activeMode === 'transaction' ? '2.5' : '1.5'}
            className={activeMode === 'transaction' ? 'active-path-tx' : ''}
          />

          {/* Protocol Badge on the wire */}
          <g transform="translate(200, 94)">
            <rect width="80" height="18" rx="4" fill="#080c14" stroke="#1e293b" />
            <text x="6" y="12" fill="#f04438" fontSize="8" fontFamily="monospace" fontWeight="600">
              X-Bridge 12ms
            </text>
          </g>

          {/* ========================================================= */}
          {/* REGION 2: MODULAR MONOLITH CORE (X: 290 to 710)           */}
          {/* ========================================================= */}
          {/* Monolith Container Frame */}
          <g transform="translate(290, 20)">
            <rect
              width="430"
              height="360"
              rx="20"
              fill="url(#monolithBg)"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            {/* Header Badge */}
            <rect x="20" y="-12" width="220" height="24" rx="6" fill="#080c14" stroke="#f04438" strokeWidth="1.5" />
            <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
              FASTPLACE MONOLITH (ONE PROCESS)
            </text>

            <text x="260" y="4" fill="#64748b" fontSize="9.5" fontFamily="monospace">
              FastAPI + Starlette + CSR
            </text>

            {/* --- Core Step 1: Controller Layer --- */}
            <g
              transform="translate(20, 35)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode('controller')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="390"
                height="62"
                rx="12"
                fill="#0f172a"
                stroke={activeMode === 'spa' ? '#f04438' : '#1e293b'}
                strokeWidth={activeMode === 'spa' ? '2' : '1'}
              />
              <circle cx="24" cy="31" r="10" fill="#f04438" fillOpacity="0.2" />
              <text x="20" y="35" fill="#f04438" fontSize="11" fontWeight="bold" fontFamily="monospace">C</text>
              <text x="46" y="27" fill="#ffffff" fontSize="12" fontWeight="bold">
                HTTP Controller (Thin Edge)
              </text>
              <text x="46" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                app/http/controllers/ · Pydantic v2 input validation & auth gates
              </text>
              <rect x="300" y="16" width="76" height="18" rx="4" fill="#1e293b" />
              <text x="307" y="28" fill="#10b981" fontSize="9" fontFamily="monospace">
                render(...)
              </text>
            </g>

            {/* Line: Controller -> Service */}
            <line x1="215" y1="97" x2="215" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="215,127 212,121 218,121" fill="#38bdf8" />

            {/* --- Core Step 2: Service Layer & Transaction Boundary --- */}
            <g
              transform="translate(20, 127)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode('service')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="390"
                height="80"
                rx="12"
                fill="#0f172a"
                stroke={activeMode === 'transaction' ? '#3b82f6' : activeMode === 'ai' ? '#10b981' : '#1e293b'}
                strokeWidth={activeMode === 'transaction' || activeMode === 'ai' ? '2' : '1'}
                filter={activeMode === 'transaction' ? 'url(#glowBlue)' : undefined}
              />
              <circle cx="24" cy="30" r="10" fill="#3b82f6" fillOpacity="0.2" />
              <text x="20" y="34" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">S</text>
              
              <text x="46" y="27" fill="#ffffff" fontSize="12" fontWeight="bold">
                Domain Service (Public Module API)
              </text>
              <text x="46" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                app/modules/*/services · async with db.transaction():
              </text>
              
              <rect x="46" y="52" width="165" height="18" rx="4" fill="#080c14" stroke="#334155" />
              <text x="52" y="64" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                Invariants & ACID Scope
              </text>

              <rect x="220" y="52" width="156" height="18" rx="4" fill="#080c14" stroke="#334155" />
              <text x="226" y="64" fill="#10b981" fontSize="9" fontFamily="monospace">
                Public DTO Contract
              </text>
            </g>

            {/* Split Lines: Service -> Repository & AI Engine */}
            <line x1="130" y1="207" x2="130" y2="237" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="130,239 127,233 133,233" fill="#cbd5e1" />

            <line x1="300" y1="207" x2="300" y2="237" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="300,239 297,233 303,233" fill="#10b981" />

            {/* --- Core Step 3A: Repository (Left) --- */}
            <g
              transform="translate(20, 239)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode('repository')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="185"
                height="92"
                rx="12"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="1"
              />
              <circle cx="20" cy="24" r="8" fill="#a855f7" fillOpacity="0.2" />
              <text x="17" y="27" fill="#a855f7" fontSize="9" fontWeight="bold" fontFamily="monospace">R</text>
              <text x="36" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">
                Repository Layer
              </text>
              <text x="14" y="47" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                Fastplace ORM Queries
              </text>
              <text x="14" y="62" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                • .where().paginate()
              </text>
              <text x="14" y="75" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                • with_() eager loading
              </text>
            </g>

            {/* --- Core Step 3B: AI Agent Engine & SAQ Queues (Right) --- */}
            <g
              transform="translate(215, 239)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredNode('ai-engine')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="195"
                height="92"
                rx="12"
                fill="#0f172a"
                stroke={activeMode === 'ai' ? '#10b981' : '#1e293b'}
                strokeWidth={activeMode === 'ai' ? '2' : '1'}
                filter={activeMode === 'ai' ? 'url(#glowGreen)' : undefined}
              />
              <circle cx="20" cy="24" r="8" fill="#10b981" fillOpacity="0.2" />
              <text x="17" y="27" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">AI</text>
              <text x="36" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">
                AI Agent Engine
              </text>
              <text x="14" y="47" fill="#10b981" fontSize="9" fontFamily="monospace">
                @Tool schema generator
              </text>
              <text x="14" y="62" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                • LiteLLM model routing
              </text>
              <text x="14" y="75" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">
                • SAQ Async Worker (Redis)
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* CONNECTOR PATHS: CORE -> DATABASE & VECTOR (X: 720 to 790) */}
          {/* ========================================================= */}
          {/* From Repository to DB */}
          <path
            d="M 505 310 L 780 310"
            fill="none"
            stroke={activeMode === 'transaction' ? '#3b82f6' : '#334155'}
            strokeWidth={activeMode === 'transaction' ? '3' : '1.5'}
            className={activeMode === 'transaction' ? 'active-path-tx' : ''}
          />
          {/* From AI Engine to Vector DB */}
          <path
            d="M 700 280 L 780 200"
            fill="none"
            stroke={activeMode === 'ai' ? '#10b981' : '#334155'}
            strokeWidth={activeMode === 'ai' ? '3' : '1.5'}
            className={activeMode === 'ai' ? 'active-path-ai' : ''}
          />

          {/* ========================================================= */}
          {/* REGION 3: OPERATIONAL DATA & VECTOR STORE (X: 780 to 930) */}
          {/* ========================================================= */}
          <g transform="translate(780, 50)">
            <text x="0" y="-10" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="1">
              03 // PERSISTENCE
            </text>

            {/* Node: PostgreSQL + pgvector */}
            <g
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredNode('database')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect
                width="150"
                height="140"
                rx="16"
                fill="#0b1120"
                stroke={activeMode === 'ai' ? '#10b981' : '#3b82f6'}
                strokeWidth="2"
                filter={activeMode === 'ai' ? 'url(#glowGreen)' : 'url(#glowBlue)'}
              />
              <circle cx="28" cy="28" r="14" fill="#1e293b" />
              <path d="M22 25 C22 22 34 22 34 25 C34 28 22 28 22 25" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
              <path d="M22 29 C22 32 34 32 34 29" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
              <path d="M22 33 C22 36 34 36 34 33" fill="none" stroke="#60a5fa" strokeWidth="1.5" />

              <text x="50" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                PostgreSQL
              </text>
              <text x="50" y="38" fill="#10b981" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                + pgvector
              </text>

              <line x1="14" y1="52" x2="136" y2="52" stroke="#1e293b" />
              
              <text x="14" y="70" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                • VectorField(1536)
              </text>
              <text x="14" y="85" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                • HNSW Cosine Index
              </text>
              <text x="14" y="100" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                • ACID Transactions
              </text>
              <text x="14" y="115" fill="#64748b" fontSize="9" fontFamily="monospace">
                • Row-Level Security
              </text>
            </g>

            {/* Zero-Config SQLite Alternative */}
            <g
              transform="translate(0, 160)"
              className="cursor-pointer"
            >
              <rect
                width="150"
                height="90"
                rx="12"
                fill="#0b1120"
                stroke="#1e293b"
                strokeWidth="1"
              />
              <text x="16" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">
                SQLite (Zero-Config)
              </text>
              <text x="16" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                Default for local dev
              </text>
              <line x1="14" y1="52" x2="136" y2="52" stroke="#1e293b" />
              <text x="16" y="70" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                Instant fastplace new
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* ANIMATED PACKET PULSES TRAVELLING ON ACTIVE PATHS         */}
          {/* ========================================================= */}
          {activeMode === 'spa' && (
            <g>
              <circle cx="240" cy="120" r="5" fill="#f04438" className="pulsing-node" />
              <circle cx="505" cy="158" r="4.5" fill="#f04438" />
              <circle cx="240" cy="135" r="4" fill="#10b981" />
            </g>
          )}

          {activeMode === 'ai' && (
            <g>
              <circle cx="600" cy="285" r="5" fill="#10b981" className="pulsing-node" />
              <circle cx="740" cy="240" r="4.5" fill="#10b981" />
              <circle cx="240" cy="120" r="4.5" fill="#10b981" />
            </g>
          )}

          {activeMode === 'transaction' && (
            <g>
              <circle cx="505" cy="207" r="5" fill="#3b82f6" className="pulsing-node" />
              <circle cx="640" cy="310" r="5" fill="#3b82f6" />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Live Wire Inspector & Architecture Explainer */}
      <div className="mt-4 pt-4 border-t border-[#1e293b] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Wire Packet Details */}
        <div className="lg:col-span-8 bg-[#080c14] border border-[#1e293b] p-3.5 rounded-xl font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-[#64748b] mb-1.5 pb-1 border-b border-[#1e293b]">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mode.flowColor }} />
              Active Protocol Trace: {mode.header}
            </span>
            <span className="text-emerald-400 font-bold">{mode.latency}</span>
          </div>
          <div className="text-[#cbd5e1] truncate text-[11px]">
            {mode.packetSummary}
          </div>
        </div>

        {/* Guarantee Callout */}
        <div className="lg:col-span-4 flex items-center justify-between sm:justify-end gap-3 text-xs text-[#94a3b8]">
          <span className="text-[11px] font-sans leading-tight text-right">
            <strong className="text-white block font-semibold">{mode.badge}</strong>
            Single process · Zero distributed sagas
          </span>
          <div className="w-7 h-7 rounded-lg bg-[#1e293b] flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
