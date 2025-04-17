import React, { useState } from "react";
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
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [show, setShow] = useState(false);
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
      name: "Profile",
      link: "/profile",
      icon: <BiUser />,
      className:
        "p-2.5 flex justify-center items-center rounded-full bg-primary text-white",
    },
    {
      name: "Cart",
      link: "/cart",
      icon: <BiCart />,
      className:
        "p-2.5 flex justify-center items-center rounded-full bg-primary text-white",
    },
  ];

  return (
    <nav className="bg-black/90">
      <section className="mx-5 md:container md:mx-auto flex items-center justify-between">
        {/* mobile view  */}
        <div className="lg:hidden relative z-50">
          <button className=" py-2.5 md:py-5  " onClick={() => setShow(!show)}>
            <HiMiniBars3BottomLeft className="text-white text-3xl" />
          </button>
          {show && (
            <div className=" bg-white min-w-[300px] md:min-w-[500px] min-h-screen shadow rounded fixed top-0 left-0 p-5">
              <div className="flex justify-between items-center">
                <h5 className="font-extrabold uppercase text-2xl md:text-4xl text-primary">
                  TH
                </h5>
                <button onClick={() => setShow(!show)}>
                  <IoMdClose className="text-2xl md:text-4xl" />
                </button>
              </div>
              <div className="flex flex-col items-start gap-2.5 md:gap-5 mt-5 ml-5">
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
          <Link
            to={"/"}
            className="font-extrabold text-primary uppercase text-2xl md:text-4xl"
          >
            TH
          </Link>
        </div>

        {/* desktop view  */}
        <div className="hidden text-white lg:flex lg:items-center gap-10">
          {menus.map((m, i) => (
            <Link key={i} to={m.link}>
              {m.name === "Profile" || m.name === "Cart" ? (
                <div className="flex items-center gap-1.5 group">
                  <span className="text-xl p-2 bg-primary rounded-full">{m.icon}</span>
                  <span className="group-hover:text-primary">{m.name}</span>
                </div>
              ) : (
                <>
                  <span className="hover:text-primary">{m.name}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </section>
    </nav>
  );
}
