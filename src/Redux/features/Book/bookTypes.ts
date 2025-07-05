export interface IBook {
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
