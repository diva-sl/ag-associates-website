// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, Shield, TrendingUp } from "lucide-react";
// import { Button } from "@/ui/button";

// const Hero = () => {
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       // element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center justify-center relative overflow-hidden hero-pattern"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

//       <div className="container mx-auto px-4 py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center lg:text-left"
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
//             >
//               Expert Tax
//               <span className="block gradient-text">Consultancy</span>
//               Services
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-xl text-white/90 mb-8 leading-relaxed"
//             >
//               Navigate complex tax regulations with confidence. We provide
//               strategic tax solutions that minimize risks, ensure compliance,
//               and maximize your savings.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//             >
//               <Button
//                 onClick={() => scrollToSection("contact")}
//                 size="lg"
//                 className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full pulse-glow"
//               >
//                 Get Free Consultation
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 onClick={() => scrollToSection("services")}
//                 variant="outline"
//                 size="lg"
//                 className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full"
//               >
//                 Our Services
//               </Button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative"
//           >
//             <div className="floating-animation">
//               <img
//                 alt="Professional tax consultant working with financial documents"
//                 className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
//                 src="https://images.unsplash.com/photo-1554224155-a1487473ffd9"
//                 loading="lazy"
//               />
//             </div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 1, duration: 0.6 }}
//               className="absolute -top-4 -left-4 glass-effect rounded-xl p-4 text-white"
//             >
//               <div className="flex items-center space-x-2">
//                 <Shield className="h-6 w-6 text-green-400" />
//                 <div>
//                   <div className="font-bold">100%</div>
//                   <div className="text-sm opacity-80">Compliance</div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 1.2, duration: 0.6 }}
//               className="absolute -bottom-4 -right-4 glass-effect rounded-xl p-4 text-white"
//             >
//               <div className="flex items-center space-x-2">
//                 <TrendingUp className="h-6 w-6 text-blue-400" />
//                 <div>
//                   <div className="font-bold">500+</div>
//                   <div className="text-sm opacity-80">Happy Clients</div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/ui/button";
import { scrollTo } from "@/lib/scroll";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden hero-pattern"
    >
      {/* cinematic glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 blur-[140px] opacity-30 rounded-full"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert Tax
              <span className="block gradient-text">Consultancy</span>
              Services
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Navigate complex tax regulations with confidence. We provide
              strategic tax solutions that minimize risks, ensure compliance,
              and maximize your savings.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={() => scrollTo("contact")}
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-full"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollTo("services")}
                  variant="outline"
                  size="lg"
                  className="border-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-full"
                >
                  Our Services
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* glow behind image */}
            <div className="absolute -z-10 w-72 h-72 bg-blue-500 blur-[120px] opacity-30 rounded-full"></div>

            <div className="floating-animation">
              <img
                alt="Professional tax consultant"
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                src="https://images.unsplash.com/photo-1554224155-a1487473ffd9"
                loading="lazy"
              />
            </div>

            {/* floating badges */}
            <div className="absolute -top-4 -left-4 glass-effect rounded-xl p-4 text-white">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-400" />
                <div>
                  <div className="font-bold">100%</div>
                  <div className="text-sm opacity-80">Compliance</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 glass-effect rounded-xl p-4 text-white">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <div>
                  <div className="font-bold">500+</div>
                  <div className="text-sm opacity-80">Happy Clients</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
