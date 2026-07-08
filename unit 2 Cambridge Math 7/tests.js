/* ============================================================
   tests.js — Quiz Zone question bank
   Maths 7 · Unit 2: Expressions, Formulae & Equations
   Bright EngMath © 2026 — All questions are original.
   ------------------------------------------------------------
   10 quiz sets × 15 questions = 150 unique questions.
   Sets 1–7 focus on one topic each; sets 8–10 are mixed reviews
   of increasing difficulty.
   Every question has: id, set, skill, level, type, question data,
   explain (why the answer is right), rule (the maths rule), and
   mini → a NEW mini-practice question used in Mistake Review.
   Some questions include `passage` (short reading text shown
   above the question).
   To edit a question, find its id (e.g. S4Q07 = Quiz 4, question 7).
   ============================================================ */

const QUIZ_SETS = [
  {
    "id": "1",
    "icon": "🧩",
    "color": "sky",
    "name": "Quiz 1 · Building Expressions",
    "level": "Easy → Medium",
    "skillFocus": "Writing Expressions",
    "blurb": "Turn words into algebra: more than, less than, times, product and sum."
  },
  {
    "id": "2",
    "icon": "🔁",
    "color": "lav",
    "name": "Quiz 2 · Formulae & Substitution",
    "level": "Easy → Medium",
    "skillFocus": "Formulae & Substitution",
    "blurb": "Swap letters for numbers and use real formulae like d = 7w and V = IR."
  },
  {
    "id": "3",
    "icon": "🧹",
    "color": "mint",
    "name": "Quiz 3 · Collecting Like Terms",
    "level": "Easy → Medium",
    "skillFocus": "Collecting Like Terms",
    "blurb": "Simplify expressions by collecting the terms that belong together."
  },
  {
    "id": "4",
    "icon": "💥",
    "color": "peach",
    "name": "Quiz 4 · Expanding Brackets",
    "level": "Easy → Medium",
    "skillFocus": "Expanding Brackets",
    "blurb": "Multiply out brackets — and dodge the classic bracket traps."
  },
  {
    "id": "5",
    "icon": "🔓",
    "color": "sun",
    "name": "Quiz 5 · Solving Equations",
    "level": "Easy → Medium",
    "skillFocus": "Solving Equations",
    "blurb": "One-step and two-step equations, stories and balance moves."
  },
  {
    "id": "6",
    "icon": "📏",
    "color": "coral",
    "name": "Quiz 6 · Inequalities",
    "level": "Easy → Medium",
    "skillFocus": "Inequalities",
    "blurb": "Read <, >, number lines, smallest and largest integers."
  },
  {
    "id": "7",
    "icon": "📖",
    "color": "sky",
    "name": "Quiz 7 · Reading & Vocabulary",
    "level": "Mixed",
    "skillFocus": "Reading & Vocabulary",
    "blurb": "Maths stories, key words and meaning in context."
  },
  {
    "id": "8",
    "icon": "🌱",
    "color": "mint",
    "name": "Quiz 8 · Mixed Review I",
    "level": "Easy",
    "skillFocus": null,
    "blurb": "A gentle mix of every Unit 2 topic — perfect first revision."
  },
  {
    "id": "9",
    "icon": "🌿",
    "color": "lav",
    "name": "Quiz 9 · Mixed Review II",
    "level": "Medium",
    "skillFocus": null,
    "blurb": "School-test style mix: two-step thinking across all topics."
  },
  {
    "id": "10",
    "icon": "🏆",
    "color": "coral",
    "name": "Quiz 10 · Final Challenge",
    "level": "Challenging",
    "skillFocus": null,
    "blurb": "The boss level: multi-step problems, negatives and inference."
  }
];

