import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import img1 from "@/assets/faq.jpg";
import img2 from "@/assets/Audit.webp";
import img3 from "@/assets/Audit1.webp";
import img4 from "@/assets/Audit2.webp";
import img5 from "@/assets/Audit3.webp";
import img6 from "@/assets/Audit4.webp";

const images = [img1, img2, img3, img4, img5, img6];

const faqData = {
  "Income Tax": [
    {
      q: "Who needs to file an Income Tax Return (ITR) in India?",
      a: `In India, it is mandatory to file an ITR if your gross total income exceeds the basic exemption limit before any deductions. Even if you fall below the limit, filing an ITR is highly recommended if you want to claim a tax refund, apply for a loan or visa, or carry forward business losses. Not sure about your tax bracket? Contact us today for a quick assessment!`,
    },
    {
      q: "I have zero tax liability. Do I still need to file an ITR?",
      a: `Yes, filing a "Nil Return" is extremely beneficial. It serves as a solid proof of income, which banks require for credit cards and loans. It also keeps your tax record clean and prevents unwanted notices from the Income Tax Department.`,
    },
    {
      q: "What happens if I miss the ITR filing deadline?",
      a: `Missing the deadline (usually July 31st for individuals) attracts a late fee under Section 234F of up to ₹5,000. It also prevents you from carrying forward certain losses and adds interest to any unpaid tax dues. Don't wait for the last minute—reach out to us for hassle-free filing.`,
    },
    {
      q: "What documents do I need to file my ITR?",
      a: `Typically, you will need your PAN, Aadhaar, Form 16 (for salaried individuals), bank statements, and investment proofs (like LIC, PPF, or mutual funds). If you have a business, you'll need your balance sheet and profit & loss statement. We provide our clients with a simple checklist to make document gathering a breeze.`,
    },
    {
      q: "Can I revise my ITR if I made a mistake?",
      a: `Absolutely. The Income Tax Department allows you to file a "Belated" or "Revised" return within a specific timeframe. If you suspect an error in your past filings, let our experts review and correct it for you to avoid future penalties.`,
    },
    {
      q: "How can your consultancy help me save taxes legally?",
      a: `Tax evasion is illegal, but tax planning is your right! We analyze your income, investments, and expenses to structure your finances using legal exemptions and deductions (like 80C, 80D, HRA, etc.). Our goal is to maximize your take-home money.`,
    },
  ],

  GST: [
    {
      q: "Is GST registration mandatory for my business?",
      a: `It depends on your turnover and business type. Generally, businesses selling goods with an annual turnover exceeding ₹40 Lakhs (₹20 Lakhs for special category states) or providing services exceeding ₹20 Lakhs must register. However, if you sell online (e-commerce) or make inter-state sales, GST registration is mandatory regardless of turnover.`,
    },
    {
      q: "What is the GST Composition Scheme, and is it right for me?",
      a: `The Composition Scheme is a simplified option for small businesses with a turnover of up to ₹1.5 Crores. It allows you to pay tax at a flat, lower rate without the headache of detailed record-keeping. However, you cannot claim Input Tax Credit (ITC). Contact us, and we’ll evaluate if this scheme saves you money.`,
    },
    {
      q: "How often do I need to file GST returns?",
      a: `Depending on the size of your business and the scheme you choose (like QRMP), you may need to file returns monthly, quarterly, or annually. Missing a deadline can halt your business operations and block your ITC. We track your deadlines so you never have to worry about them.`,
    },
    {
      q: "What happens if I delay filing my GST return?",
      a: `Late filing attracts a per-day penalty (late fee) and interest on the unpaid tax amount. Continuous non-filing can even lead to the cancellation of your GST registration and blocking of your e-way bills. Keep your business running smoothly—let us handle your GST compliance.`,
    },
    {
      q: "Can I cancel my GST registration if I close my business?",
      a: `Yes. If you shut down your business, change your business structure, or fall below the exemption limit, you must formally apply for GST cancellation and file a final return. We handle the entire cancellation and closure process seamlessly.`,
    },
  ],

  "Company Registration": [
    {
      q: "What is the best business structure for a startup?",
      a: `There is no one-size-fits-all. Sole Proprietorship: Best for solo freelancers (easy to start, low cost). LLP (Limited Liability Partnership): Great for partners wanting limited risk and lesser compliance. Private Limited Company: Ideal for startups looking to raise funding from investors and scale rapidly. Book a free business advisory call with us to choose the right foundation for your dream.`,
    },
    {
      q: "How long does it take to register a Private Limited Company?",
      a: `With all your documents in order, company registration usually takes about 7 to 10 working days. We handle the name approval, drafting of MOA & AOA, and the final incorporation certificate.`,
    },
    {
      q: "Do I need a commercial office to register a company?",
      a: `No! You can register your company using a residential address. You just need to provide a NOC (No Objection Certificate) from the property owner and a recent utility bill.`,
    },
    {
      q: "What is the minimum capital required to start a Private Limited Company?",
      a: `There is no longer a minimum paid-up capital requirement to start a Private Limited Company in India. You can literally start with whatever capital you have.`,
    },
    {
      q: "I have registered my company. What's next?",
      a: `Registration is just the first step. You will immediately need a bank account, an auditor appointment (within 30 days), and perhaps GST or MSME (Udyam) registration. We provide end-to-end post-incorporation packages so you can focus on growing your business while we handle the red tape.`,
    },
  ],

  Compliance: [
    {
      q: "What is ROC compliance, and why is it important?",
      a: `ROC (Registrar of Companies) compliance involves mandatory annual filings that every registered company and LLP must submit to the Ministry of Corporate Affairs (MCA). This includes filing financial statements, holding board meetings, and submitting annual returns. It proves your company is active and legally sound.`,
    },
    {
      q: "What happens if my Pvt Ltd company fails to file annual returns?",
      a: `The penalties are severe. The MCA charges heavy per-day late fees for missed filings. Prolonged non-compliance can lead to your company being struck off the register, and directors can be disqualified for up to 5 years.`,
    },
    {
      q: "My company didn't do any business this year. Do I still need compliance?",
      a: `Yes. Even if your turnover is zero, a Private Limited Company or LLP must file Nil returns and complete basic ROC compliance. Alternatively, we can help you apply for Dormant status to reduce your compliance burden.`,
    },
    {
      q: "Are directors personally liable for company non-compliance?",
      a: `While a company has limited liability, directors can be held personally liable and face heavy fines or disqualification for failing to adhere to statutory ROC and tax compliances. Protect your reputation and finances by letting our experts manage your compliance calendar.`,
    },
    {
      q: "I haven't filed returns for years. Can you help?",
      a: `Absolutely. We specialize in regularizing non-compliant companies. We calculate dues, leverage amnesty schemes where available, and restore compliance with minimal financial impact. Reach out today for a confidential consultation.`,
    },
  ],

  "Why Choose Us": [
    {
      q: "Why should I hire a tax consultant instead of doing it myself?",
      a: `Tax laws in India change frequently. A simple DIY mistake can lead to defective returns, missed tax-saving opportunities, and stressful notices. We ensure 100% accuracy, peace of mind, and maximum tax savings.`,
    },
    {
      q: "Is my financial data secure with your firm?",
      a: `Your privacy is our top priority. We use secure, encrypted channels for document sharing and adhere to strict confidentiality agreements. Your data is never shared with third parties.`,
    },
    {
      q: "I don't live in your city. Can you still help me?",
      a: `Yes! We operate digitally across India. Everything is handled via secure cloud portals, email, and phone consultation.`,
    },
    {
      q: "What makes your advisory services different?",
      a: `We don't just file returns and disappear. We act as your year-round financial partners — sending deadline reminders and advising on growth and tax-saving strategies.`,
    },
  ],
};

