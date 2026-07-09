/* ============================================================
   script.js — App engine
   Maths 7 · Unit 2: Expressions, Formulae & Equations
   Bright EngMath © 2026
   ------------------------------------------------------------
   Sections:
     1. Progress storage (localStorage)
     2. Helpers (DOM, shuffle, toast, confetti, speech)
     3. Question renderer (8 interactive types)
     4. Activity runner (used by Lab / Practice / Reading / Vocab)
     5. Achievements
     6. Views: Home · Learn · Key Words · Algebra Lab · Reading ·
               Practice · Quiz Zone (+ results + mistake review) ·
               Progress
     7. Teacher Presentation Mode
     8. Router & init
   ============================================================ */

/* ============ 1. PROGRESS STORAGE ============ */
const STORE_KEY = "brightengmath_u2_expressions_v2";

const defaultProgress = () => ({
  lessonsDone: {},      // { L1: true }
  quickChecks: {},      // { L1: true }
  practiceDone: {},     // { pr_x: {score,total} }
  labDone: {},          // { lab_x: {score,total} }
  vocabActs: {},        // { flash: true }
  readingsDone: {},     // { read_easy: {score,total} }
  tests: Object.fromEntries(QUIZ_SETS.map(s => [s.id, { best: null, attempts: [], state: null }])),
  mistakes: {},         // { qid: {qid,set,skill,your,date,reviewed} }
  badges: [],
  recent: [],           // activity log strings
  lastSection: "home",
  lastLesson: null
});

let P = loadProgress();

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultProgress();
    const d = Object.assign(defaultProgress(), JSON.parse(raw));
    d.tests = Object.assign(defaultProgress().tests, d.tests || {});
    return d;
  } catch (e) { return defaultProgress(); }
}
function saveProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch (e) { /* private mode */ }
}
function logRecent(msg) {
  P.recent.unshift(`${msg} · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`);
  P.recent = P.recent.slice(0, 8);
}

/* ============ 2. HELPERS ============ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, attrs = {}, html = "") {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "dataset") Object.assign(n.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  if (html) n.innerHTML = html;
  return n;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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
  return String(s).toLowerCase().replace(/\s+/g, "").replace(/−/g, "-").replace(/×/g, "*");
}
let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function confetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = $("#confettiLayer");
  const colors = ["#7ec8f2", "#b9a7e8", "#7fd8b4", "#ffb48a", "#ffd166", "#ff8f80"];
  for (let i = 0; i < 36; i++) {
    const b = el("div", { class: "confetti-bit" });
    b.style.left = Math.random() * 100 + "vw";
    b.style.background = colors[i % colors.length];
    b.style.animationDuration = (2.2 + Math.random() * 1.6) + "s";
    b.style.animationDelay = (Math.random() * .5) + "s";
    layer.appendChild(b);
    setTimeout(() => b.remove(), 4600);
  }
}
function speak(text) {
  try {
    if (!("speechSynthesis" in window)) { toast("Read-aloud is not available on this device."); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB"; u.rate = .92;
    window.speechSynthesis.speak(u);
  } catch (e) { /* optional feature */ }
}

const GOOD_MSGS = ["Great job! 🎉", "Excellent work! ⭐", "Brilliant thinking! 💡", "Strong algebra skills! 💪",
  "Excellent detective work! 🔎", "Superb! You nailed it! 🏆", "Wonderful — keep it up! 🌟", "Spot on! ✨"];
const TRY_MSGS = ["Nice try! Look at the rule again.", "Almost! Check each term carefully.", "You are getting closer!",
  "Good effort — read the question one more time.", "Not quite — check the sign.", "Keep going, mathematicians make mistakes too!"];
let goodIdx = 0, tryIdx = 0;
const nextGood = () => GOOD_MSGS[(goodIdx++) % GOOD_MSGS.length];
const nextTry = () => TRY_MSGS[(tryIdx++) % TRY_MSGS.length];

/* Human-readable version of the correct answer for any question type */
function correctDisplay(q) {
  switch (q.type) {
    case "mcq": return q.options[q.answer];
    case "multi": return q.answers.map(i => q.options[i]).join(" · ");
    case "tf": return q.answer ? "True" : "False";
    case "fill": return q.answer;
    case "build": return q.answer;
    case "sort": return q.items.map(it => `${it.t} → ${q.buckets[it.b]}`).join(" · ");
    case "match": return q.left.map((l, i) => `${l} ↔ ${q.right[i]}`).join(" · ");
    case "order": return q.items.join(" → ");
    default: return "";
  }
}

/* ============ 3. QUESTION RENDERER ============ */
/*
  renderQuestion(q, { onGraded(correct, userDisplay), container, hideFeedback })
  Builds the interactive question inside `container`.
*/
function renderQuestion(q, opts = {}) {
  const wrap = el("div", { class: "q-wrap" });
  if (q.passage) {
    const pb = el("div", { class: "passage-box" });
    q.passage.forEach(p => pb.appendChild(el("p", {}, esc(p))));
    wrap.appendChild(pb);
  }
  wrap.appendChild(el("div", { class: "q-text" }, esc(q.q)));

  const body = el("div");
  wrap.appendChild(body);
  const actions = el("div", { class: "q-actions" });
  wrap.appendChild(actions);
  const submit = el("button", { class: "btn btn-primary" }, "Submit Answer");
  submit.disabled = true;
  actions.appendChild(submit);

  let graded = false;
  let getState = () => ({ ready: false, correct: false, display: "" });
  let showResult = () => {};

  function finishGrade() {
    if (graded) return;
    const st = getState();
    if (!st.ready) return;
    graded = true;
    submit.disabled = true;
    showResult(st);
    if (!opts.hideFeedback) {
      const fb = el("div", { class: "feedback " + (st.correct ? "good" : "bad") });
      fb.setAttribute("role", "status");
      fb.innerHTML =
        `<div class="fb-title">${st.correct ? "✅ " + esc(nextGood()) : "❌ " + esc(nextTry())}</div>` +
        `<p><strong>Your answer:</strong> ${esc(st.display || "—")}<br>` +
        `<strong>Correct answer:</strong> ${esc(correctDisplay(q))}</p>` +
        (q.explain ? `<p>${esc(q.explain)}</p>` : "") +
        (q.rule ? `<div class="fb-rule">📐 <strong>Rule:</strong> ${esc(q.rule)}</div>` : "");
      wrap.appendChild(fb);
      fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    if (opts.onGraded) opts.onGraded(st.correct, st.display);
  }
  submit.addEventListener("click", finishGrade);

  /* ----- MCQ / TF ----- */
  if (q.type === "mcq" || q.type === "tf") {
    const options = q.type === "tf" ? ["True", "False"] : q.options;
    const correctIdx = q.type === "tf" ? (q.answer ? 0 : 1) : q.answer;
    let sel = -1;
    const list = el("div", { class: "opt-list" });
    options.forEach((opt, i) => {
      const b = el("button", { class: "opt-btn", "aria-pressed": "false" },
        `<span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${esc(opt)}</span><span class="opt-mark" aria-hidden="true"></span>`);
      b.addEventListener("click", () => {
        if (graded) return;
        sel = i;
        $$(".opt-btn", list).forEach((x, xi) => {
          x.classList.toggle("selected", xi === i);
          x.setAttribute("aria-pressed", xi === i ? "true" : "false");
        });
        submit.disabled = false;
      });
      list.appendChild(b);
    });
    body.appendChild(list);
    getState = () => ({ ready: sel >= 0, correct: sel === correctIdx, display: options[sel] ?? "" });
    showResult = (st) => {
      $$(".opt-btn", list).forEach((x, xi) => {
        x.disabled = true;
        if (xi === correctIdx) { x.classList.add("correct"); $(".opt-mark", x).textContent = "✓ correct"; }
        else if (xi === sel && !st.correct) { x.classList.add("incorrect"); $(".opt-mark", x).textContent = "✗ your choice"; }
      });
    };
  }

  /* ----- MULTI SELECT ----- */
  else if (q.type === "multi") {
    const sel = new Set();
    const list = el("div", { class: "opt-list" });
    body.appendChild(el("p", { class: "read-progress" }, "Select every answer that applies, then submit."));
    q.options.forEach((opt, i) => {
      const b = el("button", { class: "opt-btn", "aria-pressed": "false" },
        `<span class="opt-letter">☐</span><span>${esc(opt)}</span><span class="opt-mark" aria-hidden="true"></span>`);
      b.addEventListener("click", () => {
        if (graded) return;
        if (sel.has(i)) sel.delete(i); else sel.add(i);
        b.classList.toggle("selected", sel.has(i));
        b.setAttribute("aria-pressed", sel.has(i) ? "true" : "false");
        $(".opt-letter", b).textContent = sel.has(i) ? "☑" : "☐";
        submit.disabled = sel.size === 0;
      });
      list.appendChild(b);
    });
    body.appendChild(list);
    getState = () => {
      const want = new Set(q.answers);
      const correct = sel.size === want.size && [...sel].every(i => want.has(i));
      return { ready: sel.size > 0, correct, display: [...sel].sort((a, b) => a - b).map(i => q.options[i]).join(" · ") };
    };
    showResult = () => {
      $$(".opt-btn", list).forEach((x, xi) => {
        x.disabled = true;
        const should = q.answers.includes(xi), did = sel.has(xi);
        if (should) { x.classList.add("correct"); $(".opt-mark", x).textContent = "✓"; }
        if (did && !should) { x.classList.add("incorrect"); $(".opt-mark", x).textContent = "✗"; }
      });
    };
  }

  /* ----- FILL ----- */
  else if (q.type === "fill") {
    const input = el("input", { class: "fill-input", type: "text", "aria-label": "Type your answer",
      placeholder: "Type your answer…" });
    input.addEventListener("input", () => { submit.disabled = input.value.trim() === ""; });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !submit.disabled) finishGrade(); });
    body.appendChild(input);
    getState = () => {
      const v = input.value.trim();
      const okList = [q.answer, ...(q.accept || [])].map(normAns);
      return { ready: v !== "", correct: okList.includes(normAns(v)), display: v };
    };
    showResult = () => { input.disabled = true; };
  }

  /* ----- BUILD (tap chips) ----- */
  else if (q.type === "build") {
    const area = el("div", { class: "build-area" });
    const slot = el("div", { class: "build-slot", "aria-label": "Your built answer" });
    const chips = el("div", { class: "chip-row" });
    const picked = [];
    shuffle(q.chunks.map((c, i) => ({ c, i }))).forEach(({ c, i }) => {
      const b = el("button", { class: "word-chip" }, esc(c));
      b.addEventListener("click", () => {
        if (graded || b.disabled) return;
        picked.push(c);
        b.disabled = true;
        slot.appendChild(el("span", {}, esc(c)));
        submit.disabled = picked.length === 0;
      });
      chips.appendChild(b);
    });
    const undo = el("button", { class: "btn btn-ghost btn-sm" }, "↩ Undo");
    undo.addEventListener("click", () => {
      if (graded || !picked.length) return;
      const last = picked.pop();
      slot.lastChild && slot.lastChild.remove();
      const btn = $$(".word-chip", chips).find(x => x.disabled && x.textContent === last);
      if (btn) btn.disabled = false;
      submit.disabled = picked.length === 0;
    });
    area.append(slot, chips, undo);
    body.appendChild(area);
    getState = () => ({ ready: picked.length > 0, correct: normAns(picked.join("")) === normAns(q.answer), display: picked.join(" ") });
    showResult = (st) => {
      slot.style.borderColor = st.correct ? "var(--good)" : "var(--bad)";
      $$(".word-chip", chips).forEach(x => x.disabled = true);
      undo.disabled = true;
    };
  }

  /* ----- SORT (tap item, tap bucket) ----- */
  else if (q.type === "sort") {
    const wrap2 = el("div", { class: "sort-wrap" });
    const pool = el("div", { class: "sort-items" });
    const bucketRow = el("div", { class: "sort-buckets" });
    const placement = new Map(); // itemIndex -> bucketIndex
    let active = -1;
    const itemBtns = [];

    body.appendChild(el("p", { class: "read-progress" }, "Tap an item, then tap the box it belongs in."));
    q.items.forEach((it, idx) => {
      const b = el("button", { class: "word-chip" }, esc(it.t));
      b.addEventListener("click", () => {
        if (graded) return;
        if (placement.has(idx)) { // take it back out
          placement.delete(idx);
          pool.appendChild(b);
          b.classList.remove("sort-item-active");
          active = -1;
          refreshTargets(false);
          submit.disabled = true;
          return;
        }
        active = idx;
        itemBtns.forEach(x => x.classList.remove("sort-item-active"));
        b.classList.add("sort-item-active");
        refreshTargets(true);
      });
      itemBtns.push(b);
      pool.appendChild(b);
    });
    const bucketBodies = [];
    q.buckets.forEach((bn, bi) => {
      const bk = el("div", { class: "bucket", role: "button", tabindex: "0", "aria-label": "Place item in " + bn });
      bk.appendChild(el("h4", {}, esc(bn)));
      const bod = el("div");
      bk.appendChild(bod);
      bucketBodies.push(bod);
      const drop = () => {
        if (graded || active < 0) return;
        placement.set(active, bi);
        const btn = itemBtns[active];
        btn.classList.remove("sort-item-active");
        bod.appendChild(btn);
        active = -1;
        refreshTargets(false);
        submit.disabled = placement.size !== q.items.length;
      };
      bk.addEventListener("click", (e) => { if (e.target === bk || e.target.tagName === "H4") drop(); else drop(); });
      bk.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); drop(); } });
      bucketRow.appendChild(bk);
    });
    function refreshTargets(on) { $$(".bucket", bucketRow).forEach(b => b.classList.toggle("target", on)); }
    wrap2.append(pool, bucketRow);
    body.appendChild(wrap2);
    getState = () => {
      const allPlaced = placement.size === q.items.length;
      const correct = allPlaced && q.items.every((it, idx) => placement.get(idx) === it.b);
      const display = q.items.map((it, idx) => placement.has(idx) ? `${it.t} → ${q.buckets[placement.get(idx)]}` : `${it.t} → ?`).join(" · ");
      return { ready: allPlaced, correct, display };
    };
    showResult = () => {
      itemBtns.forEach((btn, idx) => {
        btn.disabled = true;
        const ok = placement.get(idx) === q.items[idx].b;
        btn.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        btn.style.background = ok ? "var(--good-soft)" : "var(--bad-soft)";
      });
    };
  }

  /* ----- MATCH (click left, click right) ----- */
  else if (q.type === "match") {
    const grid = el("div", { class: "match-grid" });
    const colL = el("div", { class: "match-col" });
    const colR = el("div", { class: "match-col" });
    const rightOrder = shuffle(q.right.map((r, i) => i));
    const pairs = new Map(); // leftIdx -> rightIdx
    let activeL = -1;
    const lBtns = [], rBtns = new Map();

    body.appendChild(el("p", { class: "read-progress" }, "Tap a word on the left, then its match on the right."));
    q.left.forEach((lt, li) => {
      const b = el("button", { class: "match-btn" }, esc(lt));
      b.addEventListener("click", () => {
        if (graded) return;
        activeL = li;
        lBtns.forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
      });
      lBtns.push(b);
      colL.appendChild(b);
    });
    rightOrder.forEach(ri => {
      const b = el("button", { class: "match-btn" }, esc(q.right[ri]));
      b.addEventListener("click", () => {
        if (graded || activeL < 0) return;
        // clear old links to this right item
        for (const [l, r] of pairs) if (r === ri) pairs.delete(l);
        pairs.set(activeL, ri);
        lBtns[activeL].classList.remove("selected");
        lBtns[activeL].classList.add("paired");
        lBtns[activeL].dataset.pair = String(ri);
        refreshPairs();
        activeL = -1;
        submit.disabled = pairs.size !== q.left.length;
      });
      rBtns.set(ri, b);
      colR.appendChild(b);
    });
    function refreshPairs() {
      rBtns.forEach(b => b.classList.remove("paired"));
      lBtns.forEach(b => b.classList.remove("paired"));
      for (const [l, r] of pairs) { lBtns[l].classList.add("paired"); rBtns.get(r).classList.add("paired"); }
    }
    grid.append(colL, colR);
    body.appendChild(grid);
    getState = () => {
      const allPaired = pairs.size === q.left.length;
      const correct = allPaired && [...pairs].every(([l, r]) => l === r);
      const display = [...pairs].map(([l, r]) => `${q.left[l]} ↔ ${q.right[r]}`).join(" · ");
      return { ready: allPaired, correct, display };
    };
    showResult = () => {
      for (const [l, r] of pairs) {
        const ok = l === r;
        lBtns[l].classList.add(ok ? "correct" : "incorrect");
        rBtns.get(r).classList.add(ok ? "correct" : "incorrect");
      }
      [...lBtns, ...rBtns.values()].forEach(b => b.disabled = true);
    };
  }

  /* ----- ORDER (move up/down) ----- */
  else if (q.type === "order") {
    let current = shuffle(q.items.map((t, i) => i));
    if (current.every((v, i) => v === i)) current.reverse(); // never start solved
    const list = el("div", { class: "order-list" });
    body.appendChild(el("p", { class: "read-progress" }, "Use the arrows to put the steps in order (top = first)."));
    function draw() {
      list.innerHTML = "";
      current.forEach((origIdx, pos) => {
        const row = el("div", { class: "order-item" },
          `<span>${pos + 1}.</span><span>${esc(q.items[origIdx])}</span>`);
        const mv = el("span", { class: "ord-move" });
        const up = el("button", { class: "ord-btn", "aria-label": "Move up" }, "▲");
        const dn = el("button", { class: "ord-btn", "aria-label": "Move down" }, "▼");
        up.disabled = pos === 0; dn.disabled = pos === current.length - 1;
        up.addEventListener("click", () => { if (graded) return; [current[pos - 1], current[pos]] = [current[pos], current[pos - 1]]; draw(); });
        dn.addEventListener("click", () => { if (graded) return; [current[pos + 1], current[pos]] = [current[pos], current[pos + 1]]; draw(); });
        mv.append(up, dn);
        row.appendChild(mv);
        list.appendChild(row);
      });
      submit.disabled = false;
    }
    draw();
    body.appendChild(list);
    getState = () => ({
      ready: true,
      correct: current.every((v, i) => v === i),
      display: current.map(i => q.items[i]).join(" → ")
    });
    showResult = () => {
      $$(".order-item", list).forEach((row, pos) => {
        row.classList.add(current[pos] === pos ? "correct" : "incorrect");
      });
      $$(".ord-btn", list).forEach(b => b.disabled = true);
    };
  }

  (opts.container || document.body).appendChild(wrap);
  return wrap;
}

