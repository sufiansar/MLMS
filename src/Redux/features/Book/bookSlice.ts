import { createSlice } from "@reduxjs/toolkit";
import type { IBook } from "./bookTypes";

interface InitialState {
  book: IBook[];
}

const initialState: InitialState = {
  book: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
