/* ============================================================
   Little Readers  —  Original Illustration System
   All artwork is original CSS/SVG created for Bright EngMath.
   No external images or copyrighted characters are used.
   ============================================================ */

/* Palette (kept in JS so illustrations stay consistent) */
const C = {
  cream: "#FBF6EC", paper: "#FFFDF7",
  sage: "#9CC29A", sageD: "#6FA06C",
  forest: "#2F5D50", forestL: "#3C7365",
  coral: "#F0A088", coralD: "#E27E63",
  sky: "#9BC9E4", skyD: "#5FA8D2",
  yellow: "#F4C95D", yellowD: "#E4B23F",
  brown: "#B07E52", brownD: "#8A5E38",
  white: "#FFFFFF", ink: "#3A4A44",
  pink: "#F3B6C4", green: "#7FB069", greenD: "#5E8F4E",
  red: "#E27E63", blue: "#5FA8D2"
};

/* wrap raw inner markup into a labelled, accessible svg */
function svg(inner, vb, extra) {
  return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" ' +
         (extra || "") + ' focusable="false" aria-hidden="true">' + inner + "</svg>";
}

/* -------- small object icons (viewBox 0 0 64 64) ---------- */
const ICON_PATHS = {
  ball: '<circle cx="32" cy="34" r="20" fill="'+C.sky+'"/><path d="M14 30 Q32 22 50 30" stroke="'+C.white+'" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M16 40 Q32 48 48 40" stroke="'+C.white+'" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="26" cy="27" rx="5" ry="3" fill="#fff" opacity=".6"/>',
  fish: '<path d="M12 32 C18 18 42 18 48 32 C42 46 18 46 12 32Z" fill="'+C.coral+'"/><path d="M48 32 l10 -8 v16Z" fill="'+C.coralD+'"/><circle cx="22" cy="30" r="3" fill="#fff"/><circle cx="22" cy="30" r="1.6" fill="'+C.ink+'"/>',
  star: '<path d="M32 8 l7 15 16 2 -12 11 4 16 -15 -8 -15 8 4 -16 -12 -11 16 -2Z" fill="'+C.yellow+'" stroke="'+C.yellowD+'" stroke-width="2" stroke-linejoin="round"/>',
  otter: '<ellipse cx="32" cy="40" rx="16" ry="18" fill="'+C.brown+'"/><ellipse cx="32" cy="44" rx="9" ry="10" fill="#E9D3BE"/><circle cx="22" cy="20" r="7" fill="'+C.brown+'"/><circle cx="42" cy="20" r="7" fill="'+C.brown+'"/><circle cx="32" cy="26" r="12" fill="'+C.brownD+'"/><circle cx="27" cy="24" r="2.2" fill="#2b2b2b"/><circle cx="37" cy="24" r="2.2" fill="#2b2b2b"/><ellipse cx="32" cy="29" rx="3" ry="2.2" fill="#2b2b2b"/>',
  river: '<rect x="8" y="18" width="48" height="28" rx="10" fill="'+C.sky+'"/><path d="M12 26 Q20 22 28 26 T44 26" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/><path d="M14 36 Q22 32 30 36 T46 36" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>',
  wave: '<path d="M8 40 Q16 30 24 40 T40 40 T56 40 V52 H8Z" fill="'+C.sky+'"/><path d="M8 34 Q16 24 24 34 T40 34 T56 34" stroke="'+C.skyD+'" stroke-width="3" fill="none" stroke-linecap="round"/>',
  backpack: '<rect x="16" y="18" width="32" height="34" rx="10" fill="'+C.coral+'"/><path d="M24 18 a8 8 0 0 1 16 0" fill="none" stroke="'+C.coralD+'" stroke-width="4"/><rect x="24" y="30" width="16" height="14" rx="4" fill="'+C.paper+'"/><rect x="29" y="18" width="6" height="14" rx="3" fill="'+C.coralD+'"/>',
  book: '<path d="M12 16 h18 a4 4 0 0 1 4 4 v30 h-18 a4 4 0 0 0 -4 4Z" fill="'+C.sage+'"/><path d="M52 16 h-18 a4 4 0 0 0 -4 4 v30 h18 a4 4 0 0 1 4 4Z" fill="'+C.sageD+'"/><rect x="30" y="16" width="4" height="38" fill="'+C.forest+'"/>',
  apple: '<path d="M32 22 C22 14 14 24 18 34 C21 44 28 50 32 50 C36 50 43 44 46 34 C50 24 42 14 32 22Z" fill="'+C.red+'"/><rect x="30.5" y="14" width="3" height="9" rx="1.5" fill="'+C.brownD+'"/><path d="M33 16 q7 -4 9 2 q-7 2 -9 -2Z" fill="'+C.green+'"/>',
  school: '<rect x="12" y="28" width="40" height="24" rx="3" fill="'+C.coral+'"/><path d="M10 28 L32 12 L54 28Z" fill="'+C.coralD+'"/><rect x="28" y="38" width="8" height="14" fill="'+C.paper+'"/><rect x="18" y="34" width="7" height="7" fill="'+C.paper+'"/><rect x="39" y="34" width="7" height="7" fill="'+C.paper+'"/>',
  hat: '<ellipse cx="32" cy="44" rx="24" ry="6" fill="'+C.forestL+'"/><path d="M18 44 C18 26 46 26 46 44Z" fill="'+C.forest+'"/><rect x="18" y="38" width="28" height="6" rx="3" fill="'+C.yellow+'"/>',
  shoe: '<path d="M10 40 C10 32 20 30 26 34 L42 40 C50 42 54 44 54 48 H12 C10 48 10 44 10 40Z" fill="'+C.skyD+'"/><path d="M24 34 l3 6 M30 36 l3 6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  turtle: '<ellipse cx="32" cy="36" rx="20" ry="14" fill="'+C.green+'"/><path d="M32 24 a12 12 0 0 1 12 12 h-24 a12 12 0 0 1 12 -12Z" fill="'+C.greenD+'"/><path d="M32 26 v18 M22 36 h20 M26 30 l12 12 M38 30 l-12 12" stroke="'+C.forest+'" stroke-width="1.6" opacity=".5"/><circle cx="50" cy="34" r="6" fill="'+C.green+'"/><circle cx="51" cy="33" r="1.6" fill="'+C.ink+'"/><ellipse cx="18" cy="50" rx="4" ry="3" fill="'+C.greenD+'"/><ellipse cx="46" cy="50" rx="4" ry="3" fill="'+C.greenD+'"/>',
  frog: '<ellipse cx="32" cy="40" rx="18" ry="14" fill="'+C.sage+'"/><circle cx="22" cy="24" r="7" fill="'+C.sage+'"/><circle cx="42" cy="24" r="7" fill="'+C.sage+'"/><circle cx="22" cy="23" r="3" fill="#fff"/><circle cx="42" cy="23" r="3" fill="#fff"/><circle cx="22" cy="23" r="1.6" fill="'+C.ink+'"/><circle cx="42" cy="23" r="1.6" fill="'+C.ink+'"/><path d="M24 42 q8 6 16 0" stroke="'+C.forest+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  tree: '<rect x="29" y="36" width="6" height="16" rx="2" fill="'+C.brownD+'"/><circle cx="32" cy="26" r="14" fill="'+C.green+'"/><circle cx="22" cy="30" r="9" fill="'+C.greenD+'"/><circle cx="42" cy="30" r="9" fill="'+C.sageD+'"/>',
  snail: '<ellipse cx="40" cy="44" rx="18" ry="6" fill="'+C.sage+'"/><path d="M20 46 q-2 -14 12 -14 q10 0 10 9 q0 7 -7 7 q-5 0 -5 -4 q0 -3 3 -3" fill="none" stroke="'+C.coralD+'" stroke-width="4" stroke-linecap="round"/><path d="M20 46 q-4 0 -6 -6" stroke="'+C.sageD+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="13" cy="39" r="1.6" fill="'+C.ink+'"/>',
  leaf: '<path d="M16 48 C16 24 40 16 50 16 C50 40 34 50 16 48Z" fill="'+C.green+'"/><path d="M20 46 Q34 34 48 18" stroke="'+C.greenD+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  sun: '<circle cx="32" cy="32" r="13" fill="'+C.yellow+'"/><g stroke="'+C.yellowD+'" stroke-width="3" stroke-linecap="round"><path d="M32 6v7M32 51v7M6 32h7M51 32h7M13 13l5 5M46 46l5 5M51 13l-5 5M18 46l-5 5"/></g>',
  slide: '<path d="M14 50 L14 20 C14 16 20 16 20 20 L20 34 L48 50" stroke="'+C.coralD+'" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M20 34 L48 50 L48 44 L26 30Z" fill="'+C.sky+'"/><rect x="10" y="48" width="44" height="4" rx="2" fill="'+C.sageD+'"/>',
  swing: '<path d="M12 14 H52 L44 40 M12 14 L20 40" stroke="'+C.brownD+'" stroke-width="4" fill="none" stroke-linecap="round"/><line x1="28" y1="16" x2="26" y2="38" stroke="'+C.forest+'" stroke-width="2.4"/><line x1="38" y1="16" x2="40" y2="38" stroke="'+C.forest+'" stroke-width="2.4"/><rect x="24" y="38" width="18" height="5" rx="2.5" fill="'+C.yellow+'"/>',
  seesaw: '<path d="M10 44 L54 30" stroke="'+C.coral+'" stroke-width="6" stroke-linecap="round"/><path d="M32 50 L26 36 L38 36Z" fill="'+C.sageD+'"/><circle cx="12" cy="44" r="4" fill="'+C.forest+'"/><circle cx="52" cy="30" r="4" fill="'+C.forest+'"/>',
  lunchbox: '<rect x="14" y="24" width="36" height="26" rx="6" fill="'+C.coral+'"/><rect x="14" y="24" width="36" height="9" rx="4" fill="'+C.coralD+'"/><rect x="27" y="18" width="10" height="8" rx="3" fill="'+C.coralD+'"/><rect x="28" y="36" width="8" height="8" rx="2" fill="'+C.paper+'"/>',
  desk: '<rect x="10" y="24" width="44" height="8" rx="3" fill="'+C.brown+'"/><rect x="14" y="32" width="5" height="20" rx="2" fill="'+C.brownD+'"/><rect x="45" y="32" width="5" height="20" rx="2" fill="'+C.brownD+'"/><rect x="30" y="32" width="20" height="12" rx="2" fill="'+C.brownD+'"/>',
  glass: '<circle cx="28" cy="28" r="14" fill="none" stroke="'+C.forest+'" stroke-width="5"/><circle cx="28" cy="28" r="9" fill="'+C.sky+'" opacity=".5"/><rect x="38" y="38" width="16" height="6" rx="3" transform="rotate(45 40 40)" fill="'+C.forest+'"/>',
  heart: '<path d="M32 50 C10 34 16 16 30 22 C31 22.6 32 24 32 24 C32 24 33 22.6 34 22 C48 16 54 34 32 50Z" fill="'+C.coralD+'"/>',
  flower: '<circle cx="32" cy="28" r="7" fill="'+C.yellow+'"/><g fill="'+C.pink+'"><circle cx="32" cy="16" r="6"/><circle cx="32" cy="40" r="6"/><circle cx="20" cy="28" r="6"/><circle cx="44" cy="28" r="6"/></g><circle cx="32" cy="28" r="6" fill="'+C.yellowD+'"/><rect x="30" y="40" width="4" height="14" rx="2" fill="'+C.green+'"/>',
  seed: '<ellipse cx="32" cy="34" rx="9" ry="13" fill="'+C.brown+'"/><path d="M32 22 q6 -6 10 -3 q-3 6 -10 3Z" fill="'+C.green+'"/><path d="M28 32 q4 4 8 0" stroke="'+C.brownD+'" stroke-width="2" fill="none"/>',
  wateringcan: '<path d="M16 30 h22 v16 a6 6 0 0 1 -6 6 h-10 a6 6 0 0 1 -6 -6Z" fill="'+C.sky+'"/><path d="M38 34 l12 -8" stroke="'+C.skyD+'" stroke-width="4" stroke-linecap="round"/><path d="M48 24 l6 2 -2 4" fill="'+C.skyD+'"/><path d="M16 32 q-8 -2 -6 -10" stroke="'+C.skyD+'" stroke-width="4" fill="none" stroke-linecap="round"/>',
  sprout: '<path d="M32 52 V30" stroke="'+C.greenD+'" stroke-width="4" stroke-linecap="round"/><path d="M32 34 q-14 -2 -14 -14 q14 -2 14 12Z" fill="'+C.green+'"/><path d="M32 30 q14 -4 15 -16 q-15 0 -15 14Z" fill="'+C.sage+'"/><rect x="18" y="50" width="28" height="6" rx="3" fill="'+C.brown+'"/>',
  cup: '<path d="M18 24 h24 l-3 26 a4 4 0 0 1 -4 4 h-10 a4 4 0 0 1 -4 -4Z" fill="'+C.paper+'" stroke="'+C.sageD+'" stroke-width="3"/><ellipse cx="30" cy="24" rx="12" ry="3.5" fill="'+C.sky+'"/>',
  rain: '<path d="M18 30 a10 10 0 0 1 20 -2 a8 8 0 0 1 2 16 H20 a9 9 0 0 1 -2 -14Z" fill="'+C.skyD+'"/><g stroke="'+C.sky+'" stroke-width="3.4" stroke-linecap="round"><path d="M22 50 l-2 5M32 50 l-2 5M42 50 l-2 5"/></g>',
  umbrella: '<path d="M14 32 a18 18 0 0 1 36 0Z" fill="'+C.coral+'"/><path d="M14 32 q4 -6 9 0 q4 -6 9 0 q4 -6 9 0 q4 -6 9 0" fill="none" stroke="'+C.coralD+'" stroke-width="2"/><path d="M32 32 v18 a5 5 0 0 1 -10 0" stroke="'+C.forest+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
  boot: '<path d="M22 14 h10 v22 h10 a6 6 0 0 1 6 6 v6 h-26 a6 6 0 0 1 -6 -6Z" fill="'+C.yellowD+'"/><rect x="20" y="46" width="30" height="4" rx="2" fill="'+C.forest+'"/><rect x="22" y="18" width="10" height="4" fill="'+C.yellow+'"/>',
  fort: '<path d="M10 50 V34 L32 20 L54 34 V50Z" fill="'+C.coral+'"/><path d="M10 34 L32 20 L54 34" fill="none" stroke="'+C.coralD+'" stroke-width="3"/><path d="M24 50 V40 a8 8 0 0 1 16 0 V50Z" fill="'+C.paper+'"/><path d="M14 34 v16 M22 30 v20 M32 26 v24 M42 30 v20 M50 34 v16" stroke="'+C.coralD+'" stroke-width="1.6" opacity=".4"/>',
  blanket: '<path d="M10 26 q22 -8 44 0 v20 q-22 8 -44 0Z" fill="'+C.sky+'"/><path d="M10 34 q22 -8 44 0 M10 40 q22 -8 44 0" stroke="'+C.skyD+'" stroke-width="2.4" fill="none"/><path d="M22 28 v22 M34 27 v23 M46 28 v22" stroke="'+C.skyD+'" stroke-width="2" opacity=".5"/>',
  pillow: '<rect x="12" y="22" width="40" height="26" rx="12" fill="'+C.yellow+'"/><circle cx="32" cy="35" r="4" fill="'+C.yellowD+'"/><path d="M18 26 q14 -4 28 0" stroke="'+C.yellowD+'" stroke-width="2" fill="none" opacity=".6"/>',
  basket: '<path d="M14 30 h36 l-4 20 a4 4 0 0 1 -4 3 H22 a4 4 0 0 1 -4 -3Z" fill="'+C.brown+'"/><path d="M18 20 a14 14 0 0 1 28 0" fill="none" stroke="'+C.brownD+'" stroke-width="4"/><path d="M20 34 h24 M22 42 h20" stroke="'+C.brownD+'" stroke-width="2" opacity=".6"/><rect x="14" y="28" width="36" height="6" rx="3" fill="'+C.brownD+'"/>',
  ant: '<circle cx="18" cy="34" r="6" fill="'+C.ink+'"/><circle cx="30" cy="34" r="5" fill="'+C.ink+'"/><circle cx="44" cy="34" r="7" fill="'+C.ink+'"/><g stroke="'+C.ink+'" stroke-width="2" stroke-linecap="round"><path d="M30 34 l-6 10M30 34 l0 12M30 34 l6 10M30 34 l-6 -10M30 34 l6 -10"/></g><path d="M48 30 l4 -5M46 28 l3 -6" stroke="'+C.ink+'" stroke-width="2" stroke-linecap="round"/>',
  library: '<rect x="12" y="16" width="12" height="36" rx="2" fill="'+C.coral+'"/><rect x="26" y="16" width="12" height="36" rx="2" fill="'+C.sage+'"/><rect x="40" y="16" width="12" height="36" rx="2" fill="'+C.yellow+'"/><rect x="14" y="22" width="8" height="4" fill="#fff" opacity=".6"/><rect x="28" y="22" width="8" height="4" fill="#fff" opacity=".6"/><rect x="42" y="22" width="8" height="4" fill="#fff" opacity=".6"/>',
  worried: '<circle cx="32" cy="32" r="20" fill="'+C.yellow+'"/><circle cx="25" cy="28" r="2.4" fill="'+C.ink+'"/><circle cx="39" cy="28" r="2.4" fill="'+C.ink+'"/><path d="M24 42 q8 -6 16 0" stroke="'+C.ink+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
  return: '<path d="M40 20 a16 16 0 1 0 12 16" fill="none" stroke="'+C.forest+'" stroke-width="5" stroke-linecap="round"/><path d="M40 12 v10 h-10Z" fill="'+C.forest+'"/>',
  fox: '<path d="M32 50 L18 30 Q16 20 24 22 L32 30 L40 22 Q48 20 46 30Z" fill="'+C.coralD+'"/><path d="M24 22 L20 14 L28 20Z" fill="'+C.coralD+'"/><path d="M40 22 L44 14 L36 20Z" fill="'+C.coralD+'"/><path d="M32 40 L24 32 h16Z" fill="'+C.paper+'"/><circle cx="27" cy="32" r="2" fill="'+C.ink+'"/><circle cx="37" cy="32" r="2" fill="'+C.ink+'"/><circle cx="32" cy="40" r="2" fill="'+C.ink+'"/>',
  boat: '<path d="M12 38 h40 l-6 12 a4 4 0 0 1 -4 3 H22 a4 4 0 0 1 -4 -3Z" fill="'+C.coralD+'"/><rect x="30" y="14" width="3" height="24" fill="'+C.brownD+'"/><path d="M33 16 l14 18 h-14Z" fill="'+C.sky+'"/><path d="M30 16 l-12 18 h12Z" fill="'+C.paper+'"/>',
  flag: '<rect x="18" y="12" width="4" height="40" rx="2" fill="'+C.brownD+'"/><path d="M22 14 h24 l-6 8 6 8 h-24Z" fill="'+C.coral+'"/>',
  butterfly: '<path d="M32 18 v28" stroke="'+C.ink+'" stroke-width="3" stroke-linecap="round"/><path d="M32 24 C16 8 8 28 20 34 C10 42 24 50 32 38Z" fill="'+C.coral+'"/><path d="M32 24 C48 8 56 28 44 34 C54 42 40 50 32 38Z" fill="'+C.sky+'"/><circle cx="24" cy="26" r="2.6" fill="#fff"/><circle cx="40" cy="26" r="2.6" fill="#fff"/><path d="M32 18 l-4 -6M32 18 l4 -6" stroke="'+C.ink+'" stroke-width="2" stroke-linecap="round"/>',
  wing: '<path d="M40 46 C10 42 12 14 34 18 C30 26 34 30 44 28 C42 36 46 40 52 38 C50 46 46 48 40 46Z" fill="'+C.sky+'"/><path d="M22 24 q8 6 6 16" stroke="'+C.skyD+'" stroke-width="2.4" fill="none"/>',
  hand: '<path d="M24 52 V32 a3 3 0 0 1 6 0 v-6 a3 3 0 0 1 6 0 v4 a3 3 0 0 1 6 0 v4 a3 3 0 0 1 6 0 v14 a10 10 0 0 1 -10 10 h-6 a8 8 0 0 1 -8 -8Z" fill="'+C.coral+'"/><path d="M18 34 l6 4" stroke="'+C.coralD+'" stroke-width="4" stroke-linecap="round"/>',
  cheer: '<circle cx="32" cy="34" r="16" fill="'+C.yellow+'"/><circle cx="26" cy="31" r="2.4" fill="'+C.ink+'"/><circle cx="38" cy="31" r="2.4" fill="'+C.ink+'"/><path d="M24 38 q8 8 16 0" stroke="'+C.ink+'" stroke-width="2.8" fill="none" stroke-linecap="round"/><g stroke="'+C.coralD+'" stroke-width="3" stroke-linecap="round"><path d="M12 16 l4 4M52 16 l-4 4M32 8 v5"/></g>'
};

