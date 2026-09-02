import Image from "next/image";

import lockup from "@/public/ekdant-logo.png";
import lockupDark from "@/public/ekdant-logo-dark.png";
import { company } from "@/lib/site";

/**
 * The supplied Ekdant Capital lockup, used whole — mark, wordmark, rule and
 * tagline. Height comes from the caller via `className`; the images fill it.
 *
 * The green in the original disappears on a dark ground, so each lockup has a
 * light-green twin that swaps in under [data-theme="dark"].
 */
export function Logo({ className = "h-14" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      <Image
        src={lockup}
        alt={`${company.legalName} — ${company.tagline}`}
        priority
        className="h-full w-auto dark:hidden"
      />
      <Image
        src={lockupDark}
        alt=""
        aria-hidden="true"
        priority
        className="hidden h-full w-auto dark:block"
      />
    </span>
  );
}
