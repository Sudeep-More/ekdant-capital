/**
 * Original geometric artwork used in place of stock photography. Every variant
 * is drawn on a 400×300 canvas and scales to its container, so the same asset
 * works as a hero visual, a product card header, or an article thumbnail.
 *
 * `tone` picks the palette:
 *   "dark"  — for the full-bleed bands that stay dark in both themes (fixed).
 *   "light" — for cards, so it has to follow the active theme. Colours are
 *             therefore CSS variables (see `--art-light-*` in globals.css)
 *             applied via `style`, since var() is not resolved in SVG
 *             presentation *attributes*.
 */

export type ArtVariant =
  | "orbit"
  | "bars"
  | "arch"
  | "coins"
  /* Subject scenes, one per loan product. Drawn rather than photographed so
     they stay on-brand, weigh nothing, and follow the theme. */
  | "wallet"
  | "shop"
  | "house"
  | "property"
  | "cashflow"
  | "briefcase"
  | "car"
  | "graduation";

type ArtProps = {
  variant: ArtVariant;
  tone?: "light" | "dark";
  className?: string;
};

type Palette = {
  field: string;
  fieldTo: string;
  line: string;
  solid: string;
  accent: string;
  soft: string;
};

const palette = (tone: "light" | "dark"): Palette => ({
  field: `var(--art-${tone}-field)`,
  fieldTo: `var(--art-${tone}-field-to)`,
  line: `var(--art-${tone}-line)`,
  solid: `var(--art-${tone}-solid)`,
  accent: `var(--art-${tone}-accent)`,
  soft: `var(--art-${tone}-soft)`,
});

