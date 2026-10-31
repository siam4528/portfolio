import { lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { CanvasLoader } from "../canvas/CanvasLoader";
import { supportsWebGL } from "../canvas/supportsWebGL";
import { TypingText } from "../components/TypingText";
import { links, profile } from "../data/content";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HeroScene = lazy(() => import("../canvas/HeroScene"));

export function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const hasWebGL = useMemo(supportsWebGL, []);

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden px-4 py-24 sm:px-8">
      {hasWebGL && (
        <Suspense fallback={<CanvasLoader />}>
          <HeroScene isMobile={isMobile} reducedMotion={reducedMotion} />
        </Suspense>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_0%,color-mix(in_srgb,var(--color-void)_72%,transparent)_55%,transparent_100%)]"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto w-full max-w-6xl"
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="font-mono text-sm text-neon">{profile.role}</p>
        <h1 className="mt-4 font-display text-5xl leading-none font-bold tracking-tight text-balance sm:text-7xl lg:text-8xl">
          <TypingText text={profile.name} reducedMotion={reducedMotion} />
        </h1>
        <p className="mt-6 max-w-[34ch] text-xl leading-snug sm:text-2xl">{profile.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-dim">
          {profile.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="bg-neon px-5 py-3 font-mono text-sm font-semibold text-void transition-colors hover:bg-cyan"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-neon px-5 py-3 font-mono text-sm font-semibold text-neon transition-colors hover:bg-neon hover:text-void"
          >
            Contact
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
          {links.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noreferrer" className="text-dim underline-offset-4 hover:text-cyan hover:underline">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
