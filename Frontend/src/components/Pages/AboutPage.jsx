import "./AboutPage.css";

const STATS = [
  { value: "5+",    label: "Years of Experience" },
  { value: "250+",  label: "Projects Completed" },
  { value: "150+",  label: "Happy Clients" },
  { value: "10M+",  label: "Views Generated" },
];

const TOOLS = [
  { short: "Pr",  name: "Premiere Pro" },
  { short: "Ae",  name: "After Effects" },
  { short: "DR",  name: "DaVinci Resolve" },
  { short: "C4D", name: "Cinema 4D" },
];

const FEATURES = [
  {
    icon: "🎬",
    title: "Cinematic Storytelling",
    desc: "We turn ideas into powerful visual stories that connect and inspire.",
  },
  {
    icon: "🎚️",
    title: "Precision & Quality",
    desc: "Every cut, every color, every sound — perfect down to the last frame.",
  },
  {
    icon: "⭐",
    title: "Creativity With Purpose",
    desc: "We don't follow trends, we create visuals with meaning and impact.",
  },
];

export default function AboutPage() {
  return (
    <div className="ap-wrapper">

      {/* ── Background Video ── */}
      <div className="ap-bg-video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/YFmzjGaZH_I?autoplay=1&mute=1&loop=1&playlist=YFmzjGaZH_I&controls=0&showinfo=0&modestbranding=1&playsinline=1"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="ap-bg-overlay" />
      </div>

      {/* ── Hero Content ── */}
      <section className="ap-hero">
        <div className="ap-label">
          <span className="ap-label__line" />
          WHO WE ARE
        </div>

        <h1 className="ap-title">
          CRAFTING<br />
          CINEMATIC<br />
          <span className="ap-title--gold">EXPERIENCES</span>
        </h1>

        <p className="ap-tagline">We don't just edit videos — we craft emotions.</p>

        <div className="ap-cta">
          <a href="#contact" className="ap-btn ap-btn--primary">▶ Start a Project</a>
          <a href="#work" className="ap-btn ap-btn--secondary">View Our Work →</a>
        </div>
      </section>

      {/* ── Info Section ── */}
      <section className="ap-info">

        {/* Tools */}
        <div className="ap-block">
          <p className="ap-block__label">TOOLS WE MASTER</p>
          <div className="ap-tools">
            {TOOLS.map((t) => (
              <div key={t.name} className="ap-tool">
                <div className="ap-tool__icon">{t.short}</div>
                <span className="ap-tool__name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="ap-features">
          {FEATURES.map((f) => (
            <div key={f.title} className="ap-feature">
              <span className="ap-feature__icon">{f.icon}</span>
              <h4 className="ap-feature__title">{f.title}</h4>
              <p className="ap-feature__desc">{f.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ── Stats Bar ── */}
      <div className="ap-stats">
        {STATS.map((s, i) => (
          <div key={i} className="ap-stat">
            <p className="ap-stat__value">{s.value}</p>
            <p className="ap-stat__label">{s.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}