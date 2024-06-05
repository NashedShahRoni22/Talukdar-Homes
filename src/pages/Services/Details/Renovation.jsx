import React from "react";
import renovation from "../../../assets/Services/renovation.jpg";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BsCheckCircleFill } from "react-icons/bs";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function Renovation() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = {
    thumnail: renovation,
    slug: "renovation",
    title:
      "We offer commitment at all levels of building project, from renovation to management services.",
    desc: "Across this diversity, one thing all our clients share is the trust they put in us to manage and deliver renovation projects of the highest quality, on time and on budget – it’s what we’ve built our reputation on.",
    addonsDesc: "From concept and building design to project and renovation management, our flexible, multi-skilled team provides comprehensive, innovative, forward-thinking solutions. And as your renovation partner, our services can even extend to helping you acquire and develop land to deliver one streamlined package of work, eliminating the headache of extra administrative steps",
    features: {
      title:
        "No matter the challenge, we build on what we know works and elevate your vision of success",
      details: [
        {
          topic: "Quality & Reliable",
          desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
        },
        {
          topic: "Quality & Reliable",
          desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
        },
        {
          topic: "Quality & Reliable",
          desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
        },
        {
          topic: "Quality & Reliable",
          desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
        },
      ],
    },

    benifits: {
      title:
        "No matter the challenge, we build on what we know works and elevate your vision of success",
      details: [
        {
          topic: "Building the future powered by innovation",
        },
        {
          topic: "Building the future powered by innovation",
        },
        {
          topic: "Building the future powered by innovation",
        },
        {
          topic: "Building the future powered by innovation",
        },
      ],
    },
    faqs: [
      {
        topic: "Quality & Reliable",
        desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
      },
      {
        topic: "Quality & Reliable",
        desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
      },
      {
        topic: "Quality & Reliable",
        desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
      },
      {
        topic: "Quality & Reliable",
        desc: "Focusing on medium to large-scale commercial renovation projects, we work with both investors and developers to create landmarks that make an impact.",
      },
    ],
  };

  return (
    <section className="mx-5 md:container lg:w-1/2 md:mx-auto my-5 md:my-10 flex flex-col gap-8 md:gap-16">
      <div>
        <div className="relative">
          <img
            src={data.thumnail}
            alt="cover_photo_of_service"
            className="lg:h-[50vh] w-full"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-black/70 flex justify-center items-center">
            <p className="text-2xl md:text-4xl lg:text-6xl font-extrabold uppercase text-white">{data.slug}</p>
          </div>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold my-2.5 md:my-5">
          {data.title}
        </h1>
        <p>{data.desc}</p>
        <p className="mt-2.5 md:mt-5">{data.addonsDesc}</p>
      </div>
      <ul className="grid md:grid-cols-2 gap-5">
        {data.features.details.map((fd, i) => (
          <li key={i} className="flex flex-col gap-2.5">
            <span className="text-primary md:text-xl font-bold">0{i + 1}.</span>
            <h5 className="md:text-xl font-semibold">{fd.topic}</h5>
            <p className="text-sm md:text-base">{fd.desc}</p>{" "}
          </li>
        ))}
      </ul>
      <div>
        <p className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          {data.benifits.title}
        </p>
        <ul className="grid md:grid-cols-2 gap-5 mt-5 md:mt-10">
          {data.benifits.details.map((bd, i) => (
            <li key={i} className="flex gap-2 items-center">
              <BsCheckCircleFill className="text-xl md:text-3xl text-primary" />
              {bd.topic}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          Frequently asked questions
        </p>
        <div className="mt-2.5 md:mt-5">
          {data.faqs.map((faq, i) => (
            <Accordion key={i} open={open === i} animate={CUSTOM_ANIMATION}>
              <AccordionHeader
                onClick={() => handleOpen(i)}
                className="text-base"
              >
                {faq.topic}
              </AccordionHeader>
              <AccordionBody className="text-base">{faq.desc}</AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
