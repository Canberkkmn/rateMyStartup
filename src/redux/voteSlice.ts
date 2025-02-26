import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStartup } from "./startupSlice";

interface VoteState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VoteState = {
  status: "idle",
  error: null,
};

export const voteForStartup = createAsyncThunk<
  void,
  { id?: string; rating: number },
  { dispatch: any }
>(
  "vote/voteForStartup",
  async ({ id, rating }, { dispatch, rejectWithValue }) => {
    try {
      if (!id) {
        throw new Error("Invalid startup ID");
      }

      const response = await fetch("/api/startups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vote");
      }

      dispatch(fetchStartup(id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(voteForStartup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voteForStartup.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(voteForStartup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default voteSlice.reducer;
