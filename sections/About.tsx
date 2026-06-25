import React, { useEffect, useRef } from "react";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef1 = useRef<HTMLDivElement>(null);
    const statsRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;

        const animateParallax = async () => {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Subtle floating / parallax for stats
                gsap.to(statsRef1.current, {
                    y: -80,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                gsap.to(statsRef2.current, {
                    y: -120,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }, containerRef);
        };

        animateParallax();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section id="about" ref={containerRef} className="relative w-full min-h-screen py-32 px-8 bg-bgLight flex items-center overflow-hidden">

            {/* Floating Stats Background Elements */}
            <div
                ref={statsRef1}
                className="absolute top-[30%] left-[-5%] font-display text-[15vw] font-bold text-black opacity-[0.03] whitespace-nowrap pointer-events-none will-change-transform z-0"
            >
                13+ Years Experience
            </div>

            <div
                ref={statsRef2}
                className="absolute bottom-[20%] right-[-10%] font-display text-[15vw] font-bold text-black opacity-[0.03] whitespace-nowrap pointer-events-none will-change-transform z-0"
            >
                64+ Total Project
            </div>

            {/* Bio Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-tight font-medium tracking-tight mb-12">
                    World shaped by experience, space matters more than ever.
                </h2>

                <div className="max-w-3xl mx-auto text-lg md:text-xl font-sans font-light leading-relaxed text-gray-600">
                    <p className="mb-6">
                        Founded by Khadija Burhani, Urban Nest brings passion and precision to every interior.
                        With a keen eye for detail and a love for blending aesthetics with functionality,
                        Khadija creates spaces that truly resonate with each client’s lifestyle.
                    </p>
                    <p>
                        From modern minimalism to warm, inviting interiors,
                        Urban Nest crafts environments where beauty meets purpose.
                    </p>
                </div>
            </div>
        </section>
    );
}
