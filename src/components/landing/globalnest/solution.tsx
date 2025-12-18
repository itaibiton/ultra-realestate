"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Target, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        icon: MessageSquare,
        title: "AI Strategy Session",
        desc: "Chat with our AI to define your goals, risk tolerance, and dream markets.",
        color: "text-purple-400",
        gradient: "from-purple-500/20 to-blue-500/20",
    },
    {
        icon: Target,
        title: "Perfect Match",
        desc: "Our engine scans global markets to find high-yield properties that fit you perfectly.",
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-teal-500/20",
    },
    {
        icon: Briefcase,
        title: "Deal Room",
        desc: "Access a secure vault where financing, legal, and closing happen automatically.",
        color: "text-teal-400",
        gradient: "from-teal-500/20 to-green-500/20",
    },
];

export function Solution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line drawing animation
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(lineRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    },
                    strokeDashoffset: 0,
                    ease: "none",
                });
            }

            // Steps fading in
            gsap.from(".solution-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-gn-black text-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        The <span className="bg-gradient-to-r from-gn-blue to-teal-400 bg-clip-text text-transparent">Seamless</span> Journey
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From your first question to your first rental income, we unify every step.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-full -z-10">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path
                                ref={lineRef}
                                d="M 200 60 Q 500 60 700 60 T 1200 60"
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                            />
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <div key={index} className="solution-card relative flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} border border-white/10 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm z-10`}>
                                    <step.icon className={`w-10 h-10 ${step.color}`} />
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 w-full hover:bg-white/10 transition-colors duration-300">
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
