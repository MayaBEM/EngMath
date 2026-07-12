/* ============================================================
   Little Readers: Read, Tap & Play  —  Application
   Created by Bright EngMath.  Story Pack 1.
   A dependency-free component runtime keeps the whole product
   in one offline file. Content lives in content.js; artwork in
   illustrations.js. UI + logic live here.
   ============================================================ */
(function(){
"use strict";

/* ---------------- tiny hyperscript ---------------- */
function h(tag, props){
  var e = document.createElement(tag), a = arguments;
  props = props || {};
  for(var k in props){
    var v = props[k];
    if(v==null || v===false) continue;
    if(k==="class") e.className = v;
    else if(k==="html") e.innerHTML = v;
    else if(k==="style" && typeof v==="object"){ for(var s in v) e.style[s]=v[s]; }
    else if(k==="dataset"){ for(var d in v) e.dataset[d]=v[d]; }
    else if(k.length>2 && k.slice(0,2)==="on" && typeof v==="function"){ e.addEventListener(k.slice(2).toLowerCase(), v); }
    else if(v===true) e.setAttribute(k,"");
    else e.setAttribute(k, v);
  }
  for(var i=2;i<a.length;i++) add(e, a[i]);
  return e;
}
function add(p, c){
  if(c==null || c===false || c==="") return;
  if(Array.isArray(c)){ for(var i=0;i<c.length;i++) add(p,c[i]); return; }
  if(c instanceof Node){ p.appendChild(c); return; }
  p.appendChild(document.createTextNode(String(c)));
}
function raw(markup){ var s=document.createElement("span"); s.className="ico-wrap"; s.innerHTML=markup; return s; }
function shuffle(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ---------------- persistent state ---------------- */
var LS_KEY = "brightengmath_littlereaders_v1";
function defaults(){
  return {
    version:1, studentName:"",
    settings:{ sound:true, rate:0.9, textScale:1, reducedMotion:false },
    teacher:{ unlockAll:false, showFeedback:true },
    progress:{ stories:{}, badges:[], vocabPlayed:0, listeningCorrect:0, evidenceFound:0 }
  };
}
var state = load();
function load(){
  try{ var raw=localStorage.getItem(LS_KEY); if(raw){ var s=JSON.parse(raw); return merge(defaults(), s); } }catch(e){}
  return defaults();
}
function merge(base, over){
  for(var k in over){
    if(over[k] && typeof over[k]==="object" && !Array.isArray(over[k]) && base[k]) merge(base[k], over[k]);
    else base[k]=over[k];
  }
  return base;
}
var saveTimer=null;
function save(quiet){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); }catch(e){}
  if(!quiet){ clearTimeout(saveTimer); flash(icon("badgeBook")+"", "Progress saved"); }
}

/* ---------------- audio (SpeechSynthesis) ---------------- */
var SS = ("speechSynthesis" in window) && (typeof window.SpeechSynthesisUtterance !== "undefined");
var Speech = {
  on:function(){ return state.settings.sound && SS; },
  cancel:function(){ if(SS) try{ window.speechSynthesis.cancel(); }catch(e){} },
  speak:function(text, opts){
    opts = opts||{};
    if(!this.on()){ if(opts.onend) setTimeout(opts.onend, 120); return null; }
    try{ window.speechSynthesis.cancel(); }catch(e){}
    var u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate!=null ? opts.rate : state.settings.rate;
    u.pitch = 1.06; u.lang = "en-US";
    if(opts.onend) u.onend = opts.onend;
    try{ window.speechSynthesis.speak(u); }catch(e){ if(opts.onend) setTimeout(opts.onend,120); }
    return u;
  }
};
var Reader = {
  playing:false, paused:false, idx:0, sentences:[],
  start:function(sentences){
    this.stop(); this.sentences=sentences; this.idx=0; this.playing=true; this.paused=false; this._next(); syncAudioBtns();
  },
  _next:function(){
    var self=this;
    if(!self.playing || self.idx>=self.sentences.length){ self.playing=false; highlight(-1); syncAudioBtns(); return; }
    var i=self.idx; highlight(i);
    if(Speech.on()){
      Speech.speak(self.sentences[i], { onend:function(){ if(!self.playing) return; self.idx++; self._next(); } });
    } else {
      var words = self.sentences[i].split(" ").length;
      self._t = setTimeout(function(){ if(!self.playing) return; self.idx++; self._next(); }, 400+words*230);
    }
  },
  pauseToggle:function(){
    if(!this.playing) return;
    if(this.paused){ if(SS) window.speechSynthesis.resume(); this.paused=false; }
    else { if(SS) window.speechSynthesis.pause(); this.paused=true; }
    syncAudioBtns();
  },
  stop:function(){ this.playing=false; this.paused=false; if(this._t) clearTimeout(this._t); Speech.cancel(); highlight(-1); syncAudioBtns(); }
};
function highlight(i){
  var nodes = document.querySelectorAll(".passage .sent");
  for(var n=0;n<nodes.length;n++) nodes[n].classList.toggle("reading", n===i);
}
function syncAudioBtns(){
  var pt=document.getElementById("btn-play"); if(pt){ pt.querySelector(".lbl").textContent = Reader.playing ? (Reader.paused?"Resume":"Pause") : "Read to me"; }
}
function stopAllAudio(){ Reader.stop(); Speech.cancel(); }
function sayWord(text){
  Speech.speak(text, { rate: Math.max(0.7, state.settings.rate-0.05) });
}

/* ---------------- runtime (non-persistent) view state ---------------- */
var app = {
  route:"welcome",
  story:null, step:"intro",
  qStates:null, qIndex:0,
  modal:null,
  classroom:null,         // {storyId, index, picked, showAnswer, showEvidence, quick}
  teacherStory:null
};

/* ---------------- helpers ---------------- */
function storyById(id){ for(var i=0;i<STORIES.length;i++) if(STORIES[i].id===id) return STORIES[i]; return null; }
function storiesByLevel(l){ return STORIES.filter(function(s){ return s.level===l; }); }
function completedCount(){ var n=0, st=state.progress.stories; for(var k in st){ if(st[k].completed) n++; } return n; }
function totalStars(){ var n=0, st=state.progress.stories; for(var k in st){ n+=st[k].stars||0; } return n; }
function levelCompleted(l){ var arr=storiesByLevel(l), n=0; arr.forEach(function(s){ if(state.progress.stories[s.id] && state.progress.stories[s.id].completed) n++; }); return n; }
function isUnlocked(story){
  if(state.teacher.unlockAll) return true;
  if(story.level===1) return true;
  if(story.level===2) return levelCompleted(1)>=1;
  if(story.level===3) return levelCompleted(2)>=1;
  return true;
}
var LEVEL_META = {
  1:{name:"Level 1 · Picture Readers", blurb:"Short sentences with strong picture clues."},
  2:{name:"Level 2 · Sentence Detectives", blurb:"Find the clues in longer, connected stories."},
  3:{name:"Level 3 · Mini Story Adventures", blurb:"A beginning, middle and end — with real thinking."}
};

/* ---------------- rendering root ---------------- */
function render(){
  var root = document.getElementById("app");
  root.innerHTML = "";
  if(app.classroom){ root.appendChild(viewClassroom()); }
  else {
    root.appendChild(viewTopbar());
    var shell = h("main", {class:"app-shell"});
    var v;
    switch(app.route){
      case "welcome": v=viewWelcome(); break;
      case "library": v=viewLibrary(); break;
      case "reading": v=viewReading(); break;
      case "rewards": v=viewRewards(); break;
      case "results": v=viewResults(); break;
      case "teacher": v=viewTeacher(); break;
      case "settings": v=viewSettings(); break;
      case "certificate": v=viewCertificate(); break;
      default: v=viewWelcome();
    }
    shell.appendChild(v);
    shell.appendChild(viewFooter());
    root.appendChild(shell);
  }
  if(app.modal) root.appendChild(viewModal());
  document.body.scrollTop = 0; document.documentElement.scrollTop = 0;
}
function go(route, opts){
  stopAllAudio();
  opts = opts||{};
  app.route = route;
  if(opts.story!==undefined) app.story = opts.story;
  if(opts.step) app.step = opts.step;
  render();
}

/* ---------------- shared UI ---------------- */
function brandMark(){ return raw(badge("badgeStar")); }
function navBtn(label, route, cls){
  return h("button",{class:"btn btn-sm "+(cls||"btn-ghost")+(app.route===route?" ":""),
    onclick:function(){ go(route); }}, label);
}
function viewTopbar(){
  return h("header",{class:"topbar"},
    h("button",{class:"brand",onclick:function(){ go("welcome"); },"aria-label":"Little Readers home"},
      h("span",{class:"mark"}, raw(icon("badgeStar"))),
      h("span",{class:"titles"},
        h("span",{class:"t1"},"Little Readers"),
        h("span",{class:"t2"},"Read, Tap & Play · Bright EngMath"))),
    h("nav",{class:"topnav","aria-label":"Main"},
      navBtn("Library","library","btn-green"),
      navBtn("Rewards","rewards"),
      navBtn("My Results","results"),
      navBtn("Teacher","teacher"),
      soundToggleBtn(),
      h("button",{class:"btn btn-icon btn-ghost","aria-label":"Settings",title:"Settings",
        onclick:function(){ go("settings"); }}, raw(icon("badgeCrown")))
    )
  );
}
function soundToggleBtn(){
  return h("button",{class:"btn btn-icon "+(state.settings.sound?"btn-yellow":"btn-ghost"),
    "aria-label":state.settings.sound?"Sound on":"Sound off", title:"Toggle sound",
    onclick:function(){ state.settings.sound=!state.settings.sound; if(!state.settings.sound) stopAllAudio(); save(true); render(); }},
    raw(state.settings.sound?icon("badgeEar"):iconMuted()));
}
function iconMuted(){ return '<svg viewBox="0 0 64 64" class="icon-svg" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="#D9D2C2"/><path d="M22 40 a8 8 0 1 1 12 -6 c0 5 -5 5 -5 9" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><path d="M18 20 L46 46" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>'; }

function starRating(n, big){
  var wrap=h("span",{class:"stars"+(big?" big":""),role:"img","aria-label":n+" of 3 stars"});
  for(var i=0;i<3;i++){
    var on = i<n;
    var s=raw('<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8 l7 15 16 2 -12 11 4 16 -15 -8 -15 8 4 -16 -12 -11 16 -2Z"/></svg>');
    s.firstChild.classList.add(on?"star-on":"star-off");
    wrap.appendChild(s);
  }
  return wrap;
}
function viewFooter(){
  return h("footer",{class:"site-footer"},
    h("div",null, h("b",null,"Little Readers: Read, Tap & Play")),
    h("div",null,"Created with care by Bright EngMath"),
    h("div",null, h("span",{class:"ver"},"Story Pack 1 · v1.0"))
  );
}

/* toast */
function flash(iconHtml, text){
  var old=document.querySelector(".toast"); if(old) old.remove();
  var t=h("div",{class:"toast"}, raw(iconHtml), h("span",null,text));
  t.querySelector("svg") && (t.querySelector("svg").style.width="20px", t.querySelector("svg").style.height="20px");
  document.body.appendChild(t);
  setTimeout(function(){ if(t.parentNode) t.remove(); }, 1900);
}

/* modal */
function openModal(cfg){ app.modal=cfg; render(); }
function closeModal(){ app.modal=null; render(); }
function viewModal(){
  var m=app.modal;
  return h("div",{class:"modal-back",onclick:function(e){ if(e.target.classList.contains("modal-back")) closeModal(); }},
    h("div",{class:"modal",role:"dialog","aria-modal":"true"},
      h("h3",null,m.title),
      h("p",{style:{color:"var(--muted)"}}, m.body),
      h("div",{class:"m-actions"},
        h("button",{class:"btn btn-ghost",onclick:closeModal}, m.cancelText||"Cancel"),
        h("button",{class:"btn "+(m.danger?"btn-primary":"btn-green"),onclick:function(){ var f=m.onConfirm; closeModal(); f&&f(); }}, m.confirmText||"OK")
      )
    )
  );
}

/* ============================================================
   WELCOME
   ============================================================ */
function viewWelcome(){
  return h("section",{class:"view"},
    h("div",{class:"welcome paper-grain"},
      h("div",null,
        h("div",{class:"kicker"},"A Bright EngMath Reading Product"),
        h("h1",null,"Little Readers"),
        h("p",{class:"subtitle"},"Read, tap and play your way through 12 gentle stories. Perfect for young readers just starting out in English."),
        h("div",{class:"cta-row"},
          h("button",{class:"btn btn-primary btn-lg",onclick:function(){ go("library"); }}, raw(icon("badgeBook")), h("span",null,"Start Reading")),
          h("button",{class:"btn btn-sky btn-lg",onclick:function(){ go("teacher"); }}, raw(icon("badgeCrown")), h("span",null,"Teacher Mode"))
        ),
        h("div",{class:"mini-features"},
          h("span",null, raw(icon("badgeEar")), "Read-aloud audio"),
          h("span",null, raw(icon("badgeStar")), "Stars & badges"),
          h("span",null, raw(icon("badgeGlass")), "Find-the-clue games")
        ),
        h("div",{style:{marginTop:"18px"}}, soundLine())
      ),
      h("div",null, raw(welcomeHero()))
    )
  );
}
function soundLine(){
  return h("label",{class:"pill pill-sage",style:{cursor:"pointer"}},
    h("input",{type:"checkbox",checked:state.settings.sound, style:{marginRight:"6px"},
      onchange:function(e){ state.settings.sound=e.target.checked; if(!state.settings.sound) stopAllAudio(); save(true); }}),
    "Sound "+(state.settings.sound?"on":"off"));
}

/* ============================================================
   STORY LIBRARY
   ============================================================ */
function viewLibrary(){
  var wrap=h("section",{class:"view"},
    h("div",{class:"section-title"}, h("h2",null,"Story Library"),
      h("span",{class:"pill pill-yellow"}, totalStars()+" stars"),
      h("span",{class:"pill pill-sage"}, completedCount()+" / 12 stories")));
  [1,2,3].forEach(function(l){
    var block=h("div",{class:"level-block level-"+l},
      h("div",{class:"level-head"},
        h("div",{class:"level-badge"}, "L"+l),
        h("div",{class:"meta"}, h("h3",null,LEVEL_META[l].name), h("p",null,LEVEL_META[l].blurb))));
    var grid=h("div",{class:"story-grid"});
    storiesByLevel(l).forEach(function(s){ grid.appendChild(storyCard(s)); });
    block.appendChild(grid);
    wrap.appendChild(block);
  });
  if(!state.teacher.unlockAll && (levelCompleted(1)<1)){
    wrap.appendChild(h("p",{class:"empty",style:{marginTop:"8px"}},"Tip: finish a Level 1 story to open Level 2. Teachers can open everything from Teacher Mode."));
  }
  return wrap;
}
function storyCard(s){
  var prog = state.progress.stories[s.id];
  var unlocked = isUnlocked(s);
  var card=h("button",{class:"story-card paper-grain"+(unlocked?"":" locked"),
    onclick:function(){ if(unlocked) openStory(s); else flash(icon("badgeCrown"),"Open in Teacher Mode"); },
    "aria-label":s.title+(unlocked?"":" (locked)")});
  var thumb=h("div",{class:"thumb"}, raw(heroScene(s.hero)));
  if(prog && prog.completed) thumb.appendChild(h("span",{class:"done-tag"},"Done"));
  if(!unlocked) thumb.appendChild(h("span",{class:"lock-tag"}, raw(iconLock()), "Locked"));
  card.appendChild(thumb);
  card.appendChild(h("div",{class:"body"},
    h("h4",null,s.title),
    h("div",{class:"cardfoot"},
      h("span",{class:"who"}, s.character),
      starRating(prog?prog.stars:0))));
  return card;
}
function iconLock(){ return '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z" fill="#fff"/></svg>'; }

function openStory(s){
  app.story=s; app.step="intro"; app.qStates=null; app.qIndex=0;
  go("reading");
}

/* ============================================================
   READING FLOW
   ============================================================ */
var STEPS = [["intro","Story"],["read","Read & Listen"],["vocab","Word Explorer"],["questions","Questions"],["complete","Complete"]];
function stepTrack(){
  var track=h("div",{class:"step-track"});
  var curI = STEPS.map(function(x){return x[0];}).indexOf(app.step);
  STEPS.forEach(function(st, i){
    var cls="step-chip"+(i===curI?" active":(i<curI?" done":""));
    track.appendChild(h("div",{class:cls}, h("span",{class:"n"}, i<curI?"✓":(i+1)), st[1]));
  });
  return track;
}
function viewReading(){
  var s=app.story;
  var wrap=h("section",{class:"view reader-wrap"});
  wrap.appendChild(h("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}},
    h("button",{class:"btn btn-sm btn-ghost",onclick:function(){ go("library"); }},"← Library"),
    h("span",{class:"pill pill-sky"},"Level "+s.level),
    h("h2",{style:{margin:"0 0 0 4px",fontSize:"1.4rem"}}, s.title)));
  wrap.appendChild(stepTrack());
  if(app.step==="intro") wrap.appendChild(stepIntro(s));
  else if(app.step==="read") wrap.appendChild(stepRead(s));
  else if(app.step==="vocab") wrap.appendChild(stepVocab(s));
  else if(app.step==="questions") wrap.appendChild(stepQuestions(s));
  else if(app.step==="complete") wrap.appendChild(stepComplete(s));
  return wrap;
}
function stepIntro(s){
  var keyWords = s.vocab.slice(0,3);
  return h("div",{class:"panel paper-grain"},
    h("div",{class:"two-col"},
      h("div",{class:"reader-hero"}, raw(heroScene(s.hero))),
      h("div",null,
        h("h2",{style:{fontSize:"1.8rem"}}, s.title),
        h("p",{style:{color:"var(--muted)",fontSize:"1.05rem"}},"A story about "+s.character+". Let's read together!"),
        h("h4",{style:{marginTop:"16px"}},"Key words"),
        h("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"}},
          keyWords.map(function(w){ return h("span",{class:"pill pill-yellow",style:{fontSize:"1rem"}}, w.word); })),
        h("div",{style:{display:"flex",gap:"12px",marginTop:"20px",flexWrap:"wrap"}},
          h("button",{class:"btn btn-green",onclick:function(){
              var words = keyWords.map(function(w){return w.word;}).join(", ");
              state.progress.vocabPlayed += keyWords.length; save(true); evaluateBadges();
              Speech.speak(words, {rate:0.85});
            }}, raw(icon("badgeEar")), h("span",null,"Listen to the words")),
          h("button",{class:"btn btn-primary",onclick:function(){ app.step="read"; render(); }}, "Start the story →"))
      )
    )
  );
}
function stepRead(s){
  var passage=h("p",{class:"passage"});
  s.sentences.forEach(function(sent, i){ passage.appendChild(h("span",{class:"sent",dataset:{i:i}}, sent+" ")); });
  var bar=h("div",{class:"audio-bar no-print"},
    h("button",{id:"btn-play",class:"btn btn-sky",onclick:function(){
        if(!Reader.playing){ Reader.start(s.sentences); } else { Reader.pauseToggle(); } }},
      raw(icon("badgeEar")), h("span",{class:"lbl"},"Read to me")),
    h("button",{class:"btn btn-ghost",title:"Stop",onclick:function(){ Reader.stop(); }},"■ Stop"),
    h("button",{class:"btn btn-ghost",title:"Replay",onclick:function(){ Reader.start(s.sentences); }},"↻ Replay"),
    h("span",{class:"grow"}),
    h("div",{class:"rate-ctl"},"Speed",
      h("button",{class:"btn btn-icon btn-ghost btn-sm",onclick:function(){ state.settings.rate=Math.max(0.6, +(state.settings.rate-0.1).toFixed(2)); save(true); flash(icon("badgeEar"),"Speed "+state.settings.rate+"x"); }},"–"),
      h("b",null, state.settings.rate.toFixed(1)+"x"),
      h("button",{class:"btn btn-icon btn-ghost btn-sm",onclick:function(){ state.settings.rate=Math.min(1.3, +(state.settings.rate+0.1).toFixed(2)); save(true); flash(icon("badgeEar"),"Speed "+state.settings.rate+"x"); }},"+")),
    h("div",{class:"textsize-ctl"},"Text",
      h("button",{class:"btn btn-icon btn-ghost btn-sm",onclick:function(){ setTextScale(state.settings.textScale-0.1); }},"A−"),
      h("button",{class:"btn btn-icon btn-ghost btn-sm",onclick:function(){ setTextScale(state.settings.textScale+0.1); }},"A+"))
  );
  if(!SS) bar.appendChild(h("span",{class:"pill pill-coral"},"Audio not available on this browser"));
  return h("div",{class:"panel paper-grain"},
    bar,
    h("div",{style:{marginTop:"18px"}}, passage),
    h("div",{class:"q-actions"},
      h("button",{class:"btn btn-ghost",onclick:function(){ app.step="intro"; render(); }},"← Back"),
      h("button",{class:"btn btn-primary",onclick:function(){ stopAllAudio(); app.step="vocab"; render(); }},"Explore words →"))
  );
}
function setTextScale(v){
  v=Math.max(0.85, Math.min(1.4, +v.toFixed(2)));
  state.settings.textScale=v; document.documentElement.style.setProperty("--text-scale", v); save(true);
}
function stepVocab(s){
  var grid=h("div",{class:"vocab-grid"});
  s.vocab.forEach(function(w){
    grid.appendChild(h("div",{class:"vocab-card paper-grain"},
      h("div",{style:{display:"flex",gap:"12px",alignItems:"center"}},
        h("div",{class:"vpic"}, raw(icon(w.icon))),
        h("div",null, h("div",{class:"word"}, w.word),
          h("button",{class:"btn btn-sm btn-sky",style:{marginTop:"4px"},onclick:function(){
              state.progress.vocabPlayed++; save(true); evaluateBadges(); sayWord(w.word+". "+w.example);
            }}, raw(icon("badgeEar")), h("span",null,"Say it")))),
      h("div",{class:"mean"}, w.meaning),
      h("div",{class:"exa"}, "“"+w.example+"”")));
  });
  return h("div",{class:"panel paper-grain"},
    h("h3",null,"Word Explorer"),
    h("p",{style:{color:"var(--muted)",marginTop:"-6px"}},"Tap “Say it” to hear each word and an example."),
    grid,
    h("div",{class:"q-actions"},
      h("button",{class:"btn btn-ghost",onclick:function(){ app.step="read"; render(); }},"← Re-read"),
      h("button",{class:"btn btn-primary",onclick:function(){ startQuestions(s); }},"Start questions →"))
  );
}

