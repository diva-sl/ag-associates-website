import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { TrendingUp, Eye, Clock, Star, ArrowRight } from "lucide-react";

import { useGetTrendingPostsQuery } from "../../redux/services/knowledgeApi";

const TrendingArticles = () => {
  const { data } = useGetTrendingPostsQuery();

  const articles = data?.data || [];

  if (!articles.length) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          absolute
          left-0
          top-1/2

          w-[350px]
          h-[350px]

          bg-purple-500/10

          blur-[140px]

          rounded-full
        "
        />

        <div
          className="
          absolute
          right-0
          bottom-0

          w-[350px]
          h-[350px]

          bg-pink-500/10

          blur-[140px]

          rounded-full
        "
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-12"
        >
          <div
            className="
            inline-flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-white/5

            border
            border-white/10

            backdrop-blur-xl
          "
          >
            <TrendingUp size={16} className="text-pink-300" />

            <span className="text-white/80 text-sm">Trending Now</span>
          </div>

          <h2
            className="
            mt-6

            text-4xl
            md:text-5xl

            font-black

            bg-gradient-to-r
            from-white
            via-purple-100
            to-pink-200

            bg-clip-text
            text-transparent
          "
          >
            Most Read Articles
          </h2>

          <p className="mt-4 text-white/70 max-w-3xl text-lg">
            Stay updated with the most popular tax, GST, audit and compliance
            insights read by businesses and professionals.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
          flex
          gap-6

          overflow-x-auto

          pb-4

          scrollbar-thin
        "
        >
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              className="
                min-w-[320px]
                md:min-w-[380px]

                flex-shrink-0
              "
            >
              <Link
                to={`/knowledge-center/${article.slug}`}
                className="
                  block

                  h-full

                  rounded-[32px]

                  overflow-hidden

                  border
                  border-white/10

                  bg-white/[0.04]

                  backdrop-blur-2xl

                  hover:border-purple-400/30

                  transition-all
                  duration-300
                "
              >
                {/* Image */}

                <div className="relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="
                      w-full
                      h-56
                      object-cover
                    "
                  />

                  {/* Ranking */}

                  <div
                    className="
                      absolute
                      top-4
                      left-4

                      w-12
                      h-12

                      rounded-full

                      bg-gradient-to-r
                      from-[#511D43]
                      to-[#901E3E]

                      flex
                      items-center
                      justify-center

                      text-white
                      font-bold
                    "
                  >
                    #{index + 1}
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <span
                    className="
                      text-xs
                      text-purple-300
                    "
                  >
                    {article?.category?.name}
                  </span>

                  <h3
                    className="
                      mt-3

                      text-xl

                      font-bold

                      text-white

                      line-clamp-2
                    "
                  >
                    {article.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      text-white/65

                      line-clamp-3
                    "
                  >
                    {article.excerpt}
                  </p>

                  {/* Meta */}

                  <div
                    className="
                      mt-6

                      flex
                      flex-wrap
                      gap-4

                      text-sm
                      text-white/60
                    "
                  >
                    <div className="flex items-center gap-1">
                      <Clock size={15} />
                      {article.readingTime}m
                    </div>

                    <div className="flex items-center gap-1">
                      <Eye size={15} />

                      {article.views}
                    </div>

                    <div className="flex items-center gap-1">
                      <Star size={15} className="text-yellow-400" />

                      {Number(article.averageRating || 0).toFixed(1)}
                    </div>
                  </div>

                  {/* CTA */}

                  <div
                    className="
                      mt-6

                      flex
                      items-center
                      gap-2

                      text-purple-300
                      font-medium
                    "
                  >
                    Read Article
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingArticles;
