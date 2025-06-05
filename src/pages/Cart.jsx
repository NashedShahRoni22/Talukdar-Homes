import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { CartContext } from "../Providers/CartProvider";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {
  const { carts, setCarts, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (e, item) => {
    let value = e.target.value;

    if (value === "") {
      setCarts((prevCarts) =>
        prevCarts.map((cartItem) =>
          cartItem.id === item.id &&
          (cartItem.attribute?.name || null) === (item.attribute?.name || null)
            ? { ...cartItem, quantity: "" }
            : cartItem,
        ),
      );
      return;
    }

    value = value.replace(/^0+/, "");

    if (value.includes(".")) {
      value = value.split(".")[0];
    }

    let newQuantity = Number(value);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = 1;
    }

    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.id === item.id &&
        (cartItem.attribute?.name || null) === (item.attribute?.name || null)
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    );
  };

  const handleInputBlur = (item) => {
    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.id === item.id &&
        (cartItem.attribute?.name || null) === (item.attribute?.name || null)
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
        <BsCartX className="text-[40px] text-[#ff5722]" />
        <p className="mt-4 text-xl font-semibold">Your cart is empty</p>
        <p className="mt-2 text-sm">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-4 w-fit rounded border border-primary px-4 py-2 text-sm font-medium text-primary transition-all duration-200 ease-in-out hover:bg-primary hover:text-white"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      <h2 className="font-merriweather text-center text-2xl font-medium md:text-3xl">
        Shopping Cart
      </h2>

      <div className="my-10 w-full overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-center md:text-left">
              <th className="px-2 py-2">Product</th>
              <th className="hidden px-2 py-2 md:table-cell">Unit Price</th>
              <th className="px-2 py-2">Quantity</th>
              <th className="px-2 py-2 md:px-9 md:text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {carts.map((item) => (
              <tr
                key={item.attribute ? item.attribute.name + item.id : item.id}
                className="border-b"
              >
                <td className="flex flex-col px-2 py-4 md:flex-row md:items-center md:gap-4">
                  <Link
                    to={`/products/${item?.slug}`}
                    className="group w-fit overflow-hidden"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="size-11 object-contain transition-all duration-200 ease-linear group-hover:scale-105 md:size-16"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/products/${item?.slug}`}
                      className="text-sm transition-all duration-200 ease-in-out hover:text-primary"
                    >
                      {item.title}
                    </Link>
                    {item.attribute && (
                      <div className="mt-1 flex items-center gap-0.5">
                        <p className="text-xs text-primary md:font-semibold">
                          Variant:
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.attribute.name}
                        </p>
                      </div>
                    )}
                  </div>
                </td>

                <td className="hidden px-2 py-4 md:table-cell">
                  ${formatPrice(item.price)}
                </td>

                <td className="px-2 py-4 text-center md:text-left">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    onBlur={() => handleInputBlur(item)}
                    className="max-w-16 rounded border p-1 text-center text-sm md:max-w-[160px]"
                  />
                </td>

                <td className="text-accent px-2 py-4 text-sm md:text-base md:font-medium">
                  <div className="flex items-center justify-end gap-1">
                    <p>${formatPrice(item.price * item.quantity)}</p>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-base text-primary/85 transition-all duration-200 ease-in-out hover:text-primary-hover"
                    >
                      <IoTrashOutline className="md:text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 space-y-2">
          {/* sub-total */}
          <div className="flex items-center justify-end gap-2">
            <p>Sub-Total:</p>
            <p className="text-primary">${subTotal}</p>
          </div>

          {/* grand total */}
          <div className="flex items-center justify-end gap-2">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-primary">${subTotal}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-8">
        <Link
          to="/products"
          className="text-center text-primary transition-all duration-200 ease-in-out hover:text-primary-hover md:px-4 md:py-2 md:text-lg md:font-medium"
        >
          Continue Shopping
        </Link>
        <Link
          to="/checkout"
          className="rounded bg-primary p-2 text-center text-white transition-all duration-200 ease-in-out hover:bg-primary-hover md:px-4 md:py-2 md:text-lg md:font-medium"
        >
          Go to Checkout
        </Link>
      </div>
    </section>
  );
}
