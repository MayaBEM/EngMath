/* =====================================================================
   Bright EngMath — English Entrance Examination
   script.js  ·  Single-page application logic (no backend, no framework)
   ---------------------------------------------------------------------
   Features:
   • Home / exam / results / review / empty-state routing
   • Hint system: 3 vocabulary hints per exam set, then disabled
   • Sidebar question navigator (answered / current / skipped)
   • No timer — students think freely
   • Instant feedback + Thai explanation after each answer
   • Results: score, %, performance level, section analysis, recommendations
   • Review mode, Retry-incorrect-only, Restart
   • Randomize question order (passages stay grouped) + randomize choices
   • Dark / light mode, sound toggle, keyboard shortcuts, confetti
   • Progress saved to Local Storage
   ===================================================================== */
"use strict";

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const LETTERS = ["A", "B", "C", "D"];
const HINTS_PER_SET = 3;
const LS_KEY = "brightengmath.entrance.v1";

/* Fisher–Yates shuffle (returns a new array) */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ------------------------------------------------------------------ */
/* Persistent settings + progress (Local Storage)                      */
/* ------------------------------------------------------------------ */
const store = {
  data: { settings: { theme: "light", sound: true, randomizeQ: false, randomizeC: false }, progress: {} },
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
    } catch (e) { /* ignore corrupt storage */ }
    return this.data;
  },
  save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(this.data)); } catch (e) {}
  }
};
store.load();

/* ------------------------------------------------------------------ */
/* Application state                                                   */
/* ------------------------------------------------------------------ */
const app = {
  setId: null,        // active exam set id
  questions: [],      // working (possibly shuffled) list for this attempt
  answers: [],        // chosen index per question (null = unanswered)
  skipped: [],        // boolean per question
  index: 0,           // current question index
  hintsUsed: 0,       // hints used this set (max 3)
  hintShownFor: {},   // which questions already revealed a hint
  finished: false,
  reviewFilter: "all"
};

/* ------------------------------------------------------------------ */
/* Screen routing                                                      */
/* ------------------------------------------------------------------ */
const screens = ["home", "exam", "results", "review", "empty"];
function show(screen) {
  screens.forEach(s => $("#" + s).classList.toggle("show", s === screen));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ------------------------------------------------------------------ */
/* Theme / sound toggles                                               */
/* ------------------------------------------------------------------ */
function applySettings() {
  document.documentElement.setAttribute("data-theme", store.data.settings.theme);
  document.documentElement.setAttribute("data-sound", store.data.settings.sound ? "on" : "off");
}
$("#themeToggle").addEventListener("click", () => {
  store.data.settings.theme = store.data.settings.theme === "dark" ? "light" : "dark";
  applySettings(); store.save();
});
$("#soundToggle").addEventListener("click", () => {
  store.data.settings.sound = !store.data.settings.sound;
  applySettings(); store.save();
  if (store.data.settings.sound) beep(true);
});
applySettings();

/* ------------------------------------------------------------------ */
/* Sound effects (Web Audio — no external files needed)                */
/* ------------------------------------------------------------------ */
let audioCtx;
function beep(good) {
  if (!store.data.settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination); o.type = "sine";
    const t = audioCtx.currentTime;
    if (good) { o.frequency.setValueAtTime(660, t); o.frequency.setValueAtTime(990, t + 0.09); }
    else { o.frequency.setValueAtTime(320, t); o.frequency.setValueAtTime(240, t + 0.11); }
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.start(t); o.stop(t + 0.3);
  } catch (e) {}
}

