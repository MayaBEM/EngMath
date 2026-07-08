/* =====================================================================
   BEM.router — hash-based routing. No backend, no build step.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  // route table: [regex-ish segments, handler(main, params)]
  function parse() {
    let hash = location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);
    return parts;
  }

  function render() {
    const main = BEM.shell.main();
    BEM.util.clear(main);
    BEM.audio.stop();
    const p = parse();
    const root = p[0] || "home";

    try {
      switch (root) {
        case "home": case "": BEM.views.home(main); break;
        case "map": BEM.views.map(main); break;
        case "profiles": BEM.views.profiles(main); break;
        case "unit": BEM.views.unit(main, p.slice(1)); break;      // unit/:n[/section/:key]
        case "review": BEM.views.review ? BEM.views.review(main, p.slice(1)) : comingSoon(main, "Review Zone"); break;
        case "final": BEM.views.final ? BEM.views.final(main) : comingSoon(main, "Final Challenge"); break;
        case "dictionary": BEM.dictionary.view(main); break;
        case "progress": BEM.views.progress(main); break;
        case "badges": BEM.views.badges(main); break;
        case "teacher": BEM.teacher.view(main); break;
        case "certificate": BEM.certificate.view(main, p.slice(1)); break;
        case "about": BEM.views.about(main); break;
        default: notFound(main);
      }
    } catch (err) {
      console.error(err);
      main.append(BEM.devError("Something went wrong rendering this view.", String(err && err.message || err)));
    }
    // move focus to main for accessibility
    main.focus({ preventScroll: true });
  }

  function comingSoon(main, label) {
    main.append(BEM.util.h("div", { class: "card center" }, [
      BEM.util.h("h1", {}, label),
      BEM.util.h("p", { class: "text-soft" }, "This section is part of a later content pack. Unit 1 (Star Farm) is fully playable now."),
      BEM.util.h("a", { class: "btn btn-primary", href: "#/map" }, "Back to Map")
    ]));
  }
  function notFound(main) {
    main.append(BEM.util.h("div", { class: "card center" }, [
      BEM.util.h("h1", {}, "Page not found"),
      BEM.util.h("a", { class: "btn btn-primary", href: "#/" }, "Go home")
    ]));
  }

  BEM.router = {
    render,
    init() {
      window.addEventListener("hashchange", render);
      if (!location.hash) location.hash = "#/";
      else render();
    }
  };
})();
