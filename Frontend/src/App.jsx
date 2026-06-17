import { useState } from "react";
import Intro     from "./Component/Intro";
import Navbar    from "./Component/Navbar";
import Hero      from "./Component/Hero";
import Showcase  from "./Component/Showcase";
import About     from "./Component/About";
import Services  from "./Component/Services";
import Portfolio from "./Component/Portfolio";
import Stats     from "./Component/Stats";
import CTA       from "./Component/CTA";
import Footer    from "./Component/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div
      style={{
        background:   "#0A0A0A",
        color:        "#F0EDE8",
        minHeight:    "100vh",
        width:        "100%",
        overflowX:    "hidden",
        /* block scroll while intro is showing */
        overflow:     introDone ? "auto" : "hidden",
      }}
    >
      {/* Intro overlay — sits on top of everything */}
      <Intro onDone={() => setIntroDone(true)} />

      {/* Main site — visible underneath but scroll-locked until intro done */}
      <div
        style={{
          opacity:    introDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          /* don't let site content be interactive during intro */
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <Showcase />
          <About />
          <Services />
          <Portfolio />
          <Stats />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