/* ------------------------------------------------------------------ */
/* Home — render exam-set cards with saved progress                    */
/* ------------------------------------------------------------------ */
function renderHome() {
  const grid = $("#setGrid");
  grid.innerHTML = "";
  EXAM_SETS.forEach(set => {
    const prog = store.data.progress[set.id];
    const done = prog && prog.finished;
    const pct = done ? prog.pct : (prog ? Math.round((prog.answered / set.questions.length) * 100) : 0);
    const card = document.createElement("button");
    card.className = "set-card";
    card.setAttribute("aria-label", "Open " + set.title);
    card.innerHTML = `
      <div class="set-num">${String(set.id).padStart(2, "0")}</div>
      <h3>${set.title.replace("Examination ", "")}</h3>
      <p>${set.subtitle}</p>
      <div class="set-bar"><i style="width:${pct}%"></i></div>
      <div class="set-status">
        <span>${set.questions.length} questions</span>
        ${done ? `<span class="set-badge">Best ${prog.pct}%</span>` : (prog ? `<span>${prog.answered}/${set.questions.length} done</span>` : `<span>Not started</span>`)}
      </div>`;
    card.addEventListener("click", () => startSet(set.id));
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------------ */
/* Build a working question list (with optional randomisation)         */
/* Passages stay grouped so reading/cloze questions never split.       */
/* ------------------------------------------------------------------ */
function buildQuestionList(set) {
  let list = set.questions.map(q => ({ ...q }));

  if (store.data.settings.randomizeQ) {
    // group by passageId (singletons keep their own group)
    const groups = [];
    const map = {};
    list.forEach(q => {
      const key = q.passageId || ("__" + Math.random());
      if (!map[key]) { map[key] = []; groups.push(map[key]); }
      map[key].push(q);
    });
    list = shuffle(groups).flat();
  }

  if (store.data.settings.randomizeC) {
    list = list.map(q => {
      const order = shuffle(q.choices.map((c, i) => i));
      return {
        ...q,
        choices: order.map(i => q.choices[i]),
        answer: order.indexOf(q.answer)
      };
    });
  }
  return list;
}

/* ------------------------------------------------------------------ */
/* Start / restart an exam set                                         */
/* ------------------------------------------------------------------ */
function startSet(setId, onlyWrongFrom = null) {
  const set = EXAM_SETS.find(s => s.id === setId);
  if (!set) return;
  app.setId = setId;

  if (onlyWrongFrom) {
    // Retry incorrect only — reuse exact questions the student got wrong
    app.questions = onlyWrongFrom;
  } else {
    app.questions = buildQuestionList(set);
  }

  app.answers = new Array(app.questions.length).fill(null);
  app.skipped = new Array(app.questions.length).fill(false);
  app.index = 0;
  app.hintsUsed = 0;
  app.hintShownFor = {};
  app.finished = false;

  $("#navSetTitle").textContent = onlyWrongFrom ? set.title + " · Retry" : set.title;
  renderNavigator();
  renderQuestion();
  show("exam");
}

/* ------------------------------------------------------------------ */
/* Render the current question                                         */
/* ------------------------------------------------------------------ */
function renderQuestion() {
  const q = app.questions[app.index];
  const total = app.questions.length;

  $("#qSection").textContent = q.section;
  $("#qType").textContent = q.type;
  $("#qCounter").textContent = `Question ${app.index + 1} / ${total}`;
  $("#examProgress").style.width = ((app.index) / total * 100) + "%";

  // passage (reading / cloze)
  const pass = $("#qPassage");
  if (q.passage) { pass.hidden = false; pass.innerHTML = q.passage; }
  else { pass.hidden = true; pass.innerHTML = ""; }

  $("#qInstruction").textContent = q.instruction || "Choose the best answer.";
  // Render blanks nicely
  $("#qText").innerHTML = q.question.replace(/___/g, '<span class="blank">_____</span>');

  // choices
  const box = $("#qChoices");
  box.innerHTML = "";
  const chosen = app.answers[app.index];
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", chosen === i ? "true" : "false");
    btn.innerHTML = `<span class="key">${LETTERS[i]}</span><span class="choice-text">${c}</span>`;
    btn.addEventListener("click", () => selectAnswer(i));
    box.appendChild(btn);
  });

  // If already answered, lock and show feedback
  if (chosen !== null) {
    lockChoices(chosen, q.answer);
    showFeedback(q, chosen === q.answer);
  } else {
    $("#qFeedback").hidden = true;
  }

  // hint area
  const hintBox = $("#qHint");
  if (app.hintShownFor[q.__key || app.index]) {
    hintBox.hidden = false;
    hintBox.innerHTML = buildHintHTML(q);
  } else {
    hintBox.hidden = true; hintBox.innerHTML = "";
  }
  updateHintButton();

  // nav buttons
  $("#prevBtn").disabled = app.index === 0;
  const last = app.index === total - 1;
  $("#nextBtn").innerHTML = last
    ? 'Finish <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : 'Next <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  updateNavigatorChips();
}

/* ------------------------------------------------------------------ */
/* Answer selection + instant feedback                                 */
/* ------------------------------------------------------------------ */
function selectAnswer(i) {
  const q = app.questions[app.index];
  if (app.answers[app.index] !== null) return; // already answered — locked
  app.answers[app.index] = i;
  app.skipped[app.index] = false;

  lockChoices(i, q.answer);
  const correct = i === q.answer;
  showFeedback(q, correct);
  beep(correct);

  $("#examProgress").style.width = ((app.index + 1) / app.questions.length * 100) + "%";
  updateNavigatorChips();
  updateNavProgressText();
  persistProgress();
}

function lockChoices(chosen, correct) {
  $$("#qChoices .choice").forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add("correct");
    else if (i === chosen) b.classList.add("incorrect");
    else b.classList.add("dim");
  });
}

