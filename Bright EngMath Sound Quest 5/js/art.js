/* =====================================================================
   BEM.art — original inline SVG illustrations (licence-safe, hand-built)
   No third-party or copyrighted artwork is used anywhere in this course.
   ===================================================================== */
(function () {
  "use strict";
  const NS = { car:'#4aa8ff', star:'#ffce3d', farm:'#f2a03d', bird:'#6fe0b0',
               girl:'#ff7a66', nurse:'#a68bff', doctor:'#4aa8ff', teacher:'#17b3a3' };

  // Each icon returns an inner SVG string, drawn on a 100x100 canvas.
  const ICONS = {
    car: `<rect x="10" y="45" width="80" height="26" rx="10" fill="#4aa8ff"/>
      <path d="M24 45 L34 30 H66 L78 45 Z" fill="#79c2ff"/>
      <circle cx="30" cy="74" r="9" fill="#23305e"/><circle cx="70" cy="74" r="9" fill="#23305e"/>
      <rect x="40" y="34" width="20" height="10" rx="3" fill="#eaf4ff"/>`,
    star: `<path d="M50 12 L60 40 L90 40 L66 58 L75 88 L50 70 L25 88 L34 58 L10 40 L40 40 Z" fill="#ffce3d" stroke="#f2a03d" stroke-width="3"/>`,
    farm: `<rect x="22" y="45" width="56" height="38" fill="#f2a03d"/>
      <path d="M18 45 L50 22 L82 45 Z" fill="#c65f2e"/>
      <rect x="43" y="60" width="14" height="23" fill="#7a3d18"/>
      <rect x="28" y="52" width="10" height="10" fill="#fff3d6"/><rect x="62" y="52" width="10" height="10" fill="#fff3d6"/>`,
    park: `<rect x="12" y="78" width="76" height="8" rx="4" fill="#6fbf59"/>
      <circle cx="38" cy="46" r="20" fill="#6fe0b0"/><rect x="34" y="60" width="8" height="22" fill="#7a3d18"/>
      <circle cx="70" cy="54" r="14" fill="#17b3a3"/><rect x="66" y="64" width="7" height="18" fill="#7a3d18"/>`,
    bird: `<ellipse cx="50" cy="55" rx="26" ry="20" fill="#6fe0b0"/>
      <circle cx="66" cy="42" r="13" fill="#6fe0b0"/><circle cx="70" cy="40" r="3" fill="#23305e"/>
      <path d="M78 42 L92 46 L78 50 Z" fill="#ffce3d"/><path d="M30 55 Q20 42 34 44 Q30 52 44 54 Z" fill="#3fbf94"/>
      <path d="M40 74 L44 84 M56 74 L60 84" stroke="#f2a03d" stroke-width="3"/>`,
    girl: `<circle cx="50" cy="34" r="16" fill="#ffd9b0"/>
      <path d="M32 34 Q34 14 50 14 Q66 14 68 34 Q62 26 50 26 Q38 26 32 34" fill="#7a4a2a"/>
      <path d="M28 84 Q30 54 50 54 Q70 54 72 84 Z" fill="#ff7a66"/>
      <circle cx="44" cy="34" r="2.5" fill="#23305e"/><circle cx="56" cy="34" r="2.5" fill="#23305e"/>`,
    nurse: `<circle cx="50" cy="34" r="16" fill="#ffd9b0"/>
      <rect x="38" y="18" width="24" height="12" rx="3" fill="#fff"/><path d="M50 20 v8 M46 24 h8" stroke="#ff7a66" stroke-width="3"/>
      <path d="M28 84 Q30 54 50 54 Q70 54 72 84 Z" fill="#a68bff"/>`,
    doctor: `<circle cx="50" cy="34" r="16" fill="#ffd9b0"/>
      <path d="M28 84 Q30 54 50 54 Q70 54 72 84 Z" fill="#eef2fe"/>
      <path d="M50 54 L46 78 M50 54 L54 78" stroke="#4aa8ff" stroke-width="3"/>
      <circle cx="50" cy="76" r="5" fill="#4aa8ff"/>`,
    teacher: `<rect x="16" y="20" width="68" height="46" rx="4" fill="#17b3a3"/>
      <path d="M26 34 h40 M26 44 h48 M26 54 h30" stroke="#eafff9" stroke-width="3"/>
      <circle cx="50" cy="76" r="8" fill="#ffd9b0"/>`,
    tractor: `<circle cx="34" cy="70" r="16" fill="#23305e"/><circle cx="34" cy="70" r="7" fill="#6b7bb0"/>
      <circle cx="72" cy="74" r="10" fill="#23305e"/>
      <rect x="24" y="44" width="34" height="18" rx="4" fill="#6fbf59"/>
      <rect x="52" y="36" width="16" height="16" rx="3" fill="#8fd97a"/>`,
    jar: `<rect x="34" y="30" width="32" height="52" rx="8" fill="#bfe6ff"/>
      <rect x="38" y="20" width="24" height="12" rx="3" fill="#f2a03d"/>
      <rect x="34" y="50" width="32" height="20" fill="#ff7a66" opacity="0.85"/>`,
    card: `<rect x="18" y="30" width="64" height="42" rx="6" fill="#a68bff"/>
      <rect x="18" y="40" width="64" height="8" fill="#23305e"/>
      <rect x="26" y="56" width="26" height="6" rx="3" fill="#fff"/>`,
    garden: `<rect x="12" y="80" width="76" height="6" fill="#6fbf59"/>
      <circle cx="30" cy="60" r="9" fill="#ff7a66"/><rect x="28" y="66" width="4" height="16" fill="#3fbf94"/>
      <circle cx="52" cy="54" r="9" fill="#ffce3d"/><rect x="50" y="60" width="4" height="22" fill="#3fbf94"/>
      <circle cx="72" cy="62" r="9" fill="#a68bff"/><rect x="70" y="68" width="4" height="14" fill="#3fbf94"/>`,
    shirt: `<path d="M30 28 L20 40 L30 50 L34 44 V80 H66 V44 L70 50 L80 40 L70 28 L58 28 Q50 38 42 28 Z" fill="#4aa8ff"/>`,
    sun: `<circle cx="50" cy="50" r="20" fill="#ffce3d"/>
      <g stroke="#f2a03d" stroke-width="4" stroke-linecap="round">
      <path d="M50 12v10M50 78v10M12 50h10M78 50h10M24 24l7 7M69 69l7 7M76 24l-7 7M31 69l-7 7"/></g>`,
    snow: `<g stroke="#4aa8ff" stroke-width="4" stroke-linecap="round"><path d="M50 14v72M20 32l60 36M80 32L20 68"/>
      <path d="M50 14l-8 8M50 14l8 8M50 86l-8-8M50 86l8-8"/></g>`,
    arm: `<path d="M24 40 Q40 34 54 46 L70 62 Q76 68 70 74 Q64 80 58 74 L44 60 Q34 52 24 56 Z" fill="#ffd9b0"/>
      <circle cx="24" cy="48" r="12" fill="#ffc98f"/>`,
    book: `<path d="M50 26 Q34 18 18 24 V76 Q34 70 50 78 Q66 70 82 76 V24 Q66 18 50 26 Z" fill="#17b3a3"/>
      <path d="M50 26 V78" stroke="#0e8074" stroke-width="3"/>`,
    treasure: `<rect x="22" y="46" width="56" height="34" rx="6" fill="#c65f2e"/>
      <path d="M22 46 Q22 34 50 34 Q78 34 78 46 Z" fill="#e0a92e"/>
      <rect x="44" y="52" width="12" height="14" rx="2" fill="#ffce3d"/>`,
    map: `<path d="M20 26 L40 34 L60 26 L80 34 V76 L60 68 L40 76 L20 68 Z" fill="#fff3d6" stroke="#c65f2e" stroke-width="3"/>
      <path d="M40 34 V76 M60 26 V68" stroke="#c65f2e" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M62 50 l6 6 m0 -6 l-6 6" stroke="#ff7a66" stroke-width="4"/>`,
    castle: `<rect x="24" y="44" width="52" height="40" fill="#a68bff"/>
      <rect x="18" y="34" width="12" height="50" fill="#8f74ff"/><rect x="70" y="34" width="12" height="50" fill="#8f74ff"/>
      <rect x="44" y="60" width="12" height="24" fill="#5a3fae"/>
      <path d="M18 34h12v-8h-4v4h-4v-4h-4z M70 34h12v-8h-4v4h-4v-4h-4z" fill="#8f74ff"/>`
  };

  // Word → icon key mapping (falls back to a monogram tile).
  const MAP = {
    car:'car', star:'star', farm:'farm', park:'park', bird:'bird', girl:'girl',
    nurse:'nurse', doctor:'doctor', teacher:'teacher', tractor:'tractor',
    jar:'jar', card:'card', garden:'garden', shirt:'shirt', arm:'arm',
    summer:'sun', winter:'snow', book:'book', treasure:'treasure', map:'map', castle:'castle'
  };

  function monogram(label) {
    const colors = ['#4aa8ff','#17b3a3','#a68bff','#ff7a66','#6fbf59','#f2a03d'];
    let h = 0; for (const c of label) h = (h + c.charCodeAt(0)) % colors.length;
    const bg = colors[h], initial = (label[0] || '?').toUpperCase();
    return `<rect x="14" y="14" width="72" height="72" rx="18" fill="${bg}" opacity="0.18"/>
      <rect x="22" y="22" width="56" height="56" rx="14" fill="${bg}"/>
      <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
        font-family="Trebuchet MS, sans-serif" font-weight="900" font-size="34" fill="#fff">${initial}</text>`;
  }

  const BEM = (window.BEM = window.BEM || {});
  BEM.art = {
    /** Return a full SVG string for a word or icon key. */
    svg(nameOrWord, cls) {
      const key = MAP[nameOrWord] || (ICONS[nameOrWord] ? nameOrWord : null);
      const inner = key ? ICONS[key] : monogram(String(nameOrWord || '?'));
      return `<svg viewBox="0 0 100 100" role="img" aria-label="${escapeAttr(nameOrWord)}" class="${cls||''}"
        xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
    },
    has(name) { return !!(MAP[name] || ICONS[name]); }
  };

  function escapeAttr(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
})();
