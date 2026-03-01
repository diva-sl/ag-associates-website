import { motion } from "framer-motion";

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/917373476048"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.1 }}
      className="
        fixed bottom-6 right-6 z-50
        p-3
        bg-white/10
        backdrop-blur-md
        rounded-full
        hover:bg-white/20
        transition-all duration-300
        shadow-lg
        flex items-center justify-center
      "
      aria-label="Chat on WhatsApp"
    >
      {/* Clean WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="none"
      >
        <path
          d="M16 2.7c-7.4 0-13.3 5.9-13.3 13.3 0 2.3.6 4.5 1.7 6.5L2 30l7.8-2.3c1.9 1 4 1.6 6.2 1.6 7.4 0 13.3-5.9 13.3-13.3S23.4 2.7 16 2.7z"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M22.3 19.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.6.1-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 3 1.2 3.2c.2.2 2 3 4.9 4.2.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
};

export default FloatingWhatsApp;