function showFeedback(q, correct) {
  const fb = $("#qFeedback");
  fb.hidden = false;
  fb.className = "q-feedback " + (correct ? "ok" : "no");
  $("#fbHead").innerHTML = correct
    ? '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Correct'
    : '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg> Incorrect';
  const correctText = `<b>${LETTERS[q.answer]}. ${q.choices[q.answer]}</b>`;
  $("#fbExplain").innerHTML =
    (correct ? "" : `เฉลย: ${correctText}<br>`) + q.explain;
  // vocabulary chips
  const vb = $("#fbVocab");
  vb.innerHTML = (q.vocab || []).map(v => `<span class="chip">${v[0]} <span>(${v[1]})</span></span>`).join("");
}

/* ------------------------------------------------------------------ */
/* Vocabulary hint system (3 per set)                                  */
/* ------------------------------------------------------------------ */
function updateHintButton() {
  const q = app.questions[app.index];
  const btn = $("#hintBtn");
  const remaining = HINTS_PER_SET - app.hintsUsed;
  const alreadyShown = !!app.hintShownFor[q.__key || app.index];
  $("#hintCount").textContent = remaining + " left";

  if (alreadyShown) {
    btn.disabled = true;
    $("#hintCount").textContent = "shown";
  } else if (remaining <= 0) {
    btn.disabled = true;
    $("#hintCount").textContent = "0 left";
  } else {
    btn.disabled = false;
  }
}

function buildHintHTML(q) {
  const items = (q.vocab || []).map(v => `<div class="vocab-item"><b>${v[0]}</b><span>${v[1]}</span></div>`).join("");
  return `<h4>💡 Vocabulary Hint</h4>${items || '<div class="hint-empty">No vocabulary for this question.</div>'}`;
}

$("#hintBtn").addEventListener("click", useHint);
function useHint() {
  const q = app.questions[app.index];
  const key = q.__key || app.index;
  if (app.hintShownFor[key]) return;
  if (app.hintsUsed >= HINTS_PER_SET) {
    const hb = $("#qHint");
    hb.hidden = false;
    hb.innerHTML = '<div class="hint-empty">You have used all 3 hints.</div>';
    return;
  }
  app.hintsUsed++;
  app.hintShownFor[key] = true;
  const hb = $("#qHint");
  hb.hidden = false;
  hb.innerHTML = buildHintHTML(q);
  updateHintButton();
  persistProgress();
}