/* ============ 4. ACTIVITY RUNNER ============ */
/*
  runActivity({ container, title, icon, questions, intro, onFinish, tipAfter })
  Sequences questions with progress dots, next / retry, final score.
*/
function runActivity(cfg) {
  const { container, title, icon, questions } = cfg;
  container.innerHTML = "";
  const card = el("div", { class: "card" });
  container.appendChild(card);

  const head = el("div", { class: "runner-head" });
  head.appendChild(el("h3", {}, `${icon || "✏️"} ${esc(title)}`));
  const dots = el("div", { class: "step-dots", "aria-label": "Question progress" });
  questions.forEach((_, i) => dots.appendChild(el("span", { class: "step-dot" }, String(i + 1))));
  head.appendChild(dots);
  card.appendChild(head);
  if (cfg.intro) card.appendChild(el("p", { class: "read-progress" }, esc(cfg.intro)));
  if (cfg.passage) {
    const pb = el("div", { class: "passage-box" });
    if (cfg.passage.title) pb.appendChild(el("h4", {}, esc(cfg.passage.title)));
    cfg.passage.text.forEach(p => pb.appendChild(el("p", {}, esc(p))));
    card.appendChild(pb);
  }
  const qArea = el("div");
  card.appendChild(qArea);

  let idx = 0, score = 0, firstTry = true;
  const results = [];

  function refreshDots() {
    $$(".step-dot", dots).forEach((d, i) => {
      d.className = "step-dot" + (i === idx ? " now" : results[i] === true ? " done-good" : results[i] === false ? " done-bad" : "");
    });
  }
  function showQuestion() {
    qArea.innerHTML = "";
    firstTry = true;
    refreshDots();
    renderQuestion(questions[idx], {
      container: qArea,
      onGraded: (correct) => {
        if (firstTry) { results[idx] = correct; if (correct) score++; }
        const bar = el("div", { class: "q-actions" });
        if (!correct && cfg.allowRetry !== false) {
          const retry = el("button", { class: "btn btn-ghost" }, "🔁 Try Again");
          retry.addEventListener("click", () => { firstTry = false; showQuestion(); });
          bar.appendChild(retry);
        }
        const next = el("button", { class: "btn btn-primary" }, idx < questions.length - 1 ? "Next ▶" : "Finish 🏁");
        next.addEventListener("click", () => {
          if (idx < questions.length - 1) { idx++; showQuestion(); } else finish();
        });
        bar.appendChild(next);
        qArea.appendChild(bar);
        next.focus();
        refreshDots();
      }
    });
  }
  function finish() {
    refreshDots();
    qArea.innerHTML = "";
    const pct = Math.round(score / questions.length * 100);
    const banner = el("div", { class: "score-banner" });
    banner.appendChild(el("div", { class: "result-badge" }, pct >= 90 ? "🏆" : pct >= 70 ? "🌟" : pct >= 50 ? "💪" : "📚"));
    banner.appendChild(el("div", { class: "score-big" }, `${score} / ${questions.length}`));
    banner.appendChild(el("p", {}, pct >= 90 ? "Outstanding! You are a Unit 2 superstar!" :
      pct >= 70 ? "Great work — nearly perfect!" :
      pct >= 50 ? "Good effort — review the tricky ones and try again!" :
      "Keep practising — go back to the lesson and have another go!"));
    if (cfg.tipAfter) banner.appendChild(el("div", { class: "tip-box" }, "💡 " + esc(cfg.tipAfter)));
    const bar = el("div", { class: "q-actions", style: "justify-content:center" });
    const again = el("button", { class: "btn btn-ghost" }, "🔁 Do it again");
    again.addEventListener("click", () => { idx = 0; score = 0; results.length = 0; showQuestion(); });
    bar.appendChild(again);
    if (cfg.onExit) {
      const back = el("button", { class: "btn btn-primary" }, "Back to menu");
      back.addEventListener("click", cfg.onExit);
      bar.appendChild(back);
    }
    banner.appendChild(bar);
    qArea.appendChild(banner);
    if (cfg.onFinish) cfg.onFinish(score, questions.length);
  }
  showQuestion();
}

/* ============ 5. ACHIEVEMENTS ============ */
function award(id) {
  if (P.badges.includes(id)) return;
  const b = ACHIEVEMENTS.find(a => a.id === id);
  if (!b) return;
  P.badges.push(id);
  logRecent(`Badge earned: ${b.name}`);
  saveProgress();
  toast(`${b.icon} Badge earned: ${b.name}!`);
  confetti();
}
function checkGlobalBadges() {
  if (Object.keys(P.practiceDone).length >= PRACTICE_SETS.length) award("practice_champion");
  if (Object.keys(P.labDone).length >= 3) award("lab_scientist");
  if (Object.keys(P.readingsDone).length >= READINGS.length) award("reading_explorer");
  const strong = QUIZ_SETS.filter(s => (P.tests[s.id].best ?? -1) >= 75).length;
  if (Object.keys(P.lessonsDone).length >= LESSONS.length && strong >= 5) award("unit_master");
}
/* Stars for a quiz best score: 3★ ≥90, 2★ ≥75, 1★ ≥60 */
function starsFor(best) {
  if (best == null) return "";
  return best >= 90 ? "⭐⭐⭐" : best >= 75 ? "⭐⭐" : best >= 60 ? "⭐" : "🌑";
}

/* ============ 6. VIEWS ============ */
const VIEWS = ["home", "learn", "vocab", "lab", "reading", "practice", "tests", "progress"];

