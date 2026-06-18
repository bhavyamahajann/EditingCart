import { useState } from "react";
import "./ContactUs.css";
import HeroSlider from "../HeroSlider/HeroSlider";

/* ── SVG icons (inline, no external deps) ── */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.524 5.831L.057 23.529a.75.75 0 0 0 .914.914l5.698-1.467A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5a10.438 10.438 0 0 1-5.322-1.453l-.38-.228-3.938 1.014 1.014-3.938-.228-.38A10.438 10.438 0 0 1 1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7"/>
  </svg>
);

/* ── Config ── */
const WHATSAPP = "919876543210";
const PHONE    = "+91 98765 43210";
const EMAIL    = "hello@editingcart.com";
const INSTAGRAM = "https://instagram.com/editingcart";

/* ── Process steps ── */
const STEPS = [
  {
    num:   "01",
    icon:  "📩",
    title: "Send a Brief",
    desc:  "Drop your project idea, deadline, and any reference footage you have.",
  },
  {
    num:   "02",
    icon:  "🎬",
    title: "Free Consultation",
    desc:  "We hop on a quick call to understand your vision and lock in the scope.",
  },
  {
    num:   "03",
    icon:  "✂️",
    title: "We Start Editing",
    desc:  "Your footage goes into the timeline. You get a first cut within 48 hours.",
  },
  {
    num:   "04",
    icon:  "🚀",
    title: "Delivery",
    desc:  "Approved files delivered in your required format — on time, every time.",
  },
];

const BUDGETS = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹40,000",
  "₹40,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Let's discuss",
];

const SERVICES = [
  "Video Editing",
  "Color Grading",
  "Motion Graphics",
  "Sound Design",
  "Full Post-Production",
  "Other",
];

