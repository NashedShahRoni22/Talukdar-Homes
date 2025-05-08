import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const savedCarts = localStorage.getItem("cartItems");

  const [carts, setCarts] = useState(savedCarts ? JSON.parse(savedCarts) : []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(carts));
  }, [carts]);

  const addToCart = (item, silent) => {
    const hasAttribute = "attribute" in item;

    const exists = carts.find((cartItem) => {
      if (hasAttribute) {
        // Item has attribute, check for both id and attribute
        return (
          cartItem.id === item.id &&
          "attribute" in cartItem &&
          cartItem.attribute === item.attribute
        );
      } else {
        // Item has no attribute, check by id only
        return cartItem.id === item.id && !("attribute" in cartItem);
      }
    });

    if (exists) {
      if (!silent) {
        toast.error("Item already in cart!");
      }
      return;
    }

    if (hasAttribute) {
      // Check if same id but different attribute exists — then update
      const indexToUpdate = carts.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          "attribute" in cartItem &&
          cartItem.attribute !== item.attribute,
      );

      if (indexToUpdate !== -1) {
        setCarts((prevCart) =>
          prevCart.map((cartItem, index) =>
            index === indexToUpdate
              ? { ...cartItem, attribute: item.attribute }
              : cartItem,
          ),
        );
        toast.success(`${item.title} updated in cart`);
        return;
      }
    }

    // Otherwise, add the item to cart
    setCarts((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    toast.success(`${item.title} added to cart`);
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
