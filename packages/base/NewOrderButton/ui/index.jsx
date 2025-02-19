import "./index.css";

export function NewOrderButton({ onClick, children }) {
  return (
    <button type="button" className="new-order-button" onClick={onClick}>
      {children || "GÖR EN NY BESTÄLLNING"}
    </button>
  );
}
