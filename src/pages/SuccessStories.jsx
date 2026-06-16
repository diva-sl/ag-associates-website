import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import LegalBanner from "../components/LegalBanner";
import Breadcrumb from "../components/Breadcrumb";

import { useGetPublishedStoriesQuery } from "../redux/services/successStoryApi";

const SuccessStories = () => {
  const navigate = useNavigate();

  const { data: stories = [], isLoading } = useGetPublishedStoriesQuery();

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(stories.map((story) => story.category).filter(Boolean)),
    ];
  }, [stories]);

  const featuredStories = useMemo(() => {
    return stories.filter((story) => story.featured);
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        story.title?.toLowerCase().includes(search.toLowerCase()) ||
        story.industry?.toLowerCase().includes(search.toLowerCase()) ||
        story.location?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "All" || story.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [stories, search, category]);

  return (
    <>
      <Helmet>
        <title>Success Stories | AG & Associates</title>

        <meta
          name="description"
          content="Explore real client success stories, GST compliance wins, tax planning achievements, and business transformation case studies from AG & Associates."
        />
      </Helmet>

      <LegalBanner title="Success Stories" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb current="Success Stories" />

          {/* HERO */}

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white mb-6">
              <TrendingUp size={18} />
              Real Client Results
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Business Success
              <span className="block text-[#E6C06B]">
                Through Expert Advisory
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-white/70 text-lg leading-relaxed">
              Discover how AG & Associates helped businesses improve compliance,
              optimize taxation, streamline GST operations and unlock growth
              opportunities.
            </p>
          </div>

          {/* FEATURED STORIES */}

          {featuredStories.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-8">
                <Star className="text-yellow-400" fill="currentColor" />

                <h2 className="text-3xl font-bold text-white">
                  Featured Success Stories
                </h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-20">
                {featuredStories.map((story) => (
                  <motion.div
                    key={story._id}
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 cursor-pointer"
                    onClick={() => navigate(`/success-stories/${story._id}`)}
                  >
                    <div className="relative">
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-60 object-cover"
                      />

                      <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        FEATURED
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {story.title}
                      </h3>

                      <p className="text-white/70 mb-5 line-clamp-3">
                        {story.industry}
                      </p>

                      <button className="flex items-center gap-2 text-[#E6C06B] font-medium">
                        View Case Study
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* SEARCH + FILTER */}

          <div className="bg-white rounded-3xl p-5 mb-10">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search stories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-xl pl-11 pr-4 py-3"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-xl px-4 py-3"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          {/* STORIES GRID */}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-3xl overflow-hidden animate-pulse"
                >
                  <div className="h-56 bg-white/10" />

                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-white/10 rounded" />

                    <div className="h-4 bg-white/10 rounded w-3/4" />

                    <div className="h-4 bg-white/10 rounded w-1/2" />

                    <div className="h-10 bg-white/10 rounded-xl mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center">
              <h3 className="text-2xl font-bold mb-3">
                No Success Stories Found
              </h3>

              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <motion.div
                  key={story._id}
                  whileHover={{
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
                  onClick={() => navigate(`/success-stories/${story._id}`)}
                >
                  {/* IMAGE */}

                  <div className="relative overflow-hidden">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#511D43] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {story.category}
                      </span>

                      {story.featured && (
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {story.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      {story.industry && (
                        <div className="flex items-center gap-2">
                          <Building2 size={15} />
                          {story.industry}
                        </div>
                      )}

                      {story.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={15} />
                          {story.location}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 line-clamp-3 mb-6">
                      {story.challenge ||
                        story.solution ||
                        "Read how AG & Associates helped transform this business through expert tax and compliance solutions."}
                    </p>

                    {/* METRICS */}

                    {story.metrics?.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {story.metrics.slice(0, 2).map((metric, index) => (
                          <div
                            key={index}
                            className="bg-slate-50 rounded-xl p-3"
                          >
                            <div className="font-bold text-[#511D43]">
                              {metric.value}
                            </div>

                            <div className="text-xs text-slate-500">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}

                    <button className="w-full flex items-center justify-center gap-2 bg-[#511D43] hover:bg-[#6b2558] text-white py-3 rounded-xl transition">
                      Read Case Study
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SuccessStories;
