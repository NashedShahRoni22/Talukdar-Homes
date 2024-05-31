import React from "react";
import LandingBanner from "./LandingBanner";
import Contact from "../Contact";

export default function Home() {
  return (
    <main className="relative">
      <LandingBanner />
      <Contact/>
    </main>
  );
}
