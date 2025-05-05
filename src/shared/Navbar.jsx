import { useContext, useState } from "react";
import {
  BiHomeAlt,
  BiSolidCategoryAlt,
  BiBook,
  BiUser,
  BiCart,
  BiPackage,
} from "react-icons/bi";
import { MdInfo, MdEmail } from "react-icons/md";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CartContext } from "../Providers/CartProvider";
import { AuthContext } from "../Providers/AuthProvider";
import logo from "../assets/logo/logo-1.png";
import toast from "react-hot-toast";

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

  const handleLogout = () => {
    toast.success("Logout successful!");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

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
            <>
              <Link to="/profile">
                <div className="group flex items-center gap-1.5">
                  <span className="rounded-full bg-primary p-2 text-xl">
                    <BiUser />
                  </span>
                  <span className="group-hover:text-primary">Profile</span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-md border border-primary px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-primary"
              >
                Logout
              </button>
            </>
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
