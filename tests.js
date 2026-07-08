/* ============================================================
   tests.js — Three complete Unit 1 test sets (25 questions each)
   Maths 7 · Unit 1: Integers — Bright EngMath © 2026
   All questions are original. skills: ops | mult | div | pow | word
   ============================================================ */

const TESTS = [
/* ================= TEST 1 · FOUNDATION REVIEW (Easy) ================= */
{
  id: "T1",
  name: "Test 1 · Foundation Review",
  difficulty: "Easy",
  color: "mint",
  icon: "🌱",
  focus: "Basic integer sums, recognising multiples, factors, squares and simple divisibility.",
  questions: [
    { type: "mcq", skill: "ops", q: "Work out −3 + 7.",
      options: ["4", "−4", "−10", "10"], answer: 0,
      explain: "Start at −3 on the number line and jump 7 to the right: −3 → 4.",
      rule: "Adding a positive number moves you RIGHT on the number line." },

    { type: "mcq", skill: "ops", q: "Work out 5 + −8.",
      options: ["3", "−3", "13", "−13"], answer: 1,
      explain: "Adding −8 means moving 8 to the LEFT: 5 − 8 = −3.",
      rule: "Adding a negative number moves you LEFT." },

    { type: "mcq", skill: "ops", q: "Work out −2 − 6.",
      options: ["−8", "−4", "4", "8"], answer: 0,
      explain: "Start at −2 and move 6 further left: −2 − 6 = −8.",
      rule: "Subtracting a positive number moves you LEFT." },

    { type: "mcq", skill: "ops", q: "Work out 4 − −3.",
      options: ["1", "−1", "7", "−7"], answer: 2,
      explain: "Subtracting −3 is the same as ADDING 3: 4 + 3 = 7.",
      rule: "To subtract an integer, add its inverse. Two minus signs together make a plus." },

    { type: "tf", skill: "ops", q: "True or false? −6 is smaller than −2.",
      answer: true,
      explain: "On a number line −6 sits further LEFT than −2, so −6 is smaller. Think of temperatures: −6 °C is colder than −2 °C.",
      rule: "For negative numbers: the bigger the digits, the smaller the number." },

    { type: "order", skill: "ops", q: "Tap the numbers to arrange them from SMALLEST to LARGEST.",
      items: ["−8", "−3", "0", "5"], scrambled: ["0", "−8", "5", "−3"],
      explain: "From left to right on a number line: −8, −3, 0, 5.",
      rule: "Numbers get larger as you move right on a number line." },

    { type: "fill", skill: "ops", q: "Find the missing integer:  6 + □ = 2",
      answer: "-4", accept: ["-4", "−4"],
      explain: "To travel from 6 down to 2 you must move 4 to the left, so the missing integer is −4.",
      rule: "Ask: “What jump takes me from the start to the answer?”" },

    { type: "mcq", skill: "ops", q: "Work out 3 × −5.",
      options: ["15", "−15", "−8", "8"], answer: 1,
      explain: "3 × 5 = 15, and one of the numbers is negative, so the product is −15.",
      rule: "positive × negative = negative." },

    { type: "mcq", skill: "ops", q: "Work out −20 ÷ 4.",
      options: ["5", "−5", "−16", "16"], answer: 1,
      explain: "20 ÷ 4 = 5. One number is negative, so the answer is −5.",
      rule: "When exactly one number in a division is negative, the answer is negative." },

    { type: "fill", skill: "ops", q: "Find the missing number:  −4 × □ = −24",
      answer: "6", accept: ["6", "+6"],
      explain: "4 × 6 = 24, and −4 × 6 = −24 ✓. The missing number is 6.",
      rule: "Check the sign: negative × positive gives the negative product we need." },

    { type: "mcq", skill: "ops", q: "What is the product of 7 and −2?",
      options: ["14", "−14", "5", "−5"], answer: 1,
      explain: "“Product” means multiply: 7 × −2 = −14.",
      rule: "Product = the answer to a multiplication." },

    { type: "mcq", skill: "mult", q: "Which list shows the first five multiples of 4?",
      options: ["1, 2, 4, 8, 16", "4, 8, 12, 16, 20", "4, 14, 24, 34, 44", "8, 12, 16, 20, 24"], answer: 1,
      explain: "Multiples of 4 are 4×1, 4×2, 4×3, 4×4, 4×5 = 4, 8, 12, 16, 20.",
      rule: "Multiples are the times-table answers, starting from the number itself." },

    { type: "mcq", skill: "mult", q: "Which of these numbers is a multiple of 7?",
      options: ["24", "35", "44", "54"], answer: 1,
      explain: "35 = 7 × 5, so 35 is in the 7 times table. The others leave remainders.",
      rule: "A multiple of 7 divides by 7 exactly." },

    { type: "mcq", skill: "mult", q: "Which list shows ALL the factors of 15?",
      options: ["1, 3, 5, 15", "3, 5", "15, 30, 45", "1, 5, 10, 15"], answer: 0,
      explain: "15 = 1 × 15 and 15 = 3 × 5, so the full factor list is 1, 3, 5, 15. (15, 30, 45 are multiples!)",
      rule: "Find factors in pairs so you don’t miss any — and don’t forget 1 and the number itself." },

    { type: "mcq", skill: "mult", q: "Which of these is a factor of 18?",
      options: ["4", "5", "6", "7"], answer: 2,
      explain: "18 ÷ 6 = 3 exactly, so 6 is a factor of 18. 18 can’t be divided exactly by 4, 5 or 7.",
      rule: "A factor divides in with NO remainder." },

    { type: "mcq", skill: "mult", q: "What is the lowest common multiple (LCM) of 3 and 4?",
      options: ["7", "12", "24", "1"], answer: 1,
      explain: "Multiples of 4: 4, 8, 12 — and 12 is also a multiple of 3 (3 × 4). So the LCM is 12.",
      rule: "The LCM is the SMALLEST number in both times tables." },

    { type: "mcq", skill: "mult", q: "What is the highest common factor (HCF) of 8 and 12?",
      options: ["2", "4", "24", "96"], answer: 1,
      explain: "Factors of 8: 1, 2, 4, 8. Factors of 12: 1, 2, 3, 4, 6, 12. The biggest shared factor is 4. (24 is their LCM.)",
      rule: "HCF = the biggest number that divides into BOTH." },

    { type: "tf", skill: "mult", q: "True or false? 20 is a common multiple of 4 and 5.",
      answer: true,
      explain: "20 = 4 × 5 and 20 = 5 × 4, so 20 is in both times tables — a common multiple.",
      rule: "A common multiple appears in both times tables." },

    { type: "mcq", skill: "div", q: "Which number is divisible by 5?",
      options: ["52", "66", "85", "93"], answer: 2,
      explain: "85 ends in 5, so it passes the 5-test (85 ÷ 5 = 17). The others end in 2, 6 and 3.",
      rule: "Divisible by 5 → the last digit is 0 or 5." },

    { type: "mcq", skill: "div", q: "Which number is divisible by 2?",
      options: ["341", "447", "892", "725"], answer: 2,
      explain: "892 ends in 2, an even digit, so it divides by 2 exactly.",
      rule: "Divisible by 2 → the last digit is 0, 2, 4, 6 or 8." },

    { type: "mcq", skill: "pow", q: "What is 7²?",
      options: ["14", "49", "77", "21"], answer: 1,
      explain: "7² means 7 × 7 = 49 — not 7 × 2.",
      rule: "Squaring = multiplying a number by ITSELF." },

    { type: "mcq", skill: "pow", q: "What is √36?",
      options: ["9", "6", "18", "72"], answer: 1,
      explain: "6 × 6 = 36, so √36 = 6.",
      rule: "√ asks: “what number times itself gives this?”" },

    { type: "mcq", skill: "pow", q: "What is 2³?",
      options: ["6", "8", "9", "23"], answer: 1,
      explain: "2³ = 2 × 2 × 2 = 8 — not 2 × 3.",
      rule: "Cubing uses the number THREE times in a multiplication." },

    { type: "mcq", skill: "pow", q: "What is ∛27?",
      options: ["9", "3", "13", "24"], answer: 1,
      explain: "3 × 3 × 3 = 27, so the cube root of 27 is 3.",
      rule: "∛ undoes cubing. (√9 = 3 is a different fact — read the symbol!)" },

    { type: "mcq", skill: "word", q: "The temperature is 3 °C. It drops by 8 °C overnight. What is the new temperature?",
      options: ["5 °C", "−5 °C", "−11 °C", "11 °C"], answer: 1,
      explain: "“Drops by 8” means subtract: 3 − 8 = −5 °C.",
      rule: "Down/colder → subtract. Cross zero carefully!" }
  ]
},

/* ============= TEST 2 · SCHOOL TEST PRACTICE (Medium) ============= */
{
  id: "T2",
  name: "Test 2 · School Test Practice",
  difficulty: "Medium",
  color: "yellow",
  icon: "📘",
  focus: "Mixed calculations, LCM & HCF, divisibility rules, error spotting and two-step word problems.",
  questions: [
    { type: "mcq", skill: "ops", q: "Work out −7 + −6.",
      options: ["−13", "−1", "1", "13"], answer: 0,
      explain: "Both numbers pull left: 7 + 6 = 13 below zero, so −13.",
      rule: "negative + negative → add the sizes and keep the minus sign." },

    { type: "mcq", skill: "ops", q: "Work out −4 − −9.",
      options: ["−13", "5", "−5", "13"], answer: 1,
      explain: "Subtracting −9 = adding 9: −4 + 9 = 5.",
      rule: "Add the inverse: − (−9) becomes + 9." },

    { type: "fill", skill: "ops", q: "Find the missing integer:  □ + −5 = −2",
      answer: "3", accept: ["3", "+3"],
      explain: "Something minus 5 lands on −2, so start at 3: 3 + −5 = −2 ✓.",
      rule: "Work backwards: −2 + 5 = 3." },

    { type: "mcq", skill: "ops", q: "ESTIMATE −52 + −67 by rounding each number to the nearest ten.",
      options: ["−110", "−120", "120", "−20"], answer: 1,
      explain: "−52 ≈ −50 and −67 ≈ −70. Then −50 + −70 = −120.",
      rule: "Round first, then calculate — that’s estimating." },

    { type: "multi", skill: "ops", q: "Select ALL the calculations with an answer of −6.",
      options: ["−2 − 4", "8 + −2", "−12 ÷ 2", "10 + −16"], answer: [0, 2, 3],
      explain: "−2 − 4 = −6 ✓, −12 ÷ 2 = −6 ✓ and 10 + −16 = −6 ✓. But 8 + −2 = 6 (positive!).",
      rule: "Check each calculation separately — more than one can be correct." },

    { type: "mcq", skill: "ops", q: "Work out 5 × (2 − 6).",
      options: ["20", "−20", "4", "−14"], answer: 1,
      explain: "Brackets first: 2 − 6 = −4. Then 5 × −4 = −20.",
      rule: "Brackets before multiplying; positive × negative = negative." },

    { type: "mcq", skill: "ops", q: "Find the missing number:  −36 ÷ □ = −9",
      options: ["−4", "4", "27", "−27"], answer: 1,
      explain: "36 ÷ 4 = 9, and −36 ÷ 4 = −9 ✓. The missing number is positive 4 (a negative ÷ negative would give a positive answer).",
      rule: "Use the inverse: −36 ÷ −9 = 4." },

    { type: "sort", skill: "mult", q: "Sort each number: is it a FACTOR of 6 or a MULTIPLE of 6?",
      buckets: ["Factor of 6", "Multiple of 6"],
      items: [ { t: "2", b: 0 }, { t: "3", b: 0 }, { t: "12", b: 1 }, { t: "24", b: 1 } ],
      explain: "2 and 3 divide into 6 (factors). 12 and 24 are in the 6 times table (multiples).",
      rule: "Factors fit INSIDE the number; multiples grow FROM it." },

    { type: "mcq", skill: "mult", q: "What is the LCM of 6 and 8?",
      options: ["2", "14", "24", "48"], answer: 2,
      explain: "Multiples of 8: 8, 16, 24 — and 24 = 6 × 4 ✓. So 24, not 48, is the LOWEST common multiple.",
      rule: "6 × 8 = 48 is a common multiple, but not always the lowest one." },

    { type: "mcq", skill: "mult", q: "What is the HCF of 18 and 27?",
      options: ["3", "9", "54", "6"], answer: 1,
      explain: "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 27: 1, 3, 9, 27. The biggest shared factor is 9.",
      rule: "List both factor lists and pick the biggest number in both." },

    { type: "mcq", skill: "mult", q: "What is the LCM of 2, 3 and 5?",
      options: ["10", "15", "30", "60"], answer: 2,
      explain: "30 is the first number that is in the 2, 3 AND 5 times tables (30 = 2×15 = 3×10 = 5×6).",
      rule: "With three numbers, your answer must pass all three times tables." },

    { type: "fill", skill: "mult", q: "Find the HCF of 20 and 30.",
      answer: "10", accept: ["10"],
      explain: "Factors of 20: 1, 2, 4, 5, 10, 20. Of these, the biggest that divides 30 is 10.",
      rule: "Try the factors of the smaller number, starting from the biggest." },

    { type: "mcq", skill: "mult", q: "Use the HCF to write 12⁄18 as simply as possible.",
      options: ["2⁄3", "6⁄9", "4⁄6", "3⁄2"], answer: 0,
      explain: "The HCF of 12 and 18 is 6. Dividing top and bottom by 6 gives 2⁄3. (6⁄9 and 4⁄6 are equal to it but not fully simplified.)",
      rule: "Dividing by the HCF simplifies a fraction fully in ONE step." },

    { type: "tf", skill: "mult", q: "True or false? The LCM of two numbers is always BIGGER than both numbers.",
      answer: false,
      explain: "Not always! The LCM of 3 and 6 is 6 — which equals one of the numbers. When one number is a multiple of the other, the bigger number IS the LCM.",
      rule: "The LCM is bigger than or EQUAL to the biggest number." },

    { type: "mcq", skill: "div", q: "Which number is divisible by 3?",
      options: ["124", "222", "305", "431"], answer: 1,
      explain: "Digit sum of 222: 2 + 2 + 2 = 6, a multiple of 3 ✓. The others sum to 7, 8 and 8.",
      rule: "Divisible by 3 → the digit SUM is a multiple of 3." },

    { type: "mcq", skill: "div", q: "Which number is divisible by 4?",
      options: ["214", "322", "516", "634"], answer: 2,
      explain: "Look at the last two digits of 516: 16 ÷ 4 = 4 ✓. 14, 22 and 34 do not divide by 4.",
      rule: "Divisible by 4 → the last TWO digits divide by 4. Being even is not enough!" },

    { type: "mcq", skill: "div", q: "Which number is divisible by 6?",
      options: ["123", "202", "234", "118"], answer: 2,
      explain: "234 is even ✓ AND its digit sum 2+3+4 = 9 is a multiple of 3 ✓. 123 is odd; 202 and 118 fail the 3-test.",
      rule: "Divisible by 6 → must pass BOTH the 2-test and the 3-test." },

    { type: "fill", skill: "div", q: "The number 47□ is divisible by 9. What is the missing digit?",
      answer: "7", accept: ["7"],
      explain: "4 + 7 + □ must be a multiple of 9. 4 + 7 = 11, so □ = 7 gives 18 = 2 × 9 ✓.",
      rule: "Divisible by 9 → digit sum of 9, 18, 27, …" },

    { type: "mcq", skill: "ops", q: "ONE of these calculations is wrong. Which one?",
      options: ["−3 + 8 = 5", "−5 − 2 = −7", "4 × −6 = 24", "−10 ÷ 5 = −2"], answer: 2,
      explain: "4 × −6 should be −24, not 24. The other three are all correct.",
      rule: "A positive times a negative can NEVER give a positive answer." },

    { type: "mcq", skill: "pow", q: "Work out √49 + 3².",
      options: ["12", "16", "58", "10"], answer: 1,
      explain: "√49 = 7 and 3² = 9, so 7 + 9 = 16.",
      rule: "Deal with each power or root first, then add." },

    { type: "mcq", skill: "pow", q: "Which of these is a square number?",
      options: ["20", "28", "36", "44"], answer: 2,
      explain: "36 = 6 × 6 = 6². The numbers 20, 28 and 44 are not in the square number list 1, 4, 9, 16, 25, 36, 49…",
      rule: "Memorise the square numbers up to 15² = 225." },

    { type: "mcq", skill: "pow", q: "What is 4³?",
      options: ["12", "64", "43", "81"], answer: 1,
      explain: "4³ = 4 × 4 × 4 = 16 × 4 = 64.",
      rule: "Cube = use the number three times, not multiply by 3." },

    { type: "mcq", skill: "pow", q: "What is ∛125?",
      options: ["25", "5", "15", "41"], answer: 1,
      explain: "5 × 5 × 5 = 125, so ∛125 = 5.",
      rule: "Cube numbers to memorise: 1, 8, 27, 64, 125, 216." },

    { type: "mcq", skill: "word", q: "A submarine is at −45 m. It rises 18 m. What is its new position?",
      options: ["27 m", "−27 m", "−63 m", "63 m"], answer: 1,
      explain: "Rising means adding: −45 + 18 = −27 m. It is still below the surface.",
      rule: "Up → add. The answer stays negative if you don’t reach zero." },

    { type: "mcq", skill: "word", q: "At 6 a.m. the temperature was −6 °C. It rose 9 °C by noon, then fell 5 °C by sunset. What was the temperature at sunset?",
      options: ["2 °C", "−2 °C", "−20 °C", "8 °C"], answer: 1,
      explain: "−6 + 9 = 3, then 3 − 5 = −2 °C.",
      rule: "Two-step problems: do the changes in order, one at a time." }
  ]
},

/* ================ TEST 3 · FINAL CHALLENGE (Hard) ================ */
{
  id: "T3",
  name: "Test 3 · Final Challenge",
  difficulty: "Challenging",
  color: "peach",
  icon: "🏔️",
  focus: "Multi-step calculations, tricky sign patterns, HCF–LCM connections, harder divisibility and root estimation.",
  questions: [
    { type: "mcq", skill: "ops", q: "Work out −8 + 5 − −4.",
      options: ["−7", "1", "−17", "7"], answer: 1,
      explain: "Left to right: −8 + 5 = −3. Then −3 − −4 = −3 + 4 = 1.",
      rule: "Turn “− −” into “+”, then work left to right." },

    { type: "mcq", skill: "ops", q: "Work out −7 − −3 + −5.",
      options: ["−15", "−5", "−9", "1"], answer: 2,
      explain: "−7 − −3 = −7 + 3 = −4. Then −4 + −5 = −9.",
      rule: "Rewrite the double signs first, then move along the number line." },

    { type: "fill", skill: "ops", q: "Three integers are equally spaced on a number line. The outer two are −5 and 7. What is the middle integer?",
      answer: "1", accept: ["1", "+1"],
      explain: "The gap from −5 to 7 is 12, so each step is 6: −5 → 1 → 7. The middle integer is 1.",
      rule: "The middle number is halfway: (−5 + 7) ÷ 2 = 1." },

    { type: "mcq", skill: "ops", q: "ESTIMATE −6.8 × 4.1 by rounding each number to the nearest whole number.",
      options: ["−24", "28", "−28", "−2.7"], answer: 2,
      explain: "−6.8 ≈ −7 and 4.1 ≈ 4, so the estimate is −7 × 4 = −28.",
      rule: "Round first; keep the sign rule: negative × positive = negative." },

    { type: "mcq", skill: "ops", q: "Work out −2 × (3 − −4).",
      options: ["14", "−2", "−14", "2"], answer: 2,
      explain: "Brackets first: 3 − −4 = 3 + 4 = 7. Then −2 × 7 = −14.",
      rule: "Brackets → then multiply → then check the sign." },

    { type: "multi", skill: "ops", q: "Select ALL the TRUE statements.",
      options: ["−9 < −4", "0 is an integer", "−3 is greater than 2", "The inverse of −6 is 6"], answer: [0, 1, 3],
      explain: "−9 is left of −4 ✓. Integers are positive AND negative whole numbers AND zero ✓. The inverse of −6 is 6 ✓. But −3 < 2, so the third statement is false.",
      rule: "Check each statement on a number line before selecting." },

    { type: "fill", skill: "ops", q: "Find the missing integer:  □ ÷ 4 = −8",
      answer: "-32", accept: ["-32", "−32"],
      explain: "Use the inverse operation: −8 × 4 = −32. Check: −32 ÷ 4 = −8 ✓.",
      rule: "Undo a division with a multiplication." },

    { type: "mcq", skill: "ops", q: "Two integers add up to −3. One of them is 8. What is the PRODUCT of the two integers?",
      options: ["88", "−88", "−40", "24"], answer: 1,
      explain: "The other integer is −3 − 8 = −11. Then 8 × −11 = −88.",
      rule: "Find the missing number first, then answer what is actually asked!" },

    { type: "match", skill: "mult", q: "Match each pair of numbers to its LCM.",
      left: ["4 and 6", "5 and 10", "3 and 7", "8 and 12"],
      right: ["12", "10", "21", "24"], answer: [0, 1, 2, 3],
      explain: "LCM(4,6)=12, LCM(5,10)=10 (10 is already a multiple of 5), LCM(3,7)=21, LCM(8,12)=24.",
      rule: "When one number is a multiple of the other, the bigger number is the LCM." },

    { type: "mcq", skill: "mult", q: "What is the HCF of 54, 72 and 90?",
      options: ["6", "9", "18", "36"], answer: 2,
      explain: "54 ÷ 18 = 3, 72 ÷ 18 = 4, 90 ÷ 18 = 5 — all exact ✓. Nothing bigger divides all three.",
      rule: "With three numbers, the HCF must divide into every one of them." },

    { type: "mcq", skill: "mult", q: "The HCF of two numbers is 6 and their LCM is 36. Which pair could they be?",
      options: ["6 and 24", "12 and 18", "12 and 36", "18 and 24"], answer: 1,
      explain: "HCF(12, 18) = 6 ✓ and LCM(12, 18) = 36 ✓. The others fail: HCF(6,24)=6 but LCM=24; HCF(12,36)=12; LCM(18,24)=72.",
      rule: "Test BOTH conditions — a pair must pass the HCF check AND the LCM check." },

    { type: "tf", skill: "mult", q: "True or false? For any two whole numbers, HCF × LCM = the product of the two numbers.",
      answer: true,
      explain: "It always works! Example: for 8 and 12, HCF = 4 and LCM = 24, and 4 × 24 = 96 = 8 × 12 ✓.",
      rule: "HCF × LCM = a × b. A powerful shortcut for finding one when you know the other." },

    { type: "mcq", skill: "mult", q: "21 is the LCM of two different numbers, and NEITHER of them is 21. What are they?",
      options: ["1 and 21", "3 and 7", "7 and 14", "3 and 21"], answer: 1,
      explain: "LCM(3, 7) = 21 ✓ and neither number is 21. The pairs with 21 in them are ruled out by the question, and LCM(7, 14) = 14.",
      rule: "Read the conditions carefully — they knock out the easy options." },

    { type: "sort", skill: "div", q: "Sort these numbers: divisible by 3, or not?",
      buckets: ["Divisible by 3", "Not divisible by 3"],
      items: [ { t: "411", b: 0 }, { t: "512", b: 1 }, { t: "726", b: 0 }, { t: "1003", b: 1 } ],
      explain: "Digit sums: 411 → 6 ✓, 726 → 15 ✓, 512 → 8 ✗, 1003 → 4 ✗.",
      rule: "Only the digit sum decides the 3-test — the size of the number doesn’t matter." },

    { type: "mcq", skill: "div", q: "The five-digit number 6254□ is divisible by 6. What is the missing digit?",
      options: ["2", "4", "6", "8"], answer: 1,
      explain: "For 6: even last digit AND digit sum divisible by 3. 6+2+5+4 = 17, so □ must make 17 + □ a multiple of 3 → □ ∈ {1, 4, 7}. The only even choice is 4.",
      rule: "Combine the 2-test and the 3-test, then keep only digits that pass both." },

    { type: "mcq", skill: "div", q: "Which number is divisible by 11?",
      options: ["428", "594", "372", "265"], answer: 1,
      explain: "For 594: (5 + 4) − 9 = 0, and a difference of 0 means divisible by 11 ✓ (594 = 11 × 54).",
      rule: "By 11 → (sum of odd-position digits) − (sum of even-position digits) = 0, 11, 22…" },

    { type: "mcq", skill: "div", q: "Use the 7-test (remove the last digit, subtract it twice from what remains). Which number is divisible by 7?",
      options: ["145", "261", "203", "344"], answer: 2,
      explain: "203 → 20 − 2×3 = 14, and 14 = 2 × 7 ✓. (145 → 14−10=4 ✗, 261 → 26−2=24 ✗, 344 → 34−8=26 ✗.)",
      rule: "7-test: chop the last digit, double it, subtract — then test the smaller number." },

    { type: "fill", skill: "div", q: "What is the SMALLEST integer bigger than 4620 that is divisible by 9?",
      answer: "4626", accept: ["4626"],
      explain: "4 + 6 + 2 + 0 = 12. The next multiple of 9 for the digit sum is 18, which needs 6 more: 4626 (4+6+2+6 = 18) ✓.",
      rule: "Push the digit sum up to the next multiple of 9." },

    { type: "mcq", skill: "ops", q: "Zara writes: “−5 − −8 = −13.” What is the CORRECT answer, and what was her mistake?",
      options: ["−3; she should have subtracted 8", "13; she should have swapped the numbers", "3; subtracting −8 means ADDING 8", "−13; Zara is actually correct"], answer: 2,
      explain: "−5 − −8 = −5 + 8 = 3. Zara treated “− −8” as “− 8” and slid further left instead of turning around.",
      rule: "Two minus signs side by side always become a plus." },

    { type: "mcq", skill: "pow", q: "What is √196?",
      options: ["12", "13", "14", "16"], answer: 2,
      explain: "14 × 14 = 196, so √196 = 14.",
      rule: "Learn the big squares: 13² = 169, 14² = 196, 15² = 225." },

    { type: "mcq", skill: "pow", q: "√115 lies between which two consecutive integers?",
      options: ["9 and 10", "10 and 11", "11 and 12", "57 and 58"], answer: 1,
      explain: "10² = 100 and 11² = 121. Since 100 < 115 < 121, √115 is between 10 and 11.",
      rule: "Trap the number between two square numbers, then root both ends." },

    { type: "mcq", skill: "pow", q: "Which integer is CLOSEST to √83?",
      options: ["8", "9", "10", "42"], answer: 1,
      explain: "9² = 81 and 10² = 100. 83 is only 2 away from 81 but 17 away from 100, so √83 ≈ 9.",
      rule: "Compare the distances to the nearest squares on each side." },

    { type: "mcq", skill: "pow", q: "What is ∛216?",
      options: ["36", "6", "72", "108"], answer: 1,
      explain: "6 × 6 × 6 = 216, so ∛216 = 6. (36 is 6², a common trap!)",
      rule: "Cube root asks for the number used THREE times." },

    { type: "mcq", skill: "pow", q: "Which statement about the number 64 is true?",
      options: ["It is a square number AND a cube number", "It is a square number only", "It is a cube number only", "It is neither"], answer: 0,
      explain: "64 = 8 × 8 = 8² AND 64 = 4 × 4 × 4 = 4³ — it’s on both lists!",
      rule: "A few special numbers (1, 64, 729…) are both square and cube." },

    { type: "mcq", skill: "word", q: "A freezer is at −18 °C when the power cuts out. The temperature RISES 4 °C every hour for 3 hours. Then the power returns and the temperature FALLS 2 °C before dinner. What is the freezer’s temperature at dinner time?",
      options: ["−4 °C", "−32 °C", "−8 °C", "8 °C"], answer: 2,
      explain: "Rise: 4 × 3 = 12, so −18 + 12 = −6. Then it falls 2: −6 − 2 = −8 °C.",
      rule: "Multiply to find the total change, then apply the steps in order." }
  ]
}
];
