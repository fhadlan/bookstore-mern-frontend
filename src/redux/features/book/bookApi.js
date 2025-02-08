import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/book`,
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
      query: (id) => `/${id}`,
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
      query: ({ _id, ...rest }) => ({
        url: `/update-book/${_id}`,
        method: "PUT",
        body: rest,
        headers: {
          contentType: "application/json",
        },
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
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useFetchBookTableDataQuery,
} = bookApi;

export default bookApi;
