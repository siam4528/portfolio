import { useEffect, useState } from "react";

type TypingTextProps = { text: string; reducedMotion: boolean };

export function TypingText({ text, reducedMotion }: TypingTextProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setCount((current) => {
        if (current >= text.length) clearInterval(timer);
        return Math.min(current + 1, text.length);
      });
    }, 85);
    return () => clearInterval(timer);
  }, [text, reducedMotion]);

  const shown = reducedMotion ? text : text.slice(0, count);

  // The hidden copy holds the final size so the layout doesn't move while typing.
  return (
    <span className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span className="invisible" aria-hidden="true">{text}_</span>
      <span className="absolute inset-0" aria-hidden="true">
        {shown}
        <span className="caret text-neon">_</span>
      </span>
    </span>
  );
}
