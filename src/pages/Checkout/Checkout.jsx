import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { AuthContext } from "../../Providers/AuthProvider";
import { CartContext } from "../../Providers/CartProvider";
import stripeIcon from "../../assets/stipe.png";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { carts, setCarts } = useContext(CartContext);

  // if cart is empty redirect to products page
  if (carts && carts?.length <= 0) {
    navigate("/products");
  }

  const [isLoading, setIsLoading] = useState({
    checkout: false,
  });
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    country: "Australia",
    city: "",
    state: "",
    zip_code: "",
    address: "",
  });

  const isDisabled =
    !formData.name.trim("") ||
    !formData.email.trim("") ||
    !formData.phone.trim("") ||
    !formData.country.trim("") ||
    !formData.city.trim("") ||
    !formData.state.trim("") ||
    !formData.zip_code.trim("") ||
    !formData.address.trim("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await res.json();
        const sortedCountries = data?.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  //  handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // single product total price based on quantity
  const calculatePrice = (price, quantity) => {
    const priceInCents = price * 100 * quantity;
    const originalPrice = priceInCents / 100;
    return originalPrice.toFixed(2);
  };

  //  total price in cents
  const totalInCents = carts.reduce((total, item) => {
    const priceInCents = Math.round(parseFloat(item.price) * 100);
    return total + priceInCents * item.quantity;
  }, 0);

  // total price in decimal
  const totalPrice = (totalInCents / 100).toFixed(2);

  // handle confirm order
  const handleConfirmOrder = async () => {
    setIsLoading((prev) => ({ ...prev, checkout: true }));

    const purchasePayload = new FormData();

    carts.forEach((item, i) => {
      purchasePayload.append(`references[${i}][id]`, item.id);
      purchasePayload.append(`references[${i}][quantity]`, item.quantity);
      if (item.attribute) {
        purchasePayload.append(
          `references[${i}][attribute]`,
          item.attribute.name
        );
      }
    });

    purchasePayload.append("phone", formData.phone);
    purchasePayload.append("payment_gateway", "stripe");
    purchasePayload.append("address", formData.address);
    purchasePayload.append("city", formData.city);
    purchasePayload.append("state", formData.state);
    purchasePayload.append("zip_code", formData.zip_code);
    purchasePayload.append("country", formData.country);

    /***==> Purchase API <==***/
    try {
      const res = await fetch("https://api.talukderhomes.com.au/api/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: purchasePayload,
      });
      const data = await res.json();
      if (data?.status === true) {
        localStorage.removeItem("cartItems");
        setCarts([]);
        window.location.href = data?.data?.checkout_url;
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.error("purchase error:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, checkout: false }));
    }
  };

  return (
    <>
      {carts && carts.length > 0 && (
        <section className="flex flex-col-reverse justify-between gap-8 px-5 py-10 md:container md:mx-auto md:flex-row md:px-0 md:py-20">
          <div className="w-full md:w-1/2 md:py-4">
            <h2 className="text-xl font-medium">Payment Method</h2>

            <button
              type="button"
              className="mt-4 flex w-fit items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-left"
              aria-current="true"
            >
              <img
                src={stripeIcon}
                alt="Stripe payment icon"
                className="size-8 min-w-fit object-contain"
              />
              <span className="text-sm font-medium text-gray-900">
                Online Payment (Stripe)
              </span>
            </button>

            {/* shipping details */}
            <div className="mt-8">
              <h2 className="text-xl font-medium">Shipping Details</h2>

              <form className="mt-4 space-y-3 text-sm">
                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-neutral-600 font-medium"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    required
                    readOnly
                    className="border-neutral-200 mt-2 w-full cursor-not-allowed rounded border bg-gray-100 p-2 outline-none"
                  />
                </div>
                {/* email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-neutral-600 font-medium"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    required
                    readOnly
                    className="border-neutral-200 mt-2 w-full cursor-not-allowed rounded border bg-gray-100 p-2 outline-none"
                  />
                </div>

                {/* phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-neutral-600 font-medium"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  />
                </div>

                {/* country select dropdown */}
                <div>
                  <label
                    htmlFor="country"
                    className="text-neutral-600 font-medium"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.country}
                    name="country"
                    onChange={handleInputChange}
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  >
                    {countries?.map((country, i) => (
                      <option key={i} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>

                {/* city */}
                <div>
                  <label
                    htmlFor="city"
                    className="text-neutral-600 font-medium"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  />
                </div>

                {/* state */}
                <div>
                  <label
                    htmlFor="state"
                    className="text-neutral-600 font-medium"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  />
                </div>

                {/* zip_code */}
                <div>
                  <label
                    htmlFor="zip_code"
                    className="text-neutral-600 font-medium"
                  >
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    required
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  />
                </div>

                {/* address */}
                <div>
                  <label
                    htmlFor="address"
                    className="text-neutral-600 font-medium"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
                  />
                </div>
              </form>

              {/* mobile */}
              <div className="mt-6 flex justify-center md:hidden">
                <button
                  disabled={isDisabled || isLoading.checkout}
                  onClick={handleConfirmOrder}
                  className={`min-w-[134px] rounded px-4 py-2 text-center font-medium text-white ${isDisabled ? "cursor-not-allowed bg-primary/50" : "cursor-pointer bg-primary hover:bg-primary-hover transition-all duration-200 ease-in-out"}`}
                >
                  {isLoading.checkout ? (
                    <Spinner className="mx-auto h-4 w-4" />
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:p-4 md:rounded-md md:bg-gray-50">
            <h2 className="text-center text-2xl font-medium md:text-left">
              Your Order
            </h2>

            <ul className="mt-4 space-y-4">
              {carts?.map((cart, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-8 rounded border bg-white p-2"
                >
                  <div className="flex flex-1 items-center gap-1.5">
                    <img
                      src={`${cart.thumbnail}`}
                      alt={`image of ${cart.title}`}
                      loading="lazy"
                      className="size-12 object-contain"
                    />
                    <div>
                      <p>{cart.title}</p>

                      {/* product variant */}
                      {cart.attribute && (
                        <div className="flex items-center gap-0.5">
                          <p className="text-xs font-semibold text-primary">
                            Variant:
                          </p>
                          <p className="text-xs text-gray-600">
                            {cart.attribute.name}
                          </p>
                        </div>
                      )}

                      {/* quantity */}
                      <div className="mt-0.5 flex items-center gap-0.5">
                        <p className="text-xs font-semibold text-primary">
                          Quantity:
                        </p>
                        <p className="text-xs text-gray-600">{cart.quantity}</p>
                      </div>
                    </div>
                  </div>

                  {/* total price based on quantity */}
                  <p className="min-w-fit">
                    ${calculatePrice(cart.price, cart.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-neutral-200 mt-6 space-y-1.5 border-y py-2">
              <div className="flex items-center justify-between">
                <p className="text-lg">Subtotal</p>
                <p className="text-lg">AUD ${totalPrice}</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-medium">AUD ${totalPrice}</p>
            </div>

            {/* desktop submit button */}
            <div className="mt-6 hidden justify-center md:flex">
              <button
                disabled={isDisabled || isLoading.checkout}
                onClick={handleConfirmOrder}
                className={`min-w-[134px] rounded px-4 py-2 text-center font-medium text-white ${isDisabled ? "cursor-not-allowed bg-primary/50" : "cursor-pointer bg-primary hover:bg-primary-hover transition-all duration-200 ease-in-out"}`}
              >
                {isLoading.checkout ? (
                  <Spinner className="mx-auto h-4 w-4" />
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
