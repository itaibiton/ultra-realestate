"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Laptop,
  Share2,
  Users,
  LayoutPanelLeft,
  PanelLeft,
  Layers,
  Image as ImageIcon,
  Grid,
  CreditCard,
  MessageSquare,
  Package,
  MonitorSmartphone,
  Undo2,
  Redo2,
  SlidersHorizontal,
  MoreHorizontal,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  Droplet,
  Sun,
  Blend,
  Wand2,
  Move,
  Smartphone
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative z-10 pt-20 bg-gn-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gn-blue/40 via-gn-black to-gn-black"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 md:px-6 md:pt-16 relative z-10">
        <div className="max-w-4xl text-center mr-auto ml-auto">
          <p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            New: AI-Powered Deal Analysis
          </p>
          <h1 className="sm:text-5xl md:text-7xl text-4xl font-semibold tracking-tight mb-6 leading-tight">
            Invest Globally <br />
            <span className="bg-gradient-to-r from-gn-blue via-blue-400 to-teal-300 bg-clip-text text-transparent">
              Without Boundaries
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            The first AI-powered operating system for international real estate.
            Unify search, financing, legal, and management in one seamless platform.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row mt-8 items-center justify-center">
            {/* Primary 'Shiny' Button */}
            <Link href="/signup">
              <button type="button" className="hero-shiny-button">
                <div className="points-wrapper">
                  <i className="point" style={{ left: '10%', animationDuration: '2.35s', animationDelay: '0.2s' }}></i>
                  <i className="point" style={{ left: '30%', opacity: 0.7, animationDuration: '2.5s', animationDelay: '0.5s' }}></i>
                  <i className="point" style={{ left: '25%', opacity: 0.8, animationDuration: '2.2s', animationDelay: '0.1s' }}></i>
                  <i className="point" style={{ left: '44%', opacity: 0.6, animationDuration: '2.05s' }}></i>
                  <i className="point" style={{ left: '50%', opacity: 1, animationDuration: '1.9s' }}></i>
                  <i className="point" style={{ left: '75%', opacity: 0.5, animationDuration: '1.5s', animationDelay: '1.5s' }}></i>
                  <i className="point" style={{ left: '88%', opacity: 0.9, animationDuration: '2.2s', animationDelay: '0.2s' }}></i>
                  <i className="point" style={{ left: '58%', opacity: 0.8, animationDuration: '2.25s', animationDelay: '0.2s' }}></i>
                  <i className="point" style={{ left: '98%', opacity: 0.6, animationDuration: '2.6s', animationDelay: '0.1s' }}></i>
                  <i className="point" style={{ left: '65%', opacity: 1, animationDuration: '2.5s', animationDelay: '0.2s' }}></i>
                </div>

                <span className="inner">
                  Start Your Journey
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </Link>

            {/* Secondary 'Watch Demo' Button */}
            <button className="group relative inline-flex items-center justify-center min-w-[120px] cursor-pointer rounded-xl px-[17px] py-[12px] text-white/70 tracking-tight font-semibold transition-all duration-[1000ms] ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:-translate-y-[3px] hover:scale-[1.1] hover:text-white" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', background: 'radial-gradient(ellipse at bottom,rgba(71,81,92,1) 0%,rgba(0,0,0,1) 100%)' }}>
              <span className="relative z-10 font-normal">For Professionals</span>
              <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 opacity-20 transition-all duration-[1000ms] ease-[cubic-bezier(0.15,0.83,0.66,1)] group-hover:opacity-80" style={{ background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 100%)' }}></span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-400">
            <div className="flex -space-x-2">
              {/* Using placeholder colors for avatars if URLs fail, but preserving structure */}
              <div className="h-6 w-6 rounded-full ring-2 ring-black/60 bg-gray-600"></div>
              <div className="h-6 w-6 rounded-full ring-2 ring-black/60 bg-gray-500"></div>
              <div className="h-6 w-6 rounded-full ring-2 ring-black/60 bg-gray-400"></div>
            </div>
            <span className="">Trusted by modern investors of all sizes</span>
          </div>
        </div>
      </div>

      {/* Editor preview / Dashboard Mockup */}
      <div className="-mb-8 max-w-7xl md:px-6 mr-auto ml-auto pr-4 pl-4 perspective-1000">
        <div
          className="relative w-full overflow-hidden shadow-black/50 bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl mr-auto ml-auto shadow-2xl backdrop-blur-lg transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0"
        >
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400/80"></span>
              <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
              <div
                className="ml-3 hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 sm:flex"
              >
                <LayoutPanelLeft className="h-3.5 w-3.5 text-slate-200" />
                GlobalNest OS — Portfolio: European Growth
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-200 hover:bg-white/10 sm:inline-flex">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="hidden rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-200 hover:bg-white/10 sm:inline-flex">
                <Users className="h-4 w-4" />
              </button>
              <button className="rounded-md bg-sky-500/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500">
                Deploy Funds
              </button>
            </div>
          </div>

          {/* Editor body */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
            {/* Left panel */}
            <aside className="hidden md:block md:col-span-3 bg-black/30 border-white/10 border-r pt-3 pr-3 pb-3 pl-3">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300"
                >
                  <PanelLeft className="h-3.5 w-3.5" />
                  Properties
                </div>
                <button className="rounded-md border border-white/10 bg-white/5 p-1 text-slate-300 hover:bg-white/10">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="bg-white/5 rounded-lg pt-2 pr-2 pb-2 pl-2 space-y-3">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4 text-sky-400" />
                      <span className="text-xs font-medium">Lisbon Penthouse</span>
                    </div>
                    <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">Active</span>
                  </div>
                  <ul className="space-y-1 pl-6 text-xs">
                    <li className="flex items-center gap-2 rounded-md bg-sky-500/10 px-2 py-1 text-white">
                      <Layers className="h-3.5 w-3.5 text-sky-400" />
                      Valuation
                    </li>
                    <li className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5">
                      <ImageIcon className="h-3.5 w-3.5 text-purple-400" />
                      Legal Docs
                    </li>
                    <li className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5">
                      <Grid className="h-3.5 w-3.5 text-emerald-400" />
                      Yield: 6.4%
                    </li>
                    <li className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5">
                      <CreditCard className="h-3.5 w-3.5 text-amber-400" />
                      Tax Report
                    </li>
                    <li className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5">
                      <MessageSquare className="h-3.5 w-3.5 text-pink-400" />
                      Tenant Chat
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg pt-2 pr-2 pb-2 pl-2 space-y-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Package className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-medium">Assets</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-video overflow-hidden rounded-md bg-white/5">
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-md bg-white/5">
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-md bg-white/5">
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Canvas */}
            <main className="relative md:col-span-6 bg-black/20">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-slate-300">
                <MonitorSmartphone className="h-4 w-4 text-sky-400" />
                <span>Format</span>
                <span className="rounded-md bg-white/5 px-1.5 py-0.5">Report</span>
                <span className="text-slate-500">|</span>
                <span>PDF</span>
                <div className="ml-auto flex items-center gap-1">
                  <button className="rounded-md border border-white/10 bg-white/5 p-1 hover:bg-white/10">
                    <Undo2 className="h-4 w-4" />
                  </button>
                  <button className="rounded-md border border-white/10 bg-white/5 p-1 hover:bg-white/10">
                    <Redo2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="sm:p-6 pt-4 pr-4 pb-4 pl-4 h-full relative">
                {/* Main Content Area - The "Canvas" */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ring-1 ring-white/10 h-full min-h-[400px]">
                  {/* Placeholder for the real estate main view - Gradient abstract for now */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-black"></div>
                  <div className="absolute top-0 right-0 p-20 opacity-30">
                    <div className="w-64 h-64 bg-gn-blue/30 rounded-full blur-3xl"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="max-w-xl rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur">
                      <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">Market Analysis</h3>
                      <p className="mt-1 text-sm text-slate-300">
                        Real-time data from 50+ global markets. Analyze trends, yields, and risk factors instantly.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/90">
                          <Wand2 className="h-4 w-4" />
                          AI Summary
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10">
                          <Move className="h-4 w-4" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini device preview */}
                <div
                  className="pointer-events-none absolute -bottom-6 right-4 hidden w-64 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur lg:block"
                >
                  <div className="rounded-lg border border-white/10 bg-black/50 p-2">
                    <div className="aspect-[9/16] overflow-hidden rounded-md bg-gray-800">
                      {/* Mobile Preview Placeholder */}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Smartphone className="h-3 w-3" /> Mobile App
                      </span>
                      <span className="rounded bg-white/5 px-1 py-0.5">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Right panel */}
            <aside className="hidden md:block md:col-span-3 border-l border-white/10 bg-black/30 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Parameters
                </div>
                <button className="rounded-md border border-white/10 bg-white/5 p-1 text-slate-300 hover:bg-white/10">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg pt-3 pr-3 pb-3 pl-3 space-y-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Sort By</span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">Yield</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <button className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300 hover:bg-white/10 flex items-center justify-center">
                      <AlignStartVertical className="h-3.5 w-3.5 mr-1" /> High
                    </button>
                    <button className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300 hover:bg-white/10 flex items-center justify-center">
                      <AlignCenterVertical className="h-3.5 w-3.5 mr-1" /> Med
                    </button>
                    <button className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-slate-300 hover:bg-white/10 flex items-center justify-center">
                      <AlignEndVertical className="h-3.5 w-3.5 mr-1" /> Low
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg pt-3 pr-3 pb-3 pl-3 space-y-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Risk Tolerence</span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">Med</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div
                      className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-slate-300 font-medium text-center"
                    >
                      Cap: 12%</div>
                    <div
                      className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-slate-300 font-medium text-center"
                    >
                      LTV: 60%</div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg pt-3 pr-3 pb-3 pl-3 space-y-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Indicators</span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">3</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <Droplet className="w-[14px] h-[14px] text-sky-400" />
                        Liquidity
                      </span>
                      <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-400">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <Sun className="h-3.5 w-3.5 text-amber-400" />
                        Growth
                      </span>
                      <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-400">+5.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <Blend className="h-3.5 w-3.5 text-purple-400" />
                        Volatility
                      </span>
                      <span className="rounded bg-white/5 px-1.5 py-0.5 text-slate-400">Stable</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
