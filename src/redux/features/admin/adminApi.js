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
  }),
});

export const {
  useLoginAdminMutation,
  useGetAdminQuery,
  useAdminLogoutMutation,
} = adminApi;
export default adminApi;
