/* ============================================================
   IF-CLAUSE ADVENTURE
   Vanilla JS logic + all lesson and quiz data
   ============================================================ */

/* ---------- LESSON DATA ---------- */
const LESSONS = [
  {
    key: "zero",
    name: "Zero Conditional",
    color: "zero",
    emoji: "🌱",
    intro: "Facts and things that are always true.",
    use: [
      "Scientific facts",
      "General truths",
      "Rules",
      "Habits and daily routines",
      "Results that always happen"
    ],
    structure: "If + Present Simple, Present Simple",
    examples: [
      "If you heat ice, it melts.",
      "If people do not drink water, they become thirsty.",
      "If I finish my homework early, I watch television."
    ],
    positive: "If you press this button, the machine starts.",
    negative: "If you do not water plants, they die.",
    question: "What happens if you mix blue and yellow?",
    note: "You can often use <b>when</b> instead of <b>if</b> when the result is always true.<br>Example: <i>When water reaches 100°C, it boils.</i>",
    mistakes: [
      {
        wrong: "If you heat ice, it will melt.",
        right: "If you heat ice, it melts.",
        why: "The Zero Conditional uses the Present Simple in both parts. Do not use <b>will</b> for facts that are always true."
      }
    ],
    compareTitle: "Zero vs First",
    compare: "Zero Conditional is for facts that are <b>always</b> true: <i>If you drop a ball, it falls.</i><br>First Conditional is for a <b>possible future</b> event: <i>If you drop the ball, it will break.</i>",
    mini: [
      {
        q: "Which conditional is used for facts and general truths?",
        options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
        answer: "Zero Conditional"
      },
      {
        q: "Choose the correct sentence.",
        options: [
          "If you boil water, it will evaporate.",
          "If you boil water, it evaporates.",
          "If you will boil water, it evaporates.",
          "If you boiled water, it evaporates."
        ],
        answer: "If you boil water, it evaporates."
      },
      {
        q: "Complete: If the sun ______, plants grow.",
        options: ["shines", "will shine", "shined", "would shine"],
        answer: "shines"
      }
    ]
  },
  {
    key: "first",
    name: "First Conditional",
    color: "first",
    emoji: "🌦️",
    intro: "Real or possible future situations.",
    use: [
      "Real future possibilities",
      "Likely future situations",
      "Warnings",
      "Promises",
      "Plans that depend on a condition"
    ],
    structure: "If + Present Simple, will + base verb",
    examples: [
      "If it rains tomorrow, we will stay at home.",
      "If you study hard, you will pass the test.",
      "She will call you if she arrives early."
    ],
    positive: "If we leave now, we will catch the early bus.",
    negative: "If you do not hurry, you will miss the film.",
    question: "What will you do if it rains this afternoon?",
    note: "Do not normally use <b>will</b> straight after <b>if</b>. You can also use <b>may</b>, <b>might</b>, <b>can</b>, or an imperative in the result.<br>Examples: <i>If you finish your work, you can play outside.</i> · <i>If you see Anna, tell her to call me.</i>",
    mistakes: [
      {
        wrong: "If it will rain, we will stay home.",
        right: "If it rains, we will stay home.",
        why: "Use the Present Simple after <b>if</b>. Keep <b>will</b> in the result part only."
      }
    ],
    compareTitle: "First vs Second",
    compare: "First Conditional = real / possible: <i>If I have enough money, I will buy the shoes.</i><br>Second Conditional = imaginary / unlikely: <i>If I had enough money, I would buy the shoes.</i>",
    mini: [
      {
        q: "Which conditional talks about real, possible future events?",
        options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
        answer: "First Conditional"
      },
      {
        q: "Complete: If it ______ tomorrow, we will cancel the trip.",
        options: ["snows", "will snow", "snowed", "would snow"],
        answer: "snows"
      },
      {
        q: "Choose the correct sentence.",
        options: [
          "If you will call me, I will help you.",
          "If you call me, I will help you.",
          "If you called me, I will help you.",
          "If you call me, I helped you."
        ],
        answer: "If you call me, I will help you."
      }
    ]
  },
  {
    key: "second",
    name: "Second Conditional",
    color: "second",
    emoji: "💭",
    intro: "Imaginary or unlikely present and future situations.",
    use: [
      "Imaginary situations",
      "Unlikely future situations",
      "Dreams and wishes",
      "Giving advice with \"If I were you\""
    ],
    structure: "If + Past Simple, would + base verb",
    examples: [
      "If I had a million baht, I would travel around the world.",
      "If she lived closer, we would visit her more often.",
      "If I were you, I would talk to the teacher."
    ],
    positive: "If we had a garden, we would grow vegetables.",
    negative: "If I did not feel tired, I would join the game.",
    question: "What would you do if you could fly?",
    note: "In conditional sentences we often use <b>were</b> for all subjects (I, he, she, it).<br>Example: <i>If he were here, he would help us.</i>",
    mistakes: [
      {
        wrong: "If I would have more time, I would read more.",
        right: "If I had more time, I would read more.",
        why: "Use the Past Simple after <b>if</b>. Keep <b>would</b> in the result part only, never after <b>if</b>."
      }
    ],
    compareTitle: "First vs Second",
    compare: "First Conditional (real): <i>If I have enough money, I will buy the shoes.</i><br>Second Conditional (imaginary): <i>If I had enough money, I would buy the shoes.</i>",
    mini: [
      {
        q: "Which conditional is used for imaginary or unlikely situations?",
        options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
        answer: "Second Conditional"
      },
      {
        q: "Complete: If I ______ you, I would say sorry.",
        options: ["am", "was", "were", "had been"],
        answer: "were"
      },
      {
        q: "Choose the correct sentence.",
        options: [
          "If I win the lottery, I would travel.",
          "If I won the lottery, I will travel.",
          "If I won the lottery, I would travel.",
          "If I would win the lottery, I travel."
        ],
        answer: "If I won the lottery, I would travel."
      }
    ]
  },
  {
    key: "third",
    name: "Third Conditional",
    color: "third",
    emoji: "⏳",
    intro: "Imaginary situations in the past.",
    use: [
      "Imaginary past situations",
      "Regrets",
      "Past events that cannot be changed",
      "Imagining a different past result"
    ],
    structure: "If + Past Perfect, would have + past participle",
    examples: [
      "If I had studied harder, I would have passed the exam.",
      "If they had left earlier, they would not have missed the bus.",
      "She would have joined us if she had known about the trip."
    ],
    positive: "If we had saved money, we would have bought the tickets.",
    negative: "If you had not helped me, I would not have finished in time.",
    question: "What would you have done if you had won first prize?",
    note: "The Past Perfect is <b>had + past participle</b>.<br>Examples: had gone · had studied · had eaten · had seen · had finished",
    mistakes: [
      {
        wrong: "If I would have known, I would have helped.",
        right: "If I had known, I would have helped.",
        why: "Use the Past Perfect (<b>had + past participle</b>) after <b>if</b>. Never use <b>would</b> after <b>if</b>."
      }
    ],
    compareTitle: "Second vs Third",
    compare: "Second Conditional (present/future, imaginary): <i>If I knew the answer, I would tell you.</i><br>Third Conditional (past, cannot change): <i>If I had known the answer, I would have told you.</i>",
    mini: [
      {
        q: "Which conditional describes imaginary situations in the past?",
        options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
        answer: "Third Conditional"
      },
      {
        q: "Complete: If she had ______ earlier, she would have caught the train.",
        options: ["leave", "left", "leaves", "leaving"],
        answer: "left"
      },
      {
        q: "Choose the correct sentence.",
        options: [
          "If I had studied, I would pass the exam.",
          "If I studied, I would have passed the exam.",
          "If I had studied, I would have passed the exam.",
          "If I would have studied, I had passed the exam."
        ],
        answer: "If I had studied, I would have passed the exam."
      }
    ]
  }
];

