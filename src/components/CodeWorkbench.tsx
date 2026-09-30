import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode, Sparkles } from 'lucide-react';

interface CodeFile {
  id: string;
  filename: string;
  language: string;
  badge: string;
  description: string;
  code: string;
}

const FILES: CodeFile[] = [
  {
    id: 'routes',
    filename: 'routes/web.py',
    language: 'python',
    badge: 'Routing Edge',
    description: 'Declarative route table mapping clean URLs directly to controllers and action methods.',
    code: `# routes/web.py
from fastplace.http import Router

from app.http.controllers.docs_controller import DocsController
from app.http.controllers.dashboard_controller import DashboardController

router = Router()

# Bridge routes — render React SPA pages with server props
router.get("/", DashboardController, "index", name="home")
router.get("/docs", DocsController, "index", name="docs.index")
router.get("/docs/{version}/{slug}", DocsController, "page", name="docs.page")
router.post("/dashboard/tasks", DashboardController, "store_task", name="tasks.store")`,
  },
  {
    id: 'controller',
    filename: 'app/http/controllers/dashboard_controller.py',
    language: 'python',
    badge: 'CSR Controller',
    description: 'Thin HTTP adapter: validates request, invokes module service, returns render() with props.',
    code: `# app/http/controllers/dashboard_controller.py
from fastplace.http import render
from app.http.requests.create_task_request import CreateTaskRequest
from app.modules.projects.services.dashboard_service import DashboardService

async def index(request):
    """Render dashboard page with real-time stats and recent tasks."""
    overview = await DashboardService().overview(user=request.user)
    
    return render(
        request,
        component="Dashboard/Index",
        props=overview.model_dump(),
    )

async def store_task(request):
    """Validate payload via Pydantic v2 and create task atomically."""
    payload = CreateTaskRequest.model_validate(await request.json())
    
    task = await DashboardService().create_task(
        user_id=request.user.id,
        project_id=payload.project_id,
        title=payload.title,
        due_date=payload.due_date,
    )
    
    return render(request, component="Dashboard/Index", props={"task": task.model_dump()})`,
  },
  {
    id: 'react_page',
    filename: 'resources/js/pages/Dashboard/Index.jsx',
    language: 'javascript',
    badge: 'React 19 View',
    description: 'React SPA page: receives backend props directly via usePage().props without any fetch boiler.',
    code: `// resources/js/pages/Dashboard/Index.jsx
import React from 'react';
import { usePage, useForm } from '@fastplace/react';
import AppLayout from '@/layouts/AppLayout';

export default function DashboardIndex() {
    // Props are automatically injected from Python backend!
    const { user, recent_tasks, stats } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({ title: '' });

    return (
        <AppLayout user={user}>
            <div className="max-w-5xl mx-auto py-8 px-4">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Completed: {stats.completed_count} · Open Tasks: {stats.open_count}
                    </p>
                </header>

                <ul className="space-y-3">
                    {recent_tasks.map((task) => (
                        <li key={task.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between">
                            <span className="text-slate-200 font-medium">{task.title}</span>
                            <span className="text-xs font-mono text-emerald-400">Active</span>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}`,
  },
  {
    id: 'service',
    filename: 'app/modules/projects/services/project_service.py',
    language: 'python',
    badge: 'Atomic Business Logic',
    description: 'ACID transaction boundary across projects and billing modules without distributed sagas.',
    code: `# app/modules/projects/services/project_service.py
from fastplace.db import db
from app.modules.projects.repositories.project_repository import ProjectRepository
from app.modules.billing.services import InvoiceService # Legal cross-module service edge

class ProjectService:
    def __init__(self) -> None:
        self.projects = ProjectRepository()

    async def close_and_invoice(self, project_id: int) -> None:
        """Close project and issue its final invoice in ONE atomic transaction."""
        async with db.transaction():
            project = await self.projects.find_with_tasks(project_id)
            project.status = "completed"
            await self.projects.save(project)

            # Billing logic lives in billing; only its public API is called
            await InvoiceService().issue_for_project(project.id)
            # If invoice issuance fails, the project status rolls back automatically!`,
  },
  {
    id: 'ai_tool',
    filename: 'app/ai/tools/search_docs.py',
    language: 'python',
    badge: 'Autonomous AI Tool',
    description: 'Type hints and docstrings auto-generate JSON schemas for LLM function calling with pgvector.',
    code: `# app/ai/tools/search_docs.py
from fastplace.ai import Tool
from app.modules.knowledge.services.knowledge_service import KnowledgeService

@Tool(description="Search internal engineering documentation and architecture blueprints")
async def search_docs(query: str) -> list[str]:
    """Autonomous agent tool: calls knowledge service with vector embeddings."""
    hits = await KnowledgeService().search(query, limit=3)
    return [f"{hit.title}: {hit.content}" for hit in hits]`,
  },
];

export default function CodeWorkbench() {
  const [activeFileId, setActiveFileId] = useState<string>('routes');
  const [copied, setCopied] = useState<boolean>(false);

  const activeFile = FILES.find((f) => f.id === activeFileId) || FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="py-20 md:py-28 border-t border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
            <Code2 className="w-4 h-4" />
            <span>Interactive Code Workbench</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
            The framework, in three files.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Look at the actual code. No GraphQL client schemas, no Axios fetch wrappers, no manual CORS middleware configurations.
          </p>
        </div>

        {/* Code Showcase Container: High-Contrast Dark Editor in Crisp Frame */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* File Tabs Header */}
          <div className="flex flex-wrap items-center justify-between bg-[#090d16] px-4 py-2.5 border-b border-slate-800 gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {FILES.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#ff2d20]" />
                    <span>{file.filename}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                {activeFile.badge}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 overflow-x-auto bg-[#0a0f1d]">
            <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
              <code>{activeFile.code}</code>
            </pre>
          </div>

          {/* Description Footer */}
          <div className="bg-[#090d16] px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{activeFile.description}</span>
            </div>
            <span className="font-mono text-slate-400">
              Unified CSR Pipeline · Zero REST layer overhead
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
