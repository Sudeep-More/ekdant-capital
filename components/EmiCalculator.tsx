"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/Icon";

const AMOUNT = { min: 50_000, max: 5_000_000, step: 25_000 };
const MONTHS = { min: 6, max: 240, step: 6 };
const RATE = { min: 8, max: 30, step: 0.05 };

const rupees = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

/** "18 lakh", "1.5 crore" — the way the amount is said out loud in India. */
function inWords(value: number) {
  if (value >= 10_000_000) {
    return `${Number((value / 10_000_000).toFixed(2))} crore`;
  }
  if (value >= 100_000) {
    return `${Number((value / 100_000).toFixed(2))} lakh`;
  }
  return `${Number((value / 1000).toFixed(0))} thousand`;
}

function tenureLabel(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${months} months`;
  if (rest === 0) return `${years} ${years === 1 ? "year" : "years"}`;
  return `${years}y ${rest}m`;
}

export function EmiCalculator() {
  const [amount, setAmount] = useState(1_200_000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(10.99);

  const { emi, interest, payable, principalShare } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const growth = Math.pow(1 + monthlyRate, months);
    const monthly = (amount * monthlyRate * growth) / (growth - 1);
    const total = monthly * months;

    return {
      emi: monthly,
      interest: total - amount,
      payable: total,
      principalShare: total > 0 ? (amount / total) * 100 : 100,
    };
  }, [amount, months, rate]);

  // Donut geometry: one ring, two arcs.
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const principalArc = (principalShare / 100) * circumference;

  const fillPercent = (value: number, range: { min: number; max: number }) =>
    ((value - range.min) / (range.max - range.min)) * 100;

  const track = (value: number, range: { min: number; max: number }) => ({
    background: `linear-gradient(to right, var(--color-brand-600) ${fillPercent(
      value,
      range,
    )}%, var(--surface-sunken) ${fillPercent(value, range)}%)`,
  });

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden bg-feature-deep py-16 text-on-feature-heading lg:py-20"
    >
      <div className="absolute inset-0 grid-veil opacity-50" aria-hidden="true" />
      <div
        className="absolute -left-40 top-10 size-[30rem] rounded-full bg-accent-300/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-on-feature-muted">
            Plan before you borrow
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-[1.12] lg:text-[2.75rem]">
            Work out the instalment first
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-on-feature-body">
            Move the sliders. Everything recalculates instantly — no email
            address required.
          </p>
        </div>

        <div className="mt-14 grid gap-6 rounded-[1.75rem] border border-on-feature-line bg-on-feature-fill p-5 backdrop-blur-sm lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:p-8">
          {/* Controls ----------------------------------------------------- */}
          <div className="rounded-2xl bg-surface p-6 text-heading lg:p-8">
            <div className="space-y-9">
              {/* Amount */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <label
                    htmlFor="emi-amount"
                    className="text-sm font-semibold text-body"
                  >
                    Loan amount
                  </label>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold leading-none text-brand-ink">
                      {rupees(amount)}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted">
                      {inWords(amount)}
                    </p>
                  </div>
                </div>
                <input
                  id="emi-amount"
                  type="range"
                  className="range mt-5"
                  style={track(amount, AMOUNT)}
                  min={AMOUNT.min}
                  max={AMOUNT.max}
                  step={AMOUNT.step}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                />
                <div className="mt-2.5 flex justify-between text-xs text-muted">
                  <span>₹50 K</span>
                  <span>₹50 L</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <label
                    htmlFor="emi-months"
                    className="text-sm font-semibold text-body"
                  >
                    Repayment tenure
                  </label>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold leading-none text-brand-ink">
                      {tenureLabel(months)}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted">
                      {months} instalments
                    </p>
                  </div>
                </div>
                <input
                  id="emi-months"
                  type="range"
                  className="range mt-5"
                  style={track(months, MONTHS)}
                  min={MONTHS.min}
                  max={MONTHS.max}
                  step={MONTHS.step}
                  value={months}
                  onChange={(event) => setMonths(Number(event.target.value))}
                />
                <div className="mt-2.5 flex justify-between text-xs text-muted">
                  <span>6 months</span>
                  <span>20 years</span>
                </div>
              </div>

              {/* Rate */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <label
                    htmlFor="emi-rate"
                    className="text-sm font-semibold text-body"
                  >
                    Assumed interest rate
                  </label>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold leading-none text-brand-ink">
                      {rate.toFixed(2)}%
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted">
                      per annum, reducing balance
                    </p>
                  </div>
                </div>
                <input
                  id="emi-rate"
                  type="range"
                  className="range mt-5"
                  style={track(rate, RATE)}
                  min={RATE.min}
                  max={RATE.max}
                  step={RATE.step}
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value))}
                />
                <div className="mt-2.5 flex justify-between text-xs text-muted">
                  <span>8.00%</span>
                  <span>30.00%</span>
                </div>
              </div>
            </div>

            <p className="mt-8 flex items-start gap-2.5 border-t border-line pt-6 text-xs leading-relaxed text-muted">
              <Icon name="shield" className="mt-px size-4 shrink-0 text-brand-600" />
              Move the slider to model any rate you like — this is your
              assumption, not an offer. What a bank actually quotes depends on
              your credit history, income and the product you choose.
            </p>
          </div>

          {/* Result ------------------------------------------------------- */}
          <div className="flex flex-col rounded-2xl bg-feature p-6 lg:p-8">
            <p className="text-sm font-semibold text-on-feature-muted">
              Your monthly instalment
            </p>
            <p className="mt-2 font-display text-[2.75rem] font-bold leading-none text-on-feature-accent lg:text-5xl">
              {rupees(emi)}
            </p>

            {/* Donut */}
            <div className="relative mx-auto mt-8 size-[13.5rem]">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgb(255 255 255 / 0.10)"
                  strokeWidth="20"
                />
                {/* Interest arc sits underneath as the full ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="var(--color-accent-400)"
                  strokeWidth="20"
                />
                {/* Principal arc drawn over it */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="var(--color-brand-400)"
                  strokeWidth="20"
                  strokeLinecap="butt"
                  strokeDasharray={`${principalArc} ${circumference}`}
                  className="transition-[stroke-dasharray] duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-feature-muted">
                    Total payable
                  </p>
                  <p className="mt-1.5 font-display text-xl font-bold text-on-feature-heading">
                    {rupees(payable)}
                  </p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <dl className="mt-8 space-y-3.5">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2.5 text-sm text-on-feature-body">
                  <span className="size-2.5 rounded-full bg-brand-400" />
                  Principal
                  <span className="text-on-feature-muted">
                    {principalShare.toFixed(0)}%
                  </span>
                </dt>
                <dd className="font-semibold tabular-nums text-on-feature-heading">
                  {rupees(amount)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2.5 text-sm text-on-feature-body">
                  <span className="size-2.5 rounded-full bg-accent-400" />
                  Interest
                  <span className="text-on-feature-muted">
                    {(100 - principalShare).toFixed(0)}%
                  </span>
                </dt>
                <dd className="font-semibold tabular-nums text-on-feature-heading">
                  {rupees(interest)}
                </dd>
              </div>
            </dl>

            <a href="#apply" className="btn btn-primary mt-8 w-full">
              Apply at this EMI
              <Icon name="arrow-right" className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
