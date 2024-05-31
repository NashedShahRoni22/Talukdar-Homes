import React, { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  return (
    <nav className="absolute top-0 z-50 min-w-full flex items-center justify-between lg:px-10 lg:py-5 container mx-auto">
      {/* mobile view  */}
      <div className="lg:hidden relative">
        <button className="p-2.5 md:p-5" onClick={() => setShow(!show)}>
          <HiMiniBars3BottomLeft className="text-white text-3xl" />
        </button>
        {show && (
          <div className=" bg-white min-w-[250px] md:min-w-[450px] min-h-screen shadow rounded absolute top-0 left-0 p-5">
            <div className="flex justify-between items-center">
              <h5 className="font-extrabold uppercase text-2xl md:text-4xl text-primary">
                TH
              </h5>
              <button onClick={() => setShow(!show)}>
                <IoMdClose className="text-2xl md:text-4xl" />
              </button>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              <Link className="text-xl md:text-3xl font-semibold" to={"/"}>
                Home
              </Link>
              <Link
                className="text-xl md:text-3xl font-semibold"
                to={"/contact"}
              >
                Services
              </Link>
              <Link
                className="text-xl md:text-3xl font-semibold"
                to={"/contact"}
              >
                About
              </Link>
              <Link
                className="text-xl md:text-3xl font-semibold"
                to={"/contact"}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* logo here  */}
      <div>
        <h5 className="font-extrabold text-primary uppercase p-2.5 md:p-5 text-2xl md:text-4xl">
          TH
        </h5>
      </div>

      {/* desktop view  */}
      <div className="hidden text-white lg:flex gap-10">
        <Link className="lg:text-xl font-semibold" to={"/"}>
          Home
        </Link>
        <Link className="lg:text-xl font-semibold" to={"/contact"}>
          Services
        </Link>
        <Link className="lg:text-xl font-semibold" to={"/contact"}>
          About
        </Link>
        <Link className="lg:text-xl font-semibold" to={"/contact"}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
