import { useDispatch } from "react-redux";
import { addItem, removeOne } from "@mandus/slices";
import { ItemRow } from "@mandus/item-row";
import "./index.css";

export function CartList({ cartItems }) {
  const dispatch = useDispatch();

  return (
    <ul className="cart-list">
      {cartItems.map((item) => {
        const linePrice = item.price * item.count;

        return (
          <li key={item.id} className="cart-item-row">
            <ItemRow name={item.name} price={linePrice} />
            <div className="cart-buttons">
              <button onClick={() => dispatch(removeOne(item.id))}>-</button>
              <span>{item.count}</span>
              <button onClick={() => dispatch(addItem(item))}>+</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
