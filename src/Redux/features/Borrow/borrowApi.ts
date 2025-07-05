import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowDetails) => ({
        url: "/borrow",
        method: "POST",
        body: borrowDetails,
      }),
      invalidatesTags: ["Borrow"],
    }),
    borrowBookSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useBorrowBookSummaryQuery } = brrowApi;
