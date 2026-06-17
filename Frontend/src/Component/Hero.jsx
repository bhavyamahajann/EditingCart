import { useState, useEffect, useRef } from "react";
import { ArrowIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, PlayIcon } from "../components/icons";
import localImg from "../assets/EditingCartimg1.png";
import localImg2 from "../assets/EditingCartimg2.png";
import localImg3 from "../assets/EditingCartimg3.png";
import "./Hero.css";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ── Slide data — local asset first, then Unsplash cinematic shots ── */
const SLIDES = [
  {
    src:   localImg,
    label: "Editing Cart",
    tag:   "Studio",
  },
  {
    src:   "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=900&q=80&fit=crop&auto=format",
    label: "On Set Shoot",
    tag:   "Cinematography",
  },
  {
    src:    localImg2,
    label: "Film Production",
    tag:   "Behind the Scenes",
  },
  {
    src:   localImg3,
    label: "Directing",
    tag:   "Film Set",
  },
  {
    src:   "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&fit=crop&auto=format",
    label: "Color Grading",
    tag:   "Post Production",
  },
];

/* First 4 slides are the intro flash sequence */
const INTRO_SRCS = SLIDES.slice(0, 4).map((s) => s.src);
/* Each intro frame: 250ms visible + 120ms cross-fade = 370ms per frame */
const INTRO_FRAME_MS  = 250;
const INTRO_FADE_MS   = 120;
const INTRO_TOTAL_MS  = INTRO_SRCS.length * (INTRO_FRAME_MS + INTRO_FADE_MS); // ~1480ms
const REVEAL_FADE_MS  = 500; // slider fade-in after intro

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "5+",   label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  // flashTick increments on every slide change (manual or auto) to re-trigger
  // the camera-click flash/scale-in animation — the swap itself is instant.
  const [flashTick, setFlashTick] = useState(0);
  const triggerFlash = () => setFlashTick((t) => t + 1);

  /* ── Intro state ── */
  // introStep: 0-3 = which intro image is showing, 4 = done (slider visible)
  const [introStep,     setIntroStep]     = useState(0);
  const [introFading,   setIntroFading]   = useState(false); // cross-fade between intro frames
  const [introDone,     setIntroDone]     = useState(false); // intro finished, show slider
  const [sliderVisible, setSliderVisible] = useState(false); // opacity-1 after fade-in
  const introRan = useRef(false);

  /* Autoplay */
  const hovered     = useRef(false);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!hovered.current) {
        setActive((a) => (a + 1) % SLIDES.length); // instant swap, 0s delay
        triggerFlash();
      }
    }, 3000);
  };


  /* Run intro once, then start autoplay */
  useEffect(() => {
    if (introRan.current) return;
    introRan.current = true;

    let step = 0;
    const showNext = () => {
      if (step >= INTRO_SRCS.length - 1) {
        // Last frame shown — fade out intro, reveal slider
        setTimeout(() => {
          setIntroFading(true);                    // fade the last intro image
          setTimeout(() => {
            setIntroDone(true);                    // unmount intro overlay
            setActive(0);
            // slight delay then opacity-1
            setTimeout(() => {
              setSliderVisible(true);
              startAutoplay();
            }, 60);
          }, REVEAL_FADE_MS);
        }, INTRO_FRAME_MS);
        return;
      }
      // Cross-fade to next frame
      setTimeout(() => {
        setIntroFading(true);
        setTimeout(() => {
          step += 1;
          setIntroStep(step);
          setIntroFading(false);
        }, INTRO_FADE_MS);
      }, INTRO_FRAME_MS);

      // Schedule the frame after this one
      setTimeout(showNext, INTRO_FRAME_MS + INTRO_FADE_MS);
    };

    showNext();

    return () => clearInterval(autoplayRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Slider manual navigation — instant swap, 0s delay before image changes */
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
            {/* ═══ INTRO FLASH OVERLAY — sits on top, removed after done ═══ */}
            {!introDone && (
              <div aria-hidden="true" className="intro-overlay">
                {/* Render all 4 intro images stacked; only the current one is visible */}
                {INTRO_SRCS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="intro-img"
                    style={{
                      /* Only the active intro step is visible — fully state-driven, kept inline */
                      opacity:    i === introStep ? (introFading ? 0 : 1) : 0,
                      transform:  i === introStep ? (introFading ? "scale(1.05)" : "scale(1)") : "scale(1.05)",
                      filter:     `brightness(0.72) contrast(1.05) blur(${introFading ? 3 : 0}px)`,
                      transition: `opacity ${INTRO_FADE_MS}ms ease, transform ${INTRO_FADE_MS + 80}ms ease`,
                    }}
                  />
                ))}
                {/* Gradient overlay on intro frames */}
                <div className="gradient-overlay" />
              </div>
            )}

            {/* ═══ SLIDER — always rendered, fades in after intro ═══ */}
            <div
              className="slider-wrapper"
              style={{
                opacity:    introDone && sliderVisible ? 1 : 0,
                transition: `opacity ${REVEAL_FADE_MS}ms ease`,
              }}
            >
              {/* Active slide image — swaps instantly (key={active}), entrance
                  animation auto-plays on every mount, 0s pre-swap delay */}
              <img
                key={active}
                src={SLIDES[active].src}
                alt={SLIDES[active].label}
                className="slide-img shutter-in"
              />
            </div>

            {/* Gradient overlay — always on top of image */}
            <div className="gradient-overlay z-2" />

            {/* Camera-click flash pulse — remounted via flashTick key so it
                replays instantly on every slide change, manual or auto */}
            <div key={flashTick} className="shutter-flash flash-active" aria-hidden="true" />

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