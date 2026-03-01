import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb = ({ current }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center space-x-2 text-sm text-white/70"
    >
      <Link to="/" className="hover:text-white transition-colors duration-200">
        Home
      </Link>
      <span>/</span>
      <span className="text-white font-medium">{current}</span>
    </motion.div>
  );
};

export default Breadcrumb;
