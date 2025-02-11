import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Startup {
  id: string;
  name: string;
  description: string;
  rating: number;
}

interface StartupsState {
  startups: Startup[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StartupsState = {
  startups: [],
  status: "idle",
  error: null,
};

export const fetchStartups = createAsyncThunk(
  "startups/fetchStartups",
  async () => {
    const response = await fetch("/api/startups");
    if (!response.ok) {
      throw new Error("Failed to fetch startups");
    }
    return response.json();
  }
);

const startupSlice = createSlice({
  name: "startups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchStartups.fulfilled,
        (state, action: PayloadAction<Startup[]>) => {
          state.status = "succeeded";
          state.startups = action.payload;
        }
      )
      .addCase(fetchStartups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default startupSlice.reducer;
