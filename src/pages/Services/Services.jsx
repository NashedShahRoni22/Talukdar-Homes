import React from "react";
import image from "../../assets/about2.jpg";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Services() {
  const data = [
    {
      title: "Construction",
      img: image,
    },
    {
      title: "Material Supply",
      img: image,
    },
    {
      title: "House Renovation",
      img: image,
    },
    {
      title: "Development",
      img: image,
    },
  ];
  return (
    <section className="my-5 md:my-10 lg:my-20">
      <div className="mx-5 md:container md:mx-auto">
        <h5 className="text-3xl md:text-6xl lg:text-8xl font-extrabold uppercase text-end">
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
      <div className="mt-10 md:mt-20 grid md:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="relative group overflow-hidden"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <img
              src={d.img}
              alt=""
              className="md:h-[650px] object-cover group-hover:scale-110 group-hover:-rotate-6 ease-linear duration-300"
            />
            <div className="absolute top-0 left-0 bg-black/80 group-hover:bg-black/50 h-full w-full flex flex-col justify-center items-center">
              <p className="text-xl md:text-2xl lg:text-4xl font-extrabold text-white">
                {d.title}
              </p>
              <button className="mt-5 bg-black text-white hover:text-black hover:bg-white hidden group-hover:flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-primary  w-fit group ease-linear duration-300">
                Explore{" "}
                <span className="bg-primary p-2.5 rounded-full text-white">
                  <MdOutlineArrowOutward />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
