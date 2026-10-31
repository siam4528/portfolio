type SectionHeadingProps = { id: string; children: string };

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
      {children}
    </h2>
  );
}
