import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchReceipt } from "@mandus/slices";

import { PageContainer } from "@mandus/page-container";
import { Header } from "@mandus/header";
import { ItemRow } from "@mandus/item-row";
import { NewOrderButton } from "@mandus/new-order-button";

import logo from "/src/assets/logo.svg";
import "./index.css";

export function ReceiptPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  // Hämta kvitto från store
  const receipt = useSelector((state) => state.receipt.receipt);
  const status = useSelector((state) => state.receipt.status);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchReceipt(orderId));
    }
  }, [orderId, dispatch]);

  if (status === "loading") return <p>Laddar kvitto...</p>;
  if (status === "failed") return <p>Kunde inte hämta kvitto.</p>;
  if (!receipt) return <p>Ingen data</p>;

  return (
    <PageContainer bgType="order">
      <Header cartCount={0} showCart={false} />
      <div className="receipt-box">
        <img src={logo} alt="Kvitto-logo" />

        <h2 className="receipt-title">KVITTO</h2>
        <p className="receipt-id">#{receipt.id}</p>

        <ul className="receipt-items">
          {receipt.items.map((item) => (
            <li key={item.id} className="receipt-item-row">
              <ItemRow name={item.name} price={item.price} />
              {item.quantity && (
                <span className="item-quantity">{item.quantity} stycken</span>
              )}
            </li>
          ))}
        </ul>

        <div className="receipt-total-row">
          <div className="left-total-info">
            <span className="total-label">TOTAL</span>
            <span className="moms-text">inkl 20% moms</span>
          </div>
          <span className="receipt-total-price">{receipt.orderValue} SEK</span>
        </div>
      </div>
      <NewOrderButton />
    </PageContainer>
  );
}
