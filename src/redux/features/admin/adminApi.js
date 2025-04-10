import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/user`,
  credentials: "include",
});

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getAdmin: builder.query({
      query: () => "/dashboard",
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: ({ page = 1, search = "" }) =>
        `/users?page=${page}&search=${search}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/create-user",
        method: "POST",
        body: data,
      }),
    }),
    changePasswordAdmin: builder.mutation({
      query: (data) => ({
        url: "/change-password-admin",
        method: "PUT",
        body: data,
      }),
    }),
    patchAdminStatus: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `/patch-admin-status/${id}`,
        method: "PATCH",
        body: { isAdmin },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetAdminQuery,
  useAdminLogoutMutation,
  useCreateUserMutation,
  useChangePasswordAdminMutation,
  useGetUsersQuery,
  usePatchAdminStatusMutation,
} = adminApi;

export default adminApi;
