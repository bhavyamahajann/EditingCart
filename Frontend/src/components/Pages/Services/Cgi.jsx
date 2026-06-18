import { useState, useEffect, useRef } from "react";
import "./Cgi.css";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85&fit=crop&auto=format",
    tag: "Visual Effects",
    caption: "The impossible, made indistinguishable",
  },
  {
    img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1600&q=85&fit=crop&auto=format",
    tag: "CGI Compositing",
    caption: "CG seamlessly woven into live action",
  },
  {
    img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1600&q=85&fit=crop&auto=format",
    tag: "Environment FX",
    caption: "Virtual worlds built frame by frame",
  },
  {
    img: "https://images.unsplash.com/photo-1640622842935-3e46929d5c28?w=1600&q=85&fit=crop&auto=format",
    tag: "Destruction FX",
    caption: "Explosions, fire, and chaos — safely rendered",
  },
];

const STEPS = [
  { num: "01", title: "Shoot Analysis",     desc: "We study the live footage — tracking markers, camera movement, lighting conditions — before building the CG layer." },
  { num: "02", title: "Match Move & Track", desc: "Camera solve and object tracking to within sub-pixel accuracy. The CG lives exactly where it belongs." },
  { num: "03", title: "CG Build & Light",   desc: "Assets modelled and lit to match the real-world environment. Shadow catchers, ambient occlusion, lens distortion." },
  { num: "04", title: "Composite & Grade",  desc: "CG layered into the plate frame-by-frame. Final colour grade ties everything together." },
];

const FEATURES = [
  { icon: "🎭", title: "VFX Compositing",       desc: "CG elements seamlessly integrated into live-action footage — impossible without the seam showing." },
  { icon: "🔮", title: "Environment Replacement", desc: "Full sky replacement, set extensions, and virtual backdrops at feature-film quality." },
  { icon: "💥", title: "Destruction & FX",       desc: "Explosions, crashes, fire, water, structural destruction — all rendered to broadcast spec." },
  { icon: "👁️", title: "Character & Creature",   desc: "Photorealistic CG creatures, digital doubles, and character FX integrated with live talent." },
  { icon: "🏙️", title: "Set Extension",          desc: "Extend or replace physical sets digitally. Build environments that don't exist." },
  { icon: "🎞️", title: "De-aging & Beauty FX",   desc: "Skin retouching, de-aging, wire removal, and object removal delivered at high resolution." },
];

const TOOLS = ["Nuke", "After Effects", "Cinema 4D", "Houdini", "SideFX Vellum", "Foundry Mari", "Blackmagic Fusion", "PFTrack", "Silhouette FX"];

const STATS = [
  { value: "40+", label: "CGI Projects"   },
  { value: "8K",  label: "Max Resolution" },
  { value: "VFX", label: "Grade Quality"  },
];

export default function Cgi({ onNavigate }) {
  const go = (id) => {
    onNavigate?.("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const [current,   setCurrent]   = useState(0);
  const [prev,      setPrev]      = useState(null);
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

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  return (
    <div className="sp-wrapper">

      <section className="sp-hero" aria-label="CGI Service">

        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`sp-slide ${i === current ? "sp-slide--active" : ""} ${i === prev ? "sp-slide--prev" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
            aria-hidden={i !== current}
          />
        ))}

        <div className="sp-hero__overlay" />
        <div className="sp-hero__bottom-fade" />

        <div className="sp-hero__slide-tag" key={current}>
          <span className="sp-hero__slide-tag-dot" />
          {SLIDES[current].tag}
        </div>

        <div className="sp-hero__content">
          <div className="sp-hero__eyebrow">
            <span className="sp-hero__eyebrow-line" />
            <span className="sp-hero__eyebrow-text">Our Services</span>
          </div>
          <h1 className="sp-hero__title">
            CGI &amp; Visual<br /><span>Effects</span>
          </h1>
          <p className="sp-hero__sub">
            Photorealistic computer-generated imagery seamlessly composited into live-action footage.
            We make the impossible look like it actually happened.
          </p>
          <div className="sp-hero__ctas">
            <button onClick={() => go("contact")} className="btn-primary">Start a Project</button>
            <button onClick={() => go("work")}    className="btn-ghost">View Work</button>
          </div>
        </div>

        <div className="sp-hero__slider-bar">
          <p className="sp-hero__caption" key={`cap-${current}`}>
            {SLIDES[current].caption}
          </p>
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

        <div className="sp-hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="sp-hero__stat">
              <span className="sp-hero__stat-value">{s.value}</span>
              <span className="sp-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="sp-hero__progress">
          <div className="sp-hero__progress-fill" key={`prog-${current}`} />
        </div>
      </section>

      <section className="sp-section">
        <div className="sp-section-label">What We Do</div>
        <h2 className="sp-section-heading">Reality, Extended.</h2>
        <div className="sp-divider" />
        <div className="sp-two-col">
          <div>
            <p className="sp-body-text">
              CGI isn't just explosions. It's the subtle set extension nobody notices.
              It's the wire that was never there. It's the product that didn't exist yet
              sitting perfectly in a real environment.
            </p>
            <p className="sp-body-text">
              Our VFX pipeline runs on Nuke and Houdini — the same tools used on
              feature films. We handle everything from match moving and track to
              final composite and delivery.
            </p>
          </div>
          <ol className="sp-steps" aria-label="CGI production process">
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

      <section className="sp-cards-section">
        <div className="sp-cards-inner">
          <div className="sp-section-label">What's Included</div>
          <h2 className="sp-section-heading">Full VFX Production Pipeline</h2>
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

      <section className="sp-tools-section">
        <div className="sp-section-label">Tools We Use</div>
        <h2 className="sp-section-heading">Feature-Film Grade Software</h2>
        <div className="sp-divider" />
        <div className="sp-tools-grid">
          {TOOLS.map((t) => <span key={t} className="sp-tool-pill">{t}</span>)}
        </div>
      </section>

      <section className="sp-cta">
        <div className="sp-cta-inner">
          <div>
            <h2 className="sp-cta__heading">Need something that doesn&apos;t exist?</h2>
            <p className="sp-cta__sub">We build it in CG. Send us your brief and we'll scope the VFX shot list.</p>
          </div>
          <button onClick={() => go("contact")} className="btn-primary">Get a Free Quote</button>
        </div>
      </section>

    </div>
  );
}
