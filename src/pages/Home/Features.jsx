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
    <div className="mx-5 my-5 flex justify-between gap-8 rounded-md px-16 py-8 shadow-md md:container md:mx-auto lg:w-1/2">
      {featuresData.map((feature, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            className="h-[48px] w-[48px] lg:h-[64px] lg:w-[64px]"
            src={feature.src}
            alt={feature.name}
            title={feature.name}
          />
          <p className="mt-1 text-center text-xs lg:text-sm">{feature.name}</p>
        </div>
      ))}
    </div>
  );
}
