import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const savedCarts = localStorage.getItem("cartItems");

  const [carts, setCarts] = useState(savedCarts ? JSON.parse(savedCarts) : []);

  console.log(carts);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(carts));
  }, [carts]);

  const addToCart = (item, silent) => {
    const hasAttribute = "attribute" in item;

    const exists = carts.find((cartItem) => {
      if (hasAttribute) {
        return (
          cartItem.id === item.id &&
          "attribute" in cartItem &&
          cartItem.attribute?.name === item.attribute?.name
        );
      } else {
        return cartItem.id === item.id && !("attribute" in cartItem);
      }
    });

    if (exists) {
      if (!silent) {
        toast.error("Item already in cart!");
      }
      return;
    }

    // Add as a new item (even if same id but different attribute)
    setCarts((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    toast.success(`${item.title} added to cart`);
  };

  const removeFromCart = (itemToRemove) => {
    setCarts((prevCart) =>
      prevCart.filter((item) => {
        const isSameId = item.id === itemToRemove.id;

        const itemAttrName = item?.attribute?.name;
        const removeAttrName = itemToRemove?.attribute?.name;

        // Case 1: both have attribute.name, remove only matching attribute
        if (itemAttrName && removeAttrName) {
          return !(isSameId && itemAttrName === removeAttrName);
        }

        // Case 2: neither has attribute, remove by id
        if (!itemAttrName && !removeAttrName) {
          return !isSameId;
        }

        // Case 3: mismatch in attribute existence, keep it
        return true;
      })
    );

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
