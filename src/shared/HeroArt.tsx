// Illustration du hero : le ballon-planète, ses orbites, la constellation,
// l'étoile filante et le vaisseau. Les animations sont dans base.css.

const fill = (color: string) => ({ fill: color });
const line = (color: string) => ({ stroke: color });

export default function HeroArt() {
  return (
    <svg
      viewBox="0 0 480 480"
      role="img"
      aria-label="Un ballon de basket entouré d'orbites, comme une planète"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
    >
      <defs>
        {/* Éclairage de sphère : lumière en haut à gauche, ombre à l'opposé */}
        <radialGradient id="sb-orb-light" cx="0.34" cy="0.28" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.65" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0.62" />
        </radialGradient>
        {/* Halo orange autour du ballon */}
        <radialGradient id="sb-orb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.72" style={{ stopColor: "var(--sb-accent)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--sb-accent)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Orbite extérieure */}
      <circle cx="240" cy="240" r="220" fill="none" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" style={line("var(--sb-muted)")} />

      {/* Constellation */}
      <path d="M36 96L84 62L130 100L176 72" fill="none" strokeWidth="1" style={line("var(--sb-muted)")} />
      <circle className="sb-tw" cx="36" cy="96" r="3" style={fill("var(--sb-text)")} />
      <circle className="sb-tw sb-tw--2" cx="84" cy="62" r="4" style={fill("var(--sb-text)")} />
      <circle className="sb-tw sb-tw--3" cx="130" cy="100" r="3" style={fill("var(--sb-text)")} />
      <circle className="sb-tw sb-tw--4" cx="176" cy="72" r="3.5" style={fill("var(--sb-text)")} />

      {/* Étoile filante */}
      <g className="sb-comet">
        <path d="M352 46L446 14" fill="none" strokeWidth="2" strokeLinecap="round" style={line("var(--sb-muted)")} />
        <circle cx="352" cy="46" r="4" style={fill("var(--sb-text)")} />
      </g>

      {/* Anneau (arrière), halo, ballon, ombrage, anneau (avant) */}
      <ellipse cx="240" cy="240" rx="215" ry="64" fill="none" strokeWidth="1.5" transform="rotate(-20 240 240)" style={line("var(--sb-cool)")} />
      <circle cx="240" cy="240" r="160" fill="url(#sb-orb-glow)" />
      <circle cx="240" cy="240" r="118" style={fill("var(--sb-accent)")} />
      <path
        d="M240 122V358M122 240H358M156.6 156.6Q212 240 156.6 323.4M323.4 156.6Q268 240 323.4 323.4"
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        style={line("var(--sb-accent-ink)")}
      />
      <circle cx="240" cy="240" r="118" fill="url(#sb-orb-light)" />
      <path d="M25 240A215 64 0 0 0 455 240" fill="none" strokeWidth="3" transform="rotate(-20 240 240)" style={line("var(--sb-cool)")} />

      {/* Lunes */}
      <circle cx="347.5" cy="295.4" r="9" transform="rotate(-20 240 240)" style={fill("var(--sb-text)")} />
      <circle cx="347.5" cy="295.4" r="9" transform="rotate(-20 240 240)" fill="url(#sb-orb-light)" />
      <circle cx="381.4" cy="71.5" r="6" style={fill("var(--sb-cool)")} />
      <circle cx="381.4" cy="71.5" r="6" fill="url(#sb-orb-light)" />

      {/* Petite planète à anneau */}
      <ellipse cx="70" cy="384" rx="40" ry="10" fill="none" strokeWidth="1.5" transform="rotate(-24 70 384)" style={line("var(--sb-text)")} />
      <circle cx="70" cy="384" r="22" style={fill("var(--sb-cool)")} />
      <circle cx="70" cy="384" r="22" fill="url(#sb-orb-light)" />
      <path d="M30 384A40 10 0 0 0 110 384" fill="none" strokeWidth="1.5" transform="rotate(-24 70 384)" style={line("var(--sb-text)")} />

      {/* Vaisseau en orbite */}
      <g className="sb-ship-orbit">
        <g transform="translate(240 44)">
          <path className="sb-flame" d="M-16 0L-30 -4L-25 0L-30 4Z" style={fill("var(--sb-accent)")} />
          <path d="M-13 -4L-22 -11L-15 0L-22 11L-13 4Z" style={fill("var(--sb-accent)")} />
          <path d="M-16 0C-10 -9 6 -9 19 0C6 9 -10 9 -16 0Z" style={fill("var(--sb-text)")} />
          <circle cx="5" cy="0" r="3.2" style={fill("var(--sb-accent)")} />
        </g>
      </g>
    </svg>
  );
}
