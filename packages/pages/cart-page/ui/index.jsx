// packages/pages/cart-page/ui/index.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../data/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Räkna ut totalpris, om du vill
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} kr
            <button onClick={() => handleRemove(item.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
      <p>Totalt: {total} kr</p>
    </div>
  );
}

export { CartPage };
