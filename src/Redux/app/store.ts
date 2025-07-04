import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../features/Book/bookApi";
import { brrowApi } from "../features/Borrow/borrowApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [brrowApi.reducerPath]: brrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(brrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
