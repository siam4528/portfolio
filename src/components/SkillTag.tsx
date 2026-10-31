import { motion } from "framer-motion";

type SkillTagProps = { label: string; index: number };

export function SkillTag({ label, index }: SkillTagProps) {
  return (
    <motion.li
      className="border border-line bg-panel px-3 py-2 font-mono text-sm text-text transition-colors hover:border-neon hover:text-neon"
      initial={{ y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
    >
      {label}
    </motion.li>
  );
}
