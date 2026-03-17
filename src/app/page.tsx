"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import Timeline from "@/components/Timeline";
import Venue from "@/components/Venue";
import DressCode from "@/components/DressCode";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <OurStory />
        <Timeline />
        <Venue />
        <DressCode />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
