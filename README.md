# M.1 English Entrance Exam Mastery
### Advanced Practice for Competitive School Admission — by Bright EngMath

A complete, self-contained interactive English quiz website that prepares Thai Grade 6
students for competitive M.1 (Mathayom 1) entrance examinations. Seven full test sets,
**175 original questions**, every one explained in Thai.

---

## 🚀 Quick start (no installation needed)

1. Double-click **`index.html`** — it opens in any modern web browser (Chrome, Edge, Safari, Firefox).
2. That's it. There is **no login, no server, no build step, and no database.**
3. After the first load it works **offline** (only web fonts need internet the very first time).

Your progress, scores, badges and streaks are saved automatically **on your own device**
using the browser's local storage.

> To publish it online, just upload the single `index.html` file to any web host
> (e.g. Netlify drop, GitHub Pages, Google Sites file, Cloudflare Pages, or your own domain).

---

## 📦 What's inside

| Item | Details |
|------|---------|
| Test sets | **7** (Set 1 → Set 7) |
| Questions per set | **25** |
| Total questions | **175**, all original |
| Choices per question | 4 (one correct answer) |
| Language | Questions & passages in **English**; explanations & tips in **Thai** |
| Level | Upper Grade 6 → early secondary (CEFR **A2–B1**, with B1+ challenge items) |

### Exam structure (every set)
- **Part A – Grammar & Language Use** — 8 questions
- **Part B – Vocabulary in Context** — 5 questions
- **Part C – Conversation & Functional Language** — 4 questions
- **Part D – Cloze / Error Identification** — 3 questions
- **Part E – Reading Comprehension** — 5 questions (with an original passage)

### Difficulty roadmap
1. Foundation Plus
2. Intermediate Entrance Practice
3. Upper-Intermediate Challenge
4. Competitive School Practice
5. Gifted and EP Challenge
6. Advanced Entrance Simulation
7. Final Mastery Examination

---

## ✨ Features

- **Premium landing page** — hero, feature cards, mode comparison, 7-set roadmap, audience,
  teacher section, testimonial *placeholders*, FAQ and footer.
- **Student Dashboard** — completion ring, total/best/average scores, study time,
  strongest & weakest skills, per-set cards (Not Started / In Progress / Completed),
  skill-mastery bars and achievement badges.
- **Practice Mode** — instant Thai feedback after each answer, one retry per question, no timer.
- **Exam Mode** — answers hidden until submission, optional **30-minute timer** (teacher can
  switch it off on the Test Introduction page), flag-for-review, answer in any order,
  and an unanswered-question warning before submitting.
- **Interactive quiz page** — clear question card, section & difficulty labels, four large
  answer buttons, progress bar, question navigator, keyboard support, exit confirmation, and a
  **split-screen reading layout** (collapsible passage card on mobile).
- **Results page** — score, band message (never shaming), correct/incorrect/unanswered counts,
  time used, and a **skill-by-skill analysis** with a recommended next step. Confetti on 90%+.
- **Answer Review** — every question with your choice, the correct answer, status, the full Thai
  explanation, tested skill, and a "Review this topic" tag. Filter by **All / Incorrect / Correct /
  Grammar / Vocabulary / Conversation / Reading / Cloze**.
- **Teacher Presentation Mode** — full-screen, large-text classroom view: hide/reveal choices,
  reveal the answer, reveal the Thai explanation, random discussion prompts, one question at a
  time — ideal for Zoom, Google Meet or a projector.
- **Study Tips** — nine bilingual (English + Thai) strategy cards.
- **Gamification** — XP points, daily streak, skill-mastery bars, personal best, and 8 badges
  (Grammar Guardian, Vocabulary Explorer, Reading Detective, Conversation Star, Accuracy Ace,
  Five-Day Streak, Full-Marks Champion, Exam Ready).

---

## ♿ Accessibility & quality

- Responsive for desktop, tablet and mobile (no horizontal overflow).
- Keyboard navigation in the quiz: **1–4** or **A–D** to answer, **←/→** to move,
  **F** to flag, **Enter** to check (Practice Mode).
- ARIA labels/roles, visible focus states, and **reduced-motion** support.
- Answer keys are balanced across A/B/C/D in every set, with no long repeating runs.
- All 175 questions were validated programmatically (one defensible answer each, matching
  explanation indexes, correct per-section counts, no duplicates) and the full app was
  tested end-to-end (quiz flow, scoring, review filters, resume, teacher mode) with zero errors.

---

## 🎨 Customisation guide

Everything lives in the one `index.html` file. Common edits:

- **Shop name / credit** — search for `Bright EngMath` and edit the footer credit block.
- **Colours** — near the top, inside `<style>`, edit the CSS variables in `:root` (e.g. `--royal`, `--sky`).
- **Testimonials** — search for `Placeholder`; replace the sample cards with real reviews you collect.
- **Questions** — search for `const QUESTIONS=` (the question bank). Each item follows this shape:

```js
{
  id:"set1-q1", setId:1, section:"grammar", skill:"present simple vs present continuous",
  difficulty:"foundation",
  question:"…", options:["…","…","…","…"], correctAnswer:1,   // 0=A,1=B,2=C,3=D
  explanationThai:"…",
  wrongAnswerExplanationsThai:["…","","…","…"],  // empty string at the correct index
  tipThai:"…", passageId:null   // or "set1-r1" for reading questions
}
```
Reading passages live in `const PASSAGES={ "set1-r1": {title:"…", text:"…"}, … }`.

> Keep `correctAnswer` and the empty string in `wrongAnswerExplanationsThai` on the same index.

---

## 📄 Licence & credit

Original educational practice content created for M.1 entrance examination preparation.
This product is **not affiliated with or endorsed by any specific school or examination board.**

**Created by Bright EngMath — English and Mathematics Learning Resources.**

© 2026 Bright EngMath. All Rights Reserved. Original educational content created for English
learning and M.1 entrance examination preparation. This product is not affiliated with or
endorsed by any specific school, publisher, or examination board.
