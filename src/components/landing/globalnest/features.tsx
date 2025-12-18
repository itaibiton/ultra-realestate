"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Globe2, Landmark, Users, Lock, LineChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Bot,
        title: "AI Onboarding",
        desc: "Personalized strategy tailored to your financial DNA.",
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        icon: Globe2,
        title: "Global Marketplace",
        desc: "Vetted properties in high-growth regions.",
        colSpan: "col-span-1",
    },
    {
        icon: Landmark,
        title: "Financing Hub",
        desc: "Connect with cross-border lenders instantly.",
        colSpan: "col-span-1",
    },
    {
        icon: Users,
        title: "Pro Network",
        desc: "Vetted lawyers, agents, and tax pros.",
        colSpan: "col-span-1",
    },
    {
        icon: Lock,
        title: "Secure Deal Room",
        desc: "Bank-grade encryption for all your documents.",
        colSpan: "col-span-1 md:col-span-2",
    },
    {
        icon: LineChart,
        title: "Portfolio Tracker",
        desc: "Real-time performance metrics and yield tracking.",
        colSpan: "col-span-1 md:col-span-3", // Full width bottom
    },
];

export function Features() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-gn-black text-white relative">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything You Need to <br />
                        <span className="text-gn-blue">Scale Globally</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card group relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${feature.colSpan}`}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                <feature.icon className="w-24 h-24 text-white/5 group-hover:text-gn-blue/20" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-end">
                                <div className="w-12 h-12 rounded-full bg-gn-blue/10 flex items-center justify-center mb-4 text-gn-blue group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-gn-blue/0 via-gn-blue/0 to-gn-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
