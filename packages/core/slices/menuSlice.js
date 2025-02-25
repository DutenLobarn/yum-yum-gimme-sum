import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async (apiKey) => {
  const resp = await fetch(
    "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
    {
      headers: { "x-zocom": apiKey },
    }
  );
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.message || "Failed to fetch menu");
  }
  return data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.items = [];
      });
  },
});

export const menuReducer = menuSlice.reducer;
