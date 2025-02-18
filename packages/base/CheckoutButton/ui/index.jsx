import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "@mandus/order-page"; // eller var du har placeOrder
import { useNavigate } from "react-router-dom";
import "./index.css";

export function CheckoutButton({ cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiKey = useSelector((state) => state.order.apiKey);
  const tenantName = useSelector((state) => state.order.tenantName);

  const handleCheckout = async () => {
    // 1) Om du behöver flat array av items
    const itemsToSend = [];
    cartItems.forEach((cItem) => {
      for (let i = 0; i < cItem.count; i++) {
        // itemsToSend.push({
        //   id: cItem.id,
        //   type: cItem.type, // Viktigt
        //   name: cItem.name,
        //   description: cItem.description,
        //   price: cItem.price,
        //   ingredients: cItem.ingredients, // om wonton
        // });
        itemsToSend.push(cItem.id); // enbart id
      }
    });

    // 2) dispatch placeOrder, sedan navigate
    await dispatch(
      placeOrder({ items: itemsToSend, tenantName, apiKey })
    ).unwrap();

    // 3) navigera till /order
    navigate("/order");
  };

  return (
    <button className="checkout-button" onClick={handleCheckout}>
      TAKE MY MONEY!
    </button>
  );
}
