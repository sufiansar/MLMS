import { useState } from "react";
import { useGetPaginationBooksQuery } from "@/Redux/features/Book/baseApi";
import BookCard from "../Books/BookCard";
import type { IBook } from "@/Redux/features/Book/bookTypes";

const Books = () => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useGetPaginationBooksQuery({
    page,
    limit,
  });

  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Books</h1>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading books</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-4 py-2  rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="px-4 py-2  rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
