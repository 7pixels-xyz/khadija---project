import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";

// Load fonts
import { Bodoni_Moda, Manrope } from "next/font/google";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let lenis: any;

    // Dynamically import GSAP and Lenis
    const initSmoothScroll = async () => {
      const LenisModule = await import("lenis");
      const Lenis = LenisModule.default;

      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      // Perf optimization as required in instructions
      gsap.ticker.lagSmoothing(0);

      // Initialize Lenis
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Remove strictly smoothWheel config as it might not be supported in newest version
        // or just let it use defaults
      });

      // Synchronize Lenis with GSAP
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initSmoothScroll();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className={`${bodoni.variable} ${manrope.variable} font-sans`}>
      <Preloader />
      <Header />
      <CustomCursor />
      <Component {...pageProps} />
    </div>
  );
}

