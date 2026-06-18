import { Link } from "react-router-dom";

import { TrendingUp, BookOpen } from "lucide-react";

const ArticleSidebar = ({ categories = [], trending = [] }) => {
  return (
    <div className="space-y-6 sticky top-28">
      {/* Categories */}

      <div
        className="
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        p-6
      "
      >
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="text-purple-300" size={18} />

          <h3 className="text-xl font-bold text-white">Categories</h3>
        </div>

        <div className="space-y-3">
          {categories.map((item) => (
            <Link
              key={item._id}
              to={`/knowledge-center/category/${item.slug}`}
              className="
              block

              text-white/70

              hover:text-white

              transition
            "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Trending */}

      <div
        className="
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        p-6
      "
      >
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="text-pink-300" size={18} />

          <h3 className="text-xl font-bold text-white">Trending</h3>
        </div>

        <div className="space-y-4">
          {trending.map((item) => (
            <Link
              key={item._id}
              to={`/knowledge-center/${item.slug}`}
              className="block"
            >
              <h4
                className="
                text-white

                text-sm

                hover:text-purple-300

                line-clamp-2
              "
              >
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}

      <div
        className="
        rounded-[32px]

        p-6

        bg-gradient-to-r
        from-[#511D43]
        to-[#901E3E]
      "
      >
        <h3 className="text-xl font-bold text-white">Need Expert Help?</h3>

        <p className="text-white/80 text-sm mt-3">
          Connect with AG & Associates for professional tax and compliance
          assistance.
        </p>

        <Link
          to="/contact"
          className="
          inline-block

          mt-5

          bg-white

          text-[#511D43]

          px-5
          py-3

          rounded-xl

          font-semibold
        "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default ArticleSidebar;
