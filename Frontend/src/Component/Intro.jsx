import { useState } from "react";

/**
 * Full-screen intro overlay.
 *
 * Phase 0 — "idle"    : black screen + pulsing play button
 * Phase 1 — "welcome" : play button fades out, welcome text fades + scales in
 * Phase 2 — "leaving" : curtain wipes upward, revealing the site
 * Phase 3 — "done"    : overlay removed from DOM
 */
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState("idle"); // idle | welcome | leaving | done

  const handlePlay = () => {
    if (phase !== "idle") return;
    setPhase("welcome");

    // After welcome text plays for ~2.2s → start curtain wipe
    setTimeout(() => setPhase("leaving"), 2400);

    // After curtain fully gone (~1s wipe) → unmount overlay
    setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 3600);
  };

  if (phase === "done") return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Intro screen"
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#0A0A0A",
        overflow:       "hidden",
        /* curtain wipe: clip-path slides up on "leaving" */
        clipPath:       phase === "leaving" ? "inset(100% 0 0 0)" : "inset(0% 0 0 0)",
        transition:     phase === "leaving" ? "clip-path 1.1s cubic-bezier(0.77,0,0.18,1)" : "none",
      }}
    >
      {/* ── Ambient grain texture ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          opacity:    0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }}
      />

      {/* ── Radial glow behind button ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          width:      "500px",
          height:     "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.5s",
          opacity:    phase === "welcome" ? 0 : 1,
        }}
      />

      {/* ── PLAY BUTTON (idle phase) ── */}
      <button
        onClick={handlePlay}
        aria-label="Enter the site"
        style={{
          position:       "absolute",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "20px",
          background:     "none",
          border:         "none",
          cursor:         phase === "idle" ? "pointer" : "default",
          padding:        0,
          opacity:        phase === "idle" ? 1 : 0,
          transform:      phase === "idle" ? "scale(1)" : "scale(0.85)",
          transition:     "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents:  phase === "idle" ? "auto" : "none",
        }}
      >
        {/* Outer ring — slow pulse */}
        <span
          aria-hidden="true"
          style={{
            position:       "absolute",
            width:          "120px",
            height:         "120px",
            borderRadius:   "50%",
            border:         "1px solid rgba(201,168,76,0.2)",
            animation:      "ring-pulse 2.4s ease-in-out infinite",
          }}
        />
        {/* Mid ring */}
        <span
          aria-hidden="true"
          style={{
            position:       "absolute",
            width:          "96px",
            height:         "96px",
            borderRadius:   "50%",
            border:         "1px solid rgba(201,168,76,0.35)",
            animation:      "ring-pulse 2.4s ease-in-out 0.3s infinite",
          }}
        />

        {/* Main circle */}
        <span
          style={{
            width:          "80px",
            height:         "80px",
            borderRadius:   "50%",
            border:         "1.5px solid var(--gold)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            position:       "relative",
          }}
        >
          {/* Play triangle */}
          <span
            style={{
              display:      "block",
              width:        0,
              height:       0,
              borderTop:    "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft:   "20px solid var(--gold)",
              marginLeft:   "4px",
            }}
          />
        </span>

        {/* Label below */}
        <span
          style={{
            fontFamily:    "var(--font-body)",
            fontSize:      "11px",
            fontWeight:    500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "rgba(201,168,76,0.6)",
            marginTop:     "8px",
          }}
        >
          Click to Enter
        </span>
      </button>

      {/* ── WELCOME TEXT (welcome phase) ── */}
      <div
        aria-live="polite"
        style={{
          position:       "absolute",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "16px",
          textAlign:      "center",
          padding:        "0 24px",
          opacity:        phase === "welcome" || phase === "leaving" ? 1 : 0,
          transform:      phase === "welcome" || phase === "leaving" ? "translateY(0)" : "translateY(16px)",
          transition:     "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents:  "none",
        }}
      >
        {/* Small gold line */}
        <span
          style={{
            display:    "block",
            width:      phase === "welcome" || phase === "leaving" ? "48px" : "0px",
            height:     "1px",
            background: "var(--gold)",
            transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        />

        <p
          style={{
            fontFamily:    "var(--font-body)",
            fontSize:      "12px",
            fontWeight:    500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "var(--gold)",
          }}
        >
          Welcome to
        </p>

        <h1
          style={{
            fontFamily:    "var(--font-heading)",
            fontSize:      "clamp(42px, 8vw, 88px)",
            fontWeight:    600,
            letterSpacing: "-0.025em",
            lineHeight:    1.0,
            color:         "#F5F0E8",
            margin:        0,
          }}
        >
          Editing Cart
        </h1>

        <p
          style={{
            fontFamily:    "var(--font-body)",
            fontSize:      "14px",
            fontWeight:    400,
            letterSpacing: "0.08em",
            color:         "rgba(240,237,232,0.4)",
            marginTop:     "4px",
          }}
        >
          Post-Production Excellence
        </p>

        {/* Bottom line */}
        <span
          style={{
            display:    "block",
            width:      phase === "welcome" || phase === "leaving" ? "48px" : "0px",
            height:     "1px",
            background: "var(--gold)",
            transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        />
      </div>

      <style>{`
        @keyframes ring-pulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          50%  { transform: scale(1.18); opacity: 0.3; }
          100% { transform: scale(1);    opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
