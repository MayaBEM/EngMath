/* =====================================================================
   BEM.teacher — Teacher Mode (local passcode convenience feature).
   The passcode is NOT secure authentication; it only keeps young
   learners out of the settings. Default passcode: 1234.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear } = BEM.util;
  const DEFAULT_PASS = "1234";
  let unlocked = false; // session only

  function view(main) {
    if (!unlocked) return gate(main);
    render(main);
  }

  function gate(main) {
    const card = h("div", { class: "card cert-wrap" }, [
      h("div", { class: "eyebrow" }, "Teacher Mode"),
      h("h1", {}, "Enter passcode"),
      h("p", { class: "teacher-note" }, "This passcode is a local convenience feature to keep young learners out of settings. It is not secure authentication. Default passcode: 1234."),
    ]);
    const input = h("input", { type: "password", inputmode: "numeric", "aria-label": "Passcode", placeholder: "••••" });
    const go = () => {
      if (input.value === DEFAULT_PASS) { unlocked = true; render(main); }
      else BEM.toast("Incorrect passcode. The default is 1234.");
    };
    input.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    card.append(h("div", { class: "field mt-4" }, [ h("label", { for: "pc" }, "Passcode"), input ]),
      h("button", { class: "btn btn-primary", onclick: go }, "Unlock"));
    clear(main); main.append(card);
  }

  function render(main) {
    clear(main);
    const s = BEM.storage.settings();
    main.append(h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Teacher Mode"), h("h1", {}, "Teacher Tools") ]));

    // Active learner
    const p = BEM.profiles.active();
    main.append(section("Learner", [
      h("p", {}, p ? ("Active learner: ") : "No learner selected."),
      p ? h("div", { class: "field" }, [ h("label", {}, "Student name"),
        (() => { const i = h("input", { type: "text", value: p.name }); i.addEventListener("change", () => { BEM.profiles.rename(p.id, i.value); BEM.shell.refreshHeader(); }); return i; })() ]) : null,
      h("a", { class: "btn btn-sm btn-ghost", href: "#/profiles" }, "Select / add learner"),
      h("div", { class: "field mt-4" }, [ h("label", {}, "Teacher name (for certificates)"),
        (() => { const i = h("input", { type: "text", value: s.teacherName || "", placeholder: "e.g. Ms. Bright" }); i.addEventListener("change", () => BEM.storage.setSetting("teacherName", i.value)); return i; })() ])
    ]));

    // Access & locking
    main.append(section("Access & Lesson Flow", [
      toggle("Sequential locking (units unlock in order)", "sequentialLock"),
      row("Unlock all units now", h("button", { class: "btn btn-sm btn-accent", onclick: () => { BEM.storage.setSetting("sequentialLock", false); BEM.toast("All available units unlocked."); render(main); } }, "Unlock all")),
      row("Presentation Mode (big text for projection)", presentationToggle())
    ]));

    // Learning options
    main.append(section("Learning Options", [
      toggle("Show English definitions", "definitions"),
      toggle("Allow hints & second attempts", "hints"),
      toggle("Sound effects & star animations", "soundEffects"),
      toggle("Browser speech (read-aloud)", "speech"),
      toggle("Reveal answers immediately (demo mode)", "revealAnswers"),
      quickQuizField()
    ]));

    // Data & progress
    main.append(section("Progress & Data", [
      h("div", { class: "row" }, [
        h("a", { class: "btn btn-sm btn-primary", href: "#/progress" }, "View scores & mistakes"),
        h("button", { class: "btn btn-sm btn-ghost", onclick: () => window.print() }, "🖨 Print progress report")
      ]),
      h("hr"),
      resetControls(main)
    ]));

    main.append(h("div", { class: "row mt-5" }, [
      h("button", { class: "btn btn-ghost", onclick: () => { unlocked = false; BEM.go("#/"); } }, "Lock Teacher Mode")
    ]));
  }

  function section(title, kids) { return h("div", { class: "card teacher-section" }, [ h("h3", {}, title), ...kids.filter(Boolean) ]); }
  function row(label, control) { return h("div", { class: "switch-row" }, [ h("span", { text: label }), control ]); }

  function toggle(label, key) {
    const s = BEM.storage.settings();
    const input = h("input", { type: "checkbox" });
    input.checked = s[key] !== false && s[key] !== undefined ? !!s[key] : (key === "revealAnswers" ? false : !!s[key]);
    // normalise: revealAnswers default false, others per stored
    input.checked = key === "revealAnswers" ? !!s.revealAnswers : (s[key] !== false);
    input.addEventListener("change", () => {
      BEM.storage.setSetting(key, input.checked);
      if (key === "presentation") document.documentElement.classList.toggle("presentation", input.checked);
    });
    const lbl = h("label", { class: "toggle" }, [ input, h("span", { class: "track" }) ]);
    return row(label, lbl);
  }

  function presentationToggle() {
    const s = BEM.storage.settings();
    const input = h("input", { type: "checkbox" }); input.checked = !!s.presentation;
    input.addEventListener("change", () => { BEM.storage.setSetting("presentation", input.checked); document.documentElement.classList.toggle("presentation", input.checked); });
    return h("label", { class: "toggle" }, [ input, h("span", { class: "track" }) ]);
  }

  function quickQuizField() {
    const s = BEM.storage.settings();
    const sel = h("select", {});
    [5, 10, 15, 20].forEach(v => sel.append(h("option", { value: "" + v, selected: s.quickQuizLength === v ? "" : null }, v + " questions")));
    sel.value = "" + (s.quickQuizLength || 10);
    sel.addEventListener("change", () => BEM.storage.setSetting("quickQuizLength", parseInt(sel.value, 10)));
    return row("Quick Quiz length", sel);
  }

  function resetControls(main) {
    const unitSel = h("select", {});
    Object.keys(BEM.units).forEach(n => unitSel.append(h("option", { value: n }, "Unit " + n)));
    return h("div", {}, [
      h("div", { class: "switch-row" }, [
        h("span", {}, "Reset one unit's progress"),
        h("div", { class: "row" }, [ unitSel, h("button", { class: "btn btn-sm btn-ghost", onclick: () => {
          const n = unitSel.value; if (confirm("Reset all progress for Unit " + n + "?")) { BEM.profiles.updateActive(p => { delete p.units[n]; }); BEM.toast("Unit " + n + " reset."); }
        } }, "Reset unit") ])
      ]),
      h("div", { class: "switch-row" }, [
        h("span", {}, "Reset ALL progress for this learner"),
        h("button", { class: "btn btn-sm btn-warm", onclick: () => { if (confirm("Reset ALL progress (stars, badges, scores) for the active learner?")) { BEM.profiles.updateActive(p => { p.units = {}; p.reviews = {}; p.final = { missions: {}, mistakes: [] }; p.stars = 0; p.badges = []; p.favorites = []; p.certificate = null; }); BEM.toast("Learner progress reset."); render(main); } } }, "Reset learner")
      ])
    ]);
  }

  /* ---------- Unit teacher summary ---------- */
  function unitSummary(n) {
    const unit = BEM.units[n];
    const p = BEM.profiles.active();
    const u = p && p.units[n];
    const ch = u && u.challenge;
    const wrap = h("section", {}, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Teacher Summary"), h("h1", {}, unit.title + " — Teacher Summary") ]) ]);

    wrap.append(h("div", { class: "card" }, [
      h("h3", {}, "Skills covered"),
      h("p", {}, "Target patterns: " + unit.patternKeys.join(", ") + "."),
      h("ul", { class: "goals" }, unit.goals.map(g => h("li", { text: g }))),
      h("p", { class: "teacher-note" }, "Pronunciation notes: " + unit.patternCards.map(c => c.teacherNote).join(" "))
    ]));

    const scores = h("div", { class: "card" }, [ h("h3", {}, "This learner's results") ]);
    if (!ch) scores.append(h("p", { class: "text-soft" }, "No Unit Challenge attempt yet."));
    else {
      const level = BEM.course.unitLevelFor(ch.pct);
      scores.append(h("p", {}, "Unit Challenge: " + ch.score + "/" + ch.total + " (" + ch.pct + "%) — " + level.name + ". Attempts: " + ch.attempts + "."));
      if (ch.byPattern) {
        const t = h("table", { class: "teacher-table" }, [ h("tr", {}, [ h("th", {}, "Pattern"), h("th", {}, "Correct"), h("th", {}, "Total") ]) ]);
        Object.keys(ch.byPattern).filter(k => !k.startsWith("__") && k !== "other" && k !== "").forEach(k => {
          const b = ch.byPattern[k]; t.append(h("tr", {}, [ h("td", {}, k), h("td", {}, "" + b.correct), h("td", {}, "" + b.total) ]));
        });
        scores.append(t);
      }
    }
    if (u && u.comprehension) scores.append(h("p", {}, "Story comprehension: " + u.comprehension.score + "/" + u.comprehension.total + "."));
    const nextRec = !ch ? "Take the Unit Challenge." : ch.pct >= 75 ? "Ready to move on to the next unit." : "Revisit Guided Practice and Review My Mistakes, then retry the challenge.";
    scores.append(h("p", { class: "teacher-note" }, "Recommended next step: " + nextRec));
    wrap.append(scores);
    return wrap;
  }

  BEM.teacher = { view, unitSummary, DEFAULT_PASS };
})();
