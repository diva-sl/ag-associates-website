import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "@/ui/toaster";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import ScrollProgress from "@/components/ScrollProgress";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <>
      <Helmet>
        <title>AG & ASSOCIATES - Expert Tax Consultancy Services</title>
        <meta
          name="description"
          content="AG & ASSOCIATES offers expert tax consultancy in Tirupur, providing services for GST, direct taxation, and financial planning for businesses and individuals."
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <CTA />
          <Contact />
        </main>
        <Footer />
        <Toaster />
        <ScrollProgress />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
