import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { CartContext } from "../../Providers/CartProvider";
import stripeIcon from "../../assets/stipe.png";
import { Spinner } from "@material-tailwind/react";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { carts, setCarts } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState({
    checkout: false,
  });
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
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
        purchasePayload.append(`references[${i}][attribute]`, item.attribute);
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
      }
    } catch (error) {
      console.error("purchase error:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, checkout: false }));
    }
  };

  return (
    <section className="flex flex-col justify-between gap-8 px-5 py-10 md:container md:mx-auto md:flex-row md:gap-16 md:px-0 md:py-20">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-medium">Payment Method</h2>

        <div className="bg-neutral-100 mt-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-orange-200 px-4 py-2">
          <img
            src={stripeIcon}
            alt="image of stripe icon"
            className="size-8 min-w-fit object-contain"
          />
          <h4 className="text-sm font-medium">Online Payment (Stripe)</h4>
        </div>

        {/* shipping details */}
        <div className="mt-8">
          <h2 className="text-xl font-medium">Shipping Details</h2>

          <form className="mt-4 space-y-3 text-sm">
            {/* name */}
            <div>
              <label htmlFor="name" className="text-neutral-600 font-medium">
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
              <label htmlFor="email" className="text-neutral-600 font-medium">
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
              <label htmlFor="phone" className="text-neutral-600 font-medium">
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
              <label htmlFor="country" className="text-neutral-600 font-medium">
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
              <label htmlFor="city" className="text-neutral-600 font-medium">
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
              <label htmlFor="state" className="text-neutral-600 font-medium">
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
              <label htmlFor="address" className="text-neutral-600 font-medium">
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
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-medium">Your Order</h2>

        <ul className="mt-4 space-y-4">
          {carts?.map((cart) => (
            <li
              key={cart.id}
              className="flex flex-wrap items-center justify-between gap-8"
            >
              <div className="flex items-center gap-1.5">
                <img
                  src={`${cart.thumbnail}`}
                  alt={`image of ${cart.title}`}
                  loading="lazy"
                  className="size-12 object-contain"
                />
                <div>
                  <p>{cart.title}</p>
                  <p className="text-sm text-orange-500">X {cart.quantity}</p>
                </div>
              </div>
              <p>${calculatePrice(cart.price, cart.quantity)}</p>
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

        <div className="mt-6 flex justify-center">
          <button
            disabled={isDisabled || isLoading.checkout}
            onClick={handleConfirmOrder}
            className={`rounded px-4 py-2 text-center min-w-[134px] font-medium text-white ${isDisabled ? "cursor-not-allowed bg-orange-200" : "cursor-pointer bg-orange-500"}`}
          >
            {isLoading.checkout ? (
              <Spinner className="h-4 w-4 mx-auto" />
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
