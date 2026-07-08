/* =====================================================================
   BEM.activities — reusable interactive activity engine.
   Renders 10 activity types in short rounds with a supportive
   two-attempt feedback system. Touch-, mouse- and keyboard-friendly.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear, esc, hi, shuffle } = BEM.util;

  const CORRECT = ["Great listening!", "Excellent reading!", "You found the pattern!", "Brilliant work!", "Well done!"];
  const HINTS = ["Look at the highlighted letters.", "Listen one more time.", "Try the middle sound again.", "Check the word ending."];
  const rand = a => a[Math.floor(Math.random() * a.length)];
  const hintsOn = () => BEM.storage.settings().hints !== false;

  // Which activity types belong to Guided Practice vs the Game Zone.
  const PRACTICE = new Set(["mcq", "complete", "tapword", "truefalse"]);
  const GAMES = new Set(["build", "sort", "odd", "picture-mcq", "memory", "sentence"]);

  /* ---------- group menu (practice / games) ---------- */
  function mountGroup(container, n, group) {
    clear(container);
    const unit = BEM.units[n];
    const set = group === "practice" ? PRACTICE : GAMES;
    const list = unit.activities.filter(a => set.has(a.type));
    const title = group === "practice" ? "Guided Practice" : "Interactive Game Zone";

    container.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, title),
      h("h1", {}, title === "Guided Practice" ? "Practise the Sounds" : "Play and Learn"),
      h("p", { class: "text-soft" }, "Choose a game. Each one is a short round — you can replay any time.")
    ]));

    const grid = h("div", { class: "grid grid-2" });
    list.forEach((a, i) => {
      const score = (BEM.progress && BEM.units[n]) ? null : null;
      grid.append(h("div", { class: "card card-pad-sm" }, [
        h("h3", {}, a.title),
        h("p", { class: "text-soft", text: a.instruction }),
        h("button", { class: "btn btn-primary", onclick: () => runActivity(container, n, a, group) }, "Play ▶")
      ]));
    });
    container.append(grid);
    BEM.progress.markSection(n, group === "practice" ? "practice" : "games");
  }

  /* ---------- run a single activity ---------- */
  function runActivity(container, n, activity, group) {
    clear(container);
    const backBtn = h("button", { class: "btn btn-ghost btn-sm no-print", onclick: () => mountGroup(container, n, group) }, "◀ All games");
    const wrap = h("section", { class: "activity" });
    container.append(backBtn, wrap);

    if (activity.type === "memory") return runMemory(wrap, n, activity);
    if (activity.type === "sort") return runSort(wrap, n, activity);

    // iterate items in a round
    const items = shuffle(activity.items).slice(0, activity.roundSize || activity.items.length);
    let idx = 0, score = 0;
    const head = h("div", { class: "activity-head" }, [
      h("div", { class: "activity-title", text: activity.title }),
      h("div", { class: "round-meta" }, [ h("span", { id: "rm-pos" }), " · ", h("span", { class: "streak", id: "rm-score" }) ])
    ]);
    const card = h("div", { class: "card" });
    wrap.append(head, card);

    function updateMeta() {
      head.querySelector("#rm-pos").textContent = "Question " + (idx + 1) + " of " + items.length;
      head.querySelector("#rm-score").textContent = "★ " + score;
    }

    function next(correct) {
      if (correct) score++;
      idx++;
      if (idx >= items.length) return finish();
      renderItem();
    }

    function renderItem() {
      clear(card);
      updateMeta();
      const item = items[idx];
      card.append(h("p", { class: "q-sub", text: activity.instruction }));
      const R = renderers[activity.type];
      R(card, item, { onResult: next });
    }

    function finish() {
      clear(card);
      const pct = Math.round((score / items.length) * 100);
      BEM.progress.recordActivity(n, activity.type + "-" + activity.title, score, items.length);
      card.append(h("div", { class: "round-done" }, [
        h("div", { class: "big", text: score + " / " + items.length }),
        h("p", {}, pct >= 80 ? "Superb! You are a sound star." : pct >= 50 ? "Nice work — keep practising!" : "Good try! Play again to grow stronger."),
        h("div", { class: "stars", "aria-label": "stars", text: "★".repeat(Math.max(1, Math.round(pct / 34))) }),
        h("div", { class: "row mt-4", style: "justify-content:center;" }, [
          h("button", { class: "btn btn-primary", onclick: () => runActivity(container, n, activity, group) }, "Play again"),
          h("button", { class: "btn btn-ghost", onclick: () => mountGroup(container, n, group) }, "Back to games")
        ])
      ]));
    }

    renderItem();
  }

  /* ---------- shared MCQ mechanic (2 attempts) ---------- */
  function mcqCore(card, choices, answer, opts) {
    // opts: { onResult, explain, pattern, correctText, renderChoice(choice)->node/html, gridClass }
    let attempt = 0;
    const opt = h("div", { class: "options " + (opts.gridClass || "") });
    const fb = h("div");
    choices.forEach((c, i) => {
      const content = opts.renderChoice ? opts.renderChoice(c) : esc(c);
      const b = h("button", { class: "opt" + (opts.picture ? " opt-pic" : ""), type: "button", html: content, "aria-label": opts.ariaLabel ? opts.ariaLabel(c) : String(c) });
      b.addEventListener("click", () => choose(i, b));
      opt.append(b);
    });
    card.append(opt, fb);

    function lockAll() { [...opt.children].forEach(x => x.disabled = true); }

    function choose(i, btn) {
      if (i === answer) {
        lockAll(); btn.classList.add("correct"); BEM.burst(btn);
        showFB(true, opts.correctText || rand(CORRECT), "");
        setTimeout(() => opts.onResult(true), 60);
        return;
      }
      // wrong
      btn.classList.add("wrong");
      if (attempt === 0 && hintsOn()) {
        attempt = 1; btn.disabled = true;
        showFB(false, rand(HINTS), "Try once more.");
        return;
      }
      lockAll();
      opt.children[answer].classList.add("reveal");
      showFB(false, "The answer is highlighted.", opts.explain || "");
      const nextBtn = h("button", { class: "btn btn-primary mt-4", onclick: () => opts.onResult(false) }, "Next ▶");
      fb.append(nextBtn); nextBtn.focus();
    }

    function showFB(ok, msg, sub) {
      clear(fb);
      fb.append(h("div", { class: "feedback " + (ok ? "ok" : "no") }, [
        h("span", { class: "icon", "aria-hidden": "true", text: ok ? "🌟" : "💡" }),
        h("div", {}, [ h("span", { text: msg }), sub ? h("small", { text: sub }) : null ])
      ]));
    }
  }

  /* ---------- renderers ---------- */
  const renderers = {
    mcq(card, item, ctx) {
      card.append(h("div", { class: "q-prompt", html: item.prompt || "Which word do you hear?" }));
      if (item.speak) card.append(BEM.audio.controls(item.speak, { slow: true }));
      mcqCore(card, item.choices, item.answer, {
        onResult: ctx.onResult, explain: item.explain, pattern: item.pattern,
        gridClass: item.choices.length <= 3 ? "cols-2" : ""
      });
    },

    complete(card, item, ctx) {
      card.append(h("div", { class: "q-prompt center" }, [
        h("span", { html: "Complete: " }),
        h("span", { class: "word-lg", html: esc(item.display).replace(/__/g, '<span class="gr">＿</span>') })
      ]));
      if (item.speak) card.append(BEM.audio.controls(item.speak, { slow: true }));
      mcqCore(card, item.choices, item.answer, {
        onResult: ctx.onResult, explain: item.explain,
        renderChoice: c => esc(c), gridClass: "cols-2"
      });
    },

    truefalse(card, item, ctx) {
      card.append(h("div", { class: "q-prompt", text: item.statement }));
      if (item.speak) card.append(BEM.audio.controls(item.statement, { slow: true }));
      const ansIndex = item.answer ? 0 : 1;
      mcqCore(card, ["True", "False"], ansIndex, { onResult: ctx.onResult, explain: item.explain, gridClass: "cols-2" });
    },

    odd(card, item, ctx) {
      card.append(h("div", { class: "q-prompt" }, "Which word has a different vowel sound?"));
      card.append(BEM.audio.controls(item.choices.join(", "), { slow: true }));
      mcqCore(card, item.choices, item.answer, { onResult: ctx.onResult, explain: item.explain, gridClass: "cols-2" });
    },

    "picture-mcq"(card, item, ctx) {
      card.append(h("div", { class: "q-prompt center" }, [ h("span", { class: "word-lg", text: item.prompt }) ]));
      if (item.speak) card.append(BEM.audio.controls(item.speak, { slow: true }));
      const answerKey = item.choices[item.answer];
      const order = shuffle(item.choices.map((c, i) => ({ c, i })));
      const ansPos = order.findIndex(o => o.i === item.answer);
      mcqCore(card, order.map(o => o.c), ansPos, {
        onResult: ctx.onResult, explain: item.explain, picture: true,
        ariaLabel: c => "Picture of " + c,
        renderChoice: c => '<span class="pic" aria-hidden="true">' + BEM.art.svg(c) + "</span>"
      });
    },

    tapword(card, item, ctx) {
      card.append(h("div", { class: "q-prompt", html: item.hint }));
      const sent = h("p", { class: "tap-sentence" });
      let attempt = 0;
      item.tokens.forEach((tok, i) => {
        const isTarget = item.targets.includes(i);
        const span = h("span", { class: "tap-word", tabindex: "0", role: "button", text: tok });
        const act = () => {
          if (span.classList.contains("hit") || span.classList.contains("miss")) return;
          if (isTarget) { span.classList.add("hit"); BEM.burst(span); done(true); }
          else {
            span.classList.add("miss");
            if (attempt === 0 && hintsOn()) { attempt = 1; setTimeout(() => span.classList.remove("miss"), 700); note("Not that one — read it again."); }
            else { item.targets.forEach(t => sent.children[t].classList.add("hit")); done(false); }
          }
        };
        span.addEventListener("click", act);
        span.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
        sent.append(span, document.createTextNode(" "));
      });
      const fb = h("div");
      card.append(sent, BEM.audio.controls(item.tokens.join(" "), { slow: true }), fb);
      function note(msg) { clear(fb); fb.append(h("div", { class: "feedback no" }, [h("span", { class: "icon" }, "💡"), h("span", { text: msg })])); }
      function done(ok) {
        clear(fb);
        fb.append(h("div", { class: "feedback " + (ok ? "ok" : "no") }, [ h("span", { class: "icon" }, ok ? "🌟" : "💡"), h("span", { text: ok ? rand(CORRECT) : "The correct word is highlighted." }) ]));
        const b = h("button", { class: "btn btn-primary mt-4", onclick: () => ctx.onResult(ok) }, "Next ▶");
        fb.append(b); b.focus();
      }
    },

    build(card, item, ctx) {
      card.append(h("div", { class: "q-prompt center" }, "Build the word you hear."));
      card.append(BEM.audio.controls(item.speak, { slow: true }));
      const slot = h("div", { class: "build-slot", "aria-label": "Your word" });
      const tray = h("div", { class: "tiles" });
      const placed = [];
      const tiles = shuffle(item.tiles);
      const fb = h("div");
      tiles.forEach((t, i) => {
        const b = h("button", { class: "tile", type: "button", text: t });
        b.addEventListener("click", () => { if (b.classList.contains("used")) return; b.classList.add("used"); placed.push({ t, b }); redraw(); });
        tray.append(b);
      });
      card.append(h("p", { class: "center text-soft" }, "Tap the tiles in order:"), slot, tray, fb);
      const controls = h("div", { class: "row mt-4", style: "justify-content:center;" }, [
        h("button", { class: "btn btn-ghost btn-sm", onclick: () => { placed.forEach(p => p.b.classList.remove("used")); placed.length = 0; redraw(); } }, "↺ Reset"),
        h("button", { class: "btn btn-primary", onclick: check } , "Check ✓")
      ]);
      card.append(controls);

      function redraw() {
        clear(slot);
        if (!placed.length) { slot.append(h("span", { class: "text-soft" }, "…")); return; }
        placed.forEach(p => { const t = h("button", { class: "tile", text: p.t, onclick: () => { p.b.classList.remove("used"); placed.splice(placed.indexOf(p), 1); redraw(); } }); slot.append(t); });
      }
      redraw();

      let attempt = 0;
      function check() {
        const made = placed.map(p => p.t).join("");
        const target = item.answer.join("");
        clear(fb);
        if (made === target) {
          BEM.burst(controls); fb.append(h("div", { class: "feedback ok" }, [h("span", { class: "icon" }, "🌟"), h("span", {}, rand(CORRECT) + " " + item.word)]));
          const b = h("button", { class: "btn btn-primary mt-4", onclick: () => ctx.onResult(true) }, "Next ▶"); fb.append(b); b.focus();
        } else if (attempt === 0 && hintsOn()) {
          attempt = 1; fb.append(h("div", { class: "feedback no" }, [h("span", { class: "icon" }, "💡"), h("div", {}, [h("span", {}, "Not yet — listen again and check the order."), h("small", {}, "Tip: the word starts with “" + item.answer[0] + "”.")])]));
        } else {
          fb.append(h("div", { class: "feedback no" }, [h("span", { class: "icon" }, "💡"), h("div", {}, [h("span", {}, "The word is:"), h("small", { class: "word-lg", html: hi(item.word, item.pattern) })])]));
          const b = h("button", { class: "btn btn-primary mt-4", onclick: () => ctx.onResult(false) }, "Next ▶"); fb.append(b); b.focus();
        }
      }
    },

    sentence(card, item, ctx) {
      card.append(h("div", { class: "q-prompt" }, "Put the words in order to make a sentence."));
      card.append(BEM.audio.controls(item.speak, { slow: true }));
      const target = h("div", { class: "sent-target", "aria-label": "Your sentence" });
      const tray = h("div", { class: "row", style: "justify-content:center;" });
      const chosen = [];
      const words = shuffle(item.words);
      const fb = h("div");
      words.forEach(w => {
        const chip = h("button", { class: "word-chip", type: "button", text: w });
        chip.addEventListener("click", () => { if (chip.disabled) return; chip.disabled = true; chip.style.opacity = ".4"; chosen.push({ w, chip }); redraw(); });
        tray.append(chip);
      });
      card.append(target, h("p", { class: "center text-soft" }, "Word bank:"), tray, fb);
      const controls = h("div", { class: "row mt-4", style: "justify-content:center;" }, [
        h("button", { class: "btn btn-ghost btn-sm", onclick: () => { chosen.forEach(c => { c.chip.disabled = false; c.chip.style.opacity = "1"; }); chosen.length = 0; redraw(); } }, "↺ Reset"),
        h("button", { class: "btn btn-primary", onclick: check }, "Check ✓")
      ]);
      card.append(controls);
      function redraw() {
        clear(target);
        if (!chosen.length) { target.append(h("span", { class: "text-soft" }, "Tap words below…")); return; }
        chosen.forEach(c => target.append(h("button", { class: "word-chip", text: c.w, onclick: () => { c.chip.disabled = false; c.chip.style.opacity = "1"; chosen.splice(chosen.indexOf(c), 1); redraw(); } })));
      }
      redraw();
      let attempt = 0;
      function check() {
        clear(fb);
        const made = chosen.map(c => c.w).join(" ");
        const target2 = item.words.join(" ");
        if (made === target2) {
          BEM.burst(controls); fb.append(h("div", { class: "feedback ok" }, [h("span", { class: "icon" }, "🌟"), h("span", {}, rand(CORRECT))]));
          const b = h("button", { class: "btn btn-primary mt-4", onclick: () => ctx.onResult(true) }, "Next ▶"); fb.append(b); b.focus();
        } else if (attempt === 0 && hintsOn()) {
          attempt = 1; fb.append(h("div", { class: "feedback no" }, [h("span", { class: "icon" }, "💡"), h("span", {}, "Close! The first word is “" + item.words[0] + "”. Try again.")]));
        } else {
          fb.append(h("div", { class: "feedback no" }, [h("span", { class: "icon" }, "💡"), h("div", {}, [h("span", {}, "The sentence is:"), h("small", {}, target2)])]));
          const b = h("button", { class: "btn btn-primary mt-4", onclick: () => ctx.onResult(false) }, "Next ▶"); fb.append(b); b.focus();
        }
      }
    }
  };

  /* ---------- SORT (whole game) ---------- */
  function runSort(wrap, n, activity) {
    wrap.append(h("div", { class: "activity-head" }, [ h("div", { class: "activity-title", text: activity.title }) ]));
    const card = h("div", { class: "card" });
    wrap.append(card);
    card.append(h("p", { class: "q-sub", text: activity.instruction }));

    let selected = null;
    const tray = h("div", { class: "sort-tray" });
    const items = shuffle(activity.items);
    items.forEach(it => {
      const el = h("button", { class: "sort-item", type: "button", text: it.text, "aria-grabbed": "false", dataset: { col: it.col } });
      el.addEventListener("click", () => {
        [...tray.children].forEach(c => c.setAttribute("aria-grabbed", "false"));
        selected = selected === el ? null : el;
        if (selected) el.setAttribute("aria-grabbed", "true");
      });
      tray.append(el);
    });

    const cols = h("div", { class: "sort-cols" });
    const colEls = {};
    activity.columns.forEach(colName => {
      const box = h("div", { class: "sort-col", dataset: { col: colName } }, [ h("h4", { text: colName }) ]);
      box.addEventListener("click", () => { if (selected) place(selected, colName, box); });
      colEls[colName] = box; cols.append(box);
    });

    const fb = h("div");
    card.append(tray, cols, fb);
    let placedCount = 0;
    function place(el, colName, box) {
      const ok = el.dataset.col === colName;
      el.classList.add(ok ? "placed-ok" : "placed-no");
      el.setAttribute("aria-grabbed", "false");
      el.disabled = true;
      box.append(el);
      selected = null;
      placedCount++;
      if (placedCount === items.length) finish();
    }
    function finish() {
      const correct = items.filter(it => true).length; // recompute
      const got = [...card.querySelectorAll(".sort-item.placed-ok")].length;
      BEM.progress.recordActivity(n, "sort-" + activity.title, got, items.length);
      clear(fb);
      fb.append(h("div", { class: "round-done" }, [
        h("div", { class: "big", text: got + " / " + items.length }),
        h("p", {}, got === items.length ? "Perfect sorting!" : "Good effort — the green ones are correct."),
        h("button", { class: "btn btn-primary", onclick: () => { clear(wrap); runSort(wrap, n, activity); } }, "Play again")
      ]));
    }
  }

  /* ---------- MEMORY (whole game) ---------- */
  function runMemory(wrap, n, activity) {
    wrap.append(h("div", { class: "activity-head" }, [ h("div", { class: "activity-title", text: activity.title }) ]));
    const card = h("div", { class: "card" });
    wrap.append(card);
    card.append(h("p", { class: "q-sub", text: activity.instruction }));

    const deck = shuffle(activity.pairs.flatMap(p => [
      { id: p.id, face: "word", label: p.word },
      { id: p.id, face: "pic", art: p.art, label: p.word }
    ]));
    const grid = h("div", { class: "memory" });
    let first = null, lock = false, matched = 0, moves = 0;
    deck.forEach(cardData => {
      const btn = h("button", { class: "mcard", type: "button", "aria-label": "Hidden card" }, "?");
      btn._data = cardData;
      btn.addEventListener("click", () => flip(btn));
      grid.append(btn);
    });
    const fb = h("div");
    card.append(grid, fb);

    function reveal(btn) {
      btn.classList.add("flipped");
      btn.innerHTML = btn._data.face === "word" ? esc(btn._data.label) : BEM.art.svg(btn._data.art);
      btn.setAttribute("aria-label", btn._data.label);
    }
    function hide(btn) { btn.classList.remove("flipped"); btn.textContent = "?"; btn.setAttribute("aria-label", "Hidden card"); }

    function flip(btn) {
      if (lock || btn.classList.contains("flipped") || btn.classList.contains("matched")) return;
      reveal(btn);
      if (!first) { first = btn; return; }
      moves++;
      if (first._data.id === btn._data.id) {
        first.classList.add("matched"); btn.classList.add("matched");
        first.disabled = true; btn.disabled = true; BEM.burst(btn);
        first = null; matched++;
        if (matched === activity.pairs.length) finish();
      } else {
        lock = true;
        const a = first, b = btn; first = null;
        setTimeout(() => { hide(a); hide(b); lock = false; }, 850);
      }
    }
    function finish() {
      BEM.progress.recordActivity(n, "memory-" + activity.title, activity.pairs.length, activity.pairs.length);
      clear(fb);
      fb.append(h("div", { class: "round-done" }, [
        h("div", { class: "big", text: "All matched!" }),
        h("p", {}, "You finished in " + moves + " tries."),
        h("button", { class: "btn btn-primary", onclick: () => { clear(wrap); runMemory(wrap, n, activity); } }, "Play again")
      ]));
    }
  }

  BEM.activities = { mountGroup, runActivity, renderers };
})();
