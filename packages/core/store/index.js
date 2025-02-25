import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@mandus/slices";
import { menuReducer } from "@mandus/slices";
import { orderReducer } from "@mandus/slices";
import { receiptReducer } from "@mandus/slices";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
    receipt: receiptReducer,
  },
});

export { store };
