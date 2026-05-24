"use client";

import { useState } from "react";
import { C } from "@/lib/theme";

import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustBadges from "@/components/TrustBadges";
import Process from "@/components/Process";
import BeforeAfter from "@/components/BeforeAfter";
import BookInspection from "@/components/BookInspection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Areas from "@/components/Areas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ background: C.dark, color: C.textWhite }}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <ScrollProgress />
      <PromoBanner />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TrustBadges />
        <Process />
        <BeforeAfter />
        <BookInspection />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
