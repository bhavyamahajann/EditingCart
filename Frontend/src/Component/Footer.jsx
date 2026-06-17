import { PlayIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, ArrowIcon, MailIcon } from "../components/icons";
import { QUICK_LINKS, SOCIAL } from "../constants";
import "./Footer.css";

const SOCIAL_ICONS = { Instagram: InstagramIcon, Youtube: YoutubeIcon, Linkedin: LinkedinIcon };

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const SERVICES_LIST = ["Video Editing", "Color Grading", "Motion Graphics", "Sound Design"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Footer" className="footer">

      {/* ── Large background wordmark ── */}
      <div aria-hidden="true" className="footer-wordmark">
        EDITING CART
      </div>

      {/* ── Top CTA strip ── */}
      <div className="footer-cta-strip">
        <div className="footer-cta-row">

          {/* Left: big heading */}
          <div>
            <p className="footer-cta-label">Ready to collaborate?</p>
            <h2 className="footer-cta-heading">
              Let&rsquo;s make something<br />
              <span className="gold-text">unforgettable.</span>
            </h2>
          </div>

          {/* Right: email + button */}
          <div className="footer-cta-right">
            <a href="mailto:hello@editingcart.com" className="footer-cta-email">
              <MailIcon style={{ width: "16px", height: "16px" }} />
              hello@editingcart.com
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary footer-cta-btn"
            >
              Start a Project
              <ArrowIcon style={{ width: "14px", height: "14px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="footer-main">
        <div className="footer-main-grid">

          {/* Col 1 — Brand */}
          <div>
            <button
              onClick={() => scrollTo("home")}
              aria-label="Back to top"
              className="footer-brand-top"
            >
              <span className="footer-brand-mark">
                <PlayIcon style={{ width: "14px", height: "14px", color: "#0A0A0A" }} />
              </span>
              <span className="footer-brand-name">
                Editing Cart
              </span>
            </button>

            <p className="footer-brand-desc">
              Premium post-production for creators and brands who refuse to be ordinary.
            </p>

            {/* Social icons */}
            <div className="footer-social-row">
              {SOCIAL.map(({ key, href, label }) => {
                const Icon = SOCIAL_ICONS[key];
                return Icon ? (
                  <a key={key} href={href} aria-label={label} className="footer-social-link">
                    <Icon style={{ width: "16px", height: "16px" }} />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="footer-col-label">
              Navigation
            </p>
            <ul className="footer-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)} className="footer-list-btn">
                    <span className="footer-list-dash" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="footer-col-label">
              Services
            </p>
            <ul className="footer-list">
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <button onClick={() => scrollTo("services")} className="footer-list-btn">
                    <span className="footer-list-dash" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact info */}
          <div>
            <p className="footer-col-label">
              Contact
            </p>

            <div className="footer-contact-group">
              <div>
                <p className="footer-contact-label">Email</p>
                <a href="mailto:hello@editingcart.com" className="footer-contact-link">
                  hello@editingcart.com
                </a>
              </div>

              <div>
                <p className="footer-contact-label">Response Time</p>
                <p className="footer-contact-value">Under 24 hours</p>
              </div>

              <div>
                <p className="footer-contact-label">Availability</p>
                <div className="footer-availability-row">
                  <span className="footer-availability-dot" />
                  <span className="footer-availability-text">Open for projects</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Thin gold divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom bar ── */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {year} Editing Cart. All rights reserved.
          </p>

          {/* Center mark */}
          <div className="footer-center-dots">
            <div className="footer-center-dot" />
            <div className="footer-center-dot" />
          </div>

          <button onClick={() => scrollTo("home")} aria-label="Scroll to top" className="footer-scroll-btn">
            <ArrowIcon style={{ width: "14px", height: "14px", transform: "rotate(-90deg)" }} />
          </button>
        </div>
      </div>
    </footer>
  );
}