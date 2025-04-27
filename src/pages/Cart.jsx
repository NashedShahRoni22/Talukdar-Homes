import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";
import { IoMdCloseCircle } from "react-icons/io";

export default function Cart() {
  const { carts, setCarts, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (e, item) => {
    let value = e.target.value;

    // If input is empty, allow it temporarily
    if (value === "") {
      setCarts((prevCarts) =>
        prevCarts.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: "" } : cartItem
        )
      );
      return;
    }

    // Remove leading zeros
    value = value.replace(/^0+/, "");

    // Block decimal values
    if (value.includes(".")) {
      value = value.split(".")[0]; // Take only the integer part
    }

    let newQuantity = Number(value);

    // If value is 0, negative, or NaN, set to 1
    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = 1;
    }

    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const handleInputBlur = (item) => {
    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity === "" ? 1 : cartItem.quantity,
            }
          : cartItem
      )
    );
  };

  const subTotal = carts
    .reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  if (carts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to={`/`} className="text-orange-500 text-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main>
      <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
        <h2 className="font-merriweather text-center text-xl font-medium md:text-3xl">
          Shopping Cart
        </h2>

        <div className="my-10 w-full overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Quantity</th>
                <th className="px-2 py-2">Total</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-4 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 object-cover"
                    />
                    <span>{item.title}</span>
                  </td>

                  <td className="px-2 py-4">${item.price}</td>

                  <td className="px-2 py-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                      onBlur={() => handleInputBlur(item)}
                      className="rounded border p-1 text-center max-w-[160px]"
                    />
                  </td>

                  <td className="px-2 py-4 font-semibold text-accent">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>

                  <td className="px-2 py-4 text-orange-500 cursor-pointer">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2"
                    >
                      Remove <IoMdCloseCircle />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Final Total */}
              <tr>
                <td
                  colSpan="3"
                  className="px-2 py-4 text-lg text-right font-bold"
                >
                  Total:
                </td>
                <td className="px-2 py-4 font-bold text-lg">${subTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-8">
          <Link
            to={`/`}
            className="text-orange-500 px-4 py-2 text-center text-lg font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            to="/checkout"
            className="bg-orange-500 text-white rounded px-4 py-2 text-center text-lg font-medium"
          >
            Go to Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
