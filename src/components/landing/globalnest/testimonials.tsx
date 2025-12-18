"use client";

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "GlobalNest made buying my first apartment in Lisbon easier than buying a car back home. The AI analysis was spot on.",
        author: "Sarah J.",
        role: "Tech Investor, USA",
        avatar: "S",
    },
    {
        quote: "Finally, a platform that understands what professional investors need. The deal room workflow saved me dozens of hours.",
        author: "Michael C.",
        role: "Portfolio Manager, UK",
        avatar: "M",
    },
    {
        quote: "I was hesitant about international investing due to the legal complexity. GlobalNest's verified partners bridged that trust gap.",
        author: "Elena R.",
        role: "Architect, Spain",
        avatar: "E",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-gn-black text-white border-t border-white/5">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Trusted by Global Investors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex gap-1 mb-4 text-yellow-400">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gn-blue to-purple-500 flex items-center justify-center font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold">{t.author}</div>
                                    <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
