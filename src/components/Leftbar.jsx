import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import {
  BiChevronDown,
  BiChevronDownSquare,
  BiChevronRight,
  BiChevronUpCircle,
  BiChevronUpSquare,
} from "react-icons/bi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useState } from "react";
import {
  FiCalendar, // Appointments
  FiMessageSquare, // Messages
  FiUsers, // Customers
  FiShoppingCart, // Orders
  FiBox, // Products
  FiBookOpen, // Blogs
} from "react-icons/fi";
import logo from "../assets/logo/logo-1.png";

const Leftbar = ({ setShow }) => {
  const [showChild, setShowChild] = useState({
    id: null,
    state: false,
  });

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

  return (
    <div className="flex flex-col p-5 shadow-xl min-h-screen sticky top-0 z-50">
      <Link to="/">
        <img
          src={logo}
          alt="talukdar homes logo"
          className="h-10 object-cover"
        />
      </Link>
      {menus.map((m, i) => (
        <div key={i}>
          {m?.childs?.length === 0 ? (
            <Link
              to={m.link}
              onClick={() => setShow(false)}
              className="p-2.5 min-w-full text-sm font-semibold text-center md:text-left flex items-center gap-2.5"
            >
              <span className="p-2 rounded-full shadow text-primary bg-orange-50">
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
                className="p-2.5 min-w-full text-sm font-semibold text-center md:text-left flex justify-between items-center"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-full shadow text-primary bg-orange-50">
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
      <div className="flex justify-center absolute bottom-4 min-w-full">
        <Link
          className="px-4 py-2 text-sm bg-red-500 text-white w-fit rounded shadow flex gap-2 items-center"
          to="/"
          onClick={() => localStorage.removeItem("thAccessToken")}
        >
          {" "}
          <GoSignOut className="text-xl" /> Log Out
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
