import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBorrowBookSummaryQuery } from "@/Redux/features/Borrow/borrowApi";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useBorrowBookSummaryQuery(undefined);
  console.log("Borrow Summary Data:", data);

  if (isLoading) return <p>Loading summary...</p>;
  if (isError) return <p className="text-red-500">Error loading summary</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-right">
              Total Quantity Borrowed
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.summary.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell className="font-semibold">{book.book.title}</TableCell>
              <TableCell>{book.book.isbn}</TableCell>
              <TableCell className="text-right font-semibold">
                {book.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
