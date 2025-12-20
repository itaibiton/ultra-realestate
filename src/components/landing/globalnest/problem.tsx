"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useLocale } from "next-intl";
import { Translate, PlugsConnected, Brain, ShieldWarning, Icon } from "@phosphor-icons/react";
import { isRTL, type Locale } from "@/i18n/routing";

// Dynamic import for 3D Globe - disable SSR for Three.js
const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse bg-secondary/50 rounded-full w-64 h-64" />
        </div>
    ),
});

interface PainPoint {
    icon: Icon;
    title: string;
    description: string;
    color: string;
    bg: string;
    borderColor: string;
}

const painPoints: PainPoint[] = [
    {
        icon: Translate,
        title: "Language Barriers",
        description: "Navigating foreign legal documents and negotiations in languages you don't speak is risky and exhausting.",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
        borderColor: "border-sky-500/20",
    },
    {
        icon: PlugsConnected,
        title: "Disconnected Providers",
        description: "Agents, lawyers, banks, and property managers don't talk to each other. You become the bottleneck.",
        color: "text-brand-500",
        bg: "bg-brand-500/10",
        borderColor: "border-brand-500/20",
    },
    {
        icon: Brain,
        title: "Zero Knowledge",
        description: "Entering a new market blindly often leads to overpaying or buying in bad locations. Data is scarce.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
    },
    {
        icon: ShieldWarning,
        title: "Trust Deficit",
        description: "Sending money across borders to people you've never met requires a leap of faith that often feels unsafe.",
        color: "text-red-500",
        bg: "bg-red-500/10",
        borderColor: "border-red-500/20",
    },
];

// Separate component for each card to properly use hooks
function StackedCard({
    point,
    index,
    totalCards,
    scrollYProgress,
    rtl,
}: {
    point: PainPoint;
    index: number;
    totalCards: number;
    scrollYProgress: MotionValue<number>;
    rtl: boolean;
}) {
    // Calculate scroll range for this card
    const start = index / totalCards;
    const end = (index + 1) / totalCards;

    // Card swipe transforms - swipe direction based on RTL
    const swipeDirection = rtl ? -200 : 200;
    const x = useTransform(scrollYProgress, [start, end], [0, swipeDirection]);
    const rotate = useTransform(scrollYProgress, [start, end], [0, rtl ? -12 : 12]);
    const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
    const scale = useTransform(scrollYProgress, [start, end], [1, 0.9]);

    // Cards underneath get slightly smaller offset for depth effect
    const yOffset = (totalCards - index - 1) * 6;

    return (
        <motion.div
            style={{
                x,
                rotate,
                opacity,
                scale,
                zIndex: totalCards - index,
                y: yOffset,
            }}
            className="absolute inset-0"
        >
            <div className={`h-full p-8 rounded-2xl bg-card border ${point.borderColor} shadow-xl`}>
                {/* Progress indicator */}
                <div className="flex gap-2 mb-6">
                    {painPoints.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                i <= index ? point.bg.replace('/10', '') : 'bg-muted'
                            }`}
                        />
                    ))}
                </div>

                <div className={`w-14 h-14 rounded-xl ${point.bg} flex items-center justify-center mb-5`}>
                    <point.icon weight="duotone" className={`w-7 h-7 ${point.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                    {point.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                    {point.description}
                </p>
            </div>
        </motion.div>
    );
}

export function Problem() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale() as Locale;
    const rtl = isRTL(locale);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Track active index for dot indicator
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const index = Math.min(
            Math.floor(progress * painPoints.length),
            painPoints.length - 1
        );
        setActiveIndex(index);
    });

    return (
        <section
            ref={sectionRef}
            className="relative h-[300vh] bg-background text-foreground"
        >
            {/* Ambient background - theme aware */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent dark:from-brand-400/10 pointer-events-none" />

            {/* Sticky container */}
            <div className="sticky top-0 h-screen">
                <div className="mx-auto max-w-7xl px-4 md:px-6 h-full flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center pb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                            Global Investing is{" "}
                            <span className="text-muted-foreground line-through decoration-yellow-500/50">
                                Broken
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                            Traditional international real estate investing is a fragmented, intimidating maze.
                            It shouldn&apos;t be valid only for the ultra-wealthy.
                        </p>
                    </div>

                    {/* Globe + Cards row */}
                    <div className={`flex items-center ${rtl ? 'flex-row-reverse' : ''}`}>
                        {/* Globe - left/right side */}
                        <div className="w-1/2 flex items-center justify-center">
                            <Globe className="w-full h-[500px]" />
                        </div>

                        {/* Stacked Cards + Indicator */}
                        <div className={`w-1/2 flex items-center gap-6 ${rtl ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                            <div className="relative w-full max-w-md h-72">
                                {painPoints.map((point, index) => (
                                    <StackedCard
                                        key={index}
                                        point={point}
                                        index={index}
                                        totalCards={painPoints.length}
                                        scrollYProgress={scrollYProgress}
                                        rtl={rtl}
                                    />
                                ))}
                            </div>

                            {/* Scroll indicator - 4 yellow dots (now next to cards) */}
                            <div className="flex flex-col gap-3">
                                {painPoints.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            i <= activeIndex
                                                ? 'bg-yellow-500 scale-110'
                                                : 'bg-muted scale-100'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