/* ------------- questions ------------- */
function startQuestions(s){
  app.qStates = s.questions.map(function(q){ return newQState(q); });
  app.qIndex=0; app.step="questions"; render();
}
function newQState(q){
  var st={ attempts:0, solved:false, revealed:false, outcome:null, wrong:[], lastPick:null };
  if(q.type==="sequence"){ st.order = shuffle(q.items.map(function(_,i){return i;})); if(sameOrder(st.order)) st.order = st.order.reverse(); st.sel=null; }
  if(q.type==="match"){ st.words=shuffle(q.pairs.map(function(p,i){return i;})); st.pics=shuffle(q.pairs.map(function(p,i){return i;})); st.selWord=null; st.matched={}; st.wrong2=0; }
  if(q.type==="sort"){ st.pool=shuffle(q.items.map(function(_,i){return i;})); st.selTok=null; st.placed={}; st.wrong2=0; }
  return st;
}
function sameOrder(o){ for(var i=0;i<o.length;i++) if(o[i]!==i) return false; return true; }
function curQ(){ return app.story.questions[app.qIndex]; }
function curQS(){ return app.qStates[app.qIndex]; }

function stepQuestions(s){
  var q=curQ(), qs=curQS(), i=app.qIndex, total=s.questions.length;
  var shell=h("div",{class:"q-shell paper-grain"});
  shell.appendChild(h("div",{class:"q-top"},
    h("span",{class:"q-count"},"Question "+(i+1)+" of "+total),
    h("div",{class:"q-progress"}, h("i",{style:{width:(((i+(qs.solved||qs.revealed?1:0))/total)*100)+"%"}})),
    h("span",{class:"pill pill-sage q-skill"}, q.skill)));
  shell.appendChild(h("div",{class:"q-prompt"}, q.prompt));
  if(q.type==="listen") shell.appendChild(listenControls(q));
  shell.appendChild(renderQuestionBody(q, qs));
  if(qs.solved || qs.revealed) shell.appendChild(feedbackPanel(q, qs));
  var actions=h("div",{class:"q-actions"});
  actions.appendChild(h("button",{class:"btn btn-ghost",onclick:function(){
      if(i>0){ app.qIndex--; render(); } else { app.step="vocab"; render(); } }}, i>0?"← Previous":"← Words"));
  if(qs.solved || qs.revealed){
    if(i<total-1) actions.appendChild(h("button",{class:"btn btn-primary",onclick:function(){ app.qIndex++; render(); }},"Next question →"));
    else actions.appendChild(h("button",{class:"btn btn-green",onclick:function(){ finalizeStory(s); }},"Finish story →"));
  }
  shell.appendChild(actions);
  return shell;
}
function listenControls(q){
  return h("div",{class:"audio-bar no-print",style:{marginBottom:"14px"}},
    h("button",{class:"btn btn-sky",onclick:function(){ Speech.speak(q.speak, {rate:state.settings.rate}); }}, raw(icon("badgeEar")), h("span",null,"Play the sentence")),
    h("button",{class:"btn btn-ghost",onclick:function(){ Speech.speak(q.speak,{rate:state.settings.rate}); }},"↻ Replay"),
    h("span",{class:"grow"}),
    h("span",{class:"pill pill-yellow"},"Listen, then choose"));
}
function feedbackPanel(q, qs){
  if(qs.solved){
    var msgs=["Great reading!","You found the clue!","That's right!","Well done!","Super work!"];
    var m = msgs[Math.floor(app.qIndex)%msgs.length];
    return h("div",{class:"feedback good"}, h("div",{class:"fic"},"✓"),
      h("div",{class:"ftext"}, h("b",null,m+" "), q.explain));
  }
  return h("div",{class:"feedback show"}, h("div",{class:"fic"},"i"),
    h("div",{class:"ftext"}, h("b",null,"Here's the answer. "), q.explain,
      (q.evidence!=null||q.answer!=null&&q.type==="evidence")?evidenceHint(q):null));
}
function evidenceHint(q){
  var idx = q.type==="evidence" ? q.answer : q.evidence;
  if(idx==null) return null;
  return h("div",{style:{marginTop:"8px"}},
    h("span",{class:"pill pill-sage"},"Clue in the story: "),
    h("span",{style:{fontStyle:"italic",marginLeft:"6px"}}, "“"+app.story.sentences[idx]+"”"));
}

