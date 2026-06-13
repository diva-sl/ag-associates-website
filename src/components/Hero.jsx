import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/ui/button";
import { scrollTo } from "@/lib/scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HeroRightDashboard from "./HeroRightDashboard";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center relative overflow-hidden hero-pattern"
    >
      {/* cinematic glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 blur-[140px] opacity-30 rounded-full"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          {/* <div className="grid lg:grid-cols-2 gap-12 items-center"> */}
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
          <HeroRightDashboard />
          {/* <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* glow behind image */}
          {/* <div className="absolute -z-10 w-72 h-72 bg-blue-500 blur-[120px] opacity-30 rounded-full"></div>

            <div className="floating-animation">
              <img
                alt="Professional tax consultant"
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                src="https://images.unsplash.com/photo-1554224155-a1487473ffd9"
                loading="lazy"
              />
            </div> */}

          {/* floating badges */}
          {/* <div className="absolute -top-4 -left-4 glass-effect rounded-xl p-4 text-white"> 
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
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
//  <motion.div
//             initial={{ opacity: 0, x: 80 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             {/* Background Glow */}
//             <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/30 blur-[120px] rounded-full" />

//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[120px] rounded-full" />

//             {/* Main Card */}
//             <div
//               className="
//       backdrop-blur-xl
//       bg-white/10
//       border border-white/20
//       rounded-3xl
//       overflow-hidden
//       shadow-[0_20px_80px_rgba(0,0,0,0.3)]
//       relative
//     "
//             >
//               <Swiper
//                 modules={[Autoplay, Pagination]}
//                 autoplay={{
//                   delay: 4000,
//                   disableOnInteraction: false,
//                 }}
//                 pagination={{
//                   clickable: true,
//                 }}
//                 loop={true}
//                 className="h-[550px]"
//               >
//                 {slides.map((slide, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="p-6 h-full flex flex-col">
//                       {/* Image */}
//                       <motion.img
//                         key={slide.title}
//                         initial={{ scale: 1.1, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ duration: 0.8 }}
//                         src={slide.image}
//                         alt={slide.title}
//                         className="h-64 w-full object-cover rounded-2xl"
//                       />

//                       {/* Content */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="mt-6"
//                       >
//                         <h3 className="text-3xl font-bold text-white mb-3">
//                           {slide.title}
//                         </h3>

//                         <p className="text-white/80 mb-5">
//                           {slide.description}
//                         </p>

//                         <div className="space-y-3">
//                           {slide.points.map((item, i) => (
//                             <motion.div
//                               key={i}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{
//                                 delay: i * 0.15,
//                               }}
//                               className="flex items-center gap-3"
//                             >
//                               <div className="w-2 h-2 bg-green-400 rounded-full" />

//                               <span className="text-white">{item}</span>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </motion.div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Floating Card 1 */}
//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//               }}
//               className="
//       absolute
//       -top-6
//       -left-6
//       bg-white/15
//       backdrop-blur-xl
//       border
//       border-white/20
//       rounded-2xl
//       p-4
//       text-white
//     "
//             >
//               <h4 className="text-2xl font-bold">500+</h4>
//               <p className="text-sm">Happy Clients</p>
//             </motion.div>

//             {/* Floating Card 2 */}
//             <motion.div
//               animate={{
//                 y: [0, 10, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//               }}
//               className="
//       absolute
//       -bottom-6
//       -right-6
//       bg-white/15
//       backdrop-blur-xl
//       border
//       border-white/20
//       rounded-2xl
//       p-4
//       text-white
//     "
//             >
//               <h4 className="text-2xl font-bold">100%</h4>
//               <p className="text-sm">Compliance</p>
//             </motion.div>
//           </motion.div>
