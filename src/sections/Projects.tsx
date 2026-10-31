import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { projects } from "../data/content";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-8">
      <SectionHeading id="projects-title">Projects</SectionHeading>
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