/* badge medallions (viewBox 0 0 64 64) */
const BADGE_PATHS = {
  badgeStar: '<circle cx="32" cy="32" r="26" fill="'+C.yellow+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.yellowD+'" stroke-width="3"/><path d="M32 16 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1Z" fill="#fff"/>',
  badgeBook: '<circle cx="32" cy="32" r="26" fill="'+C.sage+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.sageD+'" stroke-width="3"/><path d="M20 22 h11 a2 2 0 0 1 2 2 v18 h-11 a2 2 0 0 0 -2 2Z" fill="#fff"/><path d="M44 22 h-11 a2 2 0 0 0 -2 2 v18 h11 a2 2 0 0 1 2 2Z" fill="#EAF3E6"/>',
  badgeWord: '<circle cx="32" cy="32" r="26" fill="'+C.coral+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.coralD+'" stroke-width="3"/><text x="32" y="40" font-size="20" font-family="Georgia,serif" font-weight="700" text-anchor="middle" fill="#fff">Aa</text>',
  badgeEar: '<circle cx="32" cy="32" r="26" fill="'+C.sky+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.skyD+'" stroke-width="3"/><path d="M26 40 a8 8 0 1 1 12 -6 c0 5 -5 5 -5 9 a3 3 0 0 1 -6 0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>',
  badgeGlass: '<circle cx="32" cy="32" r="26" fill="'+C.forestL+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.forest+'" stroke-width="3"/><circle cx="29" cy="29" r="9" fill="none" stroke="#fff" stroke-width="3.4"/><path d="M36 36 l7 7" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  badgeCrown: '<circle cx="32" cy="32" r="26" fill="'+C.yellow+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="'+C.yellowD+'" stroke-width="3"/><path d="M20 40 L18 24 L26 30 L32 20 L38 30 L46 24 L44 40Z" fill="#fff"/>',
  badgeTrophy: '<circle cx="32" cy="32" r="26" fill="'+C.coralD+'"/><circle cx="32" cy="32" r="26" fill="none" stroke="#C9603F" stroke-width="3"/><path d="M24 20 h16 v6 a8 8 0 0 1 -16 0Z" fill="#fff"/><path d="M40 21 h5 a5 5 0 0 1 -5 6M24 21 h-5 a5 5 0 0 0 5 6" fill="none" stroke="#fff" stroke-width="3"/><rect x="29" y="34" width="6" height="6" fill="#fff"/><rect x="24" y="40" width="16" height="4" rx="2" fill="#fff"/>'
};