/* ---------- COMPARISON TABLE DATA ---------- */
const COMPARISON = [
  {
    type: "Zero Conditional", color: "zero",
    use: "Facts and things that are always true",
    structure: "If + Present Simple, Present Simple",
    example: "If you mix blue and yellow, you get green."
  },
  {
    type: "First Conditional", color: "first",
    use: "Real or possible future situations",
    structure: "If + Present Simple, will + base verb",
    example: "If it rains, we will stay inside."
  },
  {
    type: "Second Conditional", color: "second",
    use: "Imaginary or unlikely situations",
    structure: "If + Past Simple, would + base verb",
    example: "If I were taller, I would play basketball."
  },
  {
    type: "Third Conditional", color: "third",
    use: "Imaginary past situations and regrets",
    structure: "If + Past Perfect, would have + past participle",
    example: "If I had woken up earlier, I would have caught the bus."
  }
];

/* ---------- QUIZ DATA (60 questions) ----------
   type: "mc"   -> multiple choice (options + answer text)
          "fill" -> type the answer (accept = array of correct strings)
   Every item has: question, type, options?/accept, answer/answers,
   explanation, structure, ctype (conditional label)               */

const QUIZZES = {
  zero: [
    {
      question: "If plants do not get enough sunlight, they ______.",
      type: "mc",
      options: ["died", "die", "will die", "would die"],
      answer: "die",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "This is a general truth, so both clauses use the Present Simple.",
      wrongNote: "\"will die\" and \"would die\" are not used for facts that are always true."
    },
    {
      question: "Ice ______ if you leave it in the sun.",
      type: "mc",
      options: ["melts", "will melt", "melted", "would melt"],
      answer: "melts",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "A scientific fact that always happens uses the Present Simple in both parts."
    },
    {
      question: "Which conditional is this? \"If you mix red and white, you get pink.\"",
      type: "mc",
      options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
      answer: "Zero Conditional",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "It states a fact that is always true, so it is the Zero Conditional."
    },
    {
      question: "Type the correct verb: When water ______ (reach) 100°C, it boils.",
      type: "fill",
      accept: ["reaches"],
      answer: "reaches",
      ctype: "Zero Conditional",
      structure: "If/When + Present Simple, Present Simple",
      explanation: "With \"when\" for an always-true result, use the Present Simple: \"reaches\".",
      wrongNote: "Do not use \"will reach\" or \"reached\" for a general truth."
    },
    {
      question: "Choose the correct verb: If you ______ this switch, the light turns on.",
      type: "mc",
      options: ["press", "will press", "pressed", "would press"],
      answer: "press",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "The result always happens, so use the Present Simple \"press\"."
    },
    {
      question: "Which sentence is correct?",
      type: "mc",
      options: [
        "If you heat ice, it will melt.",
        "If you heat ice, it melts.",
        "If you will heat ice, it melts.",
        "If you heated ice, it melts."
      ],
      answer: "If you heat ice, it melts.",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "For a fact that is always true, both clauses stay in the Present Simple.",
      wrongNote: "\"will melt\" is wrong here because melting ice is always true, not just a future possibility."
    },
    {
      question: "School rule: If students ______ late, they sign the register.",
      type: "mc",
      options: ["arrive", "will arrive", "arrived", "would arrive"],
      answer: "arrive",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "Rules that are always the same use the Zero Conditional with the Present Simple."
    },
    {
      question: "Daily routine: If my alarm rings at six, I ______ up straight away.",
      type: "mc",
      options: ["get", "will get", "got", "would get"],
      answer: "get",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "A regular habit uses the Present Simple in both parts: \"I get up\"."
    },
    {
      question: "Type the correct verb: If you do not eat, you ______ (feel) hungry.",
      type: "fill",
      accept: ["feel"],
      answer: "feel",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "Cause and effect that is always true uses the Present Simple: \"feel\"."
    },
    {
      question: "Which sentence has the same meaning as \"When it gets dark, the street lights turn on.\"?",
      type: "mc",
      options: [
        "If it gets dark, the street lights turn on.",
        "If it gets dark, the street lights will turn on.",
        "If it got dark, the street lights would turn on.",
        "If it had got dark, the street lights would have turned on."
      ],
      answer: "If it gets dark, the street lights turn on.",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "\"When\" and \"if\" can both be used for an always-true result, keeping the Present Simple."
    }
  ],

  first: [
    {
      question: "If Mia finishes her project tonight, she ______ it tomorrow.",
      type: "mc",
      options: ["submits", "submitted", "will submit", "would submit"],
      answer: "will submit",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "A real future result uses \"will + base verb\": \"will submit\".",
      wrongNote: "Use the Present Simple after \"if\" and \"will\" only in the result part."
    },
    {
      question: "If it ______ tomorrow, we will stay at home.",
      type: "mc",
      options: ["rains", "will rain", "rained", "would rain"],
      answer: "rains",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "After \"if\" we use the Present Simple, even about the future: \"rains\".",
      wrongNote: "\"will rain\" is wrong because we do not put \"will\" straight after \"if\"."
    },
    {
      question: "Which sentence is correct?",
      type: "mc",
      options: [
        "If it will rain, we will cancel the picnic.",
        "If it rains, we will cancel the picnic.",
        "If it rains, we cancel the picnic.",
        "If it rained, we will cancel the picnic."
      ],
      answer: "If it rains, we will cancel the picnic.",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "Present Simple after \"if\", and \"will\" in the result about a possible future."
    },
    {
      question: "Type the correct answer: If you study hard, you ______ (pass) the exam.",
      type: "fill",
      accept: ["will pass", "'ll pass"],
      answer: "will pass",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "A likely future result uses \"will + base verb\": \"will pass\"."
    },
    {
      question: "Warning: If you touch that hot pan, you ______ your hand.",
      type: "mc",
      options: ["burn", "will burn", "burned", "would burn"],
      answer: "will burn",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "A warning about a real future result uses \"will + base verb\"."
    },
    {
      question: "If you finish your homework, you ______ play outside.",
      type: "mc",
      options: ["can", "will can", "could have", "would"],
      answer: "can",
      ctype: "First Conditional",
      structure: "If + Present Simple, can + base verb",
      explanation: "The First Conditional can use \"can\" in the result to show permission or ability.",
      wrongNote: "\"will can\" is never correct; \"can\" already shows the future here."
    },
    {
      question: "If you see Anna, ______ her to call me.",
      type: "mc",
      options: ["tell", "will tell", "told", "would tell"],
      answer: "tell",
      ctype: "First Conditional",
      structure: "If + Present Simple, imperative",
      explanation: "The First Conditional can use an imperative (a command) in the result: \"tell\"."
    },
    {
      question: "She will call you if she ______ early.",
      type: "mc",
      options: ["arrives", "will arrive", "arrived", "would arrive"],
      answer: "arrives",
      ctype: "First Conditional",
      structure: "will + base verb ... if + Present Simple",
      explanation: "The if-clause uses the Present Simple even when it comes second: \"arrives\"."
    },
    {
      question: "If we leave now, we ______ catch the early train (it is possible but not certain).",
      type: "mc",
      options: ["might", "will might", "would", "had"],
      answer: "might",
      ctype: "First Conditional",
      structure: "If + Present Simple, might + base verb",
      explanation: "\"might\" shows a possible future result that is not certain."
    },
    {
      question: "It is cloudy and you think it may rain later. Which sentence fits best?",
      type: "mc",
      options: [
        "If it rains, I will take an umbrella.",
        "If it rained, I would take an umbrella.",
        "If it had rained, I would have taken an umbrella.",
        "If it rains, I took an umbrella."
      ],
      answer: "If it rains, I will take an umbrella.",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "Rain is a real future possibility, so the First Conditional is the best choice."
    }
  ],

  second: [
    {
      question: "If I ______ invisible, I would explore the museum at night.",
      type: "mc",
      options: ["am", "was", "were", "had been"],
      answer: "were",
      ctype: "Second Conditional",
      structure: "If + Past Simple (were), would + base verb",
      explanation: "In conditionals we use \"were\" for all subjects in imaginary situations.",
      wrongNote: "\"am\" is present real; \"had been\" belongs to the Third Conditional (past)."
    },
    {
      question: "If I had a million baht, I ______ around the world.",
      type: "mc",
      options: ["travel", "will travel", "would travel", "would have travelled"],
      answer: "would travel",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "An imaginary present situation uses \"would + base verb\": \"would travel\"."
    },
    {
      question: "Advice: If I ______ you, I would talk to the teacher.",
      type: "mc",
      options: ["am", "was", "were", "had been"],
      answer: "were",
      ctype: "Second Conditional",
      structure: "If I were you, would + base verb",
      explanation: "\"If I were you\" is a fixed phrase for giving advice."
    },
    {
      question: "Type the correct answer: If she lived closer, we ______ (visit) her more often.",
      type: "fill",
      accept: ["would visit", "'d visit"],
      answer: "would visit",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "The imaginary result uses \"would + base verb\": \"would visit\"."
    },
    {
      question: "If he ______ here, he would help us.",
      type: "mc",
      options: ["is", "was", "were", "had been"],
      answer: "were",
      ctype: "Second Conditional",
      structure: "If + were, would + base verb",
      explanation: "\"were\" is the usual choice for imaginary present situations with all subjects."
    },
    {
      question: "Which sentence describes an imaginary, unlikely situation?",
      type: "mc",
      options: [
        "If I have money, I will buy the shoes.",
        "If I had money, I would buy the shoes.",
        "If I have money, I buy the shoes.",
        "When I have money, I buy shoes."
      ],
      answer: "If I had money, I would buy the shoes.",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "The Past Simple + \"would\" shows the situation is imaginary, not a real plan."
    },
    {
      question: "Correct the mistake: \"If I would win the lottery, I would buy a house.\"",
      type: "mc",
      options: [
        "If I win the lottery, I would buy a house.",
        "If I won the lottery, I would buy a house.",
        "If I had won the lottery, I would buy a house.",
        "If I would win the lottery, I will buy a house."
      ],
      answer: "If I won the lottery, I would buy a house.",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "Never use \"would\" after \"if\". Use the Past Simple: \"If I won...\".",
      wrongNote: "\"If I would win\" is a common mistake; the if-clause needs the Past Simple."
    },
    {
      question: "If we ______ a bigger house, we would get a dog.",
      type: "mc",
      options: ["had", "have", "would have", "will have"],
      answer: "had",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "The imaginary condition uses the Past Simple: \"had\"."
    },
    {
      question: "If I could speak five languages, I ______ work as a translator.",
      type: "mc",
      options: ["will", "would", "would have", "had"],
      answer: "would",
      ctype: "Second Conditional",
      structure: "If + could/Past Simple, would + base verb",
      explanation: "The imaginary result uses \"would + base verb\"."
    },
    {
      question: "You are not tall, but you imagine being a basketball player. Which sentence fits best?",
      type: "mc",
      options: [
        "If I am taller, I will play basketball.",
        "If I were taller, I would play basketball.",
        "If I had been taller, I would have played basketball.",
        "If I were taller, I will play basketball."
      ],
      answer: "If I were taller, I would play basketball.",
      ctype: "Second Conditional",
      structure: "If + were, would + base verb",
      explanation: "Being taller is imaginary now, so the Second Conditional fits best."
    }
  ],

  third: [
    {
      question: "If Leo had set an alarm, he ______ late.",
      type: "mc",
      options: ["would not be", "will not be", "would not have been", "was not"],
      answer: "would not have been",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "An imaginary past result uses \"would have + past participle\".",
      wrongNote: "\"would not be\" is Second Conditional (present); this situation is in the past."
    },
    {
      question: "If I had studied harder, I ______ the exam.",
      type: "mc",
      options: ["would pass", "would have passed", "will pass", "passed"],
      answer: "would have passed",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The past cannot be changed, so we use \"would have passed\".",
      wrongNote: "You chose a present form, but the situation already happened in the past."
    },
    {
      question: "Type the answer: If they had left earlier, they ______ (not miss) the bus.",
      type: "fill",
      accept: ["would not have missed", "wouldn't have missed"],
      answer: "would not have missed",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The negative past result is \"would not have missed\"."
    },
    {
      question: "If she had ______ about the trip, she would have joined us.",
      type: "mc",
      options: ["know", "knew", "known", "knowing"],
      answer: "known",
      ctype: "Third Conditional",
      structure: "If + had + past participle, would have + past participle",
      explanation: "The Past Perfect needs the past participle: \"had known\"."
    },
    {
      question: "You forgot your umbrella and got wet. Complete: If I ______ my umbrella, I would not have got wet.",
      type: "mc",
      options: ["brought", "had brought", "would bring", "bring"],
      answer: "had brought",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The if-clause of a past regret uses the Past Perfect: \"had brought\"."
    },
    {
      question: "Correct the mistake: \"If I would have known, I would have helped.\"",
      type: "mc",
      options: [
        "If I knew, I would have helped.",
        "If I had known, I would have helped.",
        "If I have known, I would help.",
        "If I would know, I would have helped."
      ],
      answer: "If I had known, I would have helped.",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "Use the Past Perfect after \"if\", never \"would have\".",
      wrongNote: "\"If I would have known\" is a very common error; the if-clause needs \"had known\"."
    },
    {
      question: "If we had booked earlier, the tickets ______ cheaper.",
      type: "mc",
      options: ["would be", "would have been", "will be", "were"],
      answer: "would have been",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The imaginary past result uses \"would have been\"."
    },
    {
      question: "The sentence \"If I had known the answer, I would have told you\" refers to ______.",
      type: "mc",
      options: ["the present", "the future", "the past", "a fact that is always true"],
      answer: "the past",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The Third Conditional talks about the past, which cannot be changed."
    },
    {
      question: "They would have won the match if they ______ harder.",
      type: "mc",
      options: ["trained", "had trained", "would train", "train"],
      answer: "had trained",
      ctype: "Third Conditional",
      structure: "would have + past participle ... if + Past Perfect",
      explanation: "The if-clause uses the Past Perfect even when it comes second: \"had trained\"."
    },
    {
      question: "You did not revise and failed the test. Which sentence best shows your regret?",
      type: "mc",
      options: [
        "If I revise, I will pass.",
        "If I revised, I would pass.",
        "If I had revised, I would have passed.",
        "If I had revised, I would pass."
      ],
      answer: "If I had revised, I would have passed.",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The test is finished and cannot change, so a past regret uses the Third Conditional."
    }
  ],

  mixed: [
    {
      question: "Which conditional is this? \"If you heat water, it boils.\"",
      type: "mc",
      options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
      answer: "Zero Conditional",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "It is a scientific fact that is always true, so it is the Zero Conditional."
    },
    {
      question: "Type the answer: If it rains tomorrow, we ______ (stay) inside.",
      type: "fill",
      accept: ["will stay", "'ll stay"],
      answer: "will stay",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "A real future result uses \"will + base verb\": \"will stay\"."
    },
    {
      question: "If I ______ you, I would apologise.",
      type: "mc",
      options: ["was", "were", "am", "had been"],
      answer: "were",
      ctype: "Second Conditional",
      structure: "If I were you, would + base verb",
      explanation: "\"If I were you\" is the standard phrase for advice in the Second Conditional."
    },
    {
      question: "If he had trained harder, he ______ the race.",
      type: "mc",
      options: ["would win", "would have won", "wins", "won"],
      answer: "would have won",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The race is over, so the imaginary past result is \"would have won\"."
    },
    {
      question: "Which conditional is this? \"If I had money, I would buy a new bike.\"",
      type: "mc",
      options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
      answer: "Second Conditional",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "Past Simple + \"would\" shows an imaginary present situation: the Second Conditional."
    },
    {
      question: "If you do not sleep enough, you ______ tired the next day.",
      type: "mc",
      options: ["feel", "will feel", "felt", "would feel"],
      answer: "feel",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "This is a general truth that always happens, so use the Present Simple."
    },
    {
      question: "Correct the mistake: \"If she will come, we will start the game.\"",
      type: "mc",
      options: [
        "If she comes, we will start the game.",
        "If she come, we will start the game.",
        "If she came, we will start the game.",
        "If she will come, we start the game."
      ],
      answer: "If she comes, we will start the game.",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "Do not use \"will\" after \"if\". Use the Present Simple: \"If she comes\".",
      wrongNote: "\"If she will come\" is a common error in the First Conditional."
    },
    {
      question: "Which sentence is about an imaginary present situation?",
      type: "mc",
      options: [
        "If I have time, I will call you.",
        "If I had time, I would call you.",
        "If I have time, I call you.",
        "When I have time, I call you."
      ],
      answer: "If I had time, I would call you.",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "Past Simple + \"would\" makes it imaginary, not a real plan."
    },
    {
      question: "If they had known about the sale, they ______ more.",
      type: "mc",
      options: ["would buy", "would have bought", "will buy", "bought"],
      answer: "would have bought",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "The sale is in the past, so the imaginary result is \"would have bought\"."
    },
    {
      question: "Dialogue — A: I'm so thirsty. B: Well, if you ______ some water, you would feel better.",
      type: "mc",
      options: ["drink", "drank", "had drunk", "will drink"],
      answer: "drank",
      ctype: "Second Conditional",
      structure: "If + Past Simple, would + base verb",
      explanation: "The result uses \"would feel\", so the if-clause needs the Past Simple: \"drank\"."
    },
    {
      question: "Which conditional is this? \"If I had woken up earlier, I would have caught the bus.\"",
      type: "mc",
      options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
      answer: "Third Conditional",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "It imagines a different past result, so it is the Third Conditional."
    },
    {
      question: "When you mix blue and yellow paint, you ______ green.",
      type: "mc",
      options: ["get", "will get", "would get", "got"],
      answer: "get",
      ctype: "Zero Conditional",
      structure: "If/When + Present Simple, Present Simple",
      explanation: "An always-true result uses the Present Simple: \"get\"."
    },
    {
      question: "Tom studies every day and will probably pass. Which sentence fits best?",
      type: "mc",
      options: [
        "If Tom keeps studying, he will pass.",
        "If Tom kept studying, he would pass.",
        "If Tom had kept studying, he would have passed.",
        "If Tom keeps studying, he passed."
      ],
      answer: "If Tom keeps studying, he will pass.",
      ctype: "First Conditional",
      structure: "If + Present Simple, will + base verb",
      explanation: "Passing is a real, likely future result, so the First Conditional fits."
    },
    {
      question: "Lisa can't swim, but she imagines crossing the lake. Which sentence fits best?",
      type: "mc",
      options: [
        "If Lisa can swim, she will cross the lake.",
        "If Lisa could swim, she would cross the lake.",
        "If Lisa had swum, she would have crossed the lake.",
        "If Lisa swims, she crosses the lake."
      ],
      answer: "If Lisa could swim, she would cross the lake.",
      ctype: "Second Conditional",
      structure: "If + Past Simple/could, would + base verb",
      explanation: "It is imaginary now (she can't swim), so the Second Conditional fits best."
    },
    {
      question: "You didn't bring a map and got lost. Which sentence fits best?",
      type: "mc",
      options: [
        "If we bring a map, we will not get lost.",
        "If we brought a map, we would not get lost.",
        "If we had brought a map, we would not have got lost.",
        "If we had brought a map, we would not get lost."
      ],
      answer: "If we had brought a map, we would not have got lost.",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "Getting lost already happened, so a past regret uses the Third Conditional."
    },
    {
      question: "Correct the mistake: \"If I would be rich, I would help many people.\"",
      type: "mc",
      options: [
        "If I am rich, I would help many people.",
        "If I were rich, I would help many people.",
        "If I had been rich, I would help many people.",
        "If I would be rich, I will help many people."
      ],
      answer: "If I were rich, I would help many people.",
      ctype: "Second Conditional",
      structure: "If + were, would + base verb",
      explanation: "Never use \"would\" after \"if\". Use \"were\" for imaginary situations.",
      wrongNote: "\"If I would be\" is incorrect; the if-clause needs \"were\" here."
    },
    {
      question: "Choose the correct verb: If you ______ the vegetables, don't forget to wash them first.",
      type: "mc",
      options: ["cut", "will cut", "cutted", "would cut"],
      answer: "cut",
      ctype: "First Conditional",
      structure: "If + Present Simple, imperative",
      explanation: "The if-clause uses the Present Simple, and the result is an imperative (a command)."
    },
    {
      question: "Which sentence talks about something in the past that cannot be changed now?",
      type: "mc",
      options: [
        "If I study, I will pass.",
        "If I studied, I would pass.",
        "If I had studied, I would have passed.",
        "If I study, I pass."
      ],
      answer: "If I had studied, I would have passed.",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "Only the Third Conditional talks about an unchangeable past."
    },
    {
      question: "Dialogue — A: Did you finish the report? B: No. If I ______ more time yesterday, I would have finished it.",
      type: "mc",
      options: ["had had", "had", "have", "would have"],
      answer: "had had",
      ctype: "Third Conditional",
      structure: "If + Past Perfect, would have + past participle",
      explanation: "\"Yesterday\" and \"would have finished\" show the past, so use \"had had\".",
      wrongNote: "\"had\" alone is Past Simple; the Past Perfect of \"have\" is \"had had\"."
    },
    {
      question: "It is a scientific fact that metal expands when it is heated. Which sentence is correct?",
      type: "mc",
      options: [
        "If you heat metal, it will expand.",
        "If you heat metal, it expands.",
        "If you heated metal, it would expand.",
        "If you had heated metal, it would have expanded."
      ],
      answer: "If you heat metal, it expands.",
      ctype: "Zero Conditional",
      structure: "If + Present Simple, Present Simple",
      explanation: "A scientific fact that is always true uses the Zero Conditional."
    }
  ]
};

