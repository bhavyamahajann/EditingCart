import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { STATS } from "../constants";

function useCounter(rawValue, start) {
  const numericStr = rawValue.replace(/[^0-9]/g, "");
  const suffix     = rawValue.replace(/[0-9]/g, "");
  const target     = parseInt(numericStr, 10) || 0;
  const [count, setCount] = useState(0);
  const frameRef          = useRef(null);

  useEffect(() => {
    if (!start) return;
    const duration  = 1600;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target]);

  return `${count}${suffix}`;
}

function StatCell({ stat, start, borderLeft }) {
  const display = useCounter(stat.value, start);
  return (
    <div
      style={{
        textAlign:   "center",
        padding:     "48px 32px",
        borderLeft:  borderLeft ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <p
        style={{
          fontFamily:    "var(--font-heading)",
          fontSize:      "clamp(40px, 4.5vw, 60px)",
          fontWeight:    600,
          color:         "var(--gold)",
          letterSpacing: "-0.02em",
          lineHeight:    1,
        }}
      >
        {display}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", letterSpacing: "0.06em" }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  const [ref, setRef]       = useState(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <section
      aria-label="Statistics"
      style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <Reveal>
        <div
          ref={setRef}
          style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
          className="stats-row"
        >
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} start={started} borderLeft={i !== 0} />
          ))}
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 640px) {
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
