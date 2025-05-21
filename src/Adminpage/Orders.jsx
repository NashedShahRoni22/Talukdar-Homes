import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Pagination from "../components/Pagination";
import OrderRow from "../components/admin/OrderRow";
import LoaderPage from "./LoaderPage";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({
    data: [],
  });

  const fetchPageData = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.talukderhomes.com.au/api/purchase-histories?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === true) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("orders", error);
      } finally {
        setLoading(false);
      }
    },
    [user?.token]
  );

  useEffect(() => {
    fetchPageData(1);
  }, [fetchPageData]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <section className="p-5">
      {/* order table */}
      {orders && orders?.data?.length > 0 && (
        <div className="w-full overflow-x-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

          <div className="rounded border border-gray-200 p-6 overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead className="border-b border-gray-200 text-left text-gray-900">
                <tr>
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.map((order, i) =>
                  order?.reference_items?.map((item, j) => (
                    <OrderRow
                      key={j}
                      order={order}
                      item={item}
                      orderIndex={i}
                      itemIndex={j}
                      itemCount={order.reference_items.length}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination
        current={orders.current_page}
        last={orders.last_page}
        onPageChange={(page) => fetchPageData(page)}
      />
    </section>
  );
}
