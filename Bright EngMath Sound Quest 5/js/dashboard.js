/* =====================================================================
   BEM.dashboard — child-facing progress + teacher summary + print report
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h } = BEM.util;

  const PATTERN_LABEL = { ar:"ar", ir:"ir", ur:"ur", er:"er", or:"or" };

  function render(main) {
    const p = BEM.profiles.active();
    main.append(h("div", { class: "view-head print-report" }, [
      h("div", { class: "eyebrow" }, "My Progress"),
      h("h1", {}, p.name + "'s Sound Quest"),
      h("p", { class: "text-soft print-only" }, BEM.course.title + " — Progress Report")
    ]));

    const pct = BEM.progress.overallCompletion();
    const done = BEM.progress.completedUnits();
    const current = BEM.progress.currentUnit();

    // Child dashboard
    const top = h("div", { class: "dash-grid" }, [
      h("div", { class: "dash-card center" }, [
        h("h3", {}, "Course Completion"),
        h("div", { class: "ring", style: "--p:" + pct }, h("div", { class: "inner", text: pct + "%" })),
        h("p", { class: "text-soft", text: done.length + " of 8 units complete" })
      ]),
      h("div", { class: "dash-card" }, [
        h("h3", {}, "⭐ Stars & Badges"),
        h("div", { class: "row" }, [ statBox(BEM.progress.stars(), "Stars"), statBox(p.badges.length, "Badges") ]),
        h("a", { class: "btn btn-sm btn-ghost mt-4", href: "#/badges" }, "See my badges")
      ]),
      h("div", { class: "dash-card" }, [
        h("h3", {}, "🎯 Where I Am"),
        h("p", {}, current ? ("Current unit: " + BEM.units[current].title) : "All available units complete!"),
        current ? h("a", { class: "btn btn-sm btn-primary", href: "#/unit/" + current }, "Continue") : h("a", { class: "btn btn-sm btn-primary", href: "#/map" }, "Open map")
      ])
    ]);
    main.append(top);

    // Recent scores
    const scores = h("div", { class: "dash-card mt-5" }, [ h("h3", {}, "Recent Unit Scores") ]);
    let any = false;
    for (let n = 1; n <= 8; n++) {
      const u = p.units[n]; if (u && u.challenge) { any = true;
        const lvl = BEM.course.unitLevelFor(u.challenge.pct);
        scores.append(h("div", { class: "pattern-row" }, [
          h("span", { class: "name", style: "min-width:70px;", text: "Unit " + n }),
          h("div", { class: "pbar" }, h("span", { style: "width:" + u.challenge.pct + "%" })),
          h("span", { class: "pct", text: u.challenge.pct + "%" }),
          h("span", { class: "chip", style: "font-size:.7rem;", text: lvl.name })
        ]));
      }
    }
    if (!any) scores.append(h("p", { class: "text-soft" }, "Take a Unit Challenge to see your scores here."));
    main.append(scores);

    // Pattern mastery
    const mastery = BEM.progress.patternMastery();
    const patKeys = Object.keys(mastery);
    const mCard = h("div", { class: "dash-card mt-5" }, [ h("h3", {}, "Patterns Mastered & To Practise") ]);
    if (!patKeys.length) mCard.append(h("p", { class: "text-soft" }, "Complete a Unit Challenge to track your patterns."));
    else patKeys.forEach(k => {
      const b = mastery[k]; const pc = Math.round((b.correct / b.total) * 100);
      mCard.append(h("div", { class: "pattern-row" }, [
        h("span", { class: "name", text: PATTERN_LABEL[k] || k }),
        h("div", { class: "pbar" }, h("span", { style: "width:" + pc + "%;" + (pc < 60 ? "background:linear-gradient(90deg,var(--c-coral),var(--c-yellow))" : "") })),
        h("span", { class: "pct", text: pc + "%" })
      ]));
    });
    main.append(mCard);

    // Teacher-facing summary + print
    const teacher = h("div", { class: "dash-card mt-5" }, [
      h("h3", {}, "👩‍🏫 Teacher Summary"),
      h("p", { class: "text-soft" }, "Scores, attempts and comprehension for the active learner.")
    ]);
    const table = h("table", { class: "teacher-table" }, [ h("tr", {}, [ h("th", {}, "Unit"), h("th", {}, "Challenge"), h("th", {}, "Attempts"), h("th", {}, "Story quiz"), h("th", {}, "Status") ]) ]);
    for (let n = 1; n <= 8; n++) {
      if (!BEM.units[n]) continue;
      const u = p.units[n];
      table.append(h("tr", {}, [
        h("td", {}, BEM.units[n].title),
        h("td", {}, u && u.challenge ? (u.challenge.pct + "%") : "—"),
        h("td", {}, u && u.challenge ? ("" + u.challenge.attempts) : "—"),
        h("td", {}, u && u.comprehension ? (u.comprehension.score + "/" + u.comprehension.total) : "—"),
        h("td", {}, u && u.completed ? "Complete" : "In progress")
      ]));
    }
    teacher.append(table);
    teacher.append(h("div", { class: "row mt-4 no-print" }, [
      h("button", { class: "btn btn-sm btn-ghost", onclick: () => window.print() }, "🖨 Print this report"),
      done.length === 8 ? h("a", { class: "btn btn-sm btn-accent", href: "#/certificate" }, "Course certificate") : null
    ]));
    main.append(teacher);

    main.append(h("p", { class: "center text-soft mt-5 print-only" }, BEM.course.credit + " · " + BEM.course.copyright));
  }

  function statBox(v, l) { return h("div", { class: "stat" }, [ h("span", { class: "num", text: "" + v }), h("span", { class: "lbl", text: l }) ]); }

  BEM.dashboard = { render };
})();