/* ---------- HOME (premium landing page) ---------- */
function renderHome() {
  const v = $("#view-home");
  v.innerHTML = "";

  /* HERO */
  const hero = el("div", { class: "hero" });
  hero.appendChild(el("div", { class: "hero-blob hb-1", "aria-hidden": "true" }));
  hero.appendChild(el("div", { class: "hero-blob hb-2", "aria-hidden": "true" }));
  hero.appendChild(el("div", { class: "hero-blob hb-3", "aria-hidden": "true" }));
  const heroGrid = el("div", { class: "hero-grid" });
  const heroLeft = el("div", { class: "hero-left" });
  heroLeft.appendChild(el("div", { class: "hero-kicker" }, "✦ Bright EngMath · Maths 7 Premium Course"));
  heroLeft.appendChild(el("h1", {}, `Unit 2<br><span class="hero-grad">Expressions, Formulae<br>&amp; Equations</span>`));
  heroLeft.appendChild(el("p", { class: "hero-sub" },
    "Letters can stand for numbers — that superpower is called <strong>algebra</strong>! Learn step by step, play your way through practice, and walk into the school test full of confidence. 🚀"));

  const cta = el("div", { class: "hero-cta" });
  const done = Object.keys(P.lessonsDone).length;
  const continueBtn = el("button", { class: "btn btn-primary btn-lg" }, done ? "▶ Continue Learning" : "🚀 Start Learning");
  continueBtn.addEventListener("click", () => {
    showView("learn");
    if (P.lastLesson) { const les = LESSONS.find(l => l.id === P.lastLesson); if (les) openLesson(les); }
  });
  const practiceBtn = el("button", { class: "btn btn-mint btn-lg" }, "🎯 Practice");
  practiceBtn.addEventListener("click", () => showView("practice"));
  const testBtn = el("button", { class: "btn btn-coral btn-lg" }, "📝 Take a Quiz");
  testBtn.addEventListener("click", () => showView("tests"));
  const teachBtn = el("button", { class: "btn btn-sun btn-lg" }, "🍎 Teacher Mode");
  teachBtn.addEventListener("click", openTeacherMode);
  cta.append(continueBtn, practiceBtn, testBtn, teachBtn);
  heroLeft.appendChild(cta);

  const facts = el("div", { class: "hero-facts" });
  [["6", "lessons"], ["150", "quiz questions"], ["76", "practice tasks"], ["11", "badges"]].forEach(([n, l]) => {
    const f = el("div", { class: "hero-fact" });
    f.appendChild(el("b", {}, n));
    f.appendChild(el("span", {}, l));
    facts.appendChild(f);
  });
  heroLeft.appendChild(facts);
  heroGrid.appendChild(heroLeft);

  /* hero art: stacked equation cards + progress ring */
  const art = el("div", { class: "hero-art", "aria-hidden": "true" });
  const prog = overallCompletion();
  art.innerHTML = `
    <div class="art-stack">
      <div class="float-card fc1">3x + 2</div>
      <div class="float-card fc2">n − 4 = 9</div>
      <div class="float-card fc3">y &gt; 5</div>
      <div class="float-card fc4">2(a + 3)</div>
      <div class="art-ring">
        <svg viewBox="0 0 120 120" width="130" height="130" role="img" aria-label="Unit completion ${prog} percent">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff" stroke-width="12" opacity=".6"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#gradRing)" stroke-width="12"
            stroke-linecap="round" stroke-dasharray="${Math.max(3, prog / 100 * 326.7)} 326.7"
            transform="rotate(-90 60 60)"/>
          <defs><linearGradient id="gradRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#3dbd8b"/><stop offset="1" stop-color="#56aef0"/>
          </linearGradient></defs>
          <text x="60" y="57" text-anchor="middle" font-size="24" font-weight="800" fill="#2f3a4f">${prog}%</text>
          <text x="60" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#5d6a82">complete</text>
        </svg>
      </div>
    </div>`;
  heroGrid.appendChild(art);
  hero.appendChild(heroGrid);
  v.appendChild(hero);

  /* HOW IT WORKS strip */
  const how = el("div", { class: "how-strip" });
  [["📖", "1 · Learn", "Six friendly lessons"], ["🎮", "2 · Practise", "Games with instant feedback"],
   ["📝", "3 · Quiz", "10 quiz sets, 150 questions"], ["🩹", "4 · Review", "Fix mistakes, earn badges"]].forEach(([ico, t, s], i, arr) => {
    const step = el("div", { class: "how-step" });
    step.appendChild(el("div", { class: "how-ico" }, ico));
    step.appendChild(el("div", {}, `<b>${t}</b><br><span>${s}</span>`));
    how.appendChild(step);
    if (i < arr.length - 1) how.appendChild(el("div", { class: "how-arrow", "aria-hidden": "true" }, "➜"));
  });
  v.appendChild(how);

  /* stats row */
  const practDone = Object.keys(P.practiceDone).length + Object.keys(P.labDone).length;
  const bests = QUIZ_SETS.map(s => P.tests[s.id].best).filter(b => b != null);
  const bestScore = bests.length ? Math.max(...bests) + "%" : "—";
  const stats = el("div", { class: "stat-row" });
  [["📖", `${done} / ${LESSONS.length}`, "Lessons complete"],
   ["🎯", `${practDone}`, "Practice sets done"],
   ["🏅", bestScore, "Best quiz score"],
   ["🌟", `${P.badges.length} / ${ACHIEVEMENTS.length}`, "Badges earned"]].forEach(([ico, n, l]) => {
    const c = el("div", { class: "card stat-card" });
    c.appendChild(el("div", { class: "stat-ico" }, ico));
    c.appendChild(el("div", { class: "stat-num" }, esc(n)));
    c.appendChild(el("div", { class: "stat-label" }, esc(l)));
    stats.appendChild(c);
  });
  v.appendChild(stats);

  /* quiz map */
  const qm = el("div", { class: "card quizmap-card" });
  qm.appendChild(el("h3", {}, "🗺️ Your quiz journey"));
  qm.appendChild(el("p", { class: "read-progress" }, "Ten quiz sets from warm-up to Final Challenge. Collect stars: ⭐ 60% · ⭐⭐ 75% · ⭐⭐⭐ 90%"));
  const map = el("div", { class: "quiz-map" });
  QUIZ_SETS.forEach(s => {
    const best = P.tests[s.id].best;
    const node = el("button", { class: "quiz-node qn-" + s.color + (best != null ? " played" : ""), "aria-label": s.name });
    node.innerHTML = `<span class="qn-ico">${s.icon}</span><span class="qn-num">${s.id}</span><span class="qn-stars">${starsFor(best)}</span>`;
    node.addEventListener("click", () => { showView("tests"); });
    map.appendChild(node);
  });
  qm.appendChild(map);
  v.appendChild(qm);

  /* what you'll learn */
  const lh = el("div", { class: "section-head", style: "margin-top:26px" });
  lh.appendChild(el("h2", {}, "🎒 What you'll master"));
  v.appendChild(lh);
  const grid = el("div", { class: "grid grid-3" });
  LESSONS.forEach(les => {
    const c = el("div", { class: "card lesson-card accent-" + les.color, tabindex: "0", role: "button" });
    c.appendChild(el("span", { class: `lesson-chip chip-${les.color}` }, esc(les.code)));
    c.appendChild(el("h3", {}, esc(les.title)));
    c.appendChild(el("p", { class: "read-progress" }, esc(les.objective)));
    if (P.lessonsDone[les.id]) c.appendChild(el("span", { class: "lesson-done-mark", "aria-label": "completed" }, "✅"));
    c.addEventListener("click", () => { showView("learn"); openLesson(les); });
    grid.appendChild(c);
  });
  v.appendChild(grid);
}

function overallCompletion() {
  const parts = [
    Object.keys(P.lessonsDone).length / LESSONS.length,
    Object.keys(P.practiceDone).length / PRACTICE_SETS.length,
    Object.keys(P.labDone).length / LAB_SETS.length,
    Object.keys(P.readingsDone).length / READINGS.length,
    QUIZ_SETS.filter(s => P.tests[s.id].attempts.length > 0).length / QUIZ_SETS.length
  ];
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length * 100);
}

/* ---------- LEARN ---------- */
function renderLearn() {
  const v = $("#view-learn");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "📖 Learn — six friendly lessons"));
  head.appendChild(el("span", { class: "lede" }, "Small steps, big wins. Finish each lesson's quick check to earn your ticks!"));
  v.appendChild(head);
  const grid = el("div", { class: "grid grid-3" });
  LESSONS.forEach(les => {
    const c = el("div", { class: "card lesson-card", tabindex: "0", role: "button", "aria-label": "Open lesson " + les.title });
    c.appendChild(el("span", { class: `lesson-chip chip-${les.color}` }, esc(les.code)));
    c.appendChild(el("h3", {}, esc(les.title)));
    c.appendChild(el("p", { class: "read-progress" }, esc(les.objective)));
    if (P.lessonsDone[les.id]) c.appendChild(el("span", { class: "lesson-done-mark" }, "✅"));
    const open = () => openLesson(les);
    c.addEventListener("click", open);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    grid.appendChild(c);
  });
  v.appendChild(grid);
}

function openLesson(les) {
  P.lastLesson = les.id; saveProgress();
  const v = $("#view-learn");
  v.innerHTML = "";
  const card = el("div", { class: "card" });
  v.appendChild(card);

  /* top bar with presentation controls */
  const top = el("div", { class: "lesson-top" });
  const back = el("button", { class: "btn btn-ghost btn-sm" }, "← All lessons");
  back.addEventListener("click", renderLearn);
  top.appendChild(back);
  const tools = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap" });
  const bigBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "false" }, "🔍 Large text");
  const fsBtn = el("button", { class: "btn btn-ghost btn-sm" }, "⛶ Full screen");
  const ansBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "true" }, "🙈 Hide answers");
  const printBtn = el("button", { class: "btn btn-ghost btn-sm" }, "🖨 Print summary");
  printBtn.addEventListener("click", () => window.print());
  tools.append(bigBtn, ansBtn, fsBtn, printBtn);
  top.appendChild(tools);
  card.appendChild(top);

  const bodyDiv = el("div", { class: "lesson-body" });
  card.appendChild(bodyDiv);
  bigBtn.addEventListener("click", () => {
    const on = bodyDiv.classList.toggle("bigtext");
    bigBtn.setAttribute("aria-pressed", on);
  });
  fsBtn.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else card.requestFullscreen && card.requestFullscreen().catch(() => toast("Full screen is not available here."));
  });

  bodyDiv.appendChild(el("span", { class: `lesson-chip chip-${les.color}` }, `Lesson ${les.code}`));
  bodyDiv.appendChild(el("h2", {}, esc(les.title)));
  bodyDiv.appendChild(el("div", { class: "objective-box" }, "🎯 Objective: " + esc(les.objective)));
  bodyDiv.appendChild(el("p", {}, esc(les.intro)));

  /* pattern box */
  const pb = el("div", { class: "pattern-box" });
  pb.appendChild(el("div", { class: "pattern-label" }, esc(les.patternBox.label)));
  const sb = el("div", { class: "sound-boxes" });
  les.patternBox.boxes.forEach(b => sb.appendChild(el("span", { class: `sound-box sb-${les.color}` }, esc(b))));
  pb.appendChild(sb);
  bodyDiv.appendChild(pb);

  /* demo table with hideable answers */
  const dt = el("table", { class: "mini-table" });
  dt.appendChild(el("caption", {}, "Try these together — answers can be hidden for class questioning!"));
  dt.appendChild(el("tr", {}, "<th>Question</th><th>Answer</th>"));
  les.patternBox.demo.forEach(([qq, aa]) => {
    const tr = el("tr");
    tr.appendChild(el("td", {}, esc(qq)));
    const td = el("td");
    td.appendChild(el("span", { class: "tm-hidden-answer", dataset: { ans: "1" } }, esc(aa)));
    tr.appendChild(td);
    dt.appendChild(tr);
  });
  bodyDiv.appendChild(dt);
  let answersShown = false;
  function setAnswers(show) {
    answersShown = show;
    $$(".tm-hidden-answer", bodyDiv).forEach(s => s.classList.toggle("revealed", show));
    ansBtn.textContent = show ? "🙈 Hide answers" : "👁 Show answers";
    ansBtn.setAttribute("aria-pressed", show);
  }
  ansBtn.addEventListener("click", () => setAnswers(!answersShown));
  setAnswers(false);

  /* key points */
  bodyDiv.appendChild(el("h3", {}, "🔑 Key points"));
  const ul = el("ul", { class: "keypoints" });
  les.keyPoints.forEach(k => ul.appendChild(el("li", {}, esc(k))));
  bodyDiv.appendChild(ul);

  /* examples — revealed one at a time */
  bodyDiv.appendChild(el("h3", {}, "✏️ Worked examples"));
  const exWrap = el("div");
  les.examples.forEach((ex, i) => {
    const it = el("div", { class: "example-item" + (i > 0 ? " hidden-example" : "") });
    it.appendChild(el("div", { class: "ex-line" }, esc(ex.line)));
    it.appendChild(el("div", { class: "ex-why" }, "💬 " + esc(ex.why)));
    exWrap.appendChild(it);
  });
  bodyDiv.appendChild(exWrap);
  const revealRow = el("div", { class: "reveal-row" });
  const revealBtn = el("button", { class: "btn btn-ghost btn-sm" }, "👇 Reveal next example");
  const revealAll = el("button", { class: "btn btn-ghost btn-sm" }, "Show all");
  revealRow.append(revealBtn, revealAll);
  bodyDiv.appendChild(revealRow);
  function revealNext() {
    const hidden = $(".hidden-example", exWrap);
    if (hidden) hidden.classList.remove("hidden-example");
    if (!$(".hidden-example", exWrap)) revealRow.style.display = "none";
  }
  revealBtn.addEventListener("click", revealNext);
  revealAll.addEventListener("click", () => { $$(".hidden-example", exWrap).forEach(x => x.classList.remove("hidden-example")); revealRow.style.display = "none"; });

  bodyDiv.appendChild(el("div", { class: "tip-box" }, "💡 <strong>Tip:</strong> " + esc(les.tip)));

  /* confusable */
  if (les.confusable) {
    const cb = el("div", { class: "confusable-box" });
    cb.appendChild(el("h3", {}, esc(les.confusable.title)));
    les.confusable.pairs.forEach(p => {
      const g = el("div", { class: "confuse-grid" });
      g.appendChild(el("div", { class: "confuse-cell" }, `${esc(p.a)}<br><b>${esc(p.aAns)}</b>`));
      g.appendChild(el("div", { class: "confuse-cell" }, `${esc(p.b)}<br><b>${esc(p.bAns)}</b>`));
      cb.appendChild(g);
      cb.appendChild(el("p", { class: "read-progress" }, esc(p.note)));
    });
    bodyDiv.appendChild(cb);
  }

  /* mistakes */
  bodyDiv.appendChild(el("h3", {}, "🚨 Common mistakes"));
  les.mistakes.forEach(m => {
    const row = el("div", { class: "mistake-row" });
    row.appendChild(el("div", { class: "mistake-wrong" }, "✗ " + esc(m.wrong)));
    row.appendChild(el("div", { class: "mistake-right" }, "✓ " + esc(m.right)));
    row.appendChild(el("div", { class: "mistake-note" }, esc(m.note)));
    bodyDiv.appendChild(row);
  });

  /* table */
  if (les.table) {
    const t = el("table", { class: "mini-table" });
    t.appendChild(el("caption", {}, esc(les.table.caption)));
    t.appendChild(el("tr", {}, les.table.head.map(h => `<th>${esc(h)}</th>`).join("")));
    les.table.rows.forEach(r => t.appendChild(el("tr", {}, r.map(cdt => `<td>${esc(cdt)}</td>`).join(""))));
    bodyDiv.appendChild(t);
  }

  /* teacher cards */
  const tc = el("div", { class: "teach-cards" });
  const ask = el("div", { class: "teach-card tc-ask" });
  ask.appendChild(el("h4", {}, "🙋 Ask the Class"));
  les.discussion.forEach(d => ask.appendChild(el("p", {}, esc(d))));
  const say = el("div", { class: "teach-card tc-say" });
  say.appendChild(el("h4", {}, "🗣 Say It Together"));
  say.appendChild(el("p", {}, esc(les.sayTogether)));
  const turn = el("div", { class: "teach-card tc-turn" });
  turn.appendChild(el("h4", {}, "✍️ Your Turn"));
  turn.appendChild(el("p", {}, esc(les.yourTurn)));
  tc.append(ask, say, turn);
  bodyDiv.appendChild(tc);

  /* quick check */
  bodyDiv.appendChild(el("h3", {}, "✅ Quick check"));
  const qcArea = el("div");
  bodyDiv.appendChild(qcArea);
  renderQuestion(les.quickCheck, {
    container: qcArea,
    onGraded: (correct) => {
      if (correct) { P.quickChecks[les.id] = true; saveProgress(); }
      const doneBar = el("div", { class: "q-actions" });
      const doneBtn = el("button", { class: "btn btn-mint" }, "🎉 Mark lesson complete");
      doneBtn.addEventListener("click", () => {
        if (!P.lessonsDone[les.id]) {
          P.lessonsDone[les.id] = true;
          logRecent(`Lesson ${les.code} completed`);
          saveProgress();
          award("first_lesson");
          checkGlobalBadges();
          toast("Lesson " + les.code + " complete! ⭐");
          confetti();
        }
        renderLearn();
      });
      doneBar.appendChild(doneBtn);
      qcArea.appendChild(doneBar);
    }
  });

  /* prev/next lesson */
  const li = LESSONS.indexOf(les);
  const navRow = el("div", { class: "lesson-nav-row" });
  const prev = el("button", { class: "btn btn-ghost" }, "◀ Previous lesson");
  prev.disabled = li === 0;
  prev.addEventListener("click", () => openLesson(LESSONS[li - 1]));
  const next = el("button", { class: "btn btn-ghost" }, "Next lesson ▶");
  next.disabled = li === LESSONS.length - 1;
  next.addEventListener("click", () => openLesson(LESSONS[li + 1]));
  navRow.append(prev, next);
  card.appendChild(navRow);
  window.scrollTo({ top: 0 });
}

