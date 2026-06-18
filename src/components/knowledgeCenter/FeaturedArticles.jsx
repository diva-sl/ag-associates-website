import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Eye, Star } from "lucide-react";

import { useGetFeaturedPostsQuery } from "../../redux/services/knowledgeApi";

const FeaturedArticles = () => {
  const { data } = useGetFeaturedPostsQuery();

  const articles = data?.data || [];

  if (!articles.length) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          absolute
          top-20
          left-20
          w-[300px]
          h-[300px]
          bg-purple-500/10
          blur-[120px]
          rounded-full
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          w-[350px]
          h-[350px]
          bg-pink-500/10
          blur-[140px]
          rounded-full
        "
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}

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

            border
            border-white/10

            bg-white/5

            backdrop-blur-xl
          "
          >
            <span className="w-2 h-2 rounded-full bg-purple-300" />

            <span className="text-sm text-white/80">Featured Insights</span>
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
            Expert Articles &
            <br />
            Industry Updates
          </h2>

          <p className="text-white/70 text-lg mt-4 max-w-3xl">
            Explore our latest tax, GST, audit, compliance and advisory articles
            written by experts.
          </p>
        </motion.div>

        {/* Featured Grid */}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Featured */}

          {articles[0] && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="
              lg:col-span-7

              rounded-[36px]

              overflow-hidden

              border
              border-white/10

              bg-white/[0.04]

              backdrop-blur-2xl

              shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            "
            >
              <img
                src={articles[0].featuredImage}
                alt={articles[0].title}
                className="
                w-full
                h-[420px]
                object-cover
              "
              />

              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-5">
                  <span
                    className="
                    px-3
                    py-1

                    rounded-full

                    bg-gradient-to-r
                    from-[#511D43]
                    to-[#901E3E]

                    text-white
                    text-xs
                  "
                  >
                    {articles[0]?.category?.name}
                  </span>
                </div>

                <h3
                  className="
                  text-3xl
                  font-bold
                  text-white
                  mb-4
                "
                >
                  {articles[0].title}
                </h3>

                <p className="text-white/70 mb-6 line-clamp-3">
                  {articles[0].excerpt}
                </p>

                <div
                  className="
                  flex
                  flex-wrap
                  gap-5

                  text-sm
                  text-white/60
                  mb-8
                "
                >
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {articles[0].readingTime} min read
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {articles[0].views}
                  </div>

                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" />

                    {Number(articles[0].averageRating || 0).toFixed(1)}
                  </div>
                </div>

                <Link
                  to={`/knowledge-center/${articles[0].slug}`}
                  className="
                  inline-flex
                  items-center
                  gap-2

                  text-white
                  font-semibold

                  hover:text-purple-300
                "
                >
                  Read Article
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Side Articles */}

          <div className="lg:col-span-5 space-y-6">
            {articles.slice(1, 4).map((article, index) => (
              <motion.div
                key={article._id}
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
              >
                <Link
                  to={`/knowledge-center/${article.slug}`}
                  className="
                      block

                      rounded-3xl

                      border
                      border-white/10

                      bg-white/[0.04]

                      backdrop-blur-2xl

                      overflow-hidden

                      hover:border-purple-400/30

                      transition
                    "
                >
                  <div className="flex">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="
                          w-36
                          h-36
                          object-cover
                        "
                    />

                    <div className="p-5 flex-1">
                      <span
                        className="
                            text-xs
                            text-purple-300
                          "
                      >
                        {article?.category?.name}
                      </span>

                      <h4
                        className="
                            text-white
                            font-bold

                            mt-2

                            line-clamp-2
                          "
                      >
                        {article.title}
                      </h4>

                      <div
                        className="
                            mt-4

                            flex
                            gap-4

                            text-xs
                            text-white/50
                          "
                      >
                        <span>👁 {article.views}</span>

                        <span>
                          ⭐ {Number(article.averageRating || 0).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
