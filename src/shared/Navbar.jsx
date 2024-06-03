import React, { useState } from "react";
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
    },
    {
      name: "Service",
      link: "/services",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Blogs",
      link: "/",
    },
  ];
  return (
    <nav
      className={`${
        location.pathname === "/"
          ? "absolute top-0 z-50 bg-none"
          : "bg-black/90"
      } min-w-full flex items-center justify-between`}
    >
      {/* mobile view  */}
      <div className="lg:hidden relative z-50">
        <button
          className="pl-5 py-2.5 md:py-5  md:pl-10"
          onClick={() => setShow(!show)}
        >
          <HiMiniBars3BottomLeft className="text-white text-3xl" />
        </button>
        {show && (
          <div className=" bg-white min-w-[300px] md:min-w-[500px] min-h-screen shadow rounded absolute top-0 left-0 p-5">
            <div className="flex justify-between items-center">
              <h5 className="font-extrabold uppercase text-2xl md:text-4xl text-primary">
                TH
              </h5>
              <button onClick={() => setShow(!show)}>
                <IoMdClose className="text-2xl md:text-4xl" />
              </button>
            </div>
            <div className="flex flex-col gap-2.5 md:gap-5 mt-5 ml-5">
              {menus.map((m, i) => (
                <Link
                  key={i} 
                  onClick={()=> setShow(!show)}
                  className="text-xl md:text-3xl font-semibold border-b-2 border-transparent hover:border-primary ease-linear duration-300"
                  to={m.link}
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* logo here  */}
      <div className="pr-5 py-2.5 md:py-5  md:pr-10">
        <h5 className="font-extrabold text-primary uppercase ml-20 text-2xl md:text-4xl">
          TH
        </h5>
      </div>

      {/* desktop view  */}
      <div className="hidden text-white lg:flex gap-10 mr-20">
        {menus.map((m, i) => (
          <Link className="font-semibold hover:text-primary" to={m.link}>
            {m.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
