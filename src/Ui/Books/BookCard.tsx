import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Trash2 } from "lucide-react";

import type { IBook } from "@/Redux/features/Book/bookTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import BookUpdate from "./BookUpdate";
import { useState } from "react";

import { Link } from "react-router";
import BorrowBook from "../BorrowBook/BorrowBook";
import toast from "react-hot-toast";
import { useDeleteBookMutation } from "@/Redux/features/Book/baseApi";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const [open, setOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = async () => {
    try {
      await deleteBook(book._id).unwrap();
      toast.success(`✅Book Deleted successfully!`, {
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to delete book. Please try again.");
      console.error("Failed to delete book:", error);
    }
  };
  return (
    <Card className="transition-shadow flex flex-col justify-between hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          {book.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          by {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        {book.description && (
          <p className="pt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {book.description}
          </p>
        )}
        <p>
          <span className="font-medium">Copies:</span> {book.copies}
        </p>
        <p
          className={`pt-2 text-sm font-medium
    ${
      book.copies <= 0
        ? "text-red-600 dark:text-red-400"
        : "text-green-600 dark:text-green-400"
    }
  `}
        >
          {book.copies <= 0
            ? "Unavailable"
            : ` ${book.copies > 1 ? "" : ""} Available`}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 lg:gap-4 w-full">
        <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setBorrowOpen(true)}
              className="w-full flex items-center justify-center gap-1"
            >
              Borrow
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Borrow Book</DialogTitle>
            </DialogHeader>
            <BorrowBook
              onSuccess={() => setBorrowOpen(false)}
              bookId={book._id || ""}
            />
          </DialogContent>
        </Dialog>

        <Link to={`/books/${book._id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Edit Book</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
            </DialogHeader>

            <BookUpdate book={book} onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Book</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <b>{book.title}</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
