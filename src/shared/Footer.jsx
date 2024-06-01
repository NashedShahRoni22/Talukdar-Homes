import React from "react";
import { BiCopyright, BiWorld } from "react-icons/bi";
import { MdEmail, MdOutlineArrowOutward } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Footer() {
  const menus = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Service",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <footer className="py-5 md:py-10 bg-black/90 border-t-4 border-primary">
      <section className="mx-5 md:container md:mx-auto ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          <div className="flex gap-5">
            <PiPhoneCall className="text-2xl md:text-4xl text-gray-600" />
            <div>
              <p className="text-gray-600 md:text-xl font-semibold">Call Us</p>
              <p className="text-white text-xl md:text-2xl lg:text-3xl">
                12345678
              </p>
            </div>
          </div>
          <div className="flex gap-5 ">
            <MdEmail className="text-2xl md:text-4xl text-gray-600" />
            <div>
              <p className="text-gray-600 md:text-xl font-semibold">
                Need Support
              </p>
              <p className="text-white text-xl md:text-2xl lg:text-3xl">
                support@example.com
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <BiWorld className="text-2xl md:text-4xl text-gray-600" />
            <div>
              <p className="text-gray-600 md:text-xl font-semibold">Office</p>
              <p className="text-white text-xl md:text-2xl lg:text-3xl">
                2972 Westheimer Rd
              </p>
            </div>
          </div>
        </div>
        <div className="my-5 md:my-10 bg-gray-600 h-0.5 w-full"></div>
        <div className="mt-5 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
          <div>
            <h5 className="font-extrabold text-primary uppercase text-2xl md:text-4xl">
              TH
            </h5>
          </div>
          <div className="flex gap-5">
            {menus.map((m, i) => (
              <Link
                className="font-semibold text-white hover:text-primary"
                to={m.link}
              >
                {m.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h5 className="text-white">Need to reach us?</h5>
            <p className="text-gray-600">
              We’re here to answer all your questions. Fill out our contact form
              and we’ll connect you with the people who can help.
            </p>
            <button className="bg-black text-white hover:text-black hover:bg-white flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-transparent  w-fit group ease-linear duration-300">
              Submit{" "}
              <span className="bg-primary group-hover:bg-black p-2.5 rounded-full text-white ease-linear duration-300">
                <MdOutlineArrowOutward />
              </span>
            </button>
          </div>
        </div>
        <div className="my-5 md:my-10 bg-gray-600 h-0.5 w-full"></div>
        <div className="mt-5 md:mt-10">
          <p className="flex gap-2.5 items-center text-white justify-center">
            {" "}
            <BiCopyright /> 2024 <Link to="/" className="text-primary font-semibold">Talukdar Home</Link> All Rights Reserved{" "}
          </p>
        </div>
      </section>
    </footer>
  );
}
