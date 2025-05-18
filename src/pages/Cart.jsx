import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";
import { IoMdCloseCircle } from "react-icons/io";
import { BsCartX } from "react-icons/bs";

export default function Cart() {
  const { carts, setCarts, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (e, item) => {
    let value = e.target.value;

    // If input is empty, allow it temporarily
    if (value === "") {
      setCarts((prevCarts) =>
        prevCarts.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: "" } : cartItem,
        ),
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
          : cartItem,
      ),
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
          : cartItem,
      ),
    );
  };

  const subTotal = carts
    .reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  if (!carts?.length > 0) {
    return (
      <div className="mx-5 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-5 text-center text-gray-600 md:container md:mx-auto md:py-10">
        <BsCartX className="mx-auto text-[40px] text-[#ff5722]" />
        <p className="mt-4 text-xl font-semibold">No items added yet!</p>
        <Link
          to="/products"
          className="mt-2 w-fit rounded bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-all duration-200 ease-in-out hover:bg-primary-hover"
        >
          Add Your First Item
        </Link>
      </div>
    );
  }

  return (
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
                <td className="flex items-center gap-4 px-2 py-4">
                  <Link
                    to={`/service-details/${item?.slug}`}
                    className="group overflow-hidden"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 object-cover transition-all duration-200 ease-linear group-hover:scale-105"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/service-details/${item?.slug}`}
                      className="transition-all duration-200 ease-in-out hover:text-primary"
                    >
                      {item.title}
                    </Link>
                    {item.attribute && item.attribute.length > 0 && (
                      <div className="flex items-center gap-0.5">
                        <p className="text-xs font-semibold text-primary">
                          Variant:
                        </p>
                        <p className="text-xs italic text-gray-600">
                          {item.attribute}
                        </p>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-2 py-4">${item.price}</td>

                <td className="px-2 py-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    onBlur={() => handleInputBlur(item)}
                    className="max-w-[160px] rounded border p-1 text-center"
                  />
                </td>

                <td className="text-accent px-2 py-4 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                <td className="cursor-pointer px-2 py-4 text-orange-500">
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
                className="px-2 py-4 text-right text-lg font-bold"
              >
                Total:
              </td>
              <td className="px-2 py-4 text-lg font-bold">${subTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-8">
        <Link
          to={`/`}
          className="px-4 py-2 text-center text-lg font-medium text-orange-500"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="rounded bg-orange-500 px-4 py-2 text-center text-lg font-medium text-white"
        >
          Go to Checkout
        </Link>
      </div>
    </section>
  );
}
