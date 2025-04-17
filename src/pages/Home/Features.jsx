import React from "react";

const featuresData = [
  {
    src: "https://img.icons8.com/pulsar-line/96/fast-delivery.png",
    name: "Fast Delivery",
  },
  {
    src: "https://img.icons8.com/ios-filled/96/stripe.png",
    name: "Secured Payments",
  },
  {
    src: "https://img.icons8.com/ios-glyphs/96/trust--v1.png",
    name: "Trusted Service",
  },
  {
    src: "https://img.icons8.com/ios-glyphs/96/warranty.png",
    name: "Authentic Products",
  },
];

export default function Features() {
  return (
    <div className="mx-5 md:container lg:w-1/2 md:mx-auto flex gap-8 justify-between my-5 py-8 px-16 shadow-md rounded-md">
      {featuresData.map((feature, index) => (
        <div className="flex flex-col items-center">
          <img
            key={index}
            className="h-[48px] lg:h-[64px] w-[48px] lg:w-[64px]"
            src={feature.src}
            alt={feature.name}
            title={feature.name}
          />
          <p className="mt-1 text-xs lg:text-sm text-center">{feature.name}</p>
        </div>
      ))}
    </div>
  );
}
