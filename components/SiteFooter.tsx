import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { company, footerColumns, socials } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-feature-deep text-on-feature-body">
      <div className="absolute inset-0 grid-veil opacity-40" aria-hidden="true" />

      {/* Link columns ------------------------------------------------------ */}
      <div className="relative">
        <div className="shell grid gap-12 py-16 lg:grid-cols-[1.15fr_2.85fr] lg:gap-16">
          <div>
            <Logo className="h-20 lg:h-24" />
            <ul className="mt-7 space-y-3.5 text-[0.9375rem]">
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-on-feature-accent" />
                <span className="text-on-feature-body">{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="size-4 shrink-0 text-on-feature-accent" />
                <a
                  href={company.phoneHref}
                  className="text-on-feature-body transition-colors hover:text-on-feature-heading"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="size-4 shrink-0 text-on-feature-accent" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-on-feature-body transition-colors hover:text-on-feature-heading"
                >
                  {company.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-lg border border-on-feature-line text-on-feature-body transition-colors hover:border-on-feature-accent hover:bg-on-feature-fill hover:text-on-feature-heading"
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-on-feature-heading">
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[0.9375rem] text-on-feature-body transition-colors hover:text-on-feature-heading"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Legal ------------------------------------------------------------- */}
      <div className="relative border-t border-on-feature-line">
        <div className="shell flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-on-feature-muted">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-on-feature-muted">
            {["Privacy policy", "Terms of use", "Interest rate policy", "Sitemap"].map(
              (item) => (
                <li key={item}>
                  <a href="#top" className="transition-colors hover:text-on-feature-heading">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="shell pb-8">
          <p className="max-w-4xl text-xs leading-relaxed text-on-feature-muted">
            Placeholder disclosure — replace before launch. Add your entity&apos;s
            CIN, NBFC registration number, registered office and the regulatory
            disclaimers required in your jurisdiction. All rates, tenures and
            figures shown on this site are illustrative sample content.
          </p>
        </div>
      </div>
    </footer>
  );
}
