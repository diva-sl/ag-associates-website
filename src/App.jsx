import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "@/ui/toaster";
import Disclaimer from "@/components/Disclaimer";
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
import PrivacyPolicy from "@/components/PrivacyPolicy";
import Terms from "@/components/Terms";

/* ✅ Create HomePage Component */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <CTA />
      <Contact />
    </>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>AG & ASSOCIATES - Expert Tax Consultancy Services</title>
        <meta
          name="description"
          content="AG & ASSOCIATES offers expert tax consultancy in Tirupur, providing services for GST, direct taxation, and financial planning."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#511D43] to-[#901E3E]">
        <ScrollProgress />
        <Header />

        {/* ✅ ROUTES GO HERE */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
        </Routes>

        <Footer />
        <Toaster />
        <ScrollToTop />
      </div>
    </>
  );
}
<script type="application/ld+json">
  {`
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "AG & Associates",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tirupur",
    "addressRegion": "Tamil Nadu",
    "postalCode": "641608",
    "addressCountry": "India"
  },
  "telephone": "+91 73734 76048",
  "email": "info@agandassociates.org",
  "url": "https://agandassociates.org"
}
`}
</script>;

export default App;
