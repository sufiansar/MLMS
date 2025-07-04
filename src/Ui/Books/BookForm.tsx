import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/Redux/features/Book/bookApi";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

export const Genre = {
  FICTION: "FICTION",
  NON_FICTION: "NON_FICTION",
  SCIENCE: "SCIENCE",
  HISTORY: "HISTORY",
  BIOGRAPHY: "BIOGRAPHY",
  FANTASY: "FANTASY",
} as const;

export type Genre = (typeof Genre)[keyof typeof Genre];

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: Genre;
  description?: string;
  isbn: string;
  copies: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookForm = () => {
  const [createBook, { isLoading }] = useAddBookMutation();

  const form = useForm<IBook>({
    defaultValues: {
      genre: Genre.NON_FICTION,
      author: "",
      description: "",
      isbn: "",
      copies: 0,
      available: true,
    },
  });

  const createBookHandler = async (values: IBook) => {
    const bookData: IBook = {
      ...values,
      copies: Number(values.copies),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await createBook(bookData).unwrap();
      toast.success(`✅Book Added successfully!`, {
        duration: 5000,
      });

      form.reset();
    } catch (err: any) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createBookHandler)}
          className="space-y-8 md:grid md:grid-cols-2 md:gap-x-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input required placeholder="Title" {...field} />
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
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input required placeholder="Author" {...field} />
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
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Genre.FICTION}>FICTION</SelectItem>
                    <SelectItem value={Genre.NON_FICTION}>
                      NON_FICTION
                    </SelectItem>
                    <SelectItem value={Genre.SCIENCE}>SCIENCE</SelectItem>
                    <SelectItem value={Genre.HISTORY}>HISTORY</SelectItem>
                    <SelectItem value={Genre.BIOGRAPHY}>BIOGRAPHY</SelectItem>
                    <SelectItem value={Genre.FANTASY}>Fantasy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input required placeholder="ISBN" {...field} />
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
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Copies"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