/* ---------- KEY WORDS (VOCAB) ---------- */
function renderVocab() {
  const v = $("#view-vocab");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "🔤 Key Words"));
  head.appendChild(el("span", { class: "lede" }, "Every word you need for Unit 2 — tap 🔊 to hear it."));
  v.appendChild(head);

  /* activities row */
  const actGrid = el("div", { class: "grid grid-4", style: "margin-bottom:18px" });
  const ACTS = [
    { id: "flash", icon: "🃏", name: "Flashcards", run: vocabFlashcards },
    { id: "matchmean", icon: "🔗", name: "Match the Meaning", run: vocabMatch },
    { id: "missing", icon: "✏️", name: "Missing Letters", run: vocabMissing },
    { id: "catsort", icon: "🗂️", name: "Category Sort", run: vocabSort },
    { id: "odd", icon: "🕵️", name: "Odd One Out", run: vocabOdd },
    { id: "unscramble", icon: "🌀", name: "Unscramble", run: vocabUnscramble },
    { id: "memory", icon: "🧠", name: "Memory Pairs", run: vocabMemory },
    { id: "hunt", icon: "🔍", name: "Word Hunt", run: vocabHunt }
  ];
  ACTS.forEach(a => {
    const t = el("div", { class: "card activity-tile", tabindex: "0", role: "button" });
    t.appendChild(el("div", { class: "tile-icon" }, a.icon));
    t.appendChild(el("h3", {}, esc(a.name)));
    if (P.vocabActs[a.id]) t.appendChild(el("span", { class: "tile-done" }, "done ✓"));
    const go = () => { areaCard.innerHTML = ""; a.run(areaCard, () => { P.vocabActs[a.id] = true; saveProgress(); renderVocab(); }); areaCard.scrollIntoView({ behavior: "smooth" }); };
    t.addEventListener("click", go);
    t.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    actGrid.appendChild(t);
  });
  v.appendChild(actGrid);
  const areaCard = el("div");
  v.appendChild(areaCard);

  /* filter tabs */
  const tabs = el("div", { class: "vocab-tabs", role: "tablist" });
  VOCAB_CATS.forEach((cat, i) => {
    const b = el("button", { class: "tab-btn" + (i === 0 ? " active" : ""), role: "tab" }, esc(cat));
    b.addEventListener("click", () => {
      $$(".tab-btn", tabs).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      drawCards(cat);
    });
    tabs.appendChild(b);
  });
  v.appendChild(tabs);

  const printRow = el("div", { style: "margin-bottom:10px" });
  const printBtn = el("button", { class: "btn btn-ghost btn-sm" }, "🖨 Print word list");
  printBtn.addEventListener("click", () => window.print());
  printRow.appendChild(printBtn);
  v.appendChild(printRow);

  const grid = el("div", { class: "vocab-grid" });
  v.appendChild(grid);
  function drawCards(cat) {
    grid.innerHTML = "";
    VOCAB.filter(w => cat === "All" || w.cat === cat).forEach(w => {
      const c = el("div", { class: "card vocab-card" });
      c.appendChild(el("span", { class: "vocab-pattern" }, esc(w.pattern || w.cat)));
      const wd = el("div", { class: "vocab-word" }, `<span aria-hidden="true">${w.icon}</span> ${esc(w.w)}`);
      const sp = el("button", { class: "speak-btn", "aria-label": "Hear the word " + w.w }, "🔊");
      sp.addEventListener("click", () => speak(w.w + ". " + w.meaning));
      wd.appendChild(sp);
      c.appendChild(wd);
      c.appendChild(el("div", { class: "vocab-say" }, "say: " + esc(w.say)));
      c.appendChild(el("div", { class: "vocab-syll" }, esc(w.syll) + " · " + esc(w.cat)));
      c.appendChild(el("p", { class: "vocab-meaning" }, esc(w.meaning)));
      c.appendChild(el("p", { class: "vocab-ex" }, "“" + esc(w.ex) + "”"));
      if (w.warn) c.appendChild(el("div", { class: "vocab-warn" }, "✏️ " + esc(w.warn)));
      grid.appendChild(c);
    });
  }
  drawCards("All");
}

/* vocab activities */
function vocabFlashcards(container, onDone) {
  container.innerHTML = "";
  const card = el("div", { class: "card" });
  container.appendChild(card);
  card.appendChild(el("h3", {}, "🃏 Flashcards — tap the card to flip"));
  const stage = el("div", { class: "flashcard-stage" });
  card.appendChild(stage);
  let i = 0;
  const order = shuffle(VOCAB.map((_, x) => x));
  const fc = el("div", { class: "flashcard", tabindex: "0", role: "button", "aria-label": "Flashcard, press Enter to flip" });
  const inner = el("div", { class: "flashcard-inner" });
  fc.appendChild(inner);
  stage.appendChild(fc);
  const counter = el("div", { class: "read-progress" });
  const row = el("div", { class: "q-actions", style: "justify-content:center" });
  const prev = el("button", { class: "btn btn-ghost btn-sm" }, "◀ Previous");
  const flip = el("button", { class: "btn btn-primary btn-sm" }, "Flip 🔄");
  const nxt = el("button", { class: "btn btn-ghost btn-sm" }, "Next ▶");
  const done = el("button", { class: "btn btn-mint btn-sm" }, "Finish ✓");
  row.append(prev, flip, nxt, done);
  stage.append(counter, row);
  function draw() {
    const w = VOCAB[order[i]];
    fc.classList.remove("flipped");
    inner.innerHTML = "";
    const front = el("div", { class: "fc-face" });
    front.appendChild(el("div", {}, w.icon));
    front.appendChild(el("div", { class: "fc-word" }, esc(w.w)));
    front.appendChild(el("div", { class: "vocab-say" }, "say: " + esc(w.say)));
    const back = el("div", { class: "fc-face fc-back" });
    back.appendChild(el("p", { style: "font-weight:800" }, esc(w.meaning)));
    back.appendChild(el("p", { class: "vocab-ex" }, "“" + esc(w.ex) + "”"));
    inner.append(front, back);
    counter.textContent = `Card ${i + 1} of ${order.length}`;
  }
  const doFlip = () => fc.classList.toggle("flipped");
  fc.addEventListener("click", doFlip);
  fc.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doFlip(); } });
  flip.addEventListener("click", doFlip);
  prev.addEventListener("click", () => { i = (i - 1 + order.length) % order.length; draw(); });
  nxt.addEventListener("click", () => { i = (i + 1) % order.length; draw(); });
  done.addEventListener("click", () => { toast("Flashcards finished — word wizard! 🧙"); onDone(); });
  draw();
}
function pickWords(n, filter) {
  return shuffle(VOCAB.filter(filter || (() => true))).slice(0, n);
}
function vocabMatch(container, onDone) {
  const qs = [];
  for (let r = 0; r < 2; r++) {
    const ws = pickWords(4);
    qs.push({ type: "match", q: "Match each word to its meaning.",
      left: ws.map(w => w.w), right: ws.map(w => w.meaning),
      explain: ws.map(w => `${w.w}: ${w.meaning}`).join(" · "),
      rule: "Say the word, then say its job in maths." });
  }
  runActivity({ container, title: "Match the Meaning", icon: "🔗", questions: qs, onFinish: onDone });
}
function gapWord(w) {
  let out = "";
  for (let i = 0; i < w.length; i++) {
    const ch = w[i];
    out += (i > 0 && i < w.length - 1 && "aeiou".includes(ch)) ? "▢" : ch;
  }
  return out;
}
function vocabMissing(container, onDone) {
  const qs = pickWords(5, w => !w.w.includes(" ")).map(w => ({
    type: "fill", q: `Complete the word and type it in full: ${gapWord(w.w)}\n(Meaning: ${w.meaning})`,
    answer: w.w, accept: [w.w],
    explain: `The word is “${w.w}” — ${w.meaning}`,
    rule: w.warn || "Sound it out syllable by syllable: " + w.syll
  }));
  runActivity({ container, title: "Missing Letters", icon: "✏️", questions: qs, onFinish: onDone });
}
function vocabSort(container, onDone) {
  const cats = ["Expression Words", "Equation Words", "Inequality Words"];
  const qs = [];
  for (let r = 0; r < 2; r++) {
    const chosen = shuffle(cats).slice(0, 2);
    const items = [];
    chosen.forEach((c, bi) => pickWords(3, w => w.cat === c).forEach(w => items.push({ t: w.w, b: bi })));
    qs.push({ type: "sort", q: "Sort the words into their families.",
      buckets: chosen, items: shuffle(items),
      explain: "Expression words describe building and simplifying; equation words describe solving; inequality words describe ranges.",
      rule: "Group key words by the job they do." });
  }
  runActivity({ container, title: "Category Sort", icon: "🗂️", questions: qs, onFinish: onDone });
}
function vocabOdd(container, onDone) {
  const combos = [
    { same: "Expression Words", odd: "Inequality Words" },
    { same: "Equation Words", odd: "Expression Words" },
    { same: "Inequality Words", odd: "Equation Words" },
    { same: "Core Words", odd: "Inequality Words" }
  ];
  const qs = combos.map(cb => {
    const same = pickWords(3, w => w.cat === cb.same);
    const odd = pickWords(1, w => w.cat === cb.odd)[0];
    const opts = shuffle([...same.map(w => w.w), odd.w]);
    return { type: "mcq", q: `Find the odd one out.`, options: opts, answer: opts.indexOf(odd.w),
      explain: `“${odd.w}” belongs to ${odd.cat}. The other three are all ${cb.same}.`,
      rule: "Three share a family — one is a visitor!" };
  });
  runActivity({ container, title: "Odd One Out", icon: "🕵️", questions: qs, onFinish: onDone });
}
function chunkWord(w) {
  const chunks = [];
  let i = 0;
  while (i < w.length) { const n = Math.min(2 + (w.length - i) % 2, w.length - i); chunks.push(w.slice(i, i + n)); i += n; }
  return chunks;
}
function vocabUnscramble(container, onDone) {
  const qs = pickWords(5, w => !w.w.includes(" ") && w.w.length >= 5).map(w => ({
    type: "build", q: `Unscramble the chunks to build the word meaning: “${w.meaning}”`,
    chunks: chunkWord(w.w), answer: w.w,
    explain: `The word is “${w.w}” (${w.syll}).`,
    rule: "Read your built word aloud — does it sound right?"
  }));
  runActivity({ container, title: "Unscramble", icon: "🌀", questions: qs, onFinish: onDone });
}
function vocabMemory(container, onDone) {
  container.innerHTML = "";
  const card = el("div", { class: "card" });
  container.appendChild(card);
  card.appendChild(el("h3", {}, "🧠 Memory Pairs — match each word to its meaning"));
  card.appendChild(el("p", { class: "read-progress" }, "Tap two tiles. Find all 6 pairs!"));
  const words = pickWords(6);
  const tiles = shuffle([
    ...words.map((w, i) => ({ key: i, label: w.icon + " " + w.w })),
    ...words.map((w, i) => ({ key: i, label: w.meaning }))
  ]);
  const grid = el("div", { class: "memory-grid" });
  card.appendChild(grid);
  let open = [], matched = 0, lock = false;
  tiles.forEach(t => {
    const b = el("button", { class: "memory-tile", "aria-label": "Memory tile" }, "❔");
    b.dataset.key = t.key;
    b.addEventListener("click", () => {
      if (lock || b.classList.contains("revealed") || b.classList.contains("matched")) return;
      b.classList.add("revealed");
      b.textContent = t.label;
      open.push(b);
      if (open.length === 2) {
        lock = true;
        const [a, c] = open;
        if (a.dataset.key === c.dataset.key) {
          setTimeout(() => {
            a.classList.add("matched"); c.classList.add("matched");
            open = []; lock = false; matched++;
            if (matched === 6) {
              toast(nextGood());
              confetti();
              const doneBtn = el("button", { class: "btn btn-mint", style: "margin-top:12px" }, "Finish ✓");
              doneBtn.addEventListener("click", onDone);
              card.appendChild(doneBtn);
            }
          }, 350);
        } else {
          setTimeout(() => {
            a.classList.remove("revealed"); c.classList.remove("revealed");
            a.textContent = "❔"; c.textContent = "❔";
            open = []; lock = false;
          }, 800);
        }
      }
    });
    grid.appendChild(b);
  });
}
function vocabHunt(container, onDone) {
  const qs = [
    { type: "mcq", q: "Word hunt! “To find n, Leo used the INVERSE OPERATION and subtracted 8 from both sides.” What did Leo do?",
      options: ["He guessed", "He used the opposite operation to undo +8", "He doubled both sides", "He removed the equals sign"], answer: 1,
      explain: "The inverse of adding 8 is subtracting 8 — Leo undid the operation.", rule: "inverse = opposite" },
    { type: "mcq", q: "“The COEFFICIENT in 9k + 4 tells us how many k's we have.” Which number is it?",
      options: ["4", "9", "k", "13"], answer: 1,
      explain: "9 multiplies the k, so the coefficient is 9.", rule: "Coefficient = multiplier of the letter." },
    { type: "mcq", q: "“x > 2 is an OPEN INTERVAL, so one number is left out.” Which number is left out?",
      options: ["0", "1", "2", "3"], answer: 2,
      explain: "The boundary 2 itself is not included in x > 2.", rule: "Open circle = boundary excluded." },
    { type: "mcq", q: "“Freya SIMPLIFIED her expression before checking it.” What did Freya do?",
      options: ["Made it longer", "Wrote it in its shortest form", "Deleted it", "Solved for x"], answer: 1,
      explain: "Simplifying means collecting like terms to write the expression in its shortest form.", rule: "simplify = shortest form" }
  ];
  runActivity({ container, title: "Word Hunt", icon: "🔍", questions: qs, onFinish: onDone });
}

