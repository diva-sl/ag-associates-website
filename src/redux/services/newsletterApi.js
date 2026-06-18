import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",

  baseQuery: axiosBaseQuery,

  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
