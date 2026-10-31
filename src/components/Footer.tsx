import { profile } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <p className="mx-auto m-0 max-w-6xl px-4 py-6 font-mono text-xs text-dim sm:px-8">
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
