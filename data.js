/* ============================================================
   data.js — Lessons, key words, practice & activity content
   Maths 7 · Unit 1: Integers — Bright EngMath © 2026
   All content is original.
   ============================================================ */

const LESSONS = [
  {
    id: "L1",
    code: "1.1",
    title: "Adding & Subtracting Integers",
    color: "sky",
    summary: "Use a number line and the inverse trick to add and subtract positive and negative numbers.",
    intro: "Integers are all the whole numbers — positive numbers, negative numbers and zero. A number line is your best friend: adding a positive number moves you RIGHT, adding a negative number moves you LEFT.",
    keyPoints: [
      "Adding a positive number → move RIGHT on the number line.",
      "Adding a negative number → move LEFT on the number line.",
      "To subtract an integer, ADD its inverse. The inverse of 6 is −6, and the inverse of −6 is 6.",
      "You can estimate answers by rounding the numbers first."
    ],
    soundboxes: { label: "The Golden Move", boxes: ["a − b", "=", "a + (−b)"], style: "lav" },
    examples: [
      { line: "−6 + 9 = 3", why: "Start at −6, jump 9 to the right." },
      { line: "5 + −8 = −3", why: "Start at 5, jump 8 to the left." },
      { line: "−2 + −7 = −9", why: "Two moves left: you get further below zero." },
      { line: "3 − 10 = −7", why: "Same as 3 + (−10)." },
      { line: "−4 − −9 = 5", why: "Add the inverse of −9, which is 9: −4 + 9 = 5." }
    ],
    tip: "Say it out loud: “Subtracting a negative is the same as ADDING a positive.” Two minus signs next to each other turn into a plus!",
    mistakes: [
      { wrong: "−3 + −5 = −2", right: "−3 + −5 = −8", note: "Both jumps go LEFT, so the answer gets more negative — don’t subtract!" },
      { wrong: "7 − −2 = 5", right: "7 − −2 = 9", note: "Subtracting −2 means adding 2." }
    ],
    table: {
      caption: "Which way do I move?",
      head: ["Calculation", "Move", "Answer"],
      rows: [
        ["−1 + 6", "6 right", "5"],
        ["−1 − 6", "6 left", "−7"],
        ["−1 + −6", "6 left", "−7"],
        ["−1 − −6", "6 right (add the inverse!)", "5"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "Work out −5 + 9.",
      options: ["−4", "4", "−14", "14"],
      answer: 1,
      explain: "Start at −5 and move 9 to the right: −5 → −4 → −3 → −2 → −1 → 0 → 1 → 2 → 3 → 4.",
      rule: "Adding a positive number moves you right on the number line."
    }
  },
  {
    id: "L2",
    code: "1.2",
    title: "Multiplying & Dividing Integers",
    color: "lavender",
    summary: "One simple sign rule: when one number is positive and one is negative, the answer is negative.",
    intro: "Multiplying a negative number is just repeated adding: −4 × 3 means −4 + −4 + −4 = −12. Division is the inverse of multiplication, so the same sign rule works for both.",
    keyPoints: [
      "positive × negative = NEGATIVE (and negative × positive = NEGATIVE).",
      "When you divide and exactly one number is negative, the answer is NEGATIVE.",
      "Always do the calculation inside brackets first.",
      "Work out the number part first, then decide the sign."
    ],
    soundboxes: { label: "Sign Rule", boxes: ["(+) × (−)", "=", "(−)"], style: "peach" },
    examples: [
      { line: "7 × −3 = −21", why: "7 × 3 = 21, and one number is negative → −21." },
      { line: "−5 × 6 = −30", why: "5 × 6 = 30, signs are different → −30." },
      { line: "−28 ÷ 7 = −4", why: "28 ÷ 7 = 4, one negative → −4." },
      { line: "45 ÷ −9 = −5", why: "45 ÷ 9 = 5, one negative → −5." },
      { line: "4 × (2 − 7) = −20", why: "Brackets first: 2 − 7 = −5, then 4 × −5 = −20." }
    ],
    tip: "Do it in two steps: 1) multiply or divide the numbers as if they were both positive, 2) then attach the minus sign if exactly one of them is negative.",
    mistakes: [
      { wrong: "6 × −4 = 24", right: "6 × −4 = −24", note: "The minus sign never disappears — different signs give a negative product." },
      { wrong: "−30 ÷ 5 = 6", right: "−30 ÷ 5 = −6", note: "One number is negative, so the quotient must be negative too." }
    ],
    table: {
      caption: "Spot the sign",
      head: ["Calculation", "Number part", "Final answer"],
      rows: [
        ["8 × −2", "16", "−16"],
        ["−9 × 4", "36", "−36"],
        ["−40 ÷ 8", "5", "−5"],
        ["36 ÷ −6", "6", "−6"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "Work out −8 × 3.",
      options: ["24", "−24", "−11", "11"],
      answer: 1,
      explain: "8 × 3 = 24. One factor is negative, so the product is negative: −24.",
      rule: "positive × negative = negative."
    }
  },
  {
    id: "L3",
    code: "1.3",
    title: "Lowest Common Multiples (LCM)",
    color: "mint",
    summary: "List the multiples of each number and find the smallest one they share.",
    intro: "The multiples of a number are what you get in its times table: multiples of 4 are 4, 8, 12, 16, … A COMMON multiple belongs to both lists, and the LOWEST common multiple (LCM) is the smallest one.",
    keyPoints: [
      "Multiples of 6: 6, 12, 18, 24, 30, 36, … (they go on forever).",
      "Common multiples of 4 and 6: 12, 24, 36, …",
      "The LCM is the FIRST number that appears in both lists.",
      "Speed trick: list the multiples of the BIGGER number, and check each one against the smaller number."
    ],
    soundboxes: { label: "LCM of 4 and 10", boxes: ["4, 8, 12, 16, 20", "10, 20", "LCM = 20"], style: "mint" },
    examples: [
      { line: "LCM of 3 and 5 = 15", why: "Multiples of 5: 5, 10, 15 — and 15 is in the 3 times table." },
      { line: "LCM of 6 and 9 = 18", why: "Multiples of 9: 9, 18 — and 18 = 3 × 6. Done!" },
      { line: "LCM of 5 and 10 = 10", why: "The LCM can be one of the numbers itself." },
      { line: "LCM of 2, 3 and 5 = 30", why: "30 is the first number in all three times tables." }
    ],
    tip: "The LCM is never smaller than the biggest of your numbers — so start checking from there!",
    mistakes: [
      { wrong: "LCM of 4 and 6 = 24", right: "LCM of 4 and 6 = 12", note: "4 × 6 = 24 is A common multiple, but not always the LOWEST one." },
      { wrong: "LCM of 3 and 9 = 27", right: "LCM of 3 and 9 = 9", note: "9 is already a multiple of 3, so 9 itself is the LCM." }
    ],
    table: {
      caption: "LCM practice table",
      head: ["Numbers", "Useful list", "LCM"],
      rows: [
        ["2 and 7", "7, 14", "14"],
        ["6 and 8", "8, 16, 24", "24"],
        ["10 and 15", "15, 30", "30"],
        ["4 and 12", "12", "12"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "What is the LCM of 6 and 10?",
      options: ["2", "16", "30", "60"],
      answer: 2,
      explain: "Multiples of 10: 10, 20, 30. Is 30 in the 6 times table? Yes — 6 × 5 = 30. So the LCM is 30, not 60.",
      rule: "The LCM is the smallest number in BOTH times tables — it is not always the two numbers multiplied together."
    }
  },
  {
    id: "L4",
    code: "1.4",
    title: "Highest Common Factors (HCF)",
    color: "peach",
    summary: "List the factors of each number and find the biggest one they share. Great for simplifying fractions!",
    intro: "A factor divides into a number exactly, with no remainder. The factors of 12 are 1, 2, 3, 4, 6 and 12. The HIGHEST common factor (HCF) of two numbers is the biggest number that is a factor of both.",
    keyPoints: [
      "Find factors in PAIRS: 12 = 1×12 = 2×6 = 3×4, so its factors are 1, 2, 3, 4, 6, 12.",
      "Common factors appear in both lists.",
      "The HCF is the LARGEST common factor.",
      "Dividing the top and bottom of a fraction by their HCF simplifies it fully in one step."
    ],
    soundboxes: { label: "HCF of 20 and 28", boxes: ["20: 1,2,4,5,10,20", "28: 1,2,4,7,14,28", "HCF = 4"], style: "peach" },
    examples: [
      { line: "HCF of 14 and 21 = 7", why: "Factors of 14: 1, 2, 7, 14. Factors of 21: 1, 3, 7, 21. Biggest shared: 7." },
      { line: "HCF of 8 and 20 = 4", why: "Common factors are 1, 2 and 4 — the highest is 4." },
      { line: "HCF of 9 and 16 = 1", why: "Some pairs share only the factor 1." },
      { line: "20⁄32 = 5⁄8", why: "HCF of 20 and 32 is 4. Divide top and bottom by 4." }
    ],
    tip: "Factors come in pairs, so hunt them two at a time. And remember: the HCF can never be bigger than the smaller number!",
    mistakes: [
      { wrong: "HCF of 6 and 8 = 24", right: "HCF of 6 and 8 = 2", note: "24 is their LCM! Factors make numbers SMALLER or equal, multiples make them BIGGER or equal." },
      { wrong: "The factors of 15 are 15, 30, 45", right: "The factors of 15 are 1, 3, 5, 15", note: "15, 30, 45 are multiples of 15, not factors." }
    ],
    table: {
      caption: "Factors vs multiples — don’t mix them up!",
      head: ["Word", "Question it answers", "Example for 10"],
      rows: [
        ["Factor", "What divides INTO 10?", "1, 2, 5, 10"],
        ["Multiple", "What is IN the 10 times table?", "10, 20, 30, 40, …"],
        ["HCF", "Biggest shared factor", "HCF of 10 and 15 = 5"],
        ["LCM", "Smallest shared multiple", "LCM of 10 and 15 = 30"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "What is the HCF of 18 and 24?",
      options: ["2", "3", "6", "72"],
      answer: 2,
      explain: "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The common factors are 1, 2, 3, 6 — the highest is 6. (72 is their LCM!)",
      rule: "HCF = the biggest number that divides into BOTH numbers exactly."
    }
  },
  {
    id: "L5",
    code: "1.5",
    title: "Tests for Divisibility",
    color: "sky",
    summary: "Quick detective rules that tell you if a big number can be divided exactly — without doing the division!",
    intro: "“Divisible by 3” means you can divide by 3 with NO remainder. Divisibility tests let you check huge numbers in seconds, just by looking at their digits.",
    keyPoints: [
      "By 2 → last digit is 0, 2, 4, 6 or 8.",
      "By 3 → the SUM of the digits is a multiple of 3.",
      "By 4 → the last TWO digits make a number divisible by 4.",
      "By 5 → last digit is 0 or 5.  By 10 → last digit is 0.",
      "By 6 → divisible by 2 AND by 3.",
      "By 8 → the last THREE digits make a number divisible by 8.",
      "By 9 → the sum of the digits is a multiple of 9.",
      "By 11 → (sum of 1st, 3rd, 5th… digits) − (sum of 2nd, 4th… digits) is 0 or a multiple of 11.",
      "By 7 → remove the last digit, subtract it twice from what is left, and test that smaller number."
    ],
    soundboxes: { label: "Try 738 by 3", boxes: ["7+3+8", "=18", "18 = 6×3 ✓"], style: "lav" },
    examples: [
      { line: "846 is divisible by 2", why: "It ends in 6 — an even digit." },
      { line: "534 is divisible by 3", why: "5 + 3 + 4 = 12, and 12 is a multiple of 3." },
      { line: "716 is divisible by 4", why: "The last two digits, 16, divide by 4." },
      { line: "918 is divisible by 9", why: "9 + 1 + 8 = 18, a multiple of 9." },
      { line: "462 is divisible by 11", why: "(4 + 2) − 6 = 0 → divisible by 11." },
      { line: "315 is divisible by 7", why: "31 − 2×5 = 21, and 21 = 3 × 7 ✓" }
    ],
    tip: "For 6, be a double detective: check 2 (last digit even) AND 3 (digit sum). Both must pass!",
    mistakes: [
      { wrong: "1 4 3 is divisible by 3 because it ends in 3", right: "Check the digit SUM: 1+4+3 = 8 → NOT divisible by 3", note: "The last digit rule only works for 2, 5 and 10 — never for 3 or 9." },
      { wrong: "214 is divisible by 4 because it is even", right: "Last two digits 14 don’t divide by 4 → not divisible", note: "Even only guarantees dividing by 2. For 4, test the last TWO digits." }
    ],
    table: {
      caption: "Divisibility detective card",
      head: ["Divide by", "Look at", "Pass example"],
      rows: [
        ["2", "last digit even", "58"],
        ["3", "digit sum ÷ 3", "411 (4+1+1=6)"],
        ["4", "last two digits", "532 (32÷4)"],
        ["5", "ends in 0 or 5", "285"],
        ["6", "passes 2 AND 3", "234"],
        ["9", "digit sum ÷ 9", "738 (=18)"],
        ["10", "ends in 0", "640"],
        ["11", "alternating digit sums", "594 (5−9+4=0)"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "Which number is divisible by 9?",
      options: ["512", "623", "747", "805"],
      answer: 2,
      explain: "Add the digits: 7 + 4 + 7 = 18, and 18 is a multiple of 9 — so 747 divides by 9 exactly. The others have digit sums of 8, 11 and 13.",
      rule: "A number is divisible by 9 when its digit sum is a multiple of 9."
    }
  },
  {
    id: "L6",
    code: "1.6",
    title: "Square Roots & Cube Roots",
    color: "lavender",
    summary: "Squares, cubes, the √ and ∛ symbols — and how to estimate roots that aren’t exact.",
    intro: "A square number comes from multiplying a number by itself: 5² = 5 × 5 = 25. A cube number uses the number three times: 2³ = 2 × 2 × 2 = 8. Roots go BACKWARDS: √25 = 5 and ∛8 = 2.",
    keyPoints: [
      "Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225…",
      "Cube numbers: 1, 8, 27, 64, 125, 216, …",
      "√ asks: “what number, squared, gives me this?”",
      "∛ asks: “what number, cubed, gives me this?”",
      "To estimate √50: it sits between √49 = 7 and √64 = 8, and much closer to 7."
    ],
    soundboxes: { label: "Root pairs to memorise", boxes: ["√144 = 12", "∛64 = 4", "13² = 169"], style: "mint" },
    examples: [
      { line: "9² = 81 and √81 = 9", why: "Squaring and square-rooting undo each other." },
      { line: "3³ = 27 and ∛27 = 3", why: "Cubing and cube-rooting undo each other." },
      { line: "√52 is between 7 and 8", why: "49 < 52 < 64, so the root is between √49 and √64." },
      { line: "√52 ≈ 7 (nearest integer)", why: "52 is much closer to 49 than to 64." },
      { line: "64 is square AND cube", why: "64 = 8² and 64 = 4³. A double star!" }
    ],
    tip: "The small ³ in ∛ tells you it’s a CUBE root. No little number means square root. Read the symbol before you calculate!",
    mistakes: [
      { wrong: "3² = 6", right: "3² = 9", note: "3² means 3 × 3, not 3 × 2." },
      { wrong: "√16 = 8", right: "√16 = 4", note: "√16 asks “what × itself = 16?” — that’s 4, not half of 16." },
      { wrong: "∛9 = 3", right: "∛27 = 3", note: "3 cubed is 27, so it’s the cube root of 27. (√9 = 3 is the square root fact.)" }
    ],
    table: {
      caption: "Squares and cubes side by side",
      head: ["n", "n²", "n³"],
      rows: [
        ["2", "4", "8"],
        ["3", "9", "27"],
        ["4", "16", "64"],
        ["5", "25", "125"],
        ["6", "36", "216"],
        ["10", "100", "1000"]
      ]
    },
    quickCheck: {
      type: "mcq",
      q: "Between which two consecutive integers is √90?",
      options: ["8 and 9", "9 and 10", "10 and 11", "44 and 46"],
      answer: 1,
      explain: "9² = 81 and 10² = 100. Since 81 < 90 < 100, √90 must be between 9 and 10.",
      rule: "Trap the number between two square numbers, then take their roots."
    }
  }
];

/* ---------------- Key words (all original definitions) ---------------- */
const VOCAB = [
  { word: "integer", say: "IN-tuh-jer", meaning: "Any whole number — positive, negative or zero.", example: "−7, 0 and 25 are all integers, but 3.5 is not.", icon: "🔢", cat: "Numbers" },
  { word: "negative integer", say: "NEG-uh-tiv", meaning: "A whole number less than zero.", example: "The temperature fell to −6 °C — a negative integer.", icon: "🧊", cat: "Numbers" },
  { word: "positive integer", say: "POZ-ih-tiv", meaning: "A whole number greater than zero.", example: "1, 2, 3 and 100 are positive integers.", icon: "☀️", cat: "Numbers" },
  { word: "number line", say: "NUM-ber line", meaning: "A straight line with numbers in order, used for jumping left and right.", example: "Show −3 + 5 by jumping right on a number line.", icon: "📏", cat: "Numbers" },
  { word: "inverse", say: "IN-verss", meaning: "The opposite. The inverse of 4 is −4; the inverse of adding is subtracting.", example: "To subtract −3, add its inverse: +3.", icon: "🔄", cat: "Operations" },
  { word: "sum", say: "SUM", meaning: "The answer to an addition.", example: "The sum of −2 and 9 is 7.", icon: "➕", cat: "Operations" },
  { word: "product", say: "PROD-ukt", meaning: "The answer to a multiplication.", example: "The product of 6 and −3 is −18.", icon: "✖️", cat: "Operations" },
  { word: "estimate", say: "ES-tim-ate", meaning: "A sensible ‘close-enough’ answer found by rounding first.", example: "Estimate 49 × −2.1 as 50 × −2 = −100.", icon: "🎯", cat: "Operations" },
  { word: "round", say: "ROWND", meaning: "To change a number to a simpler nearby value.", example: "−48 rounds to −50 to the nearest ten.", icon: "🎈", cat: "Operations" },
  { word: "multiple", say: "MUL-tip-ul", meaning: "A number in another number’s times table.", example: "35 is a multiple of 7 because 7 × 5 = 35.", icon: "📶", cat: "Multiples & Factors" },
  { word: "common multiple", say: "KOM-un", meaning: "A number that is in two (or more) times tables at once.", example: "24 is a common multiple of 6 and 8.", icon: "🤝", cat: "Multiples & Factors" },
  { word: "lowest common multiple (LCM)", say: "el-see-EM", meaning: "The smallest number that appears in both times tables.", example: "The LCM of 4 and 6 is 12.", icon: "🥇", cat: "Multiples & Factors" },
  { word: "factor", say: "FAK-tor", meaning: "A number that divides into another exactly, with no remainder.", example: "6 is a factor of 42 because 42 ÷ 6 = 7.", icon: "🧩", cat: "Multiples & Factors" },
  { word: "common factor", say: "KOM-un FAK-tor", meaning: "A number that divides exactly into two (or more) numbers.", example: "5 is a common factor of 20 and 35.", icon: "🔗", cat: "Multiples & Factors" },
  { word: "highest common factor (HCF)", say: "aitch-see-EF", meaning: "The biggest number that divides into both numbers exactly.", example: "The HCF of 12 and 30 is 6.", icon: "🏆", cat: "Multiples & Factors" },
  { word: "divisible", say: "div-IZ-ib-ul", meaning: "Can be divided exactly, leaving no remainder.", example: "captains chose 84 because it is divisible by 2, 3, 4 and 6.", icon: "✂️", cat: "Multiples & Factors" },
  { word: "digit", say: "DIJ-it", meaning: "A single symbol 0–9 used to build numbers.", example: "The number 507 has three digits.", icon: "🔟", cat: "Numbers" },
  { word: "square number", say: "SKWAIR", meaning: "The result of multiplying a whole number by itself.", example: "49 is a square number because 7 × 7 = 49.", icon: "🟦", cat: "Powers & Roots" },
  { word: "square root (√)", say: "SKWAIR root", meaning: "The number that, multiplied by itself, gives your number.", example: "√121 = 11.", icon: "🌱", cat: "Powers & Roots" },
  { word: "cube number", say: "KYOOB", meaning: "The result of using a whole number three times in a multiplication.", example: "125 is a cube number because 5 × 5 × 5 = 125.", icon: "🎲", cat: "Powers & Roots" },
  { word: "cube root (∛)", say: "KYOOB root", meaning: "The number that, used three times in a multiplication, gives your number.", example: "∛216 = 6.", icon: "🌳", cat: "Powers & Roots" },
  { word: "consecutive", say: "kon-SEK-yoo-tiv", meaning: "Following one after another with no gaps.", example: "√40 lies between the consecutive integers 6 and 7.", icon: "🚶‍♀️", cat: "Numbers" }
];

const VOCAB_CATS = ["All", "Numbers", "Operations", "Multiples & Factors", "Powers & Roots"];

/* Vocab activities */
const VOCAB_MATCH = [
  { left: "factor", right: "divides in exactly" },
  { left: "multiple", right: "lives in the times table" },
  { left: "product", right: "answer to a multiplication" },
  { left: "sum", right: "answer to an addition" },
  { left: "integer", right: "whole number, + or − or 0" },
  { left: "square root", right: "undoes squaring" },
  { left: "LCM", right: "smallest shared multiple" },
  { left: "HCF", right: "biggest shared factor" }
];

const VOCAB_ODD = [
  { q: "Find the odd one out.", options: ["4", "16", "25", "20"], answer: 3,
    explain: "4, 16 and 25 are square numbers (2², 4², 5²). 20 is not a square number.", rule: "Square numbers come from n × n." },
  { q: "Find the odd one out.", options: ["8", "27", "64", "36"], answer: 3,
    explain: "8, 27 and 64 are cube numbers (2³, 3³, 4³). 36 is a square number but not a cube.", rule: "Cube numbers come from n × n × n." },
  { q: "Find the odd one out.", options: ["12", "18", "24", "27"], answer: 3,
    explain: "12, 18 and 24 are all multiples of 6. 27 is not (27 ÷ 6 leaves a remainder).", rule: "Multiples of 6 are 6, 12, 18, 24, 30…" },
  { q: "Find the odd one out.", options: ["−3", "0", "7", "2.5"], answer: 3,
    explain: "−3, 0 and 7 are integers. 2.5 is not a whole number, so it is not an integer.", rule: "Integers are whole numbers only — no fractions or decimals." },
  { q: "Find the odd one out.", options: ["1", "3", "5", "10"], answer: 3,
    explain: "1, 3 and 5 are factors of 15. 10 is not, because 15 ÷ 10 is not exact.", rule: "Factors divide in exactly with no remainder." }
];

const VOCAB_SORT = {
  buckets: ["Factor of 24", "Multiple of 24"],
  items: [
    { t: "6", b: 0 }, { t: "8", b: 0 }, { t: "48", b: 1 },
    { t: "3", b: 0 }, { t: "72", b: 1 }, { t: "120", b: 1 }
  ],
  explain: "Factors of 24 divide into 24 exactly (3, 6, 8). Multiples of 24 are in the 24 times table (48, 72, 120).",
  rule: "Factors are ≤ the number; multiples are ≥ the number."
};

const VOCAB_SPELL = [
  { q: "Choose the correct spelling for the word that means “can be divided exactly”.",
    options: ["divisible", "divisable", "dividible", "devisible"], answer: 0,
    explain: "The correct spelling is d-i-v-i-s-i-b-l-e — “divisible”, with -ible at the end.", rule: "Maths words ending in -ible: divisible, invisible." },
  { q: "Choose the correct spelling.",
    options: ["consecutive", "consecative", "consequtive", "consecutif"], answer: 0,
    explain: "“Consecutive” — con-sec-u-tive — means one after another, like 7 and 8.", rule: "Think: CONSECutive = in SEQuence." },
  { q: "Choose the correct spelling for the answer to a multiplication.",
    options: ["prodact", "product", "produckt", "prouduct"], answer: 1,
    explain: "The answer to a multiplication is the “product”.", rule: "pro + duct — like a factory producing an answer." },
  { q: "Choose the correct spelling.",
    options: ["intiger", "integar", "integer", "intejer"], answer: 2,
    explain: "“Integer” is spelled i-n-t-e-g-e-r.", rule: "Integer has “teg” in the middle — in-TEG-er." },
  { q: "Complete the word: m _ l t _ p l e (a number in a times table).",
    options: ["u, i", "o, i", "u, e", "a, i"], answer: 0,
    explain: "The word is “multiple”: m-U-l-t-I-p-l-e.", rule: "MULTIple — think “multiply”." }
];

const MEMORY_PAIRS = [
  ["√49", "7"], ["2³", "8"], ["LCM of 2 & 3", "6"], ["HCF of 10 & 15", "5"],
  ["−4 + 9", "5 "], ["3 × −3", "−9"]
];

/* ---------------- Practice sets (Section: Skills Practice) ---------------- */
const PRACTICE_SETS = [
  {
    id: "P1", title: "Integer Operations Lab", icon: "🌡️", color: "sky",
    desc: "Add, subtract, multiply and divide with negative numbers.",
    questions: [
      { type: "mcq", q: "Work out −7 + 4.", options: ["−3", "3", "−11", "11"], answer: 0,
        explain: "Start at −7 and move 4 right: you reach −3.", rule: "Adding a positive → move right." },
      { type: "mcq", q: "Work out 6 − −5.", options: ["1", "−1", "11", "−11"], answer: 2,
        explain: "Subtracting −5 means adding 5: 6 + 5 = 11.", rule: "Two minus signs together become a plus." },
      { type: "fill", q: "Fill the gap: −9 + □ = −2", answer: "7", accept: ["7", "+7"],
        explain: "From −9 you must move 7 to the right to reach −2.", rule: "Count the jumps between the two numbers on a number line." },
      { type: "mcq", q: "Work out −6 × 7.", options: ["42", "−42", "−13", "13"], answer: 1,
        explain: "6 × 7 = 42; one factor is negative so the product is −42.", rule: "Different signs → negative product." },
      { type: "mcq", q: "Work out 54 ÷ −6.", options: ["9", "−9", "8", "−8"], answer: 1,
        explain: "54 ÷ 6 = 9, and one number is negative, so the answer is −9.", rule: "In division, one negative sign → negative answer." },
      { type: "order", q: "Tap the numbers from SMALLEST to LARGEST.", items: ["−9", "−1", "0", "4"], scrambled: ["0", "−9", "4", "−1"],
        explain: "On a number line, further left = smaller: −9 < −1 < 0 < 4.", rule: "Negative numbers with bigger digits are actually smaller!" }
    ]
  },
  {
    id: "P2", title: "Multiples & Factors Workshop", icon: "🧩", color: "mint",
    desc: "Find LCMs and HCFs like a pro.",
    questions: [
      { type: "mcq", q: "Which list shows the first four multiples of 8?", options: ["1, 2, 4, 8", "8, 16, 24, 32", "8, 18, 28, 38", "16, 24, 32, 40"], answer: 1,
        explain: "Multiples of 8 are 8×1, 8×2, 8×3, 8×4 = 8, 16, 24, 32.", rule: "Multiples start at the number itself." },
      { type: "mcq", q: "Which of these is a factor of 28?", options: ["3", "5", "7", "8"], answer: 2,
        explain: "28 ÷ 7 = 4 exactly, so 7 is a factor. 28 can’t be divided exactly by 3, 5 or 8.", rule: "Factors leave no remainder." },
      { type: "fill", q: "Find the LCM of 9 and 12.", answer: "36", accept: ["36"],
        explain: "Multiples of 12: 12, 24, 36. Is 36 a multiple of 9? Yes (9 × 4). LCM = 36.", rule: "List multiples of the bigger number and test each one." },
      { type: "fill", q: "Find the HCF of 16 and 40.", answer: "8", accept: ["8"],
        explain: "Factors of 16: 1, 2, 4, 8, 16. The biggest of these that divides 40 is 8 (40 ÷ 8 = 5).", rule: "Check the factors of the smaller number, from biggest down." },
      { type: "sort", q: "Sort each number: is it a factor of 36 or a multiple of 36?",
        buckets: ["Factor of 36", "Multiple of 36"],
        items: [ { t: "9", b: 0 }, { t: "72", b: 1 }, { t: "4", b: 0 }, { t: "108", b: 1 } ],
        explain: "9 and 4 divide into 36 (factors). 72 = 36 × 2 and 108 = 36 × 3 (multiples).",
        rule: "Factor ≤ 36 and divides it; multiple ≥ 36 and contains it." },
      { type: "mcq", q: "Two flashing signs blink together. One blinks every 6 seconds, the other every 10 seconds. After how many seconds do they blink together again?",
        options: ["16", "30", "60", "10"], answer: 1,
        explain: "You need the LCM of 6 and 10. Multiples of 10: 10, 20, 30 — and 30 is a multiple of 6. LCM = 30.", rule: "“Together again” questions = LCM questions." }
    ]
  },
  {
    id: "P3", title: "Divisibility Detective Agency", icon: "🕵️", color: "lavender",
    desc: "Crack the digit codes — no long division allowed!",
    questions: [
      { type: "mcq", q: "Which number is divisible by 3?", options: ["142", "253", "615", "913"], answer: 2,
        explain: "Digit sum of 615 is 6 + 1 + 5 = 12, a multiple of 3 ✓. The others sum to 7, 10 and 13.", rule: "By 3 → check the digit sum." },
      { type: "mcq", q: "Which number is divisible by 4?", options: ["318", "734", "926", "532"], answer: 3,
        explain: "Look at the last two digits: 32 ÷ 4 = 8 ✓. 18, 34 and 26 don’t divide by 4.", rule: "By 4 → last TWO digits." },
      { type: "sort", q: "Sort these numbers: divisible by 6, or not?",
        buckets: ["Divisible by 6", "Not divisible by 6"],
        items: [ { t: "144", b: 0 }, { t: "222", b: 0 }, { t: "316", b: 1 }, { t: "423", b: 1 } ],
        explain: "144 (even, digit sum 9) ✓ and 222 (even, digit sum 6) ✓. 316 is even but digit sum 10 ✗. 423 has digit sum 9 but is odd ✗.",
        rule: "By 6 → must pass BOTH the 2-test and the 3-test." },
      { type: "fill", q: "The three-digit number 52□ is divisible by 9. What is the missing digit?", answer: "2", accept: ["2"],
        explain: "5 + 2 + □ must be a multiple of 9. 5 + 2 = 7, so □ = 2 makes the sum 9.", rule: "By 9 → digit sum must be 9, 18, 27, …" },
      { type: "mcq", q: "Which number is divisible by 11?", options: ["427", "561", "739", "845"], answer: 1,
        explain: "For 561: (5 + 1) − 6 = 0 → divisible by 11 ✓ (561 = 11 × 51).", rule: "By 11 → alternating digit sums differ by 0, 11, 22…" },
      { type: "tf", q: "True or false? Every number that is divisible by 10 is also divisible by 5.", answer: true,
        explain: "Numbers divisible by 10 end in 0 — and every number ending in 0 passes the 5-test too.", rule: "Ends in 0 → divisible by both 10 and 5." }
    ]
  },
  {
    id: "P4", title: "Squares & Cubes Gym", icon: "💪", color: "peach",
    desc: "Power up with squares, cubes and roots.",
    questions: [
      { type: "mcq", q: "What is 12²?", options: ["24", "121", "144", "1212"], answer: 2,
        explain: "12² = 12 × 12 = 144.", rule: "Squaring means multiplying a number by itself — not by 2." },
      { type: "mcq", q: "What is ∛125?", options: ["5", "25", "11", "41"], answer: 0,
        explain: "5 × 5 × 5 = 125, so the cube root of 125 is 5.", rule: "∛ undoes cubing." },
      { type: "fill", q: "√□ = 13. What number goes in the box?", answer: "169", accept: ["169"],
        explain: "13² = 169, so √169 = 13.", rule: "To undo a square root, square the answer." },
      { type: "mcq", q: "Which is the closest integer to √70?", options: ["7", "8", "9", "35"], answer: 1,
        explain: "8² = 64 and 9² = 81. 70 is between them but closer to 64, so √70 ≈ 8.", rule: "Trap the number between two squares, then pick the closer root." },
      { type: "multi", q: "Select ALL the square numbers.", options: ["81", "50", "100", "27"], answer: [0, 2],
        explain: "81 = 9² and 100 = 10². 50 is not a square, and 27 is a cube (3³).", rule: "Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100…" },
      { type: "tf", q: "True or false? 1 is both a square number and a cube number.", answer: true,
        explain: "1 × 1 = 1 and 1 × 1 × 1 = 1, so 1 is on both lists!", rule: "1² = 1³ = 1." }
    ]
  }
];

/* ---------------- Quick Practice Zone (5 missions) ---------------- */
const QUICK_ZONE = [
  {
    id: "Q1", title: "Sign Detective", icon: "🔍", color: "sky",
    desc: "Will the answer be positive or negative? Investigate!",
    questions: [
      { type: "mcq", q: "Which calculation gives a NEGATIVE answer?", options: ["−4 + 9", "3 − 12", "−2 − −8", "15 ÷ 3"], answer: 1,
        explain: "3 − 12 = −9. The others give 5, 6 and 5 — all positive.", rule: "Subtracting a bigger number from a smaller one drops you below zero." },
      { type: "mcq", q: "Which calculation gives a POSITIVE answer?", options: ["−5 + 2", "−3 × 6", "−7 − −11", "−16 ÷ 4"], answer: 2,
        explain: "−7 − −11 = −7 + 11 = 4 ✓. The others give −3, −18 and −4.", rule: "Subtracting a negative pushes you to the right." },
      { type: "sort", q: "Sort each answer: positive or negative?",
        buckets: ["Positive", "Negative"],
        items: [ { t: "−2 + 10", b: 0 }, { t: "−6 × 4", b: 1 }, { t: "5 − −5", b: 0 }, { t: "−1 − 8", b: 1 } ],
        explain: "−2 + 10 = 8 and 5 − −5 = 10 (positive). −6 × 4 = −24 and −1 − 8 = −9 (negative).",
        rule: "Work out each answer, then look at its sign." },
      { type: "mcq", q: "The temperature is −3 °C and falls by 6 °C. What is it now?", options: ["3 °C", "−9 °C", "9 °C", "−3 °C"], answer: 1,
        explain: "Falling means subtracting: −3 − 6 = −9 °C.", rule: "“Falls by” → move left on the thermometer." },
      { type: "tf", q: "True or false? The sum of two negative integers is always negative.", answer: true,
        explain: "Both jumps go left, so you always finish left of zero. Example: −4 + −6 = −10.", rule: "negative + negative = more negative." }
    ]
  },
  {
    id: "Q2", title: "Number Builder", icon: "🏗️", color: "yellow",
    desc: "Build and rearrange digits to pass divisibility tests.",
    questions: [
      { type: "mcq", q: "Using the digits 2, 3 and 6 once each, which number is divisible by 5?",
        options: ["None — no arrangement works", "236", "326", "632"], answer: 0,
        explain: "A number is divisible by 5 only if it ends in 0 or 5. None of the digits 2, 3 or 6 is a 0 or a 5, so NO arrangement can pass the 5-test!",
        rule: "By 5 → the last digit must be 0 or 5. Sometimes the clever answer is “impossible”." },
      { type: "mcq", q: "Which arrangement of the digits 1, 4 and 8 is divisible by 4?", options: ["481", "814", "841", "148"], answer: 3,
        explain: "Check the last two digits: 148 → 48 ÷ 4 = 12 ✓. For 481→81✗, 814→14✗, 841→41✗.", rule: "By 4 → last two digits must divide by 4." },
      { type: "fill", q: "Write ONE digit to make 7□4 divisible by 3.", answer: "1", accept: ["1", "4", "7"],
        explain: "7 + □ + 4 = 11 + □ must be a multiple of 3, so □ can be 1, 4 or 7.", rule: "Digit sum → multiple of 3. More than one digit can work!" },
      { type: "mcq", q: "Which number is divisible by BOTH 2 and 9?", options: ["234", "129", "465", "531"], answer: 0,
        explain: "234 is even ✓ and 2 + 3 + 4 = 9 ✓. 129, 465 and 531 are odd.", rule: "Check the 2-test (last digit) and 9-test (digit sum) together." },
      { type: "mcq", q: "What is the smallest number bigger than 550 that is divisible by 9?", options: ["552", "558", "560", "567"], answer: 1,
        explain: "5 + 5 + 8 = 18, a multiple of 9 ✓ — and 558 comes before 560 and 567.", rule: "Climb up one number at a time and test the digit sum." }
    ]
  },
  {
    id: "Q3", title: "LCM & HCF Challenge", icon: "⚡", color: "mint",
    desc: "Beat the clock in your head — smallest multiples, biggest factors.",
    questions: [
      { type: "mcq", q: "LCM of 8 and 10?", options: ["2", "18", "40", "80"], answer: 2,
        explain: "Multiples of 10: 10, 20, 30, 40 — and 40 = 8 × 5 ✓.", rule: "Check multiples of the bigger number first." },
      { type: "mcq", q: "HCF of 21 and 35?", options: ["3", "5", "7", "105"], answer: 2,
        explain: "21 = 3 × 7 and 35 = 5 × 7. The shared factor is 7.", rule: "105 is their LCM — don’t mix the two up!" },
      { type: "fill", q: "Find the LCM of 3, 4 and 6.", answer: "12", accept: ["12"],
        explain: "12 is in the 3, 4 AND 6 times tables — and no smaller number is.", rule: "With three numbers, the LCM must pass all three tables." },
      { type: "mcq", q: "The HCF of 12 and 18 is 6. What is 12 × 18 ÷ 6?", options: ["36", "30", "216", "6"], answer: 0,
        explain: "12 × 18 = 216 and 216 ÷ 6 = 36 — which is exactly the LCM of 12 and 18!", rule: "HCF × LCM = product of the two numbers." },
      { type: "mcq", q: "Use the HCF to simplify the fraction 18⁄45 fully.", options: ["9⁄22", "6⁄15", "2⁄5", "3⁄9"], answer: 2,
        explain: "HCF of 18 and 45 is 9. Dividing top and bottom by 9 gives 2⁄5 in one step.", rule: "Divide by the HCF to fully simplify a fraction." },
      { type: "tf", q: "True or false? The LCM of 7 and 14 is 98.", answer: false,
        explain: "14 is already a multiple of 7, so the LCM is just 14.", rule: "If one number is a multiple of the other, the bigger one IS the LCM." }
    ]
  },
  {
    id: "Q4", title: "Calculation Fixer", icon: "🔧", color: "peach",
    desc: "These calculations came back from the repair shop — find and fix the mistakes!",
    questions: [
      { type: "mcq", q: "Marco wrote: −5 + −4 = −1. What SHOULD the answer be?", options: ["−9", "1", "9", "−1 is correct"], answer: 0,
        explain: "Adding −4 moves LEFT, so −5 + −4 = −9. Marco subtracted instead of adding the negative.", rule: "negative + negative → add the sizes, keep the minus." },
      { type: "mcq", q: "Lin wrote: 8 × −6 = 48. Which fix is right?", options: ["Answer should be −48", "Answer should be −14", "Answer should be 14", "Lin is correct"], answer: 0,
        explain: "8 × 6 = 48, but one factor is negative, so the product is −48.", rule: "Different signs → negative product." },
      { type: "mcq", q: "Amara wrote: “The factors of 20 are 20, 40, 60.” What went wrong?", options: ["She listed multiples, not factors", "She missed the factor 80", "Nothing — she is right", "Factors of 20 don’t exist"], answer: 0,
        explain: "20, 40, 60 are multiples. The factors of 20 are 1, 2, 4, 5, 10 and 20.", rule: "Factors divide INTO the number; multiples grow FROM it." },
      { type: "mcq", q: "Tom wrote: √64 = 32. What should it be?", options: ["8", "16", "128", "4"], answer: 0,
        explain: "√64 asks what number times itself makes 64 — that’s 8, not 64 ÷ 2.", rule: "Square root is NOT ‘divide by 2’." },
      { type: "mcq", q: "Sara wrote: “372 is divisible by 9 because it’s divisible by 3.” Is she right?", options: ["No — digit sum 12 passes the 3-test but not the 9-test", "Yes — 3-test and 9-test are the same", "No — 372 isn’t divisible by 3 either", "Yes — every even number is divisible by 9"], answer: 0,
        explain: "3 + 7 + 2 = 12. That’s a multiple of 3 (so ÷3 works) but NOT a multiple of 9, so 372 is not divisible by 9.", rule: "Divisible by 9 always means divisible by 3 — but not the other way round!" }
    ]
  },
  {
    id: "Q5", title: "Word Problem Mission", icon: "🚀", color: "lavender",
    desc: "Real-life integer missions. Read carefully, calculate bravely.",
    questions: [
      { type: "mcq", q: "A lift is at floor −2 (basement 2). It goes up 7 floors. Where is it now?", options: ["Floor 5", "Floor −9", "Floor 9", "Floor −5"], answer: 0,
        explain: "−2 + 7 = 5. The lift arrives at floor 5.", rule: "Up = add, down = subtract." },
      { type: "mcq", q: "A diver is at −12 m. She descends another 9 m. What is her new depth?", options: ["−3 m", "−21 m", "21 m", "−108 m"], answer: 1,
        explain: "Descending means going more negative: −12 − 9 = −21 m.", rule: "Below sea level = negative; going down = subtract." },
      { type: "fill", q: "In a quiz, Zara answers 4 questions wrong. Each wrong answer scores −3 points. How many points does she lose in total? (Write the integer.)", answer: "-12", accept: ["-12", "−12", "12"],
        explain: "4 × −3 = −12. She loses 12 points, written as −12.", rule: "Repeated negative scores → multiply." },
      { type: "mcq", q: "At midnight the temperature was −8 °C. By noon it had risen 15 °C, then it fell 4 °C by evening. Evening temperature?", options: ["3 °C", "−3 °C", "7 °C", "11 °C"], answer: 0,
        explain: "−8 + 15 = 7, then 7 − 4 = 3 °C.", rule: "Do the changes one step at a time, left to right." },
      { type: "mcq", q: "Hot dog buns come in packs of 6 and sausages in packs of 8. What is the smallest number of hot dogs you can make with no leftovers?", options: ["14", "24", "48", "2"], answer: 1,
        explain: "You need the LCM of 6 and 8, which is 24: four bun packs and three sausage packs.", rule: "“Smallest with no leftovers” → LCM." }
    ]
  }
];

/* ---------------- Word problems (reading practice) ---------------- */
const WORD_PROBLEMS = [
  {
    level: "easy", label: "Easy", icon: "🌤️", title: "Mia’s Weather Diary",
    passage: "On Monday morning, the temperature in Mia’s town was −4 °C. Mia wore her thickest scarf to school. By lunchtime, the sun came out and the temperature rose by 7 °C. In the evening, clouds covered the sky and the temperature fell by 5 °C. Mia wrote all three temperatures in her weather diary before bed.",
    questions: [
      { type: "mcq", q: "What was the temperature on Monday morning?", options: ["4 °C", "−4 °C", "7 °C", "−7 °C"], answer: 1,
        explain: "The story says the morning temperature was −4 °C.", rule: "Find the fact in the text — the minus sign matters!" },
      { type: "mcq", q: "What was the temperature at lunchtime?", options: ["−11 °C", "11 °C", "3 °C", "−3 °C"], answer: 2,
        explain: "It rose by 7: −4 + 7 = 3 °C.", rule: "“Rose by” → add." },
      { type: "fill", q: "What was the temperature in the evening? (Just write the number, e.g. −2)", answer: "-2", accept: ["-2", "−2", "-2°c", "-2c"],
        explain: "From 3 °C it fell by 5: 3 − 5 = −2 °C.", rule: "“Fell by” → subtract." },
      { type: "tf", q: "True or false? The evening was colder than the morning.", answer: false,
        explain: "Evening: −2 °C. Morning: −4 °C. Since −2 is to the RIGHT of −4 on a number line, the evening was actually warmer!", rule: "Closer to zero = warmer, for temperatures below zero." }
    ]
  },
  {
    level: "medium", label: "Medium", icon: "🌊", title: "Captain Reyes and the Shipwreck",
    passage: "Captain Reyes’ research submarine left the surface of the sea (0 m) and dived 80 metres. The crew photographed a school of silver fish. Later, the submarine dived another 35 metres to study an old shipwreck. After one hour at the wreck, it rose 50 metres to meet a small robot. The robot had been lowered from a ship whose deck stands 6 metres above the water.",
    questions: [
      { type: "mcq", q: "What was the submarine’s position after its first dive?", options: ["80 m", "−80 m", "−35 m", "0 m"], answer: 1,
        explain: "Diving 80 m below the surface gives a position of −80 m.", rule: "Below sea level is negative." },
      { type: "fill", q: "At what depth was the shipwreck? (Write the integer, e.g. −40)", answer: "-115", accept: ["-115", "−115"],
        explain: "−80 − 35 = −115 m.", rule: "Diving deeper → subtract." },
      { type: "mcq", q: "Where did the submarine meet the robot?", options: ["−65 m", "−165 m", "−30 m", "65 m"], answer: 0,
        explain: "−115 + 50 = −65 m.", rule: "Rising → add." },
      { type: "mcq", q: "How far apart are the ship’s deck (+6 m) and the meeting point?", options: ["59 m", "71 m", "6 m", "65 m"], answer: 1,
        explain: "From −65 up to +6 is 65 + 6 = 71 m.", rule: "Distance across zero = both distances added." },
      { type: "order", q: "Put the submarine’s positions in the order they happened.", items: ["0 m", "−80 m", "−115 m", "−65 m"], scrambled: ["−115 m", "0 m", "−65 m", "−80 m"],
        explain: "Surface (0) → first dive (−80) → shipwreck (−115) → robot (−65).", rule: "Retell the story step by step to sequence events." }
    ]
  },
  {
    level: "hard", label: "Challenge", icon: "🎪", title: "The School Fair Puzzle",
    passage: "Zara is preparing gift bags for the school fair. She has 36 star stickers and 48 mini pencils, and every gift bag must be exactly the same, using up ALL the items with nothing left over. She wants to make as many bags as possible. Meanwhile, her friend Leo is testing two strings of fairy lights above the stall: the gold string flashes every 6 seconds and the silver string flashes every 8 seconds. They have just flashed at exactly the same moment.",
    questions: [
      { type: "mcq", q: "What is the greatest number of identical gift bags Zara can make?", options: ["6", "9", "12", "24"], answer: 2,
        explain: "She needs the HCF of 36 and 48. Factors of 36: …, 9, 12, 18, 36. The biggest that also divides 48 is 12.", rule: "“Greatest number of equal groups, nothing left over” → HCF." },
      { type: "mcq", q: "How many stickers and pencils go in each bag?", options: ["3 stickers, 4 pencils", "4 stickers, 3 pencils", "6 stickers, 8 pencils", "12 stickers, 12 pencils"], answer: 0,
        explain: "36 ÷ 12 = 3 stickers and 48 ÷ 12 = 4 pencils per bag.", rule: "Divide each total by the number of bags." },
      { type: "fill", q: "After how many seconds will the gold and silver lights next flash together? (Just the number.)", answer: "24", accept: ["24", "24s", "24 seconds"],
        explain: "LCM of 6 and 8: multiples of 8 are 8, 16, 24 — and 24 is a multiple of 6 ✓.", rule: "“Next time together” → LCM." },
      { type: "mcq", q: "How many times will the two strings flash together during the next 2 minutes?", options: ["3", "4", "5", "10"], answer: 2,
        explain: "2 minutes = 120 seconds. They flash together every 24 s: at 24, 48, 72, 96 and 120 — that’s 5 times.", rule: "Divide the total time by the LCM." },
      { type: "mcq", q: "Which skills did Zara and Leo use?", options: ["Zara: HCF, Leo: LCM", "Zara: LCM, Leo: HCF", "Both used HCF", "Both used LCM"], answer: 0,
        explain: "Sharing into the greatest equal groups is HCF; finding when cycles meet again is LCM.", rule: "Split into groups → HCF. Repeat until they meet → LCM." }
    ]
  }
];

/* ---------------- Mini practice pool (for Mistake Review Mode) ---------------- */
const MINI_POOL = {
  ops: [
    { q: "Try this one: −6 + 10 = ?", options: ["−4", "4", "−16", "16"], answer: 1,
      explain: "Start at −6, move 10 right → 4." },
    { q: "Try this one: 5 − −4 = ?", options: ["1", "−9", "9", "−1"], answer: 2,
      explain: "Subtracting −4 = adding 4: 5 + 4 = 9." },
    { q: "Try this one: −7 × 4 = ?", options: ["28", "−28", "−11", "3"], answer: 1,
      explain: "7 × 4 = 28; one negative sign → −28." },
    { q: "Try this one: −45 ÷ 9 = ?", options: ["5", "−5", "−6", "6"], answer: 1,
      explain: "45 ÷ 9 = 5; one number is negative → −5." }
  ],
  mult: [
    { q: "Try this one: what is the LCM of 4 and 14?", options: ["2", "28", "56", "18"], answer: 1,
      explain: "Multiples of 14: 14, 28 — and 28 is a multiple of 4 ✓." },
    { q: "Try this one: what is the HCF of 24 and 40?", options: ["4", "6", "8", "120"], answer: 2,
      explain: "Factors of 24: …6, 8, 12, 24. The biggest that divides 40 is 8." },
    { q: "Try this one: which is a factor of 51?", options: ["7", "13", "17", "21"], answer: 2,
      explain: "51 ÷ 17 = 3 exactly, so 17 is a factor." }
  ],
  div: [
    { q: "Try this one: which number is divisible by 3?", options: ["217", "342", "805", "1004"], answer: 1,
      explain: "3 + 4 + 2 = 9, a multiple of 3 ✓." },
    { q: "Try this one: which number is divisible by 4?", options: ["230", "314", "422", "816"], answer: 3,
      explain: "Last two digits of 816 are 16, and 16 ÷ 4 = 4 ✓." },
    { q: "Try this one: 63□ is divisible by 9. The missing digit is…", options: ["0", "3", "6", "9"], answer: 3,
      explain: "6 + 3 + □ must be a multiple of 9: 9 + 9 = 18, so □ = 9." }
  ],
  pow: [
    { q: "Try this one: 11² = ?", options: ["22", "111", "121", "1111"], answer: 2,
      explain: "11 × 11 = 121." },
    { q: "Try this one: ∛64 = ?", options: ["4", "8", "16", "32"], answer: 0,
      explain: "4 × 4 × 4 = 64, so the cube root is 4." },
    { q: "Try this one: √110 is between…", options: ["9 and 10", "10 and 11", "11 and 12", "54 and 56"], answer: 1,
      explain: "10² = 100 and 11² = 121; 110 sits between them." }
  ],
  word: [
    { q: "Try this one: a drone starts 40 m above the sea (+40) and descends 65 m. Where is it now?", options: ["25 m", "−25 m", "−105 m", "105 m"], answer: 1,
      explain: "40 − 65 = −25 m: the drone is now 25 m below sea level." },
    { q: "Try this one: buses on Route A leave every 12 minutes and on Route B every 9 minutes. They just left together. In how many minutes will they leave together again?", options: ["21", "36", "108", "3"], answer: 1,
      explain: "You need the LCM of 12 and 9, which is 36." }
  ]
};

/* Skill labels used across the app */
const SKILLS = {
  ops:  "Integer operations",
  mult: "Multiples & factors",
  div:  "Divisibility",
  pow:  "Squares, cubes & roots",
  word: "Word problems"
};
