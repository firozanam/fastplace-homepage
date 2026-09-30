import React, { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, Building2, Server, Award, CheckCircle2, Pause, Play } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  companyType: string;
  avatar: string;
  highlightMetric: string;
  metricLabel: string;
  quote: string;
  architecturalGain: string;
  stackReplaced: string;
  tags: string[];
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'fintech',
    author: 'Marcus Vance',
    role: 'VP of Engineering',
    company: 'Strata Financial Core',
    companyType: 'Series C Fintech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    highlightMetric: '99.999%',
    metricLabel: 'Transaction Uptime at 48M req/mo',
    quote:
      'We replaced a tangled mesh of 14 microservices with Fastplace’s modular monolith. Having database transactions span our Project and Billing modules atomically via `async with db.transaction()` completely eliminated the reconciliation headaches and phantom balance bugs we fought for two years.',
    architecturalGain: 'ACID In-Process Transactions & Zero Network Hop Latency',
    stackReplaced: 'Node.js Microservices + Next.js + Kafka Outbox',
    tags: ['Financial Reliability', 'Modular Monolith', 'Zero Downtime'],
  },
  {
    id: 'health',
    author: 'Dr. Elena Rostova',
    role: 'Principal Systems Architect',
    company: 'AetherHealth Clinical',
    companyType: 'Enterprise Healthtech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    highlightMetric: '<38ms',
    metricLabel: 'P95 Patient Query Latency',
    quote:
      'In clinical software, tenant data leakage is a regulatory non-starter. Fastplace’s `fastplace-tenancy` package enforced PostgreSQL Row-Level Security and scoped every query automatically. Our security audits passed with zero findings, and our frontend team shipped the portal in four sprints.',
    architecturalGain: 'Defense-in-Depth Multi-Tenancy & HIPAA-Grade Isolation',
    stackReplaced: 'Django DRF + Redux + Manual Scoping Rules',
    tags: ['Enterprise Security', 'Postgres RLS', 'Compliance'],
  },
  {
    id: 'ai-scale',
    author: 'Kaelen Thorne',
    role: 'Head of AI Infrastructure',
    company: 'Synthetix Dynamics',
    companyType: 'Autonomous AI Platform',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    highlightMetric: '2.4M',
    metricLabel: 'Daily Autonomous Tool Executions',
    quote:
      'The `@Tool` decorator and native pgvector integration are masterclasses in developer ergonomics. Our agents execute complex Python services directly with Pydantic validation, and the SSE token streams feed right into `@fastplace/ai-react` hooks on the browser without custom WebSocket glue.',
    architecturalGain: 'Native Function Calling Schemas & Operational pgvector',
    stackReplaced: 'FastAPI + LangChain + External Pinecone DB',
    tags: ['AI Native', 'pgvector', 'SSE Streaming'],
  },
  {
    id: 'saas-scale',
    author: 'Siddharth Rao',
    role: 'Staff Infrastructure Engineer',
    company: 'OmniFlow Logistics',
    companyType: 'Enterprise Supply Chain',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    highlightMetric: '-65%',
    metricLabel: 'Infrastructure Cloud Spend',
    quote:
      'We consolidated 6 Kubernetes deployments into single-container Fastplace units running on Uvicorn workers with built Vite assets. Our cold starts disappeared, memory consumption dropped by over half, and new developers commit features on their first afternoon using SQLite.',
    architecturalGain: 'Single Deployable Unit & Zero-Config SQLite Dev Loop',
    stackReplaced: 'Kubernetes Cluster Fleet + Next.js SSR Sidecars',
    tags: ['DevOps Efficiency', 'Cost Reduction', 'Single Container'],
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<number | null>(null);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isAutoplay) {
      timerRef.current = window.setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, currentIndex]);

  return (
    <section id="testimonials" className="py-20 md:py-28 border-t border-slate-200 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff2d20] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Battle-Tested in Mission-Critical Production</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-4">
              Proven reliability where failure is not an option.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Engineering leaders trust Fastplace to eliminate distributed systems complexity while maintaining strict enterprise compliance, low latency, and zero-defect deployments.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer"
              title={isAutoplay ? 'Pause auto-slide' : 'Resume auto-slide'}
              aria-label={isAutoplay ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
              title="Previous testimonial"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
              title="Next testimonial"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Card Presentation */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Metric & Author Card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {current.companyType}
                  </span>
                </div>

                {/* Big Metric Display */}
                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tracking-tight font-['Outfit']">
                    {current.highlightMetric}
                  </div>
                  <div className="text-xs font-semibold text-[#ff2d20] mt-1 font-mono uppercase tracking-wider">
                    {current.metricLabel}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Architectural Win:</span>
                    <span className="text-slate-900 font-medium">{current.architecturalGain}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Replaced Stack:</span>
                    <span className="text-slate-500 line-through decoration-red-400">{current.stackReplaced}</span>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-200">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-11 h-11 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {current.author}
                  </h4>
                  <p className="text-xs text-slate-500">{current.role}</p>
                  <p className="text-xs font-semibold text-[#ff2d20]">{current.company}</p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Testimonial Statement */}
            <div className="lg:col-span-8 flex flex-col justify-between py-2 sm:px-4">
              <div className="mb-8">
                <Quote className="w-10 h-10 text-red-200 mb-4" />
                <p className="text-lg sm:text-2xl font-normal text-slate-800 leading-relaxed font-['Plus_Jakarta_Sans'] mb-8">
                  "{current.quote}"
                </p>

                {/* Badges / Tags */}
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Slide Dots and Indicator */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'w-8 bg-[#ff2d20]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="text-xs font-mono text-slate-500">
                  Case Study {currentIndex + 1} of {TESTIMONIALS.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Logos / Badges Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Trusted by high-concurrency production platforms
            </span>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-xs font-semibold text-slate-800 font-mono">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#ff2d20]" /> STRATA FINANCIAL
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-blue-600" /> AETHER HEALTH
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" /> SYNTHETIX AI
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> OMNIFLOW LOGISTICS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
