import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@mandus/cart-page";
import { menuReducer } from "@mandus/menu-page";
import { orderReducer } from "@mandus/order-page";
import { receiptReducer } from "@mandus/receipt-page";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
    receipt: receiptReducer,
  },
});

export { store };
