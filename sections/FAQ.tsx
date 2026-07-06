import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer comprehensive interior design services including concept development, space planning, 3D architectural visualization, custom furniture sourcing, and full project management from conception to completion."
    },
    {
        question: "Can I purchase individual products without hiring design services?",
        answer: "Yes, you can. We have a dedicated product catalog featuring curated pieces such as our 129 Sofa and 219 Lamp collections, available for direct purchase through our studio."
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary widely based on scope and complexity. A single room redesign might take 4-6 weeks, while a full commercial build-out can take upwards of 6 months. We provide detailed timelines during the consultation phase."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-32 px-6 md:px-8 bg-bgLight">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
                    Your Question Answered
                </h2>

                <div className="border-t border-black/[0.08] dark:border-white/[0.08]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-black/[0.08] dark:border-white/[0.08]">
                            <button
                                className="w-full flex justify-between items-center py-8 text-left group cursor-pointer focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-display text-2xl md:text-3xl font-medium tracking-[-0.01em] text-textMain group-hover:text-accent transition-colors">
                                    {faq.question}
                                </span>
                                <span className="ml-8 text-2xl text-accent font-light transition-transform duration-300 transform">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // power4.out easing for extra premium feel
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 font-sans text-lg text-gray-500 leading-relaxed md:pr-12">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
