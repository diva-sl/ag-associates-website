import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RelatedArticles = ({ articles = [] }) => {
  if (!articles.length) return null;

  return (
    <div
      className="
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-2xl
      p-8
    "
    >
      <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>

      <div className="space-y-5">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/knowledge-center/${article.slug}`}
            className="
            flex
            gap-4

            group
          "
          >
            <img
              src={article.featuredImage}
              alt={article.title}
              className="
              w-24
              h-24
              rounded-xl
              object-cover
            "
            />

            <div className="flex-1">
              <h4
                className="
                text-white
                font-semibold

                line-clamp-2

                group-hover:text-purple-300
              "
              >
                {article.title}
              </h4>

              <p className="text-white/60 text-sm mt-2 line-clamp-2">
                {article.excerpt}
              </p>

              <span
                className="
                inline-flex
                items-center
                gap-2

                mt-3

                text-purple-300
                text-sm
              "
              >
                Read More
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
