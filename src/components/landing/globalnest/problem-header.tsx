"use client";

export function ProblemHeader() {
    return (
        <section className="py-16 px-4 bg-background text-foreground">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                    Global Investing is{" "}
                    <span className="text-muted-foreground line-through decoration-yellow-500/50">
                        Broken
                    </span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Traditional international real estate investing is a fragmented, intimidating maze.
                    It shouldn&apos;t be valid only for the ultra-wealthy.
                </p>
            </div>
        </section>
    );
}
