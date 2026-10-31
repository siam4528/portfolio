import type { PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

const linkClass = "font-mono text-sm text-cyan underline underline-offset-4 hover:text-neon";

export function ProjectCard({ project }: { project: Project }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        className="grid gap-4 border border-line bg-panel p-6 transition-colors hover:border-neon sm:p-10"
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <h3 className="font-display text-3xl font-bold sm:text-4xl">{project.title}</h3>
        <p className="max-w-[60ch] text-lg leading-relaxed text-dim">{project.description}</p>
        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2 font-mono text-xs text-neon" aria-label="Tech stack">
            {project.stack.map((item) => (
              <li key={item} className="border border-line px-2 py-1">{item}</li>
            ))}
          </ul>
        )}
        {(project.github || project.demo) && (
          <div className="flex flex-wrap gap-4">
            {project.github && <a className={linkClass} href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
            {project.demo && <a className={linkClass} href={project.demo} target="_blank" rel="noreferrer">Live demo</a>}
          </div>
        )}
      </motion.article>
    </div>
  );
}
