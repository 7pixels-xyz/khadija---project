import React, { useEffect, useRef } from "react";
import StripImage from "../components/StripImage";

export default function Hero() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const animateText = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            ctx = gsap.context(() => {
                const playAnimation = () => {
                    gsap.fromTo(
                        textRef.current,
                        { opacity: 0, y: 60 },
                        { opacity: 1, y: 0, duration: 2, ease: "power4.out", delay: 1.2 } // Extends delay so it waits for the slower strip reveal
                    );
                };

                window.addEventListener("preloaderComplete", playAnimation);
            });
        };

        animateText();

        return () => {
            if (ctx) ctx.revert();
            window.removeEventListener("preloaderComplete", () => { });
        };
    }, []);

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden bg-bgLight">
            {/* Strip Image Background */}
            <div className="absolute inset-0 w-full h-full">
                <StripImage src="/images/hero_premium_luxury.png" columns={12} />
            </div>

            {/* Overlay gradient to ensure text readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-8 text-center text-white">
                <div ref={textRef} className="opacity-0">
                    <h1 className="font-display text-6xl lg:text-[8rem] leading-none uppercase font-semibold tracking-[-0.02em] mix-blend-overlay opacity-90">
                        Interior Design
                    </h1>

                    <div className="flex flex-col items-center mt-8 md:mt-12 max-w-2xl mx-auto">
                        <p className="font-sans text-base md:text-lg font-light leading-relaxed tracking-wide mb-8">
                            We specialize in creating timeless interiors that blend functionality with aesthetic beauty. Whether it's a cozy home, a dynamic office, or a luxurious commercial space.
                        </p>

                        <button className="px-6 md:px-8 py-3 md:py-4 border border-white rounded-full text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-500">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
