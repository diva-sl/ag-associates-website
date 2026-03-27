import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    /* ================= PROFILE ================= */

    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    /* ================= AVATAR ================= */

    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "/auth/avatar",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    removeAvatar: builder.mutation({
      query: () => ({
        url: "/auth/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    /* ================= PASSWORD ================= */

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: "PUT",
        body: { password },
      }),
    }),
    /* ================= DOCUMENT ================= */
    getDocuments: builder.query({
      query: () => ({
        url: "/auth/documents",
        method: "GET",
      }),
    }),

    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/auth/upload-document",
        method: "POST",
        body: formData,
      }),
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/auth/document/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
