/* =====================================================================
   BEM.profiles — up to 5 local learner profiles.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const MAX = 5;

  // Original abstract avatar characters (SVG), no copyrighted characters.
  const AVATARS = {
    sky:      { c1:"#4aa8ff", c2:"#a68bff", face:"star" },
    teal:     { c1:"#17b3a3", c2:"#6fe0b0", face:"leaf" },
    coral:    { c1:"#ff7a66", c2:"#ffce3d", face:"sun"  },
    lavender: { c1:"#a68bff", c2:"#4aa8ff", face:"moon" },
    mint:     { c1:"#6fe0b0", c2:"#17b3a3", face:"bird" }
  };

  function avatarSVG(key) {
    const a = AVATARS[key] || AVATARS.sky;
    const faces = {
      star: '<path d="M50 34 L54 45 L66 45 L56 52 L60 63 L50 56 L40 63 L44 52 L34 45 L46 45 Z" fill="#fff"/>',
      leaf: '<path d="M50 34 Q66 42 50 66 Q34 42 50 34 Z" fill="#fff"/>',
      sun:  '<circle cx="50" cy="50" r="12" fill="#fff"/>',
      moon: '<path d="M56 38 A14 14 0 1 0 56 62 A11 11 0 1 1 56 38 Z" fill="#fff"/>',
      bird: '<circle cx="50" cy="50" r="11" fill="#fff"/><path d="M60 46 l8 -2 -6 6 Z" fill="#fff"/>'
    };
    return `<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><linearGradient id="g-${key}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a.c1}"/><stop offset="1" stop-color="${a.c2}"/></linearGradient></defs>
      <circle cx="50" cy="50" r="50" fill="url(#g-${key})"/>${faces[a.face] || faces.star}</svg>`;
  }

  BEM.profiles = {
    AVATARS,
    avatarKeys() { return Object.keys(AVATARS); },
    avatarSVG,
    all() { return Object.values(BEM.storage.get().profiles); },
    count() { return this.all().length; },
    max: MAX,

    active() {
      const s = BEM.storage.get();
      return s.activeProfile ? s.profiles[s.activeProfile] : null;
    },

    setActive(id) {
      BEM.storage.update(s => {
        if (s.profiles[id]) { s.activeProfile = id; s.profiles[id].lastActive = Date.now(); }
      });
    },

    create(name, avatar) {
      if (this.count() >= MAX) return { error: "You can store up to " + MAX + " learner profiles on this device." };
      const p = BEM.storage.freshProfile(name, avatar);
      BEM.storage.update(s => { s.profiles[p.id] = p; s.activeProfile = p.id; });
      return { profile: p };
    },

    rename(id, name) { BEM.storage.update(s => { if (s.profiles[id]) s.profiles[id].name = name; }); },
    setAvatar(id, avatar) { BEM.storage.update(s => { if (s.profiles[id]) s.profiles[id].avatar = avatar; }); },
    remove(id) {
      BEM.storage.update(s => {
        delete s.profiles[id];
        if (s.activeProfile === id) s.activeProfile = Object.keys(s.profiles)[0] || null;
      });
    },

    /** Persist a mutation on the active profile. */
    updateActive(fn) {
      BEM.storage.update(s => {
        const p = s.profiles[s.activeProfile];
        if (p) { fn(p); p.lastActive = Date.now(); }
      });
    }
  };
})();
