import { useState, useEffect, useRef } from "react";
import { ArrowIcon, PlayIcon } from "../icons";
import localImg  from "../../assets/EditingCartimg1.png";
import localImg2 from "../../assets/EditingCartimg2.png";
import localImg3 from "../../assets/EditingCartimg3.png";
import "./HeroSlider.css";

/* ── Shared slide data ── */
export const SLIDES = [
  { src: localImg,  label: "Editing Cart",    tag: "Studio"           },
  { src: "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?w=900&q=80&fit=crop&auto=format",
                    label: "On Set Shoot",    tag: "Cinematography"   },
  { src: localImg2, label: "Film Production", tag: "Behind the Scenes"},
  { src: localImg3, label: "Directing",       tag: "Film Set"         },
  { src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&fit=crop&auto=format",
                    label: "Color Grading",   tag: "Post Production"  },
];

const INTRO_SRCS    = SLIDES.slice(0, 4).map((s) => s.src);
const FRAME_MS      = 250;
const FADE_MS       = 120;
const REVEAL_MS     = 500;

/**
 * HeroSlider — reusable image slider with cinematic intro flash animation.
 * Props:
 *   onSlideClick  — called when the center play button is clicked
 *   autoplay      — boolean (default true)
 *   autoplayDelay — ms (default 3000)
 */
export default function HeroSlider({
  onSlideClick  = () => {},
  autoplay      = true,
  autoplayDelay = 3000,
}) {
  const [active,       setActive]       = useState(0);
  const [fading,       setFading]       = useState(false);
  const [introStep,    setIntroStep]    = useState(0);
  const [introFading,  setIntroFading]  = useState(false);
  const [introDone,    setIntroDone]    = useState(false);
  const [sliderVis,    setSliderVis]    = useState(false);
  /* camera-click flash on every slide change */
  const [flash,        setFlash]        = useState(false);

  const hovered     = useRef(false);
  const autoplayRef = useRef(null);
  const introRan    = useRef(false);

  /* ── Autoplay ── */
  const startAutoplay = () => {
    if (!autoplay) return;
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!hovered.current) triggerNext();
    }, autoplayDelay);
  };

  const triggerNext = () => {
    setFading(true);
    setFlash(true);
    setTimeout(() => { setFlash(false); }, 120);
    setTimeout(() => {
      setActive((a) => (a + 1) % SLIDES.length);
      setFading(false);
    }, 220);
  };

  /* ── Intro flash sequence — runs once on mount ── */
  useEffect(() => {
    if (introRan.current) return;
    introRan.current = true;

    let step = 0;
    const showNext = () => {
      if (step >= INTRO_SRCS.length - 1) {
        setTimeout(() => {
          setIntroFading(true);
          setTimeout(() => {
            setIntroDone(true);
            setActive(0);
            setTimeout(() => {
              setSliderVis(true);
              startAutoplay();
            }, 60);
          }, REVEAL_MS);
        }, FRAME_MS);
        return;
      }
      setTimeout(() => {
        setIntroFading(true);
        setTimeout(() => {
          step += 1;
          setIntroStep(step);
          setIntroFading(false);
        }, FADE_MS);
      }, FRAME_MS);
      setTimeout(showNext, FRAME_MS + FADE_MS);
    };
    showNext();

    return () => clearInterval(autoplayRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Manual navigation ── */
  const goTo = (idx) => {
    if (idx === active) return;
    setFading(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 220);
  };

  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((active + 1) % SLIDES.length);

  return (
    <div className="hs-wrap">

      {/* ── Main image frame ── */}
      <div
        className={`hs-frame ${flash ? "hs-frame--flash" : ""}`}
        onMouseEnter={() => { hovered.current = true; }}
        onMouseLeave={() => { hovered.current = false; }}
      >
        {/* Preload */}
        <div className="hs-preload" aria-hidden="true">
          {SLIDES.map((s) => <img key={s.src} src={s.src} alt="" />)}
        </div>

        {/* ── Intro overlay ── */}
        {!introDone && (
          <div className="hs-intro" aria-hidden="true">
            {INTRO_SRCS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="hs-intro__img"
                style={{
                  opacity:    i === introStep ? (introFading ? 0 : 1) : 0,
                  transform:  i === introStep ? (introFading ? "scale(1.05)" : "scale(1)") : "scale(1.05)",
                  filter:     `brightness(0.72) contrast(1.05) blur(${introFading ? 3 : 0}px)`,
                  transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS + 80}ms ease, filter ${FADE_MS}ms ease`,
                }}
              />
            ))}
            <div className="hs-gradient" />
          </div>
        )}

        {/* ── Active slide ── */}
        <div
          className="hs-slide"
          style={{
            opacity:    introDone && sliderVis ? 1 : 0,
            transition: `opacity ${REVEAL_MS}ms ease`,
          }}
        >
          <img
            key={active}
            src={SLIDES[active].src}
            alt={SLIDES[active].label}
            className="hs-slide__img"
            style={{
              opacity:    fading ? 0 : 1,
              transition: "opacity 0.22s ease",
            }}
          />
        </div>

        {/* Gradient */}
        <div className="hs-gradient" />

        {/* Center play button */}
        <div className="hs-play-wrap">
          <button
            className="hs-play-btn"
            onClick={onSlideClick}
            aria-label="Play reel"
          >
            <PlayIcon className="hs-play-btn__icon" />
          </button>
          <span className="hs-play-label">Play Reel</span>
        </div>

        {/* Slide label — bottom left */}
        <div className="hs-label">
          <span className="hs-label__tag">{SLIDES[active].tag}</span>
          <span className="hs-label__title">{SLIDES[active].label}</span>
        </div>

        {/* Counter — bottom right */}
        <div className="hs-counter">
          <span className="hs-counter__current">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="hs-counter__sep"> / </span>
          <span>{String(SLIDES.length).padStart(2, "0")}</span>
        </div>

        {/* Corner brackets */}
        <span className="hs-bracket hs-bracket--tl" aria-hidden="true" />
        <span className="hs-bracket hs-bracket--tr" aria-hidden="true" />
        <span className="hs-bracket hs-bracket--bl" aria-hidden="true" />
        <span className="hs-bracket hs-bracket--br" aria-hidden="true" />
      </div>

      {/* ── Filmstrip ── */}
      <div className="hs-strip">

        <button
          className="hs-arrow"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ArrowIcon className="hs-arrow__icon hs-arrow__icon--left" />
        </button>

        {SLIDES.map((slide, i) => (
          <button
            key={i}
            className={`hs-thumb ${i === active ? "hs-thumb--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            onMouseEnter={(e) => { if (i !== active) e.currentTarget.classList.add("hs-thumb--hover"); }}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hs-thumb--hover")}
          >
            <img src={slide.src} alt={slide.label} className="hs-thumb__img" />
            {i === active && <span className="hs-thumb__bar" />}
          </button>
        ))}

        <button
          className="hs-arrow"
          onClick={next}
          aria-label="Next slide"
        >
          <ArrowIcon className="hs-arrow__icon" />
        </button>
      </div>
    </div>
  );
}
