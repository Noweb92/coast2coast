/**
 * Home — SERVER COMPONENT (contract §2).
 *
 * Pure assembly: no state, no client JS at the page level. Static sections
 * render to HTML on the server; only the whitelisted islands hydrate
 * (nav chrome, forms, slider, counters, reveal wrappers, intro veil).
 * The LoadingScreen is a self-managing non-blocking overlay — content
 * underneath renders and is interactive from the first byte.
 */

import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustBadges from "@/components/TrustBadges";
import Process from "@/components/Process";
import BeforeAfter from "@/components/BeforeAfter";
import BookInspection from "@/components/BookInspection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Areas from "@/components/Areas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <TrustBadges />
        <Process />
        <BeforeAfter />
        <BookInspection />
        <Testimonials />
        <FAQ />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
