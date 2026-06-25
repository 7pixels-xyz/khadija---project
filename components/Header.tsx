import React from "react";
import Link from "next/link";
import { Trees } from "lucide-react"; // Using Trees as a minimalist icon

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white pointer-events-none">
            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 max-w-7xl mx-auto pointer-events-auto">
                <nav className="flex space-x-3 md:space-x-8 text-[10px] md:text-sm uppercase tracking-widest">
                    <Link href="#home" className="hover:opacity-70 transition-opacity">Home</Link>
                    <Link href="#about" className="hover:opacity-70 transition-opacity">About</Link>
                </nav>

                <div className="flex flex-col items-center justify-center cursor-pointer">
                    <Trees className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                <nav className="flex space-x-3 md:space-x-8 text-[10px] md:text-sm uppercase tracking-widest">
                    <Link href="#portfolio" className="hover:opacity-70 transition-opacity">Project</Link>
                    <Link href="#contact" className="hover:opacity-70 transition-opacity hidden sm:inline">Contact Us</Link>
                </nav>
            </div>
        </header>
    );
}
