import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import AOS from "aos";

import "aos/dist/aos.css";

import Breadcrumb from "@/components/Breadcrumb";
import LegalBanner from "@/components/LegalBanner";

import { useGetLegalPageQuery } from "@/redux/services/legalApi";

const fallbackTitles = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  disclaimer: "Disclaimer",
  refund: "Refund Policy",
  cancellation: "Cancellation Policy",
};

const LegalPage = () => {
  const { page } = useParams();

  const { data, isLoading, error } = useGetLegalPageQuery(page);

  const pageTitle = data?.title || fallbackTitles[page] || "Legal Information";

  const pageDescription =
    data?.title ||
    "AG & Associates legal information and compliance documentation.";

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-white text-3xl font-bold mb-3">
            Unable to Load Page
          </h2>

          <p className="text-white/70">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | AG & Associates`}</title>

        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />

        <meta property="og:description" content={pageDescription} />

        <meta property="og:type" content="website" />
      </Helmet>

      {/* Banner */}

      <motion.div
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <LegalBanner title={pageTitle} />
      </motion.div>

      {/* Main Section */}

      <section className="relative py-24 overflow-hidden">
        {/* Background Glow */}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/10 blur-[160px] rounded-full" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-[140px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Breadcrumb current={pageTitle} />

          <motion.div
            data-aos="fade-up"
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              relative
              overflow-hidden

              rounded-[36px]

              p-8
              md:p-14

              mt-8

              bg-white/[0.04]
              backdrop-blur-2xl

              border
              border-white/10

              shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            "
          >
            {/* Decorative Top Glow */}

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {isLoading ? (
              <div className="flex flex-col items-center py-24">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border border-white/20" />

                  <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
                </div>

                <p className="text-white/70 mt-6">
                  Loading legal documentation...
                </p>
              </div>
            ) : (
              <>
                {/* Premium Header */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className="text-center mb-14"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-purple-300" />

                    <span className="text-sm text-white/80">
                      AG & Associates Legal Documentation
                    </span>
                  </div>

                  <h1
                    className="
                      text-4xl
                      md:text-6xl

                      font-black

                      bg-gradient-to-r
                      from-white
                      via-purple-100
                      to-pink-200

                      bg-clip-text
                      text-transparent
                    "
                  >
                    {pageTitle}
                  </h1>

                  <div className="w-28 h-1 rounded-full mx-auto mt-6 bg-gradient-to-r from-[#511D43] via-[#901E3E] to-[#C77DFF]" />
                </motion.div>

                {/* Content */}

                <div
                  className="
                    prose
                    prose-lg
                    prose-invert

                    max-w-none

                    prose-headings:text-white
                    prose-headings:font-bold
                    prose-headings:tracking-tight

                    prose-h1:text-white
                    prose-h2:text-white
                    prose-h3:text-purple-100
                    prose-h4:text-purple-100

                    prose-p:text-white/90
                    prose-p:leading-8

                    prose-strong:text-white
                    prose-strong:font-semibold

                    prose-li:text-white/85
                    prose-ul:text-white/85
                    prose-ol:text-white/85

                    prose-blockquote:border-l-purple-400
                    prose-blockquote:text-white/80

                    prose-code:text-purple-200
                    prose-code:bg-white/10
                    prose-code:px-1
                    prose-code:rounded

                    prose-pre:bg-black/30

                    prose-a:text-purple-300
                    hover:prose-a:text-white

                    prose-table:text-white
                    prose-th:text-white
                    prose-td:text-white/80
                  "
                >
                  <ReactMarkdown>
                    {data?.content || "No content available."}
                  </ReactMarkdown>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
