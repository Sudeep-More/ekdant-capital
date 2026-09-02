import { ApplyForm } from "@/components/ApplyForm";
import { Icon } from "@/components/Icon";
import { company, hero, heroMetrics } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-feature text-on-feature-heading">
      {/* Ambient background ------------------------------------------------ */}
      <div className="absolute inset-0 grid-veil opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-52 size-[38rem] rounded-full bg-accent-300/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-56 -left-32 size-[32rem] rounded-full bg-brand-300/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative grid items-start gap-12 pb-16 pt-14 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:pb-20 lg:pt-20">
        {/* Copy ------------------------------------------------------------ */}
        <div className="lg:pt-6">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-on-feature-line bg-on-feature-fill px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-on-feature-body">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
            </span>
            {company.tagline}
          </span>

          <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.06] sm:text-[3.5rem] lg:text-[3.75rem]">
            {hero.headline}{" "}
            <span className="relative whitespace-nowrap text-on-feature-accent">
              {hero.emphasis}
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-on-feature-accent/45"
                aria-hidden="true"
              >
                <path
                  d="M2 8c60-6 130-7 296-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            {hero.headlineEnd}
          </h1>

          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-feature-body">
            {hero.body}
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-on-feature-line pt-7">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[0.8125rem] leading-snug text-on-feature-body">
                  {metric.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-bold text-on-feature-heading">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-on-feature-heading transition-colors hover:text-on-feature-accent"
            >
              <Icon name="phone" className="size-4 text-on-feature-accent" />
              {company.phone}
            </a>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-on-feature-body transition-colors hover:text-on-feature-heading"
            >
              <Icon name="whatsapp" className="size-4 text-on-feature-accent" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Apply form ------------------------------------------------------ */}
        <div className="relative lg:sticky lg:top-28">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
