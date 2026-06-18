import { Link } from "react-router-dom";

import { Clock, Eye, Star, ArrowRight } from "lucide-react";

const ArticleCard = ({ article }) => {
  return (
    <article
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      border
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      group
    "
    >
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={article?.featuredImage}
          alt={article?.title}
          className="
          w-full
          h-56
          object-cover
          group-hover:scale-105
          transition
          duration-500
        "
        />

        <div className="absolute top-4 left-4">
          <span
            className="
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            text-white
            bg-gradient-to-r
            from-[#511D43]
            to-[#901E3E]
          "
          >
            {article?.category?.name}
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Meta */}

        <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {article?.readingTime} min
          </div>

          <div className="flex items-center gap-1">
            <Eye size={14} />

            {article?.views}
          </div>

          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />

            {article?.averageRating?.toFixed(1) || 0}
          </div>
        </div>

        {/* Title */}

        <h3
          className="
          text-xl
          font-bold
          text-slate-900
          line-clamp-2
          mb-3
          group-hover:text-[#901E3E]
          transition
        "
        >
          {article?.title}
        </h3>

        {/* Excerpt */}

        <p
          className="
          text-slate-600
          line-clamp-3
          mb-5
        "
        >
          {article?.excerpt}
        </p>

        {/* Footer */}

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {new Date(article?.publishedAt).toLocaleDateString()}
          </span>

          <Link
            to={`/knowledge-center/${article?.slug}`}
            className="
            inline-flex
            items-center
            gap-2
            font-semibold
            text-[#901E3E]
            hover:text-[#511D43]
          "
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
