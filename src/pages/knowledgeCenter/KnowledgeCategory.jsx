import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ArticleCard from "../../components/knowledgeCenter/ArticleCard";

import {
  useGetKnowledgePostsQuery,
  useGetCategoriesQuery,
} from "../../redux/services/knowledgeApi";

const KnowledgeCategory = () => {
  const { slug } = useParams();

  const { data: categoryData } = useGetCategoriesQuery();

  const { data: postsData } = useGetKnowledgePostsQuery({
    status: "published",
  });

  const category = categoryData?.data?.find((item) => item.slug === slug);

  const articles =
    postsData?.data?.filter((item) => item?.category?.slug === slug) || [];

  return (
    <>
      <Helmet>
        <title>{category?.name} | Knowledge Center | AG & Associates</title>

        <meta name="description" content={category?.description} />
      </Helmet>

      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero */}

          <div
            className="
            rounded-[36px]

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-2xl

            p-8
            md:p-14

            text-center
          "
          >
            <span
              className="
              inline-flex

              px-5
              py-2

              rounded-full

              text-white

              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
            "
            >
              Category
            </span>

            <h1
              className="
              mt-6

              text-5xl

              font-black

              bg-gradient-to-r
              from-white
              via-purple-100
              to-pink-200

              bg-clip-text
              text-transparent
            "
            >
              {category?.name}
            </h1>

            <p className="text-white/70 mt-5 max-w-3xl mx-auto">
              {category?.description}
            </p>

            <div className="mt-6 text-white/50">{articles.length} Articles</div>
          </div>

          {/* Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Empty */}

          {articles.length === 0 && (
            <div
              className="
              mt-14

              rounded-[36px]

              border
              border-white/10

              bg-white/[0.04]

              backdrop-blur-2xl

              p-16

              text-center

              text-white/60
            "
            >
              No articles available in this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KnowledgeCategory;
