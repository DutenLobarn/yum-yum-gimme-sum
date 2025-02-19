import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMenu } from "../data/menuSlice";
import { addItem } from "@mandus/cart-page";

import { PageContainer } from "@mandus/page-container";
import { Header } from "@mandus/header";
import { MenuSection } from "@mandus/menu-section";

import "./index.css";

export function MenuPage() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.order.apiKey);
  const status = useSelector((state) => state.menu.status);
  const items = useSelector((state) => state.menu.items);
  const itemsById = useSelector((state) => state.cart.itemsById);
  const cartCount = Object.values(itemsById || {}).reduce(
    (acc, item) => acc + item.count,
    0
  );

  useEffect(() => {
    if (apiKey && status === "idle") {
      dispatch(fetchMenu(apiKey));
    }
  }, [apiKey, status, dispatch]);

  if (status === "idle" || status === "loading") {
    return <p>Laddar menyn...</p>;
  }
  if (status === "failed") return <p>Något gick fel.</p>;
  if (!Array.isArray(items)) return <p>Menyn kunde inte laddas.</p>;

  // Filtrera
  const wontons = items.filter((i) => i.type === "wonton");
  const wontonPrice = wontons.length > 0 ? wontons[0].price : 0;

  const dips = items.filter((i) => i.type === "dip");
  const dipPrice = dips.length > 0 ? dips[0].price : 0;

  const drinks = items.filter((i) => i.type === "drink");
  const drinkPrice = drinks.length > 0 ? drinks[0].price : 0;

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <PageContainer bgType="palm">
      <Header cartCount={cartCount} />
      <div className="menu-box">
        <h2>MENY</h2>
        <MenuSection
          price={wontonPrice}
          variant="list"
          items={wontons}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          title="DIPSÅS"
          // price={dipPrice}
          price={dipPrice}
          variant="buttons"
          items={dips}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          title="DRICKA"
          price={drinkPrice}
          variant="buttons"
          items={drinks}
          onAddToCart={handleAddToCart}
        />
      </div>
    </PageContainer>
  );
}