/* choice-type answer (picture / mc / tf / listen) */
function answerChoice(q, qs, chosenIndex, isCorrect){
  if(qs.solved||qs.revealed) return;
  qs.attempts++; qs.lastPick=chosenIndex;
  if(isCorrect){
    qs.solved=true; qs.outcome = qs.attempts===1?"first":"second";
    afterSolve(q, qs);
  } else {
    qs.wrong.push(chosenIndex);
    if(qs.attempts>=2){ qs.revealed=true; qs.outcome="revealed"; }
  }
  render();
}
function afterSolve(q, qs){
  if(q.type==="listen"){ state.progress.listeningCorrect++; save(true); }
  if(q.type==="evidence"){ state.progress.evidenceFound++; save(true); }
  evaluateBadges();
  if(!state.settings.reducedMotion){ /* subtle pop handled by CSS */ }
}

function renderQuestionBody(q, qs){
  switch(q.type){
    case "picture": return choiceGrid(q, qs, true);
    case "mc": case "listen": return choiceGrid(q, qs, false);
    case "tf": return tfBody(q, qs);
    case "evidence": return evidenceBody(q, qs);
    case "sequence": return sequenceBody(q, qs);
    case "match": return matchBody(q, qs);
    case "sort": return sortBody(q, qs);
    default: return h("div",null,"—");
  }
}
function choiceGrid(q, qs, pic){
  var grid=h("div",{class:"opt-grid "+(pic?"cols-3":"stack")});
  q.options.forEach(function(opt, idx){
    var cls="opt"+(pic?" pic":"");
    var done=qs.solved||qs.revealed;
    if(done && idx===q.answer) cls+= qs.solved?" correct":" reveal";
    else if(qs.wrong.indexOf(idx)>=0) cls+=" wrong dim";
    else if(done) cls+=" dim";
    var body = pic ? [raw(icon(opt.icon)), h("span",null,opt.label)] : [h("span",null,opt)];
    grid.appendChild(h("button",{class:cls, disabled:done,
      onclick:function(){ answerChoice(q, qs, idx, idx===q.answer); }}, body));
  });
  return grid;
}
function tfBody(q, qs){
  var done=qs.solved||qs.revealed;
  function tb(val,label,cls,ic){
    var isAns = (val===q.answer);
    var c="opt tf-btn "+cls;
    if(done && isAns) c+= qs.solved?" correct":" reveal";
    else if(done) c+=" dim";
    else if(qs.wrong.indexOf(val?1:0)>=0) c+=" wrong dim";
    return h("button",{class:c,disabled:done,onclick:function(){ answerChoice(q,qs,val?1:0, val===q.answer); }},
      h("span",{class:"tf-ic"},ic), h("span",null,label));
  }
  return h("div",{class:"tf-row"}, tb(true,"True","tf-true","✓"), tb(false,"False","tf-false","✕"));
}
function evidenceBody(q, qs){
  var done=qs.solved||qs.revealed;
  var p=h("p",{class:"passage selectable"});
  app.story.sentences.forEach(function(sent, i){
    var cls="sent";
    if(done && i===q.answer) cls+=" evidence";
    else if(qs.wrong.indexOf(i)>=0) cls+=" picked";
    p.appendChild(h("span",{class:cls,dataset:{i:i},role:"button",tabindex: done?-1:0,
      onclick:function(){ if(!done) answerChoice(q,qs,i,i===q.answer); },
      onkeydown:function(e){ if(!done&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); answerChoice(q,qs,i,i===q.answer); } }
    }, sent+" "));
  });
  return h("div",null, h("p",{style:{color:"var(--muted)",marginTop:0}},"Tap the sentence with the answer."), p);
}
function sequenceBody(q, qs){
  var done=qs.solved||qs.revealed;
  var list=h("div",{class:"seq-list"});
  qs.order.forEach(function(itemIdx, pos){
    var cls="seq-item";
    if(done){ cls += (itemIdx===pos)?" correct":" wrong"; }
    var row=h("div",{class:cls},
      h("span",{class:"ord"}, pos+1),
      h("span",{class:"txt"}, q.items[itemIdx]));
    if(!done){
      row.appendChild(h("span",{class:"seq-move"},
        h("button",{"aria-label":"Move up",disabled:pos===0,onclick:function(){ moveSeq(qs,pos,-1); }},"▲"),
        h("button",{"aria-label":"Move down",disabled:pos===qs.order.length-1,onclick:function(){ moveSeq(qs,pos,1); }},"▼")));
    }
    list.appendChild(row);
  });
  var box=h("div",null,
    h("p",{style:{color:"var(--muted)",marginTop:0}},"Use ▲ ▼ to put the events in order, then check."),
    list);
  if(!done){
    box.appendChild(h("div",{style:{marginTop:"14px"}},
      h("button",{class:"btn btn-green",onclick:function(){ checkSequence(q,qs); }},"Check my order")));
  }
  return box;
}
function moveSeq(qs, pos, dir){
  var n=pos+dir; if(n<0||n>=qs.order.length) return;
  var t=qs.order[pos]; qs.order[pos]=qs.order[n]; qs.order[n]=t; render();
}
function checkSequence(q, qs){
  qs.attempts++;
  var ok=true; for(var i=0;i<qs.order.length;i++) if(qs.order[i]!==i){ ok=false; break; }
  if(ok){ qs.solved=true; qs.outcome=qs.attempts===1?"first":"second"; afterSolve(q,qs); }
  else if(qs.attempts>=2){ qs.revealed=true; qs.outcome="revealed"; qs.order=q.items.map(function(_,i){return i;}); }
  else { flash(icon("badgeGlass"),"Not yet — try again"); }
  render();
}
function matchBody(q, qs){
  var done=qs.solved;
  var left=h("div",{class:"match-col"}, h("h4",null,"Words"));
  qs.words.forEach(function(pi){
    var matched = qs.matched["w"+pi];
    var cls="chip-word"+(matched?" matched":"")+(qs.selWord===pi?" sel":"");
    left.appendChild(h("button",{class:cls,disabled:matched||done,
      onclick:function(){ qs.selWord = qs.selWord===pi?null:pi; render(); }}, q.pairs[pi].word));
  });
  var right=h("div",{class:"match-col"}, h("h4",null,"Pictures"));
  qs.pics.forEach(function(pi){
    var matched = qs.matched["p"+pi];
    var cls="chip-pic"+(matched?" matched":"");
    right.appendChild(h("button",{class:cls,disabled:matched||done,
      onclick:function(){ tryMatch(q,qs,pi); }}, raw(icon(q.pairs[pi].icon))));
  });
  return h("div",null,
    h("p",{style:{color:"var(--muted)",marginTop:0}},"Tap a word, then tap its picture."),
    h("div",{class:"match-wrap"}, left, right));
}
function tryMatch(q, qs, picIdx){
  if(qs.selWord==null){ flash(icon("badgeWord"),"Pick a word first"); return; }
  var w=qs.selWord;
  if(q.pairs[w].icon===q.pairs[picIdx].icon){
    qs.matched["w"+w]=true; qs.matched["p"+picIdx]=true; qs.selWord=null;
    var all=q.pairs.every(function(_,i){ return qs.matched["w"+i]; });
    if(all){ qs.solved=true; qs.outcome=qs.wrong2>0?"second":"first"; afterSolve(q,qs); }
  } else {
    qs.wrong2++; qs.attempts++; qs.selWord=null; flash(icon("badgeGlass"),"Try another one");
  }
  render();
}
function sortBody(q, qs){
  var done=qs.solved;
  var pool=h("div",{class:"sort-pool"});
  qs.pool.forEach(function(ti){
    if(qs.placed[ti]) return;
    var cls="sort-token"+(qs.selTok===ti?" sel":"");
    pool.appendChild(h("button",{class:cls,disabled:done,onclick:function(){ qs.selTok=qs.selTok===ti?null:ti; render(); }}, q.items[ti].text));
  });
  var cats=h("div",{class:"sort-cats"});
  q.categories.forEach(function(cat){
    var col=h("div",{class:"sort-cat"+(qs.selTok!=null?" hi":""),role:"button",tabindex:0,
      onclick:function(){ placeSort(q,qs,cat); },
      onkeydown:function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); placeSort(q,qs,cat);} }},
      h("h4",null,cat));
    q.items.forEach(function(it, ti){
      if(qs.placed[ti]===cat) col.appendChild(h("span",{class:"sort-token small correct",style:{display:"inline-block",margin:"3px"}}, it.text));
    });
    cats.appendChild(col);
  });
  return h("div",null,
    h("p",{style:{color:"var(--muted)",marginTop:0}},"Tap a word, then tap Who, What or Where."),
    pool, cats);
}
function placeSort(q, qs, cat){
  if(qs.selTok==null){ flash(icon("badgeWord"),"Pick a word first"); return; }
  var ti=qs.selTok;
  if(q.items[ti].cat===cat){
    qs.placed[ti]=cat; qs.selTok=null;
    var all=q.items.every(function(_,i){ return qs.placed[i]; });
    if(all){ qs.solved=true; qs.outcome=qs.wrong2>0?"second":"first"; afterSolve(q,qs); }
  } else {
    qs.wrong2++; qs.attempts++; qs.selTok=null; flash(icon("badgeGlass"),"Not that box — try again");
  }
  render();
}