/* ---------- ALGEBRA LAB ---------- */
function renderLab() {
  const v = $("#view-lab");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "🔬 Algebra Lab"));
  head.appendChild(el("span", { class: "lede" }, "Six hands-on stations. Master the patterns behind every Unit 2 question!"));
  v.appendChild(head);
  const grid = el("div", { class: "grid grid-3" });
  const area = el("div", { style: "margin-top:18px" });
  LAB_SETS.forEach(set => {
    const t = el("div", { class: "card activity-tile", tabindex: "0", role: "button" });
    t.appendChild(el("div", { class: "tile-icon" }, set.icon));
    t.appendChild(el("h3", {}, esc(set.title)));
    t.appendChild(el("p", { class: "read-progress" }, esc(set.blurb)));
    const d = P.labDone[set.id];
    if (d) t.appendChild(el("span", { class: "tile-done" }, `✓ ${d.score}/${d.total}`));
    const go = () => {
      runActivity({
        container: area, title: set.title, icon: set.icon, questions: set.questions,
        tipAfter: set.tipAfter,
        onExit: renderLab,
        onFinish: (s, tt) => {
          P.labDone[set.id] = { score: s, total: tt };
          logRecent(`Lab: ${set.title} ${s}/${tt}`);
          saveProgress();
          checkGlobalBadges();
        }
      });
      area.scrollIntoView({ behavior: "smooth" });
    };
    t.addEventListener("click", go);
    t.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    grid.appendChild(t);
  });
  v.appendChild(grid);
  v.appendChild(area);
}

/* ---------- READING ---------- */
function renderReading() {
  const v = $("#view-reading");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "📚 Reading Practice"));
  head.appendChild(el("span", { class: "lede" }, "Three original maths stories — read, highlight, then answer."));
  v.appendChild(head);
  const grid = el("div", { class: "grid grid-3" });
  READINGS.forEach(r => {
    const c = el("div", { class: "card activity-tile", tabindex: "0", role: "button" });
    c.appendChild(el("div", { class: "tile-icon" }, r.icon));
    c.appendChild(el("h3", {}, esc(r.level)));
    c.appendChild(el("p", {}, `<strong>${esc(r.title)}</strong> · ⏱ about ${r.minutes} min · ${r.questions.length} questions`));
    const d = P.readingsDone[r.id];
    if (d) c.appendChild(el("span", { class: "tile-done" }, `✓ ${d.score}/${d.total}`));
    const go = () => openReading(r);
    c.addEventListener("click", go);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    grid.appendChild(c);
  });
  v.appendChild(grid);
}

function openReading(r) {
  const v = $("#view-reading");
  v.innerHTML = "";
  const card = el("div", { class: "card" });
  v.appendChild(card);
  const back = el("button", { class: "btn btn-ghost btn-sm" }, "← All readings");
  back.addEventListener("click", renderReading);
  card.appendChild(back);
  card.appendChild(el("h2", { style: "margin-top:10px" }, `${r.icon} ${esc(r.title)}`));
  card.appendChild(el("p", { class: "read-progress" }, esc(r.level) + " · " + esc(r.intro)));

  /* reading helper toolbar */
  const bar = el("div", { class: "reading-toolbar", role: "toolbar", "aria-label": "Reading helpers" });
  const hlBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "true" }, "🖍 Highlight key words");
  const sizeBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "false" }, "🔍 Larger text");
  const focusBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "false" }, "🎯 Line focus");
  const vsBtn = el("button", { class: "btn btn-ghost btn-sm", "aria-pressed": "true" }, "📖 Word help");
  const readBtn = el("button", { class: "btn btn-ghost btn-sm" }, "🔊 Read aloud");
  const printBtn = el("button", { class: "btn btn-ghost btn-sm" }, "🖨 Print");
  bar.append(hlBtn, sizeBtn, focusBtn, vsBtn, readBtn, printBtn);
  card.appendChild(bar);

  const vs = el("div", { class: "vocab-support" });
  vs.innerHTML = "<strong>📖 Word help:</strong> " + r.vocabSupport.map(([w, m]) => `<b>${esc(w)}</b> = ${esc(m)}`).join(" · ");
  card.appendChild(vs);

  const rt = el("div", { class: "reading-text" });
  const hlRegex = new RegExp("\\b(" + r.highlight.join("|") + ")\\b", "gi");
  r.text.forEach((p) => {
    const para = el("p", {}, esc(p).replace(hlRegex, m => `<span class="hl-target">${m}</span>`));
    para.addEventListener("click", () => {
      if (!focusOn) return;
      $$("p", rt).forEach(x => x.classList.add("line-focus-dim"));
      para.classList.remove("line-focus-dim");
    });
    rt.appendChild(para);
  });
  card.appendChild(rt);

  let focusOn = false;
  hlBtn.addEventListener("click", () => {
    const spans = $$(".hl-target", rt);
    const on = spans.length && spans[0].style.background !== "none";
    spans.forEach(s => { s.style.background = on ? "none" : ""; s.style.borderBottom = on ? "none" : ""; });
    hlBtn.setAttribute("aria-pressed", String(!on));
  });
  sizeBtn.addEventListener("click", () => {
    const on = rt.classList.toggle("rt-large");
    sizeBtn.setAttribute("aria-pressed", on);
  });
  focusBtn.addEventListener("click", () => {
    focusOn = !focusOn;
    focusBtn.setAttribute("aria-pressed", focusOn);
    if (!focusOn) $$("p", rt).forEach(x => x.classList.remove("line-focus-dim"));
    else toast("Tap a paragraph to focus on it.");
  });
  vsBtn.addEventListener("click", () => {
    const hidden = vs.style.display === "none";
    vs.style.display = hidden ? "" : "none";
    vsBtn.setAttribute("aria-pressed", String(hidden));
  });
  readBtn.addEventListener("click", () => speak(r.text.join(" ")));
  printBtn.addEventListener("click", () => window.print());

  const startBtn = el("button", { class: "btn btn-primary btn-lg", style: "margin-top:14px" }, `Start the ${r.questions.length} questions ▶`);
  card.appendChild(startBtn);
  const qArea = el("div", { style: "margin-top:16px" });
  v.appendChild(qArea);
  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    runActivity({
      container: qArea, title: r.title + " — questions", icon: "❓",
      questions: r.questions,
      onExit: renderReading,
      onFinish: (s, t) => {
        P.readingsDone[r.id] = { score: s, total: t };
        logRecent(`Reading: ${r.title} ${s}/${t}`);
        saveProgress();
        checkGlobalBadges();
      }
    });
    qArea.scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- PRACTICE ZONE ---------- */
function renderPractice() {
  const v = $("#view-practice");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "🎯 Quick Practice Zone"));
  head.appendChild(el("span", { class: "lede" }, "Warm up here before the Quiz Zone. Instant feedback on every answer!"));
  v.appendChild(head);
  const grid = el("div", { class: "grid grid-3" });
  const area = el("div", { style: "margin-top:18px" });
  PRACTICE_SETS.forEach(set => {
    const t = el("div", { class: "card activity-tile", tabindex: "0", role: "button" });
    t.appendChild(el("div", { class: "tile-icon" }, set.icon));
    t.appendChild(el("h3", {}, esc(set.title)));
    t.appendChild(el("p", { class: "read-progress" }, esc(set.blurb)));
    const d = P.practiceDone[set.id];
    if (d) t.appendChild(el("span", { class: "tile-done" }, `✓ ${d.score}/${d.total}`));
    const go = () => {
      runActivity({
        container: area, title: set.title, icon: set.icon, questions: set.questions,
        passage: set.reading || null,
        onExit: renderPractice,
        onFinish: (s, tt) => {
          P.practiceDone[set.id] = { score: s, total: tt };
          logRecent(`Practice: ${set.title} ${s}/${tt}`);
          saveProgress();
          if (set.badge) award(set.badge);
          checkGlobalBadges();
        }
      });
      area.scrollIntoView({ behavior: "smooth" });
    };
    t.addEventListener("click", go);
    t.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    grid.appendChild(t);
  });
  v.appendChild(grid);
  v.appendChild(area);
}

