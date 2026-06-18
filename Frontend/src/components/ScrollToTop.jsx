import { useState, useEffect } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`stt-btn ${visible ? "stt-btn--visible" : ""}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 14 8" fill="none" aria-hidden="true">
        <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