/* ------------- finalize + complete ------------- */
function finalizeStory(s){
  stopAllAudio();
  var outcomes = app.qStates.map(function(q){ return q.outcome||"revealed"; });
  var first = outcomes.filter(function(o){ return o==="first"; }).length;
  var correct = outcomes.filter(function(o){ return o!=="revealed"; }).length;
  var stars = first>=5 ? 3 : (first>=3 ? 2 : 1);
  var skill={};
  s.questions.forEach(function(q, i){
    var g=SKILL_GROUP[q.skill]||"Details";
    if(!skill[g]) skill[g]={c:0,t:0};
    skill[g].t++; if(outcomes[i]!=="revealed") skill[g].c++;
  });
  var prev=state.progress.stories[s.id];
  state.progress.stories[s.id]={
    completed:true,
    stars: Math.max(stars, prev?prev.stars:0),
    lastStars: stars, correct:correct, total:s.questions.length,
    outcomes:outcomes, skill:skill
  };
  save(true);
  evaluateBadges();
  app.step="complete"; render();
}
function stepComplete(s){
  var prog=state.progress.stories[s.id];
  var wrap=h("div",{class:"panel paper-grain complete"});
  if(!state.settings.reducedMotion) wrap.appendChild(confetti());
  wrap.appendChild(h("h2",{style:{fontSize:"2rem"}},"Story complete!"));
  wrap.appendChild(h("p",{style:{color:"var(--muted)",marginTop:"-6px"}}, s.title));
  wrap.appendChild(h("div",{class:"big-stars"}, starRating(prog.lastStars, true)));
  wrap.appendChild(h("div",{class:"score-num"}, prog.correct+" / "+prog.total));
  wrap.appendChild(h("p",{style:{color:"var(--muted)"}},"questions correct"));
  Speech.on() && Speech.speak(prog.lastStars===3?"Perfect reading! Three stars!":"Well done! Story complete.", {rate:0.9});
  /* review */
  var review=h("div",{class:"review-list"});
  s.questions.forEach(function(q, i){
    var ok = prog.outcomes[i]!=="revealed";
    review.appendChild(h("div",{class:"review-item"},
      h("span",{class:"rmark "+(ok?"ok":"no")}, ok?"✓":"!"),
      h("div",{class:"rq"}, h("div",null, q.prompt),
        h("small",null, ok?("Correct · "+q.skill):("Practice this · "+q.explain)))));
  });
  wrap.appendChild(h("h3",{style:{marginTop:"18px",textAlign:"left"}},"Look back at your answers"));
  wrap.appendChild(review);
  var next = nextStory(s);
  wrap.appendChild(h("div",{class:"q-actions",style:{justifyContent:"center",marginTop:"22px"}},
    h("button",{class:"btn btn-ghost",onclick:function(){ openStory(s); }},"↻ Read again"),
    h("button",{class:"btn btn-sky",onclick:function(){ go("rewards"); }},"See my badges"),
    next ? h("button",{class:"btn btn-primary",onclick:function(){ openStory(next); }},"Next story →")
         : h("button",{class:"btn btn-green",onclick:function(){ go("certificate"); }},"Get my certificate →")));
  return wrap;
}
function nextStory(s){
  var idx=STORIES.indexOf(s);
  for(var i=idx+1;i<STORIES.length;i++){ if(isUnlocked(STORIES[i])) return STORIES[i]; }
  return null;
}
function confetti(){
  var box=h("div",{class:"confetti"});
  var cols=["#F0A088","#9CC29A","#9BC9E4","#F4C95D","#E27E63"];
  for(var i=0;i<34;i++){
    box.appendChild(h("i",{style:{left:(Math.random()*100)+"%",background:cols[i%cols.length],
      animationDuration:(1.6+Math.random()*1.4)+"s",animationDelay:(Math.random()*0.5)+"s",
      transform:"rotate("+(Math.random()*360)+"deg)"}}));
  }
  return box;
}

