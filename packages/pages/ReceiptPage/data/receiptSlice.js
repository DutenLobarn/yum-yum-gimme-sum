// packages/pages/receipt-page/data/receiptSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Hämta kvitto
export const fetchReceipt = createAsyncThunk(
  "receipt/fetchReceipt",
  async (receiptId, thunkAPI) => {
    // ev. hämta apiKey från store om behövs
    const state = thunkAPI.getState();
    const apiKey = state.order.apiKey;

    const resp = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${receiptId}`,
      {
        headers: {
          "x-zocom": apiKey,
        },
      }
    );
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || "Failed to fetch receipt");
    }
    return data; // ex. { id, orderValue, items, timestamp, ... }
  }
);

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    receipt: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceipt.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReceipt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.receipt = action.payload.receipt; // { id, orderValue, items, ... }
      })
      .addCase(fetchReceipt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const receiptReducer = receiptSlice.reducer;
