/* ============================================================
   data.js — Lessons, key words, lab, practice & reading content
   Maths 7 · Unit 2: Expressions, Formulae & Equations
   Bright EngMath © 2026 — All content is original.
   ------------------------------------------------------------
   HOW TO EDIT:
   • Each lesson lives in the LESSONS array below.
   • Key words live in VOCAB. Categories in VOCAB_CATS.
   • Algebra Lab stations live in LAB_SETS.
   • Quick Practice Zone groups live in PRACTICE_SETS.
   • Reading passages live in READINGS.
   • Question types the engine understands:
       mcq   → { type:"mcq", q, options:[...], answer:indexOfCorrect }
       multi → { type:"multi", q, options:[...], answers:[indexes] }
       tf    → { type:"tf", q, answer:true|false }
       fill  → { type:"fill", q, answer:"text", accept:["alt spellings"] }
       build → { type:"build", q, chunks:["tap","chips"], answer:"joined string" }
       sort  → { type:"sort", q, buckets:["A","B"], items:[{t:"item", b:bucketIndex}] }
       match → { type:"match", q, left:[...], right:[...] }  (right[i] matches left[i])
       order → { type:"order", q, items:["first","second",...] }  (given in correct order)
     Every question should have: explain (why the answer is right)
     and rule (the maths rule it uses).
   ============================================================ */

/* ------------------------------------------------------------
   LESSONS — six lesson cards matching Unit 2, sections 2.1–2.6
   ------------------------------------------------------------ */
