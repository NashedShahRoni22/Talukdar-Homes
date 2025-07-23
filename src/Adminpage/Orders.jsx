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
  const [currentPage, setCurrentPage] = useState(1);

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
          setCurrentPage(page);
        }
      } catch (error) {
        console.error("orders", error);
      } finally {
        setLoading(false);
      }
    },
    [user?.token]
  );

  const updateOrderStatus = useCallback((orderId, confirmStatus) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      data: prevOrders.data.map((order) =>
        order.id === orderId
          ? { ...order, confirmed_at: confirmStatus }
          : { ...order }
      ),
    }));
  }, []);

  const updateDeletedOrders = useCallback((orderId) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      data: prevOrders.data.filter((order) => order.id !== orderId),
    }));
  }, []);

  // Keep refetch for manual refresh if needed
  const refetchOrders = useCallback(() => {
    fetchPageData(currentPage);
  }, [fetchPageData, currentPage]);

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
                  <th className="p-3">Name</th>
                  <th className="p-3">Payment Status</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Order Status</th>
                  <th className="p-3">Actions</th>
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
                      onOrderUpdate={updateOrderStatus}
                      onOrderDelete={updateDeletedOrders}
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
