import { useState, useEffect } from "react";
import { PlayIcon } from "../icons";
import { NAV_LINKS } from "../../constants";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq    = window.matchMedia("(min-width: 768px)");
    const close = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--transparent"}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <button className="navbar__logo" onClick={() => scrollTo("home")} aria-label="Go to top">
          <span className="navbar__logo-icon">
            <PlayIcon />
          </span>
          <span className="navbar__logo-text">Editing Cart</span>
        </button>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <button key={link.id} className="navbar__nav-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="btn-primary navbar__cta" onClick={() => scrollTo("contact")}>
          Start a Project
        </button>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`navbar__bar ${open ? "navbar__bar--open-top" : ""}`} />
          <span className={`navbar__bar ${open ? "navbar__bar--open-mid" : ""}`} />
          <span className={`navbar__bar ${open ? "navbar__bar--open-bottom" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? "navbar__drawer--open" : "navbar__drawer--closed"}`}>
        <div className="navbar__drawer-inner">
          {NAV_LINKS.map((link) => (
            <button key={link.id} className="navbar__drawer-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
          <button className="btn-primary navbar__drawer-cta" onClick={() => scrollTo("contact")}>
            Start a Project
          </button>
        </div>
      </div>
    </header>
  );
}
