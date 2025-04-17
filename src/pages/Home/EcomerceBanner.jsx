import React from "react";
import { Typewriter } from "react-simple-typewriter";

import image1 from "../../assets/Banners/1.png";
import image2 from "../../assets/Banners/2.png";
import image3 from "../../assets/Banners/3.png";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

// Import your custom styles
import "./LandingBanner.css";
import { Button, Option, Select } from "@material-tailwind/react";

export default function EcomerceBanner() {
  const slides = [image1, image2, image3];

  return (
    <section className="relative mx-5 md:container md:mx-auto">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper z-0"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s}
              alt={`slide-${i}`}
              className="w-full z-0 h-[450px] lg:h-[600px] object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Centered Search Box */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center gap-5 text-center">
          {/* Headline Text */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Find the Best Products
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Select your category and sub-category to get started
            </p>
          </div>

          {/* Select Inputs */}
          <div className="w-full flex flex-col gap-8 mt-5">
            <Select
              variant="static"
              label="Category"
              className="focus:outline-none border-primary"
            >
              <Option>Category 1</Option>
              <Option>Category 2</Option>
              <Option>Category 3</Option>
            </Select>

            <Select
              variant="static"
              label="Sub Category"
              className="focus:outline-none border-primary"
            >
              <Option>Sub Category 1</Option>
              <Option>Sub Category 2</Option>
              <Option>Sub Category 3</Option>
            </Select>

            <Button className="bg-primary">Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