/* ------------------------------------------------------------------ */
/* Navigator (sidebar)                                                 */
/* ------------------------------------------------------------------ */
function renderNavigator() {
  const grid = $("#navGrid");
  grid.innerHTML = "";
  app.questions.forEach((q, i) => {
    const chip = document.createElement("button");
    chip.className = "nav-chip";
    chip.textContent = i + 1;
    chip.setAttribute("aria-label", "Go to question " + (i + 1));
    chip.addEventListener("click", () => { app.index = i; renderQuestion(); closeNav(); });
    grid.appendChild(chip);
  });
  updateNavigatorChips();
  updateNavProgressText();
}
function updateNavigatorChips() {
  $$("#navGrid .nav-chip").forEach((chip, i) => {
    chip.classList.toggle("answered", app.answers[i] !== null);
    chip.classList.toggle("skipped", app.answers[i] === null && app.skipped[i]);
    chip.classList.toggle("current", i === app.index);
  });
}
function updateNavProgressText() {
  const answered = app.answers.filter(a => a !== null).length;
  $("#navProgress").textContent = `${answered} answered · ${app.questions.length} total`;
}

/* Navigator drawer (mobile) */
function openNav() { $("#navigator").classList.add("open"); $("#navScrim").classList.add("show"); }
function closeNav() { $("#navigator").classList.remove("open"); $("#navScrim").classList.remove("show"); }
$("#navOpen").addEventListener("click", openNav);
$("#navClose").addEventListener("click", closeNav);
$("#navScrim").addEventListener("click", closeNav);

/* ------------------------------------------------------------------ */
/* Navigation buttons                                                  */
/* ------------------------------------------------------------------ */
$("#prevBtn").addEventListener("click", () => { if (app.index > 0) { app.index--; renderQuestion(); } });
$("#nextBtn").addEventListener("click", () => {
  if (app.index < app.questions.length - 1) { app.index++; renderQuestion(); }
  else finishExam();
});
$("#skipBtn").addEventListener("click", () => {
  if (app.answers[app.index] === null) app.skipped[app.index] = true;
  if (app.index < app.questions.length - 1) { app.index++; renderQuestion(); }
  else finishExam();
  updateNavigatorChips();
});
$("#submitExam").addEventListener("click", finishExam);

/* ------------------------------------------------------------------ */
/* Finish + Results                                                    */
/* ------------------------------------------------------------------ */
function finishExam() {
  app.finished = true;
  closeNav();
  const total = app.questions.length;
  const correct = app.questions.reduce((n, q, i) => n + (app.answers[i] === q.answer ? 1 : 0), 0);
  const pct = Math.round(correct / total * 100);

  // Persist best result
  const prev = store.data.progress[app.setId] || {};
  store.data.progress[app.setId] = {
    finished: true,
    answered: app.answers.filter(a => a !== null).length,
    correct, total, pct: Math.max(pct, prev.pct || 0), last: pct
  };
  store.save();

  renderResults(correct, total, pct);
  show("results");
  if (pct >= 90) burstConfetti();
}

const PERF = pct =>
  pct >= 90 ? { label: "Excellent", note: "Outstanding! You are well prepared for the real entrance examination." } :
  pct >= 75 ? { label: "Very Good", note: "Strong work. Review a few weak points and you will be exam-ready." } :
  pct >= 60 ? { label: "Good", note: "A solid effort. Focus your revision on the sections below." } :
              { label: "Needs Improvement", note: "Keep going — study the recommended topics and try again." };

function renderResults(correct, total, pct) {
  const perf = PERF(pct);
  $("#resultPct").textContent = pct + "%";
  $("#resultLevel").textContent = perf.label;
  $("#resultTitle").textContent = perf.label;
  $("#resultSub").textContent = perf.note;
  $("#resultCorrect").textContent = correct;
  $("#resultIncorrect").textContent = total - correct;
  $("#resultTotal").textContent = total;

  // animate ring
  const circ = 2 * Math.PI * 52;
  const fill = $("#ringFill");
  fill.style.strokeDasharray = circ;
  fill.style.strokeDashoffset = circ;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    fill.style.strokeDashoffset = circ * (1 - pct / 100);
  }));

  renderSectionAnalysis();
  renderRecommendations();
}