const categories = Object.keys(faqData);

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);

  const currentFaqs = faqData[activeCategory];
  const [readMore, setReadMore] = useState(null);

  const toggleReadMore = (index) => {
    setReadMore(readMore === index ? null : index);
  };

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
    setActiveIndex(index);
    setReadMore(null);
  };

  return (
    <section id="faq" className="py-32 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(0);
                setExpanded(0);
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-white text-purple-700"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ Scroll Panel */}
          <div className="h-[650px] overflow-y-auto pr-4 space-y-6 custom-scroll">
            {currentFaqs.map((faq, index) => {
              const isActive = expanded === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border-purple-500 shadow-xl"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <h3 className="text-white font-semibold text-lg">
                      {faq.q}
                    </h3>

                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="text-white" />
                    </motion.div>
                  </button>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-6 pb-6 text-white/80 leading-relaxed"
                      >
                        {faq.a.length > 220 ? (
                          <>
                            {readMore === index
                              ? faq.a
                              : faq.a.substring(0, 220) + "..."}

                            <button
                              onClick={() => toggleReadMore(index)}
                              className="text-purple-400 ml-2 font-semibold hover:text-purple-300 transition"
                            >
                              {readMore === index ? "Show Less" : "Read More"}
                            </button>
                          </>
                        ) : (
                          faq.a
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          {/* Sticky Image */}
          <div className="h-[650px] sticky top-32">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeCategory}-${activeIndex}`}
                src={images[activeIndex % images.length]}
                alt="FAQ Visual"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl w-full h-full object-cover shadow-2xl border border-white/10"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
