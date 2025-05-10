import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import LoaderPage from "../../Adminpage/LoaderPage";
import { CartContext } from "../../Providers/CartProvider";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { carts } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
    links: [],
  });

  // fetch purchase history
  const fetchPurchaseHistory = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.talukderhomes.com.au/api/my-purchase-histories?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await res.json();
        if (data?.status === true) {
          setPurchaseHistory(data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.token]
  );

  // fetch purchase history
  useEffect(() => {
    if (user) {
      fetchPurchaseHistory();
    }
  }, [user, fetchPurchaseHistory]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="rounded border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-primary">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border border-primary/10 bg-primary/5 p-4">
              <p className="text-gray-600">Name</p>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div className="rounded-md border border-primary/10 bg-primary/5 p-4">
              <p className="text-gray-600">Email</p>
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-primary">
            Order Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border border-primary/10 bg-primary/5 p-4">
              <p className="text-gray-600">Total Orders</p>
              <p className="text-2xl font-medium">
                {purchaseHistory.total || 0}
              </p>
            </div>
            <Link
              to="/cart"
              className="rounded-md border border-primary/10 bg-primary/5 p-4"
            >
              <p className="text-gray-600">Your Cart</p>
              <p className="flex items-center gap-2 text-2xl font-medium">
                <BiCart className="min-w-fit text-3xl text-primary" />
                {carts?.length}
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Order History
        </h2>

        {purchaseHistory.data?.length === 0 ? (
          <p className="py-4 text-center text-gray-600">No orders found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-900 text-left">
                    <th className="p-3">Order #</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Variant</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory?.data?.map((order, i) =>
                    order.reference_items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${i % 2 === 0 && "bg-gray-50"} ${index === 0 && "border-t border-gray-200"}`}
                      >
                        {/* Show invoice and date only on the first product row of each order */}
                        {index === 0 ? (
                          <>
                            <td
                              className="p-3 text-sm text-gray-700"
                              rowSpan={order.reference_items.length}
                            >
                              {order.invoice}
                            </td>
                            <td
                              className="p-3 text-sm text-gray-700"
                              rowSpan={order.reference_items.length}
                            >
                              {formatDate(order.created_at)}
                            </td>
                          </>
                        ) : null}
                        {/* reference items data */}
                        <td className="p-3 text-gray-700 text-sm ">
                          {item.title}
                        </td>
                        <td className="p-3 text-gray-700 text-sm">
                          {item.attribute}
                        </td>
                        <td className="p-3 text-center text-sm text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="p-3 text-gray-700 text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        {index === 0 ? (
                          <td
                            className={`p-3 text-gray-700 text-sm ${order.status === "1" ? "text-green-600" : "text-primary"}`}
                            rowSpan={order.reference_items.length}
                          >
                            {order.status === "1" ? "Completed" : "Pending"}
                          </td>
                        ) : null}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {purchaseHistory.data?.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{purchaseHistory.total}</span>{" "}
                  orders
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    fetchPurchaseHistory(purchaseHistory.current_page - 1)
                  }
                  disabled={purchaseHistory.current_page === 1}
                  className={`border px-3 py-1 ${purchaseHistory.current_page === 1 ? "cursor-not-allowed border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-50"}`}
                >
                  Previous
                </button>

                {purchaseHistory.links?.slice(1, -1).map((link, index) => (
                  <button
                    key={index}
                    onClick={() => fetchPurchaseHistory(parseInt(link.label))}
                    className={`border px-3 py-1 ${link.active ? "border-primary bg-primary text-white" : "border-gray-300 hover:bg-gray-50"}`}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() =>
                    fetchPurchaseHistory(purchaseHistory.current_page + 1)
                  }
                  disabled={
                    purchaseHistory.current_page === purchaseHistory.last_page
                  }
                  className={`border px-3 py-1 ${purchaseHistory.current_page === purchaseHistory.last_page ? "cursor-not-allowed border-gray-200 text-gray-400" : "border-gray-300 hover:bg-gray-50"}`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
