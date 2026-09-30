import React, { useState } from 'react';
import { Layers, Shield, Database, Cpu, ArrowRight, Check, AlertCircle, RefreshCw, Network, Lock } from 'lucide-react';

export default function ArchitectureExplorer() {
  const [activeView, setActiveView] = useState<'csr' | 'monolith' | 'workers' | 'tenancy'>('csr');
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="scalability" className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Layers className="w-4 h-4" />
            <span>Component Scalability & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            The full stack. One modular deployable unit.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fastplace pairs the operational simplicity of a single process with microservice-grade internal boundaries. Scale horizontally on one ASGI stack without distributed-system tax.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => setActiveView('csr')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeView === 'csr'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CSR Data Flow Pattern
          </button>
          <button
            onClick={() => setActiveView('monolith')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeView === 'monolith'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Modular Monolith Boundaries
          </button>
          <button
            onClick={() => setActiveView('workers')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeView === 'workers'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Distributed SAQ Workers
          </button>
          <button
            onClick={() => setActiveView('tenancy')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeView === 'tenancy'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enterprise Multi-Tenancy
          </button>
        </div>

        {/* View 1: CSR Pipeline */}
        {activeView === 'csr' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <span>Controller → Service → Repository (CSR) Layering</span>
                  <span className="text-xs font-mono font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ADR-002 Compliant
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Every request follows a strict unidirectional pipeline. One backend serves both the React SPA bridge and the Unified API.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Select Step:</span>
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeStep === step
                        ? 'bg-[#ff2d20] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Pipeline Track */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-6 mb-8">
              {[
                {
                  step: 1,
                  title: 'Client Request',
                  sub: 'Web SPA or Unified JSON API',
                  desc: 'Sends X-Fastplace-Request or JSON payload',
                },
                {
                  step: 2,
                  title: 'HTTP Controller',
                  sub: 'app/http/controllers',
                  desc: 'Validates input via Pydantic v2, checks auth',
                },
                {
                  step: 3,
                  title: 'Module Service',
                  sub: 'app/modules/<name>/services',
                  desc: 'Business rules & db.transaction() boundary',
                },
                {
                  step: 4,
                  title: 'Data Repository',
                  sub: 'app/modules/<name>/repositories',
                  desc: 'Query construction, eager loads, pagination',
                },
                {
                  step: 5,
                  title: 'Database & ORM',
                  sub: 'Fastplace ORM / SQLAlchemy 2.x',
                  desc: 'PostgreSQL, SQLite, MySQL, or Mongo',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeStep === item.step
                      ? 'bg-white border-[#ff2d20] shadow-md'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-[#ff2d20]">
                      0{item.step}
                    </span>
                    {activeStep === item.step && (
                      <span className="w-2 h-2 rounded-full bg-[#ff2d20]" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</div>
                  <div className="text-[11px] font-mono text-slate-500 truncate mb-2">{item.sub}</div>
                  <p className="text-[11px] text-slate-600 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Active Step Deep-Dive */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
              {activeStep === 1 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Step 1: One Request Pipeline, Two Presentation Edges
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Browser requests use the Fastplace Bridge protocol (<code className="text-[#ff2d20] font-mono bg-red-50 px-1 py-0.5 rounded">X-Fastplace-Request: true</code>). React swaps page components dynamically without full-page reloads or hand-rolled fetch queries. Mobile and desktop apps consume the identical business backend via versioned <code className="text-[#ff2d20] font-mono bg-red-50 px-1 py-0.5 rounded">/api/v1/*</code> endpoints in <code className="text-slate-800 font-mono">routes/api.py</code>.
                  </p>
                  <div className="text-xs font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    Result: 0 duplicated business logic. Any service change reflects instantly across both web and mobile clients.
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Step 2: Thin Controllers, Zero Direct Database Access
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Controllers are strictly HTTP-aware adapters. They parse the request, enforce authorization gates, validate incoming schemas with Pydantic v2, and delegate immediately to a module service. Controllers <strong className="text-slate-900">never</strong> contain business logic or import database models directly.
                  </p>
                  <div className="text-xs font-mono text-purple-800 bg-purple-50 p-2.5 rounded border border-purple-200">
                    Rule: Controllers validate input and shape output. If a controller opens a transaction or writes a SQL query, the build linter flags it.
                  </div>
                </div>
              )}
              {activeStep === 3 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Step 3: Services Own Invariants & Atomic Transactions
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Services represent the bounded context's public API. When a workflow spans multiple entities (e.g. closing a project, calculating billable hours, issuing an invoice), the service wraps the entire operation in an ACID block: <code className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-mono">async with db.transaction():</code>. If anything fails, every table automatically rolls back.
                  </p>
                  <div className="text-xs font-mono text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
                    Advantage: Single-process ACID reliability replaces high-failure-rate distributed saga choreographies.
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Step 4: Repositories Own Query Construction & Keyset Paging
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    All filters, joins, eager loads (<code className="text-blue-800 bg-blue-50 px-1 py-0.5 rounded font-mono">.with_("tasks", "owner")</code>), and keyset chunking (<code className="text-blue-800 bg-blue-50 px-1 py-0.5 rounded font-mono">.chunk_by_id(500)</code>) live inside Repositories. Relationships are configured <code className="text-red-700 bg-red-50 px-1 py-0.5 rounded font-mono">lazy="raise"</code> by default, preventing catastrophic N+1 query loops before code reaches production.
                  </p>
                  <div className="text-xs font-mono text-blue-800 bg-blue-50 p-2.5 rounded border border-blue-200">
                    Optimization: Keyset pagination prevents database OFFSET degradation when querying millions of historical records.
                  </div>
                </div>
              )}
              {activeStep === 5 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Step 5: Database Capability Registry & Portability
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Developers write against the fluent Fastplace ORM API. SQLAlchemy 2.x provides the async engine beneath. Databases declare their capabilities through the registry (<code className="text-emerald-700 font-mono">db.capabilities.supports_vector</code>, <code className="text-emerald-700 font-mono">supports_json</code>, <code className="text-emerald-700 font-mono">supports_rls</code>). No silent fake emulation.
                  </p>
                  <div className="text-xs font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    Flexibility: SQLite for instant dev and tests; PostgreSQL + pgvector for production; MySQL supported; MongoDB adapter for documents.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View 2: Modular Monolith Boundaries */}
        {activeView === 'monolith' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Modular Monolith: Boundary Enforcement
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Logical decomposition without physical network hops. Cross-module communication flows strictly through public Service APIs.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                CLI Guard: fastplace lint:modules
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Module: Projects */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
                <div className="text-xs font-mono uppercase text-slate-500 mb-1">Module: app/modules/projects</div>
                <div className="text-base font-bold text-slate-900 mb-3">Projects Domain</div>
                <ul className="text-xs space-y-2 text-slate-600 font-mono">
                  <li className="text-emerald-700">✓ models/project.py</li>
                  <li className="text-emerald-700">✓ repositories/project_repo.py</li>
                  <li className="text-slate-900 font-bold">★ services/project_service.py</li>
                  <li className="text-slate-500">→ calls InvoiceService() API</li>
                </ul>
              </div>

              {/* Boundary Enforcer */}
              <div className="bg-white border border-blue-200 p-5 rounded-xl flex flex-col justify-center text-center shadow-2xs">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-slate-900 mb-1">Hardened Import Lint</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Importing another module's repository or model raises an immediate build error. Only public <code className="text-emerald-700 font-mono">services/</code> are legal cross-module edges.
                </p>
              </div>

              {/* Module: Billing */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
                <div className="text-xs font-mono uppercase text-slate-500 mb-1">Module: app/modules/billing</div>
                <div className="text-base font-bold text-slate-900 mb-3">Billing Domain</div>
                <ul className="text-xs space-y-2 text-slate-600 font-mono">
                  <li className="text-emerald-700">✓ models/invoice.py (Private)</li>
                  <li className="text-emerald-700">✓ repositories/invoice_repo.py</li>
                  <li className="text-slate-900 font-bold">★ services/invoice_service.py (Public)</li>
                  <li className="text-slate-500">→ Returns InvoiceDTO contract</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl text-xs text-slate-600 flex items-center justify-between shadow-2xs">
              <span>
                <strong className="text-slate-900">Extraction Ready:</strong> If the Billing module ever requires separate scaling, its route table and DTO contracts extract into a separate microservice with zero changes to callers.
              </span>
              <span className="font-mono text-emerald-700 font-semibold shrink-0 ml-4">100% Decoupled</span>
            </div>
          </div>
        )}

        {/* View 3: Distributed SAQ Workers */}
        {activeView === 'workers' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Async Background Queues (SAQ + Redis)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Offload heavy AI embeddings, report generation, and notifications into high-throughput Redis workers.
                </p>
              </div>
              <div className="text-xs font-mono text-[#ff2d20] bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
                fastplace queue:work
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>Non-Blocking HTTP</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Web controllers enqueue jobs in microseconds via SAQ. Users receive instant HTTP responses while background tasks execute reliably.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span>Automatic Exponential Retries</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Built-in dead-letter queues, backoff retries, and failed job tracking (<code className="text-slate-800 font-mono">fastplace queue:failed</code> / <code className="text-slate-800 font-mono">queue:retry</code>).
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                  <Network className="w-4 h-4 text-purple-600" />
                  <span>Independent Worker Scaling</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Run 1 worker process on local development; spin up 50 autoscaled worker pods in production using the identical application codebase.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 4: Enterprise Multi-Tenancy */}
        {activeView === 'tenancy' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Enterprise Multi-Tenancy (<code className="text-[#ff2d20] font-mono">fastplace-tenancy</code>)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  First-party package offering defense-in-depth isolation. Single database, company-scoped ORM, and PostgreSQL Row-Level Security.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                Opt-in First-Party Package
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                <div className="text-xs font-mono text-[#ff2d20] mb-1">Layer 1: ORM Scoping</div>
                <div className="text-sm font-bold text-slate-900 mb-1">Automatic Filtering</div>
                <p className="text-xs text-slate-600">
                  Every query on <code className="text-slate-900 font-mono">CompanyScopedModel</code> automatically appends <code className="text-emerald-700 font-mono">WHERE company_id = ?</code>.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                <div className="text-xs font-mono text-blue-600 mb-1">Layer 2: Database RLS</div>
                <div className="text-sm font-bold text-slate-900 mb-1">PostgreSQL RLS</div>
                <p className="text-xs text-slate-600">
                  Native Row-Level Security ensures physical tenant isolation at the PostgreSQL storage engine level.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                <div className="text-xs font-mono text-purple-600 mb-1">Layer 3: Cache Scoping</div>
                <div className="text-sm font-bold text-slate-900 mb-1">Tenant Key Prefixes</div>
                <p className="text-xs text-slate-600">
                  Cache keys are automatically namespaced <code className="text-purple-700 font-mono">company:&#123;id&#125;:...</code> to prevent cross-tenant cache leaks.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                <div className="text-xs font-mono text-emerald-600 mb-1">Layer 4: AI & Vectors</div>
                <div className="text-sm font-bold text-slate-900 mb-1">Isolated Vector Stores</div>
                <p className="text-xs text-slate-600">
                  Vector similarity queries partition embeddings per tenant, so AI agents only search authorized company knowledge.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
