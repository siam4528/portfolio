const items = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-line bg-void/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <a href="#top" aria-label="Siam Hossain, back to top" className="font-display text-lg font-bold text-neon">SH</a>
        <ul className="m-0 flex list-none gap-3 p-0 font-mono text-xs sm:gap-6 sm:text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-dim transition-colors hover:text-neon">{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
