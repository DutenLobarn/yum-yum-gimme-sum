import { ItemRow } from "@mandus/item-row";
import "./index.css";

export function MenuSection({ title, price, items, variant, onAddToCart }) {
  return (
    <div className="menu-section">
      {title && <ItemRow name={title} price={price} />}

      {variant === "list" && (
        <ul className="menu-list">
          {items.map((item) => (
            <li
              key={item.id}
              className="menu-item"
              onClick={() => onAddToCart(item)}
            >
              <ItemRow name={item.name} price={item.price} />
              {item.ingredients && (
                <p className="item-ingredients">
                  {item.ingredients.join(", ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {variant === "buttons" && (
        <div className="menu-buttons">
          {items.map((item) => (
            <button
              key={item.id}
              className="menu-button"
              onClick={() => onAddToCart(item)}
            >
              {item.name.toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
