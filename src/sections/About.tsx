import photo from "../assets/siam.webp";
import { SectionHeading } from "../components/SectionHeading";
import { SkillTag } from "../components/SkillTag";
import { profile, skills } from "../data/content";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-16">
      <div className="grid content-start gap-8">
        <SectionHeading id="about-title">About</SectionHeading>
        <img
          src={photo}
          alt={`Portrait of ${profile.name}`}
          width={800}
          height={1000}
          loading="lazy"
          className="h-auto w-full max-w-xs border border-line"
        />
      </div>
      <div className="grid content-start gap-8">
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
