import React, { useEffect, useRef } from "react";

export default function Isometric() {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: any;

        const animateIsometric = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            ctx = gsap.context(() => {
                // Continuous smooth floating animation
                gsap.fromTo(
                    imageRef.current,
                    { y: -15 },
                    {
                        y: 15,
                        duration: 3,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                    }
                );
            }, containerRef);
        };

        animateIsometric();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-8 bg-bgLight overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                <div className="flex-1">
                    <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tight leading-tight uppercase relative z-10">
                        Bringing<br />Concepts<br />To Live
                    </h2>
                </div>

                <div className="flex-1 relative">
                    <img
                        ref={imageRef}
                        src="/images/isometric_floor_1782301483922.png"
                        alt="Isometric Concept"
                        className="w-full max-w-2xl mx-auto object-contain will-change-transform mix-blend-multiply drop-shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
}
