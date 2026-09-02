import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * Serves /robots.txt. Everything is public, so the only real job here is
 * advertising the sitemap — that is what gives a crawler a route into the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