const QUESTIONS = [
{
  "id": "S1Q01",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "Which of these is an EXPRESSION (not an equation)?",
  "options": [
    "2x + 5",
    "2x + 5 = 9",
    "x = 4",
    "10 = y − 1"
  ],
  "answer": 0,
  "explain": "2x + 5 has no equals sign, so it is an expression. The other three all contain =, which makes them equations.",
  "rule": "Expression = no equals sign. Equation = has an equals sign.",
  "mini": {
    "type": "tf",
    "q": "True or false? 3m − 1 is an expression.",
    "answer": true,
    "explain": "No equals sign → it is an expression."
  }
},

{
  "id": "S1Q02",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "Amir has n stickers. He gets 6 more. Which expression shows how many stickers Amir has now?",
  "options": [
    "n − 6",
    "6n",
    "n + 6",
    "6 − n"
  ],
  "answer": 2,
  "explain": "“Gets 6 more” means add 6 to the n stickers he already has: n + 6.",
  "rule": "“More” tells you to add.",
  "mini": {
    "type": "mcq",
    "q": "Pia has p pencils and loses 2. Expression?",
    "options": [
      "p + 2",
      "p − 2",
      "2p",
      "2 − p"
    ],
    "answer": 1,
    "explain": "Losing 2 means subtracting 2 from p: p − 2."
  }
},

{
  "id": "S1Q03",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "build",
  "q": "Tap the chips to build: “5 times h”.",
  "chunks": [
    "5",
    "h"
  ],
  "answer": "5h",
  "explain": "5 × h is written as 5h — the number always goes before the letter, with no × sign.",
  "rule": "Write the number before the letter.",
  "mini": {
    "type": "mcq",
    "q": "How do we write 3 × w in algebra?",
    "options": [
      "w3",
      "3w",
      "w + 3",
      "3 + w"
    ],
    "answer": 1,
    "explain": "3 × w = 3w. Number first, then the letter."
  }
},

{
  "id": "S1Q04",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "Which expression means “half of m”?",
  "options": [
    "2m",
    "m − 2",
    "m/2",
    "2/m"
  ],
  "answer": 2,
  "explain": "Half means divide by 2, and m ÷ 2 is written as the fraction m/2.",
  "rule": "“Half” = divide by 2; write divides as fractions.",
  "mini": {
    "type": "fill",
    "q": "Write “m divided by 4” as a fraction. ▢",
    "answer": "m/4",
    "accept": [
      "m/4",
      "m ÷ 4",
      "m÷4"
    ],
    "explain": "m ÷ 4 is written m/4."
  }
},

{
  "id": "S1Q05",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "Which expression means “3 less than twice m”?",
  "options": [
    "3 − 2m",
    "2m − 3",
    "2(m − 3)",
    "3m − 2"
  ],
  "answer": 1,
  "explain": "Twice m is 2m. “3 less than” means take 3 away FROM 2m: 2m − 3. Option A is the wrong way round!",
  "rule": "“a less than B” = B − a.",
  "mini": {
    "type": "build",
    "q": "Build: “1 more than twice k”.",
    "chunks": [
      "2k",
      "+",
      "1"
    ],
    "answer": "2k+1",
    "explain": "Twice k is 2k, then add 1: 2k + 1."
  }
},

{
  "id": "S1Q06",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "build",
  "q": "Tacos cost $t each and juice costs $j. Build the total cost of 2 tacos and 1 juice.",
  "chunks": [
    "2t",
    "+",
    "j"
  ],
  "answer": "2t+j",
  "explain": "Two tacos cost 2 × t = 2t, plus one juice j: 2t + j.",
  "rule": "Multiply price by how many, then add the totals.",
  "mini": {
    "type": "mcq",
    "q": "Pens cost $p each. Cost of 3 pens?",
    "options": [
      "p + 3",
      "3p",
      "p/3",
      "3 − p"
    ],
    "answer": 1,
    "explain": "3 pens at $p each cost 3 × p = 3p."
  }
},

{
  "id": "S1Q07",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "Nia is m years old and Ravi is r years old. Which expression shows the TOTAL of their ages?",
  "options": [
    "mr",
    "m − r",
    "m + r",
    "2mr"
  ],
  "answer": 2,
  "explain": "A total means ADD the two ages: m + r. Writing mr would MULTIPLY them — a classic mistake!",
  "rule": "“Total” always means add, never multiply.",
  "mini": {
    "type": "mcq",
    "q": "Jo is x years old; her younger brother is y years old. The difference in their ages is…",
    "options": [
      "x + y",
      "x − y",
      "xy",
      "y − x"
    ],
    "answer": 1,
    "explain": "Difference = bigger − smaller = x − y (Jo is older)."
  }
},

{
  "id": "S1Q08",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "Which expression is NOT equivalent to 2n + 3?",
  "options": [
    "3 + 2n",
    "2 × n + 3",
    "n + n + 3",
    "2(n + 3)"
  ],
  "answer": 3,
  "explain": "2(n + 3) expands to 2n + 6 — a different expression. The other three are all the same as 2n + 3.",
  "rule": "Test equivalence by expanding or substituting a number.",
  "mini": {
    "type": "tf",
    "q": "True or false? 5n + 4 and 4 + 5n are equivalent.",
    "answer": true,
    "explain": "Addition works in any order, so they are equivalent."
  }
},

{
  "id": "S1Q09",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "hard",
  "type": "mcq",
  "q": "A green rectangle has width x cm and length SIX times its width. A blue rectangle has width y cm and length 3 cm MORE than twice its width. Which expression gives the difference between the two lengths (green − blue)?",
  "options": [
    "6x − 2y + 3",
    "6x − 2y − 3",
    "4x − y − 3",
    "6x + 2y − 3"
  ],
  "answer": 1,
  "explain": "Green length = 6x. Blue length = 2y + 3. Difference: 6x − (2y + 3) = 6x − 2y − 3 — subtracting the bracket flips BOTH signs.",
  "rule": "Subtracting a whole expression subtracts every term of it.",
  "mini": {
    "type": "mcq",
    "q": "The blue rectangle's length is 2y + 3. Find it when y = 5.",
    "options": [
      "13",
      "10",
      "16",
      "28"
    ],
    "answer": 0,
    "explain": "2 × 5 + 3 = 13."
  }
},

{
  "id": "S1Q10",
  "set": "1",
  "skill": "Writing Expressions",
  "level": "hard",
  "type": "mcq",
  "q": "Six gold coins are each worth g dollars. Their total value is DOUBLED in a bonus round. Which expression shows the new value?",
  "options": [
    "6g + 2",
    "8g",
    "12g",
    "62g"
  ],
  "answer": 2,
  "explain": "Six coins are worth 6g. Doubling multiplies by 2: 2 × 6g = 12g.",
  "rule": "“Doubled” means × 2 — applied to the WHOLE amount.",
  "mini": {
    "type": "fill",
    "q": "Five silver coins worth s dollars each are TRIPLED. New value = ▢ (e.g. 9s)",
    "answer": "15s",
    "accept": [
      "15s",
      "15 s"
    ],
    "explain": "3 × 5s = 15s."
  }
},

{
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "A box holds e eggs. How many eggs are in 4 boxes?",
  "options": [
    "e + 4",
    "4e",
    "e − 4",
    "e/4"
  ],
  "answer": 1,
  "explain": "4 equal boxes of e eggs each is 4 × e, written 4e.",
  "rule": "Equal groups → multiply.",
  "mini": {
    "type": "mcq",
    "q": "How many eggs are in 6 boxes of e eggs?",
    "options": [
      "6e",
      "e + 6",
      "e6",
      "6/e"
    ],
    "answer": 0,
    "explain": "6 × e = 6e."
  },
  "id": "S1Q11"
},

{
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "build",
  "q": "Tap the chips to build: “9 less than w”.",
  "chunks": [
    "w",
    "−",
    "9"
  ],
  "answer": "w−9",
  "explain": "“9 less than w” starts from w and takes 9 away: w − 9.",
  "rule": "“a less than B” means B − a.",
  "mini": {
    "type": "mcq",
    "q": "Which expression means “w less than 9”?",
    "options": [
      "w − 9",
      "9 − w",
      "9w",
      "w + 9"
    ],
    "answer": 1,
    "explain": "This time we start from 9 and take w away: 9 − w."
  },
  "id": "S1Q12"
},

{
  "set": "1",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "Tom is t years old. His sister is 5 years OLDER than Tom. How old is his sister?",
  "options": [
    "t − 5",
    "5t",
    "t + 5",
    "5 − t"
  ],
  "answer": 2,
  "explain": "Older means more years, so add 5 to Tom's age: t + 5.",
  "rule": "“Older” → add; “younger” → subtract.",
  "mini": {
    "type": "mcq",
    "q": "Tom's brother is 2 years YOUNGER. His age?",
    "options": [
      "t + 2",
      "t − 2",
      "2t",
      "2 − t"
    ],
    "answer": 1,
    "explain": "Younger means fewer years: t − 2."
  },
  "id": "S1Q13"
},

{
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "Which expression shows “the product of a and b”?",
  "options": [
    "a + b",
    "a − b",
    "ab",
    "a/b"
  ],
  "answer": 2,
  "explain": "A product is the answer to a multiplication: a × b, written ab.",
  "rule": "product → ×, sum → +, difference → −, quotient → ÷.",
  "mini": {
    "type": "tf",
    "q": "True or false? “Sum” means multiply.",
    "answer": false,
    "explain": "A sum is the answer to an ADDITION. A product comes from multiplying."
  },
  "id": "S1Q14"
},

{
  "set": "1",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "fill",
  "q": "Write an expression for “k increased by 12”. ▢",
  "answer": "k+12",
  "accept": [
    "k+12",
    "k + 12",
    "12+k",
    "12 + k"
  ],
  "explain": "“Increased by 12” means add 12: k + 12.",
  "rule": "increase → add; decrease → subtract.",
  "mini": {
    "type": "mcq",
    "q": "Which shows “m decreased by 7”?",
    "options": [
      "m + 7",
      "7 − m",
      "m − 7",
      "7m"
    ],
    "answer": 2,
    "explain": "Decreased by 7 means subtract 7 from m."
  },
  "id": "S1Q15"
},

{
  "id": "S2Q01",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "mcq",
  "q": "Find the value of x + 7 when x = 6.",
  "options": [
    "1",
    "13",
    "67",
    "42"
  ],
  "answer": 1,
  "explain": "Substitute 6 for x: 6 + 7 = 13.",
  "rule": "Substitute = swap the letter for its number, then calculate.",
  "mini": {
    "type": "fill",
    "q": "Find x + 5 when x = 9. ▢",
    "answer": "14",
    "accept": [
      "14"
    ],
    "explain": "9 + 5 = 14."
  }
},

{
  "id": "S2Q02",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "mcq",
  "q": "Find the value of 4n when n = 3.",
  "options": [
    "43",
    "7",
    "12",
    "34"
  ],
  "answer": 2,
  "explain": "4n means 4 × n = 4 × 3 = 12. Writing “43” is the digits-stuck-together trap!",
  "rule": "A number next to a letter always means multiply.",
  "mini": {
    "type": "mcq",
    "q": "Find 5k when k = 2.",
    "options": [
      "52",
      "10",
      "7",
      "25"
    ],
    "answer": 1,
    "explain": "5 × 2 = 10."
  }
},

{
  "id": "S2Q03",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "fill",
  "q": "Find the value of p − q when p = 15 and q = 9. ▢",
  "answer": "6",
  "accept": [
    "6"
  ],
  "explain": "Substitute both letters: 15 − 9 = 6.",
  "rule": "Substitute each letter with its own number.",
  "mini": {
    "type": "mcq",
    "q": "Find a − b when a = 10 and b = 4.",
    "options": [
      "14",
      "6",
      "40",
      "4"
    ],
    "answer": 1,
    "explain": "10 − 4 = 6."
  }
},

{
  "id": "S2Q04",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "mcq",
  "q": "Which formula shows the number of days (d) in any number of weeks (w)?",
  "options": [
    "d = w + 7",
    "d = 7w",
    "w = 7d",
    "d = w/7"
  ],
  "answer": 1,
  "explain": "Every week has 7 days, so multiply the weeks by 7: d = 7w. For 2 weeks: d = 14 ✓",
  "rule": "A formula is a rule connecting two quantities.",
  "mini": {
    "type": "tf",
    "q": "True or false? m = 60h gives the minutes in h hours.",
    "answer": true,
    "explain": "1 hour = 60 minutes, so multiply hours by 60."
  }
},

{
  "id": "S2Q05",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "fill",
  "q": "Find the value of 2h + 3t when h = 8 and t = 5. ▢",
  "answer": "31",
  "accept": [
    "31"
  ],
  "explain": "2 × 8 = 16 and 3 × 5 = 15, then 16 + 15 = 31. Multiply BOTH parts before adding.",
  "rule": "Multiplication before addition.",
  "mini": {
    "type": "mcq",
    "q": "Find 3a + 2b when a = 4 and b = 3.",
    "options": [
      "18",
      "21",
      "17",
      "12"
    ],
    "answer": 0,
    "explain": "3 × 4 = 12 and 2 × 3 = 6, then 12 + 6 = 18."
  }
},

{
  "id": "S2Q06",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "Jan uses the formula M = P − E to find his money left, where P is pay and E is expenses. Find M when P = $178 and E = $36.",
  "options": [
    "$214",
    "$142",
    "$152",
    "$132"
  ],
  "answer": 1,
  "explain": "Substitute into the formula: M = 178 − 36 = 142.",
  "rule": "Replace each letter with its value, then calculate.",
  "mini": {
    "type": "fill",
    "q": "Find M = P − E when P = 225 and E = 72. ▢",
    "answer": "153",
    "accept": [
      "153",
      "$153"
    ],
    "explain": "225 − 72 = 153."
  }
},

{
  "id": "S2Q07",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "A gardener is paid $8 for every hour of work. Which formula gives the total pay T for h hours?",
  "options": [
    "T = h + 8",
    "T = 8h",
    "h = 8T",
    "T = 8/h"
  ],
  "answer": 1,
  "explain": "Pay = 8 dollars × hours worked, so T = 8h. For 3 hours: T = 24 ✓",
  "rule": "Rate × amount = total; write it with letters.",
  "mini": {
    "type": "mcq",
    "q": "Books cost $p each. Formula for the cost C of n books?",
    "options": [
      "C = p + n",
      "C = pn",
      "C = p − n",
      "n = Cp"
    ],
    "answer": 1,
    "explain": "Cost = price × number: C = pn."
  }
},

{
  "id": "S2Q08",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "The science formula V = IR connects voltage, current and resistance. Work out I when V = 30 and R = 6.",
  "options": [
    "I = 180",
    "I = 24",
    "I = 5",
    "I = 36"
  ],
  "answer": 2,
  "explain": "V = IR means 30 = I × 6. Use the inverse: I = 30 ÷ 6 = 5.",
  "rule": "Use inverse operations to find a hidden value in a formula.",
  "mini": {
    "type": "fill",
    "q": "V = IR. Find R when V = 40 and I = 5. ▢",
    "answer": "8",
    "accept": [
      "8",
      "r=8",
      "R=8",
      "R = 8"
    ],
    "explain": "40 = 5 × R, so R = 40 ÷ 5 = 8."
  }
},

{
  "id": "S2Q09",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "hard",
  "type": "mcq",
  "q": "Find the value of 30/c − 2 when c = 6.",
  "options": [
    "3",
    "5",
    "7",
    "28"
  ],
  "answer": 0,
  "explain": "30 ÷ 6 = 5 first (division before subtraction), then 5 − 2 = 3.",
  "rule": "Divide before you subtract.",
  "mini": {
    "type": "mcq",
    "q": "Find 18/b + 1 when b = 3.",
    "options": [
      "7",
      "6",
      "19",
      "9"
    ],
    "answer": 0,
    "explain": "18 ÷ 3 = 6, then 6 + 1 = 7."
  }
},

{
  "id": "S2Q10",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "hard",
  "type": "fill",
  "q": "Find the value of 2w − 3v when w = 12 and v = 5. ▢",
  "answer": "9",
  "accept": [
    "9"
  ],
  "explain": "2 × 12 = 24 and 3 × 5 = 15, then 24 − 15 = 9.",
  "rule": "Do both multiplications before subtracting.",
  "mini": {
    "type": "mcq",
    "q": "Find 3a − 2b when a = 6 and b = 4.",
    "options": [
      "10",
      "26",
      "2",
      "14"
    ],
    "answer": 0,
    "explain": "18 − 8 = 10."
  }
},

{
  "id": "S2Q11",
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "hard",
  "type": "mcq",
  "q": "The area of a square is given by the formula A = s². Find A when s = 7.",
  "options": [
    "14",
    "28",
    "49",
    "77"
  ],
  "answer": 2,
  "explain": "s² means s × s = 7 × 7 = 49. (Not 7 × 2 — that's the doubling trap!)",
  "rule": "A power of 2 means multiply the number by ITSELF.",
  "mini": {
    "type": "fill",
    "q": "Find a² when a = 5. ▢",
    "answer": "25",
    "accept": [
      "25"
    ],
    "explain": "5 × 5 = 25."
  }
},

{
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "A smoothie shop uses the formula C = 4p + 2 for the cost of p fruit pots plus delivery. Find C when p = 5.",
  "options": [
    "22",
    "26",
    "11",
    "42"
  ],
  "answer": 0,
  "explain": "4 × 5 = 20 first, then 20 + 2 = 22.",
  "rule": "Multiply before you add.",
  "mini": {
    "type": "fill",
    "q": "Use C = 4p + 2 to find C when p = 3. ▢",
    "answer": "14",
    "accept": [
      "14"
    ],
    "explain": "4 × 3 = 12, then 12 + 2 = 14."
  },
  "id": "S2Q12"
},

{
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "fill",
  "q": "The perimeter of a rectangle is P = 2l + 2w. Find P when l = 7 and w = 4. ▢",
  "answer": "22",
  "accept": [
    "22"
  ],
  "explain": "2 × 7 = 14 and 2 × 4 = 8, then 14 + 8 = 22.",
  "rule": "Substitute each letter, multiply, then add.",
  "mini": {
    "type": "mcq",
    "q": "Find P = 2l + 2w when l = 5 and w = 3.",
    "options": [
      "16",
      "15",
      "13",
      "30"
    ],
    "answer": 0,
    "explain": "10 + 6 = 16."
  },
  "id": "S2Q13"
},

{
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "Find the value of t/3 + 4 when t = 12.",
  "options": [
    "8",
    "16/3",
    "7",
    "48"
  ],
  "answer": 0,
  "explain": "12 ÷ 3 = 4 first, then 4 + 4 = 8.",
  "rule": "Divide before you add.",
  "mini": {
    "type": "mcq",
    "q": "Find t/3 + 4 when t = 6.",
    "options": [
      "6",
      "10",
      "2",
      "18"
    ],
    "answer": 0,
    "explain": "6 ÷ 3 = 2, then 2 + 4 = 6."
  },
  "id": "S2Q14"
},

{
  "set": "2",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "mcq",
  "q": "A spider has 8 legs. Which formula gives the total legs L of s spiders?",
  "options": [
    "L = s + 8",
    "L = 8s",
    "s = 8L",
    "L = 8/s"
  ],
  "answer": 1,
  "explain": "8 legs for EVERY spider means multiply: L = 8s. For 2 spiders, L = 16 ✓",
  "rule": "“Each” or “every” → multiply.",
  "mini": {
    "type": "tf",
    "q": "True or false? L = s + 8 would give 10 legs for 2 spiders.",
    "answer": true,
    "explain": "2 + 8 = 10 — which is wrong for spiders! That's why the formula must be L = 8s."
  },
  "id": "S2Q15"
},

{
  "id": "S3Q01",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "mcq",
  "q": "Simplify 2x + 3x.",
  "options": [
    "5x",
    "6x",
    "5x²",
    "5"
  ],
  "answer": 0,
  "explain": "2x and 3x are like terms. Add the coefficients: 2 + 3 = 5, keep the x → 5x.",
  "rule": "Add the coefficients of like terms; the letter stays the same.",
  "mini": {
    "type": "fill",
    "q": "Simplify 6a + 2a. ▢",
    "answer": "8a",
    "accept": [
      "8a",
      "8 a"
    ],
    "explain": "6 + 2 = 8, keep the a: 8a."
  }
},

{
  "id": "S3Q02",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "fill",
  "q": "Simplify 7y − 2y. ▢",
  "answer": "5y",
  "accept": [
    "5y",
    "5 y"
  ],
  "explain": "7y and 2y are like terms: 7 − 2 = 5, keep the y → 5y.",
  "rule": "Subtract the coefficients; keep the letter.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 9t − 3t.",
    "options": [
      "6",
      "6t",
      "12t",
      "3t"
    ],
    "answer": 1,
    "explain": "9 − 3 = 6, keep the t: 6t."
  }
},

{
  "id": "S3Q03",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "mcq",
  "q": "Which term is a LIKE term with 3a?",
  "options": [
    "3b",
    "5a",
    "a²",
    "3ab"
  ],
  "answer": 1,
  "explain": "5a has exactly the same letter part (a) as 3a. Different letters or powers make different families.",
  "rule": "Like terms: same letter, same power.",
  "mini": {
    "type": "tf",
    "q": "True or false? 2x and 2y are like terms.",
    "answer": false,
    "explain": "The letters are different, so they are unlike terms."
  }
},

{
  "id": "S3Q04",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "tf",
  "q": "True or false? 8x + 4 simplifies to 12x.",
  "answer": false,
  "explain": "8x has a letter and 4 does not — they are unlike terms, so 8x + 4 cannot be combined.",
  "rule": "A letter term and a plain number never merge.",
  "mini": {
    "type": "mcq",
    "q": "What is the simplest form of 8x + 4?",
    "options": [
      "12x",
      "8x + 4 (it is already simplest)",
      "12",
      "32x"
    ],
    "answer": 1,
    "explain": "There are no like terms to collect, so it is already in simplest form."
  }
},

{
  "id": "S3Q05",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 6m − 2m + 7n − 3n.",
  "options": [
    "4m + 4n",
    "8mn",
    "4m − 4n",
    "4m + 10n"
  ],
  "answer": 0,
  "explain": "m terms: 6m − 2m = 4m. n terms: 7n − 3n = 4n. Answer: 4m + 4n.",
  "rule": "Collect each letter family separately.",
  "mini": {
    "type": "fill",
    "q": "Simplify 5x + 2y − 3x. ▢ (e.g. 4x+3y)",
    "answer": "2x+2y",
    "accept": [
      "2x+2y",
      "2x + 2y",
      "2y+2x",
      "2y + 2x"
    ],
    "explain": "5x − 3x = 2x; the 2y stays: 2x + 2y."
  }
},

{
  "id": "S3Q06",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 12 + 6h + 8k − 6 − 3h − 3k.",
  "options": [
    "3h + 5k + 6",
    "9h + 5k + 6",
    "3h + 5k − 6",
    "14hk"
  ],
  "answer": 0,
  "explain": "h terms: 6h − 3h = 3h. k terms: 8k − 3k = 5k. Constants: 12 − 6 = 6. Answer: 3h + 5k + 6.",
  "rule": "Three families here: h terms, k terms and constants.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 4t + 1 + 3t + 9.",
    "options": [
      "7t + 10",
      "17t",
      "7t + 8",
      "12t + 5"
    ],
    "answer": 0,
    "explain": "4t + 3t = 7t and 1 + 9 = 10."
  }
},

{
  "id": "S3Q07",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 4st + 5ts.",
  "options": [
    "9st",
    "9s²t²",
    "20st",
    "It cannot be simplified"
  ],
  "answer": 0,
  "explain": "st and ts contain the same letters, so they are like terms: 4 + 5 = 9 → 9st.",
  "rule": "Letter order doesn't matter: st = ts.",
  "mini": {
    "type": "tf",
    "q": "True or false? xy and yx are like terms.",
    "answer": true,
    "explain": "Same letters, just swapped — they collect together."
  }
},

