import { useContext, useEffect, useRef, useState } from "react";
import {
  BiHomeAlt,
  BiSolidCategoryAlt,
  BiBook,
  BiUser,
  BiCart,
  BiPackage,
  BiLogOut,
} from "react-icons/bi";
import { MdInfo, MdEmail } from "react-icons/md";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CartContext } from "../Providers/CartProvider";
import { AuthContext } from "../Providers/AuthProvider";
import logo from "../assets/logo/logo-1.png";
import toast from "react-hot-toast";
import { FiGrid } from "react-icons/fi";

const menus = [
  {
    name: "Home",
    link: "/",
    icon: <BiHomeAlt />,
  },
  {
    name: "Services",
    link: "/services",
    icon: <BiSolidCategoryAlt />,
  },
  {
    name: "Products",
    link: "/products",
    icon: <BiPackage />,
  },
  {
    name: "About",
    link: "/about",
    icon: <MdInfo />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdEmail />,
  },
  {
    name: "Blogs",
    link: "/blogs",
    icon: <BiBook />,
  },
  {
    name: "Cart",
    link: "/cart",
    icon: <BiCart />,
    className:
      "p-2.5 flex justify-center items-center rounded-full bg-primary text-white",
  },
];

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const { carts } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // handle logout
  const handleLogout = () => {
    toast.success("Logout successful!");
    localStorage.removeItem("accessToken");
    setUser(null);
    toggleDropdown();
  };

  // Hide profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black/90">
      <section className="mx-5 flex items-center justify-between md:container md:mx-auto">
        {/* mobile view  */}
        <div className="relative z-50 lg:hidden">
          <button className="py-2.5 md:py-5" onClick={() => setShow(!show)}>
            <HiMiniBars3BottomLeft className="text-3xl text-white" />
          </button>
          {show && (
            <div className="fixed left-0 top-0 min-h-screen min-w-[300px] rounded bg-white p-5 shadow md:min-w-[500px]">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <img
                    src={logo}
                    alt="talukdar homes logo"
                    className="h-12 w-[140px] object-cover"
                  />
                </Link>
                <button onClick={() => setShow(!show)}>
                  <IoMdClose className="text-2xl md:text-4xl" />
                </button>
              </div>
              <div className="ml-5 mt-5 flex flex-col items-start gap-2.5 md:gap-5">
                {menus.map((m, i) => (
                  <Link
                    key={i}
                    to={m.link}
                    onClick={() => setShow(!show)}
                    className={"flex items-center gap-2 p-2"}
                  >
                    <span className="text-xl">{m.icon}</span>
                    {m.name && <span>{m.name}</span>}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/profile"
                    onClick={() => setShow(!show)}
                    className={"flex items-center gap-2 p-2"}
                  >
                    <span className="text-xl">
                      <BiUser />
                    </span>
                    <span>Profile</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* logo here  */}
        <div className="py-2.5 md:py-5">
          <Link to="/">
            <img
              src={logo}
              alt="talukdar homes logo"
              className="h-10 object-cover"
            />
          </Link>
        </div>

        {/* desktop view  */}
        <div className="hidden gap-10 text-white lg:flex lg:items-center">
          {menus.map((m, i) => (
            <Link key={i} to={m.link}>
              {m.name === "Profile" || m.name === "Cart" ? (
                <div className="group flex items-center gap-1.5">
                  <span className="rounded-full bg-primary p-2 text-xl">
                    {m.icon}
                  </span>
                  <span className="group-hover:text-primary">{m.name}</span>
                  {m.name === "Cart" && carts?.length > 0 && (
                    <span className="group-hover:text-primary">
                      ({carts?.length})
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <span className="hover:text-primary">{m.name}</span>
                </>
              )}
            </Link>
          ))}

          {user ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={toggleDropdown}>
                <div className="group flex items-center gap-1.5">
                  <span className="rounded-full bg-primary p-2.5">
                    <BiUser className="text-base" />
                  </span>
                  <span className="group-hover:text-primary">Profile</span>
                </div>
              </button>

              {/* profile drop down menu */}
              {showDropdown && (
                <div className="absolute left-1/2 top-full z-50 mt-1.5 min-w-28 -translate-x-1/2 rounded-lg border border-white/5 bg-[#252525] text-center text-white shadow-lg">
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={toggleDropdown}
                      className="flex w-full items-center gap-1 rounded-md px-4 py-2 text-sm transition duration-200 hover:bg-[#191919] hover:text-primary"
                    >
                      <FiGrid className="min-w-fit" /> Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={toggleDropdown}
                    className="flex w-full items-center gap-1 rounded-md px-4 py-2 text-sm transition duration-200 hover:bg-[#191919] hover:text-primary"
                  >
                    <BiUser className="min-w-fit" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-1 rounded-md px-4 py-2 text-sm transition duration-200 hover:bg-[#191919] hover:text-primary"
                  >
                    <BiLogOut className="min-w-fit" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </section>
    </nav>
  );
}
