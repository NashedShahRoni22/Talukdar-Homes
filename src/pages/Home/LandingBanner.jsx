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
import "./LandingBanner.css"; // Import your custom CSS file

export default function LandingBanner() {
  const slides = [image1, image2, image3];

  return (
    <section className="relative">
      <Swiper
        centeredSlides={true}
        fadeEffect={true}
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
              alt=""
              className="z-0 h-[50vh] w-full lg:h-[100vh]"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-12 left-5 z-40 md:bottom-24 md:left-10 lg:bottom-32 lg:left-20">
        <h2 className="text-3xl font-extrabold uppercase text-white md:text-6xl lg:text-8xl">
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
        <h2 className="text-3xl font-extrabold uppercase text-white md:text-6xl lg:text-8xl">
          Since 2024
        </h2>
      </div>
    </section>
  );
}
