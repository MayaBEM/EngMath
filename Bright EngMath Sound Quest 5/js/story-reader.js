/* =====================================================================
   BEM.story — page-by-page story reader + Words to Know activities.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear, esc, shuffle } = BEM.util;

  function highlight(text, targets) {
    let html = esc(text);
    (targets || []).forEach(t => {
      const re = new RegExp("\\b(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "g");
      html = html.replace(re, '<span class="gr">$1</span>');
    });
    return html;
  }

  function open(container, n) {
    clear(container);
    const unit = BEM.units[n];
    const st = unit.story;
    let page = 0;
    const stored = BEM.profiles.active().units[n];
    if (stored && stored.storyPage) page = Math.min(stored.storyPage, st.pages.length - 1);

    container.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Story Time"),
      h("h1", {}, st.title),
      h("p", { class: "text-soft", text: "A Bright EngMath story · " + st.characters })
    ]));

    const book = h("div", { class: "story-book" });
    container.append(book);

    const tools = h("div", { class: "story-tools no-print" }, [
      h("button", { class: "btn btn-sm btn-ghost", onclick: () => { page = 0; render(); } }, "↺ Read again"),
      h("a", { class: "btn btn-sm btn-ghost", href: "#/unit/" + n + "/section/wordsToKnow" }, "📚 Words to Know"),
      h("a", { class: "btn btn-sm btn-accent", href: "#/unit/" + n + "/section/comprehension" }, "❓ Story Quiz")
    ]);
    container.append(tools);

    function render() {
      clear(book);
      const p = st.pages[page];
      BEM.progress.setStoryPage(n, page);
      const illus = h("div", { class: "story-illus", html: BEM.art.svg(p.art) });
      const body = h("div", { class: "story-page-body" }, [
        h("p", { class: "story-text", html: highlight(p.text, p.targets) }),
        BEM.audio.controls(p.text, { slow: true })
      ]);
      const nav = h("div", { class: "story-nav no-print" }, [
        h("button", { class: "btn btn-ghost", disabled: page === 0 ? "" : null, onclick: () => { if (page > 0) { page--; render(); } } }, "◀ Previous"),
        h("span", { class: "page-count", text: "Page " + (page + 1) + " of " + st.pages.length }),
        page < st.pages.length - 1
          ? h("button", { class: "btn btn-primary", onclick: () => { page++; render(); } }, "Next ▶")
          : h("button", { class: "btn btn-warm", onclick: finish }, "Finish ★")
      ]);
      book.append(illus, body, nav);
      if (BEM.audio.supported && BEM.storage.settings().soundEffects) BEM.audio.slow(p.text);
      window.scrollTo({ top: book.offsetTop - 80, behavior: "smooth" });
    }

    function finish() {
      BEM.progress.markStoryDone(n);
      BEM.progress.markSection(n, "story");
      clear(book);
      book.append(h("div", { class: "round-done" }, [
        h("div", { class: "big" }, "The End ★"),
        h("p", {}, "You read the whole story! Now meet the Words to Know or try the Story Quiz."),
        h("div", { class: "row", style: "justify-content:center;" }, [
          h("a", { class: "btn btn-primary", href: "#/unit/" + n + "/section/wordsToKnow" }, "Words to Know"),
          h("a", { class: "btn btn-accent", href: "#/unit/" + n + "/section/comprehension" }, "Story Quiz")
        ])
      ]));
    }
    render();
  }

  /* ---------- Words to Know ---------- */
  function wordsToKnow(n) {
    const unit = BEM.units[n];
    const words = unit.story.vocab;
    const wrap = h("section", {}, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Words to Know"), h("h1", {}, "Story Vocabulary") ]) ]);

    // Reference cards
    const grid = h("div", { class: "vocab-grid" });
    words.forEach(w => {
      grid.append(h("div", { class: "vocab-card" }, [
        h("div", { class: "vocab-pic", html: BEM.art.svg(w.art) }),
        h("div", { class: "vocab-body" }, [
          h("div", { class: "vocab-word", text: w.word }),
          BEM.storage.settings().definitions ? h("div", { class: "vocab-def", text: w.def }) : null,
          h("div", { class: "vocab-ex", text: "“" + w.ex + "”" }),
          h("div", { class: "vocab-meta" }, [ h("span", { class: "chip", style: "font-size:.72rem;", text: "Story page " + w.page }) ]),
          BEM.audio.controls(w.word, { slow: true })
        ])
      ]));
    });
    wrap.append(grid);

    // Activities
    wrap.append(h("h2", { class: "mt-5" }, "Practise the words"));
    const tabs = h("div", { class: "row no-print" });
    const area = h("div", { class: "mt-4" });
    const acts = [ ["Flip Cards", flipCards], ["Match the Meaning", matchMeaning], ["Picture Match", pictureMatch] ];
    acts.forEach(([label, fn], i) => tabs.append(h("button", { class: "btn btn-sm " + (i === 0 ? "btn-primary" : "btn-ghost"), onclick: (e) => { [...tabs.children].forEach(c => c.className = "btn btn-sm btn-ghost"); e.currentTarget.className = "btn btn-sm btn-primary"; clear(area); fn(area, words); } }, label)));
    wrap.append(tabs, area);
    flipCards(area, words);
    return wrap;
  }

  function flipCards(area, words) {
    area.append(h("p", { class: "text-soft" }, "Tap a card to flip it. Word on the front, meaning on the back."));
    const grid = h("div", { class: "flip-grid" });
    words.forEach(w => {
      const card = h("div", { class: "flip", tabindex: "0", role: "button", "aria-label": "Flip card " + w.word }, [
        h("div", { class: "flip-inner" }, [
          h("div", { class: "flip-face flip-front", text: w.word }),
          h("div", { class: "flip-face flip-back", text: w.def })
        ])
      ]);
      const toggle = () => card.classList.toggle("on");
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
      grid.append(card);
    });
    area.append(grid);
  }

  function matchMeaning(area, words) {
    const pick = shuffle(words).slice(0, Math.min(6, words.length));
    area.append(h("p", { class: "text-soft" }, "Read the meaning, then tap the matching word."));
    let idx = 0, score = 0;
    const card = h("div", { class: "card" });
    area.append(card);
    function render() {
      clear(card);
      if (idx >= pick.length) { card.append(h("div", { class: "round-done" }, [ h("div", { class: "big", text: score + " / " + pick.length }), h("button", { class: "btn btn-primary", onclick: () => { idx = 0; score = 0; render(); } }, "Play again") ])); return; }
      const target = pick[idx];
      const choices = shuffle([target, ...shuffle(words.filter(w => w !== target)).slice(0, 2)]);
      card.append(h("div", { class: "round-meta" }, "Meaning " + (idx + 1) + " of " + pick.length),
        h("p", { class: "q-prompt", text: target.def }));
      const opt = h("div", { class: "options cols-2" });
      let attempt = 0;
      choices.forEach(c => {
        const b = h("button", { class: "opt", text: c.word, onclick: () => {
          if (c === target) { [...opt.children].forEach(x => x.disabled = true); b.classList.add("correct"); BEM.burst(b); score++; setTimeout(() => { idx++; render(); }, 500); }
          else if (attempt === 0) { attempt = 1; b.classList.add("wrong"); b.disabled = true; }
          else { [...opt.children].forEach(x => x.disabled = true); b.classList.add("wrong"); [...opt.children].find(x => x.textContent === target.word).classList.add("reveal"); setTimeout(() => { idx++; render(); }, 900); }
        } });
        opt.append(b);
      });
      card.append(opt);
    }
    render();
  }

  function pictureMatch(area, words) {
    const pick = shuffle(words).slice(0, Math.min(6, words.length));
    area.append(h("p", { class: "text-soft" }, "Read the word and tap the matching picture."));
    let idx = 0, score = 0;
    const card = h("div", { class: "card" });
    area.append(card);
    function render() {
      clear(card);
      if (idx >= pick.length) { card.append(h("div", { class: "round-done" }, [ h("div", { class: "big", text: score + " / " + pick.length }), h("button", { class: "btn btn-primary", onclick: () => { idx = 0; score = 0; render(); } }, "Play again") ])); return; }
      const target = pick[idx];
      const choices = shuffle([target, ...shuffle(words.filter(w => w !== target)).slice(0, 2)]);
      card.append(h("div", { class: "q-prompt center" }, [ h("span", { class: "word-lg", text: target.word }) ]), BEM.audio.controls(target.word, { slow: true }));
      const opt = h("div", { class: "options cols-2" });
      let attempt = 0;
      choices.forEach(c => {
        const b = h("button", { class: "opt opt-pic", "aria-label": "Picture", html: '<span class="pic">' + BEM.art.svg(c.art) + "</span>", onclick: () => {
          if (c === target) { [...opt.children].forEach(x => x.disabled = true); b.classList.add("correct"); BEM.burst(b); score++; setTimeout(() => { idx++; render(); }, 500); }
          else if (attempt === 0) { attempt = 1; b.classList.add("wrong"); b.disabled = true; }
          else { [...opt.children].forEach(x => x.disabled = true); b.classList.add("wrong"); setTimeout(() => { idx++; render(); }, 900); }
        } });
        opt.append(b);
      });
      card.append(opt);
    }
    render();
  }

  BEM.story = { open, wordsToKnow };
})();
