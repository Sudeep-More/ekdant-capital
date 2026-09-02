import Image from "next/image";

import lockup from "@/public/ekdant-logo.png";
import { company } from "@/lib/site";

/**
 * The supplied Ekdant Capital lockup, used whole — mark, wordmark, rule and
 * tagline. Height comes from the caller via `className`; the image fills it.
 */
export function Logo({ className = "h-14" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      <Image
        src={lockup}
        alt={`${company.legalName} — ${company.tagline}`}
        priority
        className="h-full w-auto"
      />
    </span>
  );
}
