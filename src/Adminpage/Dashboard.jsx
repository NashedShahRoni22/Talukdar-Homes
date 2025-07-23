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
import { formatDate } from "../utils/formatDate";
import { LuCheck } from "react-icons/lu";
import { IoMdStopwatch } from "react-icons/io";

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
  const [dashboardData, setDashboardData] = useState({});
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

        if (dashboardRes?.status) setDashboardData(dashboardRes.data);
        if (ordersRes?.status) setOrders(ordersRes?.data?.data);
        if (appointmentsRes?.status) setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchData();
  }, [user?.token]);

  return (
    <div className="space-y-8 p-5">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border rounded animate-pulse space-y-2"
              >
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-12 bg-gray-300 rounded" />
              </div>
            ))
          : metrics.map(({ label, key, icon: Icon }) => (
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
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="px-4 py-3 animate-pulse border-b">
                    <div className="h-4 bg-gray-200 w-1/3 mb-2 rounded" />
                    <div className="h-4 bg-gray-200 w-1/2 rounded" />
                  </li>
                ))
              : appointments.slice(0, 5).map((a) => (
                  <li
                    key={a.id}
                    className="border-b px-4 py-3 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {`${a.first_name} ${a.last_name}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {a.service_name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">
                          {formatDate(a.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <span className="mr-2">{a.phone}</span>
                      <span>{a.email}</span>
                    </div>
                  </li>
                ))}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="rounded border border-gray-200">
          <h2 className="border-b bg-gray-50 px-4 py-2 text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
          <ul className="divide-y text-sm text-gray-700">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="px-5 py-3 animate-pulse border-b">
                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  </li>
                ))
              : orders.slice(0, 5).map((order) => (
                  <li
                    key={order.id}
                    className="grid grid-cols-4 gap-2 px-5 py-3 hover:bg-gray-50 transition-colors border-b"
                  >
                    <div className="w-full text-wrap sm:w-auto font-medium text-gray-900">
                      #{order.invoice}
                    </div>
                    <div className="w-full text-wrap sm:w-auto">
                      <p className="font-medium">{order?.client?.name}</p>
                      <p className="mt-0.5">{order?.client?.email}</p>
                    </div>
                    <div className="w-full text-wrap sm:w-fit">
                      <span
                        className={`inline-flex items-center gap-0.5 px-3 py-1 rounded-md text-xs font-medium ${
                          order?.gateway?.status === 1
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {order?.gateway?.status === 1 ? (
                          <>
                            <LuCheck className="shrink-0 text-sm" /> Paid via{" "}
                            {order?.gateway?.title}
                          </>
                        ) : (
                          <>
                            <IoMdStopwatch className="text-base shrink-0" />{" "}
                            Unpaid ({order?.gateway?.title})
                          </>
                        )}
                      </span>
                    </div>
                    <div className="w-full text-wrap sm:w-auto">
                      {formatDate(order.created_at)}
                    </div>
                  </li>
                ))}
          </ul>
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
