import { type FormEvent, useState } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { links, profile } from "../data/content";

type Status = "idle" | "sending" | "sent" | "failed";

const messages: Record<Exclude<Status, "idle">, string> = {
  sending: "Sending your message...",
  sent: "Message sent. I'll reply as soon as I can.",
  failed: `Your message didn't send. Check your connection and try again, or email me at ${profile.email}.`,
};

const fieldClass = "w-full border border-line bg-panel px-3 py-3 text-text placeholder:text-dim focus:border-neon focus:outline-none";
const labelClass = "font-mono text-sm text-dim";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _honey: data.get("_honey"),
          _subject: "New message from your portfolio",
          _template: "table",
        }),
      });
      const result = await response.json();
      if (!response.ok || String(result.success) !== "true") throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-8 md:grid-cols-[1fr_2fr] md:gap-16">
      <div className="grid content-start gap-6">
        <SectionHeading id="contact-title">Contact</SectionHeading>
        <ul className="m-0 grid list-none gap-2 p-0 font-mono text-sm">
          <li>
            <a href={`mailto:${profile.email}`} className="break-all text-cyan underline underline-offset-4 hover:text-neon">
              {profile.email}
            </a>
          </li>
          {links.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noreferrer" className="text-cyan underline underline-offset-4 hover:text-neon">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form className="grid gap-5" onSubmit={onSubmit}>
        {/* Hidden from people. Bots that fill it in get rejected as spam. */}
        <input className="hidden" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className={labelClass} htmlFor="contact-name">Name</label>
            <input className={fieldClass} id="contact-name" name="name" autoComplete="name" required />
          </div>
          <div className="grid gap-2">
            <label className={labelClass} htmlFor="contact-email">Email</label>
            <input className={fieldClass} id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>
        </div>
        <div className="grid gap-2">
          <label className={labelClass} htmlFor="contact-message">Message</label>
          <textarea className={fieldClass} id="contact-message" name="message" rows={6} required />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="cursor-pointer bg-neon px-5 py-3 font-mono text-sm font-semibold text-void transition-colors hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send message
          </button>
          <p className={`m-0 max-w-[48ch] text-sm ${status === "sent" ? "text-neon" : "text-text"}`} role="status">
            {status !== "idle" && messages[status]}
          </p>
        </div>
      </form>
    </section>
  );
}
