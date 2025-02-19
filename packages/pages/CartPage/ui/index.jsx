import { useSelector } from "react-redux";
import { PageContainer } from "@mandus/page-container";
import { Header } from "@mandus/header";
import { CartList } from "@mandus/cart-list";
import { CheckoutButton } from "@mandus/checkout-button";
import "./index.css";

function CartPage() {
  const itemsById = useSelector((state) => state.cart.itemsById);

  const cartItems = Object.values(itemsById);

  const total = cartItems.reduce((sum, cItem) => {
    return sum + cItem.price * cItem.count;
  }, 0);

  return (
    <PageContainer bgType="gray">
      <Header
        showBadge={false}
        cartCount={cartItems.reduce((acc, i) => acc + i.count, 0)}
      />

      <div className="cart-box">
        <CartList cartItems={cartItems} />

        <div className="cart-total-row">
          <span>TOTAL:</span>
          <span>{total} SEK</span>
        </div>

        <CheckoutButton cartItems={cartItems} />
      </div>
    </PageContainer>
  );
}

export { CartPage };
