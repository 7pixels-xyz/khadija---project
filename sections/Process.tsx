import React, { useEffect, useState, useRef } from "react";

const steps = [
    {
        num: "01",
        title: "The Canvas",
        description: "Every great masterpiece begins with understanding the raw constraints of the architecture. We strip away the unnecessary noise to respect the structural bones.",
        image: "/images/process_canvas.png"
    },
    {
        num: "02",
        title: "The Form",
        description: "Meaning resides in tactile interaction. We weave organic materials, dense woods, and sharp metals together to create a kinetic, physical weight.",
        image: "/images/process_form.png"
    },
    {
        num: "03",
        title: "The Soul",
        description: "A room without lighting is just a void. Through delicate curation of light and shadow, the layout breathes and finalizes its atmosphere.",
        image: "/images/process_soul.png"
    },
];

export default function Process() {
    const [activeIndex, setActiveIndex] = useState(0);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute("data-index"));
                        setActiveIndex(idx);
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px" } // Triggers crossfade exactly when the text hits the middle of the screen
        );

        textRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full bg-bgLight text-textMain relative border-t border-black/[0.05]">
            <div className="flex flex-col md:flex-row w-full h-full relative">

                {/* Left Native CSS Sticky Image Column (Desktop) */}
                <div className="hidden md:block w-1/2 h-screen sticky top-0 overflow-hidden flex-shrink-0 bg-transparent">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
                        >
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover filter grayscale"
                            />
                            {/* Cinematic shadow overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bgDark/40 to-transparent mix-blend-multiply" />
                            <div className="absolute inset-0 bg-bgDark/20 mix-blend-multiply" />
                        </div>
                    ))}
                </div>

                {/* Right Scrolling Content */}
                <div className="w-full md:w-1/2 flex flex-col pt-24 pb-32 md:py-0 px-6 md:px-16 lg:px-24">
                    <div className="md:min-h-screen flex flex-col justify-center mb-16 md:mb-0 shrink-0 border-b border-black/10 md:border-none">
                        <h3 className="font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-8 text-accent">
                            Our Philosophy
                        </h3>
                        <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tighter leading-[1.1] max-w-lg mb-8">
                            Spaces designed to breathe.
                        </h2>
                        <p className="font-sans text-gray-400 font-light text-lg mb-16">
                            Scroll to explore our sequential approach to architectural mastery.
                        </p>
                    </div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            data-index={index}
                            ref={(el) => { if (el) textRefs.current[index] = el; }}
                            className="md:min-h-screen flex flex-col justify-center pb-24 md:pb-0 relative"
                        >
                            {/* Mobile Inline Image (Hidden on Desktop) */}
                            <img src={step.image} alt={step.title} className="w-full h-[400px] object-cover mb-8 md:hidden grayscale" />

                            <h4 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-8 text-textMain relative z-10 flex items-center gap-6">
                                <span className="font-display text-2xl text-accent font-light tabular-nums shrink-0">
                                    {step.num}
                                </span>
                                {step.title}
                            </h4>
                            <p className="font-sans text-lg md:text-2xl font-light text-gray-500 leading-relaxed max-w-md relative z-10">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
