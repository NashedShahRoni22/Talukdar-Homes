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
      "Tailored renovation services—from interior upgrades to complete structural transformation.",
    desc: "Whether restoring heritage properties or modernizing commercial spaces, our clients trust us to deliver renovations of exceptional quality—on time, within budget, and with minimal disruption. Our reputation is built on attention to detail and long-lasting results.",
    addonsDesc:
      "From interior design and structural changes to complete project management, our agile, multi-disciplinary team delivers end-to-end renovation solutions. We work closely with clients to modernize existing spaces while preserving character, adding value, and improving functionality.",

    features: {
      title: "Reimagine your space with smart, seamless renovation strategies",
      details: [
        {
          topic: "Customized Renovation Planning",
          desc: "We create tailored plans that respect the integrity of the space while achieving modern goals—no two projects are alike.",
        },
        {
          topic: "Minimal Disruption Execution",
          desc: "Our renovation workflow is optimized to ensure the least interference with your ongoing operations or home life.",
        },
        {
          topic: "Adaptive Structural Modifications",
          desc: "We evaluate load-bearing structures, plumbing, and electrical systems to enable safe and efficient upgrades.",
        },
        {
          topic: "Style Meets Functionality",
          desc: "Our design-first approach ensures that every renovated element is both visually impressive and practically effective.",
        },
      ],
    },

    benifits: {
      title: "Why choose us for your renovation journey?",
      details: [
        {
          topic: "Modern upgrades that respect original design",
        },
        {
          topic: "Increased property value and energy efficiency",
        },
        {
          topic: "Expert handling of permits, codes, and compliance",
        },
        {
          topic: "Trusted craftsmanship with decades of expertise",
        },
      ],
    },

    faqs: [
      {
        topic: "Do you handle both residential and commercial renovations?",
        desc: "Yes. We specialize in both sectors, from luxury apartment updates to full-scale commercial space redesigns.",
      },
      {
        topic: "Can renovations be done in occupied buildings?",
        desc: "Absolutely. We plan renovations in phases to minimize impact and ensure safety for occupants during the process.",
      },
      {
        topic: "Do you assist with design and material selection?",
        desc: "Yes. Our in-house designers help choose finishes, fixtures, and layouts that align with your vision and budget.",
      },
      {
        topic: "How do you manage unexpected issues during renovation?",
        desc: "We conduct thorough pre-renovation assessments and maintain transparent communication if any structural or logistical challenges arise.",
      },
    ],
  };

  return (
    <section className="mx-5 my-5 flex flex-col gap-8 md:container md:mx-auto md:my-10 md:gap-16 lg:w-1/2">
      <div>
        <div className="relative">
          <img
            src={data.thumnail}
            alt="cover_photo_of_service"
            className="w-full lg:h-[50vh]"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/70">
            <p className="text-2xl font-extrabold uppercase text-white md:text-4xl lg:text-6xl">
              {data.slug}
            </p>
          </div>
        </div>
        <h1 className="my-2.5 text-xl font-extrabold md:my-5 md:text-2xl lg:text-3xl">
          {data.title}
        </h1>
        <p>{data.desc}</p>
        <p className="mt-2.5 md:mt-5">{data.addonsDesc}</p>
      </div>
      <ul className="grid gap-5 md:grid-cols-2">
        {data.features.details.map((fd, i) => (
          <li key={i} className="flex flex-col gap-2.5">
            <span className="font-bold text-primary md:text-xl">0{i + 1}.</span>
            <h5 className="font-semibold md:text-xl">{fd.topic}</h5>
            <p className="text-sm md:text-base">{fd.desc}</p>{" "}
          </li>
        ))}
      </ul>
      <div>
        <p className="text-xl font-extrabold md:text-2xl lg:text-3xl">
          {data.benifits.title}
        </p>
        <ul className="mt-5 grid gap-5 md:mt-10 md:grid-cols-2">
          {data.benifits.details.map((bd, i) => (
            <li key={i} className="flex items-center gap-2">
              <BsCheckCircleFill className="text-xl text-primary md:text-3xl" />
              {bd.topic}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xl font-extrabold md:text-2xl lg:text-3xl">
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
