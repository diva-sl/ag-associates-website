import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <AlertTriangle size={80} className="mx-auto text-[#901E3E]" />

        <h1 className="text-6xl font-bold mt-6 text-[#511D43]">404</h1>

        <h2 className="text-2xl font-semibold mt-3">Page Not Found</h2>

        <p className="text-slate-500 mt-3 max-w-md">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="
            inline-block
            mt-8
            px-6
            py-3
            rounded-xl
            bg-[#511D43]
            text-white
            hover:bg-[#901E3E]
            transition
          "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