{
  "id": "S3Q08",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "In an algebra pyramid, each block is the SUM of the two blocks below it. What goes above 3x and 5x?",
  "options": [
    "15x",
    "8x",
    "2x",
    "8x²"
  ],
  "answer": 1,
  "explain": "Add the two blocks: 3x + 5x = 8x. (Multiplying would give 15x² — pyramids ADD!)",
  "rule": "Pyramid rule: top block = sum of the two below.",
  "mini": {
    "type": "mcq",
    "q": "What goes above 7p and 2p?",
    "options": [
      "9p",
      "14p",
      "5p",
      "9"
    ],
    "answer": 0,
    "explain": "7p + 2p = 9p."
  }
},

{
  "id": "S3Q09",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "multi",
  "q": "Select ALL the terms that are like terms with 5pq.",
  "options": [
    "qp",
    "5p",
    "−3pq",
    "pq²",
    "2qp"
  ],
  "answers": [
    0,
    2,
    4
  ],
  "explain": "qp, −3pq and 2qp all contain exactly the letters p and q. 5p is missing the q, and pq² has an extra power of q.",
  "rule": "Like terms need exactly the same letters and powers — order doesn't matter.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 4mn − 3nm.",
    "options": [
      "mn",
      "7mn",
      "m²n²",
      "1"
    ],
    "answer": 0,
    "explain": "nm = mn, so 4mn − 3mn = 1mn = mn."
  }
},

{
  "id": "S3Q10",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "mcq",
  "q": "Simplify a/2 + 5a/8.",
  "options": [
    "9a/8",
    "6a/10",
    "5a/16",
    "9a/16"
  ],
  "answer": 0,
  "explain": "Use a common denominator of 8: a/2 = 4a/8. Then 4a/8 + 5a/8 = 9a/8.",
  "rule": "Fraction terms collect just like whole-number terms — match the denominators first.",
  "mini": {
    "type": "mcq",
    "q": "Simplify y/2 − y/6.",
    "options": [
      "y/3",
      "y/4",
      "2y/6 is wrong",
      "y/12"
    ],
    "answer": 0,
    "explain": "y/2 = 3y/6, so 3y/6 − y/6 = 2y/6 = y/3."
  }
},

{
  "id": "S3Q11",
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "mcq",
  "q": "Simplify 6fj + 2jf − 3fj.",
  "options": [
    "5fj",
    "5f²j²",
    "11fj",
    "It cannot be simplified"
  ],
  "answer": 0,
  "explain": "jf is the same term as fj. So 6fj + 2fj − 3fj = 5fj — even with unfamiliar letters, the rule works!",
  "rule": "Apply the like-terms rule to ANY letters, even new ones.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 4qp + 3pq.",
    "options": [
      "7pq",
      "12pq",
      "7p²q²",
      "1pq"
    ],
    "answer": 0,
    "explain": "qp = pq, so 4 + 3 = 7 → 7pq."
  }
},

{
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "mcq",
  "q": "Simplify 10u − u − 2u.",
  "options": [
    "7u",
    "8u",
    "7",
    "10u"
  ],
  "answer": 0,
  "explain": "u means 1u, so 10 − 1 − 2 = 7 → 7u.",
  "rule": "A lonely letter has a hidden coefficient of 1.",
  "mini": {
    "type": "fill",
    "q": "Simplify 6v − v. ▢",
    "answer": "5v",
    "accept": [
      "5v",
      "5 v"
    ],
    "explain": "6v − 1v = 5v."
  },
  "id": "S3Q12"
},

{
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 3x + 2y + x + 5y.",
  "options": [
    "4x + 7y",
    "11xy",
    "3x + 7y",
    "4x + 5y"
  ],
  "answer": 0,
  "explain": "x terms: 3x + 1x = 4x. y terms: 2y + 5y = 7y.",
  "rule": "Collect each letter family separately.",
  "mini": {
    "type": "fill",
    "q": "Simplify 2a + b + a. ▢ (e.g. 5a+2b)",
    "answer": "3a+b",
    "accept": [
      "3a+b",
      "3a + b",
      "b+3a",
      "b + 3a"
    ],
    "explain": "2a + 1a = 3a; the b stays: 3a + b."
  },
  "id": "S3Q13"
},

{
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "tf",
  "q": "True or false? 7p − 7 simplifies to p.",
  "answer": false,
  "explain": "7p and 7 are NOT like terms (one has a letter, one doesn't), so 7p − 7 cannot be simplified at all.",
  "rule": "Only like terms can be combined.",
  "mini": {
    "type": "mcq",
    "q": "What is the simplest form of 7p − 7?",
    "options": [
      "p",
      "0",
      "7p − 7 (already simplest)",
      "−7p"
    ],
    "answer": 2,
    "explain": "Nothing can be collected — it is already in simplest form."
  },
  "id": "S3Q14"
},

{
  "set": "3",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "mcq",
  "q": "In an algebra pyramid, each block is the SUM of the two below. What goes above (2a + 3) and (a + 4)?",
  "options": [
    "3a + 7",
    "2a + 7",
    "3a + 12",
    "2a² + 12"
  ],
  "answer": 0,
  "explain": "Add everything: 2a + a = 3a and 3 + 4 = 7 → 3a + 7.",
  "rule": "Add the letter terms and the constants separately.",
  "mini": {
    "type": "mcq",
    "q": "What goes above (4b + 1) and (b + 2)?",
    "options": [
      "5b + 3",
      "4b + 3",
      "5b + 2",
      "6b"
    ],
    "answer": 0,
    "explain": "4b + b = 5b and 1 + 2 = 3."
  },
  "id": "S3Q15"
},

{
  "id": "S4Q01",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "mcq",
  "q": "Expand 2(x + 3).",
  "options": [
    "2x + 3",
    "2x + 6",
    "x + 6",
    "5x"
  ],
  "answer": 1,
  "explain": "Multiply BOTH terms by 2: 2 × x = 2x and 2 × 3 = 6 → 2x + 6.",
  "rule": "The outside number multiplies every term inside.",
  "mini": {
    "type": "fill",
    "q": "Expand: 3(x + 2) = 3x + ▢",
    "answer": "6",
    "accept": [
      "6"
    ],
    "explain": "3 × 2 = 6."
  }
},

{
  "id": "S4Q02",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "mcq",
  "q": "Expand 4(y − 1).",
  "options": [
    "4y − 1",
    "4y + 4",
    "4y − 4",
    "3y"
  ],
  "answer": 2,
  "explain": "4 × y = 4y and 4 × 1 = 4, keeping the minus: 4y − 4.",
  "rule": "Keep the minus sign when you expand.",
  "mini": {
    "type": "tf",
    "q": "True or false? 5(z − 2) = 5z − 10.",
    "answer": true,
    "explain": "5 × z = 5z and 5 × 2 = 10, with the minus kept: 5z − 10 ✓"
  }
},

{
  "id": "S4Q03",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "fill",
  "q": "Expand: 6(2 + f) = 12 + ▢  (type the missing term)",
  "answer": "6f",
  "accept": [
    "6f",
    "6 f"
  ],
  "explain": "6 × 2 = 12 and 6 × f = 6f, so 6(2 + f) = 12 + 6f.",
  "rule": "Multiply the letter term too, not just the number.",
  "mini": {
    "type": "mcq",
    "q": "Expand 2(4 + g).",
    "options": [
      "8 + g",
      "8 + 2g",
      "6 + 2g",
      "2g + 4"
    ],
    "answer": 1,
    "explain": "2 × 4 = 8 and 2 × g = 2g."
  }
},

{
  "id": "S4Q04",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Expand 5(3y − 2).",
  "options": [
    "15y − 2",
    "15y − 10",
    "8y − 7",
    "15y + 10"
  ],
  "answer": 1,
  "explain": "5 × 3y = 15y and 5 × 2 = 10, keeping the minus: 15y − 10.",
  "rule": "Multiply the coefficient too: 5 × 3y = 15y.",
  "mini": {
    "type": "mcq",
    "q": "Expand 4(2x − 1).",
    "options": [
      "8x − 1",
      "8x − 4",
      "6x − 4",
      "8x + 4"
    ],
    "answer": 1,
    "explain": "4 × 2x = 8x and 4 × 1 = 4, minus kept: 8x − 4."
  }
},

{
  "id": "S4Q05",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Bo expanded 2(6x − 3) and wrote 12x − 3. What is the CORRECT expansion?",
  "options": [
    "12x − 6",
    "12x + 6",
    "8x − 6",
    "12x − 5"
  ],
  "answer": 0,
  "explain": "Bo forgot to multiply the second term: 2 × 3 = 6. Correct answer: 12x − 6.",
  "rule": "EVERY term inside the bracket gets multiplied.",
  "mini": {
    "type": "mcq",
    "q": "Expand 3(2 − 5x).",
    "options": [
      "6 + 15x",
      "6 − 15x",
      "6 − 5x",
      "−15x"
    ],
    "answer": 1,
    "explain": "3 × 2 = 6 and 3 × 5x = 15x with the minus: 6 − 15x."
  }
},

{
  "id": "S4Q06",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Expand and simplify 12 + 3(2x − 3).",
  "options": [
    "6x + 3",
    "6x + 9",
    "30x − 45",
    "6x − 3"
  ],
  "answer": 0,
  "explain": "Expand FIRST: 3(2x − 3) = 6x − 9. Then collect: 12 − 9 = 3. Answer: 6x + 3. Adding 12 + 3 first is the trap!",
  "rule": "Brackets before addition — expand first, then collect.",
  "mini": {
    "type": "mcq",
    "q": "Expand and simplify 4(x + 7) − 1.",
    "options": [
      "4x + 27",
      "4x + 6",
      "4x + 28",
      "4x − 27"
    ],
    "answer": 0,
    "explain": "4x + 28 − 1 = 4x + 27."
  }
},

{
  "id": "S4Q07",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "A rectangle is 8 cm wide and (3y + 4) cm long. Which expression gives its AREA in cm²?",
  "options": [
    "24y + 4",
    "24y + 32",
    "11y + 12",
    "3y + 12"
  ],
  "answer": 1,
  "explain": "Area = width × length = 8(3y + 4) = 24y + 32.",
  "rule": "Area of a rectangle = width × length; expand the bracket.",
  "mini": {
    "type": "mcq",
    "q": "A square has sides of (s + 2) cm. Its perimeter is…",
    "options": [
      "4s + 2",
      "s + 8",
      "4s + 8",
      "4s²"
    ],
    "answer": 2,
    "explain": "Perimeter = 4 × (s + 2) = 4s + 8."
  }
},

{
  "id": "S4Q08",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "mcq",
  "q": "Expand and simplify 4(2x + 3) − 5.",
  "options": [
    "8x + 7",
    "8x − 2",
    "8x + 12",
    "8x + 17"
  ],
  "answer": 0,
  "explain": "Expand: 4(2x + 3) = 8x + 12. Then collect the constants: 12 − 5 = 7. Answer: 8x + 7.",
  "rule": "Expand first, then collect like terms.",
  "mini": {
    "type": "mcq",
    "q": "Expand and simplify 3(2x + 4) − 5.",
    "options": [
      "6x + 7",
      "6x − 7",
      "6x + 17",
      "6x + 12"
    ],
    "answer": 0,
    "explain": "6x + 12 − 5 = 6x + 7."
  }
},

{
  "id": "S4Q09",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "mcq",
  "q": "Three of these expressions expand to the SAME answer. Which one is the odd one out?",
  "options": [
    "2(12x + 15)",
    "3(10 + 8x)",
    "6(5 + 4x)",
    "4(6x + 26)"
  ],
  "answer": 3,
  "explain": "The first three all expand to 24x + 30. But 4(6x + 26) = 24x + 104 — a different constant.",
  "rule": "Expand each bracket fully before comparing.",
  "mini": {
    "type": "tf",
    "q": "True or false? 2(12x + 15) and 3(10 + 8x) are equivalent.",
    "answer": true,
    "explain": "Both expand to 24x + 30."
  }
},

{
  "id": "S4Q10",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "mcq",
  "q": "Expand 8(3e − 6 + 2f).",
  "options": [
    "24e − 6 + 2f",
    "24e − 48 + 16f",
    "24e + 48 − 16f",
    "24e − 48 + 2f"
  ],
  "answer": 1,
  "explain": "Three terms, three multiplications: 8×3e = 24e, 8×6 = 48 (subtracted), 8×2f = 16f (added).",
  "rule": "One arc per term — three terms need three arcs.",
  "mini": {
    "type": "mcq",
    "q": "Expand 6(2 + f − 3g).",
    "options": [
      "12 + 6f − 18g",
      "12 + f − 3g",
      "12 + 6f + 18g",
      "8 + 6f − 9g"
    ],
    "answer": 0,
    "explain": "6×2 = 12, 6×f = 6f, 6×3g = 18g (subtracted)."
  }
},

{
  "id": "S4Q11",
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "mcq",
  "q": "Ben calculated 12 + 3(2x − 3) like this: “12 + 3 = 15, then 15(2x − 3) = 30x − 45.” What was Ben's mistake?",
  "options": [
    "He added 12 + 3 before expanding the bracket",
    "He multiplied 15 × 2x wrongly",
    "He forgot the minus sign",
    "Nothing — his answer is correct"
  ],
  "answer": 0,
  "explain": "The 3 is GLUED to the bracket by multiplication, so expand 3(2x − 3) = 6x − 9 first. Then 12 + 6x − 9 = 6x + 3.",
  "rule": "Multiplication binds tighter than addition — expand before adding.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 5 + 2(x + 1).",
    "options": [
      "2x + 7",
      "7x + 7",
      "2x + 6",
      "7(x + 1)"
    ],
    "answer": 0,
    "explain": "2(x + 1) = 2x + 2, then 5 + 2 = 7: 2x + 7."
  }
},

