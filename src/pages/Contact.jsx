import { Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Contact() {
  return (
    <section className="mx-5 md:container md:mx-auto flex flex-col my-5 md:my-10 gap-5 md:gap-10">
      <h5 className="text-3xl md:text-6xl lg:text-8xl font-extrabold uppercase">
        Contact
      </h5>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 md:items-center text-primary">
        <div className="h-1 w-[50px] bg-primary"></div>
        <p>get in touch</p>
        <p className="text-2xl md:text-4xl lg:text-6xl font-extrabold uppercase">
          WE’D LOVE TO <br /> HEAR FROM YOU
        </p>
      </div>
      <div>
        <form action="" className="flex flex-col gap-8 md:gap-16">
          <p className="text-xl md:text-2xl lg:text-4xl font-extrabold capitalize">
            Information Request
          </p>
          <p className="text-gray-500">
            For more information and how we can meet your needs, please fill out
            the form <br /> below and someone from our team will be in touch.
          </p>
          <div className="bg-gray-100 p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-10">
              <Input
                required
                variant="static"
                label="Name"
                placeholder="Name"
              />
              <Input
                required
                variant="static"
                label="Phone Number"
                placeholder="Phone Number"
              />
              <Input
                required
                variant="static"
                label="Email"
                placeholder="Email"
              />
            </div>
            <div className="mt-10">
              <Textarea
                required
                variant="static"
                label="Message"
                placeholder="Say something..."
              />
            </div>
            <button className="mt-10 bg-black text-white hover:text-black hover:bg-white flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-transparent  w-fit group ease-linear duration-300">
              Submit{" "}
              <span className="bg-primary group-hover:bg-black p-2.5 rounded-full text-white ease-linear duration-300">
                <MdOutlineArrowOutward />
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
