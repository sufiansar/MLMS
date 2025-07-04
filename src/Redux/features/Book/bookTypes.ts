import type { JSX } from "react/jsx-runtime";

export interface IBook {
  map(arg0: (book: any) => JSX.Element): import("react").ReactNode;
  _id?: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type Genre =
  | "Fiction"
  | "Non-Fiction"
  | "Science"
  | "History"
  | "Biography"
  | "Fantasy"
  | "Mystery"
  | "Romance";
