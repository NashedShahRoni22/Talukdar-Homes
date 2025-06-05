import React from "react";
import architecture from "../../../assets/Services/architecture.jpg";
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

export default function Development() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = {
    thumnail: architecture,
    slug: "architecture",
    title:
      "Comprehensive architectural solutions—from initial concepts to project completion.",
    desc: "Clients across sectors rely on our team to design, manage, and deliver architectural projects with precision. We combine aesthetic vision with structural integrity, ensuring each project is completed on time and within budget without compromising creativity.",
    addonsDesc:
      "From master planning and architectural design to construction documentation and project oversight, our experienced team delivers strategic, end-to-end development solutions. We can also assist with land acquisition and feasibility studies, offering a seamless approach to complex building projects.",

    features: {
      title:
        "Elevating ideas into timeless structures through thoughtful design and execution",
      details: [
        {
          topic: "Vision-Driven Design",
          desc: "We work closely with clients to transform abstract ideas into practical, inspiring architectural concepts.",
        },
        {
          topic: "Sustainable Architecture",
          desc: "We integrate energy-efficient systems and sustainable materials to future-proof your property and reduce long-term costs.",
        },
        {
          topic: "Collaboration with Stakeholders",
          desc: "Our process includes continuous communication with engineers, planners, and developers to ensure a unified result.",
        },
        {
          topic: "Code-Compliant Documentation",
          desc: "From blueprints to permits, we ensure every detail meets local regulations, reducing delays and rework.",
        },
      ],
    },

    benifits: {
      title: "Why partner with us for your architectural development?",
      details: [
        {
          topic: "End-to-end architectural and project support",
        },
        {
          topic: "Creative yet functional design solutions",
        },
        {
          topic: "Expertise in regulatory and zoning compliance",
        },
        {
          topic: "Future-ready, sustainable building practices",
        },
      ],
    },

    faqs: [
      {
        topic: "What types of architecture projects do you handle?",
        desc: "We specialize in commercial, residential, and mixed-use developments, including both new builds and expansions.",
      },
      {
        topic: "Do you assist with planning permissions and approvals?",
        desc: "Yes, we prepare and manage all necessary documentation for zoning, building codes, and permits.",
      },
      {
        topic:
          "Can you integrate our brand identity into the architectural design?",
        desc: "Absolutely. We consider brand, function, and user experience throughout the design process to create a cohesive structure.",
      },
      {
        topic: "What makes your architectural process unique?",
        desc: "We blend creative thinking with technical expertise, ensuring that every project is beautiful, buildable, and budget-conscious.",
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
