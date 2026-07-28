"use client";

import About from "./components/About";
import BeyondCollege from "./components/BeyondCollege";
import CTA from "./components/CTA";
import Enrol from "./components/Enrol";
import FAQ from "./components/FAQ";
import Fees from "./components/Fees";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Leadership from "./components/Leadership";
import Navbar from "./components/Navbar";
import Programmes from "./components/Programmes";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function HomeUDBC() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Programmes />
      <Enrol />
      <Leadership />
      <BeyondCollege />
      <Testimonials />
      <Fees />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}