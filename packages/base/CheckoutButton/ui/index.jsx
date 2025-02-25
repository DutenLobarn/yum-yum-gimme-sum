import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "@mandus/slices";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function CheckoutButton({ cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = useSelector((state) => state.order.apiKey);
  const tenantName = useSelector((state) => state.order.tenantName);

  const handleCheckout = async () => {
    const itemsToSend = [];

    cartItems.forEach((cItem) => {
      for (let i = 0; i < cItem.count; i++) {
        itemsToSend.push(cItem.id);
      }
    });

    try {
      await dispatch(
        placeOrder({ items: itemsToSend, tenantName, apiKey })
      ).unwrap();
      navigate("/order");
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <button className="checkout-button" onClick={handleCheckout}>
      TAKE MY MONEY!
    </button>
  );
}
