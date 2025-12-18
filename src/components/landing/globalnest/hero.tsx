"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkle,
  MagnifyingGlass,
  Laptop,
  ShareNetwork,
  Users,
  SquaresFour,
  Sidebar,
  ChatCircle,
  Package,
  DotsThreeOutline,
  ChartLineUp,
  Drop,
  CirclesThree,
  Heart,
  PaperPlaneTilt,
} from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="relative z-10 pt-20 bg-background text-foreground overflow-hidden">
      {/* Background Elements - Theme Aware */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        {/* Amber radial gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-400/40 via-background to-background dark:from-brand-500/30"></div>
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 md:px-6 md:pt-16 relative z-10">
        <div className="max-w-4xl text-center mr-auto ml-auto">
          <p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <Sparkle weight="fill" className="h-4 w-4 text-brand-500" />
            New: AI-Powered Deal Analysis
          </p>
          <h1 className="sm:text-5xl md:text-7xl text-4xl font-semibold tracking-tight mb-6 leading-tight">
            Invest Globally <br />
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              Without Boundaries
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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

            {/* Secondary Button */}
            <button className="group relative inline-flex items-center justify-center min-w-[120px] cursor-pointer rounded-xl px-[17px] py-[12px] text-muted-foreground tracking-tight font-semibold transition-all duration-500 ease-out hover:-translate-y-[2px] hover:text-foreground border border-border bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm">
              <span className="relative z-10 font-normal">For Professionals</span>
              <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-80"></span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full ring-2 ring-background bg-brand-300 dark:bg-brand-600"></div>
              <div className="h-6 w-6 rounded-full ring-2 ring-background bg-brand-400 dark:bg-brand-500"></div>
              <div className="h-6 w-6 rounded-full ring-2 ring-background bg-brand-500 dark:bg-brand-400"></div>
            </div>
            <span>Trusted by modern investors of all sizes</span>
          </div>
        </div>
      </div>

      {/* Editor preview / Dashboard Mockup */}
      <div className="-mb-8 max-w-7xl md:px-6 mr-auto ml-auto pr-4 pl-4 perspective-1000">
        <div
          className="relative w-full overflow-hidden shadow-lg bg-gradient-to-b from-secondary/80 to-secondary/40 dark:from-card/80 dark:to-card/40 border border-border rounded-2xl mr-auto ml-auto shadow-2xl backdrop-blur-lg transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0"
        >
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400/80"></span>
              <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
              <div
                className="ml-3 hidden items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2 py-1 text-xs text-muted-foreground sm:flex"
              >
                <SquaresFour weight="fill" className="h-3.5 w-3.5 text-foreground" />
                GlobalNest OS — Portfolio: European Growth
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden rounded-md border border-border bg-secondary/50 p-1.5 text-muted-foreground hover:bg-secondary sm:inline-flex">
                <ShareNetwork weight="regular" className="h-4 w-4" />
              </button>
              <button className="hidden rounded-md border border-border bg-secondary/50 p-1.5 text-muted-foreground hover:bg-secondary sm:inline-flex">
                <Users weight="regular" className="h-4 w-4" />
              </button>
              <button className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-brand-950 hover:bg-brand-400">
                Deploy Funds
              </button>
            </div>
          </div>

          {/* Editor body */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
            {/* Left panel - Your Properties */}
            <aside className="hidden md:block md:col-span-3 bg-card/30 dark:bg-card/20 border-r border-border p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                  <Sidebar weight="fill" className="h-3.5 w-3.5" />
                  Your Properties
                </div>
                <button className="rounded-md border border-border bg-secondary/50 p-1 text-muted-foreground hover:bg-secondary">
                  <MagnifyingGlass weight="regular" className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 text-muted-foreground">
                {/* Property 1 - Matched (highlighted) */}
                <div className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-2 space-y-2 border border-brand-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop weight="fill" className="h-4 w-4 text-brand-500" />
                      <span className="text-xs font-medium text-foreground">Athens Apartment</span>
                    </div>
                    <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 text-[10px] text-brand-600 dark:text-brand-400">Match</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-green-600 dark:text-green-400">7.2% yield</span>
                    <span className="text-muted-foreground">€285k</span>
                  </div>
                </div>

                {/* Property 2 - Saved */}
                <div className="bg-secondary/30 rounded-lg p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package weight="regular" className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">Lisbon Studio</span>
                    </div>
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">Saved</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>5.8% yield</span>
                    <span className="text-muted-foreground">€195k</span>
                  </div>
                </div>

                {/* Property 3 - Under Review */}
                <div className="bg-secondary/30 rounded-lg p-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package weight="regular" className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">Cyprus Villa</span>
                    </div>
                    <span className="rounded-md bg-yellow-500/10 px-1.5 py-0.5 text-[10px] text-yellow-600 dark:text-yellow-400">Review</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>6.1% yield</span>
                    <span className="text-muted-foreground">€420k</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Center Panel - AI Chat Interface */}
            <main className="relative md:col-span-6 bg-card/30 dark:bg-card/20">
              {/* Chat Header */}
              <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs text-muted-foreground">
                <ChatCircle weight="fill" className="h-4 w-4 text-brand-500" />
                <span className="font-medium text-foreground">AI Assistant</span>
                <span className="rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 text-[10px]">Active</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px]">Online</span>
                  </span>
                </div>
              </div>

              <div className="p-4 h-full flex flex-col min-h-[400px]">
                {/* Chat Messages Container */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-2 text-sm text-brand-950">
                      I have $500k to invest. Looking for high yield properties in Europe.
                    </div>
                  </div>

                  {/* AI Response with Property Card */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] space-y-3">
                      <div className="rounded-2xl rounded-bl-sm bg-secondary/80 dark:bg-secondary/50 px-4 py-3 text-sm text-foreground">
                        <p className="mb-2">Based on your profile, I found a great match:</p>

                        {/* Embedded Property Card */}
                        <div className="mt-3 rounded-xl border border-border bg-card p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-brand-600 dark:text-brand-400">Athens, Greece</span>
                            <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">7.2% Yield</span>
                          </div>
                          <div className="text-base font-semibold text-foreground">Modern Apartment</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>2 Bed</span>
                            <span>85 m2</span>
                            <span>€285,000</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="flex-1 rounded-lg bg-brand-500 py-1.5 text-xs font-medium text-brand-950 hover:bg-brand-400">
                              View Details
                            </button>
                            <button className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary">
                              <Heart weight="regular" className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="mt-3 text-muted-foreground">50% LTV financing available. Would you like me to connect you with a local lawyer?</p>
                      </div>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-secondary/50 px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-secondary/30 p-2">
                  <input
                    type="text"
                    placeholder="Ask about properties, financing, legal..."
                    className="flex-1 bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    readOnly
                  />
                  <button className="rounded-lg bg-brand-500 p-2 text-brand-950 hover:bg-brand-400">
                    <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </main>

            {/* Right panel - Insights */}
            <aside className="hidden md:block md:col-span-3 border-l border-border bg-card/30 dark:bg-card/20 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                  <ChartLineUp weight="fill" className="h-3.5 w-3.5" />
                  Insights
                </div>
                <button className="rounded-md border border-border bg-secondary/50 p-1 text-muted-foreground hover:bg-secondary">
                  <DotsThreeOutline weight="fill" className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* AI Investment Score */}
                <div className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-medium">AI Investment Score</span>
                    <span className="rounded-md bg-brand-500/10 px-2 py-0.5 text-[10px] text-brand-600 dark:text-brand-400 font-semibold">87/100</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Strong match for your risk profile</p>
                </div>

                {/* Key Metrics */}
                <div className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-medium">Key Metrics</span>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">3</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <ChartLineUp weight="fill" className="h-3.5 w-3.5 text-green-500" />
                        Yield
                      </span>
                      <span className="rounded-md bg-green-500/10 px-1.5 py-0.5 text-green-600 dark:text-green-400 font-medium">7.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Drop weight="fill" className="h-3.5 w-3.5 text-sky-500" />
                        Liquidity
                      </span>
                      <span className="rounded-md bg-sky-500/10 px-1.5 py-0.5 text-sky-600 dark:text-sky-400 font-medium">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <CirclesThree weight="fill" className="h-3.5 w-3.5 text-brand-500" />
                        Risk
                      </span>
                      <span className="rounded-md bg-brand-500/10 px-1.5 py-0.5 text-brand-600 dark:text-brand-400 font-medium">Medium</span>
                    </div>
                  </div>
                </div>

                {/* Financing Status */}
                <div className="bg-secondary/50 dark:bg-secondary/30 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-medium">Financing</span>
                    <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-[10px] text-green-600 dark:text-green-400">Available</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-md border border-border bg-card/50 px-2 py-1.5 text-center">
                      <div className="text-muted-foreground text-[10px]">Max LTV</div>
                      <div className="text-foreground font-semibold">50%</div>
                    </div>
                    <div className="rounded-md border border-border bg-card/50 px-2 py-1.5 text-center">
                      <div className="text-muted-foreground text-[10px]">Rate</div>
                      <div className="text-foreground font-semibold">4.2%</div>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-brand-500 py-1.5 text-xs font-medium text-brand-950 hover:bg-brand-400">
                    Apply Now
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
