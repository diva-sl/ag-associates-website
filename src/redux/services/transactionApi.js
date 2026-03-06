import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: axiosBaseQuery,

  endpoints: (builder) => ({
    /* CREATE ORDER */

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/transaction/create-order",
        method: "POST",
        body: data,
      }),
    }),

    /* VERIFY PAYMENT */

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/transaction/verify-payment",
        method: "POST",
        body: data,
      }),
    }),

    /* GET USER TRANSACTIONS */

    getTransactions: builder.query({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
    }),
    /* ================= BILLING HISTORY ================= */

    getBillingHistory: builder.query({
      query: () => ({
        url: "/transaction/history",
        method: "GET",
      }),
    }),

    /* ================= DOWNLOAD INVOICE ================= */

    downloadInvoice: builder.mutation({
      query: (id) => ({
        url: `/transaction/invoice/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetTransactionsQuery,
  useGetBillingHistoryQuery,
  useDownloadInvoiceMutation,
} = transactionApi;
