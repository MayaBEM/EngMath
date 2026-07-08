/* ============================================================
   script.js — App engine
   Maths 7 · Unit 1: Integers — Bright EngMath © 2026
   ============================================================ */

/* ---------------- Progress store ---------------- */
const STORE_KEY = "brightengmath_u1_integers_v1";

const defaultProgress = () => ({
  lessonsDone: {},        // {L1:true}
  activitiesDone: {},     // {P1:{score,total}, Q1:{...}, V_match:true...}
  problemsDone: {},       // {easy:{score,total}}
  tests: {},              // {T1:{best,lastScore,lastTotal,attempts,wrong:[{qi,user}]}}
  lastSection: "home"
});

let P = loadProgress();

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultProgress(), JSON.parse(raw));
  } catch (e) { /* storage unavailable */ }
  return defaultProgress();
}
function saveProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch (e) { /* ignore */ }
}

/* ---------------- Helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, attrs = {}, html = "") {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) n.setAttribute(k, v);
  }
  if (html) n.innerHTML = html;
  return n;
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function normAns(s) {
  return String(s).trim().toLowerCase()
    .replace(/−/g, "-").replace(/\s+/g, "")
    .replace(/°c$/, "").replace(/c$/, "");
}
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2600);
}
const COLOR_BG = {
  sky: "var(--sky-soft)", lavender: "var(--lavender-soft)", mint: "var(--mint-soft)",
  peach: "var(--peach-soft)", yellow: "var(--yellow-soft)"
};
const COLOR_MAIN = {
  sky: "var(--sky)", lavender: "var(--lavender)", mint: "var(--mint)",
  peach: "var(--peach)", yellow: "var(--yellow)"
};

/* ============================================================
   QUESTION RENDERER — supports mcq, tf, multi, fill, order, sort, match
   opts: { mode:'practice'|'test', onGraded(correct, userText), locked }
   ============================================================ */
