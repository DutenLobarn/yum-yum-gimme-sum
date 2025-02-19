// packages/pages/cart-page/ui/CartPage.jsx
import {
  useSelector,
  // , useDispatch
} from "react-redux";
// import { addItem, removeOne } from "../data/cartSlice";
import { PageContainer } from "../../../base/PageContainer";
import { Header } from "@mandus/header";
import { CartList } from "@mandus/cart-list";
import { CheckoutButton } from "@mandus/checkout-button";

// import { ItemRow } from "@mandus/item-row";
// import { useNavigate } from "react-router-dom";
import "./index.css";

function CartPage() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const itemsById = useSelector((state) => state.cart.itemsById);

  const cartItems = Object.values(itemsById);

  console.log("cartItems:", cartItems);

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
