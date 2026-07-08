/* =====================================================================
   BEM.quiz — unit challenge, story comprehension, mistakes review.
   All questions are validated before rendering (see data validation).
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear, esc } = BEM.util;
  const CORRECT = ["Great work!", "Correct!", "Excellent!", "You nailed it!"];
  const rand = a => a[Math.floor(Math.random() * a.length)];
  const hintsOn = () => BEM.storage.settings().hints !== false;

  /* Normalise a raw question into the runner's shape. */
  function normalise(q) {
    if (q.kind === "truefalse") {
      return { prompt: esc(q.statement), speak: q.speak || q.statement, choices: ["True", "False"], answer: q.answer ? 0 : 1, pattern: q.pattern || "", explain: q.explain || "", cat: q.cat || "" };
    }
    return { prompt: q.prompt, speak: q.speak || null, choices: q.choices.slice(), answer: q.answer, pattern: q.pattern || "", explain: q.explain || "", cat: q.cat || "" };
  }

  /* Data validation — returns array of problem strings (empty = ok). */
  function validate(list) {
    const problems = [];
    list.forEach((q, i) => {
      const n = normalise(q);
      if (!Array.isArray(n.choices) || n.choices.length < 2) problems.push("Q" + (i + 1) + ": needs at least two choices.");
      if (typeof n.answer !== "number" || n.answer < 0 || n.answer >= n.choices.length) problems.push("Q" + (i + 1) + ": answer index out of range.");
      const set = new Set(n.choices.map(c => String(c).toLowerCase()));
      if (set.size !== n.choices.length) problems.push("Q" + (i + 1) + ": duplicated answer choices.");
    });
    return problems;
  }

  /* ---------- generic runner ---------- */
  function run(container, rawList, opts) {
    opts = opts || {};
    const problems = validate(rawList);
    if (problems.length) { container.append(BEM.devError("This quiz has data problems and was not started.", problems.join(" "))); return; }

    const list = rawList.map(normalise);
    let idx = 0, score = 0, streak = 0, streakMax = 0;
    const byPattern = {};
    const mistakes = [];

    const wrap = h("section", { class: "activity" });
    container.append(wrap);

    const hud = h("div", { class: "quiz-hud no-print" }, [
      h("span", { class: "chip", id: "q-pos" }),
      h("div", { class: "pbar" }, h("span", { id: "q-bar", style: "width:0%" })),
      h("span", { class: "chip chip-core", id: "q-score" }),
      h("span", { class: "streak", id: "q-streak" }),
      opts.exit ? h("button", { class: "btn btn-ghost btn-sm", onclick: confirmExit }, "Exit") : null
    ]);
    const card = h("div", { class: "card" });
    wrap.append(hud, card);

    function confirmExit() {
      if (confirm("Exit the quiz? Your progress in this quiz will not be saved.")) opts.exit();
    }
    function meta() {
      hud.querySelector("#q-pos").textContent = "Q " + (idx + 1) + "/" + list.length;
      hud.querySelector("#q-bar").style.width = Math.round((idx / list.length) * 100) + "%";
      hud.querySelector("#q-score").textContent = "★ " + score;
      hud.querySelector("#q-streak").textContent = streak >= 2 ? "🔥 " + streak : "";
    }

    function render() {
      clear(card); meta();
      const q = list[idx];
      if (opts.showCat && q.cat) card.append(h("div", { class: "eyebrow", text: q.cat }));
      card.append(h("div", { class: "q-prompt", html: q.prompt }));
      if (q.speak && BEM.audio.supported) card.append(BEM.audio.controls(q.speak, { slow: true }));

      let attempt = 0;
      const opt = h("div", { class: "options " + (q.choices.length <= 3 ? "cols-2" : "") });
      const fb = h("div");
      q.choices.forEach((c, i) => {
        const b = h("button", { class: "opt", type: "button", text: c, onclick: () => choose(i, b) });
        opt.append(b);
      });
      card.append(opt, fb);

      function lock() { [...opt.children].forEach(x => x.disabled = true); }
      function record(correct) {
        const key = q.pattern || "other";
        byPattern[key] = byPattern[key] || { correct: 0, total: 0 };
        byPattern[key].total++; if (correct) byPattern[key].correct++;
        if (q.cat === "listening") { byPattern.__listening = byPattern.__listening || { correct: 0, total: 0 }; byPattern.__listening.total++; if (correct) byPattern.__listening.correct++; }
        if (correct) { score++; streak++; streakMax = Math.max(streakMax, streak); }
        else {
          streak = 0;
          mistakes.push({ prompt: q.prompt, speak: q.speak, ya: q.choices[chosenIdx], ca: q.choices[q.answer], choices: q.choices, answer: q.answer, pattern: q.pattern, explain: q.explain });
        }
        setTimeout(next, correct ? 500 : 0);
      }
      let chosenIdx = -1;
      function choose(i, btn) {
        chosenIdx = i;
        if (i === q.answer) { lock(); btn.classList.add("correct"); BEM.burst(btn); fbMsg(true, rand(CORRECT), ""); record(true); return; }
        btn.classList.add("wrong");
        if (attempt === 0 && hintsOn()) { attempt = 1; btn.disabled = true; fbMsg(false, "Not quite — try once more.", ""); return; }
        lock(); opt.children[q.answer].classList.add("reveal"); fbMsg(false, "The answer is highlighted.", q.explain);
        const b = h("button", { class: "btn btn-primary mt-4", onclick: () => record(false) }, "Next ▶"); fb.append(b); b.focus();
      }
      function fbMsg(ok, msg, sub) {
        clear(fb);
        fb.append(h("div", { class: "feedback " + (ok ? "ok" : "no") }, [ h("span", { class: "icon" }, ok ? "🌟" : "💡"), h("div", {}, [h("span", { text: msg }), sub ? h("small", { text: sub }) : null]) ]));
      }
    }

    function next() {
      idx++;
      if (idx >= list.length) return finish();
      render();
    }
    function finish() {
      const pct = Math.round((score / list.length) * 100);
      opts.onComplete && opts.onComplete({ score, total: list.length, pct, byPattern, mistakes, streakMax });
    }
    render();
  }

  /* ---------- Unit Challenge ---------- */
  function challenge(container, n) {
    clear(container);
    const unit = BEM.units[n];
    container.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Unit Challenge"),
      h("h1", {}, unit.title + " Challenge"),
      h("p", { class: "text-soft" }, "20 mixed questions. Listen carefully — you can try each one twice.")
    ]));
    const holder = h("div");
    container.append(holder);
    run(holder, unit.challenge, {
      exit: () => BEM.go("#/unit/" + n),
      showCat: true,
      onComplete: (result) => {
        BEM.progress.recordChallenge(n, result);
        BEM.progress.markSection(n, "challenge");
        showResult(holder, n, result);
      }
    });
  }

  function showResult(container, n, result) {
    clear(container);
    const level = BEM.course.unitLevelFor(result.pct);
    const patterns = Object.keys(result.byPattern).filter(k => !k.startsWith("__") && k !== "other" && k !== "");
    let strongest = null, weakest = null;
    patterns.forEach(p => {
      const a = result.byPattern[p]; const acc = a.correct / a.total;
      if (!strongest || acc > strongest.acc) strongest = { p, acc };
      if (!weakest || acc < weakest.acc) weakest = { p, acc };
    });
    const attempts = (BEM.progress.isUnitComplete(n) || true) ? (BEM.profiles.active().units[n].challenge.attempts) : 1;

    container.append(h("div", { class: "result-hero" }, [
      h("div", {}, "Unit " + n + " Challenge complete"),
      h("div", { class: "score", text: result.score + " / " + result.total }),
      h("div", {}, result.pct + "%"),
      h("div", { class: "level", text: level.name }),
      h("div", { class: "stars", "aria-label": level.stars + " stars", text: "★".repeat(level.stars) + "☆".repeat(3 - level.stars) })
    ]));

    const grid = h("div", { class: "result-grid" }, [
      stat("Score", result.pct + "%"),
      stat("Attempts", String(attempts)),
      strongest ? stat("Strongest", strongest.p) : null,
      weakest && weakest.acc < 1 ? stat("Practise", weakest.p) : stat("Practise", "—")
    ]);
    container.append(grid);

    // accuracy by pattern
    const accWrap = h("div", { class: "card mt-5" }, [ h("h3", {}, "Accuracy by pattern") ]);
    patterns.forEach(p => {
      const a = result.byPattern[p]; const pc = Math.round((a.correct / a.total) * 100);
      accWrap.append(h("div", { class: "pattern-row" }, [
        h("span", { class: "name", text: p }),
        h("div", { class: "pbar" }, h("span", { style: "width:" + pc + "%" })),
        h("span", { class: "pct", text: pc + "%" })
      ]));
    });
    container.append(accWrap);

    container.append(h("p", { class: "center mt-4", text:
      result.pct >= 90 ? "Amazing! You are a true Sound Master." :
      result.pct >= 75 ? "Fantastic reading — keep it up!" :
      result.pct >= 60 ? "Well done! You are a growing reader." :
      "Good try! Review your mistakes and play again — you can do it." }));

    container.append(h("div", { class: "row mt-5", style: "justify-content:center;" }, [
      result.mistakes.length ? h("button", { class: "btn btn-warm", onclick: () => BEM.go("#/unit/" + n + "/section/mistakes") }, "Review my mistakes (" + result.mistakes.length + ")") : null,
      h("button", { class: "btn btn-primary", onclick: () => challenge(container.closest ? container : container, n) }, "Try again"),
      h("a", { class: "btn btn-ghost", href: "#/unit/" + n + "/section/badge" }, "See unit badge")
    ]));
  }
  function stat(l, v) { return h("div", { class: "stat" }, [ h("span", { class: "num", text: v }), h("span", { class: "lbl", text: l }) ]); }

  /* ---------- Story comprehension ---------- */
  function comprehension(container, n) {
    clear(container);
    const unit = BEM.units[n];
    container.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Reading Comprehension"),
      h("h1", {}, "About “" + unit.story.title + "”"),
      h("p", { class: "text-soft" }, "Answer questions about the story. Re-read it any time from Story Time.")
    ]));
    const holder = h("div");
    container.append(holder);
    run(holder, unit.story.comprehension, {
      onComplete: (result) => {
        BEM.profiles.updateActive(p => { const u = p.units[n]; if (u) u.comprehension = { score: result.score, total: result.total }; });
        BEM.progress.markSection(n, "comprehension");
        BEM.progress.addStars(result.score);
        clear(holder);
        holder.append(h("div", { class: "result-hero" }, [
          h("div", {}, "Comprehension complete"),
          h("div", { class: "score", text: result.score + " / " + result.total }),
          h("div", { class: "level", text: result.pct + "%" })
        ]));
        holder.append(h("div", { class: "row mt-5", style: "justify-content:center;" }, [
          h("button", { class: "btn btn-primary", onclick: () => comprehension(container, n) }, "Try again"),
          h("a", { class: "btn btn-ghost", href: "#/unit/" + n + "/section/challenge" }, "Go to Unit Challenge")
        ]));
      }
    });
  }

  /* ---------- Review My Mistakes ---------- */
  function mistakesView(n) {
    const unit = BEM.units[n];
    const mistakes = BEM.progress.getMistakes(n);
    const wrap = h("section", {}, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Review My Mistakes"), h("h1", {}, "Learn from the tricky ones") ]) ]);
    if (!mistakes.length) {
      wrap.append(h("div", { class: "card center" }, [ h("p", {}, "No mistakes stored yet. Take the Unit Challenge, and any tricky questions will appear here to practise."), h("a", { class: "btn btn-primary", href: "#/unit/" + n + "/section/challenge" }, "Go to Unit Challenge") ]));
      return wrap;
    }
    mistakes.forEach(m => {
      const box = h("div", { class: "mistake" }, [
        h("div", { class: "q-sub", html: m.prompt }),
        h("div", {}, [ h("span", {}, "Your answer: "), h("span", { class: "ya", text: m.ya }) ]),
        h("div", {}, [ h("span", {}, "Correct answer: "), h("span", { class: "ca", html: BEM.util.hi(m.ca, m.pattern) }) ]),
        m.explain ? h("div", { class: "ex", text: m.explain }) : null,
        h("div", { class: "row mt-4" }, [
          m.speak ? h("button", { class: "btn btn-sm btn-ghost", onclick: () => BEM.audio.slow(m.speak) }, "🔊 Listen again") : null,
          h("button", { class: "btn btn-sm btn-primary", onclick: (e) => trySimilar(e.currentTarget, m) }, "Try a similar question")
        ])
      ]);
      wrap.append(box);
    });
    return wrap;
  }

  function trySimilar(btn, m) {
    const holder = h("div", { class: "mt-4" });
    btn.parentElement.parentElement.append(holder);
    btn.disabled = true;
    const opt = h("div", { class: "options cols-2" });
    holder.append(h("div", { class: "q-sub", html: m.prompt }), opt);
    let attempt = 0;
    m.choices.forEach((c, i) => {
      const b = h("button", { class: "opt", text: c, onclick: () => {
        if (i === m.answer) { [...opt.children].forEach(x => x.disabled = true); b.classList.add("correct"); BEM.burst(b); holder.append(h("div", { class: "feedback ok mt-4" }, [h("span", { class: "icon" }, "🌟"), h("span", {}, "Yes! You've got it now.")])); }
        else if (attempt === 0 && hintsOn()) { attempt = 1; b.classList.add("wrong"); b.disabled = true; }
        else { [...opt.children].forEach(x => x.disabled = true); b.classList.add("wrong"); opt.children[m.answer].classList.add("reveal"); }
      } });
      opt.append(b);
    });
  }

  BEM.quiz = { run, challenge, comprehension, mistakesView, validate };
})();
