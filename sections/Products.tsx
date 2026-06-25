import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const products = [
    {
        id: 1,
        name: "Sofa",
        collection: "129 Collection",
        image: "/images/product_sofa_1782301430144.png",
    },
    {
        id: 2,
        name: "Table",
        collection: "75 Collection",
        image: "/images/product_table_1782301444778.png",
    },
    {
        id: 3,
        name: "Lamp",
        collection: "219 Collection",
        image: "/images/product_lamp_1782301468819.png",
    },
];

export default function Products() {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        // Only track inside the left container approximately, or follow mouse
        // We can offset it a bit so the image centers on the pointer
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            id="products"
            data-theme="dark"
            className="py-32 px-8 bg-bgDark text-textLight min-h-screen relative"
        >
            <div className="max-w-7xl mx-auto flex flex-col pt-16">
                <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-24 border-b border-white/20 pb-8">
                    Our Provide Product
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative" onMouseMove={handleMouseMove}>

                    {/* Left Side: Floating Image Area */}
                    <div className="hidden md:block relative h-[600px] border-r border-white/20">
                        <AnimatePresence>
                            {activeImage && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        // Optionally follow mouse by mapping mousePos to x/y if wanted
                                        // In this case, standard floating image in the center of the left pane
                                        x: mousePos.x / 10,
                                        y: mousePos.y / 10
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="absolute inset-0 m-auto w-3/4 aspect-square rounded-2xl overflow-hidden pointer-events-none"
                                    style={{ top: "10%", left: "10%" }}
                                >
                                    <img src={activeImage} alt="Product" className="w-full h-full object-cover" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: List */}
                    <div className="flex flex-col justify-center">
                        <ul className="flex flex-col w-full group/list">
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    className="group flex flex-col py-10 border-b border-white/20 cursor-none relative transition-colors duration-500 hover:border-white"
                                    onMouseEnter={() => setActiveImage(product.image)}
                                    onMouseLeave={() => setActiveImage(null)}
                                >
                                    <div className="flex justify-between items-end w-full group-hover/list:opacity-40 group-hover:!opacity-100 transition-opacity duration-500">
                                        <h3 className="font-display text-5xl md:text-7xl font-bold tracking-tight transform transition-transform duration-500 group-hover:translate-x-4">
                                            {product.name}
                                        </h3>
                                        <span className="font-sans text-sm tracking-widest uppercase mb-2">
                                            ({product.collection})
                                        </span>
                                    </div>

                                    {/* Mobile image fallback */}
                                    <div className={`md:hidden overflow-hidden transition-all duration-500 ${activeImage === product.image ? 'h-64 mt-8 opacity-100' : 'h-0 mt-0 opacity-0'}`}>
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
