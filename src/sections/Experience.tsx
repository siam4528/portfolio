import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { TimelineItem } from "../components/TimelineItem";
import { certifications } from "../data/content";

export function Experience() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-16">
      <SectionHeading id="certifications-title">Certifications</SectionHeading>
      <div className="relative">
        <motion.span
          className="absolute inset-y-0 left-0 w-0.5 origin-top bg-line"
          initial={{ scaleY: 0.2 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        />
        <ol className="m-0 grid list-none gap-10 p-0">
          {certifications.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
