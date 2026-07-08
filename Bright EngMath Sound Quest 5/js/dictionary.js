/* =====================================================================
   BEM.dictionary — picture vocabulary (per unit) + searchable
   picture dictionary (whole course).
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear, esc, hi, shuffle } = BEM.util;

  function vocabCard(v, unitN) {
    const showDef = BEM.storage.settings().definitions;
    const fav = h("button", { class: "fav-btn" + (BEM.progress.isFavorite(v.word) ? " on" : ""), "aria-label": "Favourite " + v.word, text: BEM.progress.isFavorite(v.word) ? "★" : "☆" });
    fav.addEventListener("click", () => { const on = BEM.progress.toggleFavorite(v.word); fav.classList.toggle("on", on); fav.textContent = on ? "★" : "☆"; });
    return h("div", { class: "vocab-card" }, [
      h("div", { class: "vocab-pic", html: BEM.art.svg(v.art || v.word) }),
      h("div", { class: "vocab-body" }, [
        h("div", { class: "row-between" }, [
          h("div", { class: "vocab-word", html: hi(v.word, v.gr) }),
          fav
        ]),
        v.seg ? h("div", { class: "seg", text: v.seg }) : null,
        showDef && v.def ? h("div", { class: "vocab-def", text: v.def }) : null,
        v.ex ? h("div", { class: "vocab-ex", text: "“" + v.ex + "”" }) : null,
        h("div", { class: "vocab-meta" }, [
          h("span", { class: "chip chip-pattern", style: "font-size:.7rem;", text: v.pattern }),
          h("span", { class: "chip " + (v.type === "core" ? "chip-core" : "chip-explorer"), style: "font-size:.7rem;", text: v.type === "core" ? "Core" : "Explorer" }),
          unitN ? h("span", { class: "chip", style: "font-size:.7rem;", text: "Unit " + unitN }) : null
        ]),
        BEM.audio.controls(v.word, { slow: true })
      ])
    ]);
  }

  /* ---------- per-unit picture vocabulary ---------- */
  function unitVocab(n) {
    const unit = BEM.units[n];
    const wrap = h("section", {}, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Picture Vocabulary"), h("h1", {}, unit.title + " Words") ]) ]);
    let filter = "all";
    const filters = h("div", { class: "filters no-print" });
    const grid = h("div", { class: "vocab-grid" });

    const chips = [ ["all", "All Words"], ["core", "Core Words"], ["explorer", "Explorer Words"] ];
    unit.patternKeys.forEach(pk => chips.push(["pat:" + pk, pk]));
    chips.forEach(([val, label]) => {
      const c = h("button", { class: "filter-chip", "aria-pressed": val === "all" ? "true" : "false", text: label, onclick: () => { filter = val; [...filters.children].forEach(x => x.setAttribute("aria-pressed", "false")); c.setAttribute("aria-pressed", "true"); render(); } });
      filters.append(c);
    });

    function render() {
      clear(grid);
      unit.vocab.filter(v => {
        if (filter === "all") return true;
        if (filter === "core") return v.type === "core";
        if (filter === "explorer") return v.type === "explorer";
        if (filter.startsWith("pat:")) return v.pattern === filter.slice(4);
        return true;
      }).forEach(v => grid.append(vocabCard(v, n)));
    }
    render();
    wrap.append(filters, grid);
    return wrap;
  }

  /* ---------- whole-course picture dictionary ---------- */
  function allWords() {
    const out = [];
    Object.keys(BEM.units).forEach(n => {
      (BEM.units[n].vocab || []).forEach(v => out.push(Object.assign({ unit: parseInt(n, 10) }, v)));
    });
    return out.sort((a, b) => a.word.localeCompare(b.word));
  }

  function view(main) {
    const words = allWords();
    main.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Reference"),
      h("h1", {}, "Picture Dictionary"),
      h("p", { class: "text-soft" }, "Search and filter every word in the course. Tap ☆ to save favourites.")
    ]));

    let q = "", letter = "", unit = "", pattern = "", type = "", favsOnly = false;

    const search = h("input", { type: "search", placeholder: "Search a word…", "aria-label": "Search words", oninput: e => { q = e.target.value.toLowerCase().trim(); render(); } });
    const units = [...new Set(words.map(w => w.unit))].sort();
    const patterns = [...new Set(words.map(w => w.pattern))].sort();

    const unitSel = selectEl("All units", units.map(u => ["" + u, "Unit " + u]), v => { unit = v; render(); });
    const patSel = selectEl("All patterns", patterns.map(p => [p, p]), v => { pattern = v; render(); });
    const typeSel = selectEl("Core & Explorer", [["core", "Core"], ["explorer", "Explorer"]], v => { type = v; render(); });

    const alpha = h("div", { class: "filters no-print" });
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(L => {
      alpha.append(h("button", { class: "filter-chip", text: L, onclick: (e) => { letter = letter === L.toLowerCase() ? "" : L.toLowerCase(); [...alpha.children].forEach(c => c.setAttribute("aria-pressed", "false")); if (letter) e.currentTarget.setAttribute("aria-pressed", "true"); render(); } }));
    });

    const tools = h("div", { class: "filters no-print" }, [
      search, unitSel, patSel, typeSel,
      h("button", { class: "filter-chip", "aria-pressed": "false", text: "★ Favourites", onclick: (e) => { favsOnly = !favsOnly; e.currentTarget.setAttribute("aria-pressed", favsOnly ? "true" : "false"); render(); } }),
      h("button", { class: "btn btn-sm btn-accent", onclick: randomWord }, "🎲 Random word"),
      h("button", { class: "btn btn-sm btn-warm", onclick: practiseFavourites }, "Practise favourites")
    ]);

    const grid = h("div", { class: "vocab-grid" });
    const count = h("p", { class: "text-soft" });
    main.append(tools, alpha, count, grid);

    function filtered() {
      return words.filter(w => {
        if (q && !w.word.toLowerCase().includes(q)) return false;
        if (letter && w.word[0].toLowerCase() !== letter) return false;
        if (unit && w.unit !== parseInt(unit, 10)) return false;
        if (pattern && w.pattern !== pattern) return false;
        if (type && w.type !== type) return false;
        if (favsOnly && !BEM.progress.isFavorite(w.word)) return false;
        return true;
      });
    }
    function render() {
      clear(grid);
      const list = filtered();
      count.textContent = list.length + " word" + (list.length === 1 ? "" : "s");
      if (!list.length) { grid.append(h("p", { class: "text-soft" }, "No words match. Try clearing a filter.")); return; }
      list.forEach(w => grid.append(vocabCard(w, w.unit)));
    }
    function randomWord() {
      const list = filtered().length ? filtered() : words;
      const w = list[Math.floor(Math.random() * list.length)];
      BEM.audio.say(w.word);
      clear(grid); count.textContent = "Random word"; grid.append(vocabCard(w, w.unit));
    }
    function practiseFavourites() {
      const favs = words.filter(w => BEM.progress.isFavorite(w.word));
      if (!favs.length) { BEM.toast("Tap ☆ on some words first to build a favourites list."); return; }
      favsOnly = true; render(); BEM.toast("Showing your " + favs.length + " favourite words.");
    }
    render();
  }

  function selectEl(placeholder, options, onchange) {
    const sel = h("select", { "aria-label": placeholder, onchange: e => onchange(e.target.value) });
    sel.append(h("option", { value: "" }, placeholder));
    options.forEach(([v, l]) => sel.append(h("option", { value: v }, l)));
    return sel;
  }

  BEM.dictionary = { view, unitVocab, vocabCard };
})();
