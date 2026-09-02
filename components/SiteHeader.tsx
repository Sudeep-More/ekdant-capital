"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { company, navigation, socials } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDrawerOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar ---------------------------------------------------- */}
      <div className="hidden bg-feature-deep text-on-feature-body lg:block">
        <div className="shell flex h-11 items-center justify-between text-[0.8125rem]">
          <div className="flex items-center gap-6">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-on-feature-heading"
            >
              <Icon name="phone" className="size-4 text-on-feature-accent" />
              {company.phone}
            </a>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-on-feature-heading"
            >
              <Icon name="whatsapp" className="size-4 text-on-feature-accent" />
              WhatsApp
            </a>
            <span className="inline-flex items-center gap-2 text-on-feature-muted">
              <Icon name="clock" className="size-4" />
              {company.hours}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...(social.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={social.label}
                className="grid size-7 place-items-center rounded-md text-on-feature-body transition-colors hover:bg-on-feature-fill hover:text-on-feature-heading"
              >
                <Icon name={social.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Primary bar ---------------------------------------------------- */}
      <div
        className={`border-b bg-surface/95 backdrop-blur transition-shadow duration-300 ${
          scrolled
            ? "border-line shadow-[0_10px_30px_-24px_rgb(7_16_15/0.5)]"
            : "border-transparent"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
          <a href="#top" aria-label={`${company.name} home`}>
            <Logo className="h-14 lg:h-[4.5rem]" />
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}
                >
                  <a
                    href={item.href}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                      isOpen
                        ? "bg-tint text-brand-ink"
                        : "text-body hover:text-brand-ink"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <Icon
                        name="chevron-down"
                        className={`size-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    )}
                  </a>

                  {hasChildren && (
                    <div
                      className={`absolute left-0 top-full w-72 origin-top-left pt-2 transition duration-150 ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-lift">
                        {item.children!.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-tint"
                          >
                            <span className="text-[0.9375rem] font-medium text-heading group-hover:text-brand-ink">
                              {child.label}
                            </span>
                            {child.hint ? (
                              <span className="text-xs font-semibold text-accent-600">
                                {child.hint}
                              </span>
                            ) : (
                              <Icon
                                name="arrow-right"
                                className="size-4 -translate-x-1 text-brand-600 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a href="#calculator" className="btn btn-outline hidden xl:inline-flex">
              Check my eligibility
            </a>
            <a href="#apply" className="btn btn-primary hidden sm:inline-flex">
              Apply now
              <Icon name="arrow-right" className="size-4" strokeWidth={2} />
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-lg border border-line text-brand-ink lg:hidden"
            >
              <Icon name="menu" className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer -------------------------------------------------- */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          drawerOpen ? "visible" : "invisible"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-ink-950/50 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-surface transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-line px-5">
            <Logo className="h-12" />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-lg border border-line text-body"
            >
              <Icon name="x-mark" className="size-5" strokeWidth={1.8} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = drawerSection === item.label;

              if (!hasChildren) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block rounded-xl px-3.5 py-3 font-medium text-heading"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setDrawerSection(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-xl px-3.5 py-3 font-medium text-heading"
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      className={`size-4 text-muted transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="ml-3.5 space-y-0.5 border-l border-line pb-2 pl-3">
                        {item.children!.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setDrawerOpen(false)}
                            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] text-body"
                          >
                            {child.label}
                            {child.hint && (
                              <span className="text-xs font-semibold text-accent-600">
                                {child.hint}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-line p-5">
            <a
              href="#apply"
              onClick={() => setDrawerOpen(false)}
              className="btn btn-primary w-full"
            >
              Apply now
            </a>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDrawerOpen(false)}
              className="btn btn-outline w-full"
            >
              <Icon name="whatsapp" className="size-4" />
              Chat on WhatsApp
            </a>
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 text-sm font-medium text-brand-ink"
            >
              <Icon name="phone" className="size-4" />
              {company.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
