import React, { useState } from 'react';
import { ArrowRight, BookOpen, Check, Copy, Terminal, Sparkles, Layers, Cpu, Database, Zap, Activity, Code2 } from 'lucide-react';
import HeroArchitectureAnimation from './HeroArchitectureAnimation';

interface HeroProps {
  onOpenQuickstart: () => void;
}

export default function Hero({ onOpenQuickstart }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [heroView, setHeroView] = useState<'architecture' | 'code'>('architecture');
  const [activeTab, setActiveTab] = useState<'bridge' | 'orm' | 'agent'>('bridge');
  const installCmd = 'pip install fastplace';

  const copyCommand = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#f04438]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[280px] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow: clean unboxed metadata text */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#f04438] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04438] animate-pulse" />
            <span>A framework for developers and agents</span>
            <span className="text-[#475569]">/</span>
            <span className="text-[#94a3b8]">Modular Monolith by Default</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-['Outfit'] leading-[1.08] mb-6">
            Full-stack Python.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              React included.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            An async Python 3.12+ backend and a React 19 frontend, joined by a server-driven bridge — controllers render components with props, navigation swaps props, and no hand-written REST layer sits in between. Auth, queues, migrations, and AI agents are part of the install, not an integration project.
          </p>

          {/* Primary Action Buttons & Install Box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenQuickstart}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-[#f04438] hover:bg-[#d92d20] active:scale-[0.98] rounded-xl shadow-lg shadow-[#f04438]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Read the docs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#cbd5e1] hover:text-white bg-[#0f172a] hover:bg-[#1e293b] border border-[#334155]/80 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#94a3b8]" />
              <span>Browse the source</span>
            </a>

            {/* Quickcopy command box */}
            <div className="w-full sm:w-auto flex items-center bg-[#0b1120] border border-[#334155]/80 rounded-xl px-4 py-2.5 shadow-inner">
              <span className="text-[#f04438] font-mono text-sm mr-2 select-none">$</span>
              <code className="text-xs sm:text-sm font-mono text-[#e2e8f0] select-all mr-3">
                {installCmd}
              </code>
              <button
                onClick={copyCommand}
                className="text-[#94a3b8] hover:text-white transition-colors p-1 rounded hover:bg-[#1e293b] cursor-pointer"
                title="Copy installation command"
                aria-label="Copy installation command"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Showcase Perspective Switcher */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center bg-[#0b1120] p-1.5 rounded-xl border border-[#1e293b] shadow-lg">
              <button
                onClick={() => setHeroView('architecture')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  heroView === 'architecture'
                    ? 'bg-[#1e293b] text-white shadow-md font-semibold border border-[#334155]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4 text-[#f04438]" />
                <span>Architecture Blueprint (SVG)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>

              <button
                onClick={() => setHeroView('code')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  heroView === 'code'
                    ? 'bg-[#1e293b] text-white shadow-md font-semibold border border-[#334155]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Code Implementation</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display: Animated SVG Architecture or Code Sandbox */}
          {heroView === 'architecture' ? (
            <div className="mb-12">
              <HeroArchitectureAnimation />
            </div>
          ) : (
            <div className="bg-[#0b1120]/90 border border-[#1e293b] rounded-2xl p-4 sm:p-6 text-left shadow-2xl shadow-black/50 backdrop-blur-xl mb-12">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
                  <span className="text-xs font-mono text-[#64748b] ml-2">
                    fastplace-core: controller-to-spa data flow
                  </span>
                </div>

                {/* Functional tabs */}
                <div className="flex items-center bg-[#080c14] p-1 rounded-lg border border-[#1e293b]">
                  <button
                    onClick={() => setActiveTab('bridge')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeTab === 'bridge'
                        ? 'bg-[#1e293b] text-white shadow-sm'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    SPA Bridge
                  </button>
                  <button
                    onClick={() => setActiveTab('orm')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeTab === 'orm'
                        ? 'bg-[#1e293b] text-white shadow-sm'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Active-Record ORM
                  </button>
                  <button
                    onClick={() => setActiveTab('agent')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeTab === 'agent'
                        ? 'bg-[#1e293b] text-white shadow-sm'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Native AI Agent
                  </button>
                </div>
              </div>

              {/* Code and Visual preview corresponding to active tab */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                <div className="lg:col-span-7 font-mono text-xs leading-relaxed overflow-x-auto text-[#cbd5e1] p-3 rounded-xl bg-[#070b12]">
                  {activeTab === 'bridge' && (
                    <div>
                      <div className="text-[#64748b] mb-1"># app/http/controllers/dashboard_controller.py</div>
                      <div className="text-purple-400">from <span className="text-white">fastplace.http</span> import <span className="text-yellow-300">render</span></div>
                      <div className="text-purple-400">from <span className="text-white">app.modules.projects.services</span> import <span className="text-yellow-300">DashboardService</span></div>
                      <br />
                      <div><span className="text-blue-400">async def</span> <span className="text-yellow-300">index</span>(request):</div>
                      <div className="pl-4 text-[#94a3b8]"># Service returns validated Pydantic DTO</div>
                      <div className="pl-4">overview = <span className="text-blue-400">await</span> DashboardService().overview(user=request.user)</div>
                      <br />
                      <div className="pl-4 text-[#94a3b8]"># Direct render into React component — zero client fetch logic</div>
                      <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-yellow-300">render</span>(</div>
                      <div className="pl-8">request,</div>
                      <div className="pl-8">component=<span className="text-emerald-300">"Dashboard/Index"</span>,</div>
                      <div className="pl-8">props=overview.model_dump(),</div>
                      <div className="pl-4">)</div>
                    </div>
                  )}

                  {activeTab === 'orm' && (
                    <div>
                      <div className="text-[#64748b] mb-1"># app/modules/projects/models/project.py</div>
                      <div className="text-purple-400">from <span className="text-white">fastplace.orm</span> import <span className="text-yellow-300">Model, Field, VectorField</span></div>
                      <br />
                      <div><span className="text-blue-400">class</span> <span className="text-yellow-300">Project</span>(Model):</div>
                      <div className="pl-4">id: int = Field(primary_key=<span className="text-orange-400">True</span>)</div>
                      <div className="pl-4">name: str</div>
                      <div className="pl-4">owner_id: int</div>
                      <div className="pl-4">status: str = <span className="text-emerald-300">"in_progress"</span></div>
                      <br />
                      <div className="text-[#64748b]"># Fluent await-only query API over async SQLAlchemy 2.x</div>
                      <div>projects = <span className="text-blue-400">await</span> Project.query()\</div>
                      <div className="pl-4">.where(Project.owner_id == user.id)\</div>
                      <div className="pl-4">.with_(<span className="text-emerald-300">"tasks"</span>, <span className="text-emerald-300">"invoices"</span>)\</div>
                      <div className="pl-4">.order_by(Project.created_at.desc())\</div>
                      <div className="pl-4">.paginate(per_page=<span className="text-orange-400">20</span>)</div>
                    </div>
                  )}

                  {activeTab === 'agent' && (
                    <div>
                      <div className="text-[#64748b] mb-1"># app/ai/tools/search_docs.py & routes/ai.py</div>
                      <div className="text-purple-400">from <span className="text-white">fastplace.ai</span> import <span className="text-yellow-300">Tool, Agent</span></div>
                      <br />
                      <div><span className="text-yellow-300">@Tool</span>(description=<span className="text-emerald-300">"Search knowledge base with pgvector"</span>)</div>
                      <div><span className="text-blue-400">async def</span> <span className="text-yellow-300">search_docs</span>(query: str) -&gt; list[str]:</div>
                      <div className="pl-4">hits = <span className="text-blue-400">await</span> KnowledgeService().search(query, limit=<span className="text-orange-400">3</span>)</div>
                      <div className="pl-4"><span className="text-blue-400">return</span> [f<span className="text-emerald-300">"&#123;h.title&#125;: &#123;h.content&#125;"</span> for h in hits]</div>
                      <br />
                      <div className="text-[#64748b]"># Stream SSE tokens directly to React frontend hook useAIStream</div>
                      <div>agent = Agent(model=<span className="text-emerald-300">"gpt-4o"</span>, tools=[search_docs])</div>
                      <div><span className="text-blue-400">return</span> agent.stream_response(payload.get(<span className="text-emerald-300">"message"</span>))</div>
                    </div>
                  )}
                </div>

                {/* Explanatory column */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-[#080c14] p-5 rounded-xl border border-[#1e293b]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f04438] mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>How it eliminates complexity</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {activeTab === 'bridge' && 'Zero REST Boilerplate for React Views'}
                      {activeTab === 'orm' && 'SQLAlchemy 2.x async, made fluent'}
                      {activeTab === 'agent' && 'Autonomous AI Agents natively integrated'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-4">
                      {activeTab === 'bridge' &&
                        'The initial page load sends full server-rendered HTML with embedded JSON. Subsequent navigations make an async request with X-Fastplace-Request: true. React swaps the page component and props with zero manual endpoint glue.'}
                      {activeTab === 'orm' &&
                        'SQLite zero-config for development, PostgreSQL with pgvector for production. All queries run through strict repositories, preserving clean transaction boundaries with async with db.transaction().'}
                      {activeTab === 'agent' &&
                        'Type hints and docstrings automatically turn ordinary Python functions into validated LLM function-calling tools. Token streams flow via SSE straight into React client hooks.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1e293b]/80 flex items-center justify-between text-xs text-[#64748b]">
                    <span className="font-mono">CSR Pattern: C → S → R → DB</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% Type-Safe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ships with the install — unboxed clean metadata items with dot separators */}
          <div className="pt-4 border-t border-[#1e293b]/60">
            <p className="text-xs font-semibold tracking-wider text-[#64748b] uppercase mb-4">
              Ships with the install — zero extra packages needed
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#94a3b8]">
              <span className="text-white font-medium">Async Python 3.12+ core</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-white font-medium">React 19 SPA bridge</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-white font-medium">Active-record ORM</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-white font-medium">Native Auth & RBAC</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-white font-medium">Queues on SAQ + Redis</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-white font-medium">Static prerendering</span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-[#f04438] font-medium">Agents, tools, vector search</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