function renderQuestion(q, opts = {}) {
  const wrap = el("div", { class: "q-block" });
  const mode = opts.mode || "practice";
  let graded = false;

  if (q.skill && mode === "test") {
    wrap.appendChild(el("span", { class: "skill-pill" }, esc(SKILLS[q.skill] || q.skill)));
  }
  wrap.appendChild(el("p", { class: "q-text" }, esc(q.q)));

  const fb = el("div", { class: "feedback", role: "status" });
  const actions = el("div", { class: "q-actions" });

  function showFeedback(correct, correctText) {
    fb.className = "feedback show " + (correct ? "good" : "bad");
    const praise = ["Great job! 🎉", "Excellent work! ⭐", "You got it! 🙌", "Brilliant! 💫"];
    const nudge = ["Nice try!", "You're getting closer!", "Almost — look again!", "Good effort!"];
    const title = correct ? praise[Math.floor(Math.random() * praise.length)]
                          : nudge[Math.floor(Math.random() * nudge.length)];
    let html = `<div class="fb-title">${correct ? "✅" : "❌"} ${title}</div>`;
    if (!correct) html += `<div class="fb-answer">Correct answer: ${correctText}</div>`;
    if (q.explain) html += `<div class="fb-explain">${esc(q.explain)}</div>`;
    if (q.rule) html += `<div class="fb-rule">📌 Remember: ${esc(q.rule)}</div>`;
    fb.innerHTML = html;
  }

  function grade(correct, userText, correctText) {
    if (graded) return;
    graded = true;
    showFeedback(correct, correctText);
    if (opts.onGraded) opts.onGraded(correct, userText);
  }

  /* ----- MCQ & TF ----- */
  if (q.type === "mcq" || q.type === "tf") {
    const options = q.type === "tf" ? ["True", "False"] : q.options;
    const correctIdx = q.type === "tf" ? (q.answer ? 0 : 1) : q.answer;
    const optWrap = el("div", { class: "options" });
    const letters = ["A", "B", "C", "D", "E"];
    options.forEach((opt, i) => {
      const b = el("button", { class: "opt-btn", type: "button", "aria-label": `Answer ${letters[i]}: ${opt}` });
      b.innerHTML = `<span class="letter">${letters[i]}</span><span>${esc(opt)}</span>`;
      b.addEventListener("click", () => {
        if (graded) return;
        $$(".opt-btn", optWrap).forEach((x, xi) => {
          x.disabled = true;
          if (xi === correctIdx) x.classList.add("correct");
          else if (xi === i) x.classList.add("incorrect");
        });
        grade(i === correctIdx, options[i], options[correctIdx]);
      });
      optWrap.appendChild(b);
    });
    wrap.appendChild(optWrap);
  }

  /* ----- MULTI SELECT ----- */
  if (q.type === "multi") {
    const optWrap = el("div", { class: "options" });
    const letters = ["A", "B", "C", "D", "E"];
    const chosen = new Set();
    q.options.forEach((opt, i) => {
      const b = el("button", { class: "opt-btn", type: "button", "aria-pressed": "false" });
      b.innerHTML = `<span class="letter">${letters[i]}</span><span>${esc(opt)}</span>`;
      b.addEventListener("click", () => {
        if (graded) return;
        if (chosen.has(i)) { chosen.delete(i); b.classList.remove("selected"); b.setAttribute("aria-pressed", "false"); }
        else { chosen.add(i); b.classList.add("selected"); b.setAttribute("aria-pressed", "true"); }
      });
      optWrap.appendChild(b);
    });
    wrap.appendChild(optWrap);
    const check = el("button", { class: "btn btn-primary btn-sm", type: "button" }, "Check Answer");
    check.addEventListener("click", () => {
      if (graded || chosen.size === 0) { if (!graded) toast("Select at least one answer first!"); return; }
      const correctSet = new Set(q.answer);
      const ok = chosen.size === correctSet.size && [...chosen].every(i => correctSet.has(i));
      $$(".opt-btn", optWrap).forEach((x, xi) => {
        x.disabled = true;
        if (correctSet.has(xi)) x.classList.add("correct");
        else if (chosen.has(xi)) x.classList.add("incorrect");
      });
      check.disabled = true;
      grade(ok,
        [...chosen].sort().map(i => q.options[i]).join(", "),
        q.answer.map(i => q.options[i]).join(", "));
    });
    actions.appendChild(check);
  }

  /* ----- FILL ----- */
  if (q.type === "fill") {
    const row = el("div", { class: "fill-row" });
    const input = el("input", { class: "fill-input", type: "text", placeholder: "Type your answer…", "aria-label": "Your answer" });
    const check = el("button", { class: "btn btn-primary btn-sm", type: "button" }, "Check Answer");
    const doCheck = () => {
      if (graded) return;
      const val = input.value;
      if (!val.trim()) { toast("Type an answer first!"); return; }
      const acceptList = (q.accept || [q.answer]).map(normAns);
      const ok = acceptList.includes(normAns(val));
      input.classList.add(ok ? "correct" : "incorrect");
      input.disabled = true; check.disabled = true;
      grade(ok, val.trim(), String(q.answer));
    };
    check.addEventListener("click", doCheck);
    input.addEventListener("keydown", e => { if (e.key === "Enter") doCheck(); });
    row.appendChild(input); row.appendChild(check);
    wrap.appendChild(row);
  }

  /* ----- ORDER (tap in sequence) ----- */
  if (q.type === "order") {
    const display = q.scrambled || shuffle(q.items);
    const slots = el("div", { class: "order-slots", "aria-label": "Your sequence" });
    const pool = el("div", { class: "order-pool" });
    const seq = [];
    q.items.forEach(() => slots.appendChild(el("div", { class: "order-slot" }, "")));

    display.forEach(item => {
      const chip = el("button", { class: "order-chip", type: "button" }, esc(item));
      chip.addEventListener("click", () => {
        if (graded || chip.disabled) return;
        seq.push(item);
        chip.disabled = true;
        const slot = $$(".order-slot", slots)[seq.length - 1];
        slot.textContent = item; slot.classList.add("filled");
      });
      pool.appendChild(chip);
    });
    const undo = el("button", { class: "btn btn-ghost btn-sm", type: "button" }, "↩ Undo");
    undo.addEventListener("click", () => {
      if (graded || !seq.length) return;
      const removed = seq.pop();
      const slot = $$(".order-slot", slots)[seq.length];
      slot.textContent = ""; slot.classList.remove("filled");
      const chip = $$(".order-chip", pool).find(c => c.textContent === removed && c.disabled);
      if (chip) chip.disabled = false;
    });
    const check = el("button", { class: "btn btn-primary btn-sm", type: "button" }, "Check Answer");
    check.addEventListener("click", () => {
      if (graded) return;
      if (seq.length !== q.items.length) { toast("Place every number first!"); return; }
      const ok = seq.every((v, i) => v === q.items[i]);
      check.disabled = true; undo.disabled = true;
      grade(ok, seq.join(" → "), q.items.join(" → "));
    });
    wrap.appendChild(pool);
    wrap.appendChild(slots);
    actions.appendChild(undo);
    actions.appendChild(check);
  }

  /* ----- SORT (assign buckets) ----- */
  if (q.type === "sort") {
    const rows = [];
    const listWrap = el("div");
    q.items.forEach((item, idx) => {
      const row = el("div", { class: "sort-item-row" });
      row.appendChild(el("span", { class: "sort-label" }, esc(item.t)));
      const btns = [];
      q.buckets.forEach((bName, bi) => {
        const bb = el("button", { class: "bucket-btn", type: "button" }, esc(bName));
        bb.addEventListener("click", () => {
          if (graded) return;
          btns.forEach(x => x.classList.remove("chosen"));
          bb.classList.add("chosen");
          rows[idx].choice = bi;
        });
        btns.push(bb); row.appendChild(bb);
      });
      rows.push({ row, btns, choice: null });
      listWrap.appendChild(row);
    });
    wrap.appendChild(listWrap);
    const check = el("button", { class: "btn btn-primary btn-sm", type: "button" }, "Check Answer");
    check.addEventListener("click", () => {
      if (graded) return;
      if (rows.some(r => r.choice === null)) { toast("Sort every item first!"); return; }
      let allOk = true;
      rows.forEach((r, i) => {
        const correctB = q.items[i].b;
        r.btns.forEach((bb, bi) => {
          bb.disabled = true;
          if (bi === correctB) bb.classList.add("b-correct");
          else if (bi === r.choice && r.choice !== correctB) bb.classList.add("b-wrong");
        });
        if (r.choice !== correctB) allOk = false;
      });
      check.disabled = true;
      grade(allOk,
        rows.map((r, i) => `${q.items[i].t} → ${q.buckets[r.choice]}`).join("; "),
        q.items.map(it => `${it.t} → ${q.buckets[it.b]}`).join("; "));
    });
    actions.appendChild(check);
  }

  /* ----- MATCH (pair left and right) ----- */
  if (q.type === "match") {
    const cols = el("div", { class: "match-cols" });
    const leftCol = el("div"), rightCol = el("div");
    const rightOrder = shuffle(q.right.map((_, i) => i));
    const pairs = {}; // leftIdx -> rightIdx
    let selectedLeft = null;
    const leftBtns = [], rightBtns = {};

    q.left.forEach((lt, li) => {
      const b = el("button", { class: "match-item", type: "button" }, esc(lt));
      b.addEventListener("click", () => {
        if (graded) return;
        if (pairs[li] !== undefined) { // unpair
          const ri = pairs[li]; delete pairs[li];
          rightBtns[ri].classList.remove("paired"); rightBtns[ri].disabled = false;
          b.classList.remove("paired"); b.innerHTML = esc(lt);
        }
        leftBtns.forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        selectedLeft = li;
      });
      leftBtns.push(b); leftCol.appendChild(b);
    });
    rightOrder.forEach(ri => {
      const b = el("button", { class: "match-item", type: "button" }, esc(q.right[ri]));
      b.addEventListener("click", () => {
        if (graded || selectedLeft === null || b.disabled) {
          if (selectedLeft === null && !graded) toast("Pick an item on the left first!");
          return;
        }
        pairs[selectedLeft] = ri;
        b.classList.add("paired"); b.disabled = true;
        const lb = leftBtns[selectedLeft];
        lb.classList.remove("selected"); lb.classList.add("paired");
        lb.innerHTML = `${esc(q.left[selectedLeft])} <span aria-hidden="true">→</span> ${esc(q.right[ri])}`;
        selectedLeft = null;
      });
      rightBtns[ri] = b; rightCol.appendChild(b);
    });
    cols.appendChild(leftCol); cols.appendChild(rightCol);
    wrap.appendChild(cols);
    const check = el("button", { class: "btn btn-primary btn-sm", type: "button" }, "Check Answer");
    check.addEventListener("click", () => {
      if (graded) return;
      if (Object.keys(pairs).length !== q.left.length) { toast("Match every pair first!"); return; }
      let allOk = true;
      q.left.forEach((_, li) => {
        const ok = pairs[li] === q.answer[li];
        leftBtns[li].classList.remove("paired");
        leftBtns[li].classList.add(ok ? "paired" : "wrong-flash");
        if (!ok) allOk = false;
      });
      check.disabled = true;
      grade(allOk,
        q.left.map((lt, li) => `${lt} → ${q.right[pairs[li]]}`).join("; "),
        q.left.map((lt, li) => `${lt} → ${q.right[q.answer[li]]}`).join("; "));
    });
    actions.appendChild(check);
  }

  wrap.appendChild(actions);
  wrap.appendChild(fb);
  return wrap;
}

/* ============================================================
   ACTIVITY RUNNER — a sequence of questions with dots + score
   ============================================================ */
