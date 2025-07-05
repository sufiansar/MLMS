import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getPaginationBooks: builder.query({
      query: ({ page, limit }) => `/books?page=${page}&limit=${limit}`,
      providesTags: ["Book"],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...updatedBook }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (_id) => ({
        url: `/books/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    getSingleBook: builder.query({
      query: (_id) => `/books/${_id}`,
      providesTags: ["Book"],
    }),
    borrowBook: builder.mutation({
      query: (borrowDetails) => ({
        url: "/borrow",
        method: "POST",
        body: borrowDetails,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),
    borrowBookSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["Borrow", "Book"],
    }),
  }),
});

export const {
  useGetPaginationBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useBorrowBookSummaryQuery,
} = baseApi;
