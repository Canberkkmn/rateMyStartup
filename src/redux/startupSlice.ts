import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Startup {
  id: number;
  name: string;
  description: string;
  rating: number;
}

interface StartupState {
  startups: Startup[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StartupState = {
  startups: [],
  status: "idle",
  error: null,
};

export const fetchStartups = createAsyncThunk<Startup[]>(
  "startups/fetchStartups",
  async () => {
    const response = await fetch("/api/startups");
    
    return response.json();
  }
);

const startupSlice = createSlice({
  name: "startups",
  initialState,
  reducers: {
    addStartup: (state, action: PayloadAction<Startup>) => {
      state.startups.push(action.payload);
    },
  },
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
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { addStartup } = startupSlice.actions;
export default startupSlice.reducer;