/* ---------- QUIZ ZONE ---------- */
function renderTests() {
  const v = $("#view-tests");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "📝 Quiz Zone"));
  head.appendChild(el("span", { class: "lede" }, "Ten quiz sets · 15 questions each · no timer. Collect stars: ⭐ 60% · ⭐⭐ 75% · ⭐⭐⭐ 90%"));
  v.appendChild(head);

  const grid = el("div", { class: "grid grid-3" });
  QUIZ_SETS.forEach(ts => {
    const info = P.tests[ts.id];
    const c = el("div", { class: "card quiz-card accent-" + ts.color });
    const top = el("div", { class: "quiz-card-top" });
    top.appendChild(el("span", { class: "quiz-ico" }, ts.icon));
    top.appendChild(el("span", { class: `lesson-chip chip-${ts.color}` }, esc(ts.level)));
    if (info.best != null) top.appendChild(el("span", { class: "quiz-stars" }, starsFor(info.best)));
    c.appendChild(top);
    c.appendChild(el("h3", {}, esc(ts.name)));
    c.appendChild(el("p", { class: "read-progress" }, esc(ts.blurb)));
    c.appendChild(el("p", { class: "quiz-meta" },
      `15 questions · Best: <strong>${info.best != null ? info.best + "%" : "—"}</strong> · Tries: <strong>${info.attempts.length}</strong>` +
      (info.state ? " · <em>⏸ paused</em>" : "")));
    const row = el("div", { class: "q-actions" });
    if (info.state) {
      const resume = el("button", { class: "btn btn-primary" }, "▶ Resume quiz");
      resume.addEventListener("click", () => startTest(ts.id, true));
      const restart = el("button", { class: "btn btn-ghost" }, "↺ Restart");
      restart.addEventListener("click", () => {
        if (confirm("Restart this quiz? Your unfinished answers will be lost.")) {
          P.tests[ts.id].state = null; saveProgress(); startTest(ts.id, false);
        }
      });
      row.append(resume, restart);
    } else {
      const start = el("button", { class: "btn btn-primary" }, info.attempts.length ? "↺ Play again" : "Start quiz ▶");
      start.addEventListener("click", () => startTest(ts.id, false));
      row.appendChild(start);
    }
    c.appendChild(row);
    grid.appendChild(c);
  });
  v.appendChild(grid);

  /* mistake review entry */
  const mrCard = el("div", { class: "card", style: "margin-top:18px" });
  const nMist = Object.values(P.mistakes).filter(m => !m.reviewed).length;
  mrCard.appendChild(el("h3", {}, "🩹 Mistake Review"));
  mrCard.appendChild(el("p", {}, nMist ?
    `You have <strong>${nMist}</strong> mistake${nMist > 1 ? "s" : ""} waiting for review. Fixing mistakes is how mathematicians grow! 🌱` :
    "No mistakes waiting — brilliant! Finish a quiz to collect (and fix!) any slips."));
  if (Object.keys(P.mistakes).length) {
    const b = el("button", { class: "btn btn-coral" }, "Open Mistake Review");
    b.addEventListener("click", renderMistakeReview);
    mrCard.appendChild(b);
  }
  v.appendChild(mrCard);
}

function testQuestions(setId) { return QUESTIONS.filter(q => q.set === setId); }

function startTest(setId, resume) {
  const qs = testQuestions(setId);
  const T = P.tests[setId];
  if (!resume || !T.state) {
    T.state = { idx: 0, answers: {} };
    saveProgress();
  }
  const state = T.state;
  const meta = QUIZ_SETS.find(t => t.id === setId);
  const v = $("#view-tests");
  v.innerHTML = "";

  const top = el("div", { class: "test-top" });
  const quit = el("button", { class: "btn btn-ghost btn-sm" }, "← Save & exit");
  quit.addEventListener("click", () => { saveProgress(); renderTests(); });
  top.appendChild(quit);
  top.appendChild(el("h2", { style: "margin:0" }, esc(meta.name)));
  const count = el("span", { class: "test-count" });
  top.appendChild(count);
  v.appendChild(top);

  const track = el("div", { class: "progress-track", style: "margin-bottom:14px", role: "progressbar", "aria-label": "Test progress" });
  const fill = el("div", { class: "progress-fill" });
  track.appendChild(fill);
  v.appendChild(track);

  const layout = el("div", { class: "test-layout" });
  v.appendChild(layout);

  /* question navigator */
  const navCard = el("div", { class: "card qnav" });
  const navToggle = el("button", { class: "btn btn-ghost btn-sm qnav-toggle", "aria-expanded": "true" }, "🧭 Question map");
  navCard.appendChild(navToggle);
  const navBody = el("div", { class: "qnav-body" });
  navBody.appendChild(el("h4", { style: "margin:6px 0 0" }, "Questions"));
  navBody.appendChild(el("p", { class: "read-progress" }, "✓ = answered · blue ring = current"));
  const navGrid = el("div", { class: "qnav-grid" });
  navBody.appendChild(navGrid);
  const submitAllBtn = el("button", { class: "btn btn-coral btn-sm", style: "margin-top:12px;width:100%" }, "Finish quiz 🏁");
  navBody.appendChild(submitAllBtn);
  navCard.appendChild(navBody);
  layout.appendChild(navCard);
  navToggle.addEventListener("click", () => {
    const collapsed = navBody.classList.toggle("collapsed");
    navToggle.setAttribute("aria-expanded", String(!collapsed));
  });
  if (window.matchMedia("(max-width: 900px)").matches) navBody.classList.add("collapsed"), navToggle.setAttribute("aria-expanded", "false");

  const qPanel = el("div", { class: "card" });
  layout.appendChild(qPanel);

  qs.forEach((q, i) => {
    const b = el("button", { class: "qnav-btn", "aria-label": `Go to question ${i + 1}` }, String(i + 1));
    b.addEventListener("click", () => { state.idx = i; saveProgress(); drawQuestion(); });
    navGrid.appendChild(b);
  });

  function refreshNav() {
    $$(".qnav-btn", navGrid).forEach((b, i) => {
      b.classList.toggle("answered", !!state.answers[qs[i].id]);
      b.classList.toggle("current", i === state.idx);
    });
    const answered = Object.keys(state.answers).length;
    count.textContent = `Question ${state.idx + 1} of ${qs.length} · ${answered} answered`;
    fill.style.width = (answered / qs.length * 100) + "%";
    track.setAttribute("aria-valuenow", answered);
  }

  function drawQuestion() {
    refreshNav();
    qPanel.innerHTML = "";
    let navRow = null;
    const q = qs[state.idx];
    const meta2 = el("div", { style: "display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap" });
    meta2.appendChild(el("span", { class: "skill-tag" }, esc(q.skill)));
    meta2.appendChild(el("span", { class: "read-progress" }, `Question ${state.idx + 1} of ${qs.length}`));
    qPanel.appendChild(meta2);

    const prevAns = state.answers[q.id];
    if (prevAns) {
      /* already answered — show summary, no changing */
      qPanel.appendChild(el("div", { class: "q-text" }, esc(q.q)));
      const fb = el("div", { class: "feedback " + (prevAns.correct ? "good" : "bad") });
      fb.innerHTML =
        `<div class="fb-title">${prevAns.correct ? "✅ Answered correctly" : "❌ Answered — not quite right"}</div>` +
        `<p><strong>Your answer:</strong> ${esc(prevAns.display)}<br><strong>Correct answer:</strong> ${esc(correctDisplay(q))}</p>` +
        `<p>${esc(q.explain)}</p><div class="fb-rule">📐 <strong>Rule:</strong> ${esc(q.rule)}</div>`;
      qPanel.appendChild(fb);
    } else {
      renderQuestion(q, {
        container: qPanel,
        onGraded: (correct, display) => {
          state.answers[q.id] = { correct, display };
          if (!correct) {
            P.mistakes[q.id] = { qid: q.id, set: q.set, skill: q.skill, your: display, reviewed: false, date: Date.now() };
          }
          saveProgress();
          refreshNav();
          addNavRow();
        }
      });
    }
    addNavRow(!!prevAns);

    function addNavRow(immediate) {
      if (navRow) navRow.remove();
      const row = el("div", { class: "q-actions" });
      navRow = row;
      const prevB = el("button", { class: "btn btn-ghost" }, "◀ Previous");
      prevB.disabled = state.idx === 0;
      prevB.addEventListener("click", () => { state.idx--; saveProgress(); drawQuestion(); });
      const skipB = el("button", { class: "btn btn-ghost" }, state.answers[q.id] ? "Next ▶" : "Skip / Next ▶");
      skipB.disabled = state.idx === qs.length - 1;
      skipB.addEventListener("click", () => { state.idx++; saveProgress(); drawQuestion(); });
      row.append(prevB, skipB);
      if (Object.keys(state.answers).length === qs.length) {
        const fin = el("button", { class: "btn btn-coral" }, "Finish quiz 🏁");
        fin.addEventListener("click", finishTest);
        row.appendChild(fin);
      }
      qPanel.appendChild(row);
    }
    window.scrollTo({ top: 0 });
  }

  function finishTest() {
    const answered = Object.keys(state.answers).length;
    if (answered < qs.length) {
      if (!confirm(`You have ${qs.length - answered} unanswered question${qs.length - answered > 1 ? "s" : ""}. Finish anyway?`)) return;
    }
    const results = qs.map(q => ({ q, a: state.answers[q.id] || null }));
    const correct = results.filter(r => r.a && r.a.correct).length;
    const wrong = results.filter(r => r.a && !r.a.correct).length;
    const blank = qs.length - correct - wrong;
    const pct = Math.round(correct / qs.length * 100);
    const skills = {};
    results.forEach(({ q, a }) => {
      skills[q.skill] = skills[q.skill] || { total: 0, correct: 0 };
      skills[q.skill].total++;
      if (a && a.correct) skills[q.skill].correct++;
    });
    const prevBest = P.tests[setId].best;
    const attempt = { date: Date.now(), correct, wrong, blank, pct, skills };
    P.tests[setId].attempts.push(attempt);
    P.tests[setId].best = Math.max(prevBest ?? 0, pct);
    P.tests[setId].state = null;
    logRecent(`${meta.name}: ${pct}%`);
    saveProgress();
    award("test_starter");
    if (pct >= 90) award("algebra_star");
    checkGlobalBadges();
    renderResults(setId, attempt, prevBest);
  }

  submitAllBtn.addEventListener("click", finishTest);
  drawQuestion();
}

const LEVELS = [
  { min: 90, name: "Algebra Star", label: "Algebra Star", icon: "🏆", msg: "Outstanding! You have truly mastered Unit 2 — this is top-of-the-class work." },
  { min: 75, name: "Great Progress", label: "Great Progress", icon: "🌟", msg: "Very strong work! A little polish on your weaker skills and you'll hit the stars." },
  { min: 60, name: "Keep Practising", label: "Keep Practising", icon: "💪", msg: "A solid foundation! Visit the recommended lesson below, then try again." },
  { min: 0, name: "Review and Try Again", label: "Review and Try Again", icon: "📚", msg: "Don't worry — every mathematician starts here. Review the lessons and come back stronger!" }
];
const SKILL_TO_LESSON = {
  "Writing Expressions": "L1", "Formulae & Substitution": "L2", "Collecting Like Terms": "L3",
  "Expanding Brackets": "L4", "Solving Equations": "L5", "Inequalities": "L6", "Reading & Vocabulary": "L1"
};

