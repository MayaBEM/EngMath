/* =====================================================================
   BEM.storage — versioned localStorage wrapper.
   NOTE: This is local, per-browser, per-device storage. It is NOT a
   secure cloud account. Progress lives only in this browser.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  const KEY = "bem-sq5";        // base key
  const VERSION = 1;            // bump when the data shape changes
  const FULL_KEY = KEY + "-v" + VERSION;

  const DEFAULT_SETTINGS = {
    sequentialLock: true,   // lock units until the previous is done
    definitions: true,      // show English definitions
    hints: true,            // allow a second attempt + hints
    soundEffects: true,     // star / success chimes (visual + speech)
    speech: true,           // browser speech synthesis on
    presentation: false,    // presentation (projector) mode
    quickQuizLength: 10,     // Quick Quiz length
    teacherName: ""
  };

  function freshState() {
    return {
      version: VERSION,
      activeProfile: null,
      settings: Object.assign({}, DEFAULT_SETTINGS),
      profiles: {}
    };
  }

  function freshProfile(name, avatar) {
    return {
      id: "p" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      name: name || "Learner",
      avatar: avatar || "sky",
      created: Date.now(),
      lastActive: Date.now(),
      stars: 0,
      badges: [],
      favorites: [],
      units: {},     // { "1": { completed, sections:{}, activityScores:{}, challenge:{best,attempts,byPattern}, mistakes:[], storyPage } }
      reviews: {},   // { "1": {best, attempts} }
      final: { missions: {}, mistakes: [] },
      certificate: null
    };
  }

  let state = null;

  function load() {
    try {
      const raw = localStorage.getItem(FULL_KEY);
      if (raw) { state = JSON.parse(raw); }
    } catch (e) { console.warn("Storage read failed:", e); }

    if (!state || typeof state !== "object") {
      // Attempt migration from an older version key, else start fresh.
      state = migrateOrFresh();
    }
    // Ensure settings keys exist (forward-compatible defaults).
    state.settings = Object.assign({}, DEFAULT_SETTINGS, state.settings || {});
    if (!state.profiles) state.profiles = {};
    return state;
  }

  function migrateOrFresh() {
    for (let v = VERSION - 1; v >= 1; v--) {
      try {
        const old = localStorage.getItem(KEY + "-v" + v);
        if (old) {
          const parsed = JSON.parse(old);
          parsed.version = VERSION;
          return parsed; // shallow migration; add field mapping here if shape changes
        }
      } catch (e) { /* ignore and continue */ }
    }
    return freshState();
  }

  function save() {
    try { localStorage.setItem(FULL_KEY, JSON.stringify(state)); }
    catch (e) { console.warn("Storage write failed:", e); BEM.toast && BEM.toast("Could not save progress on this device."); }
  }

  BEM.storage = {
    KEY: FULL_KEY,
    DEFAULT_SETTINGS,
    get() { return state || load(); },
    load,
    save,
    /** Mutate state safely and persist. */
    update(fn) { const s = this.get(); fn(s); save(); return s; },
    settings() { return this.get().settings; },
    setSetting(k, v) { this.update(s => { s.settings[k] = v; }); },
    freshProfile,
    resetAll() { state = freshState(); save(); },
    /** Remove stored data entirely (for a hard reset). */
    wipe() { try { localStorage.removeItem(FULL_KEY); } catch (e) {} state = freshState(); save(); }
  };

  load();
})();
