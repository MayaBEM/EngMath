/* =====================================================================
   BEM.audio — browser speech synthesis helper.
   Uses the device's built-in Web Speech voices. This is browser-
   generated speech, not studio-recorded audio.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  const supported = typeof window.speechSynthesis !== "undefined" &&
                    typeof window.SpeechSynthesisUtterance !== "undefined";

  let voice = null;
  const listeners = new Set(); // speaking-state listeners

  function pickVoice() {
    if (!supported) return;
    const voices = speechSynthesis.getVoices() || [];
    voice =
      voices.find(v => /en[-_]GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      voices[0] || null;
  }
  if (supported) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  function enabled() {
    const s = BEM.storage.settings();
    return supported && s.speech !== false;
  }

  function notify(isSpeaking) { listeners.forEach(fn => { try { fn(isSpeaking); } catch (e) {} }); }

  function speak(text, opts) {
    opts = opts || {};
    if (!text) return;
    if (!enabled()) {
      // Graceful fallback: briefly flash the caption so the learner still gets feedback.
      BEM.toast && BEM.toast("🔈 " + text, 900);
      return;
    }
    try {
      speechSynthesis.cancel(); // prevent overlapping voices
      const u = new SpeechSynthesisUtterance(String(text));
      if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = "en-GB"; }
      u.rate = opts.slow ? 0.62 : 0.9;   // slightly slower for children
      u.pitch = 1.05;
      u.onstart = () => notify(true);
      u.onend = () => notify(false);
      u.onerror = () => notify(false);
      speechSynthesis.speak(u);
    } catch (e) {
      console.warn("Speech failed:", e);
      BEM.toast && BEM.toast("Audio is not available on this device.");
    }
  }

  BEM.audio = {
    supported,
    isEnabled: enabled,
    say(text) { speak(text, { slow: false }); },
    slow(text) { speak(text, { slow: true }); },
    stop() { if (supported) { try { speechSynthesis.cancel(); } catch (e) {} } notify(false); },
    onSpeak(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    /** Read a chant/story rhythmically by chunking on line breaks. */
    chant(lines) {
      if (!enabled()) { BEM.toast && BEM.toast("Turn on speech in Teacher Mode to hear the chant."); return; }
      const arr = Array.isArray(lines) ? lines : String(lines).split("\n");
      let i = 0;
      const next = () => {
        if (i >= arr.length) { notify(false); return; }
        const u = new SpeechSynthesisUtterance(arr[i++].trim());
        if (voice) u.voice = voice;
        u.rate = 0.8; u.pitch = 1.1;
        u.onend = () => setTimeout(next, 220);
        speechSynthesis.speak(u);
      };
      speechSynthesis.cancel(); notify(true); next();
    },

    /** Build a reusable audio control bar for a piece of text. */
    controls(text, o) {
      o = o || {};
      const wrap = document.createElement("div");
      wrap.className = "audio-bar";
      const mk = (label, aria, handler, cls) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "btn-icon " + (cls || "");
        b.innerHTML = label; b.setAttribute("aria-label", aria);
        b.addEventListener("click", handler);
        return b;
      };
      wrap.appendChild(mk("🔊", "Play audio", () => this.say(typeof text === "function" ? text() : text)));
      if (o.slow !== false) wrap.appendChild(mk("🐢", "Play slowly", () => this.slow(typeof text === "function" ? text() : text)));
      if (o.stop) wrap.appendChild(mk("⏹", "Stop audio", () => this.stop()));
      const dot = document.createElement("span"); dot.className = "speaking-dot"; dot.setAttribute("aria-hidden","true");
      wrap.appendChild(dot);
      const off = this.onSpeak(s => wrap.classList.toggle("is-speaking", s));
      wrap._cleanup = off;
      return wrap;
    }
  };
})();
