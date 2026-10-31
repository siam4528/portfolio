import { motion } from "framer-motion";
import type { Certification } from "../data/content";

type TimelineItemProps = { item: Certification; index: number };

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <motion.li
      className="relative grid gap-1 pl-8"
      initial={{ x: 16 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="absolute top-2 -left-[5px] size-3 bg-neon" aria-hidden="true" />
      {item.date && <p className="font-mono text-xs text-cyan">{item.date}</p>}
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{item.title}</h3>
      <p className="text-dim">{item.issuer}</p>
      <p className="font-mono text-xs text-dim">Skill: {item.skill}</p>
    </motion.li>
  );
}
