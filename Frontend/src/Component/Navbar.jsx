import { useState, useEffect, useRef } from "react";
import { PlayIcon } from "../components/icons";
import { NAV_LINKS } from "../constants";
import "./Navbar.css";

/* ── Services dropdown data ── */
const SERVICES_DROPDOWN = [
  {
    id: "video",
    title: "Video Editing",
    desc: "Cuts, color grading, pacing — cinematic finish",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v16M18 4v16M4 8h2M18 8h2M4 12h2M18 12h2M4 16h2M18 16h2M8 4h8" />
      </svg>
    ),
  },
  {
    id: "3d",
    title: "3D",
    desc: "Motion graphics, animation & product renders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L21 7.5V16.5L12 21L3 16.5V7.5L12 3z" />
        <path d="M12 3v18M3 7.5l9 4.5M21 7.5l-9 4.5" />
      </svg>
    ),
  },
  {
    id: "cgi",
    title: "CGI",
    desc: "Photorealistic visuals & visual effects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
];

const ChevronIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Navbar
 * Props:
 *   onNavigate(page: "home" | "about") — called when switching pages
 *   currentPage: "home" | "about"
 */
export default function Navbar({ onNavigate, currentPage }) {
  const [scrolled,           setScrolled]           = useState(false);
  const [open,               setOpen]               = useState(false);
  const [activeId,           setActiveId]           = useState("home");
  const [logoAnimated,       setLogoAnimated]       = useState(false);
  const [servicesOpen,       setServicesOpen]       = useState(false);
  const servicesTimeoutRef = useRef(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const observerRef = useRef(null);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile drawer on desktop resize */
  useEffect(() => {
    const mq    = window.matchMedia("(min-width: 768px)");
    const close = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  /* Close dropdown on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setServicesOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openServices  = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  /* Active section observer — only on home page */
  useEffect(() => {
    if (currentPage !== "home") return;
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
  }, [currentPage]);

  /* Sync active indicator with current page */
  useEffect(() => {
    if (currentPage === "about")   setActiveId("about");
    if (currentPage === "contact") setActiveId("contact");
    if (currentPage === "home")    setActiveId("home");
  }, [currentPage]);

  /* Logo entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setLogoAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* ── Navigation handler ── */
  const handleNavClick = (id) => {
    setOpen(false);
    setServicesOpen(false);

    /* "About Us" → switch to about page */
    if (id === "about") {
      onNavigate?.("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    /* "Contact Us" → switch to contact page */
    if (id === "contact") {
      onNavigate?.("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    /* Any other link while on a sub-page → go home first, then scroll */
    if (currentPage !== "home") {
      onNavigate?.("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    onNavigate?.("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`nb-header ${scrolled ? "nb-header--scrolled" : ""}`}>
      <div className="nb-inner">

        {/* ── Logo ── */}
        <button
          onClick={goHome}
          aria-label="Go to home"
          className={`nb-logo ${logoAnimated ? "nb-logo--ready" : ""}`}
        >
          <span className="nb-logo__icon">
            <PlayIcon style={{ width: "13px", height: "13px", color: "#0A0A0A" }} />
          </span>
          <span className="nb-logo__text">Editing Cart</span>
        </button>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary navigation" className="nb-nav nb-hide-mobile">
          {NAV_LINKS.map((link) =>
            link.id === "services" ? (
              <div
                key={link.id}
                className="nb-dropdown"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => handleNavClick(link.id)}
                  className={`nb-link nb-link--dropdown ${activeId === link.id ? "nb-link--active" : ""}`}
                >
                  <span className="nb-link__label-row">
                    {link.label}
                    <ChevronIcon className={`nb-link__chevron ${servicesOpen ? "nb-link__chevron--open" : ""}`} />
                  </span>
                  <span className="nb-link__dot" />
                </button>

                <div
                  role="menu"
                  className={`nb-dropdown__panel ${servicesOpen ? "nb-dropdown__panel--open" : ""}`}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <div className="nb-dropdown__eyebrow">What we do</div>
                  {SERVICES_DROPDOWN.map((item) => (
                    <button
                      key={item.id}
                      role="menuitem"
                      onClick={() => { setServicesOpen(false); onNavigate?.(item.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="nb-dropdown__item"
                    >
                      <div className="nb-dropdown__item-icon">{item.icon}</div>
                      <div className="nb-dropdown__item-text">
                        <span className="nb-dropdown__item-title">{item.title}</span>
                        <span className="nb-dropdown__item-desc">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nb-link ${activeId === link.id ? "nb-link--active" : ""}`}
              >
                {link.label}
                <span className="nb-link__dot" />
              </button>
            )
          )}
        </nav>

        {/* ── Desktop CTA ── */}
        <button onClick={() => handleNavClick("contact")} className="nb-cta nb-hide-mobile">
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
          {NAV_LINKS.map((link) =>
            link.id === "services" ? (
              <div key={link.id} className="nb-drawer__group">
                <button
                  onClick={() => setMobileServicesOpen((o) => !o)}
                  aria-expanded={mobileServicesOpen}
                  className={`nb-drawer__link nb-drawer__link--toggle ${activeId === link.id ? "nb-drawer__link--active" : ""}`}
                >
                  {link.label}
                  {activeId === link.id && <span className="nb-drawer__active-bar" />}
                  <ChevronIcon className={`nb-drawer__chevron ${mobileServicesOpen ? "nb-drawer__chevron--open" : ""}`} />
                </button>
                <div className={`nb-drawer__submenu ${mobileServicesOpen ? "nb-drawer__submenu--open" : ""}`}>
                  <div className="nb-drawer__submenu-inner">
                    {SERVICES_DROPDOWN.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setOpen(false); onNavigate?.(item.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="nb-drawer__subitem"
                      >
                        <div className="nb-drawer__subitem-icon">{item.icon}</div>
                        <span className="nb-drawer__subitem-title">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nb-drawer__link ${activeId === link.id ? "nb-drawer__link--active" : ""}`}
              >
                {link.label}
                {activeId === link.id && <span className="nb-drawer__active-bar" />}
              </button>
            )
          )}
          <button onClick={() => handleNavClick("contact")} className="nb-cta nb-cta--full">
            Start a Project
          </button>
        </div>
      </div>
    </header>
  );
}
