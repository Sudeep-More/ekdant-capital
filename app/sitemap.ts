import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * Serves /sitemap.xml. The site is a single route today; the in-page nav uses
 * hash anchors (#products, #calculator), which are not separate URLs and so do
 * not belong here. Splitting the loan products into real routes is what would
 * grow this list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
