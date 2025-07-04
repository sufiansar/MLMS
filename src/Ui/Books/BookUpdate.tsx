import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateBookMutation } from "@/Redux/features/Book/bookApi";
import type { IBook } from "@/Redux/features/Book/bookTypes";
import toast from "react-hot-toast";

interface BookUpdateProps {
  book: IBook;
  onSuccess?: () => void;
}

const BookUpdate = ({ book, onSuccess }: BookUpdateProps) => {
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const form = useForm({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      isbn: book.isbn,
      copies: book.copies,
      available: book.available,
    },
  });

  useEffect(() => {
    form.reset({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      isbn: book.isbn,
      copies: book.copies,
      available: book.available,
    });
  }, [book, form]);

  const handleUpdate = async (data: any) => {
    try {
      await updateBook({
        _id: book._id,
        ...data,

        updatedAt: new Date(),
        createdAt: book.createdAt,
      }).unwrap();

      toast.success(`✅Book Updated successfully!`, {
        duration: 5000,
      });
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8 md:grid md:grid-cols-2 md:gap-x-6"
        onSubmit={form.handleSubmit(handleUpdate)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Author</FormLabel>
              <FormControl>
                <Input placeholder="Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Genre</FormLabel>
              <FormControl>
                <Input placeholder="Genre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">ISBN</FormLabel>
              <FormControl>
                <Input placeholder="ISBN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Copies"
                  {...field}
                  value={Number(field.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number(value) : 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookUpdate;
