import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/order`,
  credentials: "include",
});

const orderApiAdmin = createApi({
  reducerPath: "orderApiAdmin",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    manageOrders: builder.query({
      query: ({ id, status, name, page = 1 }) => {
        let queryParams = new URLSearchParams();
        queryParams.append("page", page);
        status && queryParams.append("status", status);
        id && queryParams.append("id", id);
        name && queryParams.append("name", name);
        return `/manage-order?${queryParams.toString()}`;
      },
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useManageOrdersQuery, useUpdateOrderStatusMutation } =
  orderApiAdmin;
export default orderApiAdmin;
