import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PageContainer } from "@mandus/page-container";
import { Header } from "@mandus/header";
import { NewOrderButton } from "@mandus/new-order-button";

import "./index.css";

export function OrderPage() {
  const navigate = useNavigate();
  const orderResult = useSelector((state) => state.order.orderResult);

  if (!orderResult) {
    return <p>Ingen beställning funnen...</p>;
  }

  const handleReceipt = () => {
    navigate(`/receipt/${orderResult.id}`);
  };

  const now = new Date();
  const etaTime = new Date(orderResult.eta);
  const diffMs = etaTime - now;
  const diffMin = Math.max(0, Math.round(diffMs / 60000));

  return (
    <PageContainer bgType="order">
      <Header cartCount={0} showCart={false} />
      <div className="order-box">
        <h2 className="order-heading">DINA WONTONS TILLAGAS!</h2>
        <p className="order-eta">ETA {diffMin} MIN</p>
        <p className="order-id">#{orderResult.id}</p>

        <NewOrderButton />

        <button className="receipt-button" onClick={handleReceipt}>
          SE KVITTO
        </button>
      </div>
    </PageContainer>
  );
}