/* ------------- badges ------------- */
function evaluateBadges(){
  var earned=state.progress.badges, newly=[];
  function grant(id){ if(earned.indexOf(id)<0){ earned.push(id); newly.push(id); } }
  var cc=completedCount();
  if(cc>=1) grant("first_story");
  if(cc>=3) grant("careful_reader");
  if(cc>=12) grant("reading_champion");
  if(state.progress.vocabPlayed>=15) grant("word_explorer");
  if(state.progress.listeningCorrect>=5) grant("listening_star");
  if(state.progress.evidenceFound>=5) grant("story_detective");
  var st=state.progress.stories; for(var k in st){ if(st[k].stars>=3){ grant("perfect_reader"); break; } }
  save(true);
  if(newly.length){
    var b=BADGES.filter(function(x){return x.id===newly[0];})[0];
    flash(badge(b.icon), "Badge earned: "+b.name);
  }
}

/* ============================================================
   REWARD SHELF
   ============================================================ */
function viewRewards(){
  var wrap=h("section",{class:"view"},
    h("div",{class:"section-title"}, h("h2",null,"Reward Shelf")));
  wrap.appendChild(h("div",{class:"reward-stats"},
    stat(totalStars(),"Stars earned"),
    stat(completedCount()+" / 12","Stories finished"),
    stat(state.progress.badges.length+" / "+BADGES.length,"Badges collected")));
  var grid=h("div",{class:"badge-grid"});
  BADGES.forEach(function(b){
    var got=state.progress.badges.indexOf(b.id)>=0;
    grid.appendChild(h("div",{class:"badge-card paper-grain"+(got?"":" locked")},
      h("div",{class:"badge-holder"}, raw(badge(b.icon))),
      h("div",{class:"bname"}, b.name),
      h("div",{class:"bdesc"}, b.desc),
      got?h("div",{class:"earned"},"★ Earned"):h("div",{class:"bdesc"},"Keep reading!")));
  });
  wrap.appendChild(grid);
  if(completedCount()===0) wrap.appendChild(h("p",{class:"empty"},"Finish your first story to start your badge collection!"));
  return wrap;
}
function stat(num, lbl){ return h("div",{class:"stat"}, h("div",{class:"num"},num), h("div",{class:"lbl"},lbl)); }

