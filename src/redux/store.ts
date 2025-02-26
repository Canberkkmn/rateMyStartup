import { configureStore } from "@reduxjs/toolkit";
import startupReducer from "./startupSlice";
import commentReducer from "./commentSlice";
import voteReducer from "./voteSlice";

export const store = configureStore({
  reducer: {
    startups: startupReducer,
    comments: commentReducer,
    votes: voteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
