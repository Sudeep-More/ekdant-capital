import Image from "next/image";

import { lenders } from "@/lib/site";

export function Lenders() {
  return (
    <section id="partners" className="bg-page py-16 lg:py-20">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Lending partners</span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.14] text-heading lg:text-4xl">
            The panel your file goes out to
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
            We are an authorised sourcing partner for every bank and NBFC below.
            Your file goes to whichever of them prices it best — not whichever
            pays us most.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
          {lenders.map((lender) => (
            <li
              key={lender.name}
              /* The cards stay white in both themes — bank marks are drawn for
                 a white ground and go muddy on anything else. */
              className="flex h-16 items-center justify-center rounded-lg border border-line bg-white px-3 py-2 shadow-sm transition-shadow duration-300 hover:shadow-card"
            >
              {lender.logo ? (
                <span className="relative block h-7 w-full">
                  <Image
                    src={lender.logo}
                    alt={lender.name}
                    fill
                    sizes="140px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className="text-center font-display text-[0.6875rem] font-semibold leading-tight text-ink-900">
                  {lender.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Lender names and marks are the property of their respective owners and
          are shown to identify the panel we source from.
        </p>
      </div>
    </section>
  );
}
