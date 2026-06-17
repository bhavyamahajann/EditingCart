import { useReveal } from "../hooks/useReveal";

/**
 * Wraps children in a fade-up reveal animation triggered by IntersectionObserver.
 * @param {string}  className  - extra classes forwarded to the wrapper div
 * @param {number}  delay      - animation-delay in ms
 */
export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out
        ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
