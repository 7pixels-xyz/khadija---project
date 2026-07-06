import React, { useEffect, useRef } from "react";
import Link from "next/link";

const cards = [
    { id: 1, title: "Dark Marble Island", image: "/images/new_carous_1.png" },
    { id: 2, title: "Sophisticated Lobby Space", image: "/images/new_carous_2.png" },
    { id: 3, title: "Moody Architectural Bathroom", image: "/images/process_soul.png" },
];

export default function CarouselFooter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;

        const animateCarousel = async () => {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            const ScrollTrigger = ScrollTriggerModule.default;

            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                let mm = gsap.matchMedia();

                // Only apply GSAP pinning on Desktop
                mm.add("(min-width: 768px)", () => {
                    if (scrollWrapperRef.current && containerRef.current) {
                        gsap.to(scrollWrapperRef.current, {
                            x: () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth + 100),
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top top",
                                end: () => `+=${scrollWrapperRef.current!.scrollWidth * 0.4}`, // Much faster! Complete the horizontal scroll in 40% the vertical distance
                                pin: true,
                                scrub: 1.5, // Slightly heavier scrub smoothing for premium feel
                                invalidateOnRefresh: true,
                            }
                        });
                    }
                });
            });
        };

        // Delay to ensure images load layout
        if (typeof window !== "undefined") {
            const timer = setTimeout(animateCarousel, 100);

            return () => {
                clearTimeout(timer);
                if (ctx) ctx.revert();
            };
        }
    }, []);

    return (
        <>
            <div className="relative w-full">
                <section ref={containerRef} className="h-auto min-h-[70vh] md:h-screen bg-bgLight pt-24 md:pt-32 pb-16 flex flex-col justify-center overflow-hidden">
                    <div className="px-6 md:px-8 max-w-7xl mx-auto w-full mb-8 md:mb-12 shrink-0">
                        <h3 className="font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-4 text-accent">
                            Curated Collections
                        </h3>
                        <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
                            Where Style <span className="italic font-light">Meets Function</span>.
                        </h2>
                    </div>

                    {/* On Desktop: uses GSAP x transform. On Mobile: uses native horizontal scrolling */}
                    <div className="w-full flex items-center shrink-0 overflow-x-auto md:overflow-visible pb-8 md:pb-0 hide-scrollbar px-6 md:px-0">
                        <div ref={scrollWrapperRef} className="flex gap-6 md:px-8 md:gap-8 w-max will-change-transform">
                            {cards.map((card) => (
                                <div key={card.id} className="w-[85vw] md:w-[40vw] shrink-0 h-[400px] md:h-[500px]">
                                    <div className="w-full h-full md:h-[80%] overflow-hidden rounded-2xl mb-6 relative">
                                        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity"></div>
                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover select-none pointer-events-none" />
                                    </div>
                                    <h3 className="font-display text-xl md:text-2xl font-medium mt-4">{card.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer id="contact" className="bg-bgLight pt-20 md:pt-32 pb-8 px-6 md:px-8 relative overflow-hidden flex flex-col min-h-[50vh]">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32 z-10">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">About</h4>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Studio</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Philosophy</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Careers</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Product</h4>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Collections</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Materials</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Care Guide</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Resource</h4>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Journal</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Press</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Newsletter</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Information</h4>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Contact</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">FAQ</Link>
                        <Link href="#" className="font-sans text-sm text-gray-500 hover:text-textMain transition-colors">Terms of Service</Link>
                    </div>
                </div>

                {/* Massive Masked Text */}
                <div className="w-full relative flex items-center justify-center mt-auto">
                    <h1 className="font-display text-[15vw] leading-none uppercase font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-50 w-full text-center select-none">
                        URBAN NEST
                    </h1>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs tracking-widest font-sans text-gray-400 mt-8 md:mt-16 uppercase gap-4">
                    <span>© 2026 Urban Nest</span>
                    <span>Designed for Awwwards</span>
                </div>
            </footer>
        </>
    );
}
