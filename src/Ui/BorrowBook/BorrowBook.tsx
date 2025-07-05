import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/Redux/features/Book/baseApi";

import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface BorrowBookProps {
  bookId: string;
  onSuccess?: () => void;
}

const BorrowBook = ({ bookId, onSuccess }: BorrowBookProps) => {
  const [borrow, { isLoading }] = useBorrowBookMutation();

  const form = useForm({
    defaultValues: {
      dueDate: "",
      quantity: 0,
    },
  });

  const handleBorrow = async (data: any) => {
    try {
      const payload = {
        book: bookId,
        quantity: Number(data.quantity),
        dueDate: data.dueDate,
      };

      await borrow(payload).unwrap();
      toast.success(`✅ " Borrowed Book successfully!`, {
        duration: 5000,
      });

      onSuccess?.();
      form.reset();
    } catch (error) {
      toast.error("Failed to borrow book. Please try again.");
      console.error("Failed to borrow book:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleBorrow)} className="space-y-4">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BorrowBook;
