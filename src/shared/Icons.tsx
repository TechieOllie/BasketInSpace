// Petites icônes en SVG, communes aux deux versions.
import type { SVGProps } from "react";

export function BallLogo() {
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="14" cy="14" r="12" style={{ fill: "var(--sb-accent)" }} />
      <path
        d="M14 2V26M2 14H26M5.5 5.5Q11 14 5.5 22.5M22.5 5.5Q17 14 22.5 22.5"
        fill="none"
        strokeWidth="1.6"
        style={{ stroke: "var(--sb-accent-ink)" }}
      />
    </svg>
  );
}

const stroke: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function SunIcon() {
  return (
    <svg {...stroke}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg {...stroke}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
