import Reveal from "../components/Reveal";
import { MailIcon } from "../components/icons";
import "./CTA.css";

/* ── Inline SVG icons ── */
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.524 5.831L.057 23.529a.75.75 0 0 0 .914.914l5.698-1.467A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5a10.438 10.438 0 0 1-5.322-1.453l-.38-.228-3.938 1.014 1.014-3.938-.228-.38A10.438 10.438 0 0 1 1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ── Config — update these numbers ── */
const WHATSAPP_NUMBER = "919876543210"; // country code + number, no +
const CALL_NUMBER = "+91 98765 43210";

export default function CTA() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20video%20editing%20project.`;
  const callLink = `tel:+${WHATSAPP_NUMBER}`;

  return (
    <section id="contact" aria-label="Contact" className="cta-section">
      <div className="cta-container">
        <Reveal>
          <div className="cta-banner">
            {/* Corner accents */}
            <span aria-hidden="true" className="cta-corner cta-corner-tl" />
            <span aria-hidden="true" className="cta-corner cta-corner-tr" />
            <span aria-hidden="true" className="cta-corner cta-corner-bl" />
            <span aria-hidden="true" className="cta-corner cta-corner-br" />

            {/* Subtle center glow */}
            <div aria-hidden="true" className="cta-glow" />

            {/* Label */}
            <div className="cta-label-row">
              <span className="cta-label-line" />
              <span className="section-label">Contact</span>
              <span className="cta-label-line" />
            </div>

            {/* Heading */}
            <h2 className="cta-heading">
              Got a project in mind?
              <br />
              <span className="gold-text">Let&rsquo;s edit it together.</span>
            </h2>

            {/* Sub-copy */}
            <p className="cta-subcopy">
              Send over your footage and your deadline — I&apos;ll reply with a timeline
              and a quote within a day.
            </p>

            {/* CTA buttons */}
            <div className="cta-buttons">
              {/* Email — gold filled */}
              <a href="mailto:hello@editingcart.com" className="btn-primary cta-email-btn">
                <MailIcon className="cta-email-icon" />
                hello@editingcart.com
              </a>

              {/* WhatsApp — icon only */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="cta-wa-btn"
              >
                <span className="cta-icon-wrap">
                  <span aria-hidden="true" className="cta-wa-ring" />
                  <WhatsAppIcon className="cta-wa-icon" />
                </span>
              </a>

              {/* Call — icon only */}
              <a href={callLink} aria-label={`Call ${CALL_NUMBER}`} className="cta-call-btn">
                <span className="cta-icon-wrap">
                  <span aria-hidden="true" className="cta-call-ring" />
                  <PhoneIcon className="cta-call-icon" />
                </span>
              </a>
            </div>

            {/* Status row */}
            <div className="cta-status-row">
              <span className="cta-status-text">
                <span aria-hidden="true" className="cta-status-dot" />
                Available for new projects
              </span>
              <span className="cta-status-divider" />
              <span className="cta-status-text">Average response: under 24 hours</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}