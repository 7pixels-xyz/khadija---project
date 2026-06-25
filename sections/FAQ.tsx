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
        <section className="py-32 px-8 bg-bgLight">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center">
                    Your Question Answered
                </h2>

                <div className="border-t border-gray-300">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300">
                            <button
                                className="w-full flex items-center justify-between py-8 text-left group"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-display text-2xl md:text-3xl font-medium text-textMain group-hover:text-accent transition-colors">
                                    {faq.question}
                                </span>
                                <span className="ml-4 flex-shrink-0 text-textMain transition-transform duration-300">
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 font-sans text-lg text-gray-600 leading-relaxed pr-12">
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