{
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "mcq",
  "q": "Expand 9(m + 2).",
  "options": [
    "9m + 2",
    "9m + 18",
    "11m",
    "9m + 11"
  ],
  "answer": 1,
  "explain": "9 × m = 9m and 9 × 2 = 18.",
  "rule": "Multiply every term inside the bracket.",
  "mini": {
    "type": "mcq",
    "q": "Expand 7(n + 1).",
    "options": [
      "7n + 1",
      "7n + 7",
      "8n",
      "7n"
    ],
    "answer": 1,
    "explain": "7 × n = 7n and 7 × 1 = 7."
  },
  "id": "S4Q12"
},

{
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "fill",
  "q": "Expand 3(4k − 5). Type the full answer (e.g. 6k−9). ▢",
  "answer": "12k−15",
  "accept": [
    "12k−15",
    "12k-15",
    "12k − 15",
    "12k - 15"
  ],
  "explain": "3 × 4k = 12k and 3 × 5 = 15, keeping the minus: 12k − 15.",
  "rule": "Multiply the coefficient too: 3 × 4k = 12k.",
  "mini": {
    "type": "mcq",
    "q": "Expand 2(3k − 4).",
    "options": [
      "6k − 4",
      "6k − 8",
      "5k − 8",
      "6k + 8"
    ],
    "answer": 1,
    "explain": "2 × 3k = 6k and 2 × 4 = 8."
  },
  "id": "S4Q13"
},

{
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Expand and simplify 2(x + 3) + 3x.",
  "options": [
    "5x + 6",
    "5x + 3",
    "6x + 5",
    "2x + 9"
  ],
  "answer": 0,
  "explain": "Expand first: 2x + 6. Then add the 3x: 2x + 3x = 5x → 5x + 6.",
  "rule": "Expand, then collect like terms.",
  "mini": {
    "type": "mcq",
    "q": "Expand and simplify 3(y + 2) + y.",
    "options": [
      "4y + 6",
      "3y + 6",
      "4y + 2",
      "6y + 4"
    ],
    "answer": 0,
    "explain": "3y + 6 + y = 4y + 6."
  },
  "id": "S4Q14"
},

{
  "set": "4",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "multi",
  "q": "Select ALL the expressions that expand to 12x + 18.",
  "options": [
    "6(2x + 3)",
    "3(4x + 6)",
    "2(6x + 9)",
    "12(x + 18)"
  ],
  "answers": [
    0,
    1,
    2
  ],
  "explain": "6(2x+3) = 12x+18 ✓, 3(4x+6) = 12x+18 ✓, 2(6x+9) = 12x+18 ✓. But 12(x+18) = 12x + 216 ✗.",
  "rule": "Different brackets can hide the same expression!",
  "mini": {
    "type": "tf",
    "q": "True or false? 6(2x + 3) = 12x + 18.",
    "answer": true,
    "explain": "6 × 2x = 12x and 6 × 3 = 18 ✓"
  },
  "id": "S4Q15"
},

{
  "id": "S5Q01",
  "set": "5",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "mcq",
  "q": "Solve x + 3 = 6.",
  "options": [
    "x = 9",
    "x = 3",
    "x = 2",
    "x = 18"
  ],
  "answer": 1,
  "explain": "Subtract 3 from both sides: x = 6 − 3 = 3. Check: 3 + 3 = 6 ✓",
  "rule": "Undo adding by subtracting on both sides.",
  "mini": {
    "type": "fill",
    "q": "Solve x + 2 = 9. x = ▢",
    "answer": "7",
    "accept": [
      "7",
      "x=7",
      "x = 7"
    ],
    "explain": "9 − 2 = 7."
  }
},

{
  "id": "S5Q02",
  "set": "5",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "fill",
  "q": "Solve x − 4 = 9. x = ▢",
  "answer": "13",
  "accept": [
    "13",
    "x=13",
    "x = 13"
  ],
  "explain": "Add 4 to both sides: x = 9 + 4 = 13. Check: 13 − 4 = 9 ✓",
  "rule": "Undo subtracting by adding on both sides.",
  "mini": {
    "type": "mcq",
    "q": "Solve x − 5 = 6.",
    "options": [
      "x = 1",
      "x = 11",
      "x = 30",
      "x = −1"
    ],
    "answer": 1,
    "explain": "6 + 5 = 11."
  }
},

{
  "id": "S5Q03",
  "set": "5",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "mcq",
  "q": "Solve 3x = 12.",
  "options": [
    "x = 36",
    "x = 9",
    "x = 4",
    "x = 15"
  ],
  "answer": 2,
  "explain": "Divide both sides by 3: x = 12 ÷ 3 = 4. Check: 3 × 4 = 12 ✓",
  "rule": "Undo multiplying by dividing on both sides.",
  "mini": {
    "type": "fill",
    "q": "Solve 2y = 10. y = ▢",
    "answer": "5",
    "accept": [
      "5",
      "y=5",
      "y = 5"
    ],
    "explain": "10 ÷ 2 = 5."
  }
},

{
  "id": "S5Q04",
  "set": "5",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "mcq",
  "q": "“I think of a number and add 3. The answer is 18.” Which equation matches the story?",
  "options": [
    "n − 3 = 18",
    "3n = 18",
    "n + 3 = 18",
    "n + 18 = 3"
  ],
  "answer": 2,
  "explain": "The unknown number n has 3 ADDED to it, and the result is 18: n + 3 = 18. (The number was 15.)",
  "rule": "Turn the story into maths step by step.",
  "mini": {
    "type": "mcq",
    "q": "“I think of a number and subtract 4. The answer is 10.” Equation?",
    "options": [
      "n − 4 = 10",
      "4 − n = 10",
      "n + 4 = 10",
      "4n = 10"
    ],
    "answer": 0,
    "explain": "Subtract 4 from the unknown: n − 4 = 10 (so n = 14)."
  }
},

{
  "id": "S5Q05",
  "set": "5",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "fill",
  "q": "Solve 2a + 3 = 13. a = ▢",
  "answer": "5",
  "accept": [
    "5",
    "a=5",
    "a = 5"
  ],
  "explain": "Subtract 3 from both sides: 2a = 10. Divide by 2: a = 5. Check: 2×5 + 3 = 13 ✓",
  "rule": "Two steps: undo + first, then undo ×.",
  "mini": {
    "type": "mcq",
    "q": "Solve 3a − 2 = 13.",
    "options": [
      "a = 5",
      "a = 3",
      "a = 45",
      "a = 11"
    ],
    "answer": 0,
    "explain": "Add 2: 3a = 15. Divide by 3: a = 5."
  }
},

{
  "id": "S5Q06",
  "set": "5",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "mcq",
  "q": "Solve 14 = 3c + 2.",
  "options": [
    "c = 6",
    "c = 4",
    "c = 12",
    "c = 48"
  ],
  "answer": 1,
  "explain": "The unknown is on the right — no problem! 3c + 2 = 14 → 3c = 12 → c = 4. Check: 3×4 + 2 = 14 ✓",
  "rule": "An equation can be read from either side.",
  "mini": {
    "type": "fill",
    "q": "Solve 4 = 2c − 8. c = ▢",
    "answer": "6",
    "accept": [
      "6",
      "c=6",
      "c = 6"
    ],
    "explain": "2c = 4 + 8 = 12, so c = 6."
  }
},

{
  "id": "S5Q07",
  "set": "5",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "mcq",
  "q": "Pau has some trading cards. He gives away 3 and has 26 left. Which equation finds his starting number c?",
  "options": [
    "c + 3 = 26",
    "c − 3 = 26",
    "3c = 26",
    "26 − c = 3"
  ],
  "answer": 1,
  "explain": "Start with c, give away 3, end with 26: c − 3 = 26. (He started with 29.)",
  "rule": "Write the story in the order it happens.",
  "mini": {
    "type": "fill",
    "q": "Solve c − 3 = 26. c = ▢",
    "answer": "29",
    "accept": [
      "29",
      "c=29",
      "c = 29"
    ],
    "explain": "Add 3 to both sides: c = 29."
  }
},

{
  "id": "S5Q08",
  "set": "5",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "order",
  "q": "Put the steps for solving 3n + 5 = 20 in the correct order.",
  "items": [
    "Start: 3n + 5 = 20",
    "Subtract 5 from both sides: 3n = 15",
    "Divide both sides by 3: n = 5",
    "Check: 3 × 5 + 5 = 20 ✓"
  ],
  "explain": "Undo the +5 first, then the ×3, then always check by substituting back.",
  "rule": "Undo addition/subtraction before multiplication/division.",
  "mini": {
    "type": "mcq",
    "q": "What is the FIRST step to solve 2x − 7 = 9?",
    "options": [
      "Add 7 to both sides",
      "Divide by 2",
      "Subtract 9",
      "Multiply by 7"
    ],
    "answer": 0,
    "explain": "Undo the −7 first by adding 7: 2x = 16, then x = 8."
  }
},

{
  "id": "S5Q09",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "fill",
  "q": "Solve 5x = −35. x = ▢",
  "answer": "-7",
  "accept": [
    "-7",
    "−7",
    "x=-7",
    "x = -7",
    "x=−7"
  ],
  "explain": "Divide both sides by 5: x = −35 ÷ 5 = −7. Check: 5 × (−7) = −35 ✓",
  "rule": "positive × negative = negative.",
  "mini": {
    "type": "mcq",
    "q": "Solve x + 7 = −2.",
    "options": [
      "x = −9",
      "x = 5",
      "x = 9",
      "x = −5"
    ],
    "answer": 0,
    "explain": "Subtract 7: x = −2 − 7 = −9."
  }
},

{
  "id": "S5Q10",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "mcq",
  "q": "An isosceles triangle has two equal sides. One equal side is (3p + 2) cm and the other is 17 cm. What is p?",
  "options": [
    "p = 5",
    "p = 6",
    "p = 15",
    "p = 19/3"
  ],
  "answer": 0,
  "explain": "The equal sides give the equation 3p + 2 = 17. Subtract 2: 3p = 15. Divide by 3: p = 5.",
  "rule": "Equal lengths → write an equation, then solve it.",
  "mini": {
    "type": "fill",
    "q": "The equal sides are (2p + 1) cm and 15 cm. p = ▢",
    "answer": "7",
    "accept": [
      "7",
      "p=7",
      "p = 7"
    ],
    "explain": "2p + 1 = 15 → 2p = 14 → p = 7."
  }
},

{
  "id": "S5Q11",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "mcq",
  "q": "Maya's age is three more than twice Ben's age. Maya is 29. Which equation finds Ben's age b — and what is it?",
  "options": [
    "2b + 3 = 29, so b = 13",
    "3b + 2 = 29, so b = 9",
    "2b − 3 = 29, so b = 16",
    "b/2 + 3 = 29, so b = 52"
  ],
  "answer": 0,
  "explain": "“Three more than twice Ben's age” = 2b + 3. Set it equal to 29: 2b = 26, so b = 13.",
  "rule": "Translate the words in order: twice → 2b, three more → +3.",
  "mini": {
    "type": "mcq",
    "q": "“I double a number and add 4. The answer is 28.” The number is…",
    "options": [
      "12",
      "16",
      "24",
      "10"
    ],
    "answer": 0,
    "explain": "2n + 4 = 28 → 2n = 24 → n = 12."
  }
},

{
  "id": "S5Q12",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "mcq",
  "q": "Which of these equations has the LARGEST solution?",
  "options": [
    "4m + 4 = 32",
    "2m − 6 = 20",
    "6m + 2 = 32",
    "3m = 27"
  ],
  "answer": 1,
  "explain": "Solve each: 4m+4=32 → m=7; 2m−6=20 → m=13; 6m+2=32 → m=5; 3m=27 → m=9. The largest is m = 13.",
  "rule": "Solve every option before comparing — don't guess from the numbers!",
  "mini": {
    "type": "mcq",
    "q": "Which has the SMALLEST solution: 6m + 2 = 32 or 3m = 27?",
    "options": [
      "6m + 2 = 32",
      "3m = 27",
      "They are equal",
      "Cannot tell"
    ],
    "answer": 0,
    "explain": "m = 5 versus m = 9 — the first is smaller."
  }
},

{
  "id": "S5Q13",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "order",
  "q": "The unknown is on the right! Put the steps for solving 12 = y + 3 in the correct order.",
  "items": [
    "Start: 12 = y + 3",
    "Rewrite it as y + 3 = 12",
    "Subtract 3 from both sides: y = 9",
    "Check: 9 + 3 = 12 ✓"
  ],
  "explain": "Flip the equation round first, then undo the +3, then check.",
  "rule": "You may swap the two sides of an equation at any time.",
  "mini": {
    "type": "mcq",
    "q": "Solve 15 = y + 3.",
    "options": [
      "y = 12",
      "y = 18",
      "y = 5",
      "y = 45"
    ],
    "answer": 0,
    "explain": "y = 15 − 3 = 12."
  }
},

{
  "id": "S5Q14",
  "set": "5",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "fill",
  "q": "Solve 2x + 9 = 1. x = ▢",
  "answer": "-4",
  "accept": [
    "-4",
    "−4",
    "x=-4",
    "x = -4",
    "x=−4"
  ],
  "explain": "Subtract 9 from both sides: 2x = 1 − 9 = −8. Divide by 2: x = −4. Check: 2×(−4) + 9 = 1 ✓",
  "rule": "The same balance rules work when the answer is negative.",
  "mini": {
    "type": "mcq",
    "q": "Solve 3x + 10 = 1.",
    "options": [
      "x = −3",
      "x = 3",
      "x = −9",
      "x = 11/3"
    ],
    "answer": 0,
    "explain": "3x = −9, so x = −3."
  }
},

