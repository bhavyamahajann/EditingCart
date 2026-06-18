import { useState } from "react";
import Intro        from "./Component/Intro";
import Navbar       from "./Component/Navbar";
import Hero         from "./Component/Hero";
import Showcase     from "./Component/Showcase";
import About        from "./Component/About";
import Services     from "./Component/Services";
import Portfolio    from "./Component/Portfolio";
import Stats        from "./Component/Stats";
import CTA          from "./Component/CTA";
import Footer       from "./Component/Footer";
import AboutPage    from "./components/Pages/AboutPage";
import ContactUs    from "./components/Pages/ContactUs";
import VideoEditing from "./components/Pages/Services/VideoEditing";
import ThreeD       from "./components/Pages/Services/3D";
import Cgi          from "./components/Pages/Services/Cgi";

export default function App() {
  /* introDone flips true once on first load, never resets */
  const [introDone, setIntroDone] = useState(false);
  const [page,      setPage]      = useState("home");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {/* Intro overlay — shown only once on first load */}
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      {/* Main site — fades in after intro */}
      <div
        style={{
          opacity:       introDone ? 1 : 0,
          transition:    "opacity 0.6s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <Navbar onNavigate={navigate} currentPage={page} />

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

        {page === "about"   && <AboutPage />}
        {page === "contact" && <ContactUs />}
        {page === "video"   && <VideoEditing onNavigate={navigate} />}
        {page === "3d"      && <ThreeD       onNavigate={navigate} />}
        {page === "cgi"     && <Cgi          onNavigate={navigate} />}

        <Footer />
      </div>
    </div>
  );
}
