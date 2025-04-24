import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/book`,
  credentials: "include",
});

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Book"],
    }),
    fetchSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    fetchBookTableData: builder.query({
      query: (page) => `/get-books-table/${page}`,
      providesTags: ["Book"],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: (formData) => ({
        url: `/update-book/${formData.get("_id")}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    fetchBannerImage: builder.query({
      query: () => "/banner/banner-image",
      providesTags: ["Book"],
    }),
    searchBook: builder.query({
      query: ({ title, page }) => `/search?title=${title}&page=${page}`,
      providesTags: ["Book"],
    }),
    fetchCartBooksDetails: builder.mutation({
      query: (items = []) => ({
        url: "/cart",
        method: "POST",
        body: items,
      }),
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useFetchBookTableDataQuery,
  useFetchBannerImageQuery,
  useSearchBookQuery,
  useFetchCartBooksDetailsMutation,
} = bookApi;

export default bookApi;
