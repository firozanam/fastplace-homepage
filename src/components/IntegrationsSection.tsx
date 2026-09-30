import React, { useState } from 'react';
import { Blocks, Check, ExternalLink, ArrowRight, Database, Terminal, Cpu, Sparkles, Layers } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: 'runtime' | 'database' | 'frontend' | 'ai';
  summary: string;
  badge: string;
  details: string;
  snippet: string;
}

const TOOLS: Tool[] = [
  {
    id: 'python',
    name: 'Python 3.12+',
    category: 'runtime',
    badge: 'Async Core Engine',
    summary: '3.12+ async runtime — the backend language end to end.',
    details: 'Leverages native asyncio, modern pattern matching, and type annotations for strict compile-time safety and sub-50ms cold starts.',
    snippet: 'async with db.transaction():\n    await project.save()\n    await invoice_service.issue(project.id)',
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'frontend',
    badge: 'Hydrated SPA Edge',
    summary: '18+ frontend rendered by the bridge with server props.',
    details: 'Initial page arrives as fully rendered HTML. Navigations swap page components and props dynamically with zero manual REST fetch endpoints.',
    snippet: 'export default function Dashboard() {\n  const { user, tasks } = usePage().props;\n  return <TaskList items={tasks} />;\n}',
  },
  {
    id: 'pydantic',
    name: 'Pydantic v2',
    category: 'runtime',
    badge: 'Rust-Backed Schemas',
    summary: 'v2 validation for requests, props, and agent response models.',
    details: 'Provides ultra-fast input validation at the HTTP edge, preventing malformed requests from ever reaching your domain services.',
    snippet: 'class CreateTaskRequest(BaseModel):\n    title: str = Field(min_length=1, max_length=255)\n    due_date: date | None = None',
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy 2.x',
    category: 'database',
    badge: 'Relational Backbone',
    summary: '2.x engine beneath the declarative Fastplace ORM public API.',
    details: 'Combines the ergonomic developer velocity of an active-record builder with the transactional depth of SQLAlchemy 2.x async core.',
    snippet: 'tasks = await Task.query()\n    .where(Task.completed == False)\n    .with_("assignee")\n    .paginate(20)',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'database',
    badge: 'Zero-Config Default',
    summary: 'Zero-config default database — the app runs before you configure anything.',
    details: 'Scaffold a project with fastplace new and start developing immediately without configuring Docker or local database daemons.',
    snippet: '# .env (zero setup required)\nDATABASE_DRIVER=sqlite\nDATABASE_URL=sqlite+aiosqlite:///./database.sqlite3',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL + pgvector',
    category: 'database',
    badge: 'Production & AI DB',
    summary: 'Production database and pgvector-backed similarity search.',
    details: 'Recommended production target. Embeddings live alongside regular relational rows in one transactional ACID store.',
    snippet: 'hits = await KnowledgeBase.vector_search(\n    query_embedding,\n    limit=5\n)',
  },
  {
    id: 'redis',
    name: 'Redis & SAQ',
    category: 'runtime',
    badge: 'Queue & PubSub',
    summary: 'Queue backend for SAQ workers and broadcast event fan-out.',
    details: 'Processes background jobs with exponential retries and powers real-time WebSockets with multi-worker Redis pub/sub.',
    snippet: '# Enqueue background job from any controller\nawait Queue.push("generate_monthly_report", {"user_id": 42})',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS v4 & Vite',
    category: 'frontend',
    badge: 'Instant HMR Bundler',
    summary: 'Styling with first-class light and dark tokens, built by Vite.',
    details: 'Single CLI command fastplace run dev starts both the Python ASGI backend and Vite dev server with sub-millisecond hot reloads.',
    snippet: '# One command launches full stack\nfastplace run dev\n# -> Uvicorn on :3000 + Vite HMR connected',
  },
  {
    id: 'litellm',
    name: 'LiteLLM & Agents',
    category: 'ai',
    badge: 'Provider Agnostic AI',
    summary: 'Unified model routing for OpenAI, Anthropic, Gemini, and local LLMs.',
    details: 'Switch models with a single string configuration. Function-as-a-tool schemas are generated directly from Python docstrings.',
    snippet: '@Tool(description="Calculate tax breakdown")\nasync def calc_tax(amount: float, state: str) -> dict: ...',
  },
];

export default function IntegrationsSection() {
  const [filter, setFilter] = useState<'all' | 'runtime' | 'database' | 'frontend' | 'ai'>('all');
  const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS[0]);

  const filteredTools = filter === 'all' ? TOOLS : TOOLS.filter((t) => t.category === filter);

  return (
    <section id="integrations" className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Blocks className="w-4 h-4" />
            <span>Seamless Integration Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            Works with the tools you already run.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            No proprietary runtimes or exotic dialects. Fastplace unifies the industry's most battle-tested open-source ecosystems under one cohesive developer experience.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Integrations (9)
          </button>
          <button
            onClick={() => setFilter('runtime')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'runtime'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Runtime & Engine
          </button>
          <button
            onClick={() => setFilter('database')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'database'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Databases & ORM
          </button>
          <button
            onClick={() => setFilter('frontend')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'frontend'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Frontend & Build
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'ai'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Native AI
          </button>
        </div>

        {/* Integration Grid and Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Tool Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const isSelected = selectedTool.id === tool.id;
              return (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#ff2d20] shadow-md ring-1 ring-[#ff2d20]/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-slate-900 font-['Outfit']">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {tool.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Detail & Code Snippet */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl sticky top-24 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#ff2d20] uppercase font-bold tracking-wider">
                  {selectedTool.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-0.5">
                  {selectedTool.name}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {selectedTool.details}
            </p>

            <div className="mb-4">
              <div className="text-[11px] font-mono text-slate-500 uppercase mb-2">
                Implementation Pattern
              </div>
              <pre className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
                <code>{selectedTool.snippet}</code>
              </pre>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>First-class citizen</span>
              <span className="text-slate-900 font-medium flex items-center gap-1">
                Zero Configuration Friction <ArrowRight className="w-3.5 h-3.5 text-[#ff2d20]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
