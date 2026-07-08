# Bright EngMath Sound Quest 5
### Advanced Phonics, Reading, Vocabulary, Games, and Assessment

An original, self-contained, interactive phonics course for children aged about 7–10
(including ESL/EFL learners who already know short vowels, long vowels, consonants and
simple digraphs). Built with plain **HTML, CSS and vanilla JavaScript** — no backend,
no database, no build step, no external libraries, no installation.

**Created by Bright EngMath — © Bright EngMath. All rights reserved.**

---

## How to run it locally

**Option A — just open the file (simplest).**
Double-click `index.html`, or drag it into any modern browser (Chrome, Edge, Safari, Firefox).
Everything runs from the page, so it works straight from disk.

**Option B — run a tiny local server (recommended for the smoothest audio).**
Some browsers restrict the speech voices on `file://`. A one-line local server avoids this:

```bash
cd bright-engmath-sound-quest-5
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

No packages are required — Python 3 ships with most systems. Any static server works.

**First steps in the app:** choose or create a learner profile → open the **Adventure Map**
→ enter **Star Farm (Unit 1)**. Teacher tools are under **Teacher** (default passcode `1234`).

---

## What is included (Phase 1)

Phase 1 delivers the complete reusable platform plus a **fully playable Unit 1 (Star Farm)**:

- **Home + Adventure Map** — eight themed destinations, four review zones, final tower.
- **Learner profiles** — up to 5, stored locally per browser/device (`localStorage`).
- **Unit lesson system** with all 16 standard sections (Welcome → Teacher Summary).
- **Audio system** — browser speech synthesis with play / slow / stop, a speaking
  indicator, no overlapping voices, and graceful fallback if speech is unavailable.
- **Picture Vocabulary** — 24 words (core + explorer) with original SVG art, filters,
  definitions, example sentences, favourites and audio.
- **10 interactive activity types** (≈60 practice items) in short rounds with a
  supportive two-attempt feedback system: Listen & Choose, Choose the Pattern,
  Complete the Word, Build the Word, Sound Sorting, Odd One Out, Word→Picture,
  Memory Match, Word Hunt (tap the word), True/False and Sentence Builder.
- **Sentence Reading** — 14 original sentences with highlighted target words and audio.
- **Story Time** — *The Star Map at the Farm*, an original 7-page story with per-page
  art, audio, and page navigation; earns the Story Reader badge.
- **Words to Know** — 10 story words with Flip Cards, Match the Meaning, Picture Match.
- **Reading Comprehension** — 10 questions (who/what/where/why/sequence/true-false/
  vocabulary-in-context/cause-effect) each with an explanation.
- **Unit Challenge** — 20-question mixed assessment (4 listening, 4 pattern, 4 spelling,
  3 vocabulary, 3 sentence, 2 comprehension) with HUD, streak, achievement levels,
  accuracy-by-pattern, strongest/weakest pattern and star awards.
- **Review My Mistakes** — every wrong answer stored with the correct answer, the
  highlighted pattern, an explanation, *Listen Again* and *Try a Similar Question*.
- **Progress dashboard** (child + teacher views) and a **print-friendly report**.
- **Badges** — 16 defined; unit + special badges award automatically.
- **Teacher Mode** — passcode gate, sequential locking / unlock-all, definitions,
  hints, sound effects, speech, reveal-answers, Quick Quiz length, Presentation Mode,
  per-unit and full resets, scores/mistakes view, print.
- **Certificates** — unit completion + final course certificate, print / save-as-PDF.
- **Data validation** — quizzes are validated before rendering; missing or malformed
  units show a helpful developer error instead of breaking the page.
- **Responsive + accessible** — semantic HTML, real buttons, keyboard support, visible
  focus, ARIA labels, reduced-motion support, no horizontal overflow, large touch targets.

Units 2–8, the Review Zones and the Final Challenge are wired into the map and show a
clear “Coming soon” state until their data files are added (see *Next files*).

---

## Project structure

```
bright-engmath-sound-quest-5/
├── index.html            # entry point; loads data then scripts (order matters)
├── README.md
├── css/
│   ├── variables.css     # design tokens (colours, type, spacing, unit themes)
│   ├── base.css          # reset, shell, typography, layout
│   ├── components.css    # buttons, cards, chips, map, modals, toggles
│   ├── activities.css    # activity + quiz UI
│   ├── story.css         # story reader, vocabulary cards, dictionary
│   ├── dashboard.css     # dashboard, badges, certificate, teacher, hero
│   └── print.css         # print/PDF styles
├── js/
│   ├── art.js            # original inline-SVG illustrations (licence-safe)
│   ├── storage.js        # versioned localStorage + safe migration
│   ├── profiles.js       # up to 5 local learner profiles + avatars
│   ├── audio.js          # speech-synthesis engine + audio control bar
│   ├── progress.js       # completion, scores, stars, badges, mistakes, unlocks
│   ├── app.js            # BEM.util helpers, app shell, home/map/unit views (boot)
│   ├── dictionary.js     # per-unit vocabulary + searchable picture dictionary
│   ├── activity-engine.js# 10 reusable activity types + round runner
│   ├── quiz-engine.js    # unit challenge, comprehension, mistakes review, validation
│   ├── story-reader.js   # page-by-page story + Words-to-Know games
│   ├── dashboard.js      # child + teacher progress + print report
│   ├── teacher-mode.js   # teacher tools + settings + unit summary
│   ├── certificate.js    # unit + final certificates
│   └── router.js         # hash-based routing (boot on DOMContentLoaded)
├── data/
│   ├── course.js         # course meta, adventure map, badges, achievement levels
│   └── unit-1.js         # complete original Unit 1 content + answer keys
└── assets/               # icons / illustrations / sounds (SVG art is inline in art.js)
```

> **Script order note:** `app.js` defines the shared `BEM.util` helpers, so `index.html`
> loads it immediately after the core services and **before** the feature modules.

---

## Test checklist

Open the app and confirm:

- [ ] Home loads; header shows brand, nav and profile chip.
- [ ] Create a learner profile; it appears in the header and is saved after reload.
- [ ] Adventure Map shows Unit 1 unlocked and later stops as “Coming soon”.
- [ ] **Unit 1 → every section** opens (Welcome … Teacher Summary) with no blank screens.
- [ ] **Meet the Patterns** — quick-check gives feedback and reveals the answer.
- [ ] **Audio** — 🔊 and 🐢 speak; starting new audio stops the previous one; the dot pulses.
- [ ] **Picture Vocabulary** — filters (All/Core/Explorer/by pattern) work; ☆ toggles favourites.
- [ ] **Guided Practice & Game Zone** — each game plays a round and shows a score.
- [ ] Build the Word, Sound Sorting, Memory Match and Sentence Builder all complete.
- [ ] **Sentence Reading** — target words highlighted; Previous/Next cycle sentences.
- [ ] **Story Time** — pages turn, audio plays, “Finish ★” awards the Story Reader badge.
- [ ] **Words to Know** — Flip Cards, Match the Meaning, Picture Match all work.
- [ ] **Comprehension** — 10 questions score correctly.
- [ ] **Unit Challenge** — 20 questions; HUD updates; results show level, accuracy-by-pattern,
      strongest/weakest, attempts and stars; a passing score marks the unit complete.
- [ ] **Review My Mistakes** — after a challenge, wrong answers appear with explanations
      and “Try a Similar Question” works.
- [ ] **Progress** — completion ring, stars, recent scores, pattern mastery; Print works.
- [ ] **Badges** — earned badges are highlighted; locked ones are greyed.
- [ ] **Teacher Mode** — passcode `1234`; toggles change behaviour; resets work; print works.
- [ ] **Certificate** — unit certificate prints/saves as PDF after Unit 1 is completed.
- [ ] **Responsive** — resize to a phone width: no horizontal scroll; buttons stay tappable.
- [ ] **Keyboard** — Tab reaches buttons; Enter/Space activate options; focus is visible.
- [ ] Visiting a not-yet-added unit shows a friendly developer error, not a broken page.

Automated checks used during development (optional, Node.js):
`node --check` on every JS file, a data-integrity harness (answer keys, choice sets,
challenge distribution, story targets), and a DOM smoke test across all routes and games.

---

## Next files to create (Phases 2–4)

Each new unit reuses the exact same engine; only a data file is needed.

**Phase 2 — Units 2–4**
- `data/unit-2.js` (Toy Town — ou, ow, oi, oy, oo, u)
- `data/unit-3.js` (Sunny Shore — au, aw, all, wa, or, oar)
- `data/unit-4.js` (Forest Fair — are, air, ea, ear, eer)

**Phase 3 — Units 5–8**
- `data/unit-5.js` (Music City — long vowels in open syllables)
- `data/unit-6.js` (Jungle Camp — schwa / unstressed vowels)
- `data/unit-7.js` (Mystery Castle — silent letters)
- `data/unit-8.js` (Treasure Island — common word endings)

**Phase 4 — Review Zones, Final Challenge, extras**
- `data/review-1.js … review-4.js` (+ a small `BEM.reviews` registry and a review view)
- `data/final-challenge.js` (50 questions in 5 missions + `BEM.final` + a final view)
- Original phonics chants per review zone; full badge wiring for review/final badges.

Add each new `data/unit-N.js` to `index.html` after `data/unit-1.js`; the map, dictionary,
dashboard and badges pick it up automatically.

---

*Bright EngMath Sound Quest 5 is an original interactive phonics course. All characters,
stories, artwork, examples and activities are original Bright EngMath material and are not
affiliated with, or a companion to, any third-party textbook or publisher.*
