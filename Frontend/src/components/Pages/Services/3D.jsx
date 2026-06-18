import { useState, useEffect, useRef } from "react";
import "./3D.css";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=85&fit=crop&auto=format",
    tag: "3D Animation",
    caption: "Motion brought to life in three dimensions",
  },
  {
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&q=85&fit=crop&auto=format",
    tag: "Product Renders",
    caption: "Photorealistic visualisation at 4K",
  },
  {
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=85&fit=crop&auto=format",
    tag: "Motion Graphics",
    caption: "Dynamic titles & brand identity in motion",
  },
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85&fit=crop&auto=format",
    tag: "Architectural Viz",
    caption: "Spaces that don't exist yet, rendered today",
  },
];

const STEPS = [
  { num: "01", title: "Concept & Brief",     desc: "We align on style, mood board, references, and technical requirements before opening any 3D software." },
  { num: "02", title: "Modelling & Rigging", desc: "Geometry built to spec — hard-surface, organic, or product. Rigs prepared for animation if needed." },
  { num: "03", title: "Animation & VFX",     desc: "Keyframe or procedural animation. Particle systems, simulations, motion-graphics integration." },
  { num: "04", title: "Render & Composite",  desc: "High-fidelity renders in cycles or Redshift. Final composite in After Effects, delivered frame-perfect." },
];

const FEATURES = [
  { icon: "🧊", title: "3D Modelling",         desc: "Precise hard-surface and organic models built for film, product visualization, or game pipelines." },
  { icon: "🎬", title: "Motion Graphics",       desc: "Logo animations, title sequences, lower-thirds — all driven by your brand identity." },
  { icon: "💡", title: "Lighting & Shading",    desc: "HDRI and studio lighting setups. PBR materials that match real-world surfaces." },
  { icon: "🌀", title: "Particle & Simulation", desc: "Fluid, smoke, fire, cloth simulations that integrate seamlessly with live footage." },
  { icon: "🖥️", title: "Product Visualization", desc: "360° product renders for e-commerce, launch videos, and interactive presentations." },
  { icon: "📐", title: "Architectural Viz",     desc: "Interior and exterior walk-throughs. Photorealistic renders for real estate and design." },
];

const TOOLS = ["Cinema 4D", "Blender", "3ds Max", "After Effects", "Redshift", "Octane Render", "ZBrush", "Substance Painter", "Houdini"];

const STATS = [
  { value: "60+",  label: "3D Projects" },
  { value: "4K",   label: "Render Output" },
  { value: "360°", label: "Product Viz" },
];

export default function ThreeD({ onNavigate }) {
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

      <section className="sp-hero" aria-label="3D Service">

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
            3D Motion<br /><span>&amp; Animation</span>
          </h1>
          <p className="sp-hero__sub">
            From product visualization to full CGI sequences — we build, rig, animate,
            and render 3D worlds that are indistinguishable from reality.
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

      {/* ── What we do ── */}
      <section className="sp-section">
        <div className="sp-section-top">
          <div className="sp-section-left">
            <div className="sp-section-label">What We Do</div>
            <h2 className="sp-section-heading">Depth<br />Without Limits</h2>
            <p className="sp-body-text">
              Our 3D pipeline is built for commercial production. Whether you need a product
              launch video, an architectural walkthrough, or a full CGI title sequence —
              we deliver at broadcast quality.
            </p>
            <p className="sp-body-text">
              Cinema 4D, Blender, and Houdini depending on the job. Every project rendered
              at 4K minimum with photorealistic materials.
            </p>
            <div className="sp-section-pills">
              <span className="sp-pill">4K Renders</span>
              <span className="sp-pill">Motion Graphics</span>
              <span className="sp-pill">Product Viz</span>
            </div>
          </div>

          <ol className="sp-steps" aria-label="3D production process">
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
          <h2 className="sp-section-heading">Full 3D Production Suite</h2>
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
        <h2 className="sp-section-heading">Industry-Standard 3D Pipeline</h2>
        <div className="sp-divider" />
        <div className="sp-tools-grid">
          {TOOLS.map((t) => <span key={t} className="sp-tool-pill">{t}</span>)}
        </div>
      </section>

      <section className="sp-cta">
        <div className="sp-cta-inner">
          <div>
            <h2 className="sp-cta__heading">Have a 3D project in mind?</h2>
            <p className="sp-cta__sub">Tell us your concept and we'll scope it out. Quote delivered in 24 hours.</p>
          </div>
          <button onClick={() => go("contact")} className="btn-primary">Get a Free Quote</button>
        </div>
      </section>

    </div>
  );
}
