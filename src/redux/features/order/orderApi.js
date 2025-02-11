import getBaseUrl from "../../../utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/order`,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    fetchUserOrders: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/create-order",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useFetchUserOrdersQuery } = orderApi;
export default orderApi;
