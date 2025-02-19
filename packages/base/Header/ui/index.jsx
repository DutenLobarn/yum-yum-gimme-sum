import { useNavigate } from "react-router-dom";
import Group6 from "../../../../src/assets/Group 6.svg";
import Group7 from "../../../../src/assets/Group 7.svg";
import Union from "../../../../src/assets/Union.svg";
import "./index.css";

export function Header({ cartCount, showCart = true, showBadge = true }) {
  const navigate = useNavigate();

  return (
    <header className="menu-header">
      <img src={Group6} alt="Logga" />

      {showCart && (
        <div className="cart-wrapper" onClick={() => navigate("/cart")}>
          <img src={Group7} alt="Cart icon background" className="cart-icon" />
          {showBadge && cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}

          <img src={Union} alt="Cart icon" className="union-icon" />
        </div>
      )}
    </header>
  );
}
