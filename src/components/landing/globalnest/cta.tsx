"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-32 bg-gn-black text-white relative overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-gradient-to-t from-gn-blue/20 via-gn-black to-gn-black"></div>
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 to-transparent blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
                    Your Global Portfolio <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Starts Here
                    </span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of investors who are building wealth beyond borders.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gn-blue"
                    />
                    <button className="px-8 py-4 rounded-full bg-white text-gn-black font-bold hover:bg-gray-100 transition-colors flex items-center justify-center">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    No credit card required. Cancel anytime.
                </p>
            </div>
        </section>
    );
}
