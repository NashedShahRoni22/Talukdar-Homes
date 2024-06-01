import React from "react";
import LandingBanner from "./LandingBanner";
import Contact from "../Contact";
import KeywordsMerque from "./KeywordsMerque";
import WhatWeBuild from "./WhatWeBuild";
import About from "../About/About";

export default function Home() {
  return (
    <main className="relative">
      <LandingBanner />
      <WhatWeBuild/>
      <About/>
      <KeywordsMerque/>
      <Contact/>
    </main>
  );
}
