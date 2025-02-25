import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@mandus/slices";

import "./index.css";

export function NewOrderButton({ children, className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(clearCart());
    navigate("/menu");
  };

  return (
    <button
      type="button"
      className={`new-order-button ${className || ""}`}
      onClick={handleClick}
    >
      {children || "GÖR EN NY BESTÄLLNING"}
    </button>
  );
}
