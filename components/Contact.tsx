import { Icon } from "@/components/Icon";
import { company, contactChannels } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="bg-surface-alt py-16 lg:py-20">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h2 className="mt-5 text-4xl font-bold leading-[1.12] text-heading lg:text-[2.75rem]">
            Reach a person, not a queue
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-body">
            Three ways in, all of them staffed by advisors who can actually
            price a loan. {company.hours}.
          </p>
        </div>

        {/* Channels ----------------------------------------------------- */}
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-on-feature-accent/60 hover:shadow-card"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-tint text-brand-ink transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={channel.icon} className="size-6" />
                </span>

                <span className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {channel.label}
                </span>
                <span className="mt-2 font-display text-xl font-bold leading-snug text-heading transition-colors group-hover:text-brand-ink">
                  {channel.value}
                </span>
                <span className="mt-4 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted">
                  {channel.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
