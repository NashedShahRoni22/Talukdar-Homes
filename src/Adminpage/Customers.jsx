import { useState, useEffect, useContext } from "react";
import { FiUser, FiMail, FiCalendar, FiTrash2, FiSearch } from "react-icons/fi";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formatDate";
import LoaderPage from "./LoaderPage";

const Customers = () => {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    const getCustomers = async () => {
      try {
        const res = await fetch(
          "https://api.talukderhomes.com.au/api/clients",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await res.json();
        if (data?.status === true) {
          setCustomers(data?.data);
        } else {
          toast.error(data?.msg);
        }
      } catch (error) {
        console.error("customers", error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, [user?.token]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (customerId) => {
    fetch(`https://api.talukderhomes.com.au/api/clients/${customerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === true) {
          toast.success("User deleted successfully!");
          setCustomers(
            customers.filter((customer) => customer.id !== customerId)
          );
        } else {
          toast.error(data?.msg);
        }
      });
  };

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <section className="p-5">
      <h1 className="text-3xl font-bold text-gray-800">Customers</h1>

      <div className="mt-6">
        <div className="flex md:flex-row flex-col gap-2.5 justify-between md:items-center mb-6">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-gray-500">
            {filteredCustomers.length}{" "}
            {filteredCustomers.length === 1 ? "customer" : "customers"} found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-secondary transition-all duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                          <FiUser className="text-primary" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <div className="text-sm text-gray-500">
                          {formatDate(customer.created_at)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        className="text-red-500 inline-flex items-center bg-red-50 px-3 py-1 rounded-lg gap-0.5 hover:text-red-700"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <FiTrash2 />
                        <span className="mt-0.5">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No customers found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Customers;
