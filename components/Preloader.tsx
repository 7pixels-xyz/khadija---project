import React, { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let ctx: any;

        const animatePreloader = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    onUpdate: function () {
                        // Update counter based on timeline progress
                        setProgress(Math.floor(this.progress() * 100));
                    },
                    onComplete: () => {
                        setIsLoaded(true);
                        setTimeout(() => {
                            gsap.to(containerRef.current, {
                                y: "-100%",
                                duration: 1.2,
                                ease: "expo.inOut",
                                onComplete: () => {
                                    if (containerRef.current) {
                                        containerRef.current.style.display = "none";
                                    }
                                    // Dispatch custom event to trigger Hero animations
                                    window.dispatchEvent(new Event("preloaderComplete"));
                                }
                            });
                        }, 500);
                    }
                });

                tl.to(fillRef.current, {
                    height: "100%",
                    duration: 2.5,
                    ease: "power2.inOut",
                });

                tl.to(
                    textRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=1"
                );
            }, containerRef);
        };

        animatePreloader();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="relative w-24 h-24 mb-8">
                {/* House Outline */}
                <Home className="absolute inset-0 w-full h-full text-gray-200" strokeWidth={1} />

                {/* House Fill Container */}
                <div className="absolute inset-0 w-full h-full flex flex-col justify-end overflow-hidden">
                    <div ref={fillRef} className="w-full h-0 bg-black flex items-end justify-center overflow-hidden">
                        <Home className="w-24 h-24 text-black fill-black" strokeWidth={1} style={{ minHeight: "96px" }} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div ref={textRef} className="opacity-0 translate-y-4">
                    <h1 className="font-display text-2xl tracking-[0.3em] font-medium text-black">
                        URBAN NEST
                    </h1>
                </div>
                <div className="mt-4 font-sans text-sm tracking-widest text-gray-500">
                    {progress}%
                </div>
            </div>
        </div>
    );
}
