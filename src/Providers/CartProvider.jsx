import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const savedCarts = localStorage.getItem("cartItems");

  const [carts, setCarts] = useState(savedCarts ? JSON.parse(savedCarts) : []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(carts));
  }, [carts]);

  const addToCart = (item) => {
    const exists = carts.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      return toast.error("Item already in cart!");
    } else {
      setCarts((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
      toast.success(`${item.title} added to cart`);
    }
  };

  const removeFromCart = (itemId) => {
    setCarts((prevCart) => prevCart.filter((item) => item.id !== itemId));
    toast.success("Item removed from cart");
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
