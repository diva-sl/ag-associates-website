import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import Breadcrumb from "../../components/Breadcrumb";

import KnowledgeHero from "../../components/knowledgeCenter/KnowledgeHero";
import CategoryTabs from "../../components/knowledgeCenter/CategoryTabs";
import FeaturedArticles from "../../components/knowledgeCenter/FeaturedArticles";
import TrendingArticles from "../../components/knowledgeCenter/TrendingArticles";
import ArticleCard from "../../components/knowledgeCenter/ArticleCard";

import {
  useGetKnowledgePostsQuery,
  useGetCategoriesQuery,
} from "../../redux/services/knowledgeApi";
import KnowledgeNewsletter from "../../components/knowledgeCenter/KnowledgeNewsletter";

const POSTS_PER_PAGE = 9;

const KnowledgeCenter = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [page, setPage] = useState(1);

  const { data: postsData, isLoading } = useGetKnowledgePostsQuery({
    status: "published",
  });

  const { data: categoryData } = useGetCategoriesQuery();

  const articles = postsData?.data || [];

  const categories = categoryData?.data || [];

  const filteredArticles = useMemo(() => {
    let data = [...articles];

    if (activeCategory !== "all") {
      data = data.filter((item) => item?.category?.slug === activeCategory);
    }

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.excerpt?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [articles, search, activeCategory]);

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE) || 1;

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  return (
    <>
      <Helmet>
        <title>Knowledge Center | AG & Associates</title>

        <meta
          name="description"
          content="Expert articles on Income Tax, GST, TDS, Audit, Compliance, Accounting and Business Advisory."
        />
      </Helmet>

      {/* Hero */}

      <KnowledgeHero
        search={search}
        setSearch={setSearch}
        totalArticles={articles.length}
        totalCategories={categories.length}
      />

      {/* Featured */}

      <FeaturedArticles />

      {/* Categories */}

      <section className="relative py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onChange={(slug) => {
              setActiveCategory(slug);

              setPage(1);
            }}
          />
        </div>
      </section>

      {/* Latest Articles */}

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
            absolute
            left-1/2
            top-0

            -translate-x-1/2

            w-[700px]
            h-[700px]

            bg-purple-500/10

            blur-[180px]

            rounded-full
          "
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb current="Knowledge Center" />

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
            className="mb-12 mt-10"
          >
            <h2
              className="
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
              Latest Articles
            </h2>

            <p className="text-white/70 mt-4 text-lg">
              Explore the latest compliance updates, taxation insights and
              advisory knowledge.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="
                    h-[420px]

                    rounded-3xl

                    bg-white/5

                    border
                    border-white/10

                    animate-pulse
                  "
                />
              ))}
            </div>
          ) : (
            <>
              {paginatedArticles.length > 0 ? (
                <div
                  className="
                  grid
                  md:grid-cols-2
                  xl:grid-cols-3
                  gap-8
                "
                >
                  {paginatedArticles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
              ) : (
                <div
                  className="
                  rounded-[36px]

                  border
                  border-white/10

                  bg-white/[0.04]

                  backdrop-blur-2xl

                  p-16

                  text-center
                "
                >
                  <h3 className="text-2xl font-bold text-white">
                    No Articles Found
                  </h3>

                  <p className="text-white/60 mt-3">
                    Try changing category or search keyword.
                  </p>
                </div>
              )}

              {/* Pagination */}

              {totalPages > 1 && (
                <div
                  className="
                  flex
                  justify-center
                  gap-3

                  mt-14

                  flex-wrap
                "
                >
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={`
                          w-12
                          h-12

                          rounded-xl

                          transition

                          ${
                            page === index + 1
                              ? `
      bg-gradient-to-r
      from-blue-500
      to-purple-600
      text-white
      shadow-lg
      shadow-blue-500/20
    
                              `
                              : `
                                bg-white/5
                                border
                                border-white/10
                                text-white
                              `
                          }
                        `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Trending */}

      <TrendingArticles />

      {/* Newsletter CTA */}
      <KnowledgeNewsletter />
      {/* <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            className="
            rounded-[36px]

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            p-10
            md:p-16

            text-center
          "
          >
            <h2
              className="
              text-4xl
              md:text-5xl

              font-black
bg-gradient-to-r
from-blue-400
via-white
to-purple-400

              bg-clip-text
              text-transparent
            "
            >
              Stay Updated
            </h2>

            <p className="text-white/70 mt-5 max-w-2xl mx-auto">
              Get expert tax, GST, compliance and advisory insights delivered
              regularly.
            </p>
            <button
              className="
mt-8

```
w-full
md:w-auto

px-10
py-4

rounded-2xl

font-semibold
tracking-wide

text-white

bg-gradient-to-r
from-blue-500
to-purple-600

hover:from-blue-600
hover:to-purple-700

border
border-white/10

shadow-lg
shadow-blue-500/20

hover:shadow-blue-500/40
hover:-translate-y-1

transition-all
duration-300
```

"
            >
              Subscribe Updates{" "}
            </button>
          </div>
        </div> */}
    </>
  );
};

export default KnowledgeCenter;