{
  "set": "5",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "fill",
  "q": "Solve y/3 = 5. y = ▢",
  "answer": "15",
  "accept": [
    "15",
    "y=15",
    "y = 15"
  ],
  "explain": "y is DIVIDED by 3, so undo it by multiplying both sides by 3: y = 5 × 3 = 15. Check: 15 ÷ 3 = 5 ✓",
  "rule": "Undo dividing by multiplying on both sides.",
  "mini": {
    "type": "mcq",
    "q": "Solve y/2 = 8.",
    "options": [
      "y = 4",
      "y = 16",
      "y = 10",
      "y = 6"
    ],
    "answer": 1,
    "explain": "y = 8 × 2 = 16."
  },
  "id": "S5Q15"
},

{
  "id": "S6Q01",
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "What does the symbol < mean?",
  "options": [
    "is equal to",
    "is less than",
    "is greater than",
    "is not a number"
  ],
  "answer": 1,
  "explain": "< means “is less than”. For example, 3 < 8 says 3 is less than 8.",
  "rule": "The small pointy end faces the smaller number.",
  "mini": {
    "type": "tf",
    "q": "True or false? The symbol > means “is greater than”.",
    "answer": true,
    "explain": "Correct — x > 4 reads “x is greater than 4”."
  }
},

{
  "id": "S6Q02",
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "What is the SMALLEST integer x could be if x > 6?",
  "options": [
    "6",
    "7",
    "5",
    "0"
  ],
  "answer": 1,
  "explain": "x must be strictly greater than 6, so 6 itself is not allowed. The first integer above 6 is 7.",
  "rule": "An open interval does not include its boundary number.",
  "mini": {
    "type": "fill",
    "q": "Smallest integer x could be if x > 9? ▢",
    "answer": "10",
    "accept": [
      "10"
    ],
    "explain": "The first integer above 9 is 10."
  }
},

{
  "id": "S6Q03",
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "A number line shows an OPEN circle at 3 with an arrow pointing RIGHT. Which inequality does it show?",
  "options": [
    "x < 3",
    "x = 3",
    "x > 3",
    "3 > x"
  ],
  "answer": 2,
  "explain": "The open circle means 3 is not included, and the right arrow points to numbers bigger than 3: x > 3.",
  "rule": "Arrow right = greater than; arrow left = less than.",
  "mini": {
    "type": "mcq",
    "q": "Open circle at 5, arrow pointing LEFT. Inequality?",
    "options": [
      "x > 5",
      "x < 5",
      "x = 5",
      "5 < x"
    ],
    "answer": 1,
    "explain": "Arrow left means numbers smaller than 5: x < 5."
  }
},

{
  "id": "S6Q04",
  "set": "6",
  "skill": "Inequalities",
  "level": "medium",
  "type": "mcq",
  "q": "A number line shows an open circle at −1 with an arrow pointing LEFT. Which inequality is shown?",
  "options": [
    "x > −1",
    "x < −1",
    "x = −1",
    "x < 1"
  ],
  "answer": 1,
  "explain": "The arrow points to numbers SMALLER than −1 (further left), and −1 itself is not included: x < −1.",
  "rule": "Left arrow = less than; open circle = not included.",
  "mini": {
    "type": "mcq",
    "q": "Open circle at 0, arrow pointing right. Inequality?",
    "options": [
      "x < 0",
      "x > 0",
      "x = 0",
      "0 > x"
    ],
    "answer": 1,
    "explain": "Numbers greater than 0: x > 0."
  }
},

{
  "id": "S6Q05",
  "set": "6",
  "skill": "Inequalities",
  "level": "medium",
  "type": "mcq",
  "q": "Which list shows the integer values n could take if n > −3?",
  "options": [
    "−3, −2, −1, …",
    "−2, −1, 0, …",
    "−4, −5, −6, …",
    "−2, −1, 0 (stop)"
  ],
  "answer": 1,
  "explain": "n is strictly greater than −3, so start at −2 and go up forever: −2, −1, 0, 1, … Don't forget the dots!",
  "rule": "Start just inside the boundary; the list never ends.",
  "mini": {
    "type": "mcq",
    "q": "What is the LARGEST integer y could be if y < 0?",
    "options": [
      "0",
      "−1",
      "1",
      "−10"
    ],
    "answer": 1,
    "explain": "y must be below 0, and the first integer below 0 is −1."
  }
},

{
  "id": "S6Q06",
  "set": "6",
  "skill": "Inequalities",
  "level": "medium",
  "type": "multi",
  "q": "Select ALL the values that satisfy k < 5.",
  "options": [
    "4",
    "5",
    "−2",
    "7",
    "0"
  ],
  "answers": [
    0,
    2,
    4
  ],
  "explain": "4, −2 and 0 are all less than 5 ✓. 5 is NOT allowed (k must be strictly less), and 7 is greater.",
  "rule": "Check each value against the inequality one by one.",
  "mini": {
    "type": "tf",
    "q": "True or false? k = 5 satisfies k < 5.",
    "answer": false,
    "explain": "k < 5 is strict — 5 is not less than 5."
  }
},

{
  "id": "S6Q07",
  "set": "6",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "What is the SMALLEST integer y could be if y > −7?",
  "options": [
    "−7",
    "−8",
    "−6",
    "0"
  ],
  "answer": 2,
  "explain": "y must be strictly greater than −7. Moving RIGHT from −7, the first integer is −6.",
  "rule": "Greater than a negative → step towards zero.",
  "mini": {
    "type": "fill",
    "q": "Smallest integer n could be if n > 2.5? ▢",
    "answer": "3",
    "accept": [
      "3"
    ],
    "explain": "The first whole number above 2.5 is 3."
  }
},

{
  "id": "S6Q08",
  "set": "6",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "What is the LARGEST integer m could be if m < −3.5?",
  "options": [
    "−3",
    "−3.5",
    "−4",
    "−2"
  ],
  "answer": 2,
  "explain": "m must be BELOW −3.5 on the number line. −3 is above −3.5, so the largest allowed integer is −4.",
  "rule": "With negatives, smaller means further from zero.",
  "mini": {
    "type": "mcq",
    "q": "Smallest integer p could be if p > −3.5?",
    "options": [
      "−4",
      "−3",
      "−3.5",
      "0"
    ],
    "answer": 1,
    "explain": "Just above −3.5 sits −3."
  }
},

{
  "id": "S6Q09",
  "set": "6",
  "skill": "Inequalities",
  "level": "hard",
  "type": "multi",
  "q": "The value x = −2 satisfies some of these inequalities. Select ALL that it satisfies.",
  "options": [
    "x > −3",
    "x < −3",
    "x < 0",
    "x > 1"
  ],
  "answers": [
    0,
    2
  ],
  "explain": "−2 is greater than −3 ✓ and less than 0 ✓. But −2 is not less than −3, and certainly not greater than 1.",
  "rule": "Place the value on a number line and test each inequality.",
  "mini": {
    "type": "tf",
    "q": "True or false? x = −5 satisfies x < −3.",
    "answer": true,
    "explain": "−5 is further left than −3, so −5 < −3 ✓"
  }
},

{
  "id": "S6Q10",
  "set": "6",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "For which value of k do the three expressions k + 10, 3k and 20 − k all give the SAME value?",
  "options": [
    "k = 4",
    "k = 5",
    "k = 6",
    "k = 10"
  ],
  "answer": 1,
  "explain": "Try k = 5: k + 10 = 15, 3k = 15, 20 − k = 15. All three give 15!",
  "rule": "Substitute and test — a powerful checking strategy.",
  "mini": {
    "type": "fill",
    "q": "What is 3k when k = 5? ▢",
    "answer": "15",
    "accept": [
      "15"
    ],
    "explain": "3 × 5 = 15."
  }
},

{
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "Which inequality says “h is greater than 9”?",
  "options": [
    "h < 9",
    "h > 9",
    "h = 9",
    "9 > h"
  ],
  "answer": 1,
  "explain": "Greater than uses the > symbol with h first: h > 9.",
  "rule": "Write it in the same order as the words.",
  "mini": {
    "type": "mcq",
    "q": "Write “c is less than 1” as an inequality.",
    "options": [
      "c > 1",
      "1 < c",
      "c < 1",
      "c = 1"
    ],
    "answer": 2,
    "explain": "Less than is the < symbol: c < 1."
  },
  "id": "S6Q11"
},

{
  "set": "6",
  "skill": "Inequalities",
  "level": "medium",
  "type": "tf",
  "q": "True or false? The value 2.9 satisfies x < 3.",
  "answer": true,
  "explain": "2.9 is less than 3, so it fits. Inequalities include decimals and fractions, not just integers!",
  "rule": "ANY number below the boundary satisfies x < 3.",
  "mini": {
    "type": "tf",
    "q": "True or false? The value 3 satisfies x < 3.",
    "answer": false,
    "explain": "x < 3 is strict — 3 is not less than 3."
  },
  "id": "S6Q12"
},

{
  "set": "6",
  "skill": "Inequalities",
  "level": "medium",
  "type": "mcq",
  "q": "Which value does NOT satisfy y > −4?",
  "options": [
    "−3",
    "0",
    "−5",
    "2"
  ],
  "answer": 2,
  "explain": "−5 is BELOW −4 on the number line, so it does not fit. The others are all greater than −4.",
  "rule": "Place each value on a number line and check.",
  "mini": {
    "type": "tf",
    "q": "True or false? −4 satisfies y > −4.",
    "answer": false,
    "explain": "y must be strictly greater than −4, so −4 itself is not included."
  },
  "id": "S6Q13"
},

{
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "A ride sign says: “You must be TALLER than 120 cm.” Write the rule as an inequality for height h.",
  "options": [
    "h < 120",
    "h > 120",
    "h = 120",
    "120 > h"
  ],
  "answer": 1,
  "explain": "Taller than 120 means h is greater than 120: h > 120. Exactly 120 cm is not enough!",
  "rule": "Real-life rules often hide inequalities.",
  "mini": {
    "type": "mcq",
    "q": "“For children UNDER 10 years old.” Inequality for age a?",
    "options": [
      "a > 10",
      "a < 10",
      "a = 10",
      "10 < a"
    ],
    "answer": 1,
    "explain": "Under 10 means less than 10: a < 10."
  },
  "id": "S6Q14"
},

{
  "set": "6",
  "skill": "Inequalities",
  "level": "easy",
  "type": "fill",
  "q": "What is the LARGEST integer m could be if m < 7? ▢",
  "answer": "6",
  "accept": [
    "6"
  ],
  "explain": "m must be strictly below 7, so the largest whole number allowed is 6.",
  "rule": "Step one integer inside the boundary.",
  "mini": {
    "type": "mcq",
    "q": "Largest integer m if m < 0?",
    "options": [
      "0",
      "−1",
      "1",
      "−10"
    ],
    "answer": 1,
    "explain": "The first integer below 0 is −1."
  },
  "id": "S6Q15"
},

{
  "id": "S7Q01",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "match",
  "q": "Match each key word to its meaning.",
  "left": [
    "variable",
    "constant",
    "equation"
  ],
  "right": [
    "a letter that can take different values",
    "a number on its own that never changes",
    "a maths sentence with an equals sign"
  ],
  "explain": "The variable varies, the constant stays constant, and an equation always has an equals sign.",
  "rule": "Key words unlock every question in this unit!",
  "mini": {
    "type": "mcq",
    "q": "Which word means “a letter standing for an unknown number”?",
    "options": [
      "constant",
      "bracket",
      "variable",
      "integer"
    ],
    "answer": 2,
    "explain": "A variable is the letter that stands for the unknown."
  }
},

{
  "id": "S7Q02",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "mcq",
  "passage": [
    "A box holds p pens.",
    "Zara takes 3 pens out of the box to share with her friends."
  ],
  "q": "Read the text. Which expression shows how many pens are left in the box?",
  "options": [
    "p + 3",
    "3p",
    "p − 3",
    "3 − p"
  ],
  "answer": 2,
  "explain": "Zara TAKES OUT 3 pens, so subtract 3 from the p pens that were inside: p − 3.",
  "rule": "“Takes out” means subtract from the starting amount.",
  "mini": {
    "type": "mcq",
    "q": "Later, Zara puts 2 pens back. Expression for the pens now?",
    "options": [
      "p − 3 + 2",
      "p + 5",
      "p − 5",
      "2p − 3"
    ],
    "answer": 0,
    "explain": "Start from p − 3, then add 2: p − 3 + 2 (which simplifies to p − 1)."
  }
},

{
  "id": "S7Q03",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "sort",
  "q": "Sort each item into the correct box.",
  "buckets": [
    "Expression",
    "Equation"
  ],
  "items": [
    {
      "t": "4y + 1",
      "b": 0
    },
    {
      "t": "4y + 1 = 9",
      "b": 1
    },
    {
      "t": "k/2",
      "b": 0
    },
    {
      "t": "15 = m + 9",
      "b": 1
    }
  ],
  "explain": "4y + 1 and k/2 have no equals sign → expressions. The other two contain = → equations.",
  "rule": "Look for the equals sign first, every time.",
  "mini": {
    "type": "tf",
    "q": "True or false? 15 = m + 9 is an equation even though the unknown is on the right.",
    "answer": true,
    "explain": "An equation just needs an equals sign — the unknown can sit on either side."
  }
},

{
  "id": "S7Q04",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "mcq",
  "passage": [
    "Ari runs a print shop. Printing one poster costs $2, and renting the print machine costs $5 per day.",
    "Ari derives a formula for the total daily cost C of printing p posters: C = 2p + 5."
  ],
  "q": "In Ari's formula, what does the number 5 represent?",
  "options": [
    "The cost of one poster",
    "The daily machine rental",
    "The number of posters",
    "Ari's profit"
  ],
  "answer": 1,
  "explain": "The $5 is paid once per day for the machine, whatever the number of posters — it is the constant in the formula.",
  "rule": "In a formula, the constant is the fixed cost.",
  "mini": {
    "type": "fill",
    "q": "Use C = 2p + 5 to find C when p = 30. ▢",
    "answer": "65",
    "accept": [
      "65",
      "$65"
    ],
    "explain": "2 × 30 = 60, then 60 + 5 = 65."
  }
},

