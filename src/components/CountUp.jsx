import { useState, useEffect, useRef } from "react";

export function CountUp({ value, pad = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const H = new IntersectionObserver(
      ([q]) => {
        if (!q.isIntersecting) return;
        let G;
        const b = matchMedia("(prefers-reduced-motion: reduce)").matches;
        function A(Z) {
          G ?? (G = Z);
          const U = Math.min((Z - G) / 1500, 1);
          setDisplayValue(Math.round(value * (1 - Math.pow(1 - U, 3))));
          if (U < 1 && !b) {
            requestAnimationFrame(A);
          } else {
            setDisplayValue(value);
          }
        }
        requestAnimationFrame(A);
        H.disconnect();
      },
      {
        threshold: 0.3,
      },
    );
    H.observe(ref.current);
    return () => H.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {pad ? String(displayValue).padStart(2, "0") : displayValue}
    </span>
  );
}
