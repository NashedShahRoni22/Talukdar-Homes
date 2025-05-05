import { useContext, useState } from "react";
import { CartContext } from "../../Providers/CartProvider";
import stripeIcon from "../../assets/stipe.png";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const { carts } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const isDisabled =
    !formData.name.trim("") ||
    !formData.email.trim("") ||
    !formData.password.trim("") ||
    !formData.password_confirmation.trim("") ||
    formData.password !== formData.password_confirmation;

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
    const purchasePayload = new FormData();
    purchasePayload.append("reference_type", "product");
    purchasePayload.append("payment_gateway", "stripe");
    carts.forEach((item, i) => {
      purchasePayload.append(`reference_ids[${i}]`, item.id);
    });

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
        window.location.href = data?.data?.checkout_url;
      }
    } catch (error) {
      console.error("purchase error:", error);
    }

    /***==> Register API <==***/
    /* try {
      const res = await fetch("https://api.talukderhomes.com.au/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.status === true) {
        setUser(data?.data);
        localStorage.setItem("accessToken", JSON.stringify(data?.data));
        navigate("/");
      } else {
        window.alert("Email & Password should be valid!");
      }
    } catch (err) {
      console.error("regitration error:", err);
    } */
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
                onChange={handleInputChange}
                required
                className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
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
                onChange={handleInputChange}
                required
                className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
              />
            </div>
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="text-neutral-600 font-medium"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="border-neutral-200 mt-2 w-full rounded border p-2 outline-none"
              />
            </div>
            {/* password_confirmation */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="text-neutral-600 font-medium"
              >
                Confirm Password <span className="text-red-500">*</span>
                <br />
                {formData.password !== formData.password_confirmation && (
                  <span className="text-xs text-red-500">
                    Password didn&apos; match!
                  </span>
                )}
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
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
            disabled={isDisabled}
            onClick={handleConfirmOrder}
            className={`rounded px-4 py-2 font-medium text-white ${isDisabled ? "cursor-not-allowed bg-orange-200" : "cursor-pointer bg-orange-500"}`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </section>
  );
}
