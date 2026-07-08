/* =====================================================================
   UNIT 1 — Star Farm
   Focus: R-controlled vowels and related endings  (ar, ir, ur, er, or)
   All content below is original Bright EngMath material.
   ===================================================================== */
(function () {
  "use strict";
  const BEM = (window.BEM = window.BEM || {});

  BEM.registerUnit(1, {
    id: 1,
    key: "unit-1",
    theme: "Star Farm",
    title: "Star Farm",
    color: "var(--u1)",
    tagline: "Read words with ar, ir, ur, er, and or.",
    intro:
      "Welcome to Star Farm! Under one bright golden star, you will learn how the letter " +
      "r changes the sound of a vowel. Listen closely, read carefully, and follow the star map through the fields.",

    patternKeys: ["ar", "ir", "ur", "er", "or"],

    goals: [
      "Read and spell words with ar, ir, ur, er, and or.",
      "Listen for sounds that are alike and sounds that are different.",
      "Read a new Bright EngMath story and answer questions about it."
    ],

    /* ---------- PATTERN LESSON CARDS ---------- */
    patternCards: [
      {
        pattern: "ar",
        say: "Say “ar” like the sound in car. Open your mouth wide and let the sound ring.",
        examples: [ {w:"car", seg:"c-ar"}, {w:"star", seg:"st-ar"}, {w:"farm", seg:"f-ar-m"}, {w:"park", seg:"p-ar-k"} ],
        quickCheck: { prompt: "Which word has the <b>ar</b> sound?", choices: ["star", "bird", "nurse"], answer: 0,
          explain: "“star” has the open ar sound. “bird” uses ir and “nurse” uses ur." },
        teacherNote: "‘ar’ is an open, strongly r-coloured vowel in most accents. Compare it with the softer ir/ur/er sounds."
      },
      {
        pattern: "ir",
        say: "The letters “ir” often make a soft sound, like the middle of bird.",
        examples: [ {w:"bird", seg:"b-ir-d"}, {w:"girl", seg:"g-ir-l"}, {w:"shirt", seg:"sh-ir-t"}, {w:"third", seg:"th-ir-d"} ],
        quickCheck: { prompt: "Which word has the <b>ir</b> sound?", choices: ["girl", "car", "doctor"], answer: 0,
          explain: "“girl” has the ir sound. “car” uses ar and “doctor” ends with a soft or." },
        teacherNote: "In many accents ir, ur and unstressed er share the same r-coloured schwa. Model your own accent clearly."
      },
      {
        pattern: "ur",
        say: "The letters “ur” make a soft sound too, like the start of nurse and turn.",
        examples: [ {w:"nurse", seg:"n-ur-se"}, {w:"purple", seg:"pur-ple"}, {w:"turn", seg:"t-ur-n"}, {w:"hurt", seg:"h-ur-t"} ],
        quickCheck: { prompt: "Which word has the <b>ur</b> sound?", choices: ["turn", "farm", "star"], answer: 0,
          explain: "“turn” has the ur sound. “farm” and “star” both use ar." },
        teacherNote: "ur usually matches ir in sound. Highlight the spelling difference, not a sound difference."
      },
      {
        pattern: "er",
        say: "At the end of many words, “er” is a gentle, quiet sound, as in teacher.",
        examples: [ {w:"teacher", seg:"teach-er"}, {w:"sister", seg:"sis-ter"}, {w:"summer", seg:"sum-mer"}, {w:"winter", seg:"win-ter"} ],
        quickCheck: { prompt: "Which word ends with the soft <b>er</b> sound?", choices: ["summer", "park", "bird"], answer: 0,
          explain: "“summer” ends with the quiet er sound." },
        teacherNote: "Final ‘er’ is an unstressed, weak syllable. Do not over-stress it when modelling."
      },
      {
        pattern: "or",
        say: "The letters “or” can be a soft ending sound in words like doctor and tractor.",
        examples: [ {w:"doctor", seg:"doc-tor"}, {w:"tractor", seg:"trac-tor"}, {w:"actor", seg:"ac-tor"}, {w:"visitor", seg:"vis-i-tor"} ],
        quickCheck: { prompt: "Which word ends with the soft <b>or</b> sound?", choices: ["tractor", "girl", "jar"], answer: 0,
          explain: "“tractor” ends with the soft or sound." },
        teacherNote: "This ‘or’ ending is weak and schwa-like, unlike the fuller ‘or’ in ‘fork’. That fuller sound is taught in Unit 3."
      }
    ],

    /* ---------- PICTURE VOCABULARY (24 words) ---------- */
    vocab: [
      { word:"car",    pattern:"ar", gr:"ar", seg:"c-ar",   type:"core", art:"car",
        def:"A machine with four wheels that people drive on roads.", ex:"Dad parked the red car near the gate." },
      { word:"farm",   pattern:"ar", gr:"ar", seg:"f-ar-m", type:"core", art:"farm",
        def:"A place with fields and animals where food is grown.", ex:"We fed the goats at the farm." },
      { word:"park",   pattern:"ar", gr:"ar", seg:"p-ar-k", type:"core", art:"park",
        def:"An open green place with grass and trees where people play.", ex:"The children ran across the park." },
      { word:"star",   pattern:"ar", gr:"ar", seg:"st-ar",  type:"core", art:"star",
        def:"A bright light we see in the night sky.", ex:"One gold star shone above the barn." },
      { word:"bird",   pattern:"ir", gr:"ir", seg:"b-ir-d", type:"core", art:"bird",
        def:"A small animal with feathers and wings that can fly.", ex:"A little bird sang on the fence." },
      { word:"girl",   pattern:"ir", gr:"ir", seg:"g-ir-l", type:"core", art:"girl",
        def:"A young female child.", ex:"The girl waved from the tractor." },
      { word:"nurse",  pattern:"ur", gr:"ur", seg:"n-ur-se",type:"core", art:"nurse",
        def:"A person who helps take care of people who are ill.", ex:"The kind nurse checked my arm." },
      { word:"purple", pattern:"ur", gr:"ur", seg:"pur-ple",type:"core", art:"purple",
        def:"A colour made by mixing red and blue.", ex:"She wore a purple hat to the farm." },
      { word:"teacher",pattern:"er", gr:"er", seg:"teach-er",type:"core", art:"teacher",
        def:"A person whose job is to help others learn.", ex:"Our teacher read us a farm story." },
      { word:"sister", pattern:"er", gr:"er", seg:"sis-ter",type:"core", art:"sister",
        def:"A girl or woman who has the same parents as you.", ex:"My sister found the star map." },
      { word:"doctor", pattern:"or", gr:"or", seg:"doc-tor",type:"core", art:"doctor",
        def:"A person who helps people get well when they are ill.", ex:"The doctor helped the little calf." },
      { word:"tractor",pattern:"or", gr:"or", seg:"trac-tor",type:"core", art:"tractor",
        def:"A strong farm machine that pulls heavy loads.", ex:"The green tractor pulled the cart." },

      { word:"arm",    pattern:"ar", gr:"ar", seg:"ar-m",   type:"explorer", art:"arm",
        def:"The part of your body between your shoulder and hand.", ex:"He carried the box under one arm." },
      { word:"jar",    pattern:"ar", gr:"ar", seg:"j-ar",   type:"explorer", art:"jar",
        def:"A glass container with a wide top for keeping food.", ex:"The jar was full of farm honey." },
      { word:"card",   pattern:"ar", gr:"ar", seg:"c-ar-d", type:"explorer", art:"card",
        def:"A small piece of thick paper with a message or picture.", ex:"I made a card for the farmer." },
      { word:"garden", pattern:"ar", gr:"ar", seg:"gar-den",type:"explorer", art:"garden",
        def:"A piece of land where flowers and plants grow.", ex:"Carrots grew in the sunny garden." },
      { word:"shirt",  pattern:"ir", gr:"ir", seg:"sh-ir-t",type:"explorer", art:"shirt",
        def:"A piece of clothing for the top of your body.", ex:"His shirt had a picture of a star." },
      { word:"third",  pattern:"ir", gr:"ir", seg:"th-ir-d",type:"explorer", art:"third",
        def:"Coming after second in order.", ex:"The third egg was the biggest." },
      { word:"turn",   pattern:"ur", gr:"ur", seg:"t-ur-n", type:"explorer", art:"turn",
        def:"To move so that you face a new way.", ex:"Please turn left at the red barn." },
      { word:"hurt",   pattern:"ur", gr:"ur", seg:"h-ur-t", type:"explorer", art:"hurt",
        def:"To feel pain, or to cause pain.", ex:"The puppy did not get hurt." },
      { word:"summer", pattern:"er", gr:"er", seg:"sum-mer",type:"explorer", art:"summer",
        def:"The warmest season of the year.", ex:"In summer the fields turn golden." },
      { word:"winter", pattern:"er", gr:"er", seg:"win-ter",type:"explorer", art:"winter",
        def:"The coldest season of the year.", ex:"The pond froze in cold winter." },
      { word:"actor",  pattern:"or", gr:"or", seg:"ac-tor", type:"explorer", art:"actor",
        def:"A person who performs in plays or films.", ex:"The actor told a funny farm tale." },
      { word:"visitor",pattern:"or", gr:"or", seg:"vis-i-tor",type:"explorer", art:"visitor",
        def:"A person who comes to see a place or person.", ex:"A visitor came to see the new lambs." }
    ],

    /* ---------- SENTENCE READING (14) ---------- */
    sentences: [
      { text:"The car is parked by the big red barn.", targets:["car"], pattern:"ar" },
      { text:"A bright star shines over the quiet farm.", targets:["star","farm"], pattern:"ar" },
      { text:"The girl saw a little bird on the wall.", targets:["girl","bird"], pattern:"ir" },
      { text:"My sister is a kind and busy nurse.", targets:["sister","nurse"], pattern:"er" },
      { text:"The doctor drove the green tractor slowly.", targets:["doctor","tractor"], pattern:"or" },
      { text:"In summer the garden is full of flowers.", targets:["summer","garden"], pattern:"er" },
      { text:"Please turn right and walk to the park.", targets:["turn","park"], pattern:"ur" },
      { text:"The farmer wore a purple shirt today.", targets:["purple","shirt"], pattern:"ur" },
      { text:"A jar of honey sat on the third shelf.", targets:["jar","third"], pattern:"ar" },
      { text:"The teacher read us a story about a star.", targets:["teacher","star"], pattern:"er" },
      { text:"In cold winter the birds fly far away.", targets:["winter","far"], pattern:"er" },
      { text:"The visitor did not hurt his arm at all.", targets:["visitor","hurt","arm"], pattern:"ur" },
      { text:"An actor made a funny card for the girl.", targets:["actor","card","girl"], pattern:"or" },
      { text:"The car turned near the dark old farm.", targets:["car","turned","dark","farm"], pattern:"ar" }
    ],

    /* ---------- INTERACTIVE ACTIVITIES (10 types) ---------- */
    activities: [
      { type:"mcq", title:"Listen and Choose", instruction:"Listen to the word, then tap what you hear.",
        roundSize:6, items:[
          { speak:"car",    prompt:"Which word did you hear?", choices:["car","jar","star"], answer:0, pattern:"ar",
            explain:"You heard “car”, which begins with the /k/ sound." },
          { speak:"bird",   prompt:"Which word did you hear?", choices:["bird","third","girl"], answer:0, pattern:"ir",
            explain:"You heard “bird”, which begins with the /b/ sound." },
          { speak:"nurse",  prompt:"Which word did you hear?", choices:["nurse","purple","turn"], answer:0, pattern:"ur",
            explain:"You heard “nurse”. All three words share the soft ur sound." },
          { speak:"teacher",prompt:"Which word did you hear?", choices:["teacher","sister","summer"], answer:0, pattern:"er",
            explain:"You heard “teacher”. All three end with the quiet er sound." },
          { speak:"doctor", prompt:"Which word did you hear?", choices:["doctor","tractor","actor"], answer:0, pattern:"or",
            explain:"You heard “doctor”. All three end with the soft or sound." },
          { speak:"garden", prompt:"Which word did you hear?", choices:["garden","girl","card"], answer:0, pattern:"ar",
            explain:"You heard “garden”, which has the ar sound." }
        ]},

      { type:"mcq", title:"Choose the Pattern", instruction:"Which spelling pattern makes the vowel sound?",
        roundSize:6, items:[
          { prompt:"Which pattern is in <b>star</b>?",    choices:["ar","ir","or"], answer:0, pattern:"ar", explain:"star = st-ar." },
          { prompt:"Which pattern is in <b>bird</b>?",    choices:["ir","ar","ur"], answer:0, pattern:"ir", explain:"bird = b-ir-d." },
          { prompt:"Which pattern is in <b>turn</b>?",    choices:["ur","or","er"], answer:0, pattern:"ur", explain:"turn = t-ur-n." },
          { prompt:"Which pattern is in <b>summer</b>?",  choices:["er","ir","ar"], answer:0, pattern:"er", explain:"summer = sum-mer." },
          { prompt:"Which pattern is in <b>tractor</b>?", choices:["or","ur","ar"], answer:0, pattern:"or", explain:"tractor = trac-tor." },
          { prompt:"Which pattern is in <b>shirt</b>?",   choices:["ir","er","or"], answer:0, pattern:"ir", explain:"shirt = sh-ir-t." }
        ]},

      { type:"complete", title:"Complete the Word", instruction:"Listen and choose the missing letters.",
        roundSize:6, items:[
          { word:"car",    display:"c__",    speak:"car",    choices:["ar","ir","or"], answer:0, pattern:"ar", explain:"c + ar = car." },
          { word:"bird",   display:"b__d",   speak:"bird",   choices:["ir","ur","ar"], answer:0, pattern:"ir", explain:"b + ir + d = bird." },
          { word:"nurse",  display:"n__se",  speak:"nurse",  choices:["ur","ir","or"], answer:0, pattern:"ur", explain:"n + ur + se = nurse." },
          { word:"farm",   display:"f__m",   speak:"farm",   choices:["ar","or","er"], answer:0, pattern:"ar", explain:"f + ar + m = farm." },
          { word:"sister", display:"sist__", speak:"sister", choices:["er","ir","ar"], answer:0, pattern:"er", explain:"sist + er = sister." },
          { word:"doctor", display:"doct__", speak:"doctor", choices:["or","er","ur"], answer:0, pattern:"or", explain:"doct + or = doctor." }
        ]},

      { type:"build", title:"Build the Word", instruction:"Tap the letter tiles in the right order.",
        roundSize:4, items:[
          { word:"star", speak:"star", tiles:["s","t","ar"],     answer:["s","t","ar"],     pattern:"ar" },
          { word:"girl", speak:"girl", tiles:["g","ir","l"],     answer:["g","ir","l"],     pattern:"ir" },
          { word:"turn", speak:"turn", tiles:["t","ur","n"],     answer:["t","ur","n"],     pattern:"ur" },
          { word:"card", speak:"card", tiles:["c","ar","d"],     answer:["c","ar","d"],     pattern:"ar" }
        ]},

      { type:"sort", title:"Sound Sorting", instruction:"Put each word under the pattern it uses.",
        columns:["ar","ir","ur"], roundSize:8, items:[
          { text:"star",  col:"ar", speak:"star" }, { text:"jar",   col:"ar", speak:"jar" },
          { text:"farm",  col:"ar", speak:"farm" }, { text:"bird",  col:"ir", speak:"bird" },
          { text:"shirt", col:"ir", speak:"shirt" },{ text:"girl",  col:"ir", speak:"girl" },
          { text:"nurse", col:"ur", speak:"nurse" },{ text:"turn",  col:"ur", speak:"turn" }
        ]},

      { type:"odd", title:"Odd One Out", instruction:"Tap the word with a different vowel sound.",
        roundSize:4, items:[
          { choices:["car","star","bird"],           answer:2, pattern:"ir", explain:"“bird” has the ir sound; “car” and “star” have ar." },
          { choices:["nurse","turn","summer"],       answer:2, pattern:"er", explain:"“summer” ends with er; “nurse” and “turn” have ur." },
          { choices:["teacher","sister","doctor"],   answer:2, pattern:"or", explain:"“doctor” ends with or; the others end with er." },
          { choices:["girl","shirt","park"],         answer:2, pattern:"ar", explain:"“park” has ar; “girl” and “shirt” have ir." }
        ]},

      { type:"picture-mcq", title:"Word to Picture", instruction:"Read the word and tap the matching picture.",
        roundSize:5, items:[
          { prompt:"car",     speak:"car",     choices:["car","star","bird"],       answer:0, pattern:"ar" },
          { prompt:"star",    speak:"star",    choices:["star","farm","jar"],        answer:0, pattern:"ar" },
          { prompt:"nurse",   speak:"nurse",   choices:["nurse","doctor","teacher"], answer:0, pattern:"ur" },
          { prompt:"tractor", speak:"tractor", choices:["tractor","car","garden"],   answer:0, pattern:"or" },
          { prompt:"bird",    speak:"bird",    choices:["bird","girl","shirt"],      answer:0, pattern:"ir" }
        ]},

      { type:"memory", title:"Memory Match", instruction:"Flip two cards to match each word with its picture.",
        roundSize:4, pairs:[
          { id:"car",   word:"car",   art:"car" },
          { id:"star",  word:"star",  art:"star" },
          { id:"bird",  word:"bird",  art:"bird" },
          { id:"nurse", word:"nurse", art:"nurse" }
        ]},

      { type:"tapword", title:"Word Hunt", instruction:"Tap the word that matches the sound.",
        roundSize:4, items:[
          { tokens:["A","bird","sat","on","the","gate."], targets:[1], hint:"Tap the word with the <b>ir</b> sound.", pattern:"ir" },
          { tokens:["The","nurse","ran","very","fast."],  targets:[1], hint:"Tap the word with the <b>ur</b> sound.", pattern:"ur" },
          { tokens:["My","teacher","is","so","kind."],    targets:[1], hint:"Tap the word with the <b>er</b> sound.", pattern:"er" },
          { tokens:["A","big","gold","star","fell."],     targets:[3], hint:"Tap the word with the <b>ar</b> sound.", pattern:"ar" }
        ]},

      { type:"truefalse", title:"True or False", instruction:"Read each sentence. Is it true or false?",
        roundSize:4, items:[
          { statement:"The word “star” has the ar sound.",   answer:true,  pattern:"ar", explain:"Yes — star = st-ar." },
          { statement:"The word “girl” has the ar sound.",   answer:false, pattern:"ir", explain:"No — “girl” has the ir sound." },
          { statement:"The word “turn” has the ur sound.",   answer:true,  pattern:"ur", explain:"Yes — turn = t-ur-n." },
          { statement:"The word “doctor” ends with the soft or sound.", answer:true, pattern:"or", explain:"Yes — doc-tor ends with or." }
        ]},

      { type:"sentence", title:"Sentence Builder", instruction:"Tap the words in order to build the sentence.",
        roundSize:3, items:[
          { words:["The","car","is","red."],            speak:"The car is red." },
          { words:["A","bird","can","fly."],            speak:"A bird can fly." },
          { words:["My","sister","likes","the","farm."],speak:"My sister likes the farm." }
        ]}
    ],

    /* ---------- ORIGINAL STORY ---------- */
    story: {
      title: "The Star Map at the Farm",
      characters: "Marla (a farm girl), Nur (a calf) and Fern (a little bird).",
      pages: [
        { text:"Marla lived on a busy farm. Her small calf was called Nur. A little bird named Fern sang near the barn.",
          targets:["farm","Nur","bird","barn"], art:"farm",
          illustrationPrompt:"A cheerful farm at dusk with a red barn, a girl, a calf and a small green bird — original flat vector style." },
        { text:"One night, a bright star fell behind the hill. It left a shiny star card in the tall grass.",
          targets:["star","card"], art:"star",
          illustrationPrompt:"A golden shooting star landing behind a hill, leaving a glowing card in the grass." },
        { text:"“Look, it is a star map!” said Marla. The card showed a path to a hidden gift. Fern gave a happy chirp.",
          targets:["star","card"], art:"map",
          illustrationPrompt:"A girl holding a glowing map card with a dotted path, a small bird beside her." },
        { text:"They walked past the garden and the park. Nur turned left by the old jar of seeds.",
          targets:["garden","park","turned","jar"], art:"park",
          illustrationPrompt:"A girl and a calf walking past a flower garden and a small park, a seed jar on a post." },
        { text:"Fern the bird flew up high. “A third gold star!” she called. It marked a spot near the water.",
          targets:["bird","third","star"], art:"bird",
          illustrationPrompt:"A little bird flying high pointing to a glowing star marker by a pond." },
        { text:"Under the star, they dug in the dark. Marla found a small box. Inside was a purple gift for the farm.",
          targets:["star","dark","purple","farm"], art:"treasure",
          illustrationPrompt:"A girl and calf digging under a star marker at night, opening a box with a purple glow." },
        { text:"It was a warm lamp shaped like a star. Now Star Farm glows every night. Nur, Marla and Fern are never in the dark again.",
          targets:["star","Star","Farm","farm","dark"], art:"star",
          illustrationPrompt:"A star-shaped lamp glowing over a happy farm at night with the three friends together." }
      ],

      /* Words to Know (10) */
      vocab: [
        { word:"farm",   page:1, art:"farm",   def:"Land with fields and animals for growing food.", ex:"Marla lived on a busy farm." },
        { word:"star",   page:2, art:"star",   def:"A bright light in the night sky.", ex:"A star fell behind the hill." },
        { word:"card",   page:2, art:"card",   def:"A flat piece of thick paper.", ex:"The star card glowed in the grass." },
        { word:"map",    page:3, art:"map",    def:"A drawing that shows the way to a place.", ex:"The card was a star map." },
        { word:"garden", page:4, art:"garden", def:"Land where flowers and plants grow.", ex:"They walked past the garden." },
        { word:"park",   page:4, art:"park",   def:"An open green place to play.", ex:"They passed the little park." },
        { word:"jar",    page:4, art:"jar",    def:"A glass pot for keeping things.", ex:"Nur turned by the old jar." },
        { word:"third",  page:5, art:"third",  def:"Number three in order.", ex:"Fern saw a third gold star." },
        { word:"purple", page:6, art:"purple", def:"A colour of red mixed with blue.", ex:"The gift had a purple glow." },
        { word:"dark",   page:6, art:"turn",   def:"When there is little or no light.", ex:"They dug in the dark." }
      ],

      /* Reading comprehension (10) */
      comprehension: [
        { kind:"mcq", prompt:"Who lived on the farm with the calf Nur?", choices:["Marla","A doctor","A nurse"], answer:0,
          explain:"The story says Marla lived on the farm with her calf Nur." },
        { kind:"mcq", prompt:"What fell behind the hill one night?", choices:["A bright star","A car","A jar"], answer:0,
          explain:"A bright star fell behind the hill." },
        { kind:"mcq", prompt:"What did the falling star leave in the grass?", choices:["A star card","A shirt","A tractor"], answer:0,
          explain:"It left a shiny star card in the tall grass." },
        { kind:"mcq", prompt:"Where did they dig to find the box?", choices:["Under the star","In the barn","In the car"], answer:0,
          explain:"They dug under the star, near the water." },
        { kind:"mcq", prompt:"Why did Marla follow the star map?", choices:["It showed a path to a gift","To find her car","To feed the birds"], answer:0,
          explain:"The map showed a path to a hidden gift." },
        { kind:"mcq", prompt:"What happened FIRST in the story?", choices:["A star fell behind the hill","They found the box","The lamp lit the farm"], answer:0,
          explain:"First a star fell; then they followed the map and found the box." },
        { kind:"truefalse", statement:"Fern is a little bird in the story.", answer:true,
          explain:"Yes — Fern is a little bird who sang near the barn." },
        { kind:"mcq", prompt:"What made Star Farm glow every night?", choices:["A star-shaped lamp","A purple jar","A green tractor"], answer:0,
          explain:"The gift was a warm lamp shaped like a star." },
        { kind:"mcq", prompt:"In the story, a “map” is something that —", choices:["shows the way to a place","keeps honey","pulls a cart"], answer:0,
          explain:"A map shows the way to a place." },
        { kind:"truefalse", statement:"Nur is a bird.", answer:false,
          explain:"No — Nur is a calf. Fern is the bird." }
      ]
    },

    /* ---------- UNIT CHALLENGE (20 questions) ---------- */
    challenge: [
      // 4 listening
      { cat:"listening", kind:"mcq", speak:"star",    prompt:"Listen. Which word do you hear?", choices:["star","stir","sister"], answer:0, pattern:"ar", explain:"“star” has the open ar sound." },
      { cat:"listening", kind:"mcq", speak:"girl",    prompt:"Listen. Which word do you hear?", choices:["girl","curl","goal"],  answer:0, pattern:"ir", explain:"“girl” has the ir sound." },
      { cat:"listening", kind:"mcq", speak:"nurse",   prompt:"Listen. Which word do you hear?", choices:["nurse","niece","noise"],answer:0, pattern:"ur", explain:"“nurse” has the soft ur sound." },
      { cat:"listening", kind:"mcq", speak:"tractor", prompt:"Listen. Which word do you hear?", choices:["tractor","trailer","treasure"], answer:0, pattern:"or", explain:"“tractor” ends with the soft or sound." },
      // 4 pattern recognition
      { cat:"pattern", kind:"mcq", prompt:"Which pattern is in <b>farm</b>?",   choices:["ar","or","er"], answer:0, pattern:"ar", explain:"farm = f-ar-m." },
      { cat:"pattern", kind:"mcq", prompt:"Which pattern is in <b>shirt</b>?",  choices:["ir","ur","ar"], answer:0, pattern:"ir", explain:"shirt = sh-ir-t." },
      { cat:"pattern", kind:"mcq", prompt:"Which pattern is in <b>hurt</b>?",   choices:["ur","or","ir"], answer:0, pattern:"ur", explain:"hurt = h-ur-t." },
      { cat:"pattern", kind:"mcq", prompt:"Which pattern is in <b>winter</b>?", choices:["er","ar","or"], answer:0, pattern:"er", explain:"winter = win-ter." },
      // 4 spelling
      { cat:"spelling", kind:"mcq", prompt:"Which spelling is correct?", choices:["star","ster","stur"], answer:0, pattern:"ar", explain:"The night-sky word is spelled s-t-a-r." },
      { cat:"spelling", kind:"mcq", speak:"bird", prompt:"Finish the word: b __ d", choices:["ir","ur","er"], answer:0, pattern:"ir", explain:"b + ir + d = bird." },
      { cat:"spelling", kind:"mcq", prompt:"Which spelling is correct for the farm machine?", choices:["tractor","tracter","tractur"], answer:0, pattern:"or", explain:"It is spelled t-r-a-c-t-o-r." },
      { cat:"spelling", kind:"mcq", speak:"nurse", prompt:"Finish the word: n __ se", choices:["ur","ir","or"], answer:0, pattern:"ur", explain:"n + ur + se = nurse." },
      // 3 vocabulary
      { cat:"vocabulary", kind:"mcq", prompt:"Which word means a person who helps you learn?", choices:["teacher","doctor","actor"], answer:0, pattern:"er", explain:"A teacher helps you learn." },
      { cat:"vocabulary", kind:"mcq", prompt:"Which word means the warmest season?", choices:["summer","winter","garden"], answer:0, pattern:"er", explain:"Summer is the warmest season." },
      { cat:"vocabulary", kind:"mcq", prompt:"A “jar” is used to —", choices:["keep food","drive fast","fly high"], answer:0, pattern:"ar", explain:"A jar keeps food, like honey." },
      // 3 sentence reading
      { cat:"sentence", kind:"mcq", prompt:"Choose the best word: The green ___ pulled the cart.", choices:["tractor","teacher","nurse"], answer:0, pattern:"or", explain:"A tractor pulls a cart on a farm." },
      { cat:"sentence", kind:"mcq", prompt:"Choose the best word: A little ___ sang on the fence.", choices:["bird","card","jar"], answer:0, pattern:"ir", explain:"A bird can sing on a fence." },
      { cat:"sentence", kind:"mcq", prompt:"Choose the best word: In ___ the garden is full of flowers.", choices:["summer","doctor","shirt"], answer:0, pattern:"er", explain:"Flowers bloom in summer." },
      // 2 story comprehension
      { cat:"comprehension", kind:"mcq", prompt:"In the story, what did the star map lead to?", choices:["a gift for the farm","a new car","a big city"], answer:0, pattern:"", explain:"The map led to a hidden gift — a star lamp for the farm." },
      { cat:"comprehension", kind:"truefalse", statement:"In the story, Nur is a calf.", answer:true, pattern:"", explain:"Yes — Nur is Marla's calf." }
    ]
  });
})();
