"use client";

import { useEffect, useSyncExternalStore } from "react";

import { Icon } from "@/components/Icon";

export const THEME_KEY = "ekdant-theme";

type Theme = "light" | "dark";

/**
 * Runs before first paint, so the correct theme is on <html> by the time
 * anything renders — no flash of the wrong palette. Kept as a string because it
 * is injected with dangerouslySetInnerHTML in the document head.
 *
 * Must stay in sync with THEME_KEY above.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("ekdant-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

/* The active theme lives in the DOM (set pre-paint by the script above), so it
   is read as an external store rather than mirrored into React state. */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => "light");
}

export function ThemeToggle({
  tone = "light",
  className = "",
}: {
  /** "dark" when the toggle sits on a dark band (the utility bar). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const theme = useTheme();
  const isDark = theme === "dark";

  // Keep following the OS while the visitor has not made an explicit choice.
  // Writing the attribute is an external-system update; the store picks it up.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (localStorage.getItem(THEME_KEY)) return;
      document.documentElement.setAttribute(
        "data-theme",
        query.matches ? "dark" : "light",
      );
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private browsing — the choice just will not persist.
    }
  };

  const surface =
    tone === "dark"
      ? "border-on-feature-line text-on-feature-body hover:border-on-feature-accent hover:bg-on-feature-fill hover:text-on-feature-heading"
      : "border-line text-body hover:border-accent-500 hover:text-brand-ink";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`grid place-items-center rounded-lg border transition-colors ${surface} ${className}`}
    >
      {/* Both icons are rendered; which one shows is driven by the data-theme
          attribute in CSS, so it is correct even before hydration. */}
      <Icon name="sun" className="size-[1.15rem] dark:hidden" />
      <Icon name="moon" className="hidden size-[1.15rem] dark:block" />
    </button>
  );
}
