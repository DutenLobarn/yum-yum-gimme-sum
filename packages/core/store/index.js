import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@mandus/cart-page";
import { menuReducer } from "@mandus/menu-page";
import { orderReducer } from "@mandus/order-page";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export { store };
