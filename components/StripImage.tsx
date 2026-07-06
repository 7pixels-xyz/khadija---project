import React, { useEffect, useRef } from "react";

interface StripImageProps {
    src: string;
    columns?: number;
    className?: string;
    triggerEvent?: string;
}

export default function StripImage({
    src,
    columns = 12,
    className = "",
    triggerEvent = "preloaderComplete",
}: StripImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const stripsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        let ctx: any;

        const animateStrips = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            ctx = gsap.context(() => {
                // Initial state
                gsap.set(stripsRef.current, { scaleY: 0, transformOrigin: "bottom" });

                const playAnimation = () => {
                    gsap.to(stripsRef.current, {
                        scaleY: 1,
                        stagger: 0.08,
                        duration: 2.2, // Premium slow majestic reveal
                        ease: "expo.inOut",
                    });
                };

                // If no trigger event is needed, play immediately
                if (!triggerEvent) {
                    playAnimation();
                } else {
                    window.addEventListener(triggerEvent, playAnimation);
                }
            }, containerRef);
        };

        animateStrips();

        return () => {
            if (ctx) ctx.revert();
            if (triggerEvent) {
                window.removeEventListener(triggerEvent, () => { });
            }
        };
    }, [triggerEvent]);

    // Create array of strips
    const stripWidth = 100 / columns;

    return (
        <div ref={containerRef} className={`relative flex w-full h-full overflow-hidden ${className}`}>
            {Array.from({ length: columns }).map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) stripsRef.current[index] = el;
                    }}
                    className="h-full relative will-change-transform bg-transparent"
                    style={{
                        width: `${stripWidth}%`,
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${columns * 100}% 100%`,
                        backgroundPosition: `${(index / (columns - 1)) * 100}% 50%`,
                        backgroundRepeat: "no-repeat",
                    }}
                />
            ))}
        </div>
    );
}
