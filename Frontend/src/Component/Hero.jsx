import { useState, useEffect, useRef } from "react";
import { ArrowIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, PlayIcon } from "../components/icons";
import localImg from "../assets/EditingCartimg1.png";
import localImg2 from "../assets/EditingCartimg2.png";
import localImg3 from "../assets/EditingCartimg3.png";
import "./Hero.css";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* Slide data */
const SLIDES = [
  { src: localImg,  label: "Editing Cart",    tag: "Studio"            },
  { src: "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=900&q=80&fit=crop&auto=format",
                    label: "On Set Shoot",    tag: "Cinematography"    },
  { src: localImg2, label: "Film Production", tag: "Behind the Scenes" },
  { src: localImg3, label: "Directing",       tag: "Film Set"          },
  { src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&fit=crop&auto=format",
                    label: "Color Grading",   tag: "Post Production"   },
];

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "5+",   label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  /* camera-click flash — increments on every slide change to replay animation */
  const [flashTick, setFlashTick] = useState(0);
  const triggerFlash = () => setFlashTick((t) => t + 1);

  /* intro burst — true only on first mount, auto-clears after animation */
  const [introBurst, setIntroBurst] = useState(true);

  const hovered     = useRef(false);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!hovered.current) {
        setActive((a) => (a + 1) % SLIDES.length);
        triggerFlash();
      }
    }, 3000);
  };

  /* Start autoplay on mount + clear intro burst after animation */
  useEffect(() => {
    /* Intro burst lasts 1.6s animation + tiny buffer */
    const burstTimer = setTimeout(() => setIntroBurst(false), 1750);
    /* Autoplay starts after burst so it doesn't conflict */
    const autoplayStart = setTimeout(() => startAutoplay(), 1800);
    return () => {
      clearTimeout(burstTimer);
      clearTimeout(autoplayStart);
      clearInterval(autoplayRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Manual navigation — instant swap + shutter flash */
  const goTo = (idx) => {
    if (idx === active) return;
    setActive(idx);
    triggerFlash();
  };

  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((active + 1) % SLIDES.length);

  return (
    <section id="home" aria-label="Hero" className="hero-section">

      {/* Preload all slide images (hidden) */}
      <div aria-hidden="true" className="hero-preload">
        {SLIDES.map((s) => <img key={s.src} src={s.src} alt="" />)}
      </div>

      {/* Ambient glow */}
      <div aria-hidden="true" className="hero-glow" />

      {/* ══ MAIN GRID ══ */}
      <div className="hero-grid">

        {/* ══ LEFT ══ */}
        <div>
          {/* Eyebrow */}
          <div className="anim-1 hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">
              Video Editor &amp; Creator
            </span>
          </div>

          {/* Headline — forced to two lines */}
          <h1 className="anim-1 hero-headline">
            We Edit Stories That<br />
            Stay With You
          </h1>

          {/* Sub copy */}
          <p className="anim-2 hero-subcopy">
            Turning raw footage into cinematic masterpieces.<br />
            Every cut. Every frame. Every emotion.
          </p>

          {/* CTAs */}
          <div className="anim-2 hero-ctas">
            <button onClick={() => scrollTo("work")} className="btn-primary">
              <PlayIcon style={{ width: "12px", height: "12px" }} />
              Watch Showreel
            </button>
            <button onClick={() => scrollTo("work")} className="btn-ghost">
              View Projects
              <ArrowIcon style={{ width: "14px", height: "14px" }} />
            </button>
          </div>

          {/* Stats */}
          <div className="anim-3 hero-stats-row">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`stat-item${i !== 0 ? " stat-item-bordered" : ""}`}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT: Slider ══ */}
        <div className="anim-2 hero-right-col">

          {/* ── Main image frame ── */}
          <div
            className="slider-frame"
            onMouseEnter={() => { hovered.current = true; }}
            onMouseLeave={() => { hovered.current = false; }}
          >
            {/* ═══ SLIDER ═══ */}
            <div className="slider-wrapper">
              <img
                key={active}
                src={SLIDES[active].src}
                alt={SLIDES[active].label}
                className={`slide-img ${introBurst ? "intro-slide-burst" : "shutter-in"}`}
              />
            </div>

            {/* Gradient overlay — always on top of image */}
            <div className="gradient-overlay z-2" />

            {/* ── Intro camera burst flash — only on page load ── */}
            {introBurst && (
              <div className="intro-burst-flash" aria-hidden="true" />
            )}

            {/* Camera-click flash pulse — remounted via flashTick key so it
                replays instantly on every slide change, manual or auto */}
            {!introBurst && (
              <div key={flashTick} className="shutter-flash flash-active" aria-hidden="true" />
            )}

            {/* Center play button */}
            <div className="play-button-wrap">
              <button
                onClick={() => scrollTo("work")}
                aria-label="Play reel"
                className="play-btn"
              >
                <PlayIcon className="play-icon" />
              </button>
              <span className="play-label">
                Play Reel
              </span>
            </div>

            {/* Slide label — bottom left */}
            <div className="slide-info">
              <span className="slide-tag">
                {SLIDES[active].tag}
              </span>
              <span className="slide-name">
                {SLIDES[active].label}
              </span>
            </div>

            {/* Slide counter — bottom right */}
            <div className="slide-counter">
              <span className="slide-counter-text">
                <span className="counter-active">{String(active + 1).padStart(2, "0")}</span>
                {" / "}
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Corner brackets */}
            <span aria-hidden="true" className="corner corner-tl" />
            <span aria-hidden="true" className="corner corner-tr" />
            <span aria-hidden="true" className="corner corner-bl" />
            <span aria-hidden="true" className="corner corner-br" />
          </div>

          {/* ── Filmstrip thumbnail row ── */}
          <div className="filmstrip">

            {/* Prev */}
            <button onClick={prev} aria-label="Previous slide" className="nav-btn">
              <ArrowIcon className="nav-icon-prev" />
            </button>

            {/* Thumbnails */}
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.label}`}
                className={`thumb${i === active ? " thumb-active" : ""}`}
              >
                <img src={slide.src} alt={slide.label} className="thumb-img" />
                {/* Active indicator bar */}
                {i === active && <span className="thumb-indicator" />}
              </button>
            ))}

            {/* Next */}
            <button onClick={next} aria-label="Next slide" className="nav-btn">
              <ArrowIcon className="nav-icon-next" />
            </button>
          </div>
        </div>

      </div>

      {/* ══ Social strip ══ */}
      <div className="hero-social">
        <span className="social-label">Follow</span>
        <div className="social-divider" />
        {[
          { Icon: InstagramIcon, label: "Instagram" },
          { Icon: YoutubeIcon,   label: "YouTube" },
          { Icon: LinkedinIcon,  label: "LinkedIn" },
        ].map(({ Icon, label }) => (
          <a key={label} href="#" aria-label={label} className="social-link">
            <Icon className="social-icon" />
          </a>
        ))}
      </div>
    </section>
  );
}