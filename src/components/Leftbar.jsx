import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import {
  BiChevronDown,
  BiChevronDownSquare,
  BiChevronRight,
  BiChevronUpCircle,
  BiChevronUpSquare,
} from "react-icons/bi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useContext, useState } from "react";
import {
  FiCalendar, // Appointments
  FiMessageSquare, // Messages
  FiUsers, // Customers
  FiShoppingCart, // Orders
  FiBox, // Products
  FiBookOpen, // Blogs
} from "react-icons/fi";
import logo from "../assets/logo/logo-1.png";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
const menus = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: <FiCalendar />,
    childs: [],
  },
  {
    name: "Appointments",
    link: "/admin/appointments",
    icon: <FiCalendar />,
    childs: [],
  },
  {
    name: "Messages",
    link: "/admin/contacts",
    icon: <FiMessageSquare />,
    childs: [],
  },
  {
    name: "Customers",
    link: "/admin/customers",
    icon: <FiUsers />,
    childs: [],
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: <FiShoppingCart />,
    childs: [],
  },
  {
    name: "Products",
    id: "1",
    icon: <FiBox />,
    childs: [
      {
        name: "Category",
        link: "/admin/add-category",
      },
      // {
      //   name: "Subcategory",
      //   link: "/admin/add-subcategory",
      // },
      {
        name: "Add Product",
        link: "/admin/add-product",
      },
      {
        name: "Manage Products",
        link: "/admin/manage-products",
      },
    ],
  },
  {
    name: "Services",
    id: "2",
    icon: <FiBookOpen />,
    childs: [
      {
        name: "Add Service",
        link: "/admin/add-service",
      },
      {
        name: "Manage Service",
        link: "/admin/manage-service",
      },
    ],
  },
  {
    name: "Blogs",
    id: "3",
    icon: <FiBookOpen />,
    childs: [
      {
        name: "Add Blog",
        link: "/admin/add-blog",
      },
      {
        name: "Manage Blogs",
        link: "/admin/manage-blog",
      },
    ],
  },
];

const Leftbar = ({ setShow }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showChild, setShowChild] = useState({
    id: null,
    state: false,
  });

  const handleLogout = () => {
    toast.success("Logout successful!");
    localStorage.removeItem("thAccessToken");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 flex min-h-screen flex-col shadow-xl">
      <Link to="/" className="bg-black py-2.5">
        <img
          src={logo}
          alt="talukdar homes logo"
          className="mx-auto h-10 object-cover"
        />
      </Link>
      {menus.map((m, i) => (
        <div key={i} className="px-5">
          {m?.childs?.length === 0 ? (
            <Link
              to={m.link}
              onClick={() => setShow(false)}
              className="flex min-w-full items-center gap-2.5 p-2.5 text-center text-sm font-semibold md:text-left"
            >
              <span className="rounded-full bg-orange-50 p-2 text-primary shadow">
                {m.icon}
              </span>
              {m.name}
            </Link>
          ) : (
            <>
              <button
                onClick={() =>
                  setShowChild({ state: !showChild.state, id: m.id })
                }
                className="flex min-w-full items-center justify-between p-2.5 text-center text-sm font-semibold md:text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-orange-50 p-2 text-primary shadow">
                    {m.icon}
                  </span>
                  {m.name}
                </div>
                {showChild.state && showChild.id === m.id ? (
                  <BiChevronUpSquare className="text-xl text-primary" />
                ) : (
                  <BiChevronDownSquare className="text-xl text-primary" />
                )}
              </button>
              {showChild.state && showChild.id === m.id && (
                <div className="ml-8 flex flex-col gap-2.5">
                  {m.childs &&
                    m.childs.map((mc, i) => (
                      <Link key={i} to={mc.link} className="flex gap-2 text-sm">
                        <MdOutlineSubdirectoryArrowRight className="text-primary" />
                        {mc.name}
                      </Link>
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
      <div className="absolute bottom-4 flex min-w-full justify-center">
        <button
          onClick={handleLogout}
          className="flex w-fit items-center gap-2 rounded bg-red-500 px-4 py-2 text-sm text-white shadow"
        >
          <GoSignOut className="text-xl" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Leftbar;
