import { useMemo } from "react";

import { useParams, Link, Navigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  Download,
  Building2,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  Quote,
  TrendingUp,
} from "lucide-react";

import { Helmet } from "react-helmet";

import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

import { useSelector } from "react-redux";

import {
  useGetStoryByIdQuery,
  useGetPublishedStoriesQuery,
  useDownloadStoryMutation,
} from "@/redux/services/successStoryApi";

const SuccessStoryDetails = () => {
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth);

  const { data: story, isLoading } = useGetStoryByIdQuery(id);

  const { data: stories = [] } = useGetPublishedStoriesQuery();

  const [downloadStory] = useDownloadStoryMutation();

  const relatedStories = useMemo(() => {
    return stories
      .filter((item) => item._id !== id && item.category === story?.category)
      .slice(0, 3);
  }, [stories, story, id]);

  const handleDownload = async () => {
    if (!token) {
      alert("Please login to download the case study PDF");
      return;
    }

    try {
      const response = await downloadStory(id).unwrap();

      window.open(response.downloadUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#130913] flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!story) {
    return <Navigate to="/success-stories" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{story.title} | AG & Associates</title>

        <meta name="description" content={story.challenge?.slice(0, 150)} />
      </Helmet>

      <LegalBanner title="Client Success Story" />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb current={story.title} />

          {/* BACK */}

          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 text-white mb-8"
          >
            <ArrowLeft size={18} />
            Back to Success Stories
          </Link>

          {/* HERO */}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-flex px-4 py-2 rounded-full bg-[#511D43] text-white text-sm mb-4">
                {story.category}
              </span>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {story.title}
              </h1>

              <div className="flex flex-wrap gap-5 mt-6 text-white/70">
                {story.industry && (
                  <div className="flex items-center gap-2">
                    <Building2 size={18} />
                    {story.industry}
                  </div>
                )}

                {story.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {story.location}
                  </div>
                )}

                {story.companySize && (
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    {story.companySize}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="mt-8 bg-white text-[#511D43] px-6 py-3 rounded-xl flex items-center gap-2 font-semibold hover:scale-105 transition"
              >
                <Download size={18} />
                Download Full Case Study
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img
                src={story.coverImage}
                alt={story.title}
                className="rounded-3xl w-full h-[420px] object-cover shadow-2xl"
              />
            </motion.div>
          </div>

          {/* METRICS */}

          {story.metrics?.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {story.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 text-center shadow-lg"
                >
                  <div className="text-3xl font-bold text-[#511D43]">
                    {metric.value}
                  </div>

                  <div className="text-slate-500 mt-2">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* CHALLENGE */}

          <div className="bg-white rounded-3xl p-8 mt-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Business Challenge</h2>

            <p className="leading-8 text-slate-700">{story.challenge}</p>
          </div>

          {/* SOLUTION */}

          <div className="bg-white rounded-3xl p-8 mt-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">
              AG & Associates Solution
            </h2>

            <p className="leading-8 text-slate-700">{story.solution}</p>
          </div>

          {/* IMPLEMENTATION */}

          {story.implementation && (
            <div className="bg-white rounded-3xl p-8 mt-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">
                Implementation Strategy
              </h2>

              <p className="leading-8 text-slate-700">{story.implementation}</p>
            </div>
          )}

          {/* OUTCOME */}

          <div className="bg-gradient-to-r from-[#511D43] to-[#901E3E] rounded-3xl p-8 mt-8 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp />
              <h2 className="text-3xl font-bold">Business Outcome</h2>
            </div>

            <p className="leading-8 text-white/90">{story.outcome}</p>
          </div>

          {/* TESTIMONIAL */}

          {story.testimonial?.quote && (
            <div className="bg-white rounded-3xl p-8 mt-8 shadow-lg">
              <Quote size={40} className="text-[#511D43] mb-4" />

              <p className="text-xl italic leading-9 text-slate-700">
                "{story.testimonial.quote}"
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-lg">{story.testimonial.name}</h4>

                <p className="text-slate-500">
                  {story.testimonial.designation}
                </p>

                <p className="text-slate-500">{story.testimonial.company}</p>
              </div>
            </div>
          )}

          {/* SERVICES */}

          {story.services && (
            <div className="bg-white rounded-3xl p-8 mt-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Services Delivered</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {story.services.split(",").map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500" />

                    {service.trim()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RELATED STORIES */}

          {relatedStories.length > 0 && (
            <div className="mt-20">
              <h2 className="text-4xl font-bold text-white mb-10">
                Related Success Stories
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedStories.map((item) => (
                  <Link
                    key={item._id}
                    to={`/success-stories/${item._id}`}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="font-bold text-lg">{item.title}</h3>

                      <p className="text-slate-500 mt-2">{item.industry}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SuccessStoryDetails;
