import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const legalApi = createApi({
  reducerPath: "legalApi",

  baseQuery: axiosBaseQuery,

  tagTypes: ["Legal"],

  endpoints: (builder) => ({
    getLegalPage: builder.query({
      query: (page) => ({
        url: `/legal/${page}`,
        method: "GET",
      }),

      providesTags: ["Legal"],
    }),
  }),
});

export const { useGetLegalPageQuery } = legalApi;