function renderResults(setId, attempt, prevBest) {
  const meta = QUIZ_SETS.find(t => t.id === setId);
  const v = $("#view-tests");
  v.innerHTML = "";
  const lvl = LEVELS.find(l => attempt.pct >= l.min);

  const card = el("div", { class: "card result-hero" });
  card.appendChild(el("div", { class: "result-badge" }, lvl.icon));
  card.appendChild(el("h2", {}, esc(meta.name) + " — Results"));
  card.appendChild(el("div", { class: "result-pct" }, attempt.pct + "%"));
  card.appendChild(el("p", {}, `<strong>${esc(lvl.label)}</strong> · ${esc(lvl.msg)}`));
  card.appendChild(el("p", { class: "read-progress" },
    `✅ ${attempt.correct} correct · ❌ ${attempt.wrong} incorrect · ⬜ ${attempt.blank} unanswered · Best score: ${P.tests[setId].best}%` +
    (prevBest != null ? ` · Previous best: ${prevBest}%` : "")));

  /* skill bars */
  const bars = el("div", { class: "skill-bars" });
  let bestSkill = null, worstSkill = null;
  Object.entries(attempt.skills).forEach(([sk, d]) => {
    const p = Math.round(d.correct / d.total * 100);
    if (!bestSkill || p > bestSkill.p) bestSkill = { sk, p };
    if (!worstSkill || p < worstSkill.p) worstSkill = { sk, p };
    const row = el("div", { class: "skill-bar-row" });
    row.appendChild(el("span", {}, esc(sk)));
    const tr = el("div", { class: "progress-track" });
    const f = el("div", { class: "progress-fill" });
    f.style.width = p + "%";
    if (p < 60) f.style.background = "linear-gradient(90deg,#ff8f80,#ffb48a)";
    tr.appendChild(f);
    row.appendChild(tr);
    row.appendChild(el("span", {}, `${d.correct}/${d.total}`));
    bars.appendChild(row);
  });
  card.appendChild(el("h3", {}, "Skill breakdown"));
  card.appendChild(bars);
  card.appendChild(el("p", {}, `💪 Strongest skill: <strong>${esc(bestSkill.sk)}</strong> · 🌱 To review: <strong>${esc(worstSkill.sk)}</strong>`));

  const recLesson = LESSONS.find(l => l.id === SKILL_TO_LESSON[worstSkill.sk]);
  const row = el("div", { class: "q-actions", style: "justify-content:center" });
  const mrBtn = el("button", { class: "btn btn-coral" }, "🩹 Review Mistakes");
  mrBtn.addEventListener("click", renderMistakeReview);
  const retake = el("button", { class: "btn btn-ghost" }, "↺ Retake Quiz");
  retake.addEventListener("click", () => { if (confirm("Retake this quiz from the start?")) startTest(setId, false); });
  const homeB = el("button", { class: "btn btn-ghost" }, "🏠 Return Home");
  homeB.addEventListener("click", () => showView("home"));
  const lessonB = el("button", { class: "btn btn-mint" }, `📖 Go to Lesson ${recLesson.code}`);
  lessonB.addEventListener("click", () => { showView("learn"); openLesson(recLesson); });
  const printB = el("button", { class: "btn btn-ghost" }, "🖨 Print Results");
  printB.addEventListener("click", () => window.print());
  row.append(mrBtn, retake, lessonB, homeB, printB);
  const qi = QUIZ_SETS.findIndex(t => t.id === setId);
  const nextSet = qi >= 0 && qi < QUIZ_SETS.length - 1 ? QUIZ_SETS[qi + 1] : null;
  if (nextSet) {
    const cont = el("button", { class: "btn btn-primary" }, `Continue to Quiz ${nextSet.id} ▶`);
    cont.addEventListener("click", () => startTest(nextSet.id, false));
    row.appendChild(cont);
  }
  card.appendChild(row);
  v.appendChild(card);

  /* printable summary */
  const printable = el("div", { class: "print-only" });
  printable.innerHTML = `<h3>Bright EngMath · ${esc(meta.name)}</h3>
    <p>Date: ${new Date(attempt.date).toLocaleDateString("en-GB")} · Score: ${attempt.correct}/15 (${attempt.pct}%) · Level: ${esc(lvl.label)}</p>
    <p>Correct ${attempt.correct} · Incorrect ${attempt.wrong} · Unanswered ${attempt.blank}</p>
    <p>Skills: ${Object.entries(attempt.skills).map(([sk, d]) => `${esc(sk)} ${d.correct}/${d.total}`).join(" · ")}</p>
    <p>Created by Bright EngMath © 2026</p>`;
  v.appendChild(printable);
  window.scrollTo({ top: 0 });
}

/* ---------- MISTAKE REVIEW ---------- */
function renderMistakeReview() {
  const v = $("#view-tests");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  const back = el("button", { class: "btn btn-ghost btn-sm" }, "← Quiz Zone");
  back.addEventListener("click", renderTests);
  head.appendChild(back);
  head.appendChild(el("h2", { style: "margin:0" }, "🩹 Mistake Review"));
  head.appendChild(el("span", { class: "lede" }, "Fix each mistake with a fresh mini-question. That's how skills grow!"));
  v.appendChild(head);

  const all = Object.values(P.mistakes).sort((a, b) => b.date - a.date);
  if (!all.length) {
    v.appendChild(el("div", { class: "card" }, "<h3>No mistakes recorded yet 🎉</h3><p>Finish a test and any slips will appear here, ready to fix.</p>"));
    return;
  }

  /* filters */
  let fSet = "All", fSkill = "All";
  const setTabs = el("div", { class: "filter-tabs" });
  ["All", ...QUIZ_SETS.map(q => q.id)].forEach(s => {
    const b = el("button", { class: "tab-btn" + (s === "All" ? " active" : "") }, s === "All" ? "All quizzes" : "Quiz " + s);
    b.addEventListener("click", () => { fSet = s; $$(".tab-btn", setTabs).forEach(x => x.classList.remove("active")); b.classList.add("active"); drawList(); });
    setTabs.appendChild(b);
  });
  v.appendChild(setTabs);
  const skillTabs = el("div", { class: "filter-tabs" });
  ["All", ...SKILLS].forEach(s => {
    const b = el("button", { class: "tab-btn" + (s === "All" ? " active" : "") }, esc(s));
    b.addEventListener("click", () => { fSkill = s; $$(".tab-btn", skillTabs).forEach(x => x.classList.remove("active")); b.classList.add("active"); drawList(); });
    skillTabs.appendChild(b);
  });
  v.appendChild(skillTabs);

  const listWrap = el("div");
  v.appendChild(listWrap);

  function drawList() {
    listWrap.innerHTML = "";
    const filtered = all.filter(m => (fSet === "All" || m.set === fSet) && (fSkill === "All" || m.skill === fSkill));
    if (!filtered.length) {
      listWrap.appendChild(el("div", { class: "card" }, "<p>No mistakes match this filter. 🎉</p>"));
      return;
    }
    filtered.forEach(m => {
      const q = QUESTIONS.find(x => x.id === m.qid);
      if (!q) return;
      const card = el("div", { class: "card mr-card" + (m.reviewed ? " mr-reviewed" : "") });
      card.appendChild(el("div", { class: "mr-label" }, `Quiz ${m.set} · ${esc(m.skill)}${m.reviewed ? " · ✅ reviewed" : ""}`));
      card.appendChild(el("div", { class: "q-text", style: "margin:8px 0" }, esc(q.q)));
      const ar = el("div", { class: "mr-answer-row" });
      ar.appendChild(el("div", { class: "mr-yours" }, `<strong>Your answer:</strong> ${esc(m.your || "—")}`));
      ar.appendChild(el("div", { class: "mr-correct" }, `<strong>Correct answer:</strong> ${esc(correctDisplay(q))}`));
      card.appendChild(ar);
      card.appendChild(el("p", {}, esc(q.explain)));
      card.appendChild(el("div", { class: "fb-rule" }, `📐 <strong>Rule:</strong> ${esc(q.rule)}`));

      const btnRow = el("div", { class: "q-actions" });
      const tryBtn = el("button", { class: "btn btn-ghost btn-sm" }, "🔁 Try the original again");
      const miniBtn = el("button", { class: "btn btn-primary btn-sm" }, "✨ Mini-practice question");
      const revBtn = el("button", { class: "btn btn-mint btn-sm" }, m.reviewed ? "Reviewed ✓" : "Mark as reviewed");
      revBtn.disabled = m.reviewed;
      btnRow.append(tryBtn, miniBtn, revBtn);
      card.appendChild(btnRow);
      const practiceArea = el("div");
      card.appendChild(practiceArea);

      tryBtn.addEventListener("click", () => {
        practiceArea.innerHTML = "";
        renderQuestion(q, { container: practiceArea, onGraded: (ok) => { if (ok) toast(nextGood()); } });
      });
      miniBtn.addEventListener("click", () => {
        practiceArea.innerHTML = "";
        const miniWrap = el("div", { class: "mr-mini" });
        miniWrap.appendChild(el("h4", {}, "✨ Mini practice — a fresh question on the same skill"));
        practiceArea.appendChild(miniWrap);
        renderQuestion(q.mini, {
          container: miniWrap,
          onGraded: (ok) => {
            if (ok) {
              m.reviewed = true;
              saveProgress();
              toast("Skill repaired! " + nextGood());
              confetti();
              card.classList.add("mr-reviewed");
              revBtn.textContent = "Reviewed ✓";
              revBtn.disabled = true;
            } else {
              toast("Almost — read the rule above and try once more!");
            }
          }
        });
      });
      revBtn.addEventListener("click", () => {
        m.reviewed = true; saveProgress(); drawList();
      });
      listWrap.appendChild(card);
    });
  }
  drawList();
}

/* ---------- PROGRESS DASHBOARD ---------- */
function renderProgressView() {
  const v = $("#view-progress");
  v.innerHTML = "";
  const head = el("div", { class: "section-head" });
  head.appendChild(el("h2", {}, "📊 My Progress"));
  head.appendChild(el("span", { class: "lede" }, "Everything you've achieved in Unit 2 — saved on this device."));
  v.appendChild(head);

  const prog = overallCompletion();
  const heroCard = el("div", { class: "card" });
  heroCard.appendChild(el("h3", {}, `Overall Unit 2 completion: ${prog}%`));
  const track = el("div", { class: "progress-track" });
  const fill = el("div", { class: "progress-fill" });
  fill.style.width = prog + "%";
  track.appendChild(fill);
  heroCard.appendChild(track);
  v.appendChild(heroCard);

  const grid = el("div", { class: "grid grid-2", style: "margin-top:16px" });

  /* section progress */
  const secCard = el("div", { class: "card" });
  secCard.appendChild(el("h3", {}, "📚 Section progress"));
  [["Lessons", Object.keys(P.lessonsDone).length, LESSONS.length],
   ["Vocabulary activities", Object.keys(P.vocabActs).length, 8],
   ["Algebra Lab stations", Object.keys(P.labDone).length, LAB_SETS.length],
   ["Reading levels", Object.keys(P.readingsDone).length, READINGS.length],
   ["Practice sets", Object.keys(P.practiceDone).length, PRACTICE_SETS.length],
   ["Quizzes attempted", QUIZ_SETS.filter(s => P.tests[s.id].attempts.length).length, QUIZ_SETS.length]
  ].forEach(([name, d, t]) => {
    const row = el("div", { class: "skill-bar-row", style: "margin:8px 0" });
    row.appendChild(el("span", {}, esc(name)));
    const tr = el("div", { class: "progress-track" });
    const f = el("div", { class: "progress-fill" });
    f.style.width = (t ? d / t * 100 : 0) + "%";
    tr.appendChild(f);
    row.appendChild(tr);
    row.appendChild(el("span", {}, `${d}/${t}`));
    secCard.appendChild(row);
  });
  grid.appendChild(secCard);

  /* test scores */
  const tCard = el("div", { class: "card" });
  tCard.appendChild(el("h3", {}, "📝 Quiz scores"));
  QUIZ_SETS.forEach(ts => {
    const info = P.tests[ts.id];
    const last = info.attempts[info.attempts.length - 1];
    tCard.appendChild(el("p", {}, `<strong>${esc(ts.name)}</strong><br>` +
      `${starsFor(info.best)} Best: ${info.best != null ? info.best + "%" : "—"} · Last: ${last ? last.pct + "%" : "—"} · Tries: ${info.attempts.length}` +
      (info.state ? " · <em>⏸ unfinished quiz saved</em>" : "")));
  });
  const unrev = Object.values(P.mistakes).filter(m => !m.reviewed);
  if (unrev.length) {
    const skillsToFix = [...new Set(unrev.map(m => m.skill))];
    tCard.appendChild(el("p", {}, `🌱 <strong>Skills to review:</strong> ${skillsToFix.map(esc).join(", ")}`));
    const b = el("button", { class: "btn btn-coral btn-sm" }, "🩹 Open Mistake Review");
    b.addEventListener("click", () => { showView("tests"); renderMistakeReview(); });
    tCard.appendChild(b);
  }
  grid.appendChild(tCard);
  v.appendChild(grid);

  /* badges */
  const bCard = el("div", { class: "card", style: "margin-top:16px" });
  bCard.appendChild(el("h3", {}, `🏅 Achievement badges (${P.badges.length}/${ACHIEVEMENTS.length})`));
  const bGrid = el("div", { class: "badge-grid" });
  ACHIEVEMENTS.forEach(a => {
    const earned = P.badges.includes(a.id);
    const c = el("div", { class: "card badge-card" + (earned ? " earned" : "") });
    c.appendChild(el("div", { class: "b-icon" }, a.icon));
    c.appendChild(el("div", { class: "badge-name" }, esc(a.name)));
    c.appendChild(el("div", { class: "badge-desc" }, esc(a.desc)));
    bGrid.appendChild(c);
  });
  bCard.appendChild(bGrid);
  v.appendChild(bCard);

  /* recent activity */
  const rCard = el("div", { class: "card", style: "margin-top:16px" });
  rCard.appendChild(el("h3", {}, "🕒 Recent activity"));
  if (P.recent.length) {
    const ul = el("ul", { class: "recent-list" });
    P.recent.forEach(r => ul.appendChild(el("li", {}, esc(r))));
    rCard.appendChild(ul);
  } else rCard.appendChild(el("p", {}, "Nothing yet — your adventure starts in the Learn section!"));
  const printB = el("button", { class: "btn btn-ghost btn-sm", style: "margin-top:10px" }, "🖨 Print progress summary");
  printB.addEventListener("click", () => window.print());
  rCard.appendChild(printB);
  v.appendChild(rCard);
}

/* ============ 7. TEACHER MODE ============ */
let tm = { mode: "menu", idx: 0, revealed: 0, scale: 1, quizQ: null };

