import { useSelector, useDispatch } from "react-redux";
import { Header } from "@mandus/header";
import { MenuContainer } from "@mandus/menu-container";
import { clearCart } from "@mandus/cart-page";
import { useNavigate } from "react-router-dom";
import "./index.css";

export function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderResult = useSelector((state) => state.order.orderResult);

  if (!orderResult) {
    return <p>Ingen beställning funnen...</p>;
  }

  const handleNewOrder = () => {
    dispatch(clearCart());
    navigate("/menu");
  };

  const handleReceipt = () => {
    navigate(`/receipt/${orderResult.id}`);
  };

  const now = new Date();
  const etaTime = new Date(orderResult.eta);
  const diffMs = etaTime - now;
  const diffMin = Math.max(0, Math.round(diffMs / 60000));

  return (
    <MenuContainer bgType="order">
      <Header cartCount={0} showCart={false} />
      <div className="order-box">
        <h2 className="order-heading">DINA WONTONS TILLAGAS!</h2>
        <p className="order-eta">ETA {diffMin} MIN</p>
        <p className="order-id">#{orderResult.id}</p>

        <button
          className="order-button new-order-button"
          onClick={handleNewOrder}
        >
          GÖR EN NY BESTÄLLNING
        </button>
        <button className="order-button receipt-button" onClick={handleReceipt}>
          SE KVITTO
        </button>
      </div>
    </MenuContainer>
  );
}
