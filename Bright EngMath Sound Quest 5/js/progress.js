/* =====================================================================
   BEM.progress — completion, scores, stars, badges, mistakes, unlocks.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  function P() { return BEM.profiles.active(); }

  function unitState(n) {
    const p = P(); if (!p) return null;
    if (!p.units[n]) {
      p.units[n] = { completed: false, sections: {}, activityScores: {}, challenge: null, mistakes: [], storyPage: 0, storyDone: false };
    }
    return p.units[n];
  }

  const progress = {
    /* ---- section / lesson completion ---- */
    markSection(n, key) {
      BEM.profiles.updateActive(p => {
        const u = p.units[n] || (p.units[n] = { completed:false, sections:{}, activityScores:{}, challenge:null, mistakes:[], storyPage:0, storyDone:false });
        u.sections[key] = true;
      });
    },
    sectionDone(n, key) { const p = P(); return !!(p && p.units[n] && p.units[n].sections[key]); },

    /* ---- activity scores ---- */
    recordActivity(n, type, score, total) {
      BEM.profiles.updateActive(p => {
        const u = p.units[n] || (p.units[n] = { completed:false, sections:{}, activityScores:{}, challenge:null, mistakes:[], storyPage:0, storyDone:false });
        const prev = u.activityScores[type];
        if (!prev || score / total >= prev.score / prev.total) u.activityScores[type] = { score, total };
      });
      if (total > 0) this.addStars(Math.round((score / total) * 2));
    },

    /* ---- story ---- */
    setStoryPage(n, page) { BEM.profiles.updateActive(p => { const u = p.units[n]; if (u) u.storyPage = page; }); },
    markStoryDone(n) {
      BEM.profiles.updateActive(p => { const u = p.units[n]; if (u) u.storyDone = true; });
      this.earnBadge("story-reader");
    },

    /* ---- challenge results ---- */
    recordChallenge(n, result) {
      // result: { score, total, pct, byPattern:{pat:{correct,total}}, mistakes:[] }
      BEM.profiles.updateActive(p => {
        const u = p.units[n] || (p.units[n] = { completed:false, sections:{}, activityScores:{}, challenge:null, mistakes:[], storyPage:0, storyDone:false });
        const attempts = (u.challenge ? u.challenge.attempts : 0) + 1;
        const best = !u.challenge || result.pct >= u.challenge.pct ? result : u.challenge;
        u.challenge = Object.assign({}, best, { attempts });
        u.mistakes = result.mistakes || [];
        if (result.pct >= 60) u.completed = true;
      });
      const level = BEM.course.unitLevelFor(result.pct);
      this.addStars(level.stars * 2);
      if (result.pct >= 60) this.earnBadge("unit-" + n);
      // Perfect listening badge
      const lp = result.byPattern && result.byPattern.__listening;
      if (lp && lp.total > 0 && lp.correct === lp.total) this.earnBadge("perfect-listen");
    },

    /* ---- mistakes ---- */
    addMistake(n, m) { BEM.profiles.updateActive(p => { const u = unitStateFor(p, n); u.mistakes.push(m); }); },
    getMistakes(n) { const p = P(); return (p && p.units[n] && p.units[n].mistakes) || []; },
    clearMistakes(n) { BEM.profiles.updateActive(p => { if (p.units[n]) p.units[n].mistakes = []; }); },

    /* ---- stars ---- */
    addStars(k) { if (k > 0) BEM.profiles.updateActive(p => { p.stars = (p.stars || 0) + k; }); },
    stars() { const p = P(); return (p && p.stars) || 0; },

    /* ---- badges ---- */
    earnBadge(id) {
      const p = P(); if (!p) return false;
      if (p.badges.includes(id)) return false;
      BEM.profiles.updateActive(pp => { pp.badges.push(id); });
      const b = BEM.course.badge(id);
      if (b) BEM.toast && BEM.toast("🏅 Badge earned: " + b.name, 2600, true);
      return true;
    },
    hasBadge(id) { const p = P(); return !!(p && p.badges.includes(id)); },

    /* ---- favourites ---- */
    toggleFavorite(word) {
      let on = false;
      BEM.profiles.updateActive(p => {
        const i = p.favorites.indexOf(word);
        if (i >= 0) p.favorites.splice(i, 1); else { p.favorites.push(word); on = true; }
      });
      const p = P();
      if (p && p.favorites.length >= 10) this.earnBadge("vocab-collector");
      return on;
    },
    isFavorite(word) { const p = P(); return !!(p && p.favorites.includes(word)); },
    favorites() { const p = P(); return (p && p.favorites) || []; },

    /* ---- completion + unlocks ---- */
    isUnitComplete(n) { const p = P(); return !!(p && p.units[n] && p.units[n].completed); },

    unitAuthored(n) { return !!BEM.units[n]; },

    isAvailable(item) {
      if (item.type === "unit") return this.unitAuthored(item.n);
      if (item.type === "review") return !!(BEM.reviews && BEM.reviews[item.n]);
      if (item.type === "final") return !!BEM.final;
      return false;
    },

    isUnlocked(item) {
      if (!this.isAvailable(item)) return false;
      const s = BEM.storage.settings();
      if (!s.sequentialLock) return true;
      const map = BEM.course.map;
      const idx = map.findIndex(m => m.key === item.key);
      if (idx <= 0) return true;
      // Unlocked when the previous *unit* in the path is complete.
      for (let i = idx - 1; i >= 0; i--) {
        if (map[i].type === "unit") return this.isUnitComplete(map[i].n);
      }
      return true;
    },

    /* ---- pattern mastery across authored units ---- */
    patternMastery() {
      const p = P(); const out = {};
      if (!p) return out;
      Object.keys(p.units).forEach(n => {
        const c = p.units[n] && p.units[n].challenge;
        if (c && c.byPattern) {
          Object.keys(c.byPattern).forEach(pat => {
            if (pat.startsWith("__") || pat === "") return;
            const bp = c.byPattern[pat];
            out[pat] = out[pat] || { correct: 0, total: 0 };
            out[pat].correct += bp.correct; out[pat].total += bp.total;
          });
        }
      });
      return out;
    },

    overallCompletion() {
      const total = 8; // units in the full course
      let done = 0;
      for (let n = 1; n <= 8; n++) if (this.isUnitComplete(n)) done++;
      return Math.round((done / total) * 100);
    },

    completedUnits() { let a = []; for (let n = 1; n <= 8; n++) if (this.isUnitComplete(n)) a.push(n); return a; },

    currentUnit() {
      for (const item of BEM.course.map) {
        if (item.type === "unit" && this.unitAuthored(item.n) && !this.isUnitComplete(item.n)) return item.n;
      }
      return null;
    }
  };

  function unitStateFor(p, n) {
    return p.units[n] || (p.units[n] = { completed:false, sections:{}, activityScores:{}, challenge:null, mistakes:[], storyPage:0, storyDone:false });
  }

  BEM.progress = progress;
})();
