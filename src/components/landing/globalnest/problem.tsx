"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Languages, Unplug, BrainCircuit, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
    {
        icon: Languages,
        title: "Language Barriers",
        description: "Navigating foreign legal documents and negotiations in languages you don't speak is risky and exhausting.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        icon: Unplug,
        title: "Disconnected Providers",
        description: "Agents, lawyers, banks, and property managers don't talk to each other. You become the bottleneck.",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        icon: BrainCircuit,
        title: "Zero Knowledge",
        description: "Entering a new market blindly often leads to overpaying or buying in bad locations. Data is scarce.",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        icon: ShieldAlert,
        title: "Trust Deficit",
        description: "Sending money across borders to people you've never met requires a leap of faith that often feels unsafe.",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
];

export function Problem() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".pain-point-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-gn-black text-white relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gn-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Global Investing is <span className="text-gray-500 line-through decoration-red-500/50">Broken</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Traditional international real estate investing is a fragmented, intimidating maze.
                        It shouldn&apos;t be valid only for the ultra-wealthy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {painPoints.map((point, index) => (
                        <div
                            key={index}
                            className="pain-point-card group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <point.icon className={`w-6 h-6 ${point.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
