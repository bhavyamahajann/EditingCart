import Reveal from "../components/Reveal";
import { ICON_MAP } from "../components/icons";
import { SERVICES } from "../constants";
import img1 from "../assets/EditingCartimg1.png";
import img2 from "../assets/EditingCartimg2.png";
import img3 from "../assets/EditingCartimg3.png";

/* One background image per card */
const CARD_IMAGES = [
  img1,
  img2,
  img3,
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75&fit=crop&auto=format",
];

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      style={{ background: "#0D0D0D", padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
            <span className="section-label">Services</span>
          </div>
          <h2
            style={{
              fontFamily:    "var(--font-heading)",
              fontSize:      "clamp(38px, 4vw, 56px)",
              fontWeight:    600,
              letterSpacing: "-0.02em",
              lineHeight:    1.1,
              color:         "#F0EDE8",
            }}
          >
            What I bring to the <span className="gold-text">timeline</span>
          </h2>
          <div className="line-gold" />
        </Reveal>

        {/* Bento grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)" }}
          className="services-grid"
        >
          {SERVICES.map((service, i) => {
            const ServiceIcon = ICON_MAP[service.iconKey];
            return (
              <Reveal key={service.title} delay={i * 70}>
                <article
                  className="svc-card"
                  style={{
                    background:  "#0D0D0D",
                    padding:     "40px 32px",
                    cursor:      "default",
                    transition:  "background 0.3s",
                    height:      "100%",
                    position:    "relative",
                    overflow:    "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#121212";
                    e.currentTarget.querySelector(".svc-img").style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0D0D0D";
                    e.currentTarget.querySelector(".svc-img").style.transform = "scale(1.0)";
                  }}
                >
                  {/* Background image — hidden by default, reveals on hover */}
                  <img
                    className="svc-img"
                    src={CARD_IMAGES[i]}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position:       "absolute",
                      inset:          0,
                      width:          "100%",
                      height:         "100%",
                      objectFit:      "cover",
                      objectPosition: "center",
                      opacity:        1,
                      transform:      "scale(1.0)",
                      transition:     "transform 0.6s ease",
                      filter:         "brightness(0.22) contrast(1.1)",
                      pointerEvents:  "none",
                    }}
                  />

                  {/* Gold tint overlay on hover */}
                  <div
                    className="svc-tint"
                    aria-hidden="true"
                    style={{
                      position:   "absolute",
                      inset:      0,
                      background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* All card content sits above the bg image */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Icon */}
                    <div
                      style={{
                        width:          "48px",
                        height:         "48px",
                        border:         "1px solid rgba(201,168,76,0.25)",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        marginBottom:   "28px",
                        color:          "var(--gold)",
                        background:     "rgba(10,10,10,0.6)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {ServiceIcon && <ServiceIcon style={{ width: "20px", height: "20px" }} />}
                    </div>

                    {/* Number */}
                    <span
                      style={{
                        fontFamily:    "var(--font-heading)",
                        fontSize:      "11px",
                        fontWeight:    500,
                        letterSpacing: "0.18em",
                        color:         "rgba(201,168,76,0.35)",
                        display:       "block",
                        marginBottom:  "12px",
                      }}
                    >
                      0{i + 1}
                    </span>

                    <h3
                      style={{
                        fontFamily:    "var(--font-heading)",
                        fontSize:      "22px",
                        fontWeight:    600,
                        color:         "#F0EDE8",
                        letterSpacing: "-0.01em",
                        marginBottom:  "14px",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize:   "14px",
                        lineHeight: 1.75,
                        color:      "var(--text-muted)",
                      }}
                    >
                      {service.desc}
                    </p>

                    {/* Bottom accent */}
                    <div
                      style={{
                        width:      "24px",
                        height:     "1px",
                        background: "var(--gold)",
                        marginTop:  "28px",
                      }}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