export default function ContactUs() {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "", urgent: false });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    /* Simulate async submit */
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  return (
    <div className="cu-wrapper">

      {/* Decorative background lines */}
      <div className="cu-bg-lines" aria-hidden="true" />

      {/* ── Page hero — premium split layout ── */}
      <header className="cu-hero">

        {/* ── LEFT: content ── */}
        <div className="cu-hero__left">
          <div className="cu-hero__eyebrow">
            <span className="cu-hero__eyebrow-line" />
            Let&rsquo;s Work Together
          </div>

          <h1 className="cu-hero__title">
            Start Your<br />
            <span>Next Project</span>
          </h1>

          <p className="cu-hero__sub">
            Send over your footage and your deadline — we&apos;ll reply with a
            timeline and a quote within 24 hours.
          </p>

          {/* Quick-action buttons */}
          <div className="cu-hero__actions">
            <a
              href={`mailto:${EMAIL}`}
              className="cu-hero__action-btn cu-hero__action-btn--primary"
            >
              <MailIcon />
              Send Email
            </a>

            {/* WhatsApp icon-only with ripple rings */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="cu-wa-icon"
            >
              <span className="cu-wa-icon__ring cu-wa-icon__ring--1" aria-hidden="true" />
              <span className="cu-wa-icon__ring cu-wa-icon__ring--2" aria-hidden="true" />
              <WhatsAppIcon />
            </a>
          </div>

          {/* Mini stats */}
          <div className="cu-hero__stats">
            {[
              { value: "150+", label: "Projects Done" },
              { value: "24h",  label: "Response Time" },
              { value: "100%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="cu-hero__stat">
                <span className="cu-hero__stat-value">{s.value}</span>
                <span className="cu-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="cu-hero__scroll" aria-hidden="true">
            <div className="cu-hero__scroll-line" />
            {/* <span className="cu-hero__scroll-text">Scroll Down</span> */}
          </div>
        </div>

        {/* ── RIGHT: interactive slider (same as home hero) ── */}
        <div className="cu-hero__right">
          <HeroSlider onSlideClick={() => {}} />
        </div>
      </header>

      {/* ── Body: left info + right form ── */}
      <div className="cu-body">

        {/* ── LEFT: contact info ── */}
        <aside className="cu-info">
          <p className="cu-info__label">Reach Us Directly</p>
          <h2 className="cu-info__heading">
            Every great film starts with a conversation.
          </h2>
          <div className="cu-info__divider" />
          <p className="cu-info__desc">
            Whether you have a fully locked script or just a raw idea — we want
            to hear it. Pick the channel that works best for you.
          </p>

          <div className="cu-contact-cards">
            {/* Email */}
            <a href={`mailto:${EMAIL}`} className="cu-card">
              <div className="cu-card__icon"><MailIcon /></div>
              <div className="cu-card__body">
                <span className="cu-card__label">Email</span>
                <span className="cu-card__value">{EMAIL}</span>
              </div>
              <div className="cu-card__arrow"><ArrowIcon /></div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="cu-card"
            >
              <div className="cu-card__icon"><WhatsAppIcon /></div>
              <div className="cu-card__body">
                <span className="cu-card__label">WhatsApp</span>
                <span className="cu-card__value">Chat with us instantly</span>
              </div>
              <div className="cu-card__arrow"><ArrowIcon /></div>
            </a>

            {/* Phone */}
            <a href={`tel:${WHATSAPP}`} className="cu-card">
              <div className="cu-card__icon"><PhoneIcon /></div>
              <div className="cu-card__body">
                <span className="cu-card__label">Call</span>
                <span className="cu-card__value">{PHONE}</span>
              </div>
              <div className="cu-card__arrow"><ArrowIcon /></div>
            </a>

            {/* Instagram */}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="cu-card">
              <div className="cu-card__icon"><InstagramIcon /></div>
              <div className="cu-card__body">
                <span className="cu-card__label">Instagram</span>
                <span className="cu-card__value">@editingcart</span>
              </div>
              <div className="cu-card__arrow"><ArrowIcon /></div>
            </a>
          </div>

          {/* Availability */}
          <div className="cu-availability">
            <span className="cu-availability__dot" />
            <span className="cu-availability__text">Currently open for new projects</span>
          </div>
        </aside>

        {/* ── RIGHT: form ── */}
        <section className="cu-form-wrap" aria-label="Project inquiry form">
          {/* Corner brackets */}
          <span className="cu-corner cu-corner--tl" aria-hidden="true" />
          <span className="cu-corner cu-corner--tr" aria-hidden="true" />
          <span className="cu-corner cu-corner--bl" aria-hidden="true" />
          <span className="cu-corner cu-corner--br" aria-hidden="true" />

          {sent ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                border: "1.5px solid #22c55e", background: "rgba(34,197,94,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", color: "#22c55e",
              }}>
                <CheckIcon />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 600, color: "#f5f0e8", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                Message Sent!
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: "0 0 32px" }}>
                We&apos;ve received your brief. Expect a reply within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="cu-submit"
                style={{ width: "auto", padding: "14px 32px" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 className="cu-form__title">Tell Us About Your Project</h2>
              <p className="cu-form__sub">Fill in the details below — the more you share, the better we can help.</p>

              {/* Row 1: name + email */}
              <div className="cu-row">
                <div className="cu-field">
                  <label className="cu-field__label" htmlFor="cu-name">Full Name *</label>
                  <input
                    id="cu-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    className="cu-field__input"
                  />
                </div>
                <div className="cu-field">
                  <label className="cu-field__label" htmlFor="cu-email">Email *</label>
                  <input
                    id="cu-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update("email")}
                    className="cu-field__input"
                  />
                </div>
              </div>

              {/* Row 2: phone + service */}
              <div className="cu-row">
                <div className="cu-field">
                  <label className="cu-field__label" htmlFor="cu-phone">Phone / WhatsApp</label>
                  <input
                    id="cu-phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={update("phone")}
                    className="cu-field__input"
                  />
                </div>
                <div className="cu-field">
                  <label className="cu-field__label" htmlFor="cu-service">Service Required *</label>
                  <select
                    id="cu-service"
                    required
                    value={form.service}
                    onChange={update("service")}
                    className="cu-field__select"
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="cu-field">
                <label className="cu-field__label" htmlFor="cu-budget">Project Budget</label>
                <select
                  id="cu-budget"
                  value={form.budget}
                  onChange={update("budget")}
                  className="cu-field__select"
                >
                  <option value="" disabled>Select a budget range</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="cu-field">
                <label className="cu-field__label" htmlFor="cu-message">Project Brief *</label>
                <textarea
                  id="cu-message"
                  required
                  placeholder="Describe your project — type of content, deadline, style references, platform..."
                  value={form.message}
                  onChange={update("message")}
                  className="cu-field__textarea"
                />
              </div>

              {/* Urgent checkbox */}
              <div className="cu-checkbox-row">
                <input
                  id="cu-urgent"
                  type="checkbox"
                  checked={form.urgent}
                  onChange={update("urgent")}
                />
                <label htmlFor="cu-urgent">
                  This is an urgent project — I need a response within 6 hours.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`cu-submit ${sent ? "cu-submit--sent" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#0a0a0a", borderRadius: "50%", animation: "cu-spin 0.7s linear infinite" }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Project Brief
                  </>
                )}
              </button>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "16px", letterSpacing: "0.04em" }}>
                We reply within 24 hours &nbsp;·&nbsp; No spam, ever.
              </p>
            </form>
          )}
        </section>
      </div>

      {/* ── Process timeline ── */}
      <section className="cu-timeline" aria-label="How it works">
        <p className="cu-timeline__label">How It Works</p>
        <div className="cu-timeline__track">
          {STEPS.map((step) => (
            <div key={step.num} className="cu-step">
              <span className="cu-step__num">{step.num}</span>
              <span className="cu-step__icon" role="img" aria-hidden="true">{step.icon}</span>
              <h3 className="cu-step__title">{step.title}</h3>
              <p className="cu-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Styles for inline WA button ── */}
      <style>{`
        @keyframes cu-spin { to { transform: rotate(360deg); } }

        /* WhatsApp icon-only with glow ripple rings */
        .cu-wa-icon {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.08);
          border: 1.5px solid rgba(37, 211, 102, 0.5);
          text-decoration: none;
          color: #25D366;
          flex-shrink: 0;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          animation: cu-wa-bounce 2.4s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
        }

        .cu-wa-icon:hover {
          animation: none;
          transform: scale(1.12);
          background: rgba(37,211,102,0.18);
          box-shadow: 0 0 20px rgba(37,211,102,0.35),
                      0 0 40px rgba(37,211,102,0.15);
        }

        .cu-wa-icon svg {
          width: 24px;
          height: 24px;
          fill: #25D366;
          position: relative;
          z-index: 1;
        }

        /* Expanding ripple rings */
        .cu-wa-icon__ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(37, 211, 102, 0.4);
          animation: cu-wa-ripple 2s ease-out infinite;
          pointer-events: none;
        }

        .cu-wa-icon__ring--2 {
          inset: -14px;
          border-color: rgba(37, 211, 102, 0.2);
          animation-delay: 0.6s;
        }

        @keyframes cu-wa-ripple {
          0%   { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0;   }
        }

        @keyframes cu-wa-bounce {
          0%, 100% { transform: translateY(0);    }
          25%       { transform: translateY(-7px); }
          50%       { transform: translateY(-2px); }
          75%       { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
