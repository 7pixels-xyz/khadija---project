import React, { useEffect, useRef } from "react";

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        let ctx: any;

        const animatePortfolio = async () => {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                imagesRef.current.forEach((img) => {
                    gsap.fromTo(
                        img,
                        { scale: 1.2 },
                        {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: img.parentElement,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });
            }, sectionRef);
        };

        animatePortfolio();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section id="portfolio" ref={sectionRef} className="py-32 px-8 bg-bgLight">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-16 text-center">
                    Where Style Meets Function
                </h2>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Item 1 */}
                    <div className="md:col-span-8 group overflow-hidden bg-gray-200 aspect-[16/9] relative rounded-lg">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                ref={(el) => { if (el) imagesRef.current[0] = el; }}
                                src="/images/portfolio_restaurant_1782301401460.png"
                                alt="Restaurant"
                                className="w-full h-full object-cover will-change-transform"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-white font-display text-3xl font-medium tracking-wide">Restaurant</h3>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="md:col-span-4 group overflow-hidden bg-gray-200 aspect-square relative rounded-lg">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                ref={(el) => { if (el) imagesRef.current[1] = el; }}
                                src="/images/portfolio_public_1782301417524.png"
                                alt="Public Space"
                                className="w-full h-full object-cover will-change-transform"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-white font-display text-3xl font-medium tracking-wide">Public Space</h3>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
