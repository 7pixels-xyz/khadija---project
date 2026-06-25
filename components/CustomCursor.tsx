import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Use motion values for instant tracking
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Use springs for the lerping ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if we are hovering a link or button
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button") || target.closest("input")) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }

            // Check if the section under the cursor has a dark background class
            const darkSection = target.closest('[data-theme="dark"]');
            setIsDark(!!darkSection);
        };

        if (window.innerWidth >= 768) {
            window.addEventListener("mousemove", moveCursor);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    // Safely hide on mobile after hydration
    if (isMobile) {
        return null;
    }

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isDark ? "var(--text-light)" : "var(--text-main)",
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            />
            {/* Ring */}
            <motion.div
                className="fixed top-0 left-0 w-[40px] h-[40px] border border-solid rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovered ? 0 : 1,
                    borderColor: isDark ? "var(--text-light)" : "var(--text-main)",
                }}
            />
        </>
    );
}
