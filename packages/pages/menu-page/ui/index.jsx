import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../data/menuSlice";
import { addItem } from "@mandus/cart-page";

import { Header } from "@mandus/header";
import { MenuContainer } from "@mandus/menu-container";
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
  const dips = items.filter((i) => i.type === "dip");
  const drinks = items.filter((i) => i.type === "drink");

  const handleAddToCart = (item) => {
    console.log("Adding item1111:", item);

    dispatch(addItem(item));
  };

  return (
    <MenuContainer bgType="palm">
      <Header cartCount={cartCount} />
      <div className="menu-box">
        <h2>MENY</h2>
        <MenuSection
          price="9"
          layout="list"
          items={wontons}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          title="DIPSÅS"
          price="19"
          layout="buttons"
          items={dips}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          title="DRICKA"
          price="19"
          layout="buttons"
          items={drinks}
          onAddToCart={handleAddToCart}
        />
      </div>
    </MenuContainer>
  );
}