/* Section analysis — group by q.section */
function sectionStats() {
  const stats = {};
  app.questions.forEach((q, i) => {
    const s = q.section;
    stats[s] = stats[s] || { correct: 0, total: 0 };
    stats[s].total++;
    if (app.answers[i] === q.answer) stats[s].correct++;
  });
  return stats;
}
function renderSectionAnalysis() {
  const stats = sectionStats();
  const box = $("#sectionAnalysis");
  box.innerHTML = "";
  Object.keys(stats).forEach(sec => {
    const { correct, total } = stats[sec];
    const pct = Math.round(correct / total * 100);
    const cls = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";
    const row = document.createElement("div");
    row.className = "analysis-row";
    row.innerHTML = `
      <div class="analysis-top"><span>${sec}</span><span>${correct}/${total} · ${pct}%</span></div>
      <div class="analysis-bar"><i class="${cls}" style="width:0"></i></div>`;
    box.appendChild(row);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      row.querySelector("i").style.width = pct + "%";
    }));
  });
}

/* Recommendations — topics from missed questions, most-missed first */
function renderRecommendations() {
  const missed = {};
  app.questions.forEach((q, i) => {
    if (app.answers[i] !== q.answer) missed[q.topic] = (missed[q.topic] || 0) + 1;
  });
  const list = $("#recommendations");
  list.innerHTML = "";
  const topics = Object.keys(missed).sort((a, b) => missed[b] - missed[a]).slice(0, 6);
  if (topics.length === 0) {
    list.innerHTML = '<li class="none">Excellent — no weak areas detected. Keep up the great work!</li>';
    return;
  }
  topics.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 21l-5 2.9 1.2-5.6L4 14.6 9.6 14 12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg> <span>${t}</span>`;
    list.appendChild(li);
  });
}

/* Result actions */
$("#reviewBtn").addEventListener("click", () => { app.reviewFilter = "all"; renderReview(); show("review"); });
$("#restartBtn").addEventListener("click", () => startSet(app.setId));
$("#homeBtn").addEventListener("click", () => { renderHome(); show("home"); });
$("#retryWrongBtn").addEventListener("click", () => {
  const wrong = app.questions.filter((q, i) => app.answers[i] !== q.answer).map(q => ({ ...q }));
  if (wrong.length === 0) { show("empty"); return; }
  startSet(app.setId, wrong);
});
$("#emptyHome").addEventListener("click", () => { renderHome(); show("home"); });

/* ------------------------------------------------------------------ */
/* Review mode                                                         */
/* ------------------------------------------------------------------ */
function renderReview() {
  const list = $("#reviewList");
  list.innerHTML = "";
  app.questions.forEach((q, i) => {
    const chosen = app.answers[i];
    const ok = chosen === q.answer;
    if (app.reviewFilter === "wrong" && ok) return;
    const card = document.createElement("div");
    card.className = "rv " + (ok ? "ok" : "no");
    card.innerHTML = `
      <div class="rv-top">
        <span class="rv-badge ${ok ? "ok" : "no"}">${ok ? "Correct" : "Incorrect"}</span>
        <span class="rv-sec">${q.section} · ${q.type}</span>
      </div>
      ${q.passage ? `<div class="rv-passage">${q.passage}</div>` : ""}
      <div class="rv-q">Q${i + 1}. ${q.question.replace(/___/g, "_____")}</div>
      <div class="rv-line no">Your answer: ${chosen !== null ? LETTERS[chosen] + ". " + q.choices[chosen] : "— (skipped)"}</div>
      <div class="rv-line yes">Correct answer: ${LETTERS[q.answer]}. ${q.choices[q.answer]}</div>
      <div class="rv-explain"><b>คำอธิบาย:</b> ${q.explain}</div>
      <div class="rv-vocab">${(q.vocab || []).map(v => `<span class="chip">${v[0]} <span>(${v[1]})</span></span>`).join("")}</div>`;
    list.appendChild(card);
  });
  if (!list.children.length) {
    list.innerHTML = '<div class="rv ok"><div class="rv-q">No incorrect questions — perfect paper! 🎉</div></div>';
  }
}
$$("#reviewFilter button").forEach(b => b.addEventListener("click", () => {
  $$("#reviewFilter button").forEach(x => x.classList.remove("on"));
  b.classList.add("on");
  app.reviewFilter = b.dataset.f;
  renderReview();
}));
$("#reviewBackBtn").addEventListener("click", () => show("results"));
$("#reviewHomeBtn").addEventListener("click", () => { renderHome(); show("home"); });

/* ------------------------------------------------------------------ */
/* Persist in-progress answers                                         */
/* ------------------------------------------------------------------ */
function persistProgress() {
  if (app.finished) return;
  const prev = store.data.progress[app.setId] || {};
  store.data.progress[app.setId] = Object.assign({}, prev, {
    finished: prev.finished || false,
    answered: app.answers.filter(a => a !== null).length
  });
  store.save();
}

/* ------------------------------------------------------------------ */
/* Confetti (high scores ≥ 90%)                                        */
/* ------------------------------------------------------------------ */
const cv = $("#confetti"), cx = cv.getContext("2d");
let parts = [], running = false;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
sizeCanvas(); addEventListener("resize", sizeCanvas);
const CCOLORS = ["#3f7fe0", "#17315c", "#6aa2f0", "#f2c14e", "#1ea97c", "#e0526b"];
function burstConfetti() {
  for (let i = 0; i < 180; i++) parts.push({
    x: Math.random() * cv.width, y: -20 - Math.random() * 60,
    r: 5 + Math.random() * 7, c: CCOLORS[(Math.random() * CCOLORS.length) | 0],
    vx: -1.6 + Math.random() * 3.2, vy: 2 + Math.random() * 3.2, rot: Math.random() * 6, vr: -0.2 + Math.random() * 0.4
  });
  if (!running) { running = true; loopConfetti(); }
}
function loopConfetti() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.rot += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
    cx.fillStyle = p.c; cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); cx.restore();
  });
  parts = parts.filter(p => p.y < cv.height + 40);
  if (parts.length) requestAnimationFrame(loopConfetti);
  else { cx.clearRect(0, 0, cv.width, cv.height); running = false; }
}

/* ------------------------------------------------------------------ */
/* Keyboard shortcuts + help modal                                     */
/* ------------------------------------------------------------------ */
$("#helpBtn").addEventListener("click", () => { $("#helpModal").hidden = false; });
$("#helpClose").addEventListener("click", () => { $("#helpModal").hidden = true; });
$("#helpModal").addEventListener("click", e => { if (e.target.id === "helpModal") $("#helpModal").hidden = true; });

document.addEventListener("keydown", e => {
  // dark mode: Shift+D anywhere
  if (e.shiftKey && (e.key === "D" || e.key === "d")) { $("#themeToggle").click(); return; }
  if ($("#helpModal").hidden === false && e.key === "Escape") { $("#helpModal").hidden = true; return; }
  if (!$("#exam").classList.contains("show")) return; // shortcuts only during exam
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea") return;

  const q = app.questions[app.index];
  // answer selection 1-4 / a-d
  const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
  if (keyMap.hasOwnProperty(e.key) && !(e.shiftKey)) {
    if (app.answers[app.index] === null) selectAnswer(keyMap[e.key]);
    return;
  }
  if (e.key === "ArrowRight") { $("#nextBtn").click(); }
  else if (e.key === "ArrowLeft") { $("#prevBtn").click(); }
  else if (e.key === "Enter") { $("#nextBtn").click(); }
  else if (e.key === "h" || e.key === "H") { if (!$("#hintBtn").disabled) useHint(); }
  else if (e.key === "n" || e.key === "N") { $("#navigator").classList.contains("open") ? closeNav() : openNav(); }
});

/* ------------------------------------------------------------------ */
/* Header / home buttons                                               */
/* ------------------------------------------------------------------ */
$("#brandHome").addEventListener("click", () => { renderHome(); show("home"); });
$("#startLearning").addEventListener("click", () => {
  document.getElementById("sets").scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
function boot() {
  renderHome();
  show("home");
  // hide loading screen after fonts/first paint
  setTimeout(() => { $("#loader").classList.add("hide"); }, 850);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