const LESSONS = [
  {
    id: "L1",
    code: "2.1",
    title: "Building Expressions",
    color: "sky",
    objective: "Use a letter to stand for an unknown number and write your own expressions.",
    intro: "In algebra, a letter stands for a number we do not know yet. An EXPRESSION is made of numbers and letters — but it has NO equals sign. An EQUATION does have an equals sign.",
    keyPoints: [
      "A letter (like n or x) stands for an unknown number. It is called a variable.",
      "An expression has numbers and letters but NO equals sign, e.g. n + 4.",
      "An equation HAS an equals sign, e.g. n + 4 = 10.",
      "Write 3 × n as 3n — always put the number BEFORE the letter.",
      "Write n ÷ 2 as n/2 — a fraction bar means divide."
    ],
    patternBox: { label: "The Expression Machine", boxes: ["words", "→", "letters"], style: "sky",
      demo: [["“6 more than k”", "k + 6"], ["“4 times m”", "4m"], ["“half of w”", "w/2"], ["“5 less than y”", "y − 5"]] },
    examples: [
      { line: "Maya has p pencils. She buys 3 more → p + 3", why: "“More” tells you to add 3 to the unknown number p." },
      { line: "A jar holds s sweets. 6 are eaten → s − 6", why: "“Eaten” means taken away, so subtract 6 from s." },
      { line: "One pack holds c cards. 5 packs → 5c", why: "5 equal packs means 5 × c, which we write as 5c." },
      { line: "A rope of length r is cut in half → r/2", why: "Half means divide by 2. Write r ÷ 2 as the fraction r/2." },
      { line: "Dan is d years old. His aunt is twice his age plus 1 → 2d + 1", why: "Twice means × 2, then “plus 1” adds a constant." }
    ],
    tip: "Read word problems slowly and hunt for the operation words: “more”, “total” → +, “less”, “fewer” → −, “times”, “twice” → ×, “half”, “shared” → ÷.",
    confusable: {
      title: "⚠️ Watch out — order matters with subtraction!",
      pairs: [
        { a: "“5 less than k”", aAns: "k − 5", b: "“k less than 5”", bAns: "5 − k",
          note: "“5 less than k” starts from k and takes 5 away. Swapping the order gives a different expression!" }
      ]
    },
    mistakes: [
      { wrong: "Writing 3 × n as n3", right: "Write it as 3n", note: "The number always goes before the letter." },
      { wrong: "t + t + t = t³", right: "t + t + t = 3t", note: "Repeated ADDING gives 3t. Repeated MULTIPLYING gives t³." },
      { wrong: "Total cost of a $t T-shirt and $s shirt: t × s", right: "t + s", note: "A total is found by ADDING, not multiplying." }
    ],
    table: {
      caption: "Words → Expression",
      head: ["Words", "Expression"],
      rows: [
        ["7 more than x", "x + 7"],
        ["4 less than x", "x − 4"],
        ["three times x", "3x"],
        ["half of x", "x/2"],
        ["twice x, then add 5", "2x + 5"],
        ["x shared between 4", "x/4"]
      ]
    },
    discussion: [
      "Ask the class: Why is n + 2 an expression but n + 2 = 9 an equation?",
      "Ask the class: A bag has b buttons. What could 3b + 2 describe in real life?"
    ],
    sayTogether: "Say it together: “Number BEFORE the letter — three n is 3n!”",
    yourTurn: "Your turn: You have m marbles. Write an expression for (1) two more marbles, (2) three bags of m marbles, (3) your marbles shared with a friend.",
    quickCheck: {
      type: "mcq",
      q: "Leo has b books. He gives away 4. Which expression shows how many books Leo has now?",
      options: ["b + 4", "4 − b", "b − 4", "4b"],
      answer: 2,
      explain: "Leo starts with b books and gives 4 away, so we subtract 4 from b: b − 4. Careful — 4 − b is the wrong way round!",
      rule: "“Gives away” means subtract from the starting amount."
    }
  },

  {
    id: "L2",
    code: "2.2",
    title: "Formulae & Substitution",
    color: "lav",
    objective: "Substitute numbers into expressions and write simple formulae.",
    intro: "SUBSTITUTE means swap a letter for a number. A FORMULA is a maths rule that connects two or more quantities — like d = 7w, which connects days and weeks.",
    keyPoints: [
      "To substitute, replace the letter with its number, then calculate.",
      "Always follow the order of operations: × and ÷ before + and −.",
      "A formula is a rule written with letters, e.g. m = 60h (minutes in h hours).",
      "You can write a formula in words first, then in letters.",
      "One letter = one quantity. Choose letters that remind you of the words: h for hours, c for cost."
    ],
    patternBox: { label: "Substitution Station", boxes: ["2k + 3", "k = 5", "2×5 + 3 = 13"], style: "lav",
      demo: [["x + 9 when x = 4", "13"], ["3m when m = 6", "18"], ["2a + b when a = 5, b = 3", "13"], ["w/4 when w = 20", "5"]] },
    examples: [
      { line: "Find x + 8 when x = 7 → 7 + 8 = 15", why: "Swap x for 7, then add." },
      { line: "Find 5k when k = 6 → 5 × 6 = 30", why: "5k means 5 × k, so multiply." },
      { line: "Find 2p + 3q when p = 4, q = 5 → 8 + 15 = 23", why: "Multiply first (2×4 = 8 and 3×5 = 15), then add." },
      { line: "Squares have 4 sides: a formula for the perimeter is P = 4s", why: "In words: perimeter = 4 × side length. In letters: P = 4s." },
      { line: "Use P = 4s when s = 9 → P = 36", why: "Substitute s = 9 into the formula: 4 × 9 = 36." }
    ],
    tip: "When you substitute, write the × sign back in first: 3k with k = 7 becomes 3 × 7. This stops you writing 37 by mistake!",
    confusable: {
      title: "⚠️ Multiply BEFORE you add",
      pairs: [
        { a: "2m + n when m = 7, n = 6", aAns: "2×7 + 6 = 20", b: "The trap", bAns: "2 × (7+6) = 26 ✗",
          note: "Only m is doubled — the n is added afterwards. Multiplication comes before addition." }
      ]
    },
    mistakes: [
      { wrong: "3k with k = 7 → 37", right: "3k = 3 × 7 = 21", note: "3k means 3 × k, never “write the digits together”." },
      { wrong: "2h + 3t with h = 8, t = 5 → 2 × 13 = 26… then ×3?", right: "16 + 15 = 31", note: "Substitute each letter separately: 2×8 = 16 and 3×5 = 15." },
      { wrong: "10 − x with x = 3 → x = 7", right: "10 − 3 = 7 (the VALUE is 7)", note: "You found the value of the expression — x is still 3." }
    ],
    table: {
      caption: "Formula bank (all original)",
      head: ["Rule in words", "Formula"],
      rows: [
        ["days = 7 × weeks", "d = 7w"],
        ["minutes = 60 × hours", "m = 60h"],
        ["perimeter of a square = 4 × side", "P = 4s"],
        ["total cost = price × number of items", "C = pn"],
        ["money left = money paid − expenses", "L = p − e"]
      ]
    },
    discussion: [
      "Ask the class: T = 8h shows a worker's pay. What could T, 8 and h stand for?",
      "Ask the class: Why is C = a + c easier to use if we know what a and c mean?"
    ],
    sayTogether: "Say it together: “Substitute — swap the letter, times and divide come first!”",
    yourTurn: "Your turn: Write a formula for the number of fingers on h hands. Then use it to find the fingers on 6 hands.",
    quickCheck: {
      type: "mcq",
      q: "Work out the value of 4a − b when a = 5 and b = 3.",
      options: ["17", "12", "23", "8"],
      answer: 0,
      explain: "Substitute: 4 × 5 = 20 first, then 20 − 3 = 17. Multiplication comes before subtraction.",
      rule: "Substitute each letter, then follow the order of operations."
    }
  },

  {
    id: "L3",
    code: "2.3",
    title: "Collecting Like Terms",
    color: "mint",
    objective: "Simplify expressions by collecting like terms.",
    intro: "LIKE TERMS contain exactly the same letter (or letters). You can add or subtract like terms to SIMPLIFY an expression — writing it in the shortest possible way.",
    keyPoints: [
      "Like terms have the same letter: 2x and 5x are like terms.",
      "Unlike terms have different letters: 3a and 4b can NOT be combined.",
      "x means 1x, so x + 6x = 7x.",
      "Number-only terms (constants) collect with other constants: 7 + 3 = 10.",
      "ab and ba are the SAME term — the letter order does not matter."
    ],
    patternBox: { label: "Like-Terms Sorter", boxes: ["5x + 3y + 2x", "→", "7x + 3y"], style: "mint",
      demo: [["2x + 3x", "5x"], ["7y − 2y", "5y"], ["4p + 3q + 2p − q", "6p + 2q"], ["5t + 7 − 3t + 3", "2t + 10"]] },
    examples: [
      { line: "3a + 4a = 7a", why: "Both terms are “a terms” — add the coefficients: 3 + 4 = 7." },
      { line: "9m − m = 8m", why: "m means 1m, so 9m − 1m = 8m." },
      { line: "6x + 2y − 4x = 2x + 2y", why: "Only the x terms combine: 6x − 4x = 2x. The 2y stays as it is." },
      { line: "8k + 5 − 3k + 2 = 5k + 7", why: "k terms: 8k − 3k = 5k. Constants: 5 + 2 = 7." },
      { line: "4cd + 3dc = 7cd", why: "cd and dc are the same term, so they add to 7cd." }
    ],
    tip: "Underline like terms in matching colours before you collect them — one colour per letter. Keep each term's sign glued to its front!",
    confusable: {
      title: "⚠️ Best-practice writing",
      pairs: [
        { a: "1a, a×b, a÷b, a×a", aAns: "✗ not simplest", b: "a, ab, a/b, a²", bAns: "✓ simplest form",
          note: "Never write the 1 in 1a, drop × signs between letters, use a fraction bar for divide, use powers for repeated multiplying." }
      ]
    },
    mistakes: [
      { wrong: "8x + 4 = 12x", right: "8x + 4 stays as 8x + 4", note: "8x and 4 are NOT like terms — one has a letter, one doesn't." },
      { wrong: "5a + 2b = 7ab", right: "5a + 2b cannot be simplified", note: "Different letters never merge into one term." },
      { wrong: "9d − 7d + 3h − h = 2d + 3h", right: "= 2d + 2h", note: "Don't forget h means 1h: 3h − 1h = 2h." }
    ],
    table: {
      caption: "Simplest form — yes or no?",
      head: ["Written", "Simplest form", "Why"],
      rows: [
        ["1a", "a", "Never write the 1"],
        ["a + a", "2a", "Two a's make 2a"],
        ["b × a", "ab", "Drop the ×, letters in alphabetical order"],
        ["a ÷ b", "a/b", "Use a fraction bar"],
        ["a × a", "a²", "Use a power"]
      ]
    },
    discussion: [
      "Ask the class: Why can you combine 4xy and 3yx but not 4xy and 3xz?",
      "Ask the class: In an algebra pyramid, each block is the SUM of the two below. What goes above 3x and 5x?"
    ],
    sayTogether: "Say it together: “Same letter? Collect! Different letter? Leave it alone!”",
    yourTurn: "Your turn: Simplify 6f + 2g + 3f − g, then invent your own expression with exactly two like terms for a partner to simplify.",
    quickCheck: {
      type: "mcq",
      q: "Simplify 7p + 4 + 2p − 1.",
      options: ["9p + 3", "12p", "9p + 5", "5p + 3"],
      answer: 0,
      explain: "Collect the p terms: 7p + 2p = 9p. Collect the constants: 4 − 1 = 3. Answer: 9p + 3.",
      rule: "Only like terms combine; keep letter terms and constants separate."
    }
  },

  {
    id: "L4",
    code: "2.4",
    title: "Expanding Brackets",
    color: "peach",
    objective: "Multiply out (expand) a bracket correctly.",
    intro: "4(n + 3) means 4 × (n + 3). To EXPAND the bracket, multiply EVERY term inside the bracket by the number outside — not just the first one!",
    keyPoints: [
      "Multiply the outside number by EVERY term inside the bracket.",
      "4(n + 3) = 4n + 12, because 4 × n = 4n and 4 × 3 = 12.",
      "Mind the minus: 2(x − 5) = 2x − 10.",
      "Three terms? Multiply all three: 3(2g + h − 7) = 6g + 3h − 21.",
      "After expanding, collect like terms if you can."
    ],
    patternBox: { label: "The Expand Machine", boxes: ["4(n + 3)", "=", "4n + 12"], style: "peach",
      demo: [["3(y + 6)", "3y + 18"], ["5(z − 2)", "5z − 10"], ["6(2 + f)", "12 + 6f"], ["2(3b − 4)", "6b − 8"]] },
    examples: [
      { line: "3(x + 5) = 3x + 15", why: "3 × x = 3x and 3 × 5 = 15." },
      { line: "4(y − 2) = 4y − 8", why: "The minus stays: 4 × y = 4y, then SUBTRACT 4 × 2 = 8." },
      { line: "5(2w + 3) = 10w + 15", why: "5 × 2w = 10w — multiply the numbers, keep the letter." },
      { line: "2(4 − 3k) = 8 − 6k", why: "2 × 4 = 8, then subtract 2 × 3k = 6k." },
      { line: "3(2x + 4) − 5 = 6x + 7", why: "Expand first: 6x + 12. Then collect: 12 − 5 = 7." }
    ],
    tip: "Draw rainbow arcs from the outside number to EACH term inside. Two terms inside = two arcs = two multiplications. Count your arcs!",
    confusable: {
      title: "⚠️ The classic bracket trap",
      pairs: [
        { a: "4(x + 4)", aAns: "4x + 16 ✓", b: "The trap", bAns: "4x + 4 ✗",
          note: "The 4 must multiply BOTH the x AND the 4. Forgetting the second multiplication is the most common test mistake!" }
      ]
    },
    mistakes: [
      { wrong: "2(6x − 3) = 12x − 3", right: "= 12x − 6", note: "The 2 multiplies the 3 as well: 2 × 3 = 6." },
      { wrong: "3(2 − 5x) = 6 + 15x", right: "= 6 − 15x", note: "The minus sign belongs to the 5x — it stays a minus after expanding." },
      { wrong: "6(2 − x) = 12 − 6x = 6x", right: "12 − 6x stays as it is", note: "12 and 6x are NOT like terms, so they cannot merge." }
    ],
    table: {
      caption: "Expand step by step",
      head: ["Bracket", "Multiply out", "Answer"],
      rows: [
        ["2(x + 9)", "2×x and 2×9", "2x + 18"],
        ["3(y − 1)", "3×y and 3×1", "3y − 3"],
        ["4(7 + p)", "4×7 and 4×p", "28 + 4p"],
        ["5(q − 3)", "5×q and 5×3", "5q − 15"],
        ["7(2g + 9p)", "7×2g and 7×9p", "14g + 63p"]
      ]
    },
    discussion: [
      "Ask the class: Do 3(4b + 5) and 3(5 + 4b) expand to the same thing? Why?",
      "Ask the class: A rectangle is 8 cm wide and (3y + 4) cm long. What is its area as an expression?"
    ],
    sayTogether: "Say it together: “Multiply EVERY term inside — don't let one hide!”",
    yourTurn: "Your turn: Expand 4(2x + 3), then expand and simplify 12 + 3(2x − 3).",
    quickCheck: {
      type: "mcq",
      q: "Expand 5(2w + 3).",
      options: ["10w + 3", "7w + 8", "10w + 15", "2w + 15"],
      answer: 2,
      explain: "5 × 2w = 10w AND 5 × 3 = 15, so 5(2w + 3) = 10w + 15. Option A forgot to multiply the 3.",
      rule: "The outside number multiplies every term inside the bracket."
    }
  },

  {
    id: "L5",
    code: "2.5",
    title: "Solving Equations",
    color: "sun",
    objective: "Write an equation from a story and solve it to find the unknown.",
    intro: "To SOLVE an equation means to find the value of the unknown letter. The golden rule: whatever you do to one side, do EXACTLY the same to the other side.",
    keyPoints: [
      "Undo + with −, undo − with +, undo × with ÷. These are inverse operations.",
      "x + 5 = 12 → subtract 5 from both sides → x = 7.",
      "3x = 12 → divide both sides by 3 → x = 4.",
      "Two-step equations: 2y + 4 = 16 → subtract 4 (2y = 12), then divide by 2 (y = 6).",
      "ALWAYS check: substitute your answer back into the equation."
    ],
    patternBox: { label: "The Balance Rule", boxes: ["x + 5 = 12", "−5 both sides", "x = 7"], style: "sun",
      demo: [["x + 4 = 11", "x = 7"], ["x − 4 = 9", "x = 13"], ["5x = 30", "x = 6"], ["2a + 3 = 13", "a = 5"]] },
    examples: [
      { line: "x + 6 = 14 → x = 8", why: "Subtract 6 from both sides: 14 − 6 = 8. Check: 8 + 6 = 14 ✓" },
      { line: "y − 3 = 10 → y = 13", why: "Add 3 to both sides: 10 + 3 = 13. Check: 13 − 3 = 10 ✓" },
      { line: "4k = 28 → k = 7", why: "Divide both sides by 4: 28 ÷ 4 = 7. Check: 4 × 7 = 28 ✓" },
      { line: "2n + 5 = 17 → n = 6", why: "Subtract 5 (2n = 12), then divide by 2 (n = 6). Check: 2×6 + 5 = 17 ✓" },
      { line: "15 = m + 9 → m = 6", why: "The unknown can sit on the right! Rewrite as m + 9 = 15, then subtract 9." }
    ],
    tip: "Think of an equation as a balanced seesaw. If you take 5 off one side only, it tips over! Keep it balanced — same move on both sides.",
    confusable: {
      title: "⚠️ Equation or expression?",
      pairs: [
        { a: "3n + 1", aAns: "Expression — simplify it", b: "3n + 1 = 13", bAns: "Equation — solve it (n = 4)",
          note: "You can only SOLVE something with an equals sign. Expressions are simplified, not solved." }
      ]
    },
    mistakes: [
      { wrong: "x + 7 = 20 → x = 27", right: "x = 13", note: "Undo +7 by SUBTRACTING 7, not adding more." },
      { wrong: "x − 6 = −2 → x = −8", right: "x = 4", note: "Add 6 to both sides: −2 + 6 = 4. Be extra careful with negatives!" },
      { wrong: "2y + 4 = 16 → 2y = 20", right: "2y = 12", note: "Subtract the 4 first: 16 − 4 = 12. Then y = 6." }
    ],
    table: {
      caption: "Story → Equation → Solution",
      head: ["Story", "Equation", "Solution"],
      rows: [
        ["I think of a number and add 3. The answer is 18.", "n + 3 = 18", "n = 15"],
        ["I think of a number and subtract 4. The answer is 10.", "n − 4 = 10", "n = 14"],
        ["I think of a number and multiply by 4. The answer is 24.", "4n = 24", "n = 6"],
        ["I double a number then add 4. The answer is 28.", "2n + 4 = 28", "n = 12"]
      ]
    },
    discussion: [
      "Ask the class: Two equal sides of an isosceles triangle are 2p + 1 and 14. What equation can we write? What is p?",
      "Ask the class: Why is checking by substitution worth 10 seconds of your time in a test?"
    ],
    sayTogether: "Say it together: “Same move, both sides — keep the seesaw level!”",
    yourTurn: "Your turn: Write an “I think of a number” story for 3n = 21, then solve it and check.",
    quickCheck: {
      type: "mcq",
      q: "Solve 2a + 3 = 13.",
      options: ["a = 8", "a = 5", "a = 6.5", "a = 10"],
      answer: 1,
      explain: "Subtract 3 from both sides: 2a = 10. Divide both sides by 2: a = 5. Check: 2×5 + 3 = 13 ✓",
      rule: "Undo adding first, then undo multiplying — same move on both sides."
    }
  },

  {
    id: "L6",
    code: "2.6",
    title: "Inequalities",
    color: "coral",
    objective: "Use < and > to describe a range of numbers and show it on a number line.",
    intro: "An INEQUALITY uses < (less than) or > (greater than) to describe a whole RANGE of numbers, not just one. x > 4 means x can be ANY number bigger than 4 — but not 4 itself.",
    keyPoints: [
      "< means “is less than”. > means “is greater than”.",
      "x > 4: draw an OPEN circle at 4 with an arrow pointing RIGHT.",
      "y < 7: open circle at 7, arrow pointing LEFT.",
      "x > 4 → the smallest INTEGER x could be is 5 (not 4!).",
      "Integer lists go on forever, so end them with dots: 5, 6, 7, 8, …"
    ],
    patternBox: { label: "Number-Line Reader", boxes: ["x > 4", "○→", "5, 6, 7, 8, …"], style: "coral",
      demo: [["x > 9 — smallest integer?", "10"], ["y < 3 — largest integer?", "2"], ["n > −2 — smallest integer?", "−1"], ["k < −5 — largest integer?", "−6"]] },
    examples: [
      { line: "x > 6 → integers 7, 8, 9, 10, …", why: "x must be BIGGER than 6, so the first integer is 7 — and the list never ends." },
      { line: "y < 2 → integers 1, 0, −1, −2, …", why: "y must be SMALLER than 2, so count down from 1 through zero into the negatives." },
      { line: "n > 3.5 → smallest integer is 4", why: "n is bigger than 3.5, and the first whole number after 3.5 is 4." },
      { line: "m < −1.5 → largest integer is −2", why: "m must be BELOW −1.5. On the number line, −2 is below −1.5 but −1 is above it." },
      { line: "The arrow on x > 4 points right forever", why: "It heads towards positive infinity — numbers that never stop growing." }
    ],
    tip: "The open circle means “this exact number is NOT included”. Hungry-mouth memory trick: the < symbol opens towards the BIGGER side, like a mouth eating the bigger number!",
    confusable: {
      title: "⚠️ Strictly bigger — the boundary is NOT included",
      pairs: [
        { a: "x > 7, smallest integer", aAns: "8 ✓", b: "The trap", bAns: "7 ✗",
          note: "x > 7 means strictly greater than 7, so 7 itself is not allowed. The first integer past 7 is 8." }
      ]
    },
    mistakes: [
      { wrong: "x > 7 → smallest integer is 7", right: "smallest integer is 8", note: "The open circle at 7 means 7 is not included." },
      { wrong: "Integer list: 8, 9, 10, 11 (stop)", right: "8, 9, 10, 11, …", note: "The list is infinite — always finish with the dots (…)." },
      { wrong: "m < −3.5 → largest integer is −3", right: "largest integer is −4", note: "−3 is GREATER than −3.5. Go one step further down the line to −4." }
    ],
    table: {
      caption: "Reading inequalities",
      head: ["Inequality", "In words", "Integers"],
      rows: [
        ["x > 10", "x is greater than 10", "11, 12, 13, …"],
        ["x < 10", "x is less than 10", "9, 8, 7, …"],
        ["x > −4", "x is greater than −4", "−3, −2, −1, 0, …"],
        ["x < −4", "x is less than −4", "−5, −6, −7, …"]
      ]
    },
    discussion: [
      "Ask the class: Why can't we write down the LARGEST number that fits x > 4?",
      "Ask the class: A rollercoaster sign says “you must be taller than 120 cm”. Write that rule as an inequality."
    ],
    sayTogether: "Say it together: “Open circle, not included — arrow shows where x is hiding!”",
    yourTurn: "Your turn: Draw the number line for y < 5, write the largest integer y could be, then list four integer values.",
    quickCheck: {
      type: "mcq",
      q: "What is the smallest integer n could be if n > 2.5?",
      options: ["2", "2.5", "3", "4"],
      answer: 2,
      explain: "n must be greater than 2.5. The first whole number after 2.5 is 3.",
      rule: "For n > (a decimal), round UP to the next whole number to find the smallest integer."
    }
  }
];