/* Quiz meta */
const QUIZ_META = {
  zero:   { title: "Zero Conditional Practice",  color: "zero",   emoji: "🌱" },
  first:  { title: "First Conditional Practice", color: "first",  emoji: "🌦️" },
  second: { title: "Second Conditional Practice",color: "second", emoji: "💭" },
  third:  { title: "Third Conditional Practice", color: "third",  emoji: "⏳" },
  mixed:  { title: "Mixed Conditional Challenge",color: "mixed",  emoji: "🏆" }
};

/* ============================================================
   APP STATE + PROGRESS (session only)
   ============================================================ */
const progress = loadProgress();

function loadProgress() {
  try {
    const raw = sessionStorage.getItem("ifclause_progress");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { lessons: {}, quizzes: {} }; // quizzes: {key:{best, correct, total}}
}
function saveProgress() {
  try { sessionStorage.setItem("ifclause_progress", JSON.stringify(progress)); } catch (e) {}
  renderHomeProgress();
}

/* Active quiz session */
let quiz = null; // {key, list, index, records:[{selected, correct, submitted}], score}

/* ============================================================
   NAVIGATION / VIEWS
   ============================================================ */
const views = ["home", "learn", "practice", "results"];

function show(view) {
  views.forEach(v => {
    const el = document.getElementById("view-" + v);
    if (el) el.classList.toggle("active", v === view);
  });
  document.querySelectorAll(".nav-link").forEach(l =>
    l.classList.toggle("active-link", l.dataset.view === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   HOME
   ============================================================ */
function renderHome() {
  const cards = LESSONS.map((l, i) => `
    <div class="cond-card ${l.color}" onclick="openLesson(${i})" tabindex="0"
         onkeypress="if(event.key==='Enter')openLesson(${i})">
      <div class="cond-emoji">${l.emoji}</div>
      <h3>${l.name}</h3>
      <p>${l.intro}</p>
      <span class="cond-tag">${l.structure}</span>
    </div>`).join("");
  document.getElementById("home-cards").innerHTML = cards;
  renderHomeProgress();
}

function renderHomeProgress() {
  const totalLessons = LESSONS.length;
  const lessonsDone = Object.keys(progress.lessons).length;
  const quizKeys = Object.keys(QUIZ_META);
  const quizzesDone = quizKeys.filter(k => progress.quizzes[k]).length;

  const lessonPct = Math.round((lessonsDone / totalLessons) * 100);
  const quizPct = Math.round((quizzesDone / quizKeys.length) * 100);

  let best = "—";
  const scores = Object.values(progress.quizzes).map(q => q.best);
  if (scores.length) best = Math.max(...scores) + "%";

  const el = document.getElementById("home-progress");
  if (!el) return;
  el.innerHTML = `
    <div class="progress-stat">
      <div class="ps-label">Lessons read</div>
      <div class="progress-track"><div class="progress-fill zero" style="width:${lessonPct}%"></div></div>
      <div class="ps-value">${lessonsDone} / ${totalLessons}</div>
    </div>
    <div class="progress-stat">
      <div class="ps-label">Quizzes completed</div>
      <div class="progress-track"><div class="progress-fill first" style="width:${quizPct}%"></div></div>
      <div class="ps-value">${quizzesDone} / ${quizKeys.length}</div>
    </div>
    <div class="progress-stat">
      <div class="ps-label">Best score</div>
      <div class="best-badge">${best}</div>
    </div>`;
}

/* ============================================================
   LESSONS
   ============================================================ */
let currentLesson = 0;

function openLesson(i) {
  currentLesson = i;
  progress.lessons[LESSONS[i].key] = true;
  saveProgress();
  renderLesson();
  show("learn");
}

function renderLesson() {
  const l = LESSONS[currentLesson];
  const uses = l.use.map(u => `<li>${u}</li>`).join("");
  const examples = l.examples.map(e => `<li>${e}</li>`).join("");
  const mistakes = l.mistakes.map(m => `
    <div class="mistake-row">
      <p class="wrong">❌ ${m.wrong}</p>
      <p class="right">✅ ${m.right}</p>
      <p class="why">${m.why}</p>
    </div>`).join("");

  const prevDisabled = currentLesson === 0 ? "disabled" : "";
  const nextDisabled = currentLesson === LESSONS.length - 1 ? "disabled" : "";

  document.getElementById("view-learn").innerHTML = `
    <div class="lesson ${l.color}">
      <div class="lesson-head">
        <span class="lesson-emoji">${l.emoji}</span>
        <div>
          <p class="lesson-step">Lesson ${currentLesson + 1} of ${LESSONS.length}</p>
          <h2>${l.name}</h2>
        </div>
      </div>

      <div class="lesson-body">
        <div class="box">
          <h3>📌 Meaning &amp; Use</h3>
          <p>We use the ${l.name} for:</p>
          <ul>${uses}</ul>
        </div>

        <div class="box structure-box">
          <h3>🧩 Sentence Structure</h3>
          <p class="structure-line">${l.structure}</p>
          <p class="note">${l.note}</p>
        </div>

        <div class="box">
          <h3>💡 Examples</h3>
          <ul class="examples">${examples}</ul>
        </div>

        <div class="box three-col">
          <div>
            <h4>➕ Positive</h4>
            <p>${l.positive}</p>
          </div>
          <div>
            <h4>➖ Negative</h4>
            <p>${l.negative}</p>
          </div>
          <div>
            <h4>❓ Question</h4>
            <p>${l.question}</p>
          </div>
        </div>

        <div class="box mistakes">
          <h3>⚠️ Common Mistakes</h3>
          ${mistakes}
        </div>

        <div class="box compare-box">
          <h3>🔍 Compare — ${l.compareTitle}</h3>
          <p>${l.compare}</p>
        </div>

        <div class="box check-box">
          <h3>✅ Check Your Understanding</h3>
          <p class="mini-hint">A quick 3-question check. This does not affect your quiz score.</p>
          <div id="mini-activity"></div>
        </div>
      </div>

      <div class="lesson-nav">
        <button class="btn ghost" ${prevDisabled} onclick="changeLesson(-1)">← Previous Lesson</button>
        <button class="btn ghost" onclick="show('home')">🏠 Back to Home</button>
        <button class="btn primary" onclick="startQuiz('${l.key}')">Start Practice →</button>
        <button class="btn ghost" ${nextDisabled} onclick="changeLesson(1)">Next Lesson →</button>
      </div>
    </div>`;

  renderMiniActivity(l);
}

function changeLesson(dir) {
  const next = currentLesson + dir;
  if (next < 0 || next >= LESSONS.length) return;
  openLesson(next);
}

function renderMiniActivity(l) {
  const wrap = document.getElementById("mini-activity");
  wrap.innerHTML = l.mini.map((m, qi) => `
    <div class="mini-q" data-qi="${qi}">
      <p class="mini-question">${qi + 1}. ${m.q}</p>
      <div class="mini-options">
        ${m.options.map(o => `
          <button class="mini-opt" onclick="answerMini(this, ${qi})" data-val="${escapeAttr(o)}">${o}</button>
        `).join("")}
      </div>
    </div>`).join("");
}

function answerMini(btn, qi) {
  const l = LESSONS[currentLesson];
  const correct = l.mini[qi].answer;
  const group = btn.closest(".mini-q");
  if (group.classList.contains("done")) return;
  group.classList.add("done");
  group.querySelectorAll(".mini-opt").forEach(b => {
    b.disabled = true;
    if (b.dataset.val === correct) b.classList.add("correct");
    else if (b === btn) b.classList.add("incorrect");
  });
}

/* ============================================================
   PRACTICE MENU
   ============================================================ */
function renderPracticeMenu() {
  const cards = Object.keys(QUIZ_META).map(k => {
    const m = QUIZ_META[k];
    const p = progress.quizzes[k];
    const badge = p ? `<span class="menu-best">Best: ${p.best}%</span>` : `<span class="menu-best todo">Not tried</span>`;
    const count = QUIZZES[k].length;
    return `
      <div class="menu-card ${m.color}" onclick="startQuiz('${k}')" tabindex="0"
           onkeypress="if(event.key==='Enter')startQuiz('${k}')">
        <div class="menu-emoji">${m.emoji}</div>
        <h3>${m.title}</h3>
        <p>${count} questions</p>
        ${badge}
      </div>`;
  }).join("");
  document.getElementById("practice-menu-cards").innerHTML = cards;
}

/* ============================================================
   QUIZ ENGINE
   ============================================================ */
function startQuiz(key) {
  quiz = {
    key,
    list: QUIZZES[key],
    index: 0,
    records: QUIZZES[key].map(() => ({ selected: null, correct: null, submitted: false })),
    score: 0
  };
  renderQuiz();
  show("practice");
  document.getElementById("practice-menu").style.display = "none";
  document.getElementById("quiz-area").style.display = "block";
}

function exitToPracticeMenu() {
  quiz = null;
  document.getElementById("practice-menu").style.display = "block";
  document.getElementById("quiz-area").style.display = "none";
  renderPracticeMenu();
  show("practice");
}

function renderQuiz() {
  const meta = QUIZ_META[quiz.key];
  const q = quiz.list[quiz.index];
  const rec = quiz.records[quiz.index];
  const total = quiz.list.length;
  const answered = quiz.records.filter(r => r.submitted).length;
  const pct = Math.round((answered / total) * 100);

  // navigator
  const nav = quiz.records.map((r, i) => {
    let cls = "unanswered";
    if (r.submitted) cls = r.correct ? "correct" : "incorrect";
    if (i === quiz.index) cls += " current";
    return `<button class="nav-dot ${cls}" onclick="goToQuestion(${i})">${i + 1}</button>`;
  }).join("");

  // answer body
  let body = "";
  if (q.type === "mc") {
    body = `<div class="options">` + q.options.map(o => {
      let cls = "option";
      if (rec.submitted) {
        if (o === q.answer) cls += " reveal-correct";
        else if (o === rec.selected) cls += " reveal-wrong";
        else cls += " dim";
      } else if (o === rec.selected) {
        cls += " chosen";
      }
      const dis = rec.submitted ? "disabled" : "";
      return `<button class="${cls}" ${dis} onclick="selectOption('${escapeAttr(o)}')">${o}</button>`;
    }).join("") + `</div>`;
  } else { // fill
    const val = rec.submitted ? escapeAttr(rec.selected || "") : "";
    const dis = rec.submitted ? "disabled" : "";
    body = `
      <div class="fill-wrap">
        <input type="text" id="fill-input" class="fill-input ${rec.submitted ? (rec.correct ? 'ok' : 'bad') : ''}"
               placeholder="Type your answer here..." value="${val}" ${dis}
               onkeydown="if(event.key==='Enter')submitFill()">
      </div>`;
  }

  // feedback
  let feedback = "";
  if (rec.submitted) {
    feedback = buildFeedback(q, rec);
  }

  // submit / next controls
  let submitBtn = "";
  if (!rec.submitted) {
    if (q.type === "mc") {
      submitBtn = `<button class="btn primary" ${rec.selected ? "" : "disabled"} onclick="submitMC()">Submit Answer</button>`;
    } else {
      submitBtn = `<button class="btn primary" onclick="submitFill()">Submit Answer</button>`;
    }
  }

  document.getElementById("quiz-area").innerHTML = `
    <div class="quiz ${meta.color}">
      <div class="quiz-top">
        <div class="quiz-title">${meta.emoji} ${meta.title}</div>
        <div class="quiz-score">Score: <b>${quiz.score}</b> / ${total}</div>
      </div>

      <div class="quiz-progress">
        <div class="progress-track"><div class="progress-fill ${meta.color}" style="width:${pct}%"></div></div>
        <span class="qcount">Question ${quiz.index + 1} of ${total}</span>
      </div>

      <div class="question-card">
        <p class="ctype-tag ${meta.color}">${q.type === 'mc' ? 'Multiple choice' : 'Fill in the blank'}</p>
        <p class="question-text">${q.question}</p>
        ${body}
        ${feedback}
      </div>

      <div class="quiz-controls">
        <button class="btn ghost" ${quiz.index === 0 ? "disabled" : ""} onclick="goToQuestion(${quiz.index - 1})">← Previous</button>
        ${submitBtn}
        <button class="btn ghost" ${quiz.index === total - 1 ? "disabled" : ""} onclick="goToQuestion(${quiz.index + 1})">Next →</button>
      </div>

      <div class="navigator">
        <p class="nav-label">Question Navigator</p>
        <div class="nav-dots">${nav}</div>
        <div class="nav-legend">
          <span><i class="dot correct"></i> Correct</span>
          <span><i class="dot incorrect"></i> Incorrect</span>
          <span><i class="dot unanswered"></i> Unanswered</span>
          <span><i class="dot current"></i> Current</span>
        </div>
      </div>

      <div class="quiz-footer">
        <button class="btn ghost" onclick="exitToPracticeMenu()">Choose Another Practice</button>
        <button class="btn accent" ${allAnswered() ? "" : "disabled"} onclick="finishQuiz()">
          ${allAnswered() ? "See My Results 🎉" : "Answer all to finish"}
        </button>
      </div>
    </div>`;
}

function buildFeedback(q, rec) {
  const good = rec.correct;
  const cls = good ? "fb-correct" : "fb-wrong";
  const head = good ? "✅ Correct!" : "❌ Not quite.";
  let yourLine = "";
  if (!good) {
    yourLine = `<p class="fb-your">You chose: <b>${rec.selected || "(blank)"}</b></p>`;
  }
  const wrongNote = (!good && q.wrongNote) ? `<p class="fb-note">${q.wrongNote}</p>` : "";
  return `
    <div class="feedback ${cls}">
      <p class="fb-head">${head}</p>
      ${yourLine}
      <p class="fb-answer">Correct answer: <b>${q.answer}</b></p>
      <p class="fb-type"><span class="chip">${q.ctype}</span></p>
      <p class="fb-struct"><b>Structure:</b> ${q.structure}</p>
      <p class="fb-exp">${q.explanation}</p>
      ${wrongNote}
    </div>`;
}

function selectOption(val) {
  const rec = quiz.records[quiz.index];
  if (rec.submitted) return;
  rec.selected = val;
  renderQuiz();
}

function submitMC() {
  const rec = quiz.records[quiz.index];
  if (rec.submitted || !rec.selected) return;
  const q = quiz.list[quiz.index];
  rec.correct = rec.selected === q.answer;
  rec.submitted = true;
  if (rec.correct) { quiz.score++; celebrate(); }
  renderQuiz();
}

function submitFill() {
  const rec = quiz.records[quiz.index];
  if (rec.submitted) return;
  const input = document.getElementById("fill-input");
  const val = (input.value || "").trim();
  if (!val) return;
  rec.selected = val;
  const q = quiz.list[quiz.index];
  const norm = val.toLowerCase().replace(/\s+/g, " ");
  rec.correct = q.accept.some(a => a.toLowerCase() === norm);
  rec.submitted = true;
  if (rec.correct) { quiz.score++; celebrate(); }
  renderQuiz();
}

function goToQuestion(i) {
  if (i < 0 || i >= quiz.list.length) return;
  quiz.index = i;
  renderQuiz();
}

function allAnswered() {
  return quiz && quiz.records.every(r => r.submitted);
}

/* small celebration */
function celebrate() {
  const c = document.createElement("div");
  c.className = "celebrate";
  c.textContent = ["🎉", "⭐", "👍", "✨", "🌟"][Math.floor(Math.random() * 5)];
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 900);
}

/* ============================================================
   RESULTS
   ============================================================ */
function finishQuiz() {
  if (!allAnswered()) return;
  const total = quiz.list.length;
  const correct = quiz.score;
  const pct = Math.round((correct / total) * 100);

  // save best
  const prev = progress.quizzes[quiz.key];
  const best = prev ? Math.max(prev.best, pct) : pct;
  progress.quizzes[quiz.key] = { best, correct, total };
  saveProgress();

  renderResults(pct, correct, total);
  show("results");
}

function performanceMessage(pct) {
  if (pct >= 90) return "Excellent! You understand conditionals very well.";
  if (pct >= 70) return "Great job! Review a few rules and try the challenge.";
  if (pct >= 50) return "Good effort! Review the lessons before trying again.";
  return "Keep practising. Focus on the sentence structures and try again.";
}

function renderResults(pct, correct, total) {
  const meta = QUIZ_META[quiz.key];
  const incorrect = total - correct;
  let emoji = "💪";
  if (pct >= 90) emoji = "🏆";
  else if (pct >= 70) emoji = "🎉";
  else if (pct >= 50) emoji = "🙂";

  document.getElementById("view-results").innerHTML = `
    <div class="results ${meta.color}">
      <div class="result-emoji">${emoji}</div>
      <h2>${meta.title} — Results</h2>
      <div class="score-ring">
        <div class="ring-pct">${pct}%</div>
        <div class="ring-sub">${correct} / ${total} correct</div>
      </div>
      <div class="result-stats">
        <div class="rstat ok"><span>${correct}</span>Correct</div>
        <div class="rstat bad"><span>${incorrect}</span>Incorrect</div>
        <div class="rstat"><span>${pct}%</span>Score</div>
      </div>
      <p class="result-msg">${performanceMessage(pct)}</p>

      <div class="result-actions">
        <button class="btn primary" onclick="openReview()">🔍 Review Answers</button>
        <button class="btn accent" onclick="startQuiz('${quiz.key}')">🔁 Retry Quiz</button>
        <button class="btn ghost" onclick="exitToPracticeMenu()">📚 Choose Another Practice</button>
        <button class="btn ghost" onclick="goToLessons()">📖 Return to Lessons</button>
        <button class="btn ghost" onclick="show('home')">🏠 Home</button>
      </div>

      <div id="review-area"></div>
    </div>`;
}

function goToLessons() {
  renderLesson();
  show("learn");
}

/* ============================================================
   REVIEW MODE
   ============================================================ */
function openReview() {
  const area = document.getElementById("review-area");
  if (area.dataset.open === "1") { area.innerHTML = ""; area.dataset.open = "0"; return; }
  area.dataset.open = "1";
  const rows = quiz.list.map((q, i) => {
    const rec = quiz.records[i];
    const good = rec.correct;
    return `
      <div class="review-row ${good ? 'ok' : 'bad'}">
        <p class="rv-q"><b>Q${i + 1}.</b> ${q.question}</p>
        <p class="rv-line">Your answer: <b class="${good ? 'g' : 'r'}">${rec.selected || "(blank)"}</b> ${good ? "✅" : "❌"}</p>
        ${good ? "" : `<p class="rv-line">Correct answer: <b class="g">${q.answer}</b></p>`}
        <p class="rv-line"><span class="chip">${q.ctype}</span></p>
        <p class="rv-line rv-struct"><b>Structure:</b> ${q.structure}</p>
        <p class="rv-line rv-exp">${q.explanation}</p>
      </div>`;
  }).join("");
  area.innerHTML = `<div class="review"><h3>Review — every question</h3>${rows}</div>`;
  area.scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   COMPARISON TABLE + GRAMMAR NOTE (Home extras)
   ============================================================ */
function renderComparison() {
  const rows = COMPARISON.map(c => `
    <tr class="${c.color}">
      <td class="ct-type">${c.type}</td>
      <td>${c.use}</td>
      <td class="ct-struct">${c.structure}</td>
      <td class="ct-ex">${c.example}</td>
    </tr>`).join("");
  const el = document.getElementById("comparison-table");
  if (el) el.innerHTML = `
    <table class="cmp">
      <thead>
        <tr><th>Type</th><th>Use</th><th>Structure</th><th>Example</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ============================================================
   HELPERS
   ============================================================ */
function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderPracticeMenu();
  renderComparison();

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const v = link.dataset.view;
      if (v === "learn") { renderLesson(); show("learn"); }
      else if (v === "practice") { exitToPracticeMenu(); }
      else show(v);
    });
  });

  document.getElementById("btn-start-learning").addEventListener("click", () => openLesson(0));
  document.getElementById("btn-practice-now").addEventListener("click", () => exitToPracticeMenu());

  show("home");
});
