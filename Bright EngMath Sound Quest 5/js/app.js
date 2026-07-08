/* =====================================================================
   BEM.app — utilities, app shell, toast, and top-level views
   (home, adventure map, profiles, dashboard, badges, about, unit hub).
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  /* ---------------- tiny DOM helper ---------------- */
  function h(tag, props, children) {
    const el = document.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null) continue;
        if (k === "class") el.className = v;
        else if (k === "html") el.innerHTML = v;
        else if (k === "text") el.textContent = v;
        else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
        else if (k === "dataset") Object.assign(el.dataset, v);
        else el.setAttribute(k, v);
      }
    }
    if (children != null) appendChildren(el, children);
    return el;
  }
  function appendChildren(el, c) {
    if (Array.isArray(c)) c.forEach(x => appendChildren(el, x));
    else if (c instanceof Node) el.appendChild(c);
    else if (c != null) el.appendChild(document.createTextNode(String(c)));
  }
  const clear = el => { while (el.firstChild) el.removeChild(el.firstChild); return el; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  /* Highlight a target grapheme inside a word (child-facing). */
  function hi(word, gr) {
    if (!gr) return esc(word);
    const i = word.toLowerCase().indexOf(gr.toLowerCase());
    if (i < 0) return esc(word);
    return esc(word.slice(0, i)) + '<span class="gr">' + esc(word.slice(i, i + gr.length)) + "</span>" + esc(word.slice(i + gr.length));
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  BEM.util = { h, clear, esc, hi, shuffle, appendChildren };

  /* ---------------- toast ---------------- */
  let toastWrap;
  BEM.toast = function (msg, ms, win) {
    if (!toastWrap) { toastWrap = h("div", { class: "toast-wrap", "aria-live": "polite" }); document.body.appendChild(toastWrap); }
    const t = h("div", { class: "toast" + (win ? " win" : ""), text: msg });
    toastWrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 300); }, ms || 1800);
  };

  /* Small star-burst near an element for correct answers. */
  BEM.burst = function (target) {
    if (!BEM.storage.settings().soundEffects) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = target.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const s = h("span", { class: "starburst", text: "⭐" });
      s.style.left = (r.left + r.width / 2 + (Math.random() * 40 - 20)) + "px";
      s.style.top = (r.top + r.height / 2) + "px";
      s.style.position = "fixed";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 750);
    }
  };

  /* ---------------- navigation ---------------- */
  BEM.go = function (hash) { location.hash = hash; };

  /* ---------------- shell ---------------- */
  let mainEl;
  function buildShell() {
    const app = document.getElementById("app");
    clear(app);

    const skip = h("a", { class: "skip-link", href: "#main" }, "Skip to content");
    const header = h("header", { class: "app-header" }, [
      h("a", { class: "brand", href: "#/", "aria-label": "Bright EngMath home" }, [
        h("span", { class: "brand-mark", "aria-hidden": "true" }, "BE"),
        h("span", {}, "Sound Quest 5")
      ]),
      h("div", { class: "header-spacer" }),
      navMenu(),
      profileChip()
    ]);

    mainEl = h("main", { class: "app-main", id: "main", tabindex: "-1" });

    const footer = h("footer", { class: "app-footer" }, [
      h("p", { html: "<strong>" + BEM.course.brand + "</strong> — Sound Quest 5" }),
      h("p", { text: BEM.course.credit }),
      h("p", { text: BEM.course.copyright })
    ]);

    app.append(skip, header, mainEl, footer);
    BEM.shell = { main: () => mainEl, refreshHeader: () => { header.replaceChild(navMenu(), header.children[2]); header.replaceChild(profileChip(), header.children[3]); } };
  }

  function navMenu() {
    const links = [
      ["#/map", "Map"], ["#/dictionary", "Dictionary"], ["#/progress", "Progress"],
      ["#/badges", "Badges"], ["#/teacher", "Teacher"], ["#/about", "About"]
    ];
    return h("nav", { class: "row no-print", "aria-label": "Main" },
      links.map(([href, label]) => h("a", { class: "btn-ghost btn btn-sm", href }, label)));
  }

  function profileChip() {
    const p = BEM.profiles.active();
    if (!p) return h("a", { class: "btn btn-sm btn-primary", href: "#/profiles" }, "Choose profile");
    return h("a", { class: "header-profile", href: "#/profiles", "aria-label": "Switch learner profile" }, [
      h("span", { class: "avatar", html: BEM.profiles.avatarSVG(p.avatar) }),
      h("span", {}, p.name)
    ]);
  }

  /* ================= VIEWS ================= */
  const views = {};

  views.home = function (main) {
    const p = BEM.profiles.active();
    const hero = h("section", { class: "hero" }, [
      h("span", { class: "blob a" }), h("span", { class: "blob b" }), h("span", { class: "blob c" }),
      h("h1", { text: BEM.course.title }),
      h("p", { class: "sub", text: BEM.course.subtitle }),
      h("div", { class: "cta-row" }, [
        h("a", { class: "btn btn-warm", href: "#/map" }, p ? "Continue Quest ▶" : "Start the Quest ▶"),
        h("a", { class: "btn btn-ghost", href: "#/about" }, "About this course")
      ])
    ]);

    const cards = h("div", { class: "dash-grid mt-5" }, [
      infoCard("🗺️", "Adventure Map", "Travel through eight themed destinations, from Star Farm to Treasure Island.", "#/map", "Open map"),
      infoCard("📖", "Stories & Reading", "Read an original phonics story in every unit and answer fun questions.", "#/map", "Explore units"),
      infoCard("🏅", "Badges & Progress", "Collect stars and badges as you master each sound.", "#/badges", "See badges"),
      infoCard("👩‍🏫", "Teacher Mode", "Unlock units, adjust settings and print reports.", "#/teacher", "Teacher tools")
    ]);

    main.append(hero, cards);
    if (!p) main.append(h("p", { class: "center text-soft mt-4" }, "Tip: create a learner profile to save your stars and badges on this device."));
  };

  function infoCard(icon, title, body, href, cta) {
    return h("div", { class: "dash-card" }, [
      h("h3", {}, [h("span", { "aria-hidden": "true" }, icon), " " + title]),
      h("p", { class: "text-soft", text: body }),
      h("a", { class: "btn btn-sm btn-ghost", href }, cta)
    ]);
  }

  views.map = function (main) {
    main.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Your Journey"),
      h("h1", {}, "Adventure Map"),
      h("p", { class: "text-soft" }, "Tap a destination to begin. Locked stops open as you finish each unit.")
    ]));

    const grid = h("div", { class: "map" });
    BEM.course.map.forEach(item => {
      const available = BEM.progress.isAvailable(item);
      const unlocked = BEM.progress.isUnlocked(item);
      const complete = item.type === "unit" && BEM.progress.isUnitComplete(item.n);
      const dest = h(unlocked ? "button" : "div", {
        class: "dest" + (item.type === "review" ? " review" : ""),
        "aria-disabled": unlocked ? "false" : "true",
        type: unlocked ? "button" : null,
        onclick: unlocked ? () => routeForItem(item) : null
      }, [
        h("span", { class: "badge-scene", style: "background:" + (item.color) + "22;", html: BEM.art.svg(item.art) }),
        h("span", { class: "dest-title", text: item.title }),
        h("span", { class: "dest-sub", text: available ? item.theme : "Coming soon" }),
        complete ? h("span", { class: "dest-done", "aria-label": "Completed" }, "✓") : null,
        !unlocked ? h("span", { class: "lock", "aria-hidden": "true" }, "🔒") : null
      ]);
      if (!available) dest.title = "This part opens in a later content pack.";
      grid.append(dest);
    });
    main.append(grid);
    main.append(h("p", { class: "text-soft center mt-5" },
      "Phase 1 preview: Unit 1 (Star Farm) is fully playable. Further units unlock as they are added."));
  };

  function routeForItem(item) {
    if (item.type === "unit") BEM.go("#/unit/" + item.n);
    else if (item.type === "review") BEM.go("#/review/" + item.n);
    else if (item.type === "final") BEM.go("#/final");
  }

  /* ---- Profiles view ---- */
  views.profiles = function (main) {
    main.append(h("div", { class: "view-head" }, [
      h("div", { class: "eyebrow" }, "Who is learning?"),
      h("h1", {}, "Learner Profiles"),
      h("p", { class: "teacher-note", html:
        "Profiles are stored only in <b>this browser on this device</b>. This is a local convenience feature, not a secure online account." })
    ]));

    const list = h("div", { class: "grid grid-auto" });
    BEM.profiles.all().forEach(p => {
      const active = BEM.profiles.active() && BEM.profiles.active().id === p.id;
      list.append(h("div", { class: "card card-pad-sm", style: active ? "border-color:var(--c-teal);" : "" }, [
        h("div", { class: "row" }, [
          h("span", { class: "avatar", style: "width:56px;height:56px;", html: BEM.profiles.avatarSVG(p.avatar) }),
          h("div", {}, [ h("strong", { text: p.name }), h("div", { class: "text-soft", style:"font-size:.85rem;",
            text: (BEM.progress ? "" : "") + (p.stars || 0) + " ★ · " + (p.badges.length) + " badges" }) ])
        ]),
        h("div", { class: "row mt-4" }, [
          h("button", { class: "btn btn-sm btn-primary", onclick: () => { BEM.profiles.setActive(p.id); BEM.shell.refreshHeader(); BEM.go("#/map"); } }, active ? "Continue" : "Play as this"),
          h("button", { class: "btn btn-sm btn-ghost", onclick: () => { const n = prompt("New name:", p.name); if (n) { BEM.profiles.rename(p.id, n); BEM.router.render(); BEM.shell.refreshHeader(); } } }, "Rename"),
          h("button", { class: "btn btn-sm btn-ghost", onclick: () => { if (confirm("Remove " + p.name + "? This deletes their progress on this device.")) { BEM.profiles.remove(p.id); BEM.router.render(); BEM.shell.refreshHeader(); } } }, "Remove")
        ])
      ]));
    });

    if (BEM.profiles.count() < BEM.profiles.max) list.append(newProfileCard());
    main.append(list);
  };

  function newProfileCard() {
    let name = "", avatar = "sky";
    const avatarRow = h("div", { class: "row" }, BEM.profiles.avatarKeys().map(k =>
      h("button", { class: "btn-icon", "aria-label": "Choose avatar " + k, style: "width:48px;height:48px;overflow:hidden;padding:0;",
        onclick: (e) => { avatar = k; [...avatarRow.children].forEach(c => c.style.outline = ""); e.currentTarget.style.outline = "3px solid var(--c-teal)"; } },
        h("span", { style: "display:block;width:100%;height:100%;border-radius:50%;overflow:hidden;", html: BEM.profiles.avatarSVG(k) }))));
    const input = h("input", { type: "text", maxlength: "18", placeholder: "Learner name", oninput: e => name = e.target.value.trim() });
    return h("div", { class: "card card-pad-sm" }, [
      h("h3", {}, "➕ New learner"),
      h("div", { class: "field" }, [ h("label", { for: "np" }, "Name"), input ]),
      h("label", { class: "text-soft", style: "font-size:.85rem;" }, "Pick an avatar"),
      avatarRow,
      h("button", { class: "btn btn-primary btn-block mt-4", onclick: () => {
        if (!name) { BEM.toast("Please type a name."); return; }
        const r = BEM.profiles.create(name, avatar);
        if (r.error) { BEM.toast(r.error); return; }
        BEM.shell.refreshHeader(); BEM.go("#/map");
      } }, "Create profile")
    ]);
  }

  /* ---- Dashboard (progress) ---- */
  views.progress = function (main) {
    if (!requireProfile(main)) return;
    BEM.dashboard.render(main);
  };

  /* ---- Badges ---- */
  views.badges = function (main) {
    if (!requireProfile(main)) return;
    main.append(h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Rewards"), h("h1", {}, "My Badges") ]));
    const grid = h("div", { class: "badge-grid" });
    BEM.course.badges.forEach(b => {
      const owned = BEM.progress.hasBadge(b.id);
      grid.append(h("div", { class: "badge" + (owned ? "" : " locked") }, [
        h("div", { class: "art", html: BEM.art.svg(b.art) }),
        h("div", { class: "bname", text: b.name }),
        h("div", { class: "bdesc", text: b.desc }),
        h("div", { class: "chip " + (owned ? "chip-core" : ""), style: "margin-top:8px;font-size:.75rem;", text: owned ? "Earned" : "Locked" })
      ]));
    });
    main.append(grid);
  };

  /* ---- About ---- */
  views.about = function (main) {
    main.append(h("div", { class: "card cert-wrap" }, [
      h("div", { class: "eyebrow" }, "About this course"),
      h("h1", {}, BEM.course.title),
      h("p", {}, "Bright EngMath Sound Quest 5 is an original interactive phonics course designed to help young learners develop advanced decoding, spelling, vocabulary, and reading skills through lessons, games, stories, and assessments."),
      h("p", { class: "text-soft" }, "Designed for children aged about 7–10, including ESL and EFL learners who already know basic short vowels, long vowels, consonant sounds, and simple digraphs. Suitable for classroom teaching, one-to-one tutoring, independent practice, homework, revision, and assessment."),
      h("p", {}, "All characters, stories, artwork, examples, and activities are original Bright EngMath material. This product is independent and is not affiliated with, or a companion to, any third-party textbook or publisher."),
      h("hr"),
      h("p", { html: "<strong>" + BEM.course.credit + "</strong>" }),
      h("p", { class: "text-soft", text: BEM.course.copyright })
    ]));
  };

  function requireProfile(main) {
    if (BEM.profiles.active()) return true;
    main.append(h("div", { class: "card center" }, [
      h("h2", {}, "Choose a learner first"),
      h("p", { class: "text-soft" }, "Create or pick a profile to save progress."),
      h("a", { class: "btn btn-primary", href: "#/profiles" }, "Go to profiles")
    ]));
    return false;
  }

  /* ================= UNIT HUB ================= */
  const SECTIONS = [
    { key: "welcome",   label: "Welcome" },
    { key: "goals",     label: "Goals" },
    { key: "patterns",  label: "Meet the Patterns" },
    { key: "vocab",     label: "Picture Vocabulary" },
    { key: "practice",  label: "Guided Practice" },
    { key: "games",     label: "Game Zone" },
    { key: "sentences", label: "Sentence Reading" },
    { key: "story",     label: "Story Time" },
    { key: "wordsToKnow", label: "Words to Know" },
    { key: "comprehension", label: "Comprehension" },
    { key: "challenge", label: "Unit Challenge" },
    { key: "mistakes",  label: "Review Mistakes" },
    { key: "badge",     label: "Unit Badge" },
    { key: "teacher",   label: "Teacher Summary" }
  ];

  views.unit = function (main, params) {
    if (!requireProfile(main)) return;
    const n = parseInt(params[0], 10);
    const unit = BEM.units[n];
    if (!unit) { main.append(devError("Unit " + n + " is not available yet.", "This unit opens in a later content pack.")); return; }
    const section = params[2] || "welcome";
    BEM.unitView.render(main, n, section);
  };

  /* Unit view controller lives here so it can coordinate every engine. */
  BEM.unitView = {
    render(main, n, section) {
      const unit = BEM.units[n];
      document.documentElement.style.setProperty("--unit-accent", unit.color);

      main.append(h("nav", { class: "crumbs" }, [
        h("a", { href: "#/map" }, "Map"), " › ", h("span", { text: unit.title })
      ]));

      // step pills
      const steps = h("div", { class: "steps no-print" }, SECTIONS.map(s =>
        h("button", { class: "step-pill" + (BEM.progress.sectionDone(n, s.key) ? " done" : ""),
          "aria-current": s.key === section ? "true" : "false",
          onclick: () => BEM.go("#/unit/" + n + "/section/" + s.key) }, s.label)));
      main.append(steps);

      const body = h("div", { id: "unit-body" });
      main.append(body);
      this.section(body, n, section);
    },

    nav(n, section, dir) {
      const i = SECTIONS.findIndex(s => s.key === section);
      const j = Math.min(SECTIONS.length - 1, Math.max(0, i + dir));
      BEM.go("#/unit/" + n + "/section/" + SECTIONS[j].key);
    },

    footerNav(n, section) {
      const i = SECTIONS.findIndex(s => s.key === section);
      return h("div", { class: "row-between mt-5 no-print" }, [
        i > 0 ? h("button", { class: "btn btn-ghost", onclick: () => this.nav(n, section, -1) }, "◀ Back") : h("span"),
        i < SECTIONS.length - 1 ? h("button", { class: "btn btn-primary", onclick: () => { BEM.progress.markSection(n, section); this.nav(n, section, 1); } }, "Next ▶") : h("a", { class: "btn btn-accent", href: "#/map" }, "Back to Map")
      ]);
    },

    section(body, n, section) {
      const unit = BEM.units[n];
      clear(body);
      const done = () => BEM.progress.markSection(n, section);

      switch (section) {
        case "welcome": {
          body.append(h("section", { class: "card", style: "border-top:6px solid " + unit.color } , [
            h("div", { class: "row", style: "gap:20px;align-items:center;" }, [
              h("span", { class: "badge-scene", style: "width:110px;height:110px;background:" + unit.color + "22;", html: BEM.art.svg((BEM.course.map.find(mi => mi.type === "unit" && mi.n === n) || {}).art || "star") }),
              h("div", {}, [
                h("div", { class: "eyebrow" }, "Unit " + n),
                h("h1", { text: "Welcome to " + unit.title + "!" }),
                h("p", { text: unit.intro })
              ])
            ]),
            h("div", { class: "row mt-4" }, unit.patternKeys.map(pk => h("span", { class: "chip chip-pattern", text: pk })) ),
            h("h3", { class: "mt-5" }, "In this unit, you will:"),
            h("ul", { class: "goals" }, unit.goals.map(g => h("li", { text: g }))),
            h("div", { class: "row mt-5" }, [
              h("button", { class: "btn btn-warm", onclick: () => { done(); this.nav(n, section, 1); } },
                BEM.progress.sectionDone(n, "patterns") ? "Continue Unit ▶" : "Start Unit ▶")
            ])
          ]));
          done();
          break;
        }
        case "goals": {
          body.append(h("section", { class: "card" }, [
            h("h1", {}, "Learning Goals"),
            h("p", { class: "text-soft" }, "Here is what you will be able to do by the end of " + unit.title + "."),
            h("ul", { class: "goals" }, unit.goals.map(g => h("li", { text: g }))),
            h("h3", { class: "mt-5" }, "Target patterns"),
            h("div", { class: "row" }, unit.patternKeys.map(pk => h("span", { class: "chip chip-pattern", text: pk })))
          ]));
          done();
          break;
        }
        case "patterns": body.append(this.patterns(n)); done(); break;
        case "vocab": body.append(BEM.dictionary.unitVocab(n)); done(); break;
        case "practice": BEM.activities.mountGroup(body, n, "practice"); break;
        case "games": BEM.activities.mountGroup(body, n, "games"); break;
        case "sentences": body.append(this.sentences(n)); done(); break;
        case "story": BEM.story.open(body, n); break;
        case "wordsToKnow": body.append(BEM.story.wordsToKnow(n)); done(); break;
        case "comprehension": BEM.quiz.comprehension(body, n); break;
        case "challenge": BEM.quiz.challenge(body, n); break;
        case "mistakes": body.append(BEM.quiz.mistakesView(n)); break;
        case "badge": body.append(this.badge(n)); break;
        case "teacher": body.append(BEM.teacher.unitSummary(n)); break;
        default: body.append(devError("Unknown section: " + section));
      }
      body.append(this.footerNav(n, section));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    patterns(n) {
      const unit = BEM.units[n];
      const wrap = h("section", {}, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Meet the Patterns"), h("h1", {}, "New Sounds in " + unit.title) ]) ]);
      const grid = h("div", { class: "pattern-cards" });
      unit.patternCards.forEach(pc => {
        const wordList = pc.examples.map(e => e.w).join(", ");
        const card = h("div", { class: "pcard" }, [
          h("div", { class: "big-pat", text: pc.pattern }),
          h("div", { class: "say", text: pc.say }),
          h("div", { class: "examples" }, pc.examples.map(e => h("span", { class: "ex", html: BEM.util.hi(e.w, pc.pattern) + ' <span class="seg">(' + esc(e.seg) + ")</span>" }))),
          BEM.audio.controls(() => pc.examples.map(e => e.w).join(", "), { slow: true }),
        ]);
        // quick check
        const qc = pc.quickCheck;
        const qcWrap = h("div", { class: "mt-4", style: "background:var(--c-bg-soft);border-radius:14px;padding:12px;" }, [
          h("div", { class: "q-sub", html: "Quick check: " + qc.prompt })
        ]);
        const opts = h("div", { class: "options" }, qc.choices.map((c, i) => {
          const b = h("button", { class: "opt", type: "button", text: c, onclick: () => {
            [...opts.children].forEach(x => { x.disabled = true; });
            if (i === qc.answer) { b.classList.add("correct"); BEM.burst(b); BEM.toast("You found the pattern!", 1400, true); }
            else { b.classList.add("wrong"); opts.children[qc.answer].classList.add("reveal"); }
            qcWrap.append(h("div", { class: "q-sub mt-4", text: qc.explain }));
          } });
          return b;
        }));
        qcWrap.append(opts);
        card.append(qcWrap);
        grid.append(card);
      });
      wrap.append(grid);
      wrap.append(h("p", { class: "teacher-note mt-5" }, "Teacher note: " + unit.patternCards.map(p => p.teacherNote).join(" ")));
      return wrap;
    },

    sentences(n) {
      const unit = BEM.units[n];
      let idx = 0;
      const wrap = h("section", { class: "activity" }, [ h("div", { class: "view-head" }, [ h("div", { class: "eyebrow" }, "Sentence Reading"), h("h1", {}, "Read and Listen") ]) ]);
      const card = h("div", { class: "card" });
      wrap.append(card);
      const render = () => {
        clear(card);
        const s = unit.sentences[idx];
        let html = esc(s.text);
        s.targets.forEach(t => {
          const re = new RegExp("\\b(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "gi");
          html = html.replace(re, '<span class="gr">$1</span>');
        });
        card.append(
          h("div", { class: "round-meta" }, "Sentence " + (idx + 1) + " of " + unit.sentences.length + " · pattern " + s.pattern),
          h("p", { class: "story-text mt-4", html: html }),
          BEM.audio.controls(s.text, { slow: true }),
          h("div", { class: "row-between mt-5" }, [
            h("button", { class: "btn btn-ghost", onclick: () => { idx = (idx - 1 + unit.sentences.length) % unit.sentences.length; render(); } }, "◀ Previous"),
            h("span", { class: "page-count", text: (idx + 1) + " / " + unit.sentences.length }),
            h("button", { class: "btn btn-primary", onclick: () => { idx = (idx + 1) % unit.sentences.length; render(); } }, "Next ▶")
          ])
        );
      };
      render();
      return wrap;
    },

    badge(n) {
      const unit = BEM.units[n];
      const owned = BEM.progress.hasBadge("unit-" + n);
      const b = BEM.course.badge("unit-" + n);
      return h("section", { class: "card center" }, [
        h("div", { class: "eyebrow" }, "Unit Badge"),
        h("div", { class: "badge " + (owned ? "just-earned" : "locked"), style: "max-width:220px;margin:16px auto;" }, [
          h("div", { class: "art", html: BEM.art.svg(b.art) }),
          h("div", { class: "bname", text: b.name })
        ]),
        owned
          ? h("p", {}, "You earned the " + b.name + "! Well done finishing " + unit.title + ".")
          : h("p", { class: "text-soft" }, "Score 60% or more on the Unit Challenge to earn this badge."),
        owned
          ? h("a", { class: "btn btn-accent", href: "#/certificate/unit/" + n }, "Get your unit certificate")
          : h("button", { class: "btn btn-primary", onclick: () => BEM.go("#/unit/" + n + "/section/challenge") }, "Go to Unit Challenge")
      ]);
    }
  };

  function devError(title, detail) {
    return h("div", { class: "dev-error" }, [ h("h3", {}, "⚠️ " + title), detail ? h("p", { text: detail }) : null ]);
  }
  BEM.devError = devError;

  /* ================= boot ================= */
  BEM.views = views;
  BEM.boot = function () {
    buildShell();
    BEM.router.init();
    // Apply presentation mode if previously set
    document.documentElement.classList.toggle("presentation", !!BEM.storage.settings().presentation);
  };

  document.addEventListener("DOMContentLoaded", BEM.boot);
})();