/* ============================================================
   STUDENT RESULTS
   ============================================================ */
function aggregateSkills(){
  var agg={}; SKILLS.forEach(function(s){ agg[s]={c:0,t:0}; });
  var st=state.progress.stories;
  for(var k in st){ var sk=st[k].skill||{}; for(var g in sk){ if(agg[g]){ agg[g].c+=sk[g].c; agg[g].t+=sk[g].t; } } }
  return agg;
}
function viewResults(){
  var st=state.progress.stories, done=completedCount();
  var wrap=h("section",{class:"view"},
    h("div",{class:"section-title"}, h("h2",null,"My Results"),
      h("button",{class:"btn btn-sm btn-ghost no-print",onclick:function(){ window.print(); }},"🖨 Print report")));
  if(done===0){ wrap.appendChild(h("p",{class:"empty"},"No results yet. Finish a story to see your reading skills grow here.")); return wrap; }
  var totalQ=0, totalC=0;
  for(var k in st){ totalQ+=st[k].total; totalC+=st[k].correct; }
  wrap.appendChild(h("div",{class:"reward-stats print-area"},
    stat(Math.round(totalC/totalQ*100)+"%","Overall score"),
    stat(done+" / 12","Stories completed"),
    stat(totalC+" / "+totalQ,"Correct answers")));
  var agg=aggregateSkills();
  var grid=h("div",{class:"report-grid print-area"});
  SKILLS.forEach(function(sk){
    var d=agg[sk], pct=d.t?Math.round(d.c/d.t*100):0;
    var band=pct>=80?"g":(pct>=50?"y":"c");
    grid.appendChild(h("div",{class:"skill-row"},
      h("div",{class:"sr-top"}, h("span",null,sk), h("span",null, d.t?pct+"%":"—")),
      h("div",{class:"bar "+band}, h("i",{style:{width:pct+"%"}})),
      h("small",{style:{color:"var(--muted)"}}, d.t? (d.c+" of "+d.t+" correct") : "Not practiced yet")));
  });
  wrap.appendChild(h("h3",{style:{marginTop:"8px"}},"Reading skills"));
  wrap.appendChild(grid);
  /* questions needing practice */
  var practice=[];
  STORIES.forEach(function(s){
    var p=st[s.id]; if(!p) return;
    s.questions.forEach(function(q,i){ if(p.outcomes[i]==="revealed") practice.push({s:s,q:q}); });
  });
  wrap.appendChild(h("h3",{style:{marginTop:"20px"}},"Questions to practice again"));
  if(practice.length===0) wrap.appendChild(h("p",{style:{color:"var(--ok)",fontWeight:"800"}},"None — wonderful work! Every question was answered."));
  else { var pl=h("div",{class:"review-list"}); practice.slice(0,12).forEach(function(p){
      pl.appendChild(h("div",{class:"review-item"}, h("span",{class:"rmark no"},"!"),
        h("div",{class:"rq"}, h("div",null,p.q.prompt), h("small",null,p.s.title+" · "+p.q.skill)))); });
    wrap.appendChild(pl);
  }
  return wrap;
}

/* ============================================================
   TEACHER DASHBOARD
   ============================================================ */
