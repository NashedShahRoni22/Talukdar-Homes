import React from "react";
import Marquee from "react-fast-marquee";



export default function KeywordsMerque() {
  return (
    <div className="py-5 md:py-10 flex flex-col gap-5 md:gap-10">
      <Marquee speed={100} pauseOnHover direction="right" className="text-2xl md:text-4xl lg:text-6xl uppercase font-extrabold overflow-hidden">
        Safety . Cost . Production . Quality . Safety . Cost . Production . Quality
      </Marquee>
      <Marquee speed={100} pauseOnHover className="text-2xl md:text-4xl lg:text-6xl uppercase font-extrabold text-primary overflow-hidden">
        Build . Management . Design . Construction . Build . Management . Design . Construction 
      </Marquee>
    </div>
  );
}
