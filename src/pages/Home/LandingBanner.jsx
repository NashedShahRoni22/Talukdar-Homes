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
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import your custom styles
import "./LandingBanner.css"; // Import your custom CSS file

export default function LandingBanner() {
  const slides = [image1, image2, image3];

  return (
    <section className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper z-0"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img src={s} alt="" className="w-full z-0 h-[50vh] lg:h-[100vh]" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-12 md:bottom-24 lg:bottom-32 left-5 md:left-10 lg:left-20 z-40">
        <h2 className=" text-3xl md:text-6xl lg:text-8xl font-extrabold text-white uppercase">
          Built on{" "}
          <span className="text-primary">
            <Typewriter
              words={["excellence", "trust", "service", "reputation"]}
              loop={5}
              cursor
              cursorStyle=""
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2500}
            />
          </span>
        </h2>
        <h2 className=" text-3xl md:text-6xl lg:text-8xl font-extrabold text-white uppercase">
          Since 2024
        </h2>
      </div>
    </section>
  );
}