function openTeacherMode() {
  $("#teacherMode").hidden = false;
  document.body.style.overflow = "hidden";
  tm = { mode: "menu", idx: 0, revealed: 0, scale: 1, quizQ: null };
  drawTM();
}
function closeTeacherMode() {
  $("#teacherMode").hidden = true;
  document.body.style.overflow = "";
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
}
function tmSetScale() { $("#tmStage").style.setProperty("--tm-scale", tm.scale); }

function drawTM() {
  const stage = $("#tmStage");
  stage.innerHTML = "";
  tmSetScale();
  const inner = el("div", { class: "tm-inner" });
  stage.appendChild(inner);

  if (tm.mode === "menu") {
    inner.appendChild(el("h1", { style: "text-align:center" }, "🍎 Teacher Presentation Mode"));
    inner.appendChild(el("p", { style: "text-align:center" }, "Unit 2 · Expressions, Formulae & Equations — pick a board to project."));
    const menu = el("div", { class: "tm-menu-grid" });
    [["lessons", "📖", "Lesson Boards"],
     ["patterns", "🧩", "Pattern Boards"],
     ["flash", "🃏", "Key Word Flashcards"],
     ["quiz", "🎲", "Random Quiz"],
     ["reading", "📚", "Reading Passages"],
     ["summary", "📊", "Class Progress Summary"]].forEach(([mode, ico, name]) => {
      const b = el("button", { class: "tm-menu-btn" }, `<span class="tm-ico">${ico}</span>${name}`);
      b.addEventListener("click", () => { tm.mode = mode; tm.idx = 0; tm.revealed = 0; tm.quizQ = null; drawTM(); });
      menu.appendChild(b);
    });
    stage.appendChild(menu);
    inner.style.display = "contents";
    return;
  }

  if (tm.mode === "lessons") {
    const les = LESSONS[tm.idx % LESSONS.length];
    inner.appendChild(el("h1", {}, `${les.code} · ${esc(les.title)}`));
    inner.appendChild(el("div", { class: "objective-box" }, "🎯 " + esc(les.objective)));
    const sb = el("div", { class: "sound-boxes", style: "justify-content:flex-start" });
    les.patternBox.boxes.forEach(b => sb.appendChild(el("span", { class: `sound-box sb-${les.color}` }, esc(b))));
    inner.appendChild(sb);
    const ul = el("ul", { class: "keypoints" });
    les.keyPoints.forEach(k => ul.appendChild(el("li", {}, esc(k))));
    inner.appendChild(ul);
    inner.appendChild(el("h2", {}, "Examples — reveal one at a time"));
    les.examples.forEach((ex, i) => {
      const d = el("div", { class: "example-item" });
      d.appendChild(el("div", { class: "ex-line" }, esc(ex.line.split("→")[0] || ex.line)));
      const ans = el("span", { class: "tm-hidden-answer" + (i < tm.revealed ? " revealed" : "") },
        esc(ex.line.includes("→") ? "→ " + ex.line.split("→").slice(1).join("→") : ex.why));
      d.appendChild(ans);
      inner.appendChild(d);
    });
    inner.appendChild(el("div", { class: "tip-box" }, "🙋 <strong>Ask the class:</strong> " + esc(les.discussion[0])));
    inner.appendChild(el("div", { class: "tm-counter" }, `Lesson board ${tm.idx % LESSONS.length + 1} of ${LESSONS.length} · “Reveal” shows the next answer`));
    return;
  }

  if (tm.mode === "patterns") {
    const les = LESSONS[tm.idx % LESSONS.length];
    inner.appendChild(el("h1", { style: "text-align:center" }, esc(les.patternBox.label)));
    const sb = el("div", { class: "sound-boxes" });
    les.patternBox.boxes.forEach(b => sb.appendChild(el("span", { class: `sound-box sb-${les.color}`, style: "font-size:2.2rem" }, esc(b))));
    inner.appendChild(sb);
    const dt = el("table", { class: "mini-table", style: "margin-top:26px" });
    dt.appendChild(el("tr", {}, "<th>Try this…</th><th>Answer</th>"));
    les.patternBox.demo.forEach(([qq, aa], i) => {
      const tr = el("tr");
      tr.appendChild(el("td", {}, esc(qq)));
      const td = el("td");
      td.appendChild(el("span", { class: "tm-hidden-answer" + (i < tm.revealed ? " revealed" : "") }, esc(aa)));
      tr.appendChild(td);
      dt.appendChild(tr);
    });
    inner.appendChild(dt);
    inner.appendChild(el("div", { class: "tm-counter" }, `Pattern board ${tm.idx % LESSONS.length + 1} of ${LESSONS.length} · Ask the class BEFORE revealing!`));
    return;
  }

  if (tm.mode === "flash") {
    const w = VOCAB[tm.idx % VOCAB.length];
    inner.appendChild(el("div", { class: "tm-flashword" }, `${w.icon} ${esc(w.w)}`));
    inner.appendChild(el("p", { style: "text-align:center" }, "say: " + esc(w.say) + " · " + esc(w.syll)));
    const ans = el("div", { style: "text-align:center;margin-top:20px" });
    ans.appendChild(el("span", { class: "tm-hidden-answer" + (tm.revealed > 0 ? " revealed" : ""), style: "font-size:1.2em;padding:8px 18px" },
      esc(w.meaning) + " — e.g. " + esc(w.ex)));
    inner.appendChild(ans);
    inner.appendChild(el("div", { class: "tm-counter" }, `Word ${tm.idx % VOCAB.length + 1} of ${VOCAB.length} · Ask: “Who can explain this word?” then Reveal`));
    return;
  }

  if (tm.mode === "quiz") {
    if (!tm.quizQ) {
      const pool = [
        ...QUESTIONS.filter(q => ["mcq", "tf", "fill"].includes(q.type)),
        ...PRACTICE_SETS.flatMap(s => s.questions.filter(q => ["mcq", "tf", "fill"].includes(q.type))),
        ...LAB_SETS.flatMap(s => s.questions.filter(q => ["mcq", "tf", "fill"].includes(q.type)))
      ];
      tm.quizQ = pool[Math.floor(Math.random() * pool.length)];
    }
    const q = tm.quizQ;
    inner.appendChild(el("h2", {}, "🎲 Class Quiz — think, pair, share!"));
    if (q.passage) {
      const pb = el("div", { class: "passage-box" });
      q.passage.forEach(p => pb.appendChild(el("p", {}, esc(p))));
      inner.appendChild(pb);
    }
    inner.appendChild(el("div", { class: "q-text", style: "font-size:1.4em" }, esc(q.q)));
    if (q.type === "mcq") {
      const list = el("div", { class: "opt-list" });
      q.options.forEach((o, i) => list.appendChild(el("div", { class: "opt-btn" },
        `<span class="opt-letter">${String.fromCharCode(65 + i)}</span><span>${esc(o)}</span>`)));
      inner.appendChild(list);
    } else if (q.type === "tf") {
      inner.appendChild(el("p", { style: "font-weight:800" }, "True … or false?"));
    }
    const ansTxt = q.type === "mcq" ? q.options[q.answer] : q.type === "tf" ? (q.answer ? "True" : "False") : q.answer;
    const ans = el("div", { style: "margin-top:18px" });
    ans.appendChild(el("span", { class: "tm-hidden-answer" + (tm.revealed > 0 ? " revealed" : ""), style: "font-size:1.15em;padding:8px 18px" },
      "Answer: " + esc(ansTxt) + " — " + esc(q.explain)));
    inner.appendChild(ans);
    inner.appendChild(el("div", { class: "tm-counter" }, "Give the class thinking time, then Reveal · “Next” draws a new random question"));
    return;
  }

  if (tm.mode === "reading") {
    const r = READINGS[tm.idx % READINGS.length];
    inner.appendChild(el("h1", {}, `${r.icon} ${esc(r.title)}`));
    inner.appendChild(el("p", { class: "read-progress" }, esc(r.level)));
    const rt = el("div", { class: "reading-text rt-large" });
    const hlRegex = new RegExp("\\b(" + r.highlight.join("|") + ")\\b", "gi");
    r.text.forEach(p => {
      rt.appendChild(el("p", {}, tm.revealed > 0 ? esc(p).replace(hlRegex, m => `<span class="hl-target">${m}</span>`) : esc(p)));
    });
    inner.appendChild(rt);
    inner.appendChild(el("div", { class: "tm-counter" }, `Passage ${tm.idx % READINGS.length + 1} of ${READINGS.length} · “Reveal” highlights the key words`));
    return;
  }

  if (tm.mode === "summary") {
    inner.appendChild(el("h1", {}, "📊 Progress Summary"));
    inner.appendChild(el("p", {}, `Overall Unit 2 completion: <strong>${overallCompletion()}%</strong>`));
    inner.appendChild(el("p", {}, `Lessons: ${Object.keys(P.lessonsDone).length}/${LESSONS.length} · Practice: ${Object.keys(P.practiceDone).length}/${PRACTICE_SETS.length} · Lab: ${Object.keys(P.labDone).length}/${LAB_SETS.length} · Reading: ${Object.keys(P.readingsDone).length}/${READINGS.length}`));
    QUIZ_SETS.forEach(ts => {
      const info = P.tests[ts.id];
      inner.appendChild(el("p", {}, `${esc(ts.name)} — best ${info.best != null ? info.best + "%" : "—"}, tries ${info.attempts.length}`));
    });
    const pr = el("button", { class: "btn btn-primary" }, "🖨 Print this summary");
    pr.addEventListener("click", () => { closeTeacherMode(); showView("progress"); setTimeout(() => window.print(), 300); });
    inner.appendChild(pr);
    return;
  }
}

function tmNav(dir) {
  if (tm.mode === "menu") return;
  if (tm.mode === "quiz") { tm.quizQ = null; tm.revealed = 0; drawTM(); return; }
  tm.idx = Math.max(0, tm.idx + dir);
  tm.revealed = 0;
  drawTM();
}
function tmReveal(show) {
  const hidden = $$("#tmStage .tm-hidden-answer");
  if (show) {
    const nxt = hidden.find(h => !h.classList.contains("revealed"));
    if (nxt) { nxt.classList.add("revealed"); tm.revealed++; }
  } else {
    hidden.forEach(h => h.classList.remove("revealed"));
    tm.revealed = 0;
  }
}

function initTeacherMode() {
  $("#tmExit").addEventListener("click", closeTeacherMode);
  $("#tmHome").addEventListener("click", () => { tm.mode = "menu"; tm.revealed = 0; drawTM(); });
  $("#tmPrev").addEventListener("click", () => tmNav(-1));
  $("#tmNext").addEventListener("click", () => tmNav(1));
  $("#tmReveal").addEventListener("click", () => tmReveal(true));
  $("#tmHide").addEventListener("click", () => tmReveal(false));
  $("#tmBigger").addEventListener("click", () => { tm.scale = Math.min(1.6, tm.scale + .1); tmSetScale(); });
  $("#tmSmaller").addEventListener("click", () => { tm.scale = Math.max(.7, tm.scale - .1); tmSetScale(); });
  $("#tmFullscreen").addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => toast("Full screen not available."));
  });
  document.addEventListener("keydown", (e) => {
    if ($("#teacherMode").hidden) return;
    if (e.key === "ArrowRight") tmNav(1);
    else if (e.key === "ArrowLeft") tmNav(-1);
    else if (e.key.toLowerCase() === "r") tmReveal(true);
    else if (e.key.toLowerCase() === "h") tmReveal(false);
    else if (e.key === "Escape") closeTeacherMode();
  });
}

/* ============ 8. ROUTER & INIT ============ */
const RENDERERS = {
  home: renderHome, learn: renderLearn, vocab: renderVocab, lab: renderLab,
  reading: renderReading, practice: renderPractice, tests: renderTests, progress: renderProgressView
};

function showView(name) {
  if (name === "teacher") { openTeacherMode(); return; }
  VIEWS.forEach(v => $("#view-" + v).classList.toggle("active", v === name));
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.nav === name));
  $("#mainNav").classList.remove("open");
  $("#navToggle").setAttribute("aria-expanded", "false");
  P.lastSection = name;
  saveProgress();
  if (RENDERERS[name]) RENDERERS[name]();
  window.scrollTo({ top: 0 });
}

function init() {
  $$("[data-nav]").forEach(b => b.addEventListener("click", (e) => { e.preventDefault(); showView(b.dataset.nav); }));
  $("#navToggle").addEventListener("click", () => {
    const nav = $("#mainNav");
    const open = nav.classList.toggle("open");
    $("#navToggle").setAttribute("aria-expanded", String(open));
  });
  $("#resetProgressBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all Unit 2 progress? This action cannot be undone.")) {
      P = defaultProgress();
      saveProgress();
      toast("Progress reset. A fresh start! 🌱");
      showView("home");
    }
  });
  initTeacherMode();
  const start = VIEWS.includes(P.lastSection) ? P.lastSection : "home";
  showView(start);
}
document.addEventListener("DOMContentLoaded", init);