export function Art({ variant, tone = "light", className }: ArtProps) {
  const c = palette(tone);
  const gid = `art-${variant}-${tone}`;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${gid}-field`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: c.field }} />
          <stop offset="100%" style={{ stopColor: c.fieldTo }} />
        </linearGradient>
        <linearGradient id={`${gid}-fade`} x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0%" style={{ stopColor: c.solid, stopOpacity: 0.95 }} />
          <stop offset="100%" style={{ stopColor: c.line, stopOpacity: 0.35 }} />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${gid}-field)`} />

      {variant === "orbit" && (
        <g fill="none" style={{ stroke: c.line }}>
          <g opacity="0.35" strokeWidth="1.25">
            <ellipse cx="200" cy="150" rx="150" ry="150" />
            <ellipse cx="200" cy="150" rx="112" ry="112" />
            <ellipse cx="200" cy="150" rx="74" ry="74" />
          </g>
          <circle cx="200" cy="150" r="40" style={{ fill: c.solid, stroke: "none" }} />
          <path
            d="M182 152.5 195 165l24-27"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: c.soft }}
          />
          <circle
            cx="200"
            cy="0"
            r="11"
            transform="translate(0 38)"
            style={{ fill: c.accent, stroke: "none" }}
          />
          <circle cx="88" cy="150" r="7" opacity="0.75" style={{ fill: c.line, stroke: "none" }} />
          <circle cx="312" cy="150" r="9" opacity="0.85" style={{ fill: c.accent, stroke: "none" }} />
          <circle cx="200" cy="262" r="6" opacity="0.6" style={{ fill: c.line, stroke: "none" }} />
        </g>
      )}

      {variant === "bars" && (
        <g>
          <g strokeWidth="1.25" opacity="0.28" style={{ stroke: c.line }}>
            {[70, 120, 170, 220].map((y) => (
              <line key={y} x1="42" y1={y} x2="358" y2={y} />
            ))}
          </g>
          {[
            { x: 66, h: 74 },
            { x: 122, h: 116 },
            { x: 178, h: 92 },
            { x: 234, h: 150 },
            { x: 290, h: 186 },
          ].map((bar, i) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={248 - bar.h}
              width="44"
              height={bar.h}
              rx="10"
              fill={i === 4 ? undefined : `url(#${gid}-fade)`}
              style={i === 4 ? { fill: c.accent } : undefined}
            />
          ))}
          <path
            d="M88 158 144 122 200 138 256 92 312 54"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 9"
            opacity="0.9"
            style={{ stroke: c.soft }}
          />
          <line x1="42" y1="248" x2="358" y2="248" strokeWidth="2.5" style={{ stroke: c.line }} />
        </g>
      )}

      {variant === "arch" && (
        <g>
          <path d="M0 300V214l84-52 84 52v86Z" opacity="0.18" style={{ fill: c.line }} />
          <path d="M132 300V148a68 68 0 0 1 136 0v152Z" fill={`url(#${gid}-fade)`} />
          <path
            d="M164 300v-86a36 36 0 0 1 72 0v86Z"
            opacity={tone === "dark" ? 0.16 : 0.9}
            style={{ fill: c.soft }}
          />
          <rect x="188" y="238" width="24" height="62" rx="12" style={{ fill: c.accent }} />
          <path d="M400 300V196l-70-44-62 39v109Z" opacity="0.28" style={{ fill: c.line }} />
          <circle cx="200" cy="86" r="13" style={{ fill: c.accent }} />
          <g strokeWidth="1.25" opacity="0.3" style={{ stroke: c.line }}>
            <line x1="0" y1="300" x2="400" y2="300" />
            <line x1="0" y1="276" x2="400" y2="276" />
          </g>
        </g>
      )}

      {variant === "coins" && (
        <g>
          {[
            { y: 208, r: 1 },
            { y: 166, r: 0.94 },
            { y: 124, r: 0.86 },
          ].map((disc, i) => (
            <g key={disc.y}>
              <ellipse
                cx="200"
                cy={disc.y}
                rx={96 * disc.r}
                ry={30 * disc.r}
                style={{ fill: i === 2 ? c.accent : c.solid }}
              />
              <ellipse
                cx="200"
                cy={disc.y - 9}
                rx={96 * disc.r}
                ry={30 * disc.r}
                opacity={i === 2 ? 1 : 0.85}
                style={{ fill: i === 2 ? c.soft : c.line }}
              />
            </g>
          ))}
          <path
            d="M200 84v-18m-13 6 13-13 13 13"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: c.line }}
          />
          <ellipse
            cx="200"
            cy="208"
            rx="140"
            ry="44"
            fill="none"
            strokeWidth="1.25"
            opacity="0.3"
            style={{ stroke: c.line }}
          />
        </g>
      )}

      {/* --- Subject scenes ------------------------------------------------
         The card crops to roughly y 20-280, so every subject sits inside
         that band rather than using the full 300. ------------------------ */}

      {variant === "house" && (
        <g>
          <line x1="0" y1="252" x2="400" y2="252" strokeWidth="2.5" opacity="0.45" style={{ stroke: c.line }} />
          <rect x="256" y="86" width="26" height="54" rx="4" opacity="0.8" style={{ fill: c.line }} />
          <path d="M200 68 330 172H70Z" style={{ fill: c.solid }} />
          <rect x="112" y="172" width="176" height="80" style={{ fill: `url(#${gid}-fade)` }} />
          <path d="M176 252v-44a24 24 0 0 1 48 0v44Z" opacity={tone === "dark" ? 0.22 : 0.92} style={{ fill: c.soft }} />
          <circle cx="215" cy="228" r="4" style={{ fill: c.solid }} />
          <rect x="130" y="190" width="32" height="30" rx="4" style={{ fill: c.accent }} />
          <rect x="238" y="190" width="32" height="30" rx="4" style={{ fill: c.accent }} />
        </g>
      )}

      {variant === "car" && (
        <g>
          <line x1="0" y1="246" x2="400" y2="246" strokeWidth="3" opacity="0.45" style={{ stroke: c.line }} />
          <line x1="24" y1="268" x2="376" y2="268" strokeWidth="5" strokeLinecap="round" strokeDasharray="20 24" opacity="0.35" style={{ stroke: c.line }} />
          <path d="M60 234v-30c0-10 8-18 18-18h18l30-36c6-7 14-11 23-11h64c9 0 17 4 23 11l30 36h32c16 0 28 13 28 28v20c0 6-5 11-11 11Z" style={{ fill: `url(#${gid}-fade)` }} />
          <path d="M146 186l24-28c2-3 5-4 8-4h18v32Z" opacity="0.9" style={{ fill: c.soft }} />
          <path d="M208 154h28c4 0 8 2 10 5l19 27h-57Z" opacity="0.9" style={{ fill: c.soft }} />
          <rect x="322" y="200" width="22" height="13" rx="6" style={{ fill: c.accent }} />
          <circle cx="128" cy="220" r="26" style={{ fill: c.line }} />
          <circle cx="128" cy="220" r="11" style={{ fill: c.soft }} />
          <circle cx="286" cy="220" r="26" style={{ fill: c.line }} />
          <circle cx="286" cy="220" r="11" style={{ fill: c.soft }} />
        </g>
      )}

      {variant === "graduation" && (
        <g>
          <rect x="118" y="236" width="164" height="18" rx="5" opacity="0.55" style={{ fill: c.line }} />
          <rect x="132" y="218" width="136" height="18" rx="5" opacity="0.85" style={{ fill: c.soft }} />
          <path d="M146 158v40c0 17 24 29 54 29s54-12 54-29v-40l-54 20Z" style={{ fill: `url(#${gid}-fade)` }} />
          <path d="M200 84 330 132 200 180 70 132Z" style={{ fill: c.solid }} />
          <path d="M330 132v52" fill="none" strokeWidth="5" strokeLinecap="round" style={{ stroke: c.line }} />
          <circle cx="330" cy="192" r="10" style={{ fill: c.accent }} />
        </g>
      )}

      {variant === "briefcase" && (
        <g>
          <path d="M164 132v-18a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16v18" fill="none" strokeWidth="11" strokeLinecap="round" style={{ stroke: c.line }} />
          <rect x="92" y="132" width="216" height="126" rx="18" style={{ fill: `url(#${gid}-fade)` }} />
          <rect x="92" y="178" width="216" height="26" opacity={tone === "dark" ? 0.2 : 0.9} style={{ fill: c.soft }} />
          <rect x="182" y="174" width="36" height="34" rx="8" style={{ fill: c.accent }} />
        </g>
      )}

      {variant === "shop" && (
        <g>
          <line x1="0" y1="252" x2="400" y2="252" strokeWidth="2.5" opacity="0.45" style={{ stroke: c.line }} />
          <rect x="148" y="88" width="104" height="24" rx="8" opacity="0.75" style={{ fill: c.line }} />
          <rect x="92" y="136" width="216" height="116" style={{ fill: `url(#${gid}-fade)` }} />
          <path d="M78 124h244l-16 38H94Z" style={{ fill: c.solid }} />
          <path d="M118 124h40l-10 38h-40Z" opacity="0.55" style={{ fill: c.accent }} />
          <path d="M198 124h40l-10 38h-40Z" opacity="0.55" style={{ fill: c.accent }} />
          <path d="M278 124h30l-16 38h-24Z" opacity="0.55" style={{ fill: c.accent }} />
          <rect x="176" y="188" width="48" height="64" rx="5" opacity={tone === "dark" ? 0.22 : 0.92} style={{ fill: c.soft }} />
          <rect x="112" y="184" width="46" height="40" rx="5" opacity="0.85" style={{ fill: c.accent }} />
          <rect x="242" y="184" width="46" height="40" rx="5" opacity="0.85" style={{ fill: c.accent }} />
        </g>
      )}

      {variant === "property" && (
        <g>
          <line x1="0" y1="252" x2="400" y2="252" strokeWidth="2.5" opacity="0.45" style={{ stroke: c.line }} />
          <rect x="248" y="172" width="90" height="80" opacity="0.3" style={{ fill: c.line }} />
          <rect x="112" y="82" width="128" height="170" style={{ fill: `url(#${gid}-fade)` }} />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={128 + col * 36}
                y={100 + row * 36}
                width="22"
                height="24"
                rx="3"
                opacity="0.85"
                style={{ fill: c.accent }}
              />
            )),
          )}
          <g fill="none" strokeWidth="11" strokeLinecap="round" style={{ stroke: c.accent }}>
            <circle cx="300" cy="104" r="21" />
            <path d="M300 125v42m0-13h17" />
          </g>
        </g>
      )}

      {variant === "wallet" && (
        <g>
          <rect x="126" y="106" width="168" height="54" rx="10" opacity="0.45" transform="rotate(-9 210 133)" style={{ fill: c.line }} />
          <rect x="138" y="124" width="168" height="54" rx="10" opacity="0.8" transform="rotate(-4 222 151)" style={{ fill: c.soft }} />
          <rect x="92" y="150" width="216" height="112" rx="20" style={{ fill: `url(#${gid}-fade)` }} />
          <rect x="244" y="186" width="64" height="40" rx="14" opacity={tone === "dark" ? 0.22 : 0.92} style={{ fill: c.soft }} />
          <circle cx="276" cy="206" r="10" style={{ fill: c.accent }} />
        </g>
      )}

      {variant === "cashflow" && (
        <g>
          <g fill="none" strokeWidth="12" strokeLinecap="round" opacity="0.4" style={{ stroke: c.line }}>
            <path d="M124 96a76 76 0 1 1-22 76" />
          </g>
          <path d="M104 132 100 176l42-14Z" opacity="0.55" style={{ fill: c.line }} />
          <rect x="120" y="134" width="160" height="90" rx="12" opacity="0.35" style={{ fill: c.line }} />
          <rect x="134" y="120" width="160" height="90" rx="12" style={{ fill: `url(#${gid}-fade)` }} />
          <circle cx="214" cy="165" r="27" fill="none" strokeWidth="6" opacity="0.9" style={{ stroke: c.soft }} />
          <g fill="none" strokeWidth="6" strokeLinecap="round" style={{ stroke: c.accent }}>
            <path d="M203 153h22M203 165h22" />
            <path d="M206 153c14 0 18 5 18 11s-6 10-16 10l16 15" />
          </g>
        </g>
      )}
    </svg>
  );
}
