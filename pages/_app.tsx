import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";

// Load fonts
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <div className={`${spaceGrotesk.variable} ${inter.variable} font-sans`}>
      <Preloader />
      <Header />
      <CustomCursor />
      <Component {...pageProps} />
    </div>
  );
}

