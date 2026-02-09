import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users } from "lucide-react";
import CountUp from "react-countup";

const About = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Satisfied Clients" },
    { icon: Award, value: "8+", label: "Years Experience" },
    { icon: Target, value: "100%", label: "Success Rate" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-white/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">AG & ASSOCIATES</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            A trusted and client-focused tax consultancy firm dedicated to
            delivering expert advice and tailored tax solutions to individuals,
            businesses, and organizations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              alt="Modern tax consultancy office with professional team"
              className="rounded-2xl shadow-2xl w-full"
              src="https://images.unsplash.com/photo-1634715022648-13d43a4e9fe8"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <Eye className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                To be a leading and reliable tax consultancy, empowering our
                clients with clarity, compliance, and confidence in their
                tax-related decisions.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <Target className="h-8 w-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <ul className="text-white/90 space-y-2">
                <li>• Provide accurate, practical, and strategic tax advice</li>
                <li>
                  • Build long-term relationships based on trust and integrity
                </li>
                <li>• Help clients minimize risks and maximize savings</li>
                <li>• Stay updated with evolving tax laws and technology</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 text-center hover:-translate-y-3 transition duration-300"
            >
              <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">
                {/* {stat.value} */}
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value.includes("+") ? (
                    <>
                      <CountUp end={parseInt(stat.value)} duration={3} />+
                    </>
                  ) : stat.value.includes("%") ? (
                    <>
                      <CountUp end={100} duration={3} />%
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
              </div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