/* ------------------------------------------------------------
   VOCAB — key words for Unit 2 (all definitions original)
   cat: Core | Expressions | Equations | Inequalities
   ------------------------------------------------------------ */
const VOCAB_CATS = ["All", "Core Words", "Expression Words", "Equation Words", "Inequality Words"];

const VOCAB = [
  { w: "expression", say: "ex-PRESH-un", syll: "ex·pres·sion", cat: "Core Words", icon: "🧩",
    meaning: "Numbers and letters joined by + − × ÷, with NO equals sign.",
    ex: "3k + 1 and p − 5 are expressions.",
    warn: "Double s, double i-o-n: expreSSion.", pattern: "no equals sign" },
  { w: "equation", say: "ee-KWAY-zhun", syll: "e·qua·tion", cat: "Core Words", icon: "⚖️",
    meaning: "A maths sentence WITH an equals sign that can be solved.",
    ex: "3k + 1 = 13 is an equation; its solution is k = 4.",
    warn: "Starts like “equal” — equa + tion.", pattern: "has an equals sign" },
  { w: "formula", say: "FOR-myoo-luh", syll: "for·mu·la", cat: "Core Words", icon: "🧪",
    meaning: "A rule that connects quantities, written with letters.",
    ex: "d = 7w connects days and weeks.",
    warn: "The plural is formulae (or formulas).", pattern: "a rule with letters" },
  { w: "formulae", say: "FOR-myoo-lee", syll: "for·mu·lae", cat: "Core Words", icon: "🧪",
    meaning: "More than one formula.",
    ex: "P = 4s and m = 60h are two formulae.",
    warn: "Ends in -ae, not -as (both are accepted, -ae is the classic plural).", pattern: "plural of formula" },
  { w: "variable", say: "VAIR-ee-uh-bul", syll: "var·i·a·ble", cat: "Core Words", icon: "🔤",
    meaning: "A letter that can take different number values.",
    ex: "In 5n + 4, the letter n is the variable.",
    warn: "vari- like “vary” — it can change.", pattern: "the letter" },
  { w: "unknown", say: "un-NOHN", syll: "un·known", cat: "Core Words", icon: "❓",
    meaning: "A number we don't know yet, shown by a letter.",
    ex: "In x + 5 = 12, the unknown x turns out to be 7.",
    warn: "Silent k: un-k-nown.", pattern: "mystery number" },
  { w: "term", say: "TURM", syll: "term", cat: "Expression Words", icon: "🧱",
    meaning: "One building block of an expression.",
    ex: "4a + 3b − 7 has three terms: 4a, 3b and 7.",
    pattern: "separated by + and −" },
  { w: "like terms", say: "LYKE turmz", syll: "like terms", cat: "Expression Words", icon: "👯",
    meaning: "Terms with exactly the same letter part.",
    ex: "2x and 5x are like terms; 2x and 5y are not.",
    pattern: "same letters collect" },
  { w: "coefficient", say: "koh-uh-FISH-unt", syll: "co·ef·fi·cient", cat: "Expression Words", icon: "✖️",
    meaning: "The number that multiplies the variable.",
    ex: "In 7n + 2, the coefficient of n is 7.",
    warn: "Tricky spelling: co-e-ff-i-cient — double f!", pattern: "number × letter" },
  { w: "constant", say: "KON-stunt", syll: "con·stant", cat: "Expression Words", icon: "🪨",
    meaning: "A number on its own — it never changes.",
    ex: "In 7n + 2, the constant is 2.",
    pattern: "number with no letter" },
  { w: "simplify", say: "SIM-plih-fy", syll: "sim·pli·fy", cat: "Expression Words", icon: "🧹",
    meaning: "Rewrite an expression in its shortest form.",
    ex: "6f + 2f − 3f simplifies to 5f.",
    pattern: "collect like terms" },
  { w: "equivalent", say: "ee-KWIV-uh-lunt", syll: "e·quiv·a·lent", cat: "Expression Words", icon: "🟰",
    meaning: "Worth exactly the same, even if written differently.",
    ex: "5n + 4, 4 + 5n and 5 × n + 4 are equivalent expressions.",
    warn: "equi- means equal.", pattern: "same value, different look" },
  { w: "expand", say: "ex-PAND", syll: "ex·pand", cat: "Expression Words", icon: "💥",
    meaning: "Multiply out a bracket.",
    ex: "Expanding 4(n + 3) gives 4n + 12.",
    pattern: "multiply every term inside" },
  { w: "brackets", say: "BRAK-its", syll: "brack·ets", cat: "Expression Words", icon: "🤲",
    meaning: "The curved symbols ( ) that group terms together.",
    ex: "In 2(x − 5), the bracket groups x − 5.",
    pattern: "( group )" },
  { w: "substitute", say: "SUB-stih-tyoot", syll: "sub·sti·tute", cat: "Equation Words", icon: "🔁",
    meaning: "Swap a letter for a number, then calculate.",
    ex: "Substituting k = 5 into 2k + 3 gives 13.",
    warn: "Like a substitute player — one swaps in for another.", pattern: "letter → number" },
  { w: "derive", say: "dih-RYVE", syll: "de·rive", cat: "Equation Words", icon: "🛠️",
    meaning: "Build your own formula from a situation.",
    ex: "From “each pizza costs $2.75”, you can derive C = 2.75p.",
    pattern: "make your own rule" },
  { w: "solve", say: "SOLV", syll: "solve", cat: "Equation Words", icon: "🔓",
    meaning: "Find the value of the unknown that makes an equation true.",
    ex: "Solving x + 5 = 12 gives x = 7.",
    pattern: "find the unknown" },
  { w: "solution", say: "suh-LOO-shun", syll: "so·lu·tion", cat: "Equation Words", icon: "🗝️",
    meaning: "The value of the unknown that makes the equation true.",
    ex: "x = 7 is the solution of x + 5 = 12.",
    pattern: "the answer value" },
  { w: "inverse operation", say: "IN-vurs op-uh-RAY-shun", syll: "in·verse op·er·a·tion", cat: "Equation Words", icon: "↩️",
    meaning: "The opposite operation — it undoes another one.",
    ex: "Subtracting 5 is the inverse of adding 5.",
    pattern: "+↔−, ×↔÷" },
  { w: "inequality", say: "in-ee-KWOL-ih-tee", syll: "in·e·qual·i·ty", cat: "Inequality Words", icon: "↔️",
    meaning: "A statement using < or > to compare values.",
    ex: "x > 4 is an inequality — x is any number above 4.",
    warn: "in + equality: “not equal”.", pattern: "< or >" },
  { w: "integer", say: "IN-tih-jur", syll: "in·te·ger", cat: "Inequality Words", icon: "🔢",
    meaning: "A whole number — positive, negative or zero.",
    ex: "−3, 0 and 12 are integers; 2.5 is not.",
    warn: "Soft g: in-te-jer.", pattern: "whole numbers only" },
  { w: "open interval", say: "OH-pun IN-tur-vul", syll: "o·pen in·ter·val", cat: "Inequality Words", icon: "⭕",
    meaning: "A range of numbers where the end point is NOT included.",
    ex: "x > 4 is an open interval — 4 itself is not allowed.",
    pattern: "open circle on the line" },
  { w: "positive infinity", say: "POZ-ih-tiv in-FIN-ih-tee", syll: "pos·i·tive in·fin·i·ty", cat: "Inequality Words", icon: "🚀",
    meaning: "The direction of numbers that grow bigger forever.",
    ex: "The arrow of x > 4 points towards positive infinity.",
    pattern: "→ forever right" },
  { w: "negative infinity", say: "NEG-uh-tiv in-FIN-ih-tee", syll: "neg·a·tive in·fin·i·ty", cat: "Inequality Words", icon: "🕳️",
    meaning: "The direction of numbers that fall lower forever.",
    ex: "The arrow of y < 7 points towards negative infinity.",
    pattern: "← forever left" }
];

