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
import AboutPage from "./components/Pages/AboutPage";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [page, setPage] = useState("home");

  return (
    <div
      style={{
        background:  "#0A0A0A",
        color:       "#F0EDE8",
        minHeight:   "100vh",
        width:       "100%",
        overflowX:   "hidden",
        overflow:    introDone ? "auto" : "hidden",
      }}
    >
      <Intro onDone={() => setIntroDone(true)} />

      <div
        style={{
          opacity:       introDone ? 1 : 0,
          transition:    "opacity 0.6s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <Navbar onNavigate={setPage} currentPage={page} />

        {page === "home" && (
          <main>
            <Hero />
            <Showcase />
            <About />
            <Services />
            <Portfolio />
            <Stats />
            <CTA />
          </main>
        )}

        {page === "about" && <AboutPage />}

        <Footer />
      </div>
    </div>
  );
}