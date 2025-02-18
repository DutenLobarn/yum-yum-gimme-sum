import "./index.css";
import Group6 from "../../../../src/assets/Group 6.svg";
import Group7 from "../../../../src/assets/Group 7.svg";
import Union from "../../../../src/assets/Union.svg";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../data/menuSlice";
import { addItem } from "@mandus/cart-page"; // ex. om du re-exportar addItem i cart-page
// import src from "./../../../../node_modules/vite/client.d";

import { useNavigate } from "react-router-dom";

export function MenuPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.order.apiKey);
  const items = useSelector((state) => state.menu.items);
  const status = useSelector((state) => state.menu.status);
  const cartCount = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    if (apiKey && status === "idle") {
      dispatch(fetchMenu(apiKey));
    }
  }, [apiKey, status, dispatch]);

  if (status === "idle" || status === "loading") {
    return <p>Laddar menyn...</p>;
  }
  if (status === "failed") return <p>Något gick fel.</p>;

  // Extra försiktig:
  if (!Array.isArray(items)) {
    return <p>Menyn kunde inte laddas.</p>;
  }

  const wontons = items.filter((item) => item.type === "wonton");
  const dips = items.filter((item) => item.type === "dip");
  const drinks = items.filter((item) => item.type === "drink");

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <img src={Group6} alt="Logga" className="logo" />

        <div className="cart-wrapper" onClick={() => navigate("/cart")}>
          <img src={Group7} alt="Cart icon" className="cart-icon" />
          {cartCount >= 0 && <span className="cart-badge">{cartCount}</span>}
          <img src={Union} alt="Extra ikon" className="union-icon" />
        </div>
      </header>
      {/* Själva menyrutan (mörk rektangel) */}
      <div className="menu-box">
        <h2 className="menu-title">MENY</h2>

        {/* Lista av items */}
        <ul className="menu-list">
          {wontons.map((item) => (
            <li
              onClick={() => handleAddToCart(item)}
              key={item.id}
              className="menu-item"
            >
              <div className="item-row">
                <h3 className="item-name">{item.name}</h3>
                <div className="dots"></div>
                <span className="item-price">{item.price} SEK</span>
              </div>

              {/* 2) Ingredienser under */}
              {item.ingredients && (
                <p className="item-ingredients">
                  {item.ingredients.join(", ")}
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="item-row dip-header">
          <span>DIPSÅS</span>
          <div className="dots"></div>
          <span>19 SEK</span>
        </div>
        <div className="dip-buttons">
          {dips.map((dip) => (
            <button
              key={dip.id}
              className="dip-button"
              onClick={() => handleAddToCart(dip)}
            >
              {dip.name.toLowerCase()}
            </button>
          ))}
        </div>

        {/* 4) Drinks-rubrik + knappar */}
        <div className="item-row drink-header">
          <span>DRICKA</span>
          <div className="dots"></div>
          <span>19 SEK</span>
        </div>
        <div className="drink-buttons">
          {drinks.map((drink) => (
            <button
              key={drink.id}
              className="drink-button"
              onClick={() => handleAddToCart(drink)}
            >
              {drink.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
