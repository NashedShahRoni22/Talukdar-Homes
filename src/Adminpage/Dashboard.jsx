import { useEffect, useState } from "react";
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
import { getApi } from "../api/getApi";

const metrics = [
  { label: "Appointments", key: "appointments", icon: FaCalendarAlt },
  { label: "Messages", key: "messages", icon: FaComments },
  { label: "Customers", key: "customers", icon: FaUsers },
  { label: "Orders", key: "orders", icon: FaBoxOpen },
  { label: "Products", key: "products", icon: FaShoppingBag },
  { label: "Services", key: "services", icon: FaTools },
  { label: "Blogs", key: "blogs", icon: FaPenNib },
];

const quickLinks = [
  { label: "Add Product", href: "/admin/products/new" },
  { label: "Add Blog Post", href: "/admin/blogs/new" },
  { label: "Manage Orders", href: "/admin/orders" },
  { label: "View Messages", href: "/admin/messages" },
];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    messages: [],
    customers: [],
    orders: [],
    products: [],
    services: [],
    blogs: [],
  });

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
    const fetchAllData = async () => {
      const apiCalls = [
        getApi("https://api.talukderhomes.com.au/api/appointments"),
        getApi("https://api.talukderhomes.com.au/api/contacts"),
        // getApi("https://api.example.com/customers"),
        // getApi("https://api.example.com/orders", { Authorization: `Bearer ${token}` }),
        getApi("https://api.talukderhomes.com.au/api/products"),
        getApi("https://api.talukderhomes.com.au/api/services"),
        getApi("https://api.talukderhomes.com.au/api/blogs"),
      ];

      const [
        appointments,
        messages,
        customers,
        orders,
        products,
        services,
        blogs,
      ] = await Promise.all(apiCalls);

      setDashboardData({
        appointments: appointments?.status ? appointments.data : [],
        messages: messages?.status ? messages.data : [],
        customers: [], // placeholder for future call
        orders: [], // placeholder for future call
        products: products?.status ? products.data : [],
        services: services?.status ? services.data : [],
        blogs: blogs?.status ? blogs.data : [],
      });
    };

    fetchAllData();
  }, []);

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
                {dashboardData[key]?.length ?? 0}
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
            {dashboardData?.appointments?.length > 0 &&
              dashboardData?.appointments
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
                  ),
                )}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="rounded border border-gray-200">
          <h2 className="border-b bg-gray-50 px-4 py-2 text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
          <ul className="text-sm text-gray-800">
            <li className="border-b px-4 py-3 last:border-b-0 hover:bg-gray-50">
              #1023 - Sarah - $120.00
            </li>
            <li className="border-b px-4 py-3 last:border-b-0 hover:bg-gray-50">
              #1022 - Ahmed - $89.99
            </li>
            <li className="border-b px-4 py-3 last:border-b-0 hover:bg-gray-50">
              #1021 - Emma - $45.50
            </li>
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
