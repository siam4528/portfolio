import { type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "../components/SectionHeading";
import { links } from "../data/content";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "failed" | "not-configured";

const messages: Record<Exclude<Status, "idle">, string> = {
  sending: "Sending your message...",
  sent: "Message sent. I'll reply as soon as I can.",
  failed: "Your message didn't send. Check your connection and try again, or reach me on LinkedIn.",
  "not-configured": "This form isn't connected yet. Please reach me on LinkedIn for now.",
};

const fieldClass = "w-full border border-line bg-panel px-3 py-3 text-text placeholder:text-dim focus:border-neon focus:outline-none";
const labelClass = "font-mono text-sm text-dim";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serviceId || !templateId || !publicKey) {
      setStatus("not-configured");
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: String(data.get("name")),
          reply_to: String(data.get("email")),
          message: String(data.get("message")),
        },
        { publicKey },
      );
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