{
  "id": "S7Q05",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "mcq",
  "q": "Your friend says: “I DERIVED a formula for my pocket money.” What did your friend do?",
  "options": [
    "Copied a formula from the board",
    "Built their own formula from the situation",
    "Deleted a formula",
    "Solved an inequality"
  ],
  "answer": 1,
  "explain": "To derive a formula means to create your own rule from the information — like writing C = 2p + 5 from a story.",
  "rule": "derive = build your own rule.",
  "mini": {
    "type": "fill",
    "q": "Complete the missing letters: co▢ffici▢nt",
    "answer": "coefficient",
    "accept": [
      "coefficient"
    ],
    "explain": "c-o-e-f-f-i-c-i-e-n-t — double f, and -ent at the end."
  }
},

{
  "id": "S7Q06",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "mcq",
  "passage": [
    "Kai sells paper lanterns at the night market for $3 each. His stall fee is $12 for the evening.",
    "Kai wants his profit to be MORE than $30, so he writes the inequality 3n − 12 > 30, where n is the number of lanterns he sells."
  ],
  "q": "What is the SMALLEST number of lanterns Kai must sell to reach his goal?",
  "options": [
    "14",
    "15",
    "10",
    "42"
  ],
  "answer": 1,
  "explain": "3n − 12 > 30 means 3n > 42, so n > 14. Since n must be a whole number of lanterns, the smallest is 15. Selling exactly 14 gives $30, which is NOT more than $30.",
  "rule": "Solve the inequality, then pick the smallest integer strictly inside it.",
  "mini": {
    "type": "fill",
    "q": "Use profit = 3n − 12. Find the profit when n = 20. ▢",
    "answer": "48",
    "accept": [
      "48",
      "$48"
    ],
    "explain": "3 × 20 = 60, then 60 − 12 = 48."
  }
},

{
  "id": "S7Q07",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "mcq",
  "q": "A maths book says: “x > 4 describes an OPEN INTERVAL.” What does “open” tell you?",
  "options": [
    "The interval includes the number 4",
    "The boundary number 4 is NOT included",
    "The interval has no numbers in it",
    "You can only use even numbers"
  ],
  "answer": 1,
  "explain": "“Open” means the boundary itself is left out — x can get very close to 4 but never equal it. That's why we draw an open (empty) circle.",
  "rule": "Open interval ↔ open circle ↔ boundary excluded.",
  "mini": {
    "type": "tf",
    "q": "True or false? On a number line, x > 4 is drawn with an open circle at 4.",
    "answer": true,
    "explain": "Open circle because 4 is not included."
  }
},

{
  "id": "S7Q08",
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "multi",
  "q": "Select ALL the statements that are TRUE.",
  "options": [
    "x = 3 is the solution of 2x + 1 = 7",
    "5a + 2a simplifies to 7a",
    "4(x − 2) expands to 4x − 2",
    "x > 4 includes the value 4",
    "ab and ba are the same term"
  ],
  "answers": [
    0,
    1,
    4
  ],
  "explain": "2×3 + 1 = 7 ✓ and 5a + 2a = 7a ✓ and ab = ba ✓. But 4(x − 2) = 4x − 8 (not 4x − 2), and x > 4 EXCLUDES 4.",
  "rule": "Check each statement with the matching Unit 2 rule.",
  "mini": {
    "type": "mcq",
    "q": "What is the solution of 2x + 1 = 9?",
    "options": [
      "x = 4",
      "x = 5",
      "x = 3",
      "x = 8"
    ],
    "answer": 0,
    "explain": "2x = 8, so x = 4."
  }
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "mcq",
  "passage": [
    "Zia's sticker album has p pages. Each page holds exactly 6 stickers.",
    "Zia writes a formula to count her stickers when the album is full: S = 6p."
  ],
  "q": "In Zia's formula, what does S stand for?",
  "options": [
    "The number of pages",
    "The total number of stickers",
    "The price of the album",
    "The size of a sticker"
  ],
  "answer": 1,
  "explain": "S counts the total stickers: 6 stickers on every one of the p pages.",
  "rule": "Read the story to see what each letter counts.",
  "mini": {
    "type": "fill",
    "q": "Use S = 6p to find S when p = 10. ▢",
    "answer": "60",
    "accept": [
      "60"
    ],
    "explain": "6 × 10 = 60 stickers."
  },
  "id": "S7Q09"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "mcq",
  "passage": [
    "Zia's sticker album has p pages. Each page holds exactly 6 stickers.",
    "So far Zia has filled 9 pages completely."
  ],
  "q": "How many stickers has Zia placed so far?",
  "options": [
    "15",
    "54",
    "45",
    "96"
  ],
  "answer": 1,
  "explain": "9 full pages × 6 stickers = 54 stickers.",
  "rule": "Substitute the number of pages into 6p.",
  "mini": {
    "type": "mcq",
    "q": "How many stickers on 8 full pages?",
    "options": [
      "48",
      "14",
      "68",
      "86"
    ],
    "answer": 0,
    "explain": "6 × 8 = 48."
  },
  "id": "S7Q10"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "mcq",
  "q": "What is the plural of “formula”?",
  "options": [
    "formulars",
    "formulae",
    "formulies",
    "formulan"
  ],
  "answer": 1,
  "explain": "One formula, two formulae (saying “formulas” is also accepted in everyday English).",
  "rule": "formula → formulae.",
  "mini": {
    "type": "tf",
    "q": "True or false? “Formulae” means more than one formula.",
    "answer": true,
    "explain": "Correct — it is the plural."
  },
  "id": "S7Q11"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "mcq",
  "q": "Which word means “swap a letter for a number, then calculate”?",
  "options": [
    "expand",
    "simplify",
    "substitute",
    "solve"
  ],
  "answer": 2,
  "explain": "Substituting is swapping the letter for its value — like a substitute player swapping onto the pitch.",
  "rule": "substitute = letter → number.",
  "mini": {
    "type": "fill",
    "q": "Complete the missing letters and type the full word: s▢bst▢t▢te",
    "answer": "substitute",
    "accept": [
      "substitute"
    ],
    "explain": "s-u-b-s-t-i-t-u-t-e."
  },
  "id": "S7Q12"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "mcq",
  "q": "Which sentence uses the word “expand” correctly?",
  "options": [
    "I expanded x = 4 and got x = 8.",
    "I expanded 3(x + 2) and got 3x + 6.",
    "I expanded 2x + 3x and got 5x.",
    "I expanded the number line."
  ],
  "answer": 1,
  "explain": "Expanding means multiplying out a bracket: 3(x + 2) = 3x + 6. (Collecting 2x + 3x is called simplifying.)",
  "rule": "expand = multiply out a bracket.",
  "mini": {
    "type": "tf",
    "q": "True or false? Collecting 2x + 3x into 5x is called “expanding”.",
    "answer": false,
    "explain": "That is simplifying (collecting like terms). Expanding is for brackets."
  },
  "id": "S7Q13"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "match",
  "q": "Match each action word to its meaning.",
  "left": [
    "solve",
    "expand",
    "simplify"
  ],
  "right": [
    "find the value of the unknown",
    "multiply out a bracket",
    "collect like terms into the shortest form"
  ],
  "explain": "You SOLVE equations, EXPAND brackets and SIMPLIFY expressions.",
  "rule": "Each maths verb has one special job.",
  "mini": {
    "type": "mcq",
    "q": "Which word goes with “brackets”?",
    "options": [
      "solve",
      "expand",
      "substitute",
      "integer"
    ],
    "answer": 1,
    "explain": "Brackets are expanded (multiplied out)."
  },
  "id": "S7Q14"
},

{
  "set": "7",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "mcq",
  "q": "“Mo checked his SOLUTION by substituting it back into the equation.” In this sentence, a solution is…",
  "options": [
    "a liquid mixture",
    "the value that makes the equation true",
    "a type of bracket",
    "the longest term"
  ],
  "answer": 1,
  "explain": "In algebra, the solution is the value of the unknown that balances the equation — and substituting it back is the perfect check.",
  "rule": "solution = the value that works.",
  "mini": {
    "type": "tf",
    "q": "True or false? x = 5 is the solution of x + 2 = 7.",
    "answer": true,
    "explain": "5 + 2 = 7 ✓"
  },
  "id": "S7Q15"
},

{
  "set": "8",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "A plant is h cm tall. It grows 2 cm. How tall is it now?",
  "options": [
    "h − 2",
    "2h",
    "h + 2",
    "2 − h"
  ],
  "answer": 2,
  "explain": "Growing means getting taller — add 2 to the height: h + 2.",
  "rule": "grow/gain → add.",
  "mini": {
    "type": "mcq",
    "q": "A candle is c cm tall and burns down 1 cm. Height now?",
    "options": [
      "c + 1",
      "c − 1",
      "1 − c",
      "c"
    ],
    "answer": 1,
    "explain": "Burning down means subtract: c − 1."
  },
  "id": "S8Q01"
},

{
  "set": "8",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "fill",
  "q": "Find the value of 6m when m = 4. ▢",
  "answer": "24",
  "accept": [
    "24"
  ],
  "explain": "6m means 6 × m = 6 × 4 = 24.",
  "rule": "Number next to a letter = multiply.",
  "mini": {
    "type": "mcq",
    "q": "Find 3m when m = 5.",
    "options": [
      "35",
      "15",
      "8",
      "53"
    ],
    "answer": 1,
    "explain": "3 × 5 = 15."
  },
  "id": "S8Q02"
},

{
  "set": "8",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "mcq",
  "q": "Simplify 4c + 3c.",
  "options": [
    "7c",
    "12c",
    "7c²",
    "7"
  ],
  "answer": 0,
  "explain": "Like terms: 4 + 3 = 7, keep the c → 7c.",
  "rule": "Add the coefficients; the letter stays.",
  "mini": {
    "type": "fill",
    "q": "Simplify 5d + 2d. ▢",
    "answer": "7d",
    "accept": [
      "7d",
      "7 d"
    ],
    "explain": "5 + 2 = 7 → 7d."
  },
  "id": "S8Q03"
},

{
  "set": "8",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "mcq",
  "q": "Expand 5(a + 2).",
  "options": [
    "5a + 2",
    "5a + 10",
    "7a",
    "a + 10"
  ],
  "answer": 1,
  "explain": "5 × a = 5a AND 5 × 2 = 10.",
  "rule": "The 5 multiplies both terms.",
  "mini": {
    "type": "mcq",
    "q": "Expand 4(b + 2).",
    "options": [
      "4b + 2",
      "4b + 8",
      "6b",
      "4b + 6"
    ],
    "answer": 1,
    "explain": "4 × b = 4b and 4 × 2 = 8."
  },
  "id": "S8Q04"
},

{
  "set": "8",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "mcq",
  "q": "Solve x + 9 = 14.",
  "options": [
    "x = 23",
    "x = 5",
    "x = 6",
    "x = 126"
  ],
  "answer": 1,
  "explain": "Subtract 9 from both sides: x = 14 − 9 = 5. Check: 5 + 9 = 14 ✓",
  "rule": "Undo +9 by subtracting 9.",
  "mini": {
    "type": "fill",
    "q": "Solve x + 1 = 7. x = ▢",
    "answer": "6",
    "accept": [
      "6",
      "x=6",
      "x = 6"
    ],
    "explain": "7 − 1 = 6."
  },
  "id": "S8Q05"
},

{
  "set": "8",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "fill",
  "q": "Solve 2x = 18. x = ▢",
  "answer": "9",
  "accept": [
    "9",
    "x=9",
    "x = 9"
  ],
  "explain": "Divide both sides by 2: x = 18 ÷ 2 = 9. Check: 2 × 9 = 18 ✓",
  "rule": "Undo ×2 by dividing by 2.",
  "mini": {
    "type": "mcq",
    "q": "Solve 3x = 15.",
    "options": [
      "x = 45",
      "x = 5",
      "x = 12",
      "x = 18"
    ],
    "answer": 1,
    "explain": "15 ÷ 3 = 5."
  },
  "id": "S8Q06"
},

{
  "set": "8",
  "skill": "Inequalities",
  "level": "easy",
  "type": "tf",
  "q": "True or false? 8 > 3.",
  "answer": true,
  "explain": "8 is greater than 3, so 8 > 3 is a TRUE statement.",
  "rule": "> means “is greater than”.",
  "mini": {
    "type": "tf",
    "q": "True or false? −2 > 1.",
    "answer": false,
    "explain": "−2 is below 1 on the number line, so −2 < 1."
  },
  "id": "S8Q07"
},

{
  "set": "8",
  "skill": "Inequalities",
  "level": "easy",
  "type": "mcq",
  "q": "What is the smallest integer k could be if k > 0?",
  "options": [
    "0",
    "1",
    "−1",
    "2"
  ],
  "answer": 1,
  "explain": "k must be strictly greater than 0, so the first integer is 1.",
  "rule": "The boundary itself is not included.",
  "mini": {
    "type": "fill",
    "q": "Smallest integer k if k > 3? ▢",
    "answer": "4",
    "accept": [
      "4"
    ],
    "explain": "The first integer above 3 is 4."
  },
  "id": "S8Q08"
},

{
  "set": "8",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "mcq",
  "q": "A pizza costs $p. What is the cost of 2 pizzas?",
  "options": [
    "p + 2",
    "2p",
    "p − 2",
    "p/2"
  ],
  "answer": 1,
  "explain": "Two pizzas at $p each cost 2 × p = 2p.",
  "rule": "price × how many = total cost.",
  "mini": {
    "type": "mcq",
    "q": "Cost of 5 pizzas at $p each?",
    "options": [
      "5p",
      "p + 5",
      "p5",
      "5/p"
    ],
    "answer": 0,
    "explain": "5 × p = 5p."
  },
  "id": "S8Q09"
},

