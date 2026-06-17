import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible].
 * Once the element enters the viewport it stays visible (disconnect after first trigger).
 */
export function useReveal(threshold = 0.15) {
  const ref    = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
}
