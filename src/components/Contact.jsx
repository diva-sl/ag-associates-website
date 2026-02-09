import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/ui/button';
import { useToast } from '@/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // This is the updated function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add your access key from Web3Forms here
    const accessKey = "a4072d1d-0f8e-4d45-a30d-fbcab6a0a732"; 
    
    const dataToSend = {
      ...formData,
      access_key: accessKey,
      subject: `New Message from ${formData.name} via agandassociates.org`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully! 📧",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        console.error("Submission Error:", result);
        toast({
          title: "Error Sending Message",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast({
        title: "Network Error",
        description: "Could not send the message. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: '+91 73734 76048', subtitle: 'Mon-Fri 9AM-6PM' },
    { icon: Mail, title: 'Email', details: 'info@agandassociates.org', subtitle: 'We reply within 24 hours' },
    { icon: MapPin, title: 'Office', details: 'Tirupur', subtitle: 'Visit us for consultation' }
  ];

  const services = [
    'Direct Taxation', 'Indirect Taxation (GST)', 'Corporate Tax Solutions',
    'Advisory Services', 'Financial Planning', 'Business Consulting'
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ready to optimize your tax strategy? Contact our expert team for personalized consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Service Needed</label>
                  <select name="service" value={formData.service} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                    <option value="" className="bg-gray-800">Select a service</option>
                    {services.map((service, index) => (<option key={index} value={service} className="bg-gray-800">{service}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/90 mb-2 font-medium">Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} required className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" placeholder="Tell us about your tax consultation needs..."></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl pulse-glow" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information and Business Hours remain the same */}
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (<div key={index} className="flex items-start space-x-4"><div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"><info.icon className="h-6 w-6 text-white" /></div><div><h4 className="text-lg font-semibold text-white">{info.title}</h4><p className="text-white/90 font-medium">{info.details}</p><p className="text-white/70 text-sm">{info.subtitle}</p></div></div>))}
              </div>
            </div>
            <div className="glass-effect rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-4"><Clock className="h-6 w-6 text-blue-400" /><h3 className="text-xl font-bold text-white">Business Hours</h3></div>
              <div className="space-y-2 text-white/90">
                <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;