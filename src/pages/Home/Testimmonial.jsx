import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

export default function Testimmonial() {
  const data = [
    {
      text: "Working with this company was a fantastic experience. They were professional, timely, and their quality of work is outstanding. Our home renovation exceeded our expectations.",
      author: "John Anderson",
      desg: "Homeowner, Sydney",
    },
    {
      text: "From start to finish, the team was incredibly supportive and attentive to our needs. The construction of our new home was seamless and the materials used were top-notch. Highly recommend!",
      author: "Emma Thompson",
      desg: "Homeowner, Melbourne",
    },
    {
      text: "Their expertise in home development and renovation is unparalleled. The attention to detail and dedication to delivering quality service truly impressed us.",
      author: "David Lee",
      desg: "Real Estate Developer, Brisbane",
    },
    {
      text: "The renovation project was completed on time and within budget. The team was professional and communicated effectively throughout the process. We are very pleased with the results.",
      author: "Sophia Martinez",
      desg: "Homeowner, Perth",
    },
    {
      text: "The company provided excellent service in supplying high-quality materials for our home construction. Their customer service was exceptional, ensuring all our needs were met promptly.",
      author: "Liam Nguyen",
      desg: "Construction Manager, Adelaide",
    },
    {
      text: "Their commitment to excellence is evident in every aspect of their work. Our home looks beautiful, and the renovation process was hassle-free thanks to their professional approach.",
      author: "Olivia Brown",
      desg: "Homeowner, Canberra",
    },
  ];
  
  return (
    <section className="py-10 md:py-20 lg:min-h-screen bg-secondary">
      <div className="mx-5 md:container md:mx-auto">
        <h5 className="text-3xl md:text-6xl lg:text-8xl font-extrabold uppercase text-end">
          Testimonial
        </h5>
        <div className="flex flex-col md:flex-row gap-2 md:gap-10 md:items-center mt-10 md:mt-20">
          <div className="flex gap-3 md:gap-4 items-center">
            <div className="h-1 w-[40px] bg-primary"></div>
            <p className="font-extrabold text-primary uppercase">reviews</p>
          </div>
          <p className="md:ml-20 text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase ">
            What our <br /> client says
          </p>
        </div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          // pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper mt-10 lg:mt-20"
        >
          {data.map((d, i) => (
            <SwiperSlide
              key={i}
              className="border-2 shadow-xl rounded p-5 lg:p-10 bg-white border-primary"
            >
              <FaQuoteLeft className="text-2xl md:text-4xl text-primary" />
              <p className="mt-5 md:mt-10 text-lg md:text-2xl text-gray-600">
                {d.text.slice(0, 200)}
              </p>
              <p className="mt-5 md:mt-10 md:text-xl font-semibold text-primary">
                {d.author}
              </p>
              <p className="text-sm md:text-base">{d.desg}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="flex justify-center items-center gap-2.5 mt-5 text-sm font-semibold lg:hidden">
        Slilde to right<BsArrowRightCircleFill />
      </p>
    </section>
  );
}
