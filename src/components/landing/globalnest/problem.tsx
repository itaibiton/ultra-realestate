"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Translate, PlugsConnected, Brain, ShieldWarning } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
    {
        icon: Translate,
        title: "Language Barriers",
        description: "Navigating foreign legal documents and negotiations in languages you don't speak is risky and exhausting.",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
    },
    {
        icon: PlugsConnected,
        title: "Disconnected Providers",
        description: "Agents, lawyers, banks, and property managers don't talk to each other. You become the bottleneck.",
        color: "text-brand-500",
        bg: "bg-brand-500/10",
    },
    {
        icon: Brain,
        title: "Zero Knowledge",
        description: "Entering a new market blindly often leads to overpaying or buying in bad locations. Data is scarce.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: ShieldWarning,
        title: "Trust Deficit",
        description: "Sending money across borders to people you've never met requires a leap of faith that often feels unsafe.",
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
];

// Globe SVG Illustration with animated connection points
function GlobeIllustration() {
    return (
        <svg
            viewBox="0 0 400 400"
            className="globe-svg w-full max-w-sm mx-auto"
            fill="none"
        >
            {/* Globe outline */}
            <circle
                cx="200"
                cy="200"
                r="150"
                className="stroke-muted-foreground/30"
                strokeWidth="1.5"
                fill="none"
            />

            {/* Latitude lines (horizontal curves) */}
            <ellipse
                cx="200"
                cy="140"
                rx="130"
                ry="30"
                className="stroke-border/20"
                strokeWidth="1"
                fill="none"
            />
            <ellipse
                cx="200"
                cy="200"
                rx="150"
                ry="40"
                className="stroke-border/20"
                strokeWidth="1"
                fill="none"
            />
            <ellipse
                cx="200"
                cy="260"
                rx="130"
                ry="30"
                className="stroke-border/20"
                strokeWidth="1"
                fill="none"
            />

            {/* Longitude line (vertical curve) */}
            <ellipse
                cx="200"
                cy="200"
                rx="40"
                ry="150"
                className="stroke-border/20"
                strokeWidth="1"
                fill="none"
            />

            {/* Connection arcs */}
            <path
                d="M 120 130 Q 160 90 220 110"
                className="globe-arc stroke-brand-500"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 220 110 Q 300 130 310 180"
                className="globe-arc stroke-brand-500"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 310 180 Q 320 260 280 300"
                className="globe-arc stroke-brand-500"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 120 130 Q 100 200 130 280"
                className="globe-arc stroke-brand-500"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Connection points (markets) */}
            {/* North America */}
            <circle cx="120" cy="130" r="8" className="globe-point fill-brand-500" />
            <circle cx="120" cy="130" r="12" className="globe-point fill-brand-500/30" />

            {/* Europe */}
            <circle cx="220" cy="110" r="8" className="globe-point fill-brand-500" />
            <circle cx="220" cy="110" r="12" className="globe-point fill-brand-500/30" />

            {/* Asia */}
            <circle cx="310" cy="180" r="8" className="globe-point fill-brand-500" />
            <circle cx="310" cy="180" r="12" className="globe-point fill-brand-500/30" />

            {/* Australia */}
            <circle cx="280" cy="300" r="8" className="globe-point fill-brand-500" />
            <circle cx="280" cy="300" r="12" className="globe-point fill-brand-500/30" />

            {/* South America */}
            <circle cx="130" cy="280" r="8" className="globe-point fill-brand-500" />
            <circle cx="130" cy="280" r="12" className="globe-point fill-brand-500/30" />
        </svg>
    );
}

export function Problem() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Globe animation - scroll-linked, completes when centered
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 0.5,
                },
            });

            // 1. Globe fades in and scales up
            tl.from(".globe-svg", {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
            });

            // 2. Connection points appear
            tl.from(".globe-point", {
                opacity: 0,
                scale: 0,
                stagger: 0.05,
                duration: 0.3,
            }, "-=0.2");

            // 3. Arc paths draw
            const arcs = document.querySelectorAll(".globe-arc");
            arcs.forEach((arc) => {
                const path = arc as SVGPathElement;
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            });

            tl.to(".globe-arc", {
                strokeDashoffset: 0,
                stagger: 0.1,
                duration: 0.4,
            }, "-=0.2");

            // Header text animation
            gsap.from(".problem-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            });

            // Pain point cards - animate after globe
            gsap.from(".pain-point-card", {
                scrollTrigger: {
                    trigger: ".pain-points-grid",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-background text-foreground relative overflow-hidden">
            {/* Ambient background - theme aware */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent dark:from-brand-400/10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Centered content wrapper */}
                <div className="max-w-5xl mx-auto">
                    {/* Header + Globe side by side on desktop, stacked on mobile */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Text content - left side */}
                        <div className="problem-header text-center lg:text-start order-2 lg:order-1">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                                Global Investing is{" "}
                                <span className="text-muted-foreground line-through decoration-red-500/50 decoration-2">
                                    Broken
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Traditional international real estate investing is a fragmented, intimidating maze.
                                It shouldn&apos;t be valid only for the ultra-wealthy.
                            </p>
                        </div>

                        {/* Globe illustration - right side */}
                        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                            <GlobeIllustration />
                        </div>
                    </div>

                    {/* Pain points grid */}
                    <div className="pain-points-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {painPoints.map((point, index) => (
                            <div
                                key={index}
                                className="pain-point-card group p-6 rounded-2xl bg-secondary/50 dark:bg-secondary/30 border border-border hover:border-brand-500/30 hover:bg-secondary transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <point.icon weight="duotone" className={`w-6 h-6 ${point.color}`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-foreground">{point.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
