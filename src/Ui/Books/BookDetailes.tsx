"use client";

import { useParams } from "react-router";

import { BookOpen } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetSingleBookQuery } from "@/Redux/features/Book/baseApi";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.data) return <p>Error loading book</p>;

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold flex gap-2 items-center">
        <BookOpen className="w-6 h-6 text-blue-600" />
        {book.title}
      </h1>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium w-40">Author</TableCell>
            <TableCell>{book.author}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Genre</TableCell>
            <TableCell>{book.genre}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ISBN</TableCell>
            <TableCell>{book.isbn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Copies</TableCell>
            <TableCell>{book.copies}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Available</TableCell>
            <TableCell>{book.available ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BookDetails;
