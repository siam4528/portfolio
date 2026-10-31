import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { CanvasLoader } from "../canvas/CanvasLoader";
import { supportsWebGL } from "../canvas/supportsWebGL";
import { SectionHeading } from "../components/SectionHeading";
import { skills } from "../data/content";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SkillsScene = lazy(() => import("../canvas/SkillsScene"));
const names = skills.map((skill) => skill.name);

export function Skills() {
  const section = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const hasWebGL = useMemo(supportsWebGL, []);
  const show3D = hasWebGL && !isMobile;
  const scroll = useScrollAnimation(section, show3D && !reducedMotion);

  return (
    <section ref={section} id="skills" aria-labelledby="skills-title" className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-24 sm:px-8 md:grid-cols-2 md:gap-16">
      <div className="grid gap-8">
        <SectionHeading id="skills-title">Skills</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <button
              key={skill.name}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              className={`grow cursor-pointer border px-4 py-3 text-left font-mono text-sm transition-colors ${
                index === selected ? "border-neon bg-panel text-neon" : "border-line text-text hover:border-cyan"
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
        <div className="min-h-24 border-t border-line pt-4" aria-live="polite">
          <p className="font-mono text-xs tracking-widest text-dim uppercase">Where I learned it</p>
          <p className="mt-2 max-w-[48ch] leading-relaxed">{skills[selected].source}</p>
        </div>
      </div>

      {show3D && (
        <Suspense fallback={<CanvasLoader />}>
          <SkillsScene names={names} selected={selected} onSelect={setSelected} scroll={scroll} reducedMotion={reducedMotion} />
        </Suspense>
      )}
    </section>
  );
}
