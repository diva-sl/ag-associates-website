import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import Breadcrumb from "../../components/Breadcrumb";

import ArticleContent from "../../components/knowledgeCenter/ArticleContent";
import ArticleRating from "../../components/knowledgeCenter/ArticleRating";
import ArticleHelpful from "../../components/knowledgeCenter/ArticleHelpful";
import ArticleQuestions from "../../components/knowledgeCenter/ArticleQuestions";
import RelatedArticles from "../../components/knowledgeCenter/RelatedArticles";
import ArticleSidebar from "../../components/knowledgeCenter/ArticleSidebar";
import KnowledgeNewsletter from "../../components/knowledgeCenter/KnowledgeNewsletter";

import {
  useGetArticleQuery,
  useGetCategoriesQuery,
  useGetTrendingPostsQuery,
} from "../../redux/services/knowledgeApi";

const KnowledgeArticle = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetArticleQuery(slug);

  const { data: categoryData } = useGetCategoriesQuery();

  const { data: trendingData } = useGetTrendingPostsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  const article = data?.data?.post;

  const related = data?.data?.related || [];

  const questions = data?.data?.questions || [];

  return (
    <>
      <Helmet>
        <title>
          {article?.seoTitle || article?.title}
          {" | "}
          AG & Associates
        </title>

        <meta name="description" content={article?.seoDescription} />

        <meta name="keywords" content={article?.seoKeywords?.join(",")} />
      </Helmet>

      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb current={article?.title} />

          <div className="grid lg:grid-cols-12 gap-10 mt-8">
            {/* Main */}

            <div className="lg:col-span-8 space-y-8">
              {/* Header */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                rounded-[36px]
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-2xl
                p-8
              "
              >
                <span
                  className="
                  inline-flex

                  px-4
                  py-2

                  rounded-full

                  text-sm

                  bg-gradient-to-r
                  from-[#511D43]
                  to-[#901E3E]

                  text-white
                "
                >
                  {article?.category?.name}
                </span>

                <h1
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
                  {article?.title}
                </h1>

                <p className="text-white/70 mt-6 text-lg">{article?.excerpt}</p>

                <div className="flex flex-wrap gap-5 mt-6 text-white/60 text-sm">
                  <span>
                    {article?.readingTime}
                    min read
                  </span>

                  <span>
                    {article?.views}
                    views
                  </span>

                  <span>
                    {new Date(article?.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>

              {/* Featured Image */}

              {article?.featuredImage && (
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="
                  w-full

                  rounded-[36px]

                  border
                  border-white/10
                "
                />
              )}

              {/* Content */}

              <ArticleContent content={article?.content} />

              {/* Rating */}

              <ArticleRating
                articleId={article?._id}
                currentRating={article?.averageRating}
              />

              {/* Helpful */}

              <ArticleHelpful
                articleId={article?._id}
                helpfulCount={article?.helpfulCount}
                notHelpfulCount={article?.notHelpfulCount}
              />

              {/* Questions */}

              <ArticleQuestions
                articleId={article?._id}
                questions={questions}
              />

              {/* Related */}

              <RelatedArticles articles={related} />
            </div>

            {/* Sidebar */}

            <div className="lg:col-span-4">
              <ArticleSidebar
                categories={categoryData?.data || []}
                trending={trendingData?.data || []}
              />
            </div>
          </div>
        </div>
      </section>

      <KnowledgeNewsletter />
    </>
  );
};

export default KnowledgeArticle;
