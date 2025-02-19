import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsById: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let item = action.payload;

      item = {
        ...item,
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
        if (cartItem.count > 0) {
          cartItem.count -= 1;
        }

        // Jag la till denna för man vill ta bort dom, därför lägger jag till detta:
        if (cartItem.count <= 0) {
          delete state.itemsById[id];
        }
      }
    },

    clearCart: (state) => {
      state.itemsById = {};
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItem, removeOne, clearCart } = cartSlice.actions;
