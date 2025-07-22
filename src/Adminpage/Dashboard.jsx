import { useEffect, useState, useContext } from "react";
import {
  FaCalendarAlt,
  FaComments,
  FaUsers,
  FaBoxOpen,
  FaShoppingBag,
  FaTools,
  FaPenNib,
  FaLink,
} from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";
import { getApi } from "../api/getApi";
import OrderDetailsModal from "../components/admin/OrderDetailsModal";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { AiFillEye } from "react-icons/ai";

const metrics = [
  { label: "Appointments", key: "appointments", icon: FaCalendarAlt },
  { label: "Messages", key: "contacts", icon: FaComments },
  { label: "Customers", key: "customers", icon: FaUsers },
  { label: "Orders", key: "orders", icon: FaBoxOpen },
  { label: "Products", key: "products", icon: FaShoppingBag },
  { label: "Services", key: "services", icon: FaTools },
  { label: "Blogs", key: "blogs", icon: FaPenNib },
];

const quickLinks = [
  { label: "Add Product", href: "/admin/add-product" },
  { label: "Add Blog Post", href: "/admin/add-blog" },
  { label: "Manage Orders", href: "/admin/orders" },
  { label: "View Messages", href: "/admin/contacts" },
];

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    appointments: 0,
    messages: 0,
    customers: 0,
    orders: 0,
    products: 0,
    services: 0,
    blogs: 0,
  });
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formateDate = (created_at) => {
    const date = new Date(created_at);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (created_at) => {
    const date = new Date(created_at);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // get all data
  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };

      try {
        const [dashboardRes, ordersRes, appointmentsRes] = await Promise.all([
          getApi("https://api.talukderhomes.com.au/api/dashboard", headers),
          getApi(
            "https://api.talukderhomes.com.au/api/purchase-histories",
            headers
          ),
          getApi("https://api.talukderhomes.com.au/api/appointments", headers),
        ]);

        if (dashboardRes?.status === true) {
          setDashboardData(dashboardRes.data);
        }

        if (ordersRes?.status === true) {
          setOrders(ordersRes?.data?.data); // optional: set state for orders
        }

        if (appointmentsRes?.status === true) {
          setAppointments(appointmentsRes.data); // optional: set state for appointments
        }
      } catch (error) {
        console.error("Error fetching multiple dashboard data:", error);
      }
    };

    if (user?.token) {
      fetchData();
    }
  }, [user?.token]);

  return (
    <div className="space-y-8 p-5">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, key, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded border border-gray-200 p-4"
          >
            <div className="rounded-full bg-[#ff792d]/10 p-3 text-xl text-[#ff792d]">
              <Icon />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-bold text-gray-800">
                {dashboardData[key] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="rounded border border-gray-200">
          <h2 className="border-b bg-gray-50 px-4 py-2 text-lg font-semibold text-gray-900">
            Recent Appointments
          </h2>
          <ul className="text-sm">
            {appointments?.length > 0 &&
              appointments
                ?.slice(0, 5)
                ?.map(
                  ({
                    created_at,
                    id,
                    first_name,
                    last_name,
                    service_name,
                    phone,
                    email,
                  }) => (
                    <li
                      key={id}
                      className="border-b px-4 py-3 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">
                            {`${first_name} ${last_name}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {service_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-800">
                            {formateDate(created_at)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatTime(created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <span className="mr-2">{phone}</span>
                        <span>{email}</span>
                      </div>
                    </li>
                  )
                )}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="rounded border border-gray-200">
          <h2 className="border-b bg-gray-50 px-4 py-2 text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
          <ul className="divide-y text-sm text-gray-700">
            {orders?.slice(0, 5).map((order) => {
              return (
                <li
                  key={order.id}
                  onClick={() => handleOpen(order)}
                  className="flex flex-wrap justify-between items-center gap-2 px-5 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700 border-b border-gray-200 cursor-pointer"
                >
                  <div className="w-full sm:w-auto font-medium text-gray-900">
                    #{order?.invoice}
                  </div>
                  <div className="w-full sm:w-auto truncate">
                    {order?.client?.email}
                  </div>
                  <div className="w-full sm:w-auto">
                    {order?.gateway?.status === 1 ? "Paid" : "Unpaid"}
                  </div>
                  <div className="w-full sm:w-auto">
                    {formatDate(order?.created_at)}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Order Modal */}
          <OrderDetailsModal
            open={showModal}
            handleClose={toggleModal}
            order={selectedOrder}
          />
        </div>

        {/* Quick Links */}
        <div className="rounded border border-gray-200">
          <h2 className="border-b bg-gray-50 px-4 py-2 text-lg font-semibold text-gray-900">
            Quick Links
          </h2>
          <div className="flex flex-wrap items-center gap-4 px-4 py-3">
            {quickLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="flex min-w-fit items-center gap-2 rounded-md border p-3 text-[#ff792d] transition hover:bg-[#ff792d]/10"
              >
                <FaLink className="min-w-fit text-lg" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
