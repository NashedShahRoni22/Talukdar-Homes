import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import aboutimg from "../../assets/about.jpg";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import { Link } from "react-router-dom";
export default function About() {
  const [view, setView] = useState(1);
  const vision = {
    title: "Building today to transform tomorrow",
    desc: "Across this diversity, one thing all our clients share is the trust theyput in us tomanage and deliver construction projects of the highest quality it is what we have built ourreputation on.",
    list: [
      "Building inch by inch",
      "Building to last",
      "Building for the future",
      "Building with trust",
      "Building together",
      "Building safely",
    ],
  };
  const values = {
    title: "Integrated building design for enhanced efficiency",
    desc: "Across this diversity, one thing all our clients share is the trust theyput in us tomanage and deliver construction projects of the highest quality it is what we have built ourreputation on.",
    list: [
      "Building inch by inch",
      "Building to last",
      "Building for the future",
      "Building with trust",
      "Building together",
      "Building safely",
    ],
  };
  return (
    <section className="mx-5 md:container md:mx-auto my-5 md:my-10 relative">
      <div className="">
        <h5 className="text-3xl md:text-6xl lg:text-8xl font-extrabold uppercase text-end">
          About
        </h5>
        <div className="flex flex-col md:flex-row gap-2 md:gap-10 md:items-center mt-10 md:mt-20">
          <div className="flex gap-3 md:gap-4 items-center">
            <div className="h-1 w-[40px] bg-primary"></div>
            <p className="font-extrabold text-primary">WHO WE ARE</p>
          </div>
          <p className="md:ml-20 text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase ">
            LEADING GLOBAL <br /> BUILDER AND <br /> DEVELOPER
          </p>
        </div>
        <div className="relative mt-10 md:mt-20">
          <div className="md:flex gap-5">
            <div className="md:w-1/2" data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500">
              <p className="text-xl md:text-2xl ">
                As a national leader in our industry, we are revolutionizing
                what you expect from a contractor.
              </p>
              <p className="mt-6 text-gray-500">
                Our clients cover a wide range of sectors including local,
                state, territory and Commonwealth governments, retail and sales,
                hospitality, commercial, health and aged care, industrial and
                manufacturing, civil works and defence, as well as
                medium-density residential, in the Northern City and South
                England.
              </p>
              <Link to={'/services'} className="mt-10 bg-black text-white hover:text-black hover:bg-white flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-primary  w-fit group ease-linear duration-300">
                Explore
                <span className="bg-primary group-hover:bg-black p-2.5 rounded-full text-white ease-linear duration-300">
                  <MdOutlineArrowOutward />
                </span>
              </Link>
            </div>
            <div className="md:w-1/2 hidden md:hidden  lg:block" data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500">
              <img src={aboutimg} alt="" className="w-full" />
            </div>
            <div className="flex md:gap-6 md:flex-col md:w-1/2 lg:hidden mt-5 md:mt-0">
              <div className="bg-black text-white p-8 md:p-10 w-1/2">
                <p className="text-6xl">
                  <IoTrophyOutline />
                </p>
                <p className="text-xl font-bold mt-4">
                  <span className="text-6xl font-semibold">90+</span> <br />
                  Completed <br /> Project
                </p>
              </div>
              <div className="bg-[#FF792D] text-white p-8 md:p-10 w-1/2">
                <p className="text-6xl">
                  <BsBuildings />
                </p>
                <p className="text-xl font-bold mt-4">
                  <span className="text-6xl font-semibold">48+</span> <br />{" "}
                  Awards
                  <br /> Winning
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="flex gap-6 lg:absolute lg:top-[-80px] lg:right-5 ">
              <div className="bg-black text-white p-10 ">
                <p className="text-6xl">
                  <IoTrophyOutline />
                </p>
                <p className="text-xl font-bold mt-4">
                  <span className="text-6xl font-semibold">90+</span> <br />
                  Completed <br /> Project
                </p>
              </div>
              <div className="bg-[#FF792D] text-white p-10 ">
                <p className="text-6xl">
                  <BsBuildings />
                </p>
                <p className="text-xl font-bold mt-4">
                  <span className="text-6xl font-semibold">48+</span> <br />{" "}
                  Awards
                  <br /> Winning
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-20 flex flex-col md:flex-row gap-2 md:gap-10 md:items-center">
          <div className="flex gap-3 md:gap-4 items-center">
            <div className="h-1 w-[40px] bg-primary"></div>
            <p className="font-extrabold text-primary uppercase">
              vision & values.
            </p>
          </div>
          <p className="md:ml-20 text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase ">
            WE HAVE A VISION <br /> FOR THE FUTURE OF <br />
            CONSTRUCTION
          </p>
        </div>
        <div className="mt-10 md:mt-20 lg:flex">
          {view === 1 ? (
            <div className="lg:w-1/2">
              <img src={about1} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="lg:w-1/2">
              <img src={about2} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="bg-secondary lg:w-1/2 p-10">
            <div className="flex gap-2">
              <button
                onClick={() => setView(1)}
                className={` ${
                  view === 1 ? "bg-primary text-white" : "bg-white"
                } flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-transparent  w-fit group ease-linear duration-300`}
              >
                Our Vision
              </button>
              <button
                onClick={() => setView(2)}
                className={`${
                  view === 2 ? "bg-primary text-white" : "bg-white"
                } flex gap-2 items-center px-5 py-2 rounded-full shadow border hover:shadow-xl hover:border-transparent  w-fit group ease-linear duration-300`}
              >
                Core Values
              </button>
            </div>
            {view === 1 ? (
              <div>
                <h3 className="mt-6 text-xl md:text-3xl font-bold">
                  {vision.title}
                </h3>
                <p className="mt-6 text-gray-500">{vision.desc}</p>
                <ul className="mt-6 grid lg:grid-cols-2 gap-3">
                  {vision.list.map((vl, i) => (
                    <div key={i}>
                      <li className="list-disc text-primary py-3">
                        <span className="text-black ">{vl}</span>
                      </li>
                      <hr className="border" />
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="mt-6 text-xl md:text-3xl font-bold">
                  {values.title}
                </h3>
                <p className="mt-6 text-gray-500">{values.desc}</p>
                <ul className="mt-6 grid  lg:grid-cols-2  gap-3">
                  {values.list.map((vl, i) => (
                    <div key={i}>
                      <li className="list-disc text-primary py-3">
                        <span className="text-black ">{vl}</span>
                      </li>
                      <hr className="border" />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1229"
        height="818"
        viewBox="0 0 1229 818"
        fill="none"
        className="absolute top-0 z-0"
      >
        <path
          d="M614.659 245.462L614.529 245.625L614.399 245.462L614.012 245.98C471.766 436.536 329.84 626.683 187.448 817.5H1.00094C102.89 681.862 204.787 546.224 306.684 410.586L307.65 409.3L309.397 406.974C411.101 271.594 512.804 136.213 614.5 0.832502C715.777 135.655 817.061 270.477 918.345 405.3L921.35 409.3C1023.57 545.367 1125.79 681.433 1228 817.5H1041.61C958.84 706.587 876.236 595.919 793.646 485.268C734.125 405.525 674.611 325.791 615.046 245.981L614.659 245.462Z"
          stroke="#DFE1E7"
        ></path>
      </svg> */}
    </section>
  );
}
