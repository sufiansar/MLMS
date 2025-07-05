import { useGetBooksQuery } from "@/Redux/features/Book/baseApi";
import BookCard from "../Books/BookCard";
import type { IBook } from "@/Redux/features/Book/bookTypes";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  console.log("Books data:", data);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Books</h1>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading books</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((book: IBook) => (
            <BookCard key={book.isbn} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
