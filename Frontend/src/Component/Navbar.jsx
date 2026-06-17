import { useState, useEffect, useRef } from "react";
import { PlayIcon } from "../components/icons";
import { NAV_LINKS } from "../constants";
import "./Navbar.css";  

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [open,           setOpen]           = useState(false);
  const [activeId,       setActiveId]       = useState("home");
  const [logoAnimated,   setLogoAnimated]   = useState(false);
  const observerRef = useRef(null);

  /* ── scroll blur ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close drawer on desktop ── */
  useEffect(() => {
    const mq    = window.matchMedia("(min-width: 768px)");
    const close = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  /* ── logo pulse on mount ── */
  useEffect(() => {
    const t = setTimeout(() => setLogoAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <style>{STYLES}</style>

      <header className={`nb-header ${scrolled ? "nb-header--scrolled" : ""}`}>
        <div className="nb-inner">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("home")}
            aria-label="Go to top"
            className={`nb-logo ${logoAnimated ? "nb-logo--ready" : ""}`}
          >
            <span className="nb-logo__icon">
              <PlayIcon style={{ width: "13px", height: "13px", color: "#0A0A0A" }} />
            </span>
            <span className="nb-logo__text">Editing Cart</span>
          </button>

          {/* ── Desktop nav ── */}
          <nav aria-label="Primary navigation" className="nb-nav nb-hide-mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nb-link ${activeId === link.id ? "nb-link--active" : ""}`}
              >
                {link.label}
                <span className="nb-link__dot" />
              </button>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <button
            onClick={() => scrollTo("contact")}
            className="nb-cta nb-hide-mobile"
          >
            Start a Project
          </button>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="nb-burger nb-show-mobile"
          >
            <span className={`nb-burger__line ${open ? "nb-burger__line--top-open" : ""}`} />
            <span className={`nb-burger__line ${open ? "nb-burger__line--mid-open" : ""}`} />
            <span className={`nb-burger__line ${open ? "nb-burger__line--bot-open" : ""}`} />
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <div className={`nb-drawer nb-show-mobile ${open ? "nb-drawer--open" : ""}`}>
          <div className="nb-drawer__inner">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nb-drawer__link ${activeId === link.id ? "nb-drawer__link--active" : ""}`}
              >
                {link.label}
                {activeId === link.id && <span className="nb-drawer__active-bar" />}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="nb-cta nb-cta--full"
            >
              Start a Project
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

const STYLES = `
  /* ── import from Navbar.css if preferred ── */
`;