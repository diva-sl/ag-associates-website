import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Heart, Zap, Globe, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Experienced Professionals',
      description: 'Extensive knowledge of tax laws with years of practical experience across various sectors.'
    },
    {
      icon: Heart,
      title: 'Personalized Solutions',
      description: 'Tailored solutions designed specifically for your unique requirements and business goals.'
    },
    {
      icon: CheckCircle,
      title: 'Ethical & Transparent',
      description: 'Maintaining the highest standards of ethics, transparency, and confidentiality in all dealings.'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Fast response times and proactive support to meet your deadlines and requirements.'
    },
    {
      icon: Globe,
      title: 'Cross-Sector Expertise',
      description: 'Assistance across various sectors including SMEs, startups, and large corporations.'
    },
    {
      icon: Zap,
      title: 'Proactive Approach',
      description: 'Forward-thinking solutions that anticipate challenges and create opportunities.'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">AG & ASSOCIATES</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We believe that tax management is more than compliance—it's about creating opportunities, 
            mitigating risks, and enabling strategic growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <reason.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-white/90 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Our Approach</h3>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            At AG & ASSOCIATES, we work closely with clients to understand their goals and provide 
            actionable solutions that align with their long-term objectives. Our team combines deep 
            technical expertise with practical business insights to deliver results that matter.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">Understand</h4>
              <p className="text-white/80">We listen to your needs and analyze your situation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">Strategize</h4>
              <p className="text-white/80">We develop customized solutions for your goals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">Execute</h4>
              <p className="text-white/80">We implement and monitor for optimal results</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;