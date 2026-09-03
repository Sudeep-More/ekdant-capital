import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { company } from "@/lib/site";

export const alt =
  "Ekdant Capital — loan advisors in Vadodara. One application, 42 lenders competing for it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The lockup is inlined as a data URI: the renderer has no network access, so
   an <img src="/…"> pointing at the public folder would come back empty. */
const lockup = await readFile(join(process.cwd(), "public/ekdant-logo.png"));
const lockupSrc = `data:image/png;base64,${lockup.toString("base64")}`;

/**
 * The card shown when the site is shared on WhatsApp, Facebook or X.
 *
 * Replaces the raw 720x227 logo that was standing in for one, which social
 * platforms rendered as a thin strip. Every container carries an explicit
 * `display: flex` — the renderer requires it on any element with more than one
 * child and throws otherwise.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #e9f6ee 100%)",
          padding: "72px 80px",
        }}
      >
        <img src={lockupSrc} alt="" width={420} height={132} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: "#0c2418",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            One application,
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: "#158034",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            42 lenders competing for it
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #c2e2cd",
            paddingTop: 28,
            fontSize: 27,
            color: "#37564a",
          }}
        >
          <div style={{ display: "flex" }}>Vadodara, Gujarat</div>
          <div style={{ display: "flex", color: "#01582b", fontWeight: 600 }}>
            {company.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
