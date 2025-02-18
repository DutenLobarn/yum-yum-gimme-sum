import { createBrowserRouter, Navigate } from "react-router-dom";
import { MenuPage } from "@mandus/menu-page";
import { CartPage } from "@mandus/cart-page";
import { OrderPage } from "@mandus/order-page";
import { ReceiptPage } from "@mandus/receipt-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/menu" replace />,
  },
  {
    path: "/menu",
    element: <MenuPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/receipt/:orderId",
    element: <ReceiptPage />,
  },
]);

export { router };
