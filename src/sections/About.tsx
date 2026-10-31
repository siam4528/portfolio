import { SectionHeading } from "../components/SectionHeading";
import { SkillTag } from "../components/SkillTag";
import { profile, skills } from "../data/content";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-16">
      <SectionHeading id="about-title">About</SectionHeading>
      <div className="grid gap-8">
        <p className="max-w-[60ch] text-lg leading-relaxed text-dim">{profile.bio}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Skills">
          {skills.map((skill, index) => (
            <SkillTag key={skill.name} label={skill.name} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
