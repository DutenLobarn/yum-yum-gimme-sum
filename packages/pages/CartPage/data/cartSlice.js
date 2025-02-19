// packages/pages/cart-page/data/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsById: {}, // ny struktur: { "1": { id:1, name:"Karlstad", price:9, count:2 }, ... }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let item = action.payload;

      // const paddedId = String(item.id).padStart(8, "0");
      // // ex: "1" blir "00000001"

      item = {
        ...item,
        // id: paddedId,
      };
      if (!state.itemsById[item.id]) {
        state.itemsById[item.id] = { ...item, count: 1 };
      } else {
        state.itemsById[item.id].count += 1;
      }
    },

    removeOne: (state, action) => {
      const id = action.payload;
      const cartItem = state.itemsById[id];
      if (cartItem) {
        // Minska count om den är > 0
        if (cartItem.count > 0) {
          cartItem.count -= 1;
        }
        // OBS: Vi tar inte bort varan om count=0
        // Den finns kvar i itemsById men har count=0
      }
    },

    clearCart: (state) => {
      state.itemsById = {};
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItem, removeOne, clearCart } = cartSlice.actions;