/* ------------------------------------------------------------
   ALGEBRA LAB — six stations of pattern practice
   Each station: id, title, icon, blurb, tipAfter, questions[]
   ------------------------------------------------------------ */
const LAB_SETS = [
  {
    id: "lab_sorter", title: "Like-Term Sorter", icon: "🗂️",
    blurb: "Sort the terms into the correct family. Same letter = same family!",
    tipAfter: "Rule: like terms have exactly the same letter part. The coefficient can be different — the letters must match.",
    questions: [
      { type: "sort", q: "Sort these terms into families.", buckets: ["x terms", "y terms", "constants"],
        items: [{ t: "3x", b: 0 }, { t: "5y", b: 1 }, { t: "−2x", b: 0 }, { t: "8", b: 2 }, { t: "y", b: 1 }, { t: "−4", b: 2 }],
        explain: "x terms: 3x and −2x. y terms: 5y and y. Constants (plain numbers): 8 and −4.",
        rule: "Like terms share exactly the same letter." },
      { type: "mcq", q: "Which term is a like term with 6ab?", options: ["6a", "3ba", "6b", "ab²"], answer: 1,
        explain: "3ba has exactly the same letters as 6ab (a and b), just written in a different order — ab = ba.",
        rule: "Letter order doesn't matter: ab and ba are the same." },
      { type: "multi", q: "Select ALL the terms that are like terms with 4k.", options: ["k", "4m", "−7k", "k²", "½k"], answers: [0, 2, 4],
        explain: "k, −7k and ½k all have the single letter k. 4m has a different letter, and k² has a power, so it is a different family.",
        rule: "Like terms: same letter AND same power." },
      { type: "mcq", q: "Which expression CANNOT be simplified?", options: ["2x + 5x", "3a + 2b", "7y − y", "4cd + 2dc"], answer: 1,
        explain: "3a and 2b have different letters, so they can never combine. All the others contain like terms.",
        rule: "Unlike terms stay apart." },
      { type: "sort", q: "Simplified or NOT simplified? Sort each expression.", buckets: ["Fully simplified", "Can be simplified"],
        items: [{ t: "5x + 3y", b: 0 }, { t: "2a + 3a", b: 1 }, { t: "4mn + 2nm", b: 1 }, { t: "7p − 2", b: 0 }],
        explain: "2a + 3a → 5a and 4mn + 2nm → 6mn can both be collected. The other two contain no like terms.",
        rule: "If two terms share the same letters, keep collecting!" }
    ]
  },
  {
    id: "lab_expand", title: "Expand Machine", icon: "💥",
    blurb: "Feed a bracket into the machine — multiply EVERY term inside.",
    tipAfter: "Rule: a(b + c) = ab + ac. Draw one arc per term inside the bracket and count your multiplications.",
    questions: [
      { type: "mcq", q: "Expand 3(y + 6).", options: ["3y + 6", "3y + 18", "y + 18", "9y"], answer: 1,
        explain: "3 × y = 3y AND 3 × 6 = 18. The most common slip is forgetting to multiply the 6.",
        rule: "Multiply every term inside the bracket." },
      { type: "mcq", q: "Expand 6(2 − x).", options: ["12 − 6x", "12 − x", "6x − 12", "12 + 6x"], answer: 0,
        explain: "6 × 2 = 12 and 6 × x = 6x, keeping the minus: 12 − 6x. And no — 12 − 6x does NOT become 6x!",
        rule: "Keep the sign that sits in front of each term." },
      { type: "fill", q: "Expand: 5(q − 3) = 5q − ▢. Type the missing number.", answer: "15", accept: ["15"],
        explain: "5 × 3 = 15, so 5(q − 3) = 5q − 15.",
        rule: "The outside number multiplies the constant too." },
      { type: "mcq", q: "Expand 8(3e + 2f − 1).", options: ["24e + 2f − 1", "24e + 16f − 8", "11e + 10f − 9", "24e + 16f + 8"], answer: 1,
        explain: "Three terms inside → three multiplications: 8×3e = 24e, 8×2f = 16f, 8×1 = 8 (subtracted).",
        rule: "Three terms inside = three arcs = three multiplications." },
      { type: "mcq", q: "Expand and simplify 4(x + 7) − 1.", options: ["4x + 6", "4x + 27", "4x + 28", "4x + 26"], answer: 1,
        explain: "Expand first: 4x + 28. Then collect the constants: 28 − 1 = 27. Answer: 4x + 27.",
        rule: "Expand the bracket first, then collect like terms." },
      { type: "tf", q: "True or false? 2(5c − 1) and 2(1 − 5c) expand to the same answer.", answer: false,
        explain: "2(5c − 1) = 10c − 2, but 2(1 − 5c) = 2 − 10c. The terms are swapped AND the signs are different.",
        rule: "Order doesn't matter for +, but it DOES matter for −." }
    ]
  },
  {
    id: "lab_sub", title: "Substitution Station", icon: "🔁",
    blurb: "Swap the letters for numbers and calculate — × and ÷ before + and −.",
    tipAfter: "Rule: rewrite the hidden × sign first (3k → 3 × k), then follow the order of operations.",
    questions: [
      { type: "fill", q: "Find the value of x + 9 when x = 13.", answer: "22", accept: ["22"],
        explain: "Substitute 13 for x: 13 + 9 = 22.",
        rule: "Swap the letter for its number, then calculate." },
      { type: "mcq", q: "Find 7x when x = 5.", options: ["75", "12", "35", "57"], answer: 2,
        explain: "7x means 7 × x = 7 × 5 = 35. Writing “75” is the classic digits-stuck-together trap!",
        rule: "A number next to a letter means multiply." },
      { type: "mcq", q: "Find 2m + n when m = 7 and n = 6.", options: ["26", "20", "15", "84"], answer: 1,
        explain: "2 × 7 = 14 first, then 14 + 6 = 20. Doing 7 + 6 first gives the wrong 26.",
        rule: "Multiplication before addition." },
      { type: "fill", q: "Find the value of y/4 when y = 32.", answer: "8", accept: ["8"],
        explain: "y/4 means y ÷ 4 = 32 ÷ 4 = 8.",
        rule: "A fraction bar means divide." },
      { type: "mcq", q: "The formula V = IR is used in science. Find V when I = 4 and R = 9.", options: ["13", "36", "49", "94"], answer: 1,
        explain: "IR means I × R = 4 × 9 = 36.",
        rule: "Letters written together are multiplied together." },
      { type: "mcq", q: "Find ab − c when a = 9, b = 8 and c = 32.", options: ["40", "104", "49", "72"], answer: 0,
        explain: "ab = 9 × 8 = 72 first, then 72 − 32 = 40.",
        rule: "Multiply the letter pair first, then subtract." }
    ]
  },
  {
    id: "lab_solve", title: "Equation Solver", icon: "🔓",
    blurb: "Balance the seesaw — do the same move on both sides.",
    tipAfter: "Rule: undo + with −, undo × with ÷. Always check by substituting your answer back in.",
    questions: [
      { type: "fill", q: "Solve x + 4 = 11. Type the value of x.", answer: "7", accept: ["7", "x=7", "x = 7"],
        explain: "Subtract 4 from both sides: x = 11 − 4 = 7. Check: 7 + 4 = 11 ✓",
        rule: "Undo adding by subtracting on both sides." },
      { type: "fill", q: "Solve x − 12 = 14. Type the value of x.", answer: "26", accept: ["26", "x=26", "x = 26"],
        explain: "Add 12 to both sides: x = 14 + 12 = 26. Check: 26 − 12 = 14 ✓",
        rule: "Undo subtracting by adding on both sides." },
      { type: "mcq", q: "Solve 5x = 30.", options: ["x = 25", "x = 35", "x = 6", "x = 150"], answer: 2,
        explain: "Divide both sides by 5: x = 30 ÷ 5 = 6. Check: 5 × 6 = 30 ✓",
        rule: "Undo multiplying by dividing on both sides." },
      { type: "mcq", q: "Solve 12 = y + 3.", options: ["y = 15", "y = 9", "y = 4", "y = 36"], answer: 1,
        explain: "The unknown is on the right — that's fine! y + 3 = 12, so y = 12 − 3 = 9.",
        rule: "An equation works both ways round." },
      { type: "mcq", q: "Solve 4a + 1 = 17.", options: ["a = 4", "a = 4.5", "a = 5", "a = 16"], answer: 0,
        explain: "Subtract 1: 4a = 16. Divide by 4: a = 4. Check: 4×4 + 1 = 17 ✓",
        rule: "Two-step: undo + or − first, then undo ×." },
      { type: "order", q: "Put the solving steps for 2y + 4 = 16 in the correct order.",
        items: ["Start: 2y + 4 = 16", "Subtract 4 from both sides: 2y = 12", "Divide both sides by 2: y = 6", "Check: 2 × 6 + 4 = 16 ✓"],
        explain: "First remove the + 4, then divide by 2, and always finish with a check.",
        rule: "Undo addition before undoing multiplication." }
    ]
  },
  {
    id: "lab_ineq", title: "Inequality Line-Up", icon: "📏",
    blurb: "Read the symbols, find the integers, mind the open circle!",
    tipAfter: "Rule: > means strictly greater — the boundary number itself is NOT included. Integer lists end with dots (…).",
    questions: [
      { type: "mcq", q: "Which inequality says “n is greater than −1”?", options: ["n < −1", "n > −1", "n = −1", "−1 > n"], answer: 1,
        explain: "“Greater than” is the > symbol with n first: n > −1.",
        rule: "Read left to right: letter, symbol, number." },
      { type: "fill", q: "What is the smallest integer y could be if y > 4?", answer: "5", accept: ["5"],
        explain: "y must be strictly greater than 4, so 4 is not allowed. The first integer above 4 is 5.",
        rule: "Open interval: the boundary is not included." },
      { type: "mcq", q: "What is the largest integer n could be if n < −6?", options: ["−5", "−6", "−7", "0"], answer: 2,
        explain: "n must be BELOW −6. On the number line, −7 sits just below −6. (−5 is above −6!)",
        rule: "With negatives, “less than” means further LEFT." },
      { type: "mcq", q: "A number line shows an open circle at 2 with an arrow pointing right. Which inequality is it?",
        options: ["x < 2", "x > 2", "x = 2", "2 > x"], answer: 1,
        explain: "Open circle at 2 (2 not included) with the arrow towards bigger numbers means x > 2.",
        rule: "Arrow right → greater than; arrow left → less than." },
      { type: "mcq", q: "Which list shows the integer values of k when k < 12?", options: ["12, 11, 10, …", "11, 10, 9, …", "13, 14, 15, …", "11, 10, 9 (stop)"], answer: 1,
        explain: "k is strictly below 12, so start at 11 and count down forever: 11, 10, 9, … The dots are essential!",
        rule: "Start just inside the boundary and never stop the list." },
      { type: "fill", q: "What is the smallest integer y could be if y > 2.5?", answer: "3", accept: ["3"],
        explain: "The first whole number above 2.5 is 3.",
        rule: "For decimals, step up to the next whole number." }
    ]
  },
  {
    id: "lab_fixit", title: "Pattern Fix-It", icon: "🔧",
    blurb: "Every item hides a mistake. Find it, fix it, explain it!",
    tipAfter: "Rule: checking work is a maths superpower. Substitute a number to test whether two expressions really are equal.",
    questions: [
      { type: "mcq", q: "Ravi wrote 4(x + 4) = 4x + 4. What is the correct expansion?",
        options: ["4x + 8", "4x + 16", "8x", "x + 16"], answer: 1,
        explain: "The 4 outside must multiply BOTH terms: 4 × x = 4x and 4 × 4 = 16.",
        rule: "Multiply every term inside the bracket." },
      { type: "mcq", q: "Nina simplified 2x + 8 + 6x − 4 and got 12x. What is the correct answer?",
        options: ["8x + 4", "8x + 12", "16x", "8x − 4"], answer: 0,
        explain: "x terms: 2x + 6x = 8x. Constants: 8 − 4 = 4. You cannot merge 8x with 4 — they are unlike terms.",
        rule: "Letter terms and plain numbers stay separate." },
      { type: "fill", q: "Omar says 8n − n = 8. Fix it: 8n − n = ? (type the correct term)", answer: "7n", accept: ["7n", "7 n"],
        explain: "n means 1n, so 8n − 1n = 7n. Omar subtracted the letter instead of the term!",
        rule: "A lonely letter always has a hidden coefficient of 1." },
      { type: "mcq", q: "Lily solved x − 6 = −2 and wrote x = −8. What is the correct solution?",
        options: ["x = 4", "x = −4", "x = 8", "x = −12"], answer: 0,
        explain: "Add 6 to both sides: x = −2 + 6 = 4. Check: 4 − 6 = −2 ✓. Lily subtracted instead of adding.",
        rule: "Undo −6 by ADDING 6 to both sides." },
      { type: "mcq", q: "Jake wrote: “x > 7, so x could be 7, 8, 9, …”. What went wrong?",
        options: ["The list should start at 8", "The list should start at 6", "The dots are wrong", "Nothing is wrong"], answer: 0,
        explain: "x > 7 is strict — 7 itself is NOT included, so the list starts at 8: 8, 9, 10, …",
        rule: "An open interval never includes its boundary." },
      { type: "mcq", q: "Tia simplified 3bc + 5bd − 2bc + 3db and got 5bc + 5bd + 3db. What is the correct simplest form?",
        options: ["bc + 8bd", "5bc + 8bd", "bc + 2bd", "9bcd"], answer: 0,
        explain: "3bc − 2bc = 1bc = bc. And db = bd, so 5bd + 3db = 8bd. Answer: bc + 8bd.",
        rule: "Letter order doesn't matter — bd and db are like terms." }
    ]
  }
];

