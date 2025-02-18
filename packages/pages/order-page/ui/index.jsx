import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../data/orderSlice";

export function OrderPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const apiKey = useSelector((state) => state.order.apiKey);
  const tenantName = useSelector((state) => state.order.tenantName);

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ items, tenantName, apiKey }))
      .unwrap()
      .then((result) => {
        console.log("Order result: ", result);
        // ex. navigera till /receipt/result.id
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>Beställning</h1>
      {/* Visa items etc. */}
      <button onClick={handlePlaceOrder}>Skicka beställning</button>
    </div>
  );
}
