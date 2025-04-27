import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);

  const addToCart = (item) => {
    const exists = carts.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      window.alert("Item already in cart!");
      return;
    }

    setCarts((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (itemId) => {
    setCarts((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const cartValue = {
    carts,
    addToCart,
    removeFromCart,
    setCarts,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
