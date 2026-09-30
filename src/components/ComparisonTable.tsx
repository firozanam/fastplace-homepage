import React from 'react';
import { Check, X, Minus, ShieldCheck, Zap, Scale } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  category: string;
  fastplace: string;
  fastplaceWin: boolean;
  splitStack: string;
  djangoRails: string;
  microservices: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    feature: 'Web View Data Transport',
    category: 'Architecture',
    fastplace: 'Server-Driven SPA Bridge (0 manual REST/fetch lines)',
    fastplaceWin: true,
    splitStack: 'Manual REST / GraphQL + React Query state',
    djangoRails: 'Server HTML templates (limited client interactivity)',
    microservices: 'API Gateway + Federation + BFF layer',
  },
  {
    feature: 'Mobile & Desktop Clients',
    category: 'Architecture',
    fastplace: 'Unified JSON API sharing same CSR services',
    fastplaceWin: true,
    splitStack: 'Duplicate endpoints or shared REST',
    djangoRails: 'DRF / separate API serializer layer',
    microservices: 'Multiple downstream service aggregations',
  },
  {
    feature: 'Cross-Module Transactions',
    category: 'Reliability',
    fastplace: 'ACID in-process: async with db.transaction()',
    fastplaceWin: true,
    splitStack: 'Single DB or 2-phase commit overhead',
    djangoRails: 'ACID in-process (monolith)',
    microservices: 'Distributed Sagas / Outbox / Eventual consistency',
  },
  {
    feature: 'Native AI & Vector Search',
    category: 'AI Capabilities',
    fastplace: 'First-class @Tool, SSE streams & VectorField',
    fastplaceWin: true,
    splitStack: 'Manual LangChain / LlamaIndex glue',
    djangoRails: 'External packages / bolted-on services',
    microservices: 'Dedicated AI service + sync pipelines',
  },
  {
    feature: 'Module Boundary Enforcement',
    category: 'Maintainability',
    fastplace: 'Automated CI lint (fastplace lint:modules)',
    fastplaceWin: true,
    splitStack: 'Folder convention only',
    djangoRails: 'App boundary discipline easily violated',
    microservices: 'Network boundary (high runtime latency)',
  },
  {
    feature: 'Local Development Setup',
    category: 'Developer Experience',
    fastplace: 'Zero-config SQLite + single command fastplace run dev',
    fastplaceWin: true,
    splitStack: 'Docker Compose with 3+ services & CORS setup',
    djangoRails: 'Simple monolith runner',
    microservices: 'Heavy Docker Compose / Minikube setup',
  },
  {
    feature: 'Production Deploy Footprint',
    category: 'Operations',
    fastplace: '1 deployable container (ASGI + built assets)',
    fastplaceWin: true,
    splitStack: '2+ containers (Backend API + Next.js SSR node)',
    djangoRails: '1 container (WSGI / Gunicorn)',
    microservices: 'Kubernetes cluster, mesh, telemetry fleet',
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Scale className="w-4 h-4" />
            <span>Architectural Decision Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            How Fastplace compares for enterprise teams.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fastplace delivers the modern client feel of a React SPA paired with the single-process velocity and transactional safety of an opinionated modular monolith.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 text-slate-600">Evaluation Dimension</th>
                  <th className="py-4 px-6 text-slate-900 bg-red-50/70 border-x border-red-200/80">
                    <span className="flex items-center gap-1.5 text-[#ff2d20] font-bold">
                      <span>Fastplace</span>
                      <span className="text-[10px] bg-[#ff2d20] text-white px-1.5 py-0.2 rounded font-sans">
                        RECOMMENDED
                      </span>
                    </span>
                  </th>
                  <th className="py-4 px-6 text-slate-600">FastAPI + Next.js Split</th>
                  <th className="py-4 px-6 text-slate-600">Classic Monolith (Django)</th>
                  <th className="py-4 px-6 text-slate-600">Microservices Fleet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {COMPARISONS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-slate-900">
                      <div>{row.feature}</div>
                      <div className="text-[10px] font-mono text-slate-500">{row.category}</div>
                    </td>

                    {/* Fastplace Column */}
                    <td className="py-4 px-6 font-semibold text-emerald-800 bg-red-50/30 border-x border-red-100">
                      <div className="flex items-start gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.fastplace}</span>
                      </div>
                    </td>

                    {/* Split Stack */}
                    <td className="py-4 px-6 text-slate-600">
                      {row.splitStack}
                    </td>

                    {/* Django/Rails */}
                    <td className="py-4 px-6 text-slate-600">
                      {row.djangoRails}
                    </td>

                    {/* Microservices */}
                    <td className="py-4 px-6 text-slate-600">
                      {row.microservices}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Note */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>ADR Architecture Summary · Evaluated against modern cloud runtime requirements</span>
            <span className="text-slate-900 font-mono font-medium">100% Open Source (MIT)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
