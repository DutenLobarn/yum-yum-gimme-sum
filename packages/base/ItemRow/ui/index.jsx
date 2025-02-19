import "./index.css";

/**
 * ItemRow visar t.ex.:
 * "Karlstad ......... 9 SEK"
 *
 * Props:
 *  - name: string
 *  - price: number
 *  - onClick: valfritt (ex. för att klicka på row)
 */
export function ItemRow({ name, price, onClick }) {
  return (
    <div className="item-row" onClick={onClick}>
      <h3 className="item-name">{name}</h3>
      <div className="dots"></div>
      <span className="item-price">{price} SEK</span>
    </div>
  );
}
