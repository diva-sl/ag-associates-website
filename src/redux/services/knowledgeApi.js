import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const knowledgeApi = createApi({
  reducerPath: "knowledgeApi",

  baseQuery: axiosBaseQuery,

  tagTypes: ["Knowledge"],

  endpoints: (builder) => ({
    /* ================= POSTS ================= */

    getKnowledgePosts: builder.query({
      query: (params = {}) => ({
        url: "/knowledge",
        method: "GET",
        params,
      }),

      providesTags: ["Knowledge"],
    }),

    getFeaturedPosts: builder.query({
      query: () => ({
        url: "/knowledge/featured",
        method: "GET",
      }),

      providesTags: ["Knowledge"],
    }),

    getTrendingPosts: builder.query({
      query: () => ({
        url: "/knowledge/trending",
        method: "GET",
      }),

      providesTags: ["Knowledge"],
    }),

    getArticle: builder.query({
      query: (slug) => ({
        url: `/knowledge/${slug}`,
        method: "GET",
      }),

      providesTags: ["Knowledge"],
    }),

    /* ================= CATEGORIES ================= */

    getCategories: builder.query({
      query: () => ({
        url: "/knowledge/categories",
        method: "GET",
      }),

      providesTags: ["Knowledge"],
    }),

    /* ================= ENGAGEMENT ================= */

    rateArticle: builder.mutation({
      query: ({ id, rating }) => ({
        url: `/knowledge/${id}/rate`,
        method: "POST",
        body: { rating },
      }),

      invalidatesTags: ["Knowledge"],
    }),

    markHelpful: builder.mutation({
      query: ({ id, helpful }) => ({
        url: `/knowledge/${id}/helpful`,
        method: "POST",
        body: { helpful },
      }),

      invalidatesTags: ["Knowledge"],
    }),

    askQuestion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/knowledge/${id}/question`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Knowledge"],
    }),
  }),
});

export const {
  useGetKnowledgePostsQuery,
  useGetFeaturedPostsQuery,
  useGetTrendingPostsQuery,
  useGetArticleQuery,
  useGetCategoriesQuery,

  useRateArticleMutation,
  useMarkHelpfulMutation,
  useAskQuestionMutation,
} = knowledgeApi;
