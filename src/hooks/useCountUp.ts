"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  suffix?: string;
  displayOverride?: string;
  duration?: number;
}

export function useCountUp({
  target,
  suffix = "",
  displayOverride,
  duration = 1200,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animatedDisplay, setAnimatedDisplay] = useState(() =>
    target > 0 ? "0" + suffix : "0",
  );

  useEffect(() => {
    if (displayOverride) return;

    const el = ref.current;
    if (!el || target <= 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.round(progress * target);
          setAnimatedDisplay(String(value) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, displayOverride, duration]);

  const display = displayOverride ?? animatedDisplay;

  return { ref, display };
}