function icon(name, cls) {
  var inner = ICON_PATHS[name] || BADGE_PATHS[name] || '<circle cx="32" cy="32" r="18" fill="'+C.sage+'"/>';
  return svg(inner, "0 0 64 64", 'class="' + (cls || "icon-svg") + '"');
}
function badge(name) {
  var inner = BADGE_PATHS[name] || BADGE_PATHS.badgeStar;
  return svg(inner, "0 0 64 64", 'class="badge-svg"');
}

/* -------- hero scenes (viewBox 0 0 420 260) -------------- */
function scene(bg, inner) {
  var frame = '<rect x="0" y="0" width="420" height="260" rx="26" fill="'+bg+'"/>' +
    '<circle cx="60" cy="46" r="26" fill="#ffffff" opacity=".30"/>' +
    '<circle cx="92" cy="52" r="20" fill="#ffffff" opacity=".22"/>';
  return svg(frame + inner, "0 0 420 260", 'class="hero-svg" preserveAspectRatio="xMidYMid meet"');
}
const HERO = {
  otter: function(){ return scene(C.sky,
    '<path d="M0 180 Q210 150 420 180 V260 H0Z" fill="'+C.skyD+'"/>'+
    '<path d="M0 200 Q210 175 420 200 V260 H0Z" fill="#4E97C0"/>'+
    '<g transform="translate(150 96)">'+ICON_PATHS.otter.replace(/cx="(\d+)"/g,function(m,n){return 'cx="'+n+'"'})+'</g>'+
    '<g transform="translate(250 150) scale(1.4)">'+ICON_PATHS.ball+'</g>'+
    '<g transform="translate(300 60) scale(0.9)">'+ICON_PATHS.sun+'</g>'); },
  backpack: function(){ return scene(C.coral,
    '<rect x="0" y="196" width="420" height="64" fill="'+C.coralD+'"/>'+
    '<g transform="translate(120 60) scale(1.8)">'+ICON_PATHS.backpack+'</g>'+
    '<g transform="translate(276 150)">'+ICON_PATHS.apple+'</g>'+
    '<g transform="translate(60 150)">'+ICON_PATHS.book+'</g>'); },
  turtle: function(){ return scene(C.sage,
    '<path d="M0 190 Q210 168 420 190 V260 H0Z" fill="'+C.sageD+'"/>'+
    '<g transform="translate(70 150)">'+ICON_PATHS.tree+'</g>'+
    '<g transform="translate(150 96) scale(1.9)">'+ICON_PATHS.turtle+'</g>'+
    '<g transform="translate(300 150)">'+ICON_PATHS.leaf+'</g>'); },
  playground: function(){ return scene(C.yellow,
    '<rect x="0" y="200" width="420" height="60" fill="'+C.sageD+'"/>'+
    '<g transform="translate(40 88) scale(1.5)">'+ICON_PATHS.slide+'</g>'+
    '<g transform="translate(230 84) scale(1.5)">'+ICON_PATHS.swing+'</g>'+
    '<g transform="translate(300 40)">'+ICON_PATHS.sun+'</g>'+
    '<g transform="translate(180 168)">'+ICON_PATHS.ball+'</g>'); },
  lunchbox: function(){ return scene(C.coral,
    '<rect x="0" y="196" width="420" height="64" fill="'+C.coralD+'"/>'+
    '<g transform="translate(40 150)">'+ICON_PATHS.desk+'</g>'+
    '<g transform="translate(150 82) scale(1.9)">'+ICON_PATHS.lunchbox+'</g>'+
    '<g transform="translate(300 150)">'+ICON_PATHS.glass+'</g>'); },
  garden: function(){ return scene(C.sage,
    '<path d="M0 190 Q210 168 420 190 V260 H0Z" fill="#8B5E3C"/>'+
    '<g transform="translate(60 120) scale(1.3)">'+ICON_PATHS.flower+'</g>'+
    '<g transform="translate(180 120) scale(1.3)">'+ICON_PATHS.sprout+'</g>'+
    '<g transform="translate(280 96) scale(1.6)">'+ICON_PATHS.wateringcan+'</g>'+
    '<g transform="translate(330 40)">'+ICON_PATHS.sun+'</g>'); },
  rain: function(){ return scene(C.skyD,
    '<rect x="0" y="200" width="420" height="60" fill="#4E97C0"/>'+
    '<g transform="translate(150 70) scale(1.8)">'+ICON_PATHS.umbrella+'</g>'+
    '<g transform="translate(60 60) scale(1.2)">'+ICON_PATHS.rain+'</g>'+
    '<g transform="translate(300 60) scale(1.2)">'+ICON_PATHS.rain+'</g>'+
    '<g transform="translate(180 176)">'+ICON_PATHS.boot+'</g>'); },
  fort: function(){ return scene(C.yellow,
    '<rect x="0" y="200" width="420" height="60" fill="'+C.coralD+'"/>'+
    '<g transform="translate(130 70) scale(2)">'+ICON_PATHS.fort+'</g>'+
    '<g transform="translate(60 150)">'+ICON_PATHS.pillow+'</g>'+
    '<g transform="translate(300 150)">'+ICON_PATHS.book+'</g>'); },
  picnic: function(){ return scene(C.sage,
    '<path d="M0 188 Q210 164 420 188 V260 H0Z" fill="'+C.sageD+'"/>'+
    '<g transform="translate(50 118) scale(1.3)">'+ICON_PATHS.tree+'</g>'+
    '<g transform="translate(160 90) scale(1.7)">'+ICON_PATHS.basket+'</g>'+
    '<g transform="translate(300 170) scale(1.1)">'+ICON_PATHS.ant+'</g>'+
    '<g transform="translate(330 44)">'+ICON_PATHS.sun+'</g>'); },
  library: function(){ return scene(C.coral,
    '<rect x="0" y="200" width="420" height="60" fill="'+C.coralD+'"/>'+
    '<g transform="translate(120 66) scale(2)">'+ICON_PATHS.library+'</g>'+
    '<g transform="translate(300 150)">'+ICON_PATHS.fox+'</g>'); },
  boat: function(){ return scene(C.sky,
    '<path d="M0 176 Q210 150 420 176 V260 H0Z" fill="'+C.skyD+'"/>'+
    '<path d="M0 206 Q210 182 420 206 V260 H0Z" fill="#4E97C0"/>'+
    '<g transform="translate(120 96) scale(1.8)">'+ICON_PATHS.boat+'</g>'+
    '<g transform="translate(300 150) scale(0.9)">'+ICON_PATHS.flag+'</g>'); },
  butterfly: function(){ return scene(C.sky,
    '<path d="M0 194 Q210 170 420 194 V260 H0Z" fill="'+C.sageD+'"/>'+
    '<g transform="translate(130 60) scale(2)">'+ICON_PATHS.butterfly+'</g>'+
    '<g transform="translate(60 150)">'+ICON_PATHS.flower+'</g>'+
    '<g transform="translate(300 150)">'+ICON_PATHS.flower+'</g>'); }
};
function heroScene(name) { return (HERO[name] || HERO.otter)(); }

/* big welcome illustration */
function welcomeHero() {
  return svg(
    '<rect x="0" y="0" width="420" height="300" rx="30" fill="'+C.sky+'"/>'+
    '<circle cx="66" cy="56" r="30" fill="#fff" opacity=".3"/>'+
    '<circle cx="104" cy="64" r="22" fill="#fff" opacity=".22"/>'+
    '<g transform="translate(300 40)">'+ICON_PATHS.sun+'</g>'+
    '<path d="M0 214 Q210 184 420 214 V300 H0Z" fill="'+C.sageD+'"/>'+
    '<path d="M0 240 Q210 214 420 240 V300 H0Z" fill="'+C.sage+'"/>'+
    '<g transform="translate(150 96) scale(1.7)">'+ICON_PATHS.otter+'</g>'+
    '<g transform="translate(60 150) scale(1.1)">'+ICON_PATHS.tree+'</g>'+
    '<g transform="translate(300 150) scale(1.15)">'+ICON_PATHS.book+'</g>'+
    '<g transform="translate(250 210) scale(0.9)">'+ICON_PATHS.butterfly+'</g>',
    "0 0 420 300", 'class="welcome-hero-svg" preserveAspectRatio="xMidYMid meet"');
}
