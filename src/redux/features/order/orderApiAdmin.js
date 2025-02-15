import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/order`,
  credentials: "include",
  // Function to prepare headers for each request
  prepareHeaders: (headers) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    // If a token exists, set the authorization header with the Bearer token
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Return the modified headers
    return headers;
  },
});

const orderApiAdmin = createApi({
  reducerPath: "orderApiAdmin",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    manageOrders: builder.query({
      query: ({ page = 1 }) => {
        let queryParams = new URLSearchParams();
        queryParams.append("page", page);
        return `/manage-order?${queryParams.toString()}`;
      },
      providesTags: ["Order"],
    }),
  }),
});

export const { useManageOrdersQuery } = orderApiAdmin;
export default orderApiAdmin;