{
  "set": "8",
  "skill": "Collecting Like Terms",
  "level": "easy",
  "type": "tf",
  "q": "True or false? a + a = a².",
  "answer": false,
  "explain": "ADDING two a's gives 2a. MULTIPLYING a × a gives a². Don't mix them up!",
  "rule": "Add → 2a. Multiply → a².",
  "mini": {
    "type": "mcq",
    "q": "What is a + a?",
    "options": [
      "a²",
      "2a",
      "2a²",
      "aa"
    ],
    "answer": 1,
    "explain": "Two a's added together make 2a."
  },
  "id": "S8Q10"
},

{
  "set": "8",
  "skill": "Formulae & Substitution",
  "level": "easy",
  "type": "mcq",
  "q": "The formula d = 7w gives the days in w weeks. How many days are in 3 weeks?",
  "options": [
    "10",
    "21",
    "37",
    "73"
  ],
  "answer": 1,
  "explain": "Substitute w = 3: d = 7 × 3 = 21 days.",
  "rule": "Substitute, then multiply.",
  "mini": {
    "type": "fill",
    "q": "How many days in 6 weeks? (d = 7w) ▢",
    "answer": "42",
    "accept": [
      "42"
    ],
    "explain": "7 × 6 = 42."
  },
  "id": "S8Q11"
},

{
  "set": "8",
  "skill": "Writing Expressions",
  "level": "easy",
  "type": "sort",
  "q": "Expression or equation? Sort each one.",
  "buckets": [
    "Expression",
    "Equation"
  ],
  "items": [
    {
      "t": "5m",
      "b": 0
    },
    {
      "t": "5m = 20",
      "b": 1
    },
    {
      "t": "y − 1",
      "b": 0
    },
    {
      "t": "y + 1 = 3",
      "b": 1
    }
  ],
  "explain": "5m and y − 1 have no equals sign → expressions. The other two have = → equations.",
  "rule": "The equals sign is the giveaway.",
  "mini": {
    "type": "tf",
    "q": "True or false? 5m = 20 is an equation.",
    "answer": true,
    "explain": "It has an equals sign, so it is an equation (m = 4)."
  },
  "id": "S8Q12"
},

{
  "set": "8",
  "skill": "Expanding Brackets",
  "level": "easy",
  "type": "mcq",
  "q": "Expand 2(x − 1).",
  "options": [
    "2x − 1",
    "2x − 2",
    "2x + 2",
    "x − 2"
  ],
  "answer": 1,
  "explain": "2 × x = 2x and 2 × 1 = 2, keeping the minus: 2x − 2.",
  "rule": "The minus stays with the second term.",
  "mini": {
    "type": "tf",
    "q": "True or false? 3(x − 1) = 3x − 3.",
    "answer": true,
    "explain": "3 × x = 3x and 3 × 1 = 3 with the minus ✓"
  },
  "id": "S8Q13"
},

{
  "set": "8",
  "skill": "Reading & Vocabulary",
  "level": "easy",
  "type": "fill",
  "q": "Complete the missing letter and type the word: t▢rm (one building block of an expression)",
  "answer": "term",
  "accept": [
    "term"
  ],
  "explain": "The word is “term” — like 4a, 3b and 7 in 4a + 3b − 7.",
  "rule": "Terms are separated by + and − signs.",
  "mini": {
    "type": "mcq",
    "q": "How many terms are in 2x + 5?",
    "options": [
      "1",
      "2",
      "3",
      "5"
    ],
    "answer": 1,
    "explain": "The terms are 2x and 5 — two terms."
  },
  "id": "S8Q14"
},

{
  "set": "8",
  "skill": "Solving Equations",
  "level": "easy",
  "type": "mcq",
  "q": "“I think of a number and multiply it by 5. The answer is 35.” What is the number?",
  "options": [
    "30",
    "7",
    "40",
    "175"
  ],
  "answer": 1,
  "explain": "The equation is 5n = 35, so n = 35 ÷ 5 = 7.",
  "rule": "Write the equation, then use the inverse.",
  "mini": {
    "type": "mcq",
    "q": "“I multiply a number by 2 and get 12.” The number is…",
    "options": [
      "24",
      "6",
      "10",
      "14"
    ],
    "answer": 1,
    "explain": "2n = 12 → n = 6."
  },
  "id": "S8Q15"
},

{
  "set": "9",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "Which expression means “twice the SUM of x and 3”?",
  "options": [
    "2x + 3",
    "2(x + 3)",
    "x + 3 + 2",
    "x + 6"
  ],
  "answer": 1,
  "explain": "First make the sum (x + 3), THEN double the whole thing: 2(x + 3). The bracket keeps the sum together.",
  "rule": "“The sum of…” builds a bracket before multiplying.",
  "mini": {
    "type": "mcq",
    "q": "Which means “three times the sum of y and 1”?",
    "options": [
      "3y + 1",
      "3(y + 1)",
      "y + 3",
      "3y"
    ],
    "answer": 1,
    "explain": "Sum first, then × 3: 3(y + 1)."
  },
  "id": "S9Q01"
},

{
  "set": "9",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "fill",
  "q": "Find the value of 4a − b when a = 6 and b = 5. ▢",
  "answer": "19",
  "accept": [
    "19"
  ],
  "explain": "4 × 6 = 24 first, then 24 − 5 = 19.",
  "rule": "Multiply before you subtract.",
  "mini": {
    "type": "mcq",
    "q": "Find 2a − b when a = 5 and b = 3.",
    "options": [
      "7",
      "12",
      "4",
      "13"
    ],
    "answer": 0,
    "explain": "10 − 3 = 7."
  },
  "id": "S9Q02"
},

{
  "set": "9",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "mcq",
  "q": "The cost formula is C = pn (price × number). Find n when C = 36 and p = 9.",
  "options": [
    "n = 4",
    "n = 45",
    "n = 27",
    "n = 324"
  ],
  "answer": 0,
  "explain": "36 = 9 × n, so n = 36 ÷ 9 = 4 items.",
  "rule": "Use the inverse operation to find the hidden value.",
  "mini": {
    "type": "fill",
    "q": "C = pn. Find n when C = 30 and p = 6. ▢",
    "answer": "5",
    "accept": [
      "5",
      "n=5",
      "n = 5"
    ],
    "explain": "30 ÷ 6 = 5."
  },
  "id": "S9Q03"
},

{
  "set": "9",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 8j + 3 − 2j + 7.",
  "options": [
    "6j + 10",
    "16j",
    "6j + 4",
    "10j + 6"
  ],
  "answer": 0,
  "explain": "j terms: 8j − 2j = 6j. Constants: 3 + 7 = 10.",
  "rule": "Keep each sign glued to its term.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 5k + 2 − k.",
    "options": [
      "4k + 2",
      "6k + 2",
      "4k − 2",
      "7k"
    ],
    "answer": 0,
    "explain": "5k − 1k = 4k; the 2 stays."
  },
  "id": "S9Q04"
},

{
  "set": "9",
  "skill": "Collecting Like Terms",
  "level": "medium",
  "type": "mcq",
  "q": "Simplify 7ab + 2ba − ab.",
  "options": [
    "8ab",
    "9ab",
    "8a²b²",
    "6ab"
  ],
  "answer": 0,
  "explain": "ba = ab, so 7ab + 2ab − 1ab = 8ab.",
  "rule": "Letter order doesn't matter in a product.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 3cd + 2dc.",
    "options": [
      "5cd",
      "6cd",
      "5c²d²",
      "1cd"
    ],
    "answer": 0,
    "explain": "dc = cd → 3 + 2 = 5 → 5cd."
  },
  "id": "S9Q05"
},

{
  "set": "9",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Expand 4(3 − 2x).",
  "options": [
    "12 − 8x",
    "12 − 2x",
    "12 + 8x",
    "7 − 6x"
  ],
  "answer": 0,
  "explain": "4 × 3 = 12 and 4 × 2x = 8x, keeping the minus: 12 − 8x.",
  "rule": "Multiply BOTH terms and keep the sign.",
  "mini": {
    "type": "mcq",
    "q": "Expand 5(2 − x).",
    "options": [
      "10 − x",
      "10 − 5x",
      "10 + 5x",
      "7 − 5x"
    ],
    "answer": 1,
    "explain": "5 × 2 = 10 and 5 × x = 5x with the minus."
  },
  "id": "S9Q06"
},

{
  "set": "9",
  "skill": "Expanding Brackets",
  "level": "medium",
  "type": "mcq",
  "q": "Expand and simplify 6 + 2(3x − 1).",
  "options": [
    "6x + 4",
    "6x + 5",
    "24x − 8",
    "6x − 4"
  ],
  "answer": 0,
  "explain": "Expand first: 2(3x − 1) = 6x − 2. Then 6 − 2 = 4 → 6x + 4. Never add the 6 and 2 first!",
  "rule": "Expand the bracket before adding anything.",
  "mini": {
    "type": "mcq",
    "q": "Expand and simplify 5 + 3(x − 1).",
    "options": [
      "3x + 2",
      "8x − 8",
      "3x − 2",
      "8x − 3"
    ],
    "answer": 0,
    "explain": "3x − 3, then 5 − 3 = 2 → 3x + 2."
  },
  "id": "S9Q07"
},

{
  "set": "9",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "fill",
  "q": "Solve 3n − 4 = 17. n = ▢",
  "answer": "7",
  "accept": [
    "7",
    "n=7",
    "n = 7"
  ],
  "explain": "Add 4 to both sides: 3n = 21. Divide by 3: n = 7. Check: 3×7 − 4 = 17 ✓",
  "rule": "Undo −4 first, then undo ×3.",
  "mini": {
    "type": "mcq",
    "q": "Solve 2n − 3 = 9.",
    "options": [
      "n = 6",
      "n = 3",
      "n = 12",
      "n = 4.5"
    ],
    "answer": 0,
    "explain": "2n = 12, so n = 6."
  },
  "id": "S9Q08"
},

{
  "set": "9",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "mcq",
  "q": "Solve 20 = 4y − 8.",
  "options": [
    "y = 3",
    "y = 7",
    "y = 12",
    "y = 5"
  ],
  "answer": 1,
  "explain": "4y − 8 = 20 → add 8: 4y = 28 → divide by 4: y = 7. Check: 28 − 8 = 20 ✓",
  "rule": "The unknown can start on the right side.",
  "mini": {
    "type": "fill",
    "q": "Solve 10 = 2y − 4. y = ▢",
    "answer": "7",
    "accept": [
      "7",
      "y=7",
      "y = 7"
    ],
    "explain": "2y = 14, so y = 7."
  },
  "id": "S9Q09"
},

{
  "set": "9",
  "skill": "Solving Equations",
  "level": "medium",
  "type": "order",
  "q": "Put the steps for solving 5m − 2 = 18 in the correct order.",
  "items": [
    "Start: 5m − 2 = 18",
    "Add 2 to both sides: 5m = 20",
    "Divide both sides by 5: m = 4",
    "Check: 5 × 4 − 2 = 18 ✓"
  ],
  "explain": "Undo the −2 first, then the ×5, then check by substituting.",
  "rule": "Undo + and − before × and ÷.",
  "mini": {
    "type": "mcq",
    "q": "What is the FIRST step to solve 4x − 6 = 10?",
    "options": [
      "Add 6 to both sides",
      "Divide by 4",
      "Subtract 10",
      "Multiply by 6"
    ],
    "answer": 0,
    "explain": "Undo the −6 first: 4x = 16, then x = 4."
  },
  "id": "S9Q10"
},

{
  "set": "9",
  "skill": "Inequalities",
  "level": "medium",
  "type": "mcq",
  "q": "Which list shows the integers x could be if x < −1?",
  "options": [
    "−1, −2, −3, …",
    "−2, −3, −4, …",
    "0, −1, −2, …",
    "−2, −3, −4 (stop)"
  ],
  "answer": 1,
  "explain": "x is strictly below −1, so start at −2 and count down forever: −2, −3, −4, …",
  "rule": "Start inside the boundary; never stop the list.",
  "mini": {
    "type": "mcq",
    "q": "Largest integer x if x < −1?",
    "options": [
      "−1",
      "−2",
      "0",
      "−3"
    ],
    "answer": 1,
    "explain": "The first integer below −1 is −2."
  },
  "id": "S9Q11"
},

{
  "set": "9",
  "skill": "Inequalities",
  "level": "medium",
  "type": "multi",
  "q": "Select ALL the values that satisfy n > 2.",
  "options": [
    "3",
    "2",
    "5",
    "0",
    "7"
  ],
  "answers": [
    0,
    2,
    4
  ],
  "explain": "3, 5 and 7 are all greater than 2 ✓. But 2 itself is not allowed (strictly greater), and 0 is smaller.",
  "rule": "Test each value one at a time.",
  "mini": {
    "type": "tf",
    "q": "True or false? n = 2 satisfies n > 2.",
    "answer": false,
    "explain": "2 is not greater than 2 — the boundary is excluded."
  },
  "id": "S9Q12"
},

{
  "set": "9",
  "skill": "Writing Expressions",
  "level": "medium",
  "type": "mcq",
  "q": "A rectangle has length l cm and width 3 cm. Which expression gives its PERIMETER?",
  "options": [
    "l + 3",
    "2l + 6",
    "3l",
    "2l + 3"
  ],
  "answer": 1,
  "explain": "Perimeter = 2 lengths + 2 widths = 2l + 2×3 = 2l + 6.",
  "rule": "Perimeter = 2l + 2w.",
  "mini": {
    "type": "mcq",
    "q": "Which expression gives the AREA of the same rectangle?",
    "options": [
      "3l",
      "2l + 6",
      "l + 3",
      "l − 3"
    ],
    "answer": 0,
    "explain": "Area = length × width = 3l."
  },
  "id": "S9Q13"
},

