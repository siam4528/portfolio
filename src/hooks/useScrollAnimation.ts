import { type RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Returns how far the element has travelled through the viewport, from 0 to 1.
export function useScrollAnimation(target: RefObject<HTMLElement | null>, enabled: boolean) {
  const progress = useRef(0.5);

  useEffect(() => {
    if (!enabled || !target.current) return;
    const trigger = ScrollTrigger.create({
      trigger: target.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, [target, enabled]);

  return progress;
}
