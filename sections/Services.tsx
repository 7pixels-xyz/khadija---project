import React from "react";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

const services = [
    { title: "Interior Architecture", desc: "We redefine the foundational spaces of your home, merging structural logic with poetic flow to create rooms that breathe." },
    { title: "Bespoke Furnishing", desc: "Sourcing and crafting unique, era-defining pieces from independent artisans to match the exact tonality of your environment." },
    { title: "Lighting Curation", desc: "Painting with shadows. We believe light is the ultimate material, sculpting depth and warmth into every corner." },
    { title: "Art & Object Styling", desc: "The final layer of a room's soul. We source high-end art and artifacts that give your space a definitive, personal voice." }
];

export default function Services() {
    return (
        <section id="services" className="w-full bg-bgDark text-textLight py-32 md:py-48 px-6 md:px-16 lg:px-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between">

                {/* Left Header */}
                <div className="md:w-1/3 flex flex-col justify-between">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-8">
                            A Masterclass in Materiality.
                        </h2>
                        <p className="font-sans text-gray-400 font-light leading-relaxed max-w-sm">
                            Our studio operates beyond decoration. We offer comprehensive, end-to-end design services rooted in an obsessive dedication to craft.
                        </p>
                    </div>

                    <Link href="#contact" className="mt-12 md:mt-0 flex items-center gap-4 group w-max">
                        <span className="font-sans uppercase tracking-[0.2em] text-xs font-semibold group-hover:text-accent transition-colors">Start a Project</span>
                        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                            <MoveUpRight size={16} className="text-white group-hover:text-bgDark transition-colors" />
                        </div>
                    </Link>
                </div>

                {/* Right Grid */}
                <div className="md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                    {services.map((svc, i) => (
                        <div key={i} className="flex flex-col border-t border-white/10 pt-8 group hover:-translate-y-2 transition-transform duration-500">
                            <span className="font-sans text-accent font-light text-sm mb-4">0{i + 1}</span>
                            <h3 className="font-display text-2xl md:text-3xl font-medium mb-4 group-hover:text-accent transition-colors">{svc.title}</h3>
                            <p className="font-sans text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                {svc.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
