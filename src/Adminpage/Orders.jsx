import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Pagination from "../components/Pagination";
import OrderRow from "../components/admin/OrderRow";

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
          },
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
    [user?.token],
  );

  useEffect(() => {
    fetchPageData(1);
  }, [fetchPageData]);

  return (
    <section className="p-5">
      {loading && <p>Loading...</p>}

      {/* order table */}
      {orders && orders?.data?.length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Ordered At</th>
                <th>Email</th>
                <th>Products</th>
                <th>Payment Method</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order) =>
                order?.reference_items?.map((item, j) => (
                  <OrderRow
                    key={j}
                    order={order}
                    item={item}
                    itemIndex={j}
                    itemCount={order.reference_items.length}
                  />
                )),
              )}
            </tbody>
          </table>
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
