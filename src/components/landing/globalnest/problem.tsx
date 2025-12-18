"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Translate, PlugsConnected, Brain, ShieldWarning } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import for 3D Globe - disable SSR for Three.js
const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="animate-pulse bg-secondary/50 rounded-full w-64 h-64" />
        </div>
    ),
});

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


export function Problem() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Globe container animation - scroll-linked fade in
            gsap.from(".globe-container", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 0.5,
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
            });

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
                <div className="max-w-4xl mx-auto">
                    {/* Title above globe - centered */}
                    <div className="problem-header text-center mb-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                            Global Investing is{" "}
                            <span className="text-muted-foreground line-through decoration-yellow-500/50">
                                Broken
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                            Traditional international real estate investing is a fragmented, intimidating maze.
                            It shouldn&apos;t be valid only for the ultra-wealthy.
                        </p>
                    </div>

                    {/* 3D Globe - centered below title */}
                    <div className="globe-container flex justify-center mb-16">
                        <Globe className="w-full max-w-2xl h-[350px] md:h-[450px] lg:h-[500px]" />
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
