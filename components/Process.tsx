"use client";

import { useState } from "react";

import { Icon } from "@/components/Icon";
import { steps } from "@/lib/site";

export function Process() {
  // `selected` is the committed step (click); `preview` is a transient hover
  // or keyboard-focus state that wins while it lasts.
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? selected;
  const last = steps.length - 1;

  // The rail spans centre-of-first to centre-of-last, so each step sits at an
  // even fraction along it.
  const progress = last > 0 ? (active / last) * 100 : 0;

  return (
    <section id="process" className="relative overflow-hidden bg-surface-alt py-16 lg:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">How it works</span>
          <h2 className="mt-5 text-4xl font-bold leading-[1.12] text-heading lg:text-[2.75rem]">
            Three steps, one afternoon
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-body">
            From the first field to funds in your account, without a single
            printed page.
          </p>
        </div>

        <ol
          className="relative mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6"
          onMouseLeave={() => setPreview(null)}
        >
          {/* Connector rail — dashed base with a solid fill that animates
              out to whichever step is selected. */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative mx-[16.6%] h-0.5">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,var(--color-brand-300)_0_8px,transparent_8px_18px)]" />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-brand-600 transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {steps.map((step, index) => {
            const reached = index <= active;

            return (
              <li key={step.title} className="relative">
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  onMouseEnter={() => setPreview(index)}
                  onFocus={() => setPreview(index)}
                  onBlur={() => setPreview(null)}
                  aria-current={index === selected ? "step" : undefined}
                  className="flex h-full w-full cursor-pointer flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-card transition-colors lg:bg-transparent lg:p-0 lg:shadow-none"
                >
                  <span className="relative grid size-[6.5rem] place-items-center">
                    <span
                      className={`absolute inset-0 rounded-full border bg-surface transition-colors duration-500 ${
                        reached ? "border-brand-400/40" : "border-line"
                      }`}
                    />
                    <span
                      className={`absolute inset-2.5 rounded-full transition-colors duration-500 ${
                        reached ? "bg-tint" : "bg-surface-sunken"
                      }`}
                    />
                    <Icon
                      name={step.icon}
                      className={`relative size-8 transition-colors duration-500 ${
                        reached ? "text-brand-ink" : "text-faint"
                      }`}
                    />
                    <span
                      className={`absolute -right-1 -top-1 grid size-8 place-items-center rounded-full font-display text-sm font-bold transition-colors duration-500 ${
                        reached
                          ? "bg-accent-400 text-brand-950"
                          : "bg-line text-muted"
                      }`}
                    >
                      {step.meta.replace("Step ", "")}
                    </span>
                  </span>

                  <h3
                    className={`mt-7 text-xl font-semibold transition-colors duration-500 ${
                      reached ? "text-heading" : "text-muted"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3.5 max-w-sm text-[0.9375rem] leading-relaxed text-body">
                    {step.body}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#apply" className="btn btn-dark">
            Start my application
            <Icon name="arrow-right" className="size-4" strokeWidth={2} />
          </a>
          <p className="text-sm text-muted">
            Takes about four minutes · no impact on your credit score
          </p>
        </div>
      </div>
    </section>
  );
}
