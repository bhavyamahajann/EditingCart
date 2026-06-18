import { useState, useEffect, useRef } from "react";
import "./VideoEditing.css";

/* ── Hero background slides ── */
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85&fit=crop&auto=format",
    tag: "Film Production",
    caption: "Cinematic storytelling at every frame",
  },
  {
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=85&fit=crop&auto=format",
    tag: "Color Grading",
    caption: "Every scene, perfectly graded",
  },
  {
    img: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=1600&q=85&fit=crop&auto=format",
    tag: "Post Production",
    caption: "From raw footage to final cut",
  },
  {
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=85&fit=crop&auto=format",
    tag: "Brand Films",
    caption: "Stories that move your audience",
  },
];

const STEPS = [
  { num: "01", title: "Footage Review",     desc: "We go through all raw files, log selects, and map out a story structure before touching the timeline." },
  { num: "02", title: "Rough Cut",          desc: "A full assembly edit is delivered within 48 hours — pacing, sequence, and narrative locked." },
  { num: "03", title: "Color & Audio",      desc: "Every clip gets graded to a consistent look. Dialogue is cleaned, music is mixed, SFX placed." },
  { num: "04", title: "Revisions & Export", desc: "Up to 3 revision rounds. Final delivery in your required format — 4K, compressed web, vertical crop." },
];

const FEATURES = [
  { icon: "✂️", title: "Precision Cutting",    desc: "Every edit is intentional. We cut for emotion first, pacing second." },
  { icon: "🎨", title: "Color Grading",         desc: "Cinematic LUTs, scene-by-scene grading, consistent look across the full timeline." },
  { icon: "🎵", title: "Sound Design",          desc: "Score selection, dialogue clean-up, SFX placement, final mix for any platform." },
  { icon: "📱", title: "Multi-Format Delivery", desc: "16:9, 9:16, 1:1 — every aspect ratio cut and exported, ready for any channel." },
  { icon: "⚡", title: "Fast Turnaround",        desc: "Rough cut in 48h. Most projects delivered within 5–7 business days." },
  { icon: "🔄", title: "Unlimited Revisions",   desc: "We iterate until you're 100% satisfied. No hidden revision charges." },
];

const TOOLS = ["Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects", "Adobe Audition", "Frame.io", "Final Cut Pro X", "Red Giant", "Neat Video"];

const STATS = [
  { value: "150+", label: "Videos Delivered" },
  { value: "48h",  label: "First Cut" },
  { value: "100%", label: "Satisfaction" },
];

export default function VideoEditing({ onNavigate }) {
  const go = (id) => {
    onNavigate?.("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const [current,  setCurrent]  = useState(0);
  const [prev,     setPrev]     = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setPrev(current);
    setCurrent(idx);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1000);
  };

  const next = () => goTo((current + 1) % SLIDES.length);

  /* Auto-advance every 5s */
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  return (
    <div className="sp-wrapper">

      {/* ══════════════ HERO ══════════════ */}
      <section className="sp-hero" aria-label="Video Editing Service">

        {/* Slide backgrounds */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`sp-slide ${i === current ? "sp-slide--active" : ""} ${i === prev ? "sp-slide--prev" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
            aria-hidden={i !== current}
          />
        ))}

        {/* Overlays */}
        <div className="sp-hero__overlay" />
        <div className="sp-hero__bottom-fade" />

        {/* Slide tag — top right */}
        <div className="sp-hero__slide-tag" key={current}>
          <span className="sp-hero__slide-tag-dot" />
          {SLIDES[current].tag}
        </div>

        {/* Main content */}
        <div className="sp-hero__content">
          <div className="sp-hero__eyebrow">
            <span className="sp-hero__eyebrow-line" />
            <span className="sp-hero__eyebrow-text">Our Services</span>
          </div>
          <h1 className="sp-hero__title">
            Video<br /><span>Editing</span>
          </h1>
          <p className="sp-hero__sub">
            Raw footage transformed into cinematic stories. Every cut is intentional,
            every frame earns its place — from 15-second reels to feature-length films.
          </p>
          <div className="sp-hero__ctas">
            <button onClick={() => go("contact")} className="btn-primary">Start a Project</button>
            <button onClick={() => go("work")}    className="btn-ghost">View Work</button>
          </div>
        </div>

        {/* ── Slider controls — bottom bar ── */}
        <div className="sp-hero__slider-bar">
          {/* Caption */}
          <p className="sp-hero__caption" key={`cap-${current}`}>
            {SLIDES[current].caption}
          </p>

          {/* Dots + counter */}
          <div className="sp-hero__slider-right">
            <div className="sp-hero__dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`sp-hero__dot ${i === current ? "sp-hero__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="sp-hero__counter">
              {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="sp-hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="sp-hero__stat">
              <span className="sp-hero__stat-value">{s.value}</span>
              <span className="sp-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="sp-hero__progress">
          <div className="sp-hero__progress-fill" key={`prog-${current}`} />
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="sp-section">
        <div className="sp-section-top">
          <div className="sp-section-left">
            <div className="sp-section-label">What We Do</div>
            <h2 className="sp-section-heading">The Edit That<br />Holds Attention</h2>
            <p className="sp-body-text">
              We don't just cut footage — we build narratives. From the first selects
              review to the final export, every decision is made with your audience in mind.
            </p>
            <p className="sp-body-text">
              Weddings, brand films, documentaries, YouTube, social shorts — our workflow
              is built for speed without sacrificing quality.
            </p>
            <div className="sp-section-pills">
              <span className="sp-pill">48h First Cut</span>
              <span className="sp-pill">4K Delivery</span>
              <span className="sp-pill">3 Revisions</span>
            </div>
          </div>

          <ol className="sp-steps" aria-label="Editing process">
            {STEPS.map((s) => (
              <li key={s.num} className="sp-step">
                <span className="sp-step__num">{s.num}</span>
                <div className="sp-step__body">
                  <h3 className="sp-step__title">{s.title}</h3>
                  <p className="sp-step__desc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="sp-cards-section">
        <div className="sp-cards-inner">
          <div className="sp-section-label">What's Included</div>
          <h2 className="sp-section-heading">Everything in One Package</h2>
          <div className="sp-cards-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="sp-card">
                <span className="sp-card__icon" role="img" aria-hidden="true">{f.icon}</span>
                <h3 className="sp-card__title">{f.title}</h3>
                <p className="sp-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="sp-tools-section">
        <div className="sp-section-label">Tools We Use</div>
        <h2 className="sp-section-heading">Industry-Standard Software</h2>
        <div className="sp-divider" />
        <div className="sp-tools-grid">
          {TOOLS.map((t) => <span key={t} className="sp-tool-pill">{t}</span>)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <div>
            <h2 className="sp-cta__heading">Ready to start your project?</h2>
            <p className="sp-cta__sub">Send us your footage. We'll reply with a quote and timeline within 24 hours.</p>
          </div>
          <button onClick={() => go("contact")} className="btn-primary">Get a Free Quote</button>
        </div>
      </section>

    </div>
  );
}