function runActivity({ container, title, icon, questions, onFinish, allowRetry = true }) {
  container.innerHTML = "";
  let idx = 0, score = 0;
  const results = [];

  const card = el("div", { class: "card" });
  const head = el("div", { class: "runner-head" });
  head.appendChild(el("h3", {}, `${icon || "✏️"} ${esc(title)}`));
  const dots = el("div", { class: "step-dots", "aria-label": "Progress" });
  questions.forEach(() => dots.appendChild(el("span", { class: "step-dot" })));
  head.appendChild(dots);
  card.appendChild(head);
  const body = el("div");
  card.appendChild(body);
  container.appendChild(card);

  function refreshDots() {
    $$(".step-dot", dots).forEach((d, i) => {
      d.className = "step-dot" +
        (i === idx ? " now" : "") +
        (results[i] === true ? " ok" : results[i] === false ? " miss" : "");
    });
  }

  function showQuestion() {
    refreshDots();
    body.innerHTML = "";
    const q = questions[idx];
    body.appendChild(el("p", { class: "q-count", style: "font-weight:800;color:var(--ink-soft);margin-bottom:6px" },
      `Question ${idx + 1} of ${questions.length}`));
    const qNode = renderQuestion(q, {
      mode: "practice",
      onGraded: (correct) => {
        results[idx] = correct;
        if (correct) score++;
        refreshDots();
        const nav = el("div", { class: "q-actions" });
        if (!correct && allowRetry) {
          const retry = el("button", { class: "btn btn-ghost btn-sm", type: "button" }, "🔁 Try Again");
          retry.addEventListener("click", () => {
            results[idx] = undefined;
            score = results.filter(r => r === true).length;
            showQuestion();
          });
          nav.appendChild(retry);
        }
        const nextBtn = el("button", { class: "btn btn-primary btn-sm", type: "button" },
          idx === questions.length - 1 ? "Finish ✔" : "Next →");
        nextBtn.addEventListener("click", () => {
          if (idx === questions.length - 1) {
            const finalScore = results.filter(r => r === true).length;
            finish(finalScore);
          } else { idx++; showQuestion(); }
        });
        nav.appendChild(nextBtn);
        body.appendChild(nav);
        nav.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    body.appendChild(qNode);
  }

  function finish(finalScore) {
    body.innerHTML = "";
    const pct = Math.round(finalScore / questions.length * 100);
    const msg = pct >= 90 ? "⭐ Amazing! You're a superstar!" :
                pct >= 70 ? "🎉 Great work — nearly perfect!" :
                pct >= 50 ? "💪 Good effort — one more round will help!" :
                "🌱 Keep practising — you're learning!";
    body.innerHTML = `
      <div class="results-hero" style="padding:22px">
        <div class="star-burst" aria-hidden="true">${pct >= 90 ? "⭐⭐⭐" : pct >= 70 ? "⭐⭐" : "⭐"}</div>
        <h2 style="font-size:24px">${finalScore} / ${questions.length} correct</h2>
        <p class="perf-msg">${msg}</p>
      </div>`;
    const nav = el("div", { class: "q-actions", style: "justify-content:center" });
    const again = el("button", { class: "btn btn-ghost", type: "button" }, "🔁 Play Again");
    again.addEventListener("click", () => { idx = 0; score = 0; results.length = 0; showQuestion(); });
    nav.appendChild(again);
    body.appendChild(nav);
    if (onFinish) onFinish(finalScore, questions.length);
  }

  showQuestion();
}

/* ============================================================
   VIEW: HOME
   ============================================================ */
function renderHome() {
  const v = $("#view-home");
  const lessonsDone = Object.keys(P.lessonsDone).length;
  const lessonPct = Math.round(lessonsDone / LESSONS.length * 100);
  const practiceIds = [...PRACTICE_SETS.map(p => p.id), ...QUICK_ZONE.map(qz => qz.id)];
  const practiceDone = practiceIds.filter(id => P.activitiesDone[id]).length;
  const practicePct = Math.round(practiceDone / practiceIds.length * 100);
  const testsDone = TESTS.filter(t => P.tests[t.id] && P.tests[t.id].attempts > 0).length;
  const bestAvg = testsDone ? Math.round(TESTS.reduce((s, t) => s + ((P.tests[t.id] && P.tests[t.id].best) || 0), 0) / TESTS.length) : 0;

  const badges = [
    { label: "🚀 First Steps", earned: lessonsDone >= 1 },
    { label: "📚 Lesson Legend", earned: lessonsDone === LESSONS.length },
    { label: "🧠 Word Wizard", earned: ["V_match", "V_odd", "V_spell", "V_sort", "V_memory"].some(k => P.activitiesDone[k]) },
    { label: "💪 Practice Pro", earned: PRACTICE_SETS.every(p => P.activitiesDone[p.id]) },
    { label: "⚡ Quick-Zone Hero", earned: QUICK_ZONE.every(qz => P.activitiesDone[qz.id]) },
    { label: "🏆 Test Champion", earned: TESTS.some(t => (P.tests[t.id] && P.tests[t.id].best >= 90)) },
    { label: "👑 Unit Master", earned: TESTS.every(t => (P.tests[t.id] && P.tests[t.id].best >= 75)) }
  ];

  v.innerHTML = `
    <div class="hero">
      <div>
        <span class="eyebrow">Maths Stage 7 · Unit 1</span>
        <h1>Integers <span>Review &amp; Test</span> 🚀</h1>
        <p class="lead">Welcome, mathematician! Negative numbers, multiples, factors, divisibility tricks, squares and cubes — everything you need to shine in your Unit 1 test is right here.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-nav="learn">📖 Start Learning</button>
          <button class="btn btn-mint" data-nav="practice">✏️ Start Practice</button>
          <button class="btn btn-peach" data-nav="tests">🏁 Take the Test</button>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="tile-scene">
          <div class="num-tile t1">−7</div>
          <div class="num-tile t2">√81</div>
          <div class="num-tile t3">LCM</div>
          <div class="num-tile t4">2³</div>
          <div class="num-tile t5">HCF</div>
          <div class="num-tile t6">+4</div>
        </div>
      </div>
    </div>

    <div class="goals">
      <div class="section-head"><h2>🎯 What you will master</h2></div>
      <div class="grid cols-3">
        <div class="goal-card"><div class="goal-icon" style="background:var(--sky-soft)">🌡️</div>
          <div><h3>Add &amp; subtract integers</h3><p>Jump confidently along the number line — even below zero.</p></div></div>
        <div class="goal-card"><div class="goal-icon" style="background:var(--lavender-soft)">✖️</div>
          <div><h3>Multiply &amp; divide integers</h3><p>Master the sign rule so minus signs never trick you.</p></div></div>
        <div class="goal-card"><div class="goal-icon" style="background:var(--mint-soft)">🥇</div>
          <div><h3>LCM &amp; HCF</h3><p>Find lowest common multiples and highest common factors fast.</p></div></div>
        <div class="goal-card"><div class="goal-icon" style="background:var(--yellow-soft)">🕵️</div>
          <div><h3>Divisibility tests</h3><p>Check giant numbers for 2, 3, 4, 5, 6, 7, 8, 9, 10 and 11 — in seconds.</p></div></div>
        <div class="goal-card"><div class="goal-icon" style="background:var(--peach-soft)">🟦</div>
          <div><h3>Squares, cubes &amp; roots</h3><p>Use √ and ∛ like a pro, and estimate tricky roots.</p></div></div>
        <div class="goal-card"><div class="goal-icon" style="background:var(--mint-soft)">🚀</div>
          <div><h3>Word problems</h3><p>Solve real-life puzzles about temperature, depth, scores and more.</p></div></div>
      </div>
    </div>

    <div class="card progress-overview">
      <div class="section-head" style="margin-bottom:4px"><h2 style="font-size:24px">📊 Your Progress</h2></div>
      <div class="progress-row"><span class="label">Lessons completed</span>
        <div class="bar"><div class="bar-fill" style="width:${lessonPct}%"></div></div><span class="pct">${lessonPct}%</span></div>
      <div class="progress-row"><span class="label">Practice activities</span>
        <div class="bar"><div class="bar-fill mint" style="width:${practicePct}%"></div></div><span class="pct">${practicePct}%</span></div>
      <div class="progress-row"><span class="label">Test average (best)</span>
        <div class="bar"><div class="bar-fill peach" style="width:${bestAvg}%"></div></div><span class="pct">${bestAvg}%</span></div>
      <div class="badge-shelf">
        ${badges.map(b => `<span class="ach-badge ${b.earned ? "earned" : ""}">${b.label}</span>`).join("")}
      </div>
    </div>`;
}

/* ============================================================
   VIEW: LEARN
   ============================================================ */
function renderLearn() {
  const v = $("#view-learn");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Learn</span>
      <h2>Unit 1 Lessons</h2>
      <p>Six bite-sized lessons cover everything in Unit 1. Read the examples, dodge the common mistakes, then try the quick check!</p>
    </div>
    <div class="lesson-grid" id="lessonGrid"></div>
    <div id="lessonDetail"></div>`;
  const grid = $("#lessonGrid", v);
  LESSONS.forEach(les => {
    const tile = el("button", { class: "lesson-tile", type: "button", "aria-label": `Open lesson ${les.code}: ${les.title}` });
    tile.innerHTML = `
      <span class="num" style="background:${COLOR_MAIN[les.color]}">Lesson ${les.code}</span>
      ${P.lessonsDone[les.id] ? '<span class="done-mark" title="Completed">✅</span>' : ""}
      <h3>${esc(les.title)}</h3><p>${esc(les.summary)}</p>`;
    tile.addEventListener("click", () => openLesson(les));
    grid.appendChild(tile);
  });
  $("#lessonDetail", v).innerHTML = "";
}

function openLesson(les) {
  const v = $("#view-learn");
  v.innerHTML = `<div class="lesson-detail" id="ld"></div>`;
  const ld = $("#ld", v);

  const back = el("div", { class: "back-row" });
  const backBtn = el("button", { class: "btn btn-ghost btn-sm", type: "button" }, "← All lessons");
  backBtn.addEventListener("click", renderLearn);
  back.appendChild(backBtn);
  ld.appendChild(back);

  const hero = el("div", { class: "lesson-hero", style: `background:${COLOR_BG[les.color]}` });
  hero.innerHTML = `<span class="eyebrow">Lesson ${les.code}</span><h2>${esc(les.title)}</h2>
    <p class="subtitle">${esc(les.intro)}</p>`;
  ld.appendChild(hero);

  const kp = el("div", { class: "card" });
  kp.innerHTML = `<h3 style="font-family:var(--font-head);font-size:19px">🔑 Key Points</h3>` +
    les.keyPoints.map((k, i) => `<div class="keypoint"><span class="dot">${i + 1}</span><span>${esc(k)}</span></div>`).join("");
  if (les.soundboxes) {
    kp.innerHTML += `<p style="margin-top:16px;font-weight:800;font-size:13.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-soft)">${esc(les.soundboxes.label)}</p>
      <div class="soundbox-row">${les.soundboxes.boxes.map(b => `<span class="soundbox ${les.soundboxes.style}">${esc(b)}</span>`).join("")}</div>`;
  }
  ld.appendChild(kp);

  const ex = el("div", { class: "card" });
  ex.innerHTML = `<div class="example-block" style="margin-top:0"><h4>✨ Worked Examples</h4>` +
    les.examples.map(e => `<div class="example-line">${esc(e.line)}<span class="why">${esc(e.why)}</span></div>`).join("") + `</div>
    <div class="tip-box"><span class="emoji">💡</span><span><strong>Tip:</strong> ${esc(les.tip)}</span></div>
    <div class="mistake-box"><h4>⚠️ Watch out — common mistakes</h4>` +
    les.mistakes.map(m => `<div class="mistake-line"><span class="wrong">${esc(m.wrong)}</span> → <span class="right">${esc(m.right)}</span><br><small>${esc(m.note)}</small></div>`).join("") + `</div>`;
  ld.appendChild(ex);

  if (les.table) {
    const tb = el("div", { class: "card" });
    tb.innerHTML = `<h3 style="font-family:var(--font-head);font-size:18px;margin-bottom:4px">📋 ${esc(les.table.caption)}</h3>
      <table class="mini-table"><thead><tr>${les.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${les.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    ld.appendChild(tb);
  }

  const qc = el("div", { class: "card quickcheck" });
  qc.innerHTML = `<h3 style="font-family:var(--font-head);font-size:19px;margin-bottom:10px">🎯 Quick Check</h3>`;
  qc.appendChild(renderQuestion(les.quickCheck, {
    mode: "practice",
    onGraded: (correct) => {
      if (correct) {
        if (!P.lessonsDone[les.id]) {
          P.lessonsDone[les.id] = true; saveProgress();
          toast(`Lesson ${les.code} complete! ⭐`);
        }
      }
      const nav = el("div", { class: "q-actions" });
      const doneBtn = el("button", { class: "btn btn-mint btn-sm", type: "button" }, "Mark lesson complete ✔");
      doneBtn.addEventListener("click", () => {
        P.lessonsDone[les.id] = true; saveProgress();
        toast(`Lesson ${les.code} complete! ⭐`); renderLearn();
      });
      const backB = el("button", { class: "btn btn-ghost btn-sm", type: "button" }, "← All lessons");
      backB.addEventListener("click", renderLearn);
      if (!correct) nav.appendChild(doneBtn);
      nav.appendChild(backB);
      qc.appendChild(nav);
    }
  }));
  ld.appendChild(qc);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   VIEW: VOCAB (Key Words)
   ============================================================ */
const VCAT_COLORS = {
  "Numbers": ["var(--sky-soft)", "#2f7ea3"],
  "Operations": ["var(--lavender-soft)", "#5b48a8"],
  "Multiples & Factors": ["var(--mint-soft)", "#1c7a52"],
  "Powers & Roots": ["var(--peach-soft)", "#a34d0c"]
};

function renderVocab() {
  const v = $("#view-vocab");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Key Words</span>
      <h2>Unit 1 Word Bank</h2>
      <p>Every important maths word from Unit 1, explained simply. Filter by topic, then play the word games below!</p>
    </div>
    <div class="vocab-filters" id="vFilters" role="tablist"></div>
    <div class="vocab-grid" id="vGrid"></div>
    <div class="section-head" style="margin-top:34px"><h2 style="font-size:24px">🎮 Word Games</h2></div>
    <div class="activity-tabs" id="vTabs"></div>
    <div id="vActivity"></div>`;

  const filters = $("#vFilters", v);
  VOCAB_CATS.forEach((cat, i) => {
    const c = el("button", { class: "chip" + (i === 0 ? " active" : ""), type: "button", role: "tab" }, esc(cat));
    c.addEventListener("click", () => {
      $$(".chip", filters).forEach(x => x.classList.remove("active"));
      c.classList.add("active");
      drawVocabCards(cat);
    });
    filters.appendChild(c);
  });
  drawVocabCards("All");

  const tabs = [
    { id: "V_flash", label: "🃏 Flashcards" },
    { id: "V_match", label: "🔗 Match Meanings" },
    { id: "V_odd", label: "🕵️ Odd One Out" },
    { id: "V_sort", label: "🗂️ Word Sort" },
    { id: "V_spell", label: "✍️ Spelling Check" },
    { id: "V_memory", label: "🧠 Memory Game" }
  ];
  const tabRow = $("#vTabs", v);
  tabs.forEach((t, i) => {
    const b = el("button", { class: "chip" + (i === 0 ? " active" : ""), type: "button" },
      t.label + (P.activitiesDone[t.id] ? " ✓" : ""));
    b.addEventListener("click", () => {
      $$(".chip", tabRow).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      drawVocabActivity(t.id);
    });
    tabRow.appendChild(b);
  });
  drawVocabActivity("V_flash");
}

function drawVocabCards(cat) {
  const grid = $("#vGrid");
  grid.innerHTML = "";
  VOCAB.filter(w => cat === "All" || w.cat === cat).forEach(w => {
    const [bg, fg] = VCAT_COLORS[w.cat] || ["#eee", "#333"];
    const c = el("div", { class: "vocab-card" });
    c.innerHTML = `
      <div class="v-top"><span class="vocab-icon" style="background:${bg}" aria-hidden="true">${w.icon}</span>
        <div><h3>${esc(w.word)}</h3><span class="say">🔊 ${esc(w.say)}</span></div></div>
      <p class="meaning">${esc(w.meaning)}</p>
      <p class="example">“${esc(w.example)}”</p>
      <span class="cat-tag" style="background:${bg};color:${fg}">${esc(w.cat)}</span>`;
    grid.appendChild(c);
  });
}

function markActivityDone(id, score, total) {
  P.activitiesDone[id] = { score, total, at: Date.now() };
  saveProgress();
}

function drawVocabActivity(id) {
  const host = $("#vActivity");
  host.innerHTML = "";

  if (id === "V_flash") {
    const card = el("div", { class: "card" });
    card.innerHTML = `<h3 style="font-family:var(--font-head)">🃏 Flashcards</h3>
      <p style="color:var(--ink-soft);font-size:14.5px">Tap a card to flip between the word and its meaning.</p>
      <div class="flip-grid" id="flipGrid"></div>`;
    host.appendChild(card);
    const fg = $("#flipGrid", host);
    shuffle(VOCAB).slice(0, 12).forEach(w => {
      const f = el("button", { class: "flip-card", type: "button", "aria-label": `Flashcard: ${w.word}` });
      f.innerHTML = `<div class="flip-inner">
        <div class="flip-face flip-front">${w.icon} ${esc(w.word)}</div>
        <div class="flip-face flip-back">${esc(w.meaning)}</div></div>`;
      f.addEventListener("click", () => f.classList.toggle("flipped"));
      fg.appendChild(f);
    });
    if (!P.activitiesDone[id]) markActivityDone(id, 1, 1);
    return;
  }

  if (id === "V_match") {
    const q = {
      type: "match",
      q: "Match each word to its meaning.",
      left: VOCAB_MATCH.map(m => m.left),
      right: VOCAB_MATCH.map(m => m.right),
      answer: VOCAB_MATCH.map((_, i) => i),
      explain: "factor → divides in exactly · multiple → in the times table · product → multiplication answer · sum → addition answer · integer → whole number · square root → undoes squaring · LCM → smallest shared multiple · HCF → biggest shared factor.",
      rule: "Learn word pairs as families: factor/multiple, sum/product, LCM/HCF."
    };
    runActivity({
      container: host, title: "Match Meanings", icon: "🔗", questions: [q],
      onFinish: (s, t) => markActivityDone(id, s, t)
    });
    return;
  }

  if (id === "V_odd") {
    runActivity({
      container: host, title: "Odd One Out", icon: "🕵️",
      questions: VOCAB_ODD.map(o => ({ type: "mcq", ...o })),
      onFinish: (s, t) => markActivityDone(id, s, t)
    });
    return;
  }

  if (id === "V_sort") {
    runActivity({
      container: host, title: "Word Sort", icon: "🗂️",
      questions: [{ type: "sort", q: "Sort each number: factor of 24 or multiple of 24?", ...VOCAB_SORT }],
      onFinish: (s, t) => markActivityDone(id, s, t)
    });
    return;
  }

  if (id === "V_spell") {
    runActivity({
      container: host, title: "Spelling Check", icon: "✍️",
      questions: VOCAB_SPELL.map(o => ({ type: "mcq", ...o })),
      onFinish: (s, t) => markActivityDone(id, s, t)
    });
    return;
  }

  if (id === "V_memory") {
    const card = el("div", { class: "card" });
    card.innerHTML = `<h3 style="font-family:var(--font-head)">🧠 Memory Game</h3>
      <p style="color:var(--ink-soft);font-size:14.5px">Find the matching pairs — a question and its answer. Fewest flips wins!</p>
      <p id="memStats" style="font-weight:800;margin-bottom:10px">Flips: 0</p>
      <div class="memory-grid" id="memGrid"></div>`;
    host.appendChild(card);
    const grid = $("#memGrid", host);
    const cards = shuffle(MEMORY_PAIRS.flatMap(([a, b], pi) => [
      { text: a, pair: pi }, { text: b, pair: pi }
    ]));
    let first = null, lock = false, flips = 0, matched = 0;
    cards.forEach(cd => {
      const b = el("button", { class: "mem-card", type: "button", "aria-label": "Memory card" }, esc(cd.text));
      b._pair = cd.pair;
      b.addEventListener("click", () => {
        if (lock || b.classList.contains("revealed") || b.classList.contains("matched")) return;
        b.classList.add("revealed");
        flips++; $("#memStats").textContent = `Flips: ${flips}`;
        if (!first) { first = b; return; }
        lock = true;
        const a = first; first = null;
        if (a._pair === b._pair) {
          setTimeout(() => {
            a.classList.add("matched"); b.classList.add("matched");
            a.classList.remove("revealed"); b.classList.remove("revealed");
            matched++;
            lock = false;
            if (matched === MEMORY_PAIRS.length) {
              toast(`🎉 All pairs found in ${flips} flips!`);
              markActivityDone(id, MEMORY_PAIRS.length, MEMORY_PAIRS.length);
            }
          }, 450);
        } else {
          setTimeout(() => {
            a.classList.remove("revealed"); b.classList.remove("revealed");
            lock = false;
          }, 900);
        }
      });
      grid.appendChild(b);
    });
    return;
  }
}

/* ============================================================
   VIEW: PRACTICE (skills practice sets)
   ============================================================ */
function renderPractice() {
  const v = $("#view-practice");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Practice</span>
      <h2>Skills Practice</h2>
      <p>Four focused workouts — one for each part of Unit 1. Instant feedback after every question.</p>
    </div>
    <div class="activity-card-grid" id="pGrid"></div>
    <div id="pRunner" style="margin-top:22px"></div>`;
  const grid = $("#pGrid", v);
  PRACTICE_SETS.forEach(set => {
    const done = P.activitiesDone[set.id];
    const tile = el("button", { class: "activity-tile", type: "button" });
    tile.innerHTML = `
      <span class="a-count">${set.questions.length} questions</span>
      <div class="a-icon" aria-hidden="true">${set.icon}</div>
      <h3>${esc(set.title)}</h3><p>${esc(set.desc)}</p>
      ${done ? `<span class="a-star" title="Best: ${done.score}/${done.total}">⭐ ${done.score}/${done.total}</span>` : ""}`;
    tile.addEventListener("click", () => {
      runActivity({
        container: $("#pRunner", v), title: set.title, icon: set.icon,
        questions: set.questions,
        onFinish: (s, t) => {
          const prev = P.activitiesDone[set.id];
          if (!prev || s > prev.score) markActivityDone(set.id, s, t); else saveProgress();
          renderPracticeTilesOnly();
        }
      });
      $("#pRunner", v).scrollIntoView({ behavior: "smooth" });
    });
    grid.appendChild(tile);
  });
}
function renderPracticeTilesOnly() {
  // refresh star markers without clearing the runner
  const v = $("#view-practice");
  const grid = $("#pGrid", v);
  if (!grid) return;
  $$(".activity-tile", grid).forEach((tile, i) => {
    const set = PRACTICE_SETS[i];
    const done = P.activitiesDone[set.id];
    const star = $(".a-star", tile);
    if (done && !star) tile.insertAdjacentHTML("beforeend", `<span class="a-star">⭐ ${done.score}/${done.total}</span>`);
    else if (done && star) star.textContent = `⭐ ${done.score}/${done.total}`;
  });
}

/* ============================================================
   VIEW: WORD PROBLEMS (reading practice)
   ============================================================ */
function renderProblems() {
  const v = $("#view-problems");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Word Problems</span>
      <h2>Story Missions</h2>
      <p>Read each short story carefully, then answer the questions. Three levels — how far can you climb?</p>
    </div>
    <div class="level-tabs" id="lvlTabs"></div>
    <div id="storyHost"></div>`;
  const tabs = $("#lvlTabs", v);
  WORD_PROBLEMS.forEach((wp, i) => {
    const cls = wp.level === "easy" ? "easy" : wp.level === "medium" ? "medium" : "hard";
    const done = P.problemsDone[wp.level];
    const b = el("button", { class: `level-tab ${cls}` + (i === 0 ? " active" : ""), type: "button" },
      `${wp.icon} ${wp.label}${done ? " ✓" : ""}`);
    b.addEventListener("click", () => {
      $$(".level-tab", tabs).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      drawStory(wp);
    });
    tabs.appendChild(b);
  });
  drawStory(WORD_PROBLEMS[0]);
}

function drawStory(wp) {
  const host = $("#storyHost");
  host.innerHTML = `
    <div class="q-passage"><h4>${wp.icon} ${esc(wp.title)}</h4><p>${esc(wp.passage)}</p></div>
    <div id="storyQs"></div>`;
  runActivity({
    container: $("#storyQs", host), title: `${wp.label} Questions`, icon: "❓",
    questions: wp.questions,
    onFinish: (s, t) => {
      P.problemsDone[wp.level] = { score: s, total: t }; saveProgress();
    }
  });
}

/* ============================================================
   VIEW: QUICK ZONE
   ============================================================ */
function renderQuick() {
  const v = $("#view-quick");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Quick Practice Zone</span>
      <h2>Five-Minute Missions</h2>
      <p>Short, snappy challenges to warm up your brain before the Test Zone. Instant feedback, always.</p>
    </div>
    <div class="activity-card-grid" id="qGrid"></div>
    <div id="qRunner" style="margin-top:22px"></div>`;
  const grid = $("#qGrid", v);
  QUICK_ZONE.forEach(set => {
    const done = P.activitiesDone[set.id];
    const tile = el("button", { class: "activity-tile", type: "button", style: `background:${COLOR_BG[set.color] || "var(--white)"}` });
    tile.innerHTML = `
      <span class="a-count">${set.questions.length} questions</span>
      <div class="a-icon" aria-hidden="true">${set.icon}</div>
      <h3>${esc(set.title)}</h3><p>${esc(set.desc)}</p>
      ${done ? `<span class="a-star">⭐ ${done.score}/${done.total}</span>` : ""}`;
    tile.addEventListener("click", () => {
      runActivity({
        container: $("#qRunner", v), title: set.title, icon: set.icon,
        questions: set.questions,
        onFinish: (s, t) => {
          const prev = P.activitiesDone[set.id];
          if (!prev || s > prev.score) markActivityDone(set.id, s, t);
          renderQuick();
        }
      });
      $("#qRunner", v).scrollIntoView({ behavior: "smooth" });
    });
    grid.appendChild(tile);
  });
}

/* ============================================================
   VIEW: TEST ZONE
   ============================================================ */
function renderTests() {
  const v = $("#view-tests");
  v.innerHTML = `
    <div class="section-head">
      <span class="eyebrow">Test Zone</span>
      <h2>Unit 1 Test Sets</h2>
      <p>Three full 25-question tests, from friendly to fierce. Answer one question at a time — you’ll see the explanation after each answer. Good luck! 🍀</p>
    </div>
    <div class="test-set-grid" id="tGrid"></div>
    <div id="testRunner" style="margin-top:24px"></div>`;
  const grid = $("#tGrid", v);
  const diffColors = { "Easy": ["var(--mint-soft)", "#1c7a52"], "Medium": ["var(--yellow-soft)", "#7a5b08"], "Challenging": ["var(--peach-soft)", "#a34d0c"] };
  TESTS.forEach(t => {
    const rec = P.tests[t.id];
    const [bg, fg] = diffColors[t.difficulty];
    const cardEl = el("div", { class: "test-set-card" });
    cardEl.innerHTML = `
      <span class="t-diff" style="background:${bg};color:${fg}">${t.icon} ${t.difficulty}</span>
      <h3>${esc(t.name)}</h3>
      <p>${esc(t.focus)}</p>
      <span class="best">${rec && rec.attempts ? `Best score: <b>${rec.best}%</b> · ${rec.attempts} attempt${rec.attempts > 1 ? "s" : ""}` : "Not attempted yet"}</span>`;
    const btn = el("button", { class: "btn btn-primary", type: "button" },
      rec && rec.attempts ? "Retake Test →" : "Start Test →");
    btn.addEventListener("click", () => startTest(t));
    cardEl.appendChild(btn);
    grid.appendChild(cardEl);
  });
}

/* ---------------- Test runner ---------------- */
let T = null; // active test state

function startTest(test) {
  T = {
    test,
    idx: 0,
    // per question: {answered:bool, correct:bool, userText:string}
    state: test.questions.map(() => ({ answered: false, correct: false, userText: "" }))
  };
  drawTestScreen();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function drawTestScreen() {
  const v = $("#view-tests");
  const { test } = T;
  v.innerHTML = `
    <div class="test-layout">
      <div class="test-side">
        <button class="btn btn-ghost btn-sm nav-collapse-btn" id="navCollapse" aria-expanded="true">☰ Question Map</button>
        <div class="navigator" id="navigator">
          <h4>Questions</h4>
          <div class="nav-grid" id="navGrid"></div>
          <div class="nav-legend">
            <div><span class="legend-swatch" style="background:#fff"></span> Not answered</div>
            <div><span class="legend-swatch" style="background:var(--green-soft);border-color:var(--green)"></span> Correct</div>
            <div><span class="legend-swatch" style="background:var(--red-soft);border-color:var(--red)"></span> Incorrect</div>
          </div>
          <div style="margin-top:14px;display:grid;gap:8px">
            <button class="btn btn-ghost btn-sm" id="quitTest">Exit test</button>
            <button class="btn btn-danger btn-sm" id="restartTest">Restart</button>
          </div>
        </div>
      </div>
      <div>
        <div class="test-topbar">
          <span class="t-name">${test.icon} ${esc(test.name)}</span>
          <span class="q-count" id="qCounter"></span>
        </div>
        <div class="test-progressbar" aria-hidden="true"><div class="fill" id="tFill"></div></div>
        <div class="card" id="qHost"></div>
        <div class="q-actions" style="margin-top:16px">
          <button class="btn btn-ghost" id="prevQ">← Previous</button>
          <button class="btn btn-primary" id="nextQ">Next →</button>
          <button class="btn btn-peach" id="finishTest" style="margin-left:auto">Finish Test 🏁</button>
        </div>
      </div>
    </div>`;

  $("#navCollapse", v).addEventListener("click", (e) => {
    const nav = $("#navigator", v);
    nav.classList.toggle("collapsed");
    e.currentTarget.setAttribute("aria-expanded", nav.classList.contains("collapsed") ? "false" : "true");
  });
  // collapsed by default on small screens
  if (window.innerWidth <= 920) $("#navigator", v).classList.add("collapsed");

  $("#quitTest", v).addEventListener("click", () => { T = null; renderTests(); });
  $("#restartTest", v).addEventListener("click", () => {
    if (confirm("Restart this test from question 1? Your current answers will be cleared.")) startTest(T.test);
  });
  $("#prevQ", v).addEventListener("click", () => { if (T.idx > 0) { T.idx--; drawTestQuestion(); } });
  $("#nextQ", v).addEventListener("click", () => {
    if (T.idx < T.test.questions.length - 1) { T.idx++; drawTestQuestion(); }
  });
  $("#finishTest", v).addEventListener("click", tryFinishTest);

  const navGrid = $("#navGrid", v);
  T.test.questions.forEach((_, i) => {
    const b = el("button", { class: "qnav-btn", type: "button", "aria-label": `Go to question ${i + 1}` }, String(i + 1));
    b.addEventListener("click", () => { T.idx = i; drawTestQuestion(); });
    navGrid.appendChild(b);
  });

  drawTestQuestion();
}

function drawTestQuestion() {
  const { test, idx, state } = T;
  const q = test.questions[idx];
  const host = $("#qHost");
  host.innerHTML = "";

  $("#qCounter").textContent = `Question ${idx + 1} of ${test.questions.length}`;
  const answeredCount = state.filter(s => s.answered).length;
  $("#tFill").style.width = `${answeredCount / test.questions.length * 100}%`;

  $$("#navGrid .qnav-btn").forEach((b, i) => {
    b.className = "qnav-btn" +
      (i === idx ? " current" : "") +
      (state[i].answered ? (state[i].correct ? " q-correct" : " q-wrong") : "");
  });
  $("#prevQ").disabled = idx === 0;
  $("#nextQ").disabled = idx === test.questions.length - 1;

  if (state[idx].answered) {
    // already answered — show a locked summary with the explanation
    const s = state[idx];
    host.innerHTML = `
      <span class="skill-pill">${esc(SKILLS[q.skill] || "")}</span>
      <p class="q-text">${esc(q.q)}</p>
      <div class="mr-answer-row">
        <span class="mr-pill ${s.correct ? "correct" : "yours"}">Your answer: ${esc(s.userText)}</span>
        ${s.correct ? "" : `<span class="mr-pill correct">Correct: ${esc(correctTextOf(q))}</span>`}
      </div>
      <div class="feedback show ${s.correct ? "good" : "bad"}">
        <div class="fb-title">${s.correct ? "✅ You answered this correctly." : "❌ This one wasn’t right."}</div>
        <div class="fb-explain">${esc(q.explain)}</div>
        ${q.rule ? `<div class="fb-rule">📌 Remember: ${esc(q.rule)}</div>` : ""}
      </div>`;
    return;
  }

  host.appendChild(renderQuestion(q, {
    mode: "test",
    onGraded: (correct, userText) => {
      state[idx].answered = true;
      state[idx].correct = correct;
      state[idx].userText = userText;
      const answeredNow = state.filter(s => s.answered).length;
      $("#tFill").style.width = `${answeredNow / test.questions.length * 100}%`;
      $$("#navGrid .qnav-btn")[idx].classList.add(correct ? "q-correct" : "q-wrong");
      // add a continue button
      const nav = el("div", { class: "q-actions" });
      const cont = el("button", { class: "btn btn-primary btn-sm", type: "button" },
        idx === test.questions.length - 1 ? "Finish Test 🏁" : "Next Question →");
      cont.addEventListener("click", () => {
        if (idx === test.questions.length - 1) tryFinishTest();
        else { T.idx++; drawTestQuestion(); }
      });
      nav.appendChild(cont);
      host.appendChild(nav);
      cont.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }));
}

function correctTextOf(q) {
  switch (q.type) {
    case "mcq": return q.options[q.answer];
    case "tf": return q.answer ? "True" : "False";
    case "multi": return q.answer.map(i => q.options[i]).join(", ");
    case "fill": return String(q.answer);
    case "order": return q.items.join(" → ");
    case "sort": return q.items.map(it => `${it.t} → ${q.buckets[it.b]}`).join("; ");
    case "match": return q.left.map((lt, li) => `${lt} → ${q.right[q.answer[li]]}`).join("; ");
  }
  return "";
}

function tryFinishTest() {
  const unanswered = T.state.map((s, i) => (!s.answered ? i + 1 : null)).filter(x => x);
  if (unanswered.length) {
    const go = confirm(`You still have ${unanswered.length} unanswered question${unanswered.length > 1 ? "s" : ""} (Q${unanswered.join(", Q")}).\n\nPress OK to jump to the first one, or Cancel to submit the test as it is.`);
    if (go) {
      T.idx = unanswered[0] - 1;
      drawTestQuestion();
      return;
    }
  }
  finishTest();
}

function finishTest() {
  const { test, state } = T;
  const total = test.questions.length;
  const correct = state.filter(s => s.correct).length;
  const pct = Math.round(correct / total * 100);

  // per-skill breakdown
  const bySkill = {};
  test.questions.forEach((q, i) => {
    if (!bySkill[q.skill]) bySkill[q.skill] = { correct: 0, total: 0 };
    bySkill[q.skill].total++;
    if (state[i].correct) bySkill[q.skill].correct++;
  });

  // save progress
  const rec = P.tests[test.id] || { best: 0, attempts: 0 };
  rec.attempts++;
  rec.best = Math.max(rec.best, pct);
  rec.lastScore = correct; rec.lastTotal = total;
  rec.wrong = state.map((s, i) => (!s.correct ? { qi: i, user: s.userText || "(no answer)" } : null)).filter(x => x);
  P.tests[test.id] = rec;
  saveProgress();

  drawResults(test, state, correct, total, pct, bySkill);
}

function drawResults(test, state, correct, total, pct, bySkill) {
  const v = $("#view-tests");
  let level, msg, stars;
  if (pct >= 90) { level = "🌟 Maths Star!"; stars = "⭐⭐⭐"; msg = "Outstanding! You have truly mastered Unit 1. You are more than ready for your school test."; }
  else if (pct >= 75) { level = "🎉 Great Progress!"; stars = "⭐⭐"; msg = "Very well done! Review the few tricky spots below and you'll be unstoppable."; }
  else if (pct >= 60) { level = "💪 Keep Practising!"; stars = "⭐"; msg = "Good work — you know a lot already. Focus on the topics below, then try again."; }
  else { level = "🌱 Review and Try Again"; stars = "🌱"; msg = "Every mathematician starts somewhere! Revisit the lessons below, use the practice zone, and take the test again — you WILL improve."; }

  const ringColor = pct >= 75 ? "var(--mint)" : pct >= 60 ? "var(--yellow)" : "var(--peach)";
  const skillRows = Object.entries(bySkill).map(([sk, d]) => {
    const sp = Math.round(d.correct / d.total * 100);
    const cls = sp >= 75 ? "" : sp >= 50 ? "peach" : "peach";
    return `<div class="skill-row">
      <span class="s-name">${esc(SKILLS[sk])}</span>
      <div class="bar"><div class="bar-fill ${cls}" style="width:${sp}%"></div></div>
      <span class="s-frac">${d.correct}/${d.total}</span></div>`;
  }).join("");

  const weak = Object.entries(bySkill).filter(([, d]) => d.correct / d.total < 0.7);
  const strong = Object.entries(bySkill).filter(([, d]) => d.correct / d.total >= 0.7);
  const lessonMap = { ops: "Lessons 1.1 & 1.2", mult: "Lessons 1.3 & 1.4", div: "Lesson 1.5", pow: "Lesson 1.6", word: "Word Problems section" };

  const nextTest = TESTS[TESTS.findIndex(t => t.id === test.id) + 1];
  const wrongCount = total - correct;

  v.innerHTML = `
    <div class="card results-hero">
      <div class="star-burst" aria-hidden="true">${stars}</div>
      <div class="score-ring" style="background:conic-gradient(${ringColor} ${pct * 3.6}deg, #edf0f7 0deg)">
        <div class="inner"><span class="big">${pct}%</span><span class="small">${correct} / ${total}</span></div>
      </div>
      <h2>${level}</h2>
      <p class="perf-msg">${msg}</p>
      <div class="results-stats">
        <div class="stat-chip"><b>${correct}</b>Correct</div>
        <div class="stat-chip"><b>${wrongCount}</b>Incorrect</div>
        <div class="stat-chip"><b>${pct}%</b>Score</div>
        <div class="stat-chip"><b>${(P.tests[test.id] || {}).best || pct}%</b>Best</div>
      </div>
    </div>

    <div class="card skill-breakdown">
      <h3 style="font-family:var(--font-head);font-size:20px">📊 Skill Breakdown</h3>
      ${skillRows}
      <h4 style="font-family:var(--font-head);margin-top:18px">Topics to review</h4>
      <div class="review-topics">
        ${weak.length ? weak.map(([sk]) => `<span class="topic-tag">🔍 ${esc(SKILLS[sk])} — revisit ${lessonMap[sk]}</span>`).join("")
          : `<span class="topic-tag ok">🎉 Nothing urgent — you passed every skill area!</span>`}
        ${strong.map(([sk]) => `<span class="topic-tag ok">✔ ${esc(SKILLS[sk])}</span>`).join("")}
      </div>
    </div>

    <div class="q-actions" style="margin-top:18px">
      ${wrongCount ? `<button class="btn btn-secondary" id="reviewMistakes">🔍 Review My Mistakes (${wrongCount})</button>` : ""}
      <button class="btn btn-ghost" id="retakeBtn">🔁 Retake This Test</button>
      ${nextTest ? `<button class="btn btn-mint" id="nextTestBtn">Next: ${esc(nextTest.name)} →</button>` : ""}
      <button class="btn btn-ghost" id="homeBtn">🏠 Home</button>
    </div>
    <div id="mistakeHost" style="margin-top:22px"></div>`;

  if (wrongCount) $("#reviewMistakes", v).addEventListener("click", () => drawMistakeReview(test, state));
  $("#retakeBtn", v).addEventListener("click", () => startTest(test));
  if (nextTest) $("#nextTestBtn", v).addEventListener("click", () => startTest(nextTest));
  $("#homeBtn", v).addEventListener("click", () => showView("home"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Mistake review mode ---------------- */
function drawMistakeReview(test, state) {
  const host = $("#mistakeHost");
  host.innerHTML = `<div class="section-head"><h2 style="font-size:24px">🔍 Mistake Review</h2>
    <p>Study each mistake, then try the fresh mini-question underneath to prove you’ve got it!</p></div>`;

  const usedMini = {};
  test.questions.forEach((q, i) => {
    if (state[i].correct) return;
    const card = el("div", { class: "card mistake-review-item" });
    card.innerHTML = `
      <span class="mr-label">Question ${i + 1} · ${esc(SKILLS[q.skill])}</span>
      <p class="q-text" style="margin-top:6px">${esc(q.q)}</p>
      <div class="mr-answer-row">
        <span class="mr-pill yours">Your answer: ${esc(state[i].userText || "(no answer)")}</span>
        <span class="mr-pill correct">Correct answer: ${esc(correctTextOf(q))}</span>
      </div>
      <div class="feedback show bad" style="margin-top:12px">
        <div class="fb-explain">${esc(q.explain)}</div>
        ${q.rule ? `<div class="fb-rule">📌 Remember: ${esc(q.rule)}</div>` : ""}
      </div>`;

    // mini practice question from the pool
    const pool = MINI_POOL[q.skill] || [];
    if (pool.length) {
      usedMini[q.skill] = (usedMini[q.skill] || 0);
      const mini = pool[usedMini[q.skill] % pool.length];
      usedMini[q.skill]++;
      const mp = el("div", { class: "mini-practice" });
      mp.innerHTML = `<h5>✨ Your turn — try a similar one:</h5>`;
      mp.appendChild(renderQuestion({ type: "mcq", ...mini }, { mode: "practice" }));
      card.appendChild(mp);
    }
    host.appendChild(card);
  });
  host.scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   NAVIGATION / BOOT
   ============================================================ */
const RENDERERS = {
  home: renderHome, learn: renderLearn, vocab: renderVocab,
  practice: renderPractice, problems: renderProblems,
  quick: renderQuick, tests: renderTests
};

function showView(name) {
  if (!RENDERERS[name]) name = "home";
  T = null; // leaving any active test
  $$(".view").forEach(x => x.classList.remove("active"));
  $(`#view-${name}`).classList.add("active");
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === name));
  RENDERERS[name]();
  P.lastSection = name; saveProgress();
  $("#mainNav").classList.remove("open");
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) { e.preventDefault(); showView(nav.dataset.nav); }
});

$("#navToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  nav.classList.toggle("open");
  $("#navToggle").setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
});

$("#resetProgressBtn").addEventListener("click", () => {
  if (confirm("Reset ALL progress? Your lesson checkmarks, activity stars and test scores will be erased. This cannot be undone.")) {
    P = defaultProgress();
    saveProgress();
    toast("Progress reset. Fresh start! 🌱");
    showView("home");
  }
});

/* boot — return to last visited section */
showView(P.lastSection || "home");
