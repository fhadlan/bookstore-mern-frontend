import getBaseUrl from "../../../utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../../firebase/firebase.config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/order`,
  credentials: "include",
  prepareHeaders: async (headers) => {
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
      query: ({ id, page }) => `/${id}/${page}`,
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
    cancelOrder: builder.mutation({
      query: (_id) => ({
        url: `/cancel-order/${_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchUserOrdersQuery,
  useCancelOrderMutation,
} = orderApi;
export default orderApi;
