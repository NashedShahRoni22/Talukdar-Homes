import React from "react";
import construction from "../../assets/Services/construction.jpg";
import architecture from "../../assets/Services/architecture.jpg";
import renovation from "../../assets/Services/renovation.jpg";
import supply from "../../assets/Services/supply.jpg";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Services() {
  const data = [
    {
      title: "Construction",
      img: construction,
      link: "/construction-services",
    },
    {
      title: "Material Supply",
      img: supply,
      link: "/products",
    },
    {
      title: "House Renovation",
      img: renovation,
      link: "/renovation-services",
    },
    {
      title: "Development",
      img: architecture,
      link: "/development-services",
    },
  ];
  return (
    <section className="my-5 md:my-10 lg:my-20">
      <div className="mx-5 md:container md:mx-auto">
        <h5 className="text-end text-3xl font-extrabold uppercase md:text-6xl lg:text-8xl">
          Services
        </h5>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-2 md:gap-10 md:items-center mt-10 md:mt-20">
          <div className="flex gap-3 md:gap-4 items-center">
            <div className="h-1 w-[40px] bg-primary"></div>
            <p className="font-extrabold text-primary">WHO WE ARE</p>
          </div>
          <p className="md:ml-20 text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase ">
            LEADING GLOBAL <br /> BUILDER AND <br /> DEVELOPER
          </p>
        </div> */}
      <div className="mt-10 grid md:mt-20 md:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="group relative overflow-hidden"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <img
              src={d.img}
              alt=""
              className="object-cover duration-300 ease-linear group-hover:-rotate-6 group-hover:scale-110 md:h-[650px]"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black/80 group-hover:bg-black/50">
              <p className="text-center text-xl font-extrabold text-white md:text-2xl lg:text-4xl">
                {d.title}
              </p>
              <Link
                to={d.link}
                className="group mt-5 hidden w-fit items-center gap-2 rounded-full border bg-black px-5 py-2 text-white shadow duration-300 ease-linear hover:border-primary hover:bg-white hover:text-black hover:shadow-xl group-hover:flex"
              >
                Explore{" "}
                <span className="rounded-full bg-primary p-2.5 text-white">
                  <MdOutlineArrowOutward />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
