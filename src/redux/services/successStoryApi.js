import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const successStoryApi = createApi({
  reducerPath: "successStoryApi",

  baseQuery: axiosBaseQuery,

  tagTypes: ["Stories"],

  endpoints: (builder) => ({
    getPublishedStories: builder.query({
      query: () => ({
        url: "/success-stories",
        method: "GET",
      }),
    }),

    getStoryById: builder.query({
      query: (id) => ({
        url: `/success-stories/${id}`,
        method: "GET",
      }),
    }),

    downloadStory: builder.mutation({
      query: (id) => ({
        url: `/success-stories/${id}/download`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPublishedStoriesQuery,
  useGetStoryByIdQuery,
  useDownloadStoryMutation,
} = successStoryApi;