function viewTeacher(){
  var wrap=h("section",{class:"view"},
    h("div",{class:"section-title"}, h("h2",null,"Teacher Dashboard"),
      h("span",{class:"pill pill-sky"},"Classroom tools")));
  var sel = app.teacherStory ? storyById(app.teacherStory) : STORIES[0];
  var left=h("div",{class:"panel paper-grain"},
    h("h3",null,"Choose a story"),
    h("p",{style:{color:"var(--muted)",marginTop:"-6px"}},"Pick a story, then start Classroom Mode for the projector."),
    teacherStoryList(sel));
  left.appendChild(h("div",{style:{display:"flex",gap:"12px",marginTop:"16px",flexWrap:"wrap"}},
    h("button",{class:"btn btn-primary btn-lg",onclick:function(){ startClassroom(sel.id,false); }}, raw(icon("badgeCrown")), h("span",null,"Start Classroom Mode")),
    h("button",{class:"btn btn-sky",onclick:function(){ startClassroom(sel.id,true); }},"Quick-play (no name)")));

  var right=h("div",{class:"panel paper-grain"},
    h("h3",null,"Class settings"),
    toggleRow("Unlock all stories","Open every level for the whole class.", state.teacher.unlockAll, function(){ state.teacher.unlockAll=!state.teacher.unlockAll; save(true); render(); }),
    toggleRow("Show answer feedback","Reveal the correct answer and clue after two tries.", state.teacher.showFeedback, function(){ state.teacher.showFeedback=!state.teacher.showFeedback; save(true); render(); }),
    toggleRow("Sound / read-aloud","Turn classroom audio on or off.", state.settings.sound, function(){ state.settings.sound=!state.settings.sound; if(!state.settings.sound) stopAllAudio(); save(true); render(); }),
    h("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"}},
      h("button",{class:"btn btn-green btn-block",onclick:function(){ go("results"); }},"View student results"),
      h("button",{class:"btn btn-ghost btn-block",onclick:function(){ window.print(); }},"🖨 Print progress report"),
      h("button",{class:"btn btn-ghost btn-block",onclick:confirmReset},"↺ Reset student progress")));
  wrap.appendChild(h("div",{class:"teacher-grid"}, left, right));
  return wrap;
}
function teacherStoryList(sel){
  var list=h("div",{class:"teacher-story-list"});
  var colors={1:"var(--sky-d)",2:"var(--sage-d)",3:"var(--coral-d)"};
  STORIES.forEach(function(s){
    var p=state.progress.stories[s.id];
    list.appendChild(h("div",{class:"tsl-item"+(sel.id===s.id?" sel":""),role:"button",tabindex:0,
      onclick:function(){ app.teacherStory=s.id; render(); },
      onkeydown:function(e){ if(e.key==="Enter"){ app.teacherStory=s.id; render(); } }},
      h("span",{class:"lv",style:{background:colors[s.level]}},"L"+s.level),
      h("span",{style:{flex:1,fontWeight:"700"}}, s.title),
      starRating(p?p.stars:0)));
  });
  return list;
}
function toggleRow(title, sub, on, fn){
  return h("div",{class:"toggle-row"},
    h("div",{class:"lbl"}, h("b",null,title), h("small",{style:{color:"var(--muted)"}},sub)),
    h("button",{class:"switch"+(on?" on":""),role:"switch","aria-checked":on?"true":"false","aria-label":title,onclick:fn}));
}
function confirmReset(){
  openModal({ title:"Reset all progress?", danger:true,
    body:"This clears every star, badge, result and completed story. This cannot be undone.",
    confirmText:"Yes, reset everything", cancelText:"Keep my progress",
    onConfirm:function(){ var name=state.studentName; state=defaults(); state.studentName=name; save(true);
      document.documentElement.style.setProperty("--text-scale",1); applySettings(); flash(icon("badgeStar"),"Progress reset"); go("welcome"); } });
}

/* ============================================================
   CLASSROOM MODE (projector)
   ============================================================ */
function startClassroom(storyId, quick){
  app.classroom={ storyId:storyId, index:0, picked:null, showAnswer:false, showEvidence:false, quick:quick };
  requestFullscreen();
  render();
}
function exitClassroom(){ stopAllAudio(); if(document.fullscreenElement) document.exitFullscreen&&document.exitFullscreen(); app.classroom=null; render(); }
function viewClassroom(){
  var cr=app.classroom, s=storyById(cr.storyId), q=s.questions[cr.index], total=s.questions.length;
  var el=h("div",{class:"classroom"});
  el.appendChild(h("div",{class:"cr-top"},
    h("span",{class:"cr-title"}, s.title),
    h("span",{class:"pill pill-sky"},"Question "+(cr.index+1)+" of "+total),
    h("span",{class:"pill pill-sage"}, q.skill),
    h("span",{style:{flex:1}}),
    h("button",{class:"btn btn-ghost",onclick:exitClassroom},"✕ Exit")));
  var body=h("div",{class:"cr-body"});
  body.appendChild(h("div",{class:"q-prompt"}, q.prompt));
  if(q.type==="listen") body.appendChild(h("div",{style:{textAlign:"center",marginBottom:"16px"}},
    h("button",{class:"btn btn-sky btn-lg",onclick:function(){ Speech.speak(q.speak); }},"▶ Play the sentence")));
  body.appendChild(classroomAnswers(s,q,cr));
  if(cr.showEvidence && (q.evidence!=null || q.type==="evidence")){
    var ei = q.type==="evidence"? q.answer : q.evidence;
    body.appendChild(h("div",{class:"feedback show",style:{maxWidth:"800px",margin:"18px auto 0"}},
      h("div",{class:"fic"},"i"), h("div",{class:"ftext"}, h("b",null,"Clue: "), "“"+s.sentences[ei]+"”")));
  }
  if(cr.showAnswer) body.appendChild(h("div",{class:"feedback good",style:{maxWidth:"800px",margin:"14px auto 0"}},
    h("div",{class:"fic"},"✓"), h("div",{class:"ftext"}, h("b",null,"Answer. "), q.explain)));
  el.appendChild(body);
  el.appendChild(h("div",{class:"cr-controls"},
    h("button",{class:"btn btn-ghost btn-lg",disabled:cr.index===0,onclick:function(){ crGo(-1); }},"◀ Back"),
    h("button",{class:"btn btn-sky btn-lg",onclick:function(){ crReplay(s,q); }},"↻ Replay audio"),
    h("button",{class:"btn btn-yellow btn-lg",onclick:function(){ cr.showEvidence=!cr.showEvidence; render(); }},"Show clue"),
    h("button",{class:"btn btn-green btn-lg",onclick:function(){ cr.showAnswer=true; render(); }},"Show answer"),
    h("button",{class:"btn btn-ghost btn-lg",onclick:function(){ cr.picked=null; cr.showAnswer=false; cr.showEvidence=false; render(); }},"Reset"),
    h("button",{class:"btn btn-primary btn-lg",disabled:cr.index===total-1,onclick:function(){ crGo(1); }},"Next ▶")));
  return el;
}
function crReplay(s,q){ if(q.type==="listen") Speech.speak(q.speak); else Speech.speak(q.prompt); }
function crGo(d){ var cr=app.classroom, s=storyById(cr.storyId); var n=cr.index+d; if(n<0||n>=s.questions.length) return; cr.index=n; cr.picked=null; cr.showAnswer=false; cr.showEvidence=false; stopAllAudio(); render(); }
function classroomAnswers(s,q,cr){
  if(q.type==="mc"||q.type==="listen"||q.type==="picture"){
    var pic=q.type==="picture";
    var grid=h("div",{class:"opt-grid "+(pic?"cols-3":"stack"),style:{maxWidth:"900px",margin:"0 auto"}});
    q.options.forEach(function(opt,idx){
      var cls="opt"+(pic?" pic":"");
      if(cr.showAnswer && idx===q.answer) cls+=" correct";
      else if(cr.picked===idx && idx!==q.answer && cr.showAnswer) cls+=" wrong";
      else if(cr.picked===idx) cls+=" reveal";
      grid.appendChild(h("button",{class:cls,onclick:function(){ cr.picked=idx; render(); }},
        pic?[raw(icon(opt.icon)),h("span",null,opt.label)]:[h("span",null,opt)]));
    });
    return grid;
  }
  if(q.type==="tf"){
    return h("div",{class:"tf-row",style:{maxWidth:"700px",margin:"0 auto"}},
      ["True","False"].map(function(lbl,idx){
        var val=idx===0; var cls="opt tf-btn "+(val?"tf-true":"tf-false");
        if(cr.showAnswer && val===q.answer) cls+=" correct";
        else if(cr.picked===idx) cls+=" reveal";
        return h("button",{class:cls,onclick:function(){ cr.picked=idx; render(); }},
          h("span",{class:"tf-ic"}, val?"✓":"✕"), h("span",null,lbl));
      }));
  }
  if(q.type==="evidence"){
    var p=h("p",{class:"passage selectable",style:{maxWidth:"900px",margin:"0 auto"}});
    s.sentences.forEach(function(sent,i){
      var cls="sent"; if(cr.showAnswer && i===q.answer) cls+=" evidence"; else if(cr.picked===i) cls+=" picked";
      p.appendChild(h("span",{class:cls,role:"button",tabindex:0,onclick:function(){ cr.picked=i; render(); }}, sent+" "));
    });
    return p;
  }
  if(q.type==="sequence"){
    var box=h("div",{class:"seq-list",style:{maxWidth:"760px",margin:"0 auto"}});
    var order = cr.showAnswer ? q.items.map(function(t,i){return i;}) : (cr._shuf||(cr._shuf=shuffle(q.items.map(function(t,i){return i;}))));
    order.forEach(function(itemIdx,pos){
      box.appendChild(h("div",{class:"seq-item"+(cr.showAnswer?" correct":"")},
        h("span",{class:"ord"}, cr.showAnswer?(pos+1):"?"), h("span",{class:"txt"}, q.items[itemIdx])));
    });
    return box;
  }
  if(q.type==="match"){
    var wrap=h("div",{class:"match-wrap",style:{maxWidth:"800px",margin:"0 auto"}});
    var lc=h("div",{class:"match-col"}, h("h4",null,"Words"));
    q.pairs.forEach(function(p){ lc.appendChild(h("div",{class:"chip-word"+(cr.showAnswer?" matched":"")}, p.word)); });
    var rc=h("div",{class:"match-col"}, h("h4",null,"Pictures"));
    q.pairs.forEach(function(p){ rc.appendChild(h("div",{class:"chip-pic"+(cr.showAnswer?" matched":"")}, raw(icon(p.icon)))); });
    wrap.appendChild(lc); wrap.appendChild(rc); return wrap;
  }
  if(q.type==="sort"){
    var cats=h("div",{class:"sort-cats",style:{maxWidth:"820px",margin:"0 auto"}});
    q.categories.forEach(function(cat){
      var col=h("div",{class:"sort-cat"}, h("h4",null,cat));
      if(cr.showAnswer) q.items.forEach(function(it){ if(it.cat===cat) col.appendChild(h("span",{class:"sort-token small correct",style:{margin:"3px",display:"inline-block"}}, it.text)); });
      cats.appendChild(col);
    });
    return h("div",null, h("div",{class:"sort-pool",style:{justifyContent:"center"}}, q.items.map(function(it){ return h("span",{class:"sort-token"}, it.text); })), cats);
  }
  return h("div",null);
}

