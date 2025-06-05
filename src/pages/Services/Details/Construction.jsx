import React from "react";
import construction from "../../../assets/Services/construction.jpg";
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

export default function Construction() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = {
    thumnail: construction,
    slug: "construction",
    title:
      "Comprehensive construction solutions—from the ground up to project completion.",
    desc: "Across this diversity, one thing all our clients share is the trust they put in us to manage and deliver construction projects of the highest quality, on time and on budget – it’s what we’ve built our reputation on.",
    addonsDesc:
      "From concept and building design to project and construction management, our flexible, multi-skilled team provides comprehensive, innovative, forward-thinking solutions. And as your construction partner, our services can even extend to helping you acquire and develop land to deliver one streamlined package of work, eliminating the headache of extra administrative steps.",

    features: {
      title:
        "No matter the challenge, we build on what we know works and elevate your vision of success",
      details: [
        {
          topic: "End-to-End Project Management",
          desc: "From pre-construction planning to final delivery, our team ensures every stage is managed efficiently and transparently.",
        },
        {
          topic: "Sustainable Building Practices",
          desc: "We incorporate eco-friendly materials and methods to meet today’s standards and tomorrow’s expectations.",
        },
        {
          topic: "Expert Workforce",
          desc: "Our team of skilled engineers, project managers, and site supervisors bring deep expertise and a passion for excellence.",
        },
        {
          topic: "On-Time, On-Budget Delivery",
          desc: "We prioritize efficiency and accountability to meet deadlines and stay within your investment framework.",
        },
      ],
    },

    benifits: {
      title: "Why partner with us for your next construction project?",
      details: [
        {
          topic: "Tailored construction strategies for every client",
        },
        {
          topic: "Unmatched attention to structural detail and durability",
        },
        {
          topic: "Seamless integration of design and execution",
        },
        {
          topic: "Strong network of trusted vendors and contractors",
        },
      ],
    },

    faqs: [
      {
        topic: "What types of construction projects do you handle?",
        desc: "We specialize in medium to large-scale commercial, industrial, and residential construction projects tailored to client needs.",
      },
      {
        topic: "How do you ensure construction quality and safety?",
        desc: "We follow strict quality assurance protocols and adhere to industry-standard safety regulations at every project stage.",
      },
      {
        topic: "Can you help with land acquisition and permits?",
        desc: "Yes. Our team assists clients with land acquisition, local authority approvals, and complete project documentation.",
      },
      {
        topic: "What is your typical construction timeline?",
        desc: "Timelines vary depending on the project scope, but we provide a detailed timeline upfront and stick to milestones rigorously.",
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
