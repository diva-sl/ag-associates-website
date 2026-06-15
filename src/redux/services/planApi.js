import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const planApi = createApi({
  reducerPath: "planApi",

  baseQuery: axiosBaseQuery,

  tagTypes: ["Plans"],

  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),

      providesTags: ["Plans"],
    }),
  }),
});

export const { useGetPlansQuery } = planApi;
