"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, FileText, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function AIShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rawDocRef = useRef<HTMLDivElement>(null);
    const aiCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1,
                },
            });

            // Animate from raw doc to AI summary
            tl.to(rawDocRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 20,
                filter: "blur(10px)",
            }).fromTo(
                aiCardRef.current,
                {
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    filter: "blur(5px)",
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                },
                "<"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 bg-gn-black text-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-sm text-purple-400 mb-6">
                            <Sparkles className="w-4 h-4 mr-2" />
                            GlobalNest AI Engine
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Turn Complexity into <br />
                            <span className="text-purple-400">Clarity</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Don&apos;t get buried in 50-page foreign contracts. Our AI reads, analyzes, and summarizes
                            legal documents, market reports, and financial projections in seconds.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Instant translation and summarization",
                                "Risk highlighting and anomaly detection",
                                "Personalized ROI projections"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-gray-300">
                                    <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[500px] flex items-center justify-center">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full opacity-50"></div>

                        {/* Raw Document (Fades Out) */}
                        <div
                            ref={rawDocRef}
                            className="absolute w-[350px] bg-white text-gray-900 p-8 rounded-xl shadow-2xl rotate-[-5deg] origin-bottom-left z-0"
                            style={{ fontFamily: "serif" }}
                        >
                            <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <span className="text-xs uppercase tracking-wider text-gray-500">Contract Agreement</span>
                            </div>
                            <div className="space-y-2 opacity-50 text-[10px]">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className="h-2 bg-gray-300 rounded w-full"></div>
                                ))}
                            </div>
                        </div>

                        {/* AI Summary Card (Fades In) */}
                        <div
                            ref={aiCardRef}
                            className="absolute w-[380px] bg-gray-900/90 border border-purple-500/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl z-10 rotate-[2deg]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">AI Summary</div>
                                        <div className="text-xs text-purple-300">Generated in 1.2s</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="text-xs text-gray-400 mb-1">Key Term</div>
                                    <div className="text-sm font-medium text-white">Lease duration is 5 years with a fixed 3% annual increase.</div>
                                </div>
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <div className="text-xs text-red-300 mb-1">Risk Alert</div>
                                    <div className="text-sm font-medium text-red-200">Clause 14.b allows early termination without penalty.</div>
                                </div>
                                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <div className="text-xs text-green-300 mb-1">Projected Yield</div>
                                    <div className="text-sm font-medium text-green-200">Net 6.4% after local taxes and fees.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
