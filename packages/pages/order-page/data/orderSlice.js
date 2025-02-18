import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Hämta API-nyckel
export const fetchApiKey = createAsyncThunk("order/fetchApiKey", async () => {
  const resp = await fetch(
    "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
    }
  );
  const data = await resp.json();
  return data.key; // ex. "yum-7BTxHCyHhzI"
});

// Skapa tenant
export const createTenant = createAsyncThunk(
  "order/createTenant",
  async ({ tenantName, apiKey }) => {
    const resp = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
        body: JSON.stringify({ name: tenantName }),
      }
    );
    const data = await resp.json();
    if (!resp.ok) {
      console.log("Server error:", resp.status, data);
      throw new Error(data.message || "Tenant creation failed");
    }
    return data;
  }
);

// Lägg order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ items, tenantName, apiKey }) => {
    const resp = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantName}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
        body: JSON.stringify({ items }),
      }
    );
    return await resp.json(); // { id, orderValue, eta, ... }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    apiKey: null,
    tenantName: "mandus-yum-truck-" + Date.now(), // unikt
    tenantCreated: false,
    orderResult: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchApiKey
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.apiKey = action.payload;
      })
      // createTenant
      .addCase(createTenant.fulfilled, (state, action) => {
        state.tenantCreated = true;
        // spara ex. action.payload.id om du vill
      })
      // placeOrder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderResult = action.payload; // { id, orderValue, eta, ... }
      });
  },
});

export const orderReducer = orderSlice.reducer;
