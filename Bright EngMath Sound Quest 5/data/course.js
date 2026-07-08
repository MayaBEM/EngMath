/* =====================================================================
   BEM course metadata, adventure map, badges, achievement levels.
   Content data is kept separate from interface logic.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  BEM.units = BEM.units || {};

  // Register a unit data object (called by each data/unit-N.js file).
  BEM.registerUnit = function (n, data) { BEM.units[n] = data; };

  BEM.course = {
    id: "bright-engmath-sound-quest-5",
    title: "Bright EngMath Sound Quest 5",
    subtitle: "Advanced Phonics, Reading, Vocabulary, Games, and Assessment",
    brand: "Bright EngMath",
    version: 1,

    // The adventure map — main learning path in order.
    map: [
      { key: "unit-1",   type: "unit",   n: 1, title: "Star Farm",       theme: "Star Farm",      color: "var(--u1)", art: "star" },
      { key: "unit-2",   type: "unit",   n: 2, title: "Toy Town",        theme: "Toy Town",       color: "var(--u2)", art: "car" },
      { key: "review-1", type: "review", n: 1, title: "Review Zone 1",   theme: "Units 1–2",      color: "var(--c-teal)", art: "star" },
      { key: "unit-3",   type: "unit",   n: 3, title: "Sunny Shore",     theme: "Sunny Shore",    color: "var(--u3)", art: "sun" },
      { key: "unit-4",   type: "unit",   n: 4, title: "Forest Fair",     theme: "Forest Fair",    color: "var(--u4)", art: "park" },
      { key: "review-2", type: "review", n: 2, title: "Review Zone 2",   theme: "Units 3–4",      color: "var(--c-teal)", art: "book" },
      { key: "unit-5",   type: "unit",   n: 5, title: "Music City",      theme: "Music City",     color: "var(--u5)", art: "card" },
      { key: "unit-6",   type: "unit",   n: 6, title: "Jungle Camp",     theme: "Jungle Camp",    color: "var(--u6)", art: "park" },
      { key: "review-3", type: "review", n: 3, title: "Review Zone 3",   theme: "Units 5–6",      color: "var(--c-teal)", art: "book" },
      { key: "unit-7",   type: "unit",   n: 7, title: "Mystery Castle",  theme: "Mystery Castle", color: "var(--u7)", art: "castle" },
      { key: "unit-8",   type: "unit",   n: 8, title: "Treasure Island", theme: "Treasure Island",color: "var(--u8)", art: "treasure" },
      { key: "review-4", type: "review", n: 4, title: "Review Zone 4",   theme: "Units 7–8",      color: "var(--c-teal)", art: "book" },
      { key: "final",    type: "final",  n: 0, title: "Sound Master Tower", theme: "Final Challenge", color: "var(--c-navy)", art: "castle" }
    ],

    // Achievement levels for unit challenges (percentage based).
    unitLevels: [
      { min: 90, name: "Sound Master",            stars: 3 },
      { min: 75, name: "Phonics Explorer",        stars: 2 },
      { min: 60, name: "Growing Reader",          stars: 1 },
      { min: 0,  name: "Ready to Practise Again", stars: 0 }
    ],

    // Final challenge levels (raw score out of 50).
    finalLevels: [
      { min: 46, name: "Bright EngMath Sound Champion" },
      { min: 40, name: "Advanced Phonics Star" },
      { min: 30, name: "Confident Sound Explorer" },
      { min: 0,  name: "Keep Building Your Sound Power" }
    ],

    // Badge catalogue — original names + art concepts.
    badges: [
      { id: "unit-1", name: "Star Farm Star",      art: "star",     desc: "Finish Unit 1", kind: "unit" },
      { id: "unit-2", name: "Toy Town Trophy",     art: "car",      desc: "Finish Unit 2", kind: "unit" },
      { id: "unit-3", name: "Sunny Shore Shell",   art: "sun",      desc: "Finish Unit 3", kind: "unit" },
      { id: "unit-4", name: "Forest Fair Leaf",    art: "park",     desc: "Finish Unit 4", kind: "unit" },
      { id: "unit-5", name: "Music City Note",     art: "card",     desc: "Finish Unit 5", kind: "unit" },
      { id: "unit-6", name: "Jungle Camp Compass", art: "map",      desc: "Finish Unit 6", kind: "unit" },
      { id: "unit-7", name: "Castle Key",          art: "castle",   desc: "Finish Unit 7", kind: "unit" },
      { id: "unit-8", name: "Treasure Gem",        art: "treasure", desc: "Finish Unit 8", kind: "unit" },
      { id: "review-1", name: "Review Racer 1", art: "star", desc: "Clear Review Zone 1", kind: "review" },
      { id: "review-2", name: "Review Racer 2", art: "book", desc: "Clear Review Zone 2", kind: "review" },
      { id: "review-3", name: "Review Racer 3", art: "book", desc: "Clear Review Zone 3", kind: "review" },
      { id: "review-4", name: "Review Racer 4", art: "book", desc: "Clear Review Zone 4", kind: "review" },
      { id: "story-reader",    name: "Story Reader",        art: "book",     desc: "Read a full phonics story", kind: "special" },
      { id: "vocab-collector", name: "Vocabulary Collector",art: "jar",      desc: "Favourite 10 words", kind: "special" },
      { id: "perfect-listen",  name: "Perfect Listening",   art: "bird",     desc: "Score full marks on a listening round", kind: "special" },
      { id: "final-champion",  name: "Final Sound Champion",art: "treasure", desc: "Complete the Final Challenge", kind: "special" }
    ],

    credit: "Created by Bright EngMath",
    copyright: "© Bright EngMath. All rights reserved.",

    unitLevelFor(pct) { return this.unitLevels.find(l => pct >= l.min); },
    finalLevelFor(score) { return this.finalLevels.find(l => score >= l.min); },
    badge(id) { return this.badges.find(b => b.id === id); }
  };
})();
