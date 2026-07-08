/* =====================================================================
   BEM.certificate — unit completion + final course certificates.
   Save-as-PDF via the browser's print dialogue.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});
  const { h, clear } = BEM.util;

  function today() {
    return new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  function seal() {
    return `<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#17b3a3"/><circle cx="50" cy="50" r="38" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M50 26 L56 42 L73 42 L59 52 L64 69 L50 59 L36 69 L41 52 L27 42 L44 42 Z" fill="#ffce3d"/>
      <text x="50" y="86" text-anchor="middle" font-size="9" fill="#fff" font-family="Trebuchet MS, sans-serif" font-weight="700">BRIGHT ENGMATH</text></svg>`;
  }

  function view(main, params) {
    const p = BEM.profiles.active();
    if (!p) { main.append(h("div", { class: "card center" }, [ h("h2", {}, "Choose a learner first"), h("a", { class: "btn btn-primary", href: "#/profiles" }, "Go to profiles") ])); return; }

    if (params[0] === "unit") return unitCertificate(main, p, parseInt(params[1], 10));
    return finalCertificate(main, p);
  }

  function unitCertificate(main, p, n) {
    const unit = BEM.units[n];
    if (!BEM.progress.isUnitComplete(n)) {
      main.append(h("div", { class: "card center" }, [ h("h2", {}, "Not yet unlocked"), h("p", { class: "text-soft" }, "Finish the " + unit.title + " Unit Challenge (60%+) to earn this certificate."), h("a", { class: "btn btn-primary", href: "#/unit/" + n + "/section/challenge" }, "Go to challenge") ]));
      return;
    }
    const ch = p.units[n].challenge;
    const level = BEM.course.unitLevelFor(ch.pct);
    const s = BEM.storage.settings();
    render(main, {
      heading: "Certificate of Completion",
      name: p.name,
      line: "for completing Unit " + n + " — " + unit.title,
      sub: "R-controlled sounds and reading",
      score: ch.pct + "%", level: level.name, teacher: s.teacherName
    });
  }

  function finalCertificate(main, p) {
    const s = BEM.storage.settings();
    const done = BEM.progress.completedUnits();
    if (done.length < 8) {
      main.append(h("div", { class: "card center" }, [
        h("h2", {}, "Course certificate locked" ),
        h("p", { class: "text-soft" }, "Complete all eight units to unlock the full course certificate. So far: " + done.length + "/8."),
        h("a", { class: "btn btn-primary", href: "#/map" }, "Back to map")
      ]));
      // Still allow a preview so buyers can see the template.
      main.append(h("p", { class: "center text-soft mt-5" }, "Preview of the final certificate:"));
    }
    // compute an overall score if available
    let tot = 0, num = 0;
    for (let n = 1; n <= 8; n++) { const u = p.units[n]; if (u && u.challenge) { tot += u.challenge.pct; num++; } }
    const avg = num ? Math.round(tot / num) : 0;
    render(main, {
      heading: "Certificate of Achievement",
      name: p.name,
      line: "for successfully completing",
      title: BEM.course.title,
      sub: BEM.course.subtitle,
      score: num ? (avg + "%") : "—",
      level: done.length === 8 ? "Bright EngMath Sound Champion" : "Course in progress",
      teacher: s.teacherName
    });
  }

  function render(main, o) {
    clear(main);
    const cert = h("div", { class: "certificate" }, [
      h("div", { class: "cert-brand" }, BEM.course.brand),
      h("h1", {}, o.heading),
      h("p", { class: "cert-line" }, "This certificate is proudly presented to"),
      h("div", { class: "cert-name", text: o.name }),
      h("p", { class: "cert-line" }, o.line),
      o.title ? h("h2", { style: "color:var(--c-navy);margin:6px 0;", text: o.title }) : null,
      o.sub ? h("p", { class: "cert-line", text: o.sub }) : null,
      h("div", { class: "cert-meta" }, [
        metaItem("Date", today()),
        metaItem("Score", o.score),
        metaItem("Achievement", o.level),
        metaItem("Teacher", o.teacher || "________")
      ]),
      h("div", { class: "cert-foot" }, BEM.course.credit),
      h("p", { class: "text-soft", style: "font-size:.8rem;" }, BEM.course.copyright),
      h("div", { class: "seal", html: seal() })
    ]);

    main.append(h("div", { class: "cert-wrap" }, [
      cert,
      h("div", { class: "row mt-5 no-print", style: "justify-content:center;" }, [
        h("button", { class: "btn btn-primary", onclick: () => window.print() }, "🖨 Print"),
        h("span", { class: "text-soft", style: "align-self:center;" }, "Tip: in the print dialogue choose “Save as PDF” to keep a copy.")
      ])
    ]));
  }

  function metaItem(label, value) {
    return h("div", {}, [ h("div", { class: "text-soft", style: "font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;", text: label }), h("div", { style: "font-weight:800;", text: value }) ]);
  }

  BEM.certificate = { view };
})();
