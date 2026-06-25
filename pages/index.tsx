import Head from "next/head";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Portfolio from "@/sections/Portfolio";
import Isometric from "@/sections/Isometric";
import Products from "@/sections/Products";
import FAQ from "@/sections/FAQ";
import CarouselFooter from "@/sections/CarouselFooter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Urban Nest | Interior Design</title>
        <meta name="description" content="Where beauty meets purpose. Modern interior design portfolio." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full relative">
        <Hero />
        <About />
        <Portfolio />
        <Isometric />
        <Products />
        <FAQ />
        <CarouselFooter />
      </main>
    </>
  );
}
