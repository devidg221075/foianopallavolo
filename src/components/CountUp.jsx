import { useState, useEffect, useRef } from "react";

export function CountUp({ value, pad = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let startTime;
        const reducedMotion = matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        function step(time) {
          startTime ??= time;
          const progress = Math.min((time - startTime) / 1500, 1);
          setDisplayValue(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1 && !reducedMotion) {
            requestAnimationFrame(step);
          } else {
            setDisplayValue(value);
          }
        }
        requestAnimationFrame(step);
        observer.disconnect();
      },
      {
        threshold: 0.3,
      },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {pad ? String(displayValue).padStart(2, "0") : displayValue}
    </span>
  );
}