{
  "set": "9",
  "skill": "Reading & Vocabulary",
  "level": "medium",
  "type": "mcq",
  "passage": [
    "A school trip uses this rule for bus tickets: children pay $2 and adults pay $5.",
    "For k children and a adults, the total cost is C = 2k + 5a."
  ],
  "q": "What is the total cost for 20 children and 3 adults?",
  "options": [
    "$55",
    "$46",
    "$40",
    "$115"
  ],
  "answer": 0,
  "explain": "2 × 20 = 40 and 5 × 3 = 15, then 40 + 15 = 55.",
  "rule": "Substitute both letters, multiply each, then add.",
  "mini": {
    "type": "fill",
    "q": "Use C = 2k + 5a for 10 children and 2 adults. C = ▢",
    "answer": "30",
    "accept": [
      "30",
      "$30"
    ],
    "explain": "20 + 10 = 30."
  },
  "id": "S9Q14"
},

{
  "set": "9",
  "skill": "Formulae & Substitution",
  "level": "medium",
  "type": "tf",
  "q": "True or false? A science class uses F = ma. When m = 6 and a = 3, the value of F is 18.",
  "answer": true,
  "explain": "ma means m × a = 6 × 3 = 18 ✓",
  "rule": "Letters written together are multiplied.",
  "mini": {
    "type": "mcq",
    "q": "Find F = ma when m = 4 and a = 5.",
    "options": [
      "9",
      "20",
      "45",
      "1"
    ],
    "answer": 1,
    "explain": "4 × 5 = 20."
  },
  "id": "S9Q15"
},

{
  "set": "10",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "mcq",
  "q": "Expand and simplify 3(2x + 1) + 2(x − 4).",
  "options": [
    "8x − 5",
    "8x + 5",
    "8x − 11",
    "7x − 5"
  ],
  "answer": 0,
  "explain": "3(2x+1) = 6x + 3 and 2(x−4) = 2x − 8. Collect: 6x + 2x = 8x and 3 − 8 = −5 → 8x − 5.",
  "rule": "Expand BOTH brackets, then collect like terms.",
  "mini": {
    "type": "mcq",
    "q": "Expand and simplify 2(x + 3) + 3(x − 1).",
    "options": [
      "5x + 3",
      "5x − 3",
      "6x + 3",
      "5x + 9"
    ],
    "answer": 0,
    "explain": "2x + 6 + 3x − 3 = 5x + 3."
  },
  "id": "S10Q01"
},

{
  "set": "10",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "mcq",
  "q": "Simplify b/3 + b/6.",
  "options": [
    "b/2",
    "2b/9",
    "b/18",
    "2b/3"
  ],
  "answer": 0,
  "explain": "Common denominator 6: b/3 = 2b/6. Then 2b/6 + b/6 = 3b/6 = b/2.",
  "rule": "Match the denominators, add the numerators, then simplify.",
  "mini": {
    "type": "mcq",
    "q": "Simplify a/2 + a/4.",
    "options": [
      "3a/4",
      "2a/6",
      "a/8",
      "2a/4"
    ],
    "answer": 0,
    "explain": "2a/4 + a/4 = 3a/4."
  },
  "id": "S10Q02"
},

{
  "set": "10",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "fill",
  "q": "Solve 4x + 7 = −5. x = ▢",
  "answer": "-3",
  "accept": [
    "-3",
    "−3",
    "x=-3",
    "x = -3",
    "x=−3"
  ],
  "explain": "Subtract 7: 4x = −12. Divide by 4: x = −3. Check: 4×(−3) + 7 = −5 ✓",
  "rule": "The balance rules work with negative answers too.",
  "mini": {
    "type": "mcq",
    "q": "Solve 2x + 9 = 5.",
    "options": [
      "x = −2",
      "x = 2",
      "x = 7",
      "x = −7"
    ],
    "answer": 0,
    "explain": "2x = −4, so x = −2."
  },
  "id": "S10Q03"
},

{
  "set": "10",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "mcq",
  "q": "A taxi charges a $3 pick-up fee plus $2 per kilometre. A ride costs $15. How many kilometres was it?",
  "options": [
    "9 km",
    "6 km",
    "7.5 km",
    "5 km"
  ],
  "answer": 1,
  "explain": "The equation is 2k + 3 = 15. Subtract 3: 2k = 12. Divide by 2: k = 6 km.",
  "rule": "fee + rate × distance = total; solve for the distance.",
  "mini": {
    "type": "mcq",
    "q": "Same taxi, ride costs $11. How far?",
    "options": [
      "4 km",
      "5.5 km",
      "8 km",
      "3 km"
    ],
    "answer": 0,
    "explain": "2k + 3 = 11 → 2k = 8 → k = 4."
  },
  "id": "S10Q04"
},

{
  "set": "10",
  "skill": "Writing Expressions",
  "level": "hard",
  "type": "mcq",
  "q": "Which expression means “the difference between 5 times p and 4 times q” (p part is larger)?",
  "options": [
    "5p + 4q",
    "5p − 4q",
    "20pq",
    "5(p − 4q)"
  ],
  "answer": 1,
  "explain": "5 times p is 5p, 4 times q is 4q, and the difference subtracts them: 5p − 4q.",
  "rule": "difference → subtract the two amounts.",
  "mini": {
    "type": "mcq",
    "q": "“3 times a minus 2 times b” is…",
    "options": [
      "3a − 2b",
      "3a + 2b",
      "6ab",
      "a − b"
    ],
    "answer": 0,
    "explain": "3a − 2b."
  },
  "id": "S10Q05"
},

{
  "set": "10",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "If n + 3 > 10, what is the SMALLEST integer n could be?",
  "options": [
    "7",
    "8",
    "13",
    "6"
  ],
  "answer": 1,
  "explain": "n + 3 > 10 means n > 7. The first integer above 7 is 8. (n = 7 gives exactly 10, which is not MORE than 10.)",
  "rule": "Solve the inequality like an equation, then pick the first integer inside.",
  "mini": {
    "type": "mcq",
    "q": "If n + 1 > 5, the smallest integer n is…",
    "options": [
      "4",
      "5",
      "6",
      "3"
    ],
    "answer": 1,
    "explain": "n > 4, so the first integer is 5."
  },
  "id": "S10Q06"
},

{
  "set": "10",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "What is the SMALLEST integer w could be if w > −1.5?",
  "options": [
    "−2",
    "−1",
    "0",
    "1"
  ],
  "answer": 1,
  "explain": "Just above −1.5 on the number line sits −1. (−2 is below −1.5!)",
  "rule": "For negatives, “greater” means closer to zero (and beyond).",
  "mini": {
    "type": "mcq",
    "q": "Largest integer w if w < −1.5?",
    "options": [
      "−1",
      "−2",
      "0",
      "−3"
    ],
    "answer": 1,
    "explain": "The first integer below −1.5 is −2."
  },
  "id": "S10Q07"
},

{
  "set": "10",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "multi",
  "q": "Final challenge check! Select every statement below that is TRUE.",
  "options": [
    "3(x + 2) = 3x + 6",
    "5y − y = 5",
    "The solution of x/2 = 6 is x = 12",
    "2n + 3n = 5n²",
    "x > 0 does NOT include 0"
  ],
  "answers": [
    0,
    2,
    4
  ],
  "explain": "3(x+2) = 3x+6 ✓ and x/2 = 6 → x = 12 ✓ and x > 0 excludes 0 ✓. But 5y − y = 4y, and 2n + 3n = 5n (no square!).",
  "rule": "Check each statement against its Unit 2 rule.",
  "mini": {
    "type": "mcq",
    "q": "Solve x/2 = 6.",
    "options": [
      "x = 3",
      "x = 12",
      "x = 8",
      "x = 4"
    ],
    "answer": 1,
    "explain": "Multiply both sides by 2: x = 12."
  },
  "id": "S10Q08"
},

{
  "set": "10",
  "skill": "Formulae & Substitution",
  "level": "hard",
  "type": "mcq",
  "q": "Distance = speed × time, written d = st. Find the time t when d = 42 and s = 6.",
  "options": [
    "t = 7",
    "t = 36",
    "t = 48",
    "t = 252"
  ],
  "answer": 0,
  "explain": "42 = 6 × t, so t = 42 ÷ 6 = 7.",
  "rule": "Use the inverse (divide) to free the hidden letter.",
  "mini": {
    "type": "fill",
    "q": "d = st. Find t when d = 20 and s = 4. ▢",
    "answer": "5",
    "accept": [
      "5",
      "t=5",
      "t = 5"
    ],
    "explain": "20 ÷ 4 = 5."
  },
  "id": "S10Q09"
},

{
  "set": "10",
  "skill": "Collecting Like Terms",
  "level": "hard",
  "type": "mcq",
  "q": "Simplify 5gh + 2g − 3hg + h.",
  "options": [
    "2gh + 2g + h",
    "4gh + h",
    "2gh + 3gh",
    "2g + 2h"
  ],
  "answer": 0,
  "explain": "hg = gh, so 5gh − 3gh = 2gh. The 2g and h have no partners: 2gh + 2g + h.",
  "rule": "Collect only the terms with identical letters.",
  "mini": {
    "type": "mcq",
    "q": "Simplify 4xy − 2yx.",
    "options": [
      "2xy",
      "6xy",
      "2x²y²",
      "2"
    ],
    "answer": 0,
    "explain": "yx = xy → 4xy − 2xy = 2xy."
  },
  "id": "S10Q10"
},

{
  "set": "10",
  "skill": "Expanding Brackets",
  "level": "hard",
  "type": "fill",
  "q": "Expand 7(2a + 3b − 1). Type the full answer (e.g. 4a+6b−2). ▢",
  "answer": "14a+21b−7",
  "accept": [
    "14a+21b−7",
    "14a+21b-7",
    "14a + 21b − 7",
    "14a + 21b - 7"
  ],
  "explain": "Three terms, three multiplications: 7×2a = 14a, 7×3b = 21b, 7×1 = 7 (subtracted).",
  "rule": "Every term inside gets multiplied by 7.",
  "mini": {
    "type": "mcq",
    "q": "Expand 4(a + 2b − 1).",
    "options": [
      "4a + 2b − 1",
      "4a + 8b − 4",
      "4a + 8b + 4",
      "7ab − 4"
    ],
    "answer": 1,
    "explain": "4a, 8b and −4."
  },
  "id": "S10Q11"
},

{
  "set": "10",
  "skill": "Solving Equations",
  "level": "hard",
  "type": "order",
  "q": "Put the problem-solving steps in the correct order.",
  "items": [
    "Read: 4 bags each hold b marbles, plus 3 loose marbles, 27 marbles in total",
    "Write the equation: 4b + 3 = 27",
    "Subtract 3 from both sides: 4b = 24",
    "Divide both sides by 4: b = 6"
  ],
  "explain": "Read → write the equation → undo the +3 → undo the ×4. Each bag holds 6 marbles.",
  "rule": "Model the story first, then solve with inverse operations.",
  "mini": {
    "type": "mcq",
    "q": "3 boxes each hold p pens, plus 2 loose pens, 17 pens in total. p = ?",
    "options": [
      "p = 5",
      "p = 6",
      "p = 15",
      "p = 4"
    ],
    "answer": 0,
    "explain": "3p + 2 = 17 → 3p = 15 → p = 5."
  },
  "id": "S10Q12"
},

{
  "set": "10",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "mcq",
  "passage": [
    "Aya's puzzle box follows the rule OUT = 3 × IN − 2.",
    "She puts in 4 and gets 10 out. She puts in 7 and gets 19 out.",
    "Her brother puts in a mystery number and gets 25 out."
  ],
  "q": "What was the mystery number?",
  "options": [
    "8",
    "9",
    "23",
    "73"
  ],
  "answer": 1,
  "explain": "Work backwards: 3 × IN − 2 = 25 → 3 × IN = 27 → IN = 9. Check: 3×9 − 2 = 25 ✓",
  "rule": "Undo the rule step by step, in reverse order.",
  "mini": {
    "type": "mcq",
    "q": "Same box: the output is 13. What went in?",
    "options": [
      "5",
      "6",
      "11",
      "37"
    ],
    "answer": 0,
    "explain": "3 × IN = 15 → IN = 5."
  },
  "id": "S10Q13"
},

{
  "set": "10",
  "skill": "Reading & Vocabulary",
  "level": "hard",
  "type": "mcq",
  "q": "Which pair shows EQUIVALENT expressions?",
  "options": [
    "4(n + 2) and 4n + 2",
    "2n + 5 and 5n + 2",
    "6(m − 1) and 6m − 6",
    "k + k and k²"
  ],
  "answer": 2,
  "explain": "6(m − 1) expands to exactly 6m − 6 ✓. The others don't match: 4(n+2) = 4n + 8, the middle pair swaps coefficients, and k + k = 2k.",
  "rule": "Expand or substitute a number to test equivalence.",
  "mini": {
    "type": "tf",
    "q": "True or false? 5x + 3 and 3 + 5x are equivalent.",
    "answer": true,
    "explain": "Addition works in any order."
  },
  "id": "S10Q14"
},

{
  "set": "10",
  "skill": "Inequalities",
  "level": "hard",
  "type": "mcq",
  "q": "Which value of x makes BOTH x > 3 AND x < 8 true?",
  "options": [
    "3",
    "5",
    "8",
    "9"
  ],
  "answer": 1,
  "explain": "x must be between 3 and 8 (not touching either end). Only 5 fits: 5 > 3 ✓ and 5 < 8 ✓.",
  "rule": "Check the value against BOTH inequalities.",
  "mini": {
    "type": "mcq",
    "q": "Which value satisfies both x > 0 and x < 4?",
    "options": [
      "0",
      "2",
      "4",
      "5"
    ],
    "answer": 1,
    "explain": "2 is above 0 and below 4 ✓"
  },
  "id": "S10Q15"
}
];
