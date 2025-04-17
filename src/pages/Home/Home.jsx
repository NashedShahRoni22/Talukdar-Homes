import React from "react";
import LandingBanner from "./LandingBanner";
import Contact from "../Contact";
import KeywordsMerque from "./KeywordsMerque";
import WhatWeBuild from "./WhatWeBuild";
import About from "../About/About";
import Testimmonial from "./Testimmonial";
import Services from "../Services/Services";
import EcomerceBanner from "./EcomerceBanner";
import Features from "./Features";

export default function Home() {
  return (
    <main>
      {/* <LandingBanner /> */}
      <EcomerceBanner/>
      <Features/>
      <WhatWeBuild />
      <Services />
      <About />
      <KeywordsMerque />
      <Testimmonial />
      <Contact />
    </main>
  );
}
