import { company, siteUrl, socials } from "@/lib/site";

/** Only real, resolvable profiles belong in `sameAs`; `#` placeholders hurt. */
const profileUrls = socials
  .map((s) => s.href)
  .filter((href) => href.startsWith("http"));

/**
 * Schema.org JSON-LD describing the business, emitted as a single @graph.
 *
 * This is what search engines read to build a brand knowledge panel and to
 * place the business in local results — it matters more than any meta tag for
 * a search like "Ekdant Capital".
 *
 * `FinancialService` is a subtype of `LocalBusiness`, so it carries the
 * name/address/phone triple Google matches against the Google Business
 * Profile. Those three MUST stay byte-identical to the profile and to the
 * footer, or the signals do not reinforce each other.
 *
 * Per the Next.js JSON-LD guide, "<" is escaped to its unicode form so a stray
 * angle bracket in the data cannot break out of the script tag.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": `${siteUrl}/#organisation`,
        name: "Ekdant Capital",
        legalName: company.legalName,
        url: siteUrl,
        telephone: company.phone,
        email: company.email,
        image: `${siteUrl}/ekdant-logo.png`,
        logo: `${siteUrl}/ekdant-logo.png`,
        description:
          "Loan sourcing partner arranging personal, business, home, property, education and vehicle loans across a panel of banks and NBFCs.",
        slogan: company.tagline,
        foundingDate: String(company.founded),
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "GF-18, Dwarkadhish Chamber, Nr. Bethak Mandir, Kevdabaug",
          addressLocality: "Vadodara",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Gujarat, India",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:30",
            closes: "19:00",
          },
        ],
        sameAs: profileUrls,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Ekdant Capital",
        inLanguage: "en-IN",
        publisher: { "@id": `${siteUrl}/#organisation` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