/* ------------------------------------------------------------
   READINGS — three original reading levels with questions
   ------------------------------------------------------------ */
const READINGS = [
  {
    id: "read_easy", level: "Easy Reading", icon: "🌱", title: "Ben's Juice Stand",
    minutes: 3,
    intro: "Read the story. Watch how letters stand for numbers!",
    vocabSupport: [
      ["cup", "a small drink container"],
      ["earns", "gets money for work"],
      ["expression", "maths with letters, no equals sign"]
    ],
    highlight: ["expression", "variable", "substitute", "formula"],
    text: [
      "Ben has a juice stand. One cup of juice costs $2.",
      "Ben does not know how many cups he will sell today. He calls the number of cups c. The letter c is a variable.",
      "For c cups, Ben earns 2c dollars. The maths 2c is an expression — it has no equals sign.",
      "Every day, Ben pays $6 for fruit. So his profit is 2c − 6.",
      "On Saturday, Ben sells 10 cups. He can substitute c = 10 into his expression: 2 × 10 − 6 = 14.",
      "Ben smiles. “My profit is $14. My formula works every single day!”"
    ],
    questions: [
      { type: "mcq", q: "How much does one cup of juice cost?", options: ["$6", "$2", "$10", "$14"], answer: 1,
        explain: "The story says: “One cup of juice costs $2.”", rule: "Find the fact in the text.", skill: "Reading" },
      { type: "mcq", q: "What does the letter c stand for in the story?", options: ["The cost of fruit", "The number of cups Ben sells", "Ben's profit", "The number of days"], answer: 1,
        explain: "Ben “calls the number of cups c” — so c counts the cups sold.", rule: "A variable stands for the unknown amount.", skill: "Reading" },
      { type: "tf", q: "True or false? 2c − 6 is an equation.", answer: false,
        explain: "2c − 6 has NO equals sign, so it is an expression, not an equation.", rule: "Equation = has an equals sign.", skill: "Reading" },
      { type: "fill", q: "Ben sells 10 cups on Saturday. His profit is $▢. (Type the number.)", answer: "14", accept: ["14", "$14"],
        explain: "Substitute c = 10: 2 × 10 − 6 = 20 − 6 = 14.", rule: "Substitute, multiply first, then subtract.", skill: "Reading" },
      { type: "mcq", q: "Which title also fits this story best?", options: ["A Rainy Day", "Letters That Count Cups", "The Broken Blender", "Ben Buys a Bike"], answer: 1,
        explain: "The story is about using the letter c to count cups and work out profit.", rule: "A good title matches the MAIN idea.", skill: "Reading" }
    ]
  },
  {
    id: "read_medium", level: "Medium Reading", icon: "🌿", title: "Lena's Bracelet Shop",
    minutes: 5,
    intro: "A mini-story about deriving a formula. Read carefully — the questions dig deeper!",
    vocabSupport: [
      ["beads", "small balls with holes, used for jewellery"],
      ["profit", "money made after paying costs"],
      ["derive", "build your own formula"]
    ],
    highlight: ["derive", "formula", "equation", "solve", "solution"],
    text: [
      "Lena makes bracelets for the school fair. Each bracelet uses 5 beads and 1 silver ribbon.",
      "First, Lena wants to know how many beads she needs. For b bracelets she will use 5b beads. “I just derived my first formula,” she laughs: N = 5b.",
      "Next, money. Lena sells each bracelet for $4, but the materials for each one cost $1. So every bracelet earns her $3 of profit. For b bracelets, her profit formula is P = 3b.",
      "On Friday night, Lena sets a goal. “I want exactly $24 of profit.” She writes an equation: 3b = 24.",
      "She solves it by dividing both sides by 3. The solution is b = 8, so she must sell 8 bracelets.",
      "At the fair, Lena sells all 8 bracelets before lunch! She checks her formula: 3 × 8 = 24. “Algebra planned my whole day,” she tells her friend Tam."
    ],
    questions: [
      { type: "mcq", q: "How many beads does ONE bracelet use?", options: ["1", "3", "4", "5"], answer: 3,
        explain: "The first paragraph says each bracelet uses 5 beads.", rule: "Scan the text for the number fact.", skill: "Reading" },
      { type: "mcq", q: "What does N = 5b help Lena work out?", options: ["Her profit", "The number of beads she needs", "The price of a bracelet", "The number of ribbons"], answer: 1,
        explain: "N = 5b counts beads: 5 beads for every bracelet b.", rule: "Match each formula to its meaning.", skill: "Reading" },
      { type: "mcq", q: "Why is Lena's profit $3 per bracelet, not $4?", options: ["She gives $1 to Tam", "Materials cost $1 per bracelet", "The fair charges $1", "She made a mistake"], answer: 1,
        explain: "She sells for $4 but pays $1 for materials: 4 − 1 = 3. That's cause and effect in the story.", rule: "Profit = selling price − cost.", skill: "Reading" },
      { type: "fill", q: "Write the equation Lena solves to reach her goal. (Type it, e.g. 2x = 10)", answer: "3b = 24", accept: ["3b=24", "3b = 24", "3b =24", "3b= 24"],
        explain: "Her goal is $24 profit and her formula is P = 3b, so she writes 3b = 24.", rule: "Set the expression equal to the target.", skill: "Reading" },
      { type: "order", q: "Put Lena's evening in the correct order.",
        items: ["She derives N = 5b for beads", "She writes the profit formula P = 3b", "She writes the equation 3b = 24", "She solves it and gets b = 8"],
        explain: "Beads first, then profit, then the goal equation, then the solution — just like the story.", rule: "Sequence the events as the text tells them.", skill: "Reading" },
      { type: "mcq", q: "In this story, the word “solution” means…", options: ["a liquid mixture", "the value of b that makes the equation true", "the answer to every problem", "a type of bracelet"], answer: 1,
        explain: "In algebra, the solution is the value of the unknown that balances the equation — here b = 8.", rule: "Use context to choose the right meaning.", skill: "Reading" },
      { type: "mcq", q: "Which sentence from the story PROVES her formula worked?", options: ["“Each bracelet uses 5 beads.”", "“She checks her formula: 3 × 8 = 24.”", "“Lena makes bracelets for the school fair.”", "“Next, money.”"], answer: 1,
        explain: "The check 3 × 8 = 24 shows the formula gave the right plan — that's the evidence.", rule: "Evidence = the sentence that proves the point.", skill: "Reading" }
    ]
  },
  {
    id: "read_hard", level: "Challenge Reading", icon: "🌳", title: "The Robot Gardener",
    minutes: 7,
    intro: "A longer story with equations AND an inequality. Some words are new — decode them with your Unit 2 skills!",
    vocabSupport: [
      ["greenhouse", "a glass building for growing plants"],
      ["capacity", "the amount something can hold"],
      ["spare", "extra, kept just in case"]
    ],
    highlight: ["equation", "inequality", "substitute", "expand", "integer"],
    text: [
      "Theo built a robot gardener named Sprout for the school greenhouse. Every morning, Sprout waters the plants all by itself.",
      "Sprout's tank holds w litres of water. Each tomato plant drinks 2 litres, and the greenhouse has g tomato plants. So Sprout needs 2g litres each morning.",
      "The science teacher, Ms Vale, adds a safety rule: the tank must always keep MORE than 5 litres spare. Theo writes this as an inequality: w > 2g + 5.",
      "On Monday, the greenhouse has 12 plants. Theo substitutes g = 12: Sprout needs 2 × 12 = 24 litres, and the tank must hold more than 24 + 5 = 29 litres. Since the tank's capacity is exactly 30 litres, Sprout passes the safety check — but only just.",
      "On Tuesday, disaster! Three new plant boxes arrive, each holding the same number of seedlings, plus one lonely seedling in a pot. Theo counts 19 new seedlings in total. He writes an equation for the number of seedlings in each box: 3s + 1 = 19.",
      "He solves it in two steps: subtract 1 from both sides to get 3s = 18, then divide by 3. Each box holds 6 seedlings.",
      "Theo grins and pats the robot. “When the seedlings grow into plants, I'll need a bigger tank — algebra warned me before it happened.”"
    ],
    questions: [
      { type: "mcq", q: "How many litres does each tomato plant drink?", options: ["5", "2", "12", "30"], answer: 1,
        explain: "The story says each tomato plant drinks 2 litres.", rule: "Locate the fact.", skill: "Reading" },
      { type: "mcq", q: "What does the expression 2g stand for?", options: ["The spare water", "The tank capacity", "The litres all the plants drink", "The number of boxes"], answer: 2,
        explain: "2 litres per plant × g plants = 2g litres needed each morning.", rule: "Link each expression to its meaning in the story.", skill: "Reading" },
      { type: "mcq", q: "Why does Theo write w > 2g + 5 instead of w = 2g + 5?", options: ["He likes the > symbol", "The tank must hold MORE than the plants' water plus 5 spare", "The tank is broken", "He forgot the equals sign"], answer: 1,
        explain: "Ms Vale's rule says the spare water must be MORE than 5 litres — a range of safe values, so an inequality fits, not an equation.", rule: "Inequalities describe ranges; equations describe exact values.", skill: "Reading" },
      { type: "fill", q: "On Monday, the tank must hold more than ▢ litres. (Type the number.)", answer: "29", accept: ["29"],
        explain: "Substitute g = 12: 2 × 12 + 5 = 24 + 5 = 29. The tank must hold MORE than 29 litres.", rule: "Substitute, multiply, then add.", skill: "Reading" },
      { type: "mcq", q: "In the equation 3s + 1 = 19, what does s stand for?", options: ["The number of boxes", "The seedlings in each box", "The spare litres", "The number of plants"], answer: 1,
        explain: "Theo writes the equation “for the number of seedlings in each box” — that unknown is s.", rule: "Define the variable before solving.", skill: "Reading" },
      { type: "order", q: "Put Theo's solving steps in the correct order.",
        items: ["Write the equation 3s + 1 = 19", "Subtract 1 from both sides: 3s = 18", "Divide both sides by 3: s = 6", "Check the answer fits the story"],
        explain: "Write → undo the +1 → undo the ×3 → check. Two-step equations always undo + and − first.", rule: "Inverse operations in the right order.", skill: "Reading" },
      { type: "mcq", q: "“Sprout passes the safety check — but only just.” What does “only just” suggest?", options: ["The tank is far too big", "30 is only a little more than 29", "Sprout failed the check", "Ms Vale changed the rule"], answer: 1,
        explain: "The tank holds 30 litres and the rule needs more than 29 — a difference of just 1 litre. That's an inference: the text hints it without saying it.", rule: "Inference = read between the lines.", skill: "Reading" },
      { type: "mcq", q: "The word “capacity” in the story means…", options: ["the tank's colour", "how much the tank can hold", "the tank's weight", "the speed of the robot"], answer: 1,
        explain: "“The tank's capacity is exactly 30 litres” — it describes how much water fits inside.", rule: "Use context clues for new words.", skill: "Reading" },
      { type: "mcq", q: "What will Theo probably do when the seedlings grow?", options: ["Buy a bigger tank", "Remove all the plants", "Turn Sprout off", "Ignore the inequality"], answer: 0,
        explain: "He says: “I'll need a bigger tank” — the inequality warned him the water needed will grow past 30 litres.", rule: "Predict using evidence from the text.", skill: "Reading" }
    ]
  }
];