/* ============================================================
   CERTIFICATE
   ============================================================ */
function viewCertificate(){
  var done=completedCount();
  var dateStr=new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  var wrap=h("section",{class:"view cert-page"},
    h("div",{class:"section-title no-print"}, h("h2",null,"Completion Certificate"),
      h("button",{class:"btn btn-sm btn-ghost",onclick:function(){ go("library"); }},"← Library")));
  wrap.appendChild(h("div",{class:"certificate print-area"},
    h("div",{class:"cert-inner"},
      h("div",{class:"cert-medal"}, raw(badge("badgeTrophy"))),
      h("div",{class:"cert-kicker"},"Little Readers"),
      h("div",{class:"cert-title"},"Reading Champion"),
      h("p",{style:{color:"var(--muted)",margin:"0"}},"This certificate is proudly presented to"),
      h("input",{class:"name-input",type:"text",value:state.studentName||"",placeholder:"Type your name",
        "aria-label":"Student name",
        oninput:function(e){ state.studentName=e.target.value; },
        onchange:function(e){ state.studentName=e.target.value; save(true); }}),
      h("div",{class:"cert-row"},
        h("div",{class:"ci"}, h("div",{class:"n"}, done+" / 12"), h("div",{class:"l"},"Stories completed")),
        h("div",{class:"ci"}, h("div",{class:"n"}, totalStars()), h("div",{class:"l"},"Stars earned")),
        h("div",{class:"ci"}, h("div",{class:"n"}, state.progress.badges.length), h("div",{class:"l"},"Badges")) ),
      h("p",{style:{color:"var(--muted)"}},"for wonderful reading, listening and clue-finding."),
      h("div",{class:"cert-sign"},
        h("div",null, dateStr, h("div",{style:{fontSize:".75rem"}},"Date")),
        h("div",{style:{textAlign:"right"}}, "Bright EngMath", h("div",{style:{fontSize:".75rem"}},"Little Readers Story Pack 1")))
    )));
  wrap.appendChild(h("div",{class:"q-actions no-print",style:{justifyContent:"center"}},
    h("button",{class:"btn btn-primary btn-lg",onclick:function(){ save(true); window.print(); }},"🖨 Print certificate")));
  if(done<12) wrap.appendChild(h("p",{class:"empty no-print"},"Finish all 12 stories to earn the full Reading Champion certificate. You have "+done+" so far!"));
  return wrap;
}

/* ============================================================
   SETTINGS
   ============================================================ */
function viewSettings(){
  var s=state.settings;
  var wrap=h("section",{class:"view"},
    h("div",{class:"section-title"}, h("h2",null,"Settings")));
  var grid=h("div",{class:"settings-grid"});
  grid.appendChild(setRow("Sound","Turn all audio on or off.",
    h("button",{class:"switch"+(s.sound?" on":""),role:"switch","aria-checked":s.sound,onclick:function(){ s.sound=!s.sound; if(!s.sound) stopAllAudio(); save(true); render(); }})));
  grid.appendChild(setRow("Read-aloud speed","How fast the voice reads.",
    seg([["0.7","Slow",0.7],["0.9","Normal",0.9],["1.1","Fast",1.1]], s.rate, function(v){ s.rate=v; save(true); render(); })));
  grid.appendChild(setRow("Text size","Make the words bigger or smaller.",
    seg([["0.9","Small",0.9],["1","Medium",1],["1.15","Large",1.15],["1.3","X-Large",1.3]], s.textScale, function(v){ setTextScale(v); render(); })));
  grid.appendChild(setRow("Reduced motion","Turn off animations and confetti.",
    h("button",{class:"switch"+(s.reducedMotion?" on":""),role:"switch","aria-checked":s.reducedMotion,onclick:function(){ s.reducedMotion=!s.reducedMotion; applySettings(); save(true); render(); }})));
  grid.appendChild(setRow("Fullscreen","Best for classroom projectors.",
    h("button",{class:"btn btn-sky",onclick:toggleFullscreen}, document.fullscreenElement?"Exit fullscreen":"Go fullscreen")));
  grid.appendChild(setRow("Reset progress","Clear all stars, badges and results.",
    h("button",{class:"btn btn-primary",onclick:confirmReset},"Reset progress")));
  wrap.appendChild(grid);
  return wrap;
}
function setRow(title, sub, control){
  return h("div",{class:"set-row"},
    h("div",{class:"lbl"}, h("b",null,title), h("small",null,sub)), control);
}
function seg(opts, cur, fn){
  var box=h("div",{class:"seg"});
  opts.forEach(function(o){ box.appendChild(h("button",{class:(Math.abs(cur-o[2])<0.001?"on":""),onclick:function(){ fn(o[2]); }}, o[1])); });
  return box;
}

/* ---------------- system ---------------- */
function applySettings(){
  document.documentElement.style.setProperty("--text-scale", state.settings.textScale||1);
  document.body.classList.toggle("reduce-motion", !!state.settings.reducedMotion);
}
function requestFullscreen(){ var el=document.documentElement; if(el.requestFullscreen) el.requestFullscreen().catch(function(){}); }
function toggleFullscreen(){ if(document.fullscreenElement){ document.exitFullscreen&&document.exitFullscreen(); } else requestFullscreen(); setTimeout(render,120); }
window.addEventListener("beforeunload", stopAllAudio);
document.addEventListener("keydown", function(e){ if(e.key==="Escape" && app.classroom) exitClassroom(); });

/* ---------------- boot ---------------- */
function boot(){
  applySettings();
  var loader=document.getElementById("loader");
  render();
  if(loader){ loader.style.opacity="0"; setTimeout(function(){ loader.style.display="none"; }, 420); }
}
if(document.readyState!=="loading") boot(); else document.addEventListener("DOMContentLoaded", boot);

})();
