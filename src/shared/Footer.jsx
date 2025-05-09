import React from "react";
import { BiCopyright, BiWorld } from "react-icons/bi";
import {
  BsFacebook,
  BsLinkedin,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
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
      name: "Services",
      link: "/services",
    },
    {
      name: "Products",
      link: "/products",
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
    <footer className="border-t-4 border-primary bg-black/90 py-5 md:py-10">
      <section className="mx-5 md:container md:mx-auto">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <div className="flex gap-5">
            <PiPhoneCall className="text-2xl text-gray-600 md:text-4xl" />
            <div>
              <p className="font-semibold text-gray-600 md:text-xl">Call Us</p>
              <p className="text-white lg:text-xl">0452 246 490</p>
            </div>
          </div>
          <div className="flex gap-5">
            <MdEmail className="text-2xl text-gray-600 md:text-4xl" />
            <div>
              <p className="font-semibold text-gray-600 md:text-xl">
                Need Support
              </p>
              <p className="text-white lg:text-xl">info@talukderhomes.com.au</p>
            </div>
          </div>
          <div className="flex gap-5">
            <BiWorld className="text-2xl text-gray-600 md:text-4xl" />
            <div>
              <p className="font-semibold text-gray-600 md:text-xl">Office</p>
              <p className="text-white lg:text-xl">
                Suit 15/186 Queen St, Campbelltown NSW 2560
              </p>
            </div>
          </div>
        </div>
        <div className="my-5 h-0.5 w-full bg-gray-600 md:my-10"></div>
        <div className="mt-5 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <div>
            <h5 className="text-2xl font-extrabold uppercase text-primary md:text-4xl">
              TH
            </h5>
            <div className="mt-5 flex gap-5 md:mt-10">
              <BsFacebook className="text-xl text-white hover:text-primary md:text-2xl lg:text-3xl" />
              <BsTwitter className="text-xl text-white hover:text-primary md:text-2xl lg:text-3xl" />
              <BsLinkedin className="text-xl text-white hover:text-primary md:text-2xl lg:text-3xl" />
              <BsYoutube className="text-xl text-white hover:text-primary md:text-2xl lg:text-3xl" />
              <BsWhatsapp className="text-xl text-white hover:text-primary md:text-2xl lg:text-3xl" />
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            {menus.map((m, i) => (
              <Link
                key={i}
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
            <Link
              to={"/contact"}
              className="group flex w-fit items-center gap-2 rounded-full border bg-white px-5 py-2 font-semibold text-black shadow duration-300 ease-linear hover:border-transparent hover:bg-primary hover:text-white hover:shadow-xl"
            >
              Contact{" "}
              <span className="rounded-full bg-primary p-2.5 text-white duration-300 ease-linear group-hover:bg-black">
                <MdOutlineArrowOutward />
              </span>
            </Link>
          </div>
        </div>
        <div className="my-5 h-0.5 w-full bg-gray-600 md:my-10"></div>
        <div className="mt-5 md:mt-10">
          <p className="flex items-center justify-center gap-2.5 text-white">
            {" "}
            <BiCopyright /> 2024{" "}
            <Link to="/" className="font-semibold text-primary">
              Talukdar Home
            </Link>{" "}
            All Rights Reserved{" "}
          </p>
        </div>
      </section>
    </footer>
  );
}
