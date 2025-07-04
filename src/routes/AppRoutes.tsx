import App from "@/App";
import BookDetailes from "@/Ui/Books/BookDetailes";
import BookForm from "@/Ui/Books/BookForm";

import BorrowSummary from "@/Ui/BorrowBook/BorrowBookSummary";
import Books from "@/Ui/Pages/Books";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "", element: <Books /> },
      { path: "/books", element: <Books /> },
      {
        path: "/create-book",
        element: <BookForm />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
      { path: "/books/:id", element: <BookDetailes /> },
    ],
  },
]);