/* ------------------------------------------------------------
   PRACTICE_SETS — Quick Practice Zone (7 groups)
   ------------------------------------------------------------ */
const PRACTICE_SETS = [
  {
    id: "pr_detective", title: "Symbol Detective", icon: "🔎",
    blurb: "Spot coefficients, constants, terms — and tell expressions from equations.",
    badge: "symbol_detective",
    questions: [
      { type: "mcq", q: "In the expression 7n + 2, what is the coefficient of n?", options: ["2", "7", "n", "9"], answer: 1,
        explain: "The coefficient is the number multiplying the variable — that's 7.", rule: "Coefficient = the multiplier of the letter." },
      { type: "mcq", q: "In 4x + 9, which part is the constant?", options: ["4", "x", "9", "4x"], answer: 2,
        explain: "The constant is the plain number with no letter: 9.", rule: "Constant = number on its own." },
      { type: "mcq", q: "How many terms are in 4a + 3b − 7?", options: ["2", "3", "4", "7"], answer: 1,
        explain: "The terms are 4a, 3b and 7 — three building blocks separated by + and −.", rule: "Count the chunks between + and − signs." },
      { type: "sort", q: "Expression or equation? Sort them!", buckets: ["Expression", "Equation"],
        items: [{ t: "3k + 1", b: 0 }, { t: "3k + 1 = 13", b: 1 }, { t: "p − 5", b: 0 }, { t: "12 = y + 3", b: 1 }, { t: "m/4", b: 0 }, { t: "2y = 18", b: 1 }],
        explain: "Anything with an equals sign is an equation. No equals sign? Expression.", rule: "Equals sign = equation." },
      { type: "tf", q: "True or false? In 5n + 4, the number 4 is the coefficient.", answer: false,
        explain: "4 is the CONSTANT. The coefficient is 5 — it multiplies the variable n.", rule: "Coefficient multiplies; constant stands alone." },
      { type: "mcq", q: "Which expression is equivalent to 5n + 4?", options: ["4 + 5n", "5 + 4n", "9n", "5(n + 4)"], answer: 0,
        explain: "Addition works in any order, so 5n + 4 = 4 + 5n. The others change the value.", rule: "a + b = b + a (commutative law)." }
    ]
  },
  {
    id: "pr_builder", title: "Expression Builder", icon: "🏗️",
    blurb: "Turn words into algebra — tap the chips to build each expression.",
    badge: "expression_builder",
    questions: [
      { type: "build", q: "Build: “7 more than y”.", chunks: ["y", "+", "7"], answer: "y+7",
        explain: "Start with y and add 7: y + 7.", rule: "“More than” means add." },
      { type: "build", q: "Build: “4 times k”.", chunks: ["4", "k"], answer: "4k",
        explain: "4 × k is written 4k — number before letter, no × sign.", rule: "Write the number before the letter." },
      { type: "build", q: "Build: “3 less than twice m”.", chunks: ["2m", "−", "3"], answer: "2m−3",
        explain: "Twice m is 2m; “3 less than” takes 3 away: 2m − 3.", rule: "“Less than” subtracts FROM the other amount." },
      { type: "build", q: "Build: “w shared equally between 2”.", chunks: ["w", "/", "2"], answer: "w/2",
        explain: "Sharing means divide: w ÷ 2, written as the fraction w/2.", rule: "Write divides as fractions." },
      { type: "mcq", q: "Ted stores g photos on one memory card. How many photos fit on 3 cards?", options: ["g + 3", "3g", "g − 3", "g/3"], answer: 1,
        explain: "3 equal cards of g photos each → 3 × g = 3g.", rule: "Equal groups → multiply." },
      { type: "build", q: "Build: “the total of a and b”.", chunks: ["a", "+", "b"], answer: "a+b",
        explain: "A total means add: a + b.", rule: "“Total” and “sum” mean add." }
    ]
  },
  {
    id: "pr_simplify", title: "Simplify Challenge", icon: "🧹",
    blurb: "Collect like terms and write expressions in their shortest form.",
    badge: "simplify_star",
    questions: [
      { type: "fill", q: "Simplify: x + x + x + x = ▢ (type the answer, e.g. 5x)", answer: "4x", accept: ["4x", "4 x"],
        explain: "Four x's added together make 4x.", rule: "Repeated adding = multiplying." },
      { type: "mcq", q: "Simplify 7w − 4w.", options: ["3", "3w", "11w", "3w²"], answer: 1,
        explain: "7w and 4w are like terms: 7 − 4 = 3, keep the w → 3w.", rule: "Subtract the coefficients, keep the letter." },
      { type: "mcq", q: "Simplify 4p + 3q + 2p − q.", options: ["6p + 2q", "8pq", "6p + 3q", "6p − 2q"], answer: 0,
        explain: "p terms: 4p + 2p = 6p. q terms: 3q − q = 2q. Remember q = 1q!", rule: "Collect each letter family separately." },
      { type: "fill", q: "Simplify: 5t + 7 − 3t + 3 = ▢ (e.g. 4t+12)", answer: "2t+10", accept: ["2t+10", "2t + 10", "10+2t", "10 + 2t"],
        explain: "t terms: 5t − 3t = 2t. Constants: 7 + 3 = 10. Answer: 2t + 10.", rule: "Letters with letters, numbers with numbers." },
      { type: "mcq", q: "Which expression is already in its simplest form?", options: ["3a + 2b", "2a + 3a", "b × a", "1x + 5"], answer: 0,
        explain: "3a + 2b has no like terms to collect. The others simplify to 5a, ab and x + 5.", rule: "Simplest form = nothing left to collect or rewrite." },
      { type: "mcq", q: "Simplify 2ab + 3ba.", options: ["5ab", "5a²b²", "6ab", "2ab + 3ba"], answer: 0,
        explain: "ab and ba are the same term, so 2 + 3 = 5 → 5ab.", rule: "Letter order doesn't matter in a product." }
    ]
  },
  {
    id: "pr_fixer", title: "Equation Fixer", icon: "🔧",
    blurb: "Find the mistakes in this maths homework and fix them.",
    badge: null,
    questions: [
      { type: "mcq", q: "Milo wrote 4(x + 4) = 4x + 8. What should the answer be?", options: ["4x + 16", "4x + 4", "8x", "x + 16"], answer: 0,
        explain: "4 × 4 = 16, not 8. Milo doubled instead of multiplying by 4.", rule: "Multiply EVERY term inside the bracket." },
      { type: "mcq", q: "Sara expanded 2(6x − 3) and got 12x − 3. What is the correct answer?", options: ["12x − 6", "12x + 6", "8x − 3", "12x − 5"], answer: 0,
        explain: "The 2 multiplies the 3 too: 2 × 3 = 6, so the answer is 12x − 6.", rule: "The outside number multiplies both terms." },
      { type: "fill", q: "Fix Omar's slip: 8n − n = 8 ✗. The correct answer is ▢.", answer: "7n", accept: ["7n", "7 n"],
        explain: "n = 1n, so 8n − 1n = 7n.", rule: "A lonely letter has coefficient 1." },
      { type: "mcq", q: "Priya solved x − 6 = −2 and got x = −8. Where did she go wrong?",
        options: ["She should have ADDED 6 to both sides", "She should have subtracted 2", "She should have divided by 6", "Nothing — she is right"], answer: 0,
        explain: "To undo −6, add 6: x = −2 + 6 = 4. Priya subtracted 6 instead.", rule: "Use the INVERSE operation on both sides." },
      { type: "mcq", q: "Which line contains the FIRST mistake?\nLine 1: 2y + 4 = 16\nLine 2: 2y = 20\nLine 3: y = 10",
        options: ["Line 1", "Line 2", "Line 3", "No mistake"], answer: 1,
        explain: "Line 2 should be 2y = 16 − 4 = 12. The +4 must be SUBTRACTED. Correct solution: y = 6.", rule: "Undo +4 by subtracting 4 from both sides." },
      { type: "tf", q: "True or false? 3(2 − 5x) = 6 − 15x.", answer: true,
        explain: "3 × 2 = 6 and 3 × 5x = 15x, keeping the minus: 6 − 15x. This one is correct!", rule: "Keep each term's sign when you expand." }
    ]
  },
  {
    id: "pr_reading", title: "Reading Mission", icon: "📖",
    blurb: "Read the mini-text, then answer the questions.",
    badge: null,
    reading: {
      title: "The Class Aquarium",
      text: [
        "Class 7B keeps an aquarium with f fish. Nobody tells the new teacher, Mr Iqbal, exactly how many fish live inside — the fish keep hiding!",
        "Every morning, the fish monitor drops in 2 pellets of food per fish, so the fish eat 2f pellets in total.",
        "On Friday, Mr Iqbal finally counts the fish: there are 12. He smiles and works out 2 × 12 = 24 pellets.",
        "Next week, the class will add 5 baby fish. Then the aquarium will hold f + 5 fish, and breakfast will cost 2(f + 5) pellets."
      ]
    },
    questions: [
      { type: "mcq", q: "What does the expression 2f describe?", options: ["The number of fish", "The pellets eaten each morning", "The number of teachers", "The baby fish"], answer: 1,
        explain: "2 pellets per fish × f fish = 2f pellets each morning.", rule: "Match the expression to the story." },
      { type: "fill", q: "On Friday, f = 12. How many pellets do the fish eat? ▢", answer: "24", accept: ["24"],
        explain: "Substitute f = 12 into 2f: 2 × 12 = 24.", rule: "Substitute the value, then multiply." },
      { type: "mcq", q: "After the baby fish arrive, the aquarium holds…", options: ["5f fish", "f − 5 fish", "f + 5 fish", "2f fish"], answer: 2,
        explain: "Adding 5 fish to the f fish already there gives f + 5.", rule: "“Add” means +." },
      { type: "mcq", q: "Expand 2(f + 5) to find next week's breakfast expression.", options: ["2f + 5", "2f + 10", "f + 10", "7f"], answer: 1,
        explain: "2 × f = 2f AND 2 × 5 = 10, so 2(f + 5) = 2f + 10.", rule: "Multiply both terms inside the bracket." },
      { type: "tf", q: "True or false? With 12 old fish and 5 new fish, breakfast will need 34 pellets.", answer: true,
        explain: "f + 5 = 17 fish, and 2 × 17 = 34 pellets. You can also use 2f + 10 = 24 + 10 = 34 ✓", rule: "Both forms of the expression give the same value." }
    ]
  },
  {
    id: "pr_vocab", title: "Vocabulary Quest", icon: "🗺️",
    blurb: "Prove you know the key words of Unit 2!",
    badge: "vocab_explorer",
    questions: [
      { type: "match", q: "Match each word to its meaning.",
        left: ["coefficient", "constant", "variable", "solution"],
        right: ["the number multiplying the letter", "a number on its own", "a letter that can change value", "the value that makes an equation true"],
        explain: "Coefficient multiplies the variable; a constant stands alone; a variable varies; the solution solves the equation.",
        rule: "Learn word families: solve → solution." },
      { type: "mcq", q: "Riddle: “I am the number that multiplies the variable.” Who am I?", options: ["constant", "coefficient", "integer", "bracket"], answer: 1,
        explain: "That's the coefficient — like the 7 in 7n.", rule: "Coefficient = multiplier of the letter." },
      { type: "fill", q: "Complete the missing letters: in_qual_ty", answer: "inequality", accept: ["inequality"],
        explain: "i-n-e-q-u-a-l-i-t-y: “in” + “equality” — not equal!", rule: "Break long words into parts to spell them." },
      { type: "mcq", q: "Find the odd one out.", options: ["expand", "brackets", "multiply out", "solution"], answer: 3,
        explain: "Expand, brackets and multiply out all belong to bracket-work. A solution belongs to equations.", rule: "Group words by topic to spot the stranger." },
      { type: "sort", q: "Sort the words into their word families.", buckets: ["Expression words", "Equation words"],
        items: [{ t: "simplify", b: 0 }, { t: "solve", b: 1 }, { t: "like terms", b: 0 }, { t: "solution", b: 1 }, { t: "expand", b: 0 }, { t: "inverse operation", b: 1 }],
        explain: "You simplify/expand expressions and collect like terms; you solve equations using inverse operations to find solutions.",
        rule: "Expressions are simplified; equations are solved." },
      { type: "mcq", q: "Word hunt! Which sentence uses “substitute” correctly?",
        options: ["I substitute the bracket to make it bigger.", "I substitute k = 5 into 2k + 3 and get 13.", "I substitute the equals sign for fun.", "I substitute my homework into the bin."], answer: 1,
        explain: "Substituting means swapping a letter for a number and calculating: 2 × 5 + 3 = 13 ✓", rule: "Substitute = letter → number." }
    ]
  },
  {
    id: "pr_speed", title: "Speed Review", icon: "⚡",
    blurb: "A quick mixed set from the whole of Unit 2 — no timer, just focus!",
    badge: "practice_champion",
    questions: [
      { type: "mcq", q: "Sofia has a bag of n counters. She puts in 2 more. How many now?", options: ["n − 2", "2n", "n + 2", "n/2"], answer: 2,
        explain: "Putting in 2 more means adding: n + 2.", rule: "“More” → add." },
      { type: "fill", q: "Find 3k − 2 when k = 6. ▢", answer: "16", accept: ["16"],
        explain: "3 × 6 = 18 first, then 18 − 2 = 16.", rule: "Multiply before you subtract." },
      { type: "mcq", q: "Simplify 9b + 2c − 5b + c.", options: ["4b + 3c", "4b + 2c", "14b + 3c", "7bc"], answer: 0,
        explain: "b terms: 9b − 5b = 4b. c terms: 2c + 1c = 3c.", rule: "Collect each family separately." },
      { type: "mcq", q: "Expand 7(2g + 3).", options: ["14g + 3", "14g + 21", "9g + 10", "14g − 21"], answer: 1,
        explain: "7 × 2g = 14g and 7 × 3 = 21.", rule: "Multiply every term inside." },
      { type: "fill", q: "Solve 5x = 45. x = ▢", answer: "9", accept: ["9", "x=9", "x = 9"],
        explain: "Divide both sides by 5: x = 45 ÷ 5 = 9.", rule: "Undo × with ÷." },
      { type: "mcq", q: "What is the largest integer y could be if y < −2.5?", options: ["−2", "−3", "−2.5", "0"], answer: 1,
        explain: "y must be BELOW −2.5. The first integer below −2.5 is −3.", rule: "Go LEFT on the number line for “less than”." }
    ]
  }
];

