"use client";

import React from "react";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Explorer",
        price: "Free",
        desc: "For researching markets and learning the ropes.",
        features: ["Global Market Search", "Basic AI Insights", "Community Access"],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Pro",
        price: "$49",
        period: "/mo",
        desc: "For serious investors ready to make moves.",
        features: ["Unlimited AI Strategy Sessions", "Verified Deal Flow", "Legal Document Analysis", "Priority Support"],
        cta: "Get Pro",
        popular: true,
    },
    {
        name: "Partner",
        price: "Custom",
        desc: "For funds and family offices.",
        features: ["API Access", "White-glove Service", "Custom Dedications", "Portfolio Management"],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="py-24 bg-gn-black text-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Simple, Transparent Pricing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 ${plan.popular
                                    ? "bg-white/10 border-gn-blue shadow-2xl scale-105 z-10"
                                    : "bg-white/5 border-white/5 hover:border-white/10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gn-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                            </div>
                            <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f, index) => (
                                    <li key={index} className="flex items-center text-sm">
                                        <Check className={`w-4 h-4 mr-3 ${plan.popular ? "text-gn-blue" : "text-gray-500"}`} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? "bg-gn-blue hover:bg-blue-600 text-white"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
