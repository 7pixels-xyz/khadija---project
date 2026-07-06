import React, { useRef, useEffect } from "react";

export default function Testimonial() {
    const quoteRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let ctx: any;
        const initAnimation = async () => {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                if (quoteRef.current) {
                    gsap.fromTo(quoteRef.current,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.5,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: quoteRef.current,
                                start: "top 80%",
                            }
                        }
                    );
                }
            });
        };

        if (typeof window !== "undefined") {
            initAnimation();
        }

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section className="w-full relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Map / Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-bgDark/80 mix-blend-multiply z-10" />
                <img
                    src="/images/new_testi_bg.png"
                    alt="Cinematic background texture"
                    className="w-full h-full object-cover scale-105 filter grayscale opacity-40 will-change-transform"
                />
            </div>

            {/* Testimonial Quote */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-16 text-center text-textLight">
                <h2 ref={quoteRef} className="font-display text-4xl md:text-5xl lg:text-7xl font-medium italic tracking-tight leading-[1.3] opacity-0">
                    "Urban Nest didn't just redesign our house. They entirely reimagined how our family interacts with space. It's nothing short of poetic."
                </h2>

                <div className="mt-16 flex flex-col items-center gap-2">
                    <span className="font-sans uppercase tracking-[0.2em] text-xs font-semibold text-accent">Elena Rostova</span>
                    <span className="font-sans text-sm font-light text-gray-400">Architectural Digest</span>
                </div>
            </div>
        </section>
    );
}
