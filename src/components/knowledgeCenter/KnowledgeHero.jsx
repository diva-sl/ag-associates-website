import { motion } from "framer-motion";
import { Search, BookOpen, TrendingUp, FileText } from "lucide-react";

const KnowledgeHero = ({
  search,
  setSearch,
  totalArticles = 0,
  totalCategories = 0,
}) => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Glow Effects */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-[700px]
          h-[700px]

          bg-purple-500/10

          blur-[180px]
          rounded-full
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0

          w-[500px]
          h-[500px]

          bg-pink-500/10

          blur-[150px]
          rounded-full
        "
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative

            overflow-hidden

            rounded-[36px]

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            p-8
            md:p-14

            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
          "
        >
          {/* Top Border Glow */}

          <div
            className="
            absolute
            top-0
            left-0

            w-full
            h-px

            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
          "
          />

          {/* Badge */}

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-5
            py-2

            rounded-full

            border
            border-white/10

            bg-white/5

            mb-8
          "
          >
            <span className="w-2 h-2 rounded-full bg-purple-300" />

            <span className="text-sm text-white/80">
              AG & Associates Knowledge Center
            </span>
          </div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="
              text-4xl
              md:text-6xl

              font-black

              leading-tight

              bg-gradient-to-r
              from-white
              via-purple-100
              to-pink-200

              bg-clip-text
              text-transparent
            "
          >
            Tax Insights,
            <br />
            Compliance Updates &
            <br />
            Expert Guidance
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              mt-8

              max-w-3xl

              text-lg
              md:text-xl

              text-white/75

              leading-relaxed
            "
          >
            Explore expert articles on Income Tax, GST, TDS, Audits, Compliance,
            Business Registration, Corporate Advisory and more.
          </motion.p>

          {/* Search */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              mt-10

              relative

              max-w-2xl
            "
          >
            <Search
              size={20}
              className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2

              text-white/50
            "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, GST, Income Tax, TDS..."
              className="
                w-full

                pl-14
                pr-5
                py-4

                rounded-2xl

                bg-white/5

                border
                border-white/10

                text-white

                placeholder:text-white/40

                backdrop-blur-xl

                focus:outline-none

                focus:border-purple-400/50
              "
            />
          </motion.div>

          {/* Stats */}

          <div
            className="
            grid

            grid-cols-1
            sm:grid-cols-3

            gap-4

            mt-12
          "
          >
            <div
              className="
              rounded-2xl

              border
              border-white/10

              bg-white/5

              p-5
            "
            >
              <div className="flex items-center gap-3">
                <FileText size={22} className="text-purple-300" />

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {totalArticles}
                  </h3>

                  <p className="text-white/60 text-sm">Articles</p>
                </div>
              </div>
            </div>

            <div
              className="
              rounded-2xl

              border
              border-white/10

              bg-white/5

              p-5
            "
            >
              <div className="flex items-center gap-3">
                <BookOpen size={22} className="text-pink-300" />

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {totalCategories}
                  </h3>

                  <p className="text-white/60 text-sm">Categories</p>
                </div>
              </div>
            </div>

            <div
              className="
              rounded-2xl

              border
              border-white/10

              bg-white/5

              p-5
            "
            >
              <div className="flex items-center gap-3">
                <TrendingUp size={22} className="text-green-300" />

                <div>
                  <h3 className="text-2xl font-bold text-white">Updated</h3>

                  <p className="text-white/60 text-sm">Daily Insights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}

          <div
            className="
            w-36
            h-1

            rounded-full

            mt-10

            bg-gradient-to-r
            from-[#511D43]
            via-[#901E3E]
            to-[#C77DFF]
          "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeHero;
