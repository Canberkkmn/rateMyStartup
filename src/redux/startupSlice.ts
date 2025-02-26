import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Startup {
  id: string;
  name: string;
  description: string;
  rating: number;
  votes: number;
}

interface StartupState {
  startups: Startup[];
  selectedStartup: Startup | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StartupState = {
  startups: [],
  selectedStartup: null,
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

export const fetchStartup = createAsyncThunk<
  Startup,
  string | string[] | undefined
>("startups/fetchStartup", async (id, { rejectWithValue }) => {
  try {
    if (!id) {
      throw new Error("Invalid startup ID");
    }

    const response = await fetch(`/api/startups/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch startup");
    }

    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

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
      })

      .addCase(fetchStartup.pending, (state) => {
        state.status = "loading";
        state.selectedStartup = null;
      })
      .addCase(
        fetchStartup.fulfilled,
        (state, action: PayloadAction<Startup>) => {
          state.status = "succeeded";
          state.selectedStartup = action.payload;
        }
      )
      .addCase(fetchStartup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.selectedStartup = null;
      });
  },
});

export const { addStartup } = startupSlice.actions;
export default startupSlice.reducer;