/* ------------------------------------------------------------
   ACHIEVEMENTS — original badge system
   ------------------------------------------------------------ */
const ACHIEVEMENTS = [
  { id: "first_lesson", icon: "🎒", name: "First Lesson Complete", desc: "Finish your first lesson in the Learn section." },
  { id: "vocab_explorer", icon: "🧭", name: "Vocabulary Explorer", desc: "Complete the Vocabulary Quest practice set." },
  { id: "symbol_detective", icon: "🕵️", name: "Symbol Detective", desc: "Complete the Symbol Detective practice set." },
  { id: "expression_builder", icon: "🏗️", name: "Expression Builder", desc: "Complete the Expression Builder practice set." },
  { id: "simplify_star", icon: "🌟", name: "Simplify Star", desc: "Complete the Simplify Challenge practice set." },
  { id: "lab_scientist", icon: "🔬", name: "Lab Scientist", desc: "Complete three Algebra Lab stations." },
  { id: "reading_explorer", icon: "📚", name: "Reading Explorer", desc: "Finish all three reading levels." },
  { id: "practice_champion", icon: "🏅", name: "Practice Champion", desc: "Complete all seven Quick Practice sets." },
  { id: "test_starter", icon: "✏️", name: "Quiz Starter", desc: "Finish your first full quiz set." },
  { id: "algebra_star", icon: "⭐", name: "Algebra Star", desc: "Score 90% or more on any quiz set." },
  { id: "unit_master", icon: "👑", name: "Unit 2 Master", desc: "Complete every lesson AND score 75%+ on five quiz sets." }
];

/* Skill categories used across tests & practice for the breakdown */
const SKILLS = [
  "Writing Expressions",
  "Formulae & Substitution",
  "Collecting Like Terms",
  "Expanding Brackets",
  "Solving Equations",
  "Inequalities",
  "Reading & Vocabulary"
];
