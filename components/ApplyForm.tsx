"use client";

import { useState } from "react";

import { Icon } from "@/components/Icon";
import { products } from "@/lib/site";

type Errors = Partial<Record<"name" | "phone" | "city", string>>;

/**
 * Hero lead-capture card. Deliberately three fields and a loan-type picker —
 * qualification happens on the callback, not in the form.
 */
export function ApplyForm() {
  const [product, setProduct] = useState<string>(products[0].name);
  const [reference, setReference] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\s+/g, "");
    const city = String(data.get("city") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Tell us what to call you.";
    if (!/^(\+91)?[6-9]\d{9}$/.test(phone))
      next.phone = "Enter a 10-digit Indian mobile number.";
    if (city.length < 2) next.city = "Which city?";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setFailure(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          name,
          phone,
          city,
          consent: data.get("consent") === "on",
        }),
      });

      const result = await response.json().catch(() => ({}));

      // Only call it received once the lead is actually recorded.
      if (!response.ok || !result.reference) {
        setFailure(
          result.error ?? "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setReference(result.reference);
    } catch {
      setFailure("Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      id="apply"
      className="rounded-[1.5rem] border border-white/12 bg-surface p-6 shadow-lift sm:p-7"
    >
      {reference ? (
        <div className="flex flex-col items-start py-6">
          <span className="grid size-13 place-items-center rounded-2xl bg-tint text-brand-ink">
            <Icon name="check" className="size-7" strokeWidth={2.4} />
          </span>
          <h2 className="mt-5 text-xl font-bold text-heading">
            Request received
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
            An advisor will call you within one working hour with offers from
            the panel. Your reference is{" "}
            <strong className="font-semibold text-brand-ink">{reference}</strong>
            .
          </p>
          <button
            type="button"
            onClick={() => setReference(null)}
            className="btn btn-outline mt-6"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="font-display text-xl font-bold text-heading">
            Apply in 30 seconds
          </h2>
          <p className="mt-1.5 text-[0.875rem] text-muted">
            No documents yet. No impact on your credit score.
          </p>

          {/* Loan-type picker ------------------------------------------- */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              I need a
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {products.map((item) => {
                const isActive = item.name === product;

                return (
                  <label
                    key={item.name}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-[0.8125rem] font-semibold transition-colors ${
                      isActive
                        ? "border-brand-600 bg-brand-700 text-white"
                        : "border-line-strong bg-surface text-body hover:border-brand-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="product"
                      value={item.name}
                      checked={isActive}
                      onChange={() => setProduct(item.name)}
                      className="sr-only"
                    />
                    {item.name}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              name="name"
              error={errors.name}
            />
            <Field
              label="Mobile number"
              name="phone"
              type="tel"
              error={errors.phone}
            />
          </div>

          <div className="mt-4">
            <Field
              label="City"
              name="city"
              error={errors.city}
            />
          </div>

          <label className="mt-5 flex items-start gap-2.5 text-[0.75rem] leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 size-3.5 shrink-0 accent-brand-700"
            />
            I authorise Ekdant Capital to contact me about this enquiry,
            overriding my DNC registration.
          </label>

          {failure && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
            >
              {failure}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending…" : "Get my best offer"}
            {!sending && (
              <Icon name="arrow-right" className="size-4" strokeWidth={2} />
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[0.8125rem] font-semibold text-body">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-1.5 w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-heading placeholder:text-faint transition-colors ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-line-strong focus:border-brand-600"
        }`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
