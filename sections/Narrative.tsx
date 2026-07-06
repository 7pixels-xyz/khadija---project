import React, { useEffect, useRef } from "react";

export default function Narrative() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const text = "We don't just fill empty rooms. We sculpt emptiness. We capture light. We curate silence. A space should not merely exist; it should breathe with you.";

    useEffect(() => {
        let ctx: any;

        const initAnimation = async () => {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const words = textRef.current?.querySelectorAll("span");
                if (!words || words.length === 0) return;

                gsap.set(words, { opacity: 0.2, color: "#9ca3af" }); // Start as gray text

                gsap.to(words, {
                    opacity: 1,
                    color: "var(--text-main)", // Fills entirely to deep espresso
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        end: "bottom 85%",
                        scrub: 1,
                    }
                });
            }, containerRef);
        };

        if (typeof window !== "undefined") {
            initAnimation();
        }

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    const wordsArray = text.split(" ");

    return (
        <section ref={containerRef} className="w-full py-40 md:py-64 flex flex-col items-center justify-center bg-bgLight px-6 md:px-16 lg:px-32 relative overflow-hidden">
            {/* Cinematic subtle framing elements */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 w-[1px] h-32 bg-accent/30 hidden md:block" />
            <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-[1px] bg-accent/30 hidden md:block" />

            <h2 ref={textRef} className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.2] font-medium tracking-tight text-center max-w-6xl mx-auto">
                {wordsArray.map((word, index) => (
                    <span key={index} className="inline-block mr-[0.25em] will-change-transform">
                        {word}
                    </span>
                ))}
            </h2>

            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-[1px] h-32 bg-accent/30 hidden md:block" />
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-32 h-[1px] bg-accent/30 hidden md:block" />
        </section>
    );
}
