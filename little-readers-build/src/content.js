/* ============================================================
   Little Readers: Read, Tap & Play  —  Content Data
   Created by Bright EngMath.  Story Pack 1.
   All passages, questions, vocabulary and explanations are
   original and written for young ESL readers (Pre-A1 / A1).
   Content is kept separate from the UI so new story packs
   can be added easily later.
   ============================================================ */

const SKILLS = ["Vocabulary", "Details", "Sequencing", "Main idea", "Listening"];

/* Map every question skill-tag to one of the 5 report categories */
const SKILL_GROUP = {
  "Vocabulary": "Vocabulary",
  "Character": "Details",
  "Setting": "Details",
  "Detail": "Details",
  "Action": "Details",
  "Details": "Details",
  "Sequencing": "Sequencing",
  "Cause and effect": "Sequencing",
  "Main idea": "Main idea",
  "Inference": "Main idea",
  "Listening": "Listening"
};

const BADGES = [
  { id: "first_story",     name: "First Story",       desc: "Finish your very first story.",       icon: "badgeStar" },
  { id: "careful_reader",  name: "Careful Reader",    desc: "Finish 3 stories.",                   icon: "badgeBook" },
  { id: "word_explorer",   name: "Word Explorer",     desc: "Listen to 15 vocabulary words.",      icon: "badgeWord" },
  { id: "listening_star",  name: "Listening Star",    desc: "Answer 5 listening questions right.", icon: "badgeEar" },
  { id: "story_detective", name: "Story Detective",   desc: "Find the evidence 5 times.",          icon: "badgeGlass" },
  { id: "perfect_reader",  name: "Perfect Reader",    desc: "Get 3 stars on any story.",           icon: "badgeCrown" },
  { id: "reading_champion",name: "Reading Champion",  desc: "Finish all 12 stories.",              icon: "badgeTrophy" }
];

/* ---- The 12 original stories ------------------------------ */
const STORIES = [
  /* ===================== LEVEL 1 ===================== */
  {
    id: "s1", level: 1, order: 1,
    title: "Ollie the Otter's Blue Ball",
    character: "Ollie", accent: "sky", hero: "otter",
    vocab: [
      { word: "otter",  meaning: "a small animal that swims and lives near water", example: "The otter swims in the river.", icon: "otter" },
      { word: "ball",   meaning: "a round toy you can throw and catch",             example: "I play with a blue ball.",     icon: "ball" },
      { word: "river",  meaning: "a lot of water that moves across the land",       example: "Fish live in the river.",      icon: "river" },
      { word: "float",  meaning: "to stay on top of the water",                     example: "The boat can float.",          icon: "wave" }
    ],
    sentences: [
      "Ollie is a small otter.",
      "Ollie has a big blue ball.",
      "He plays with the ball by the river.",
      "The blue ball floats on the water.",
      "Ollie swims after his ball.",
      "Ollie is very happy."
    ],
    questions: [
      { type: "picture", skill: "Vocabulary", evidence: 1,
        prompt: "Tap the ball that Ollie plays with.",
        options: [{ icon: "ball", label: "ball" }, { icon: "fish", label: "fish" }, { icon: "star", label: "star" }],
        answer: 0, explain: "The story says, \"Ollie has a big blue ball.\"" },
      { type: "mc", skill: "Character", evidence: 0,
        prompt: "What animal is Ollie?",
        options: ["An otter", "A rabbit", "A duck"], answer: 0,
        explain: "The first sentence says, \"Ollie is a small otter.\"" },
      { type: "tf", skill: "Setting", evidence: 2,
        prompt: "Ollie plays by the river.", answer: true,
        explain: "The story says, \"He plays with the ball by the river.\"" },
      { type: "mc", skill: "Detail", evidence: 3,
        prompt: "What does the blue ball do on the water?",
        options: ["It floats", "It sinks", "It flies"], answer: 0,
        explain: "The story says, \"The blue ball floats on the water.\"" },
      { type: "match", skill: "Vocabulary",
        prompt: "Match each word to the correct picture.",
        pairs: [{ word: "otter", icon: "otter" }, { word: "ball", icon: "ball" }, { word: "river", icon: "river" }],
        explain: "Each word matches a picture from the story." },
      { type: "mc", skill: "Inference", evidence: 5,
        prompt: "How does Ollie feel at the end?",
        options: ["Happy", "Sad", "Angry"], answer: 0,
        explain: "The last sentence says, \"Ollie is very happy.\"" }
    ]
  },
  {
    id: "s2", level: 1, order: 2,
    title: "Mia's New Backpack",
    character: "Mia", accent: "coral", hero: "backpack",
    vocab: [
      { word: "backpack", meaning: "a bag you wear on your back to carry things", example: "My backpack is red.",       icon: "backpack" },
      { word: "book",     meaning: "pages with words and pictures that you read",  example: "I read a book at school.", icon: "book" },
      { word: "apple",    meaning: "a round fruit that is good to eat",            example: "I eat a red apple.",       icon: "apple" },
      { word: "school",   meaning: "a place where children go to learn",          example: "We learn at school.",      icon: "school" }
    ],
    sentences: [
      "Mia has a new backpack.",
      "The backpack is red.",
      "She puts a book in the backpack.",
      "She puts an apple in the backpack.",
      "Mia wears the backpack to school.",
      "Mia loves her new backpack."
    ],
    questions: [
      { type: "picture", skill: "Vocabulary", evidence: 0,
        prompt: "Tap Mia's backpack.",
        options: [{ icon: "backpack", label: "backpack" }, { icon: "hat", label: "hat" }, { icon: "shoe", label: "shoe" }],
        answer: 0, explain: "The story is about Mia's new backpack." },
      { type: "mc", skill: "Detail", evidence: 1,
        prompt: "What color is the backpack?",
        options: ["Red", "Blue", "Green"], answer: 0,
        explain: "The story says, \"The backpack is red.\"" },
      { type: "mc", skill: "Detail", evidence: 2,
        prompt: "What does Mia put in her backpack?",
        options: ["A book and an apple", "A ball and a cat", "A hat and a shoe"], answer: 0,
        explain: "Mia puts a book and an apple in the backpack." },
      { type: "tf", skill: "Action", evidence: 4,
        prompt: "Mia wears the backpack to school.", answer: true,
        explain: "The story says, \"Mia wears the backpack to school.\"" },
      { type: "listen", skill: "Listening",
        speak: "Mia puts an apple in the backpack.",
        prompt: "Listen. What food does Mia put in her backpack?",
        options: ["An apple", "A cake", "An egg"], answer: 0,
        explain: "You heard, \"Mia puts an apple in the backpack.\"" },
      { type: "mc", skill: "Inference", evidence: 5,
        prompt: "How does Mia feel about her backpack?",
        options: ["She loves it", "She is scared", "She is bored"], answer: 0,
        explain: "The last sentence says, \"Mia loves her new backpack.\"" }
    ]
  },
  {
    id: "s3", level: 1, order: 3,
    title: "Ben and the Little Turtle",
    character: "Ben", accent: "sage", hero: "turtle",
    vocab: [
      { word: "park",   meaning: "a green place outside where you can play", example: "We play in the park.",  icon: "tree" },
      { word: "turtle", meaning: "a slow animal with a hard shell",          example: "The turtle is slow.",   icon: "turtle" },
      { word: "slow",   meaning: "not fast; moving a little at a time",      example: "A snail is slow.",      icon: "snail" },
      { word: "leaf",   meaning: "a flat green part of a plant",             example: "The leaf is green.",    icon: "leaf" }
    ],
    sentences: [
      "Ben walks in the park.",
      "Ben sees a little turtle.",
      "The turtle is very slow.",
      "Ben gives the turtle a green leaf.",
      "The turtle eats the leaf.",
      "Ben smiles at the turtle."
    ],
    questions: [
      { type: "picture", skill: "Vocabulary", evidence: 1,
        prompt: "Tap the turtle that Ben sees.",
        options: [{ icon: "turtle", label: "turtle" }, { icon: "frog", label: "frog" }, { icon: "fish", label: "fish" }],
        answer: 0, explain: "The story says, \"Ben sees a little turtle.\"" },
      { type: "mc", skill: "Setting", evidence: 0,
        prompt: "Where does Ben walk?",
        options: ["In the park", "In a shop", "At home"], answer: 0,
        explain: "The first sentence says, \"Ben walks in the park.\"" },
      { type: "tf", skill: "Detail", evidence: 2,
        prompt: "The turtle is fast.", answer: false,
        explain: "The story says, \"The turtle is very slow,\" not fast." },
      { type: "mc", skill: "Action", evidence: 3,
        prompt: "What does Ben give the turtle?",
        options: ["A green leaf", "A blue ball", "A red hat"], answer: 0,
        explain: "The story says, \"Ben gives the turtle a green leaf.\"" },
      { type: "evidence", skill: "Details", answer: 4,
        prompt: "Tap the sentence that tells you the turtle eats.",
        explain: "The sentence \"The turtle eats the leaf\" shows the turtle eating." },
      { type: "mc", skill: "Inference", evidence: 5,
        prompt: "Ben smiles because he is ___.",
        options: ["kind to the turtle", "angry", "tired"], answer: 0,
        explain: "Ben helps and smiles at the turtle, so he is kind." }
    ]
  },
  {
    id: "s4", level: 1, order: 4,
    title: "A Sunny Day at the Playground",
    character: "Ben & Mia", accent: "yellow", hero: "playground",
    vocab: [
      { word: "sunny",      meaning: "bright with lots of sunshine",           example: "It is a sunny day.",       icon: "sun" },
      { word: "playground", meaning: "a place with slides and swings to play", example: "We run at the playground.", icon: "slide" },
      { word: "slide",      meaning: "a toy you go down at the playground",     example: "I go down the slide.",     icon: "slide" },
      { word: "swing",      meaning: "a seat that moves back and forth",        example: "I swing up high.",         icon: "swing" }
    ],
    sentences: [
      "It is a sunny day.",
      "The children go to the playground.",
      "Ben goes down the slide.",
      "Mia swings up high.",
      "They play with a big yellow ball.",
      "Everyone has fun."
    ],
    questions: [
      { type: "picture", skill: "Vocabulary", evidence: 2,
        prompt: "Tap the slide.",
        options: [{ icon: "slide", label: "slide" }, { icon: "swing", label: "swing" }, { icon: "seesaw", label: "seesaw" }],
        answer: 0, explain: "Ben goes down the slide in the story." },
      { type: "mc", skill: "Setting", evidence: 0,
        prompt: "What is the weather like?",
        options: ["Sunny", "Rainy", "Snowy"], answer: 0,
        explain: "The first sentence says, \"It is a sunny day.\"" },
      { type: "tf", skill: "Detail", evidence: 2,
        prompt: "Ben goes down the slide.", answer: true,
        explain: "The story says, \"Ben goes down the slide.\"" },
      { type: "sort", skill: "Details",
        prompt: "Sort each answer into Who, What or Where.",
        categories: ["Who", "What", "Where"],
        items: [{ text: "Ben", cat: "Who" }, { text: "Mia", cat: "Who" },
                { text: "a yellow ball", cat: "What" }, { text: "the playground", cat: "Where" }],
        explain: "Ben and Mia are people (Who), the ball is a thing (What), the playground is a place (Where)." },
      { type: "mc", skill: "Detail", evidence: 4,
        prompt: "What color is the ball?",
        options: ["Yellow", "Purple", "Black"], answer: 0,
        explain: "The story says, \"They play with a big yellow ball.\"" },
      { type: "mc", skill: "Main idea", evidence: 5,
        prompt: "What is this story mostly about?",
        options: ["Children having fun at the playground", "A rainy day at home", "Cooking dinner"], answer: 0,
        explain: "The children play together and \"Everyone has fun.\"" }
    ]
  },

  /* ===================== LEVEL 2 ===================== */
  {
    id: "s5", level: 2, order: 1,
    title: "The Missing Lunch Box",
    character: "Sam", accent: "coral", hero: "lunchbox",
    vocab: [
      { word: "lunch box", meaning: "a box that holds your food for lunch",   example: "My lunch box is blue.",   icon: "lunchbox" },
      { word: "desk",      meaning: "a table where you sit and work",         example: "My books are on my desk.", icon: "desk" },
      { word: "find",      meaning: "to see something you were looking for",  example: "I find my pencil.",       icon: "glass" },
      { word: "thank you", meaning: "kind words you say when someone helps",  example: "I say thank you to Mom.", icon: "heart" }
    ],
    sentences: [
      "It is lunch time at school.",
      "Sam is looking for his lunch box.",
      "He looks under the desk.",
      "He looks inside his bag.",
      "The lunch box is not there.",
      "Sam's friend Lily is helping him look.",
      "They find the lunch box by the door.",
      "Sam is happy and says thank you."
    ],
    questions: [
      { type: "mc", skill: "Character", evidence: 1,
        prompt: "What is Sam looking for?",
        options: ["His lunch box", "His shoe", "His book"], answer: 0,
        explain: "The story says, \"Sam is looking for his lunch box.\"" },
      { type: "tf", skill: "Detail", evidence: 2,
        prompt: "Sam looks under the desk.", answer: true,
        explain: "The story says, \"He looks under the desk.\"" },
      { type: "evidence", skill: "Details", answer: 6,
        prompt: "Tap the sentence that tells you where they find the lunch box.",
        explain: "\"They find the lunch box by the door\" tells you where it was." },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["Sam looks for his lunch box.", "Lily helps Sam look.", "They find the lunch box by the door."],
        explain: "First Sam looks, then Lily helps, then they find the lunch box." },
      { type: "mc", skill: "Detail", evidence: 6,
        prompt: "Where do they find the lunch box?",
        options: ["By the door", "Under the desk", "In the bag"], answer: 0,
        explain: "The story says, \"They find the lunch box by the door.\"" },
      { type: "mc", skill: "Cause and effect", evidence: 5,
        prompt: "Why does Sam say thank you?",
        options: ["Lily helps him find the lunch box", "He is hungry", "He is late"], answer: 0,
        explain: "Sam says thank you because Lily helped him find the lunch box." }
    ]
  },
  {
    id: "s6", level: 2, order: 2,
    title: "Lily Helps in the Garden",
    character: "Lily", accent: "sage", hero: "garden",
    vocab: [
      { word: "garden", meaning: "a place where plants and flowers grow", example: "Flowers grow in the garden.", icon: "flower" },
      { word: "seed",   meaning: "a tiny thing that grows into a plant",  example: "I plant a seed.",             icon: "seed" },
      { word: "water",  meaning: "to give water to a plant",             example: "I water the flowers.",        icon: "wateringcan" },
      { word: "grow",   meaning: "to get bigger",                        example: "The plant will grow.",        icon: "sprout" }
    ],
    sentences: [
      "Lily is helping her mom in the garden.",
      "The sun is shining brightly.",
      "Lily is planting little seeds.",
      "She is watering the seeds with a can.",
      "A yellow flower is growing by the fence.",
      "Lily pulls out the weeds.",
      "Her hands are dirty, but she is smiling.",
      "Lily loves the garden."
    ],
    questions: [
      { type: "mc", skill: "Setting", evidence: 0,
        prompt: "Where is Lily?",
        options: ["In the garden", "At school", "In a shop"], answer: 0,
        explain: "The story says, \"Lily is helping her mom in the garden.\"" },
      { type: "mc", skill: "Action", evidence: 2,
        prompt: "What is Lily doing with the seeds?",
        options: ["Planting and watering them", "Eating them", "Throwing them away"], answer: 0,
        explain: "Lily is planting the seeds and watering them with a can." },
      { type: "picture", skill: "Vocabulary", evidence: 3,
        prompt: "Tap the watering can.",
        options: [{ icon: "wateringcan", label: "watering can" }, { icon: "cup", label: "cup" }, { icon: "umbrella", label: "umbrella" }],
        answer: 0, explain: "Lily waters the seeds \"with a can.\"" },
      { type: "tf", skill: "Detail", evidence: 4,
        prompt: "A yellow flower is growing by the fence.", answer: true,
        explain: "The story says, \"A yellow flower is growing by the fence.\"" },
      { type: "match", skill: "Vocabulary",
        prompt: "Match each word to the correct picture.",
        pairs: [{ word: "seed", icon: "seed" }, { word: "flower", icon: "flower" }, { word: "can", icon: "wateringcan" }],
        explain: "Each word matches a picture from the garden story." },
      { type: "mc", skill: "Cause and effect", evidence: 6,
        prompt: "Why are Lily's hands dirty?",
        options: ["She works in the garden", "She paints a picture", "She plays in water"], answer: 0,
        explain: "Lily's hands are dirty because she works in the garden." }
    ]
  },
  {
    id: "s7", level: 2, order: 3,
    title: "A Rainy Morning at School",
    character: "Ben", accent: "sky", hero: "rain",
    vocab: [
      { word: "rain",     meaning: "water that falls from the clouds",     example: "The rain is falling.",     icon: "rain" },
      { word: "umbrella", meaning: "a thing you hold to stay dry in rain", example: "I open my umbrella.",       icon: "umbrella" },
      { word: "boots",    meaning: "shoes that keep your feet dry",        example: "My boots are wet.",         icon: "boot" },
      { word: "dry",      meaning: "not wet",                              example: "The class is warm and dry.", icon: "sun" }
    ],
    sentences: [
      "It is raining this morning.",
      "Ben is walking to school with his umbrella.",
      "The rain is falling on the road.",
      "Ben's boots are wet.",
      "He shakes his umbrella by the door.",
      "Inside, the class is warm and dry.",
      "The teacher is reading a book to the class.",
      "Ben is happy to be at school."
    ],
    questions: [
      { type: "mc", skill: "Setting", evidence: 0,
        prompt: "What is the weather like?",
        options: ["Rainy", "Sunny", "Snowy"], answer: 0,
        explain: "The first sentence says, \"It is raining this morning.\"" },
      { type: "picture", skill: "Vocabulary", evidence: 1,
        prompt: "Tap Ben's umbrella.",
        options: [{ icon: "umbrella", label: "umbrella" }, { icon: "hat", label: "hat" }, { icon: "ball", label: "ball" }],
        answer: 0, explain: "Ben walks to school \"with his umbrella.\"" },
      { type: "tf", skill: "Detail", evidence: 3,
        prompt: "Ben's boots are dry.", answer: false,
        explain: "The story says, \"Ben's boots are wet,\" not dry." },
      { type: "evidence", skill: "Details", answer: 6,
        prompt: "Tap the sentence that tells you what the teacher is doing.",
        explain: "\"The teacher is reading a book to the class\" tells you what the teacher does." },
      { type: "listen", skill: "Listening",
        speak: "Inside, the class is warm and dry.",
        prompt: "Listen. How is the class inside?",
        options: ["Warm and dry", "Cold and wet", "Dark and loud"], answer: 0,
        explain: "You heard, \"Inside, the class is warm and dry.\"" },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["Ben walks to school in the rain.", "Ben shakes his umbrella by the door.", "The teacher reads a book to the class."],
        explain: "First Ben walks in the rain, then he shakes his umbrella, then the teacher reads." }
    ]
  },
  {
    id: "s8", level: 2, order: 4,
    title: "Max Builds a Blanket Fort",
    character: "Max", accent: "yellow", hero: "fort",
    vocab: [
      { word: "fort",    meaning: "a small hideout you build to play in", example: "I build a fort.",      icon: "fort" },
      { word: "blanket", meaning: "a soft cloth that keeps you warm",     example: "The blanket is soft.", icon: "blanket" },
      { word: "pillow",  meaning: "a soft thing you rest your head on",   example: "My pillow is soft.",   icon: "pillow" },
      { word: "cozy",    meaning: "warm, soft and comfortable",           example: "The fort is cozy.",    icon: "heart" }
    ],
    sentences: [
      "Max is at home on a cold day.",
      "He wants to build a blanket fort.",
      "Max puts two chairs together.",
      "He puts a big blanket on top.",
      "He puts soft pillows inside.",
      "Max reads his favorite book in the fort.",
      "His cat sleeps next to him.",
      "The fort is warm and cozy."
    ],
    questions: [
      { type: "mc", skill: "Main idea", evidence: 1,
        prompt: "What does Max want to build?",
        options: ["A blanket fort", "A sandcastle", "A boat"], answer: 0,
        explain: "The story says, \"He wants to build a blanket fort.\"" },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the steps in the correct order.",
        items: ["Max puts two chairs together.", "He puts a big blanket on top.", "He puts soft pillows inside."],
        explain: "First chairs, then the blanket on top, then the pillows inside." },
      { type: "picture", skill: "Vocabulary", evidence: 4,
        prompt: "Tap the pillow.",
        options: [{ icon: "pillow", label: "pillow" }, { icon: "book", label: "book" }, { icon: "cup", label: "cup" }],
        answer: 0, explain: "Max puts soft pillows inside the fort." },
      { type: "tf", skill: "Detail", evidence: 6,
        prompt: "Max's cat sleeps next to him.", answer: true,
        explain: "The story says, \"His cat sleeps next to him.\"" },
      { type: "mc", skill: "Action", evidence: 5,
        prompt: "What does Max do in the fort?",
        options: ["He reads a book", "He cooks food", "He rides a bike"], answer: 0,
        explain: "The story says, \"Max reads his favorite book in the fort.\"" },
      { type: "mc", skill: "Cause and effect", evidence: 7,
        prompt: "Why is the fort warm and cozy?",
        options: ["It has a blanket and pillows", "It is outside", "It is made of ice"], answer: 0,
        explain: "The fort is cozy because it has a soft blanket and pillows." }
    ]
  },

  /* ===================== LEVEL 3 ===================== */
  {
    id: "s9", level: 3, order: 1,
    title: "The Picnic Surprise",
    character: "Mia & Ben", accent: "sage", hero: "picnic",
    vocab: [
      { word: "picnic", meaning: "a meal you eat outside for fun",        example: "We have a picnic in the park.", icon: "basket" },
      { word: "basket", meaning: "a bag with a handle for carrying food", example: "The food is in the basket.",   icon: "basket" },
      { word: "shady",  meaning: "cool and out of the hot sun",           example: "We sit in a shady spot.",      icon: "tree" },
      { word: "ants",   meaning: "tiny insects that live in the ground",  example: "The ants march in a line.",    icon: "ant" }
    ],
    sentences: [
      "On Saturday, Mia and Ben go to the park for a picnic.",
      "Mom packs sandwiches, fruit, and juice in a basket.",
      "They find a shady spot under a big tree.",
      "Mia puts a blanket on the grass.",
      "Just as they start to eat, some ants come to the blanket.",
      "The ants want the sweet fruit too.",
      "Ben moves the basket to a new spot.",
      "Mia shares one small piece of fruit with the ants.",
      "Soon the ants march away in a line.",
      "Everyone laughs and finishes the picnic."
    ],
    questions: [
      { type: "mc", skill: "Setting", evidence: 0,
        prompt: "Where do Mia and Ben go on Saturday?",
        options: ["To the park for a picnic", "To school", "To the shop"], answer: 0,
        explain: "The story says they \"go to the park for a picnic.\"" },
      { type: "evidence", skill: "Details", answer: 1,
        prompt: "Tap the sentence that tells you what Mom packs.",
        explain: "\"Mom packs sandwiches, fruit, and juice in a basket\" lists the food." },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["The family sits under a big tree.", "Some ants come to the blanket.", "Ben moves the basket away."],
        explain: "First they sit down, then ants come, then Ben moves the basket." },
      { type: "mc", skill: "Cause and effect", evidence: 5,
        prompt: "Why do the ants come to the blanket?",
        options: ["They want the sweet fruit", "They want the blanket", "They want to play"], answer: 0,
        explain: "The story says, \"The ants want the sweet fruit too.\"" },
      { type: "tf", skill: "Inference", evidence: 9,
        prompt: "The family runs home because of the ants.", answer: false,
        explain: "The family stays and \"finishes the picnic,\" so they do not run home." },
      { type: "mc", skill: "Inference", evidence: 7,
        prompt: "What kind of girl is Mia?",
        options: ["Kind and clever", "Rude", "Scared"], answer: 0,
        explain: "Mia calmly shares fruit with the ants, so she is kind and clever." }
    ]
  },
  {
    id: "s10", level: 3, order: 2,
    title: "Nora and the Lost Library Book",
    character: "Nora", accent: "coral", hero: "library",
    vocab: [
      { word: "library", meaning: "a place where you borrow books",       example: "We read at the library.",       icon: "library" },
      { word: "worried", meaning: "feeling upset that something is wrong", example: "She is worried about the test.", icon: "worried" },
      { word: "return",  meaning: "to give something back",               example: "I return my book.",             icon: "return" },
      { word: "brave",   meaning: "not afraid of hard things",            example: "The fox is brave.",             icon: "fox" }
    ],
    sentences: [
      "Nora loves to read library books.",
      "On Monday, she cannot find her library book.",
      "The book is about a brave little fox.",
      "Nora looks under her bed and in her bag.",
      "She feels worried because the book is late.",
      "Her little brother, Sam, remembers something.",
      "He saw the book in the kitchen this morning.",
      "Nora runs to the kitchen and finds the book.",
      "She returns the book to the library that day.",
      "The librarian smiles and gives Nora a new book."
    ],
    questions: [
      { type: "mc", skill: "Detail", evidence: 2,
        prompt: "What is Nora's book about?",
        options: ["A brave little fox", "A big blue ball", "A rainy day"], answer: 0,
        explain: "The story says, \"The book is about a brave little fox.\"" },
      { type: "mc", skill: "Inference", evidence: 4,
        prompt: "How does Nora feel when she cannot find the book?",
        options: ["Worried", "Happy", "Sleepy"], answer: 0,
        explain: "The story says, \"She feels worried because the book is late.\"" },
      { type: "evidence", skill: "Details", answer: 5,
        prompt: "Tap the sentence that tells you who remembers where the book is.",
        explain: "\"Her little brother, Sam, remembers something\" tells you who remembers." },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["Nora cannot find her library book.", "Sam remembers he saw it in the kitchen.", "Nora returns the book to the library."],
        explain: "First the book is lost, then Sam remembers, then Nora returns it." },
      { type: "mc", skill: "Cause and effect", evidence: 4,
        prompt: "Why is Nora worried?",
        options: ["The library book is late", "She is hungry", "It is raining"], answer: 0,
        explain: "Nora is worried \"because the book is late.\"" },
      { type: "tf", skill: "Detail", evidence: 9,
        prompt: "The librarian gives Nora a new book at the end.", answer: true,
        explain: "The story says, \"The librarian smiles and gives Nora a new book.\"" }
    ]
  },
  {
    id: "s11", level: 3, order: 3,
    title: "The Little Boat Race",
    character: "Ben & Max", accent: "sky", hero: "boat",
    vocab: [
      { word: "boat",   meaning: "a small thing that floats on water", example: "The boat is on the water.",   icon: "boat" },
      { word: "race",   meaning: "a game to see who is fastest",       example: "We have a boat race.",        icon: "flag" },
      { word: "stream", meaning: "a small river of moving water",      example: "The stream runs past us.",    icon: "river" },
      { word: "wave",   meaning: "water that moves up and down",       example: "A little wave lifts the boat.", icon: "wave" }
    ],
    sentences: [
      "Ben and Max make small paper boats.",
      "They want to race the boats on the stream.",
      "Ben's boat is blue, and Max's boat is red.",
      "The two boys put their boats in the water.",
      "The water carries the boats down the stream.",
      "Max's red boat goes fast at first.",
      "Then Ben's blue boat catches a little wave.",
      "The blue boat sails past the red boat.",
      "Ben's boat wins the race.",
      "The boys laugh and race again."
    ],
    questions: [
      { type: "mc", skill: "Main idea", evidence: 0,
        prompt: "What do Ben and Max make?",
        options: ["Small paper boats", "Blanket forts", "Sandwiches"], answer: 0,
        explain: "The story says, \"Ben and Max make small paper boats.\"" },
      { type: "tf", skill: "Detail", evidence: 2,
        prompt: "Ben's boat is red.", answer: false,
        explain: "The story says, \"Ben's boat is blue,\" and Max's boat is red." },
      { type: "evidence", skill: "Details", answer: 8,
        prompt: "Tap the sentence that tells you whose boat wins.",
        explain: "\"Ben's boat wins the race\" tells you the winner." },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["The boys put their boats in the water.", "Max's red boat goes fast at first.", "Ben's blue boat sails past and wins."],
        explain: "First the boats go in, then the red boat leads, then the blue boat wins." },
      { type: "mc", skill: "Cause and effect", evidence: 6,
        prompt: "Why does Ben's boat go past the red boat?",
        options: ["It catches a little wave", "It has a motor", "Max stops his boat"], answer: 0,
        explain: "Ben's blue boat \"catches a little wave\" and sails past." },
      { type: "mc", skill: "Inference", evidence: 9,
        prompt: "What do the boys do after the race?",
        options: ["They laugh and race again", "They go home sad", "They stop playing"], answer: 0,
        explain: "The last sentence says, \"The boys laugh and race again.\"" }
    ]
  },
  {
    id: "s12", level: 3, order: 4,
    title: "The Day the Class Saved a Butterfly",
    character: "The Class", accent: "yellow", hero: "butterfly",
    vocab: [
      { word: "butterfly", meaning: "an insect with big, pretty wings",   example: "The butterfly flies away.", icon: "butterfly" },
      { word: "wing",      meaning: "the part a bug or bird uses to fly", example: "Its wing is stuck.",         icon: "wing" },
      { word: "gently",    meaning: "in a soft and careful way",          example: "She holds it gently.",       icon: "hand" },
      { word: "cheer",     meaning: "to shout because you are happy",     example: "The class cheers.",          icon: "cheer" }
    ],
    sentences: [
      "One morning, a butterfly flies into the classroom.",
      "Its wing is stuck to the window.",
      "The children want to help the butterfly.",
      "Miss Lee opens the window very slowly.",
      "Ben brings a small paper cup.",
      "Mia gently guides the butterfly into the cup.",
      "The class walks outside to the garden.",
      "They open the cup near a pink flower.",
      "The butterfly rests on the flower for a moment.",
      "Then it flies up into the blue sky.",
      "The whole class cheers with joy."
    ],
    questions: [
      { type: "mc", skill: "Character", evidence: 0,
        prompt: "What flies into the classroom?",
        options: ["A butterfly", "A bird", "A bee"], answer: 0,
        explain: "The story says, \"A butterfly flies into the classroom.\"" },
      { type: "mc", skill: "Cause and effect", evidence: 1,
        prompt: "What is wrong with the butterfly?",
        options: ["Its wing is stuck to the window", "It is too big", "It is hungry"], answer: 0,
        explain: "The story says, \"Its wing is stuck to the window.\"" },
      { type: "sequence", skill: "Sequencing",
        prompt: "Put the story events in the correct order.",
        items: ["The butterfly's wing is stuck.", "Mia guides it into a paper cup.", "The class sets it free in the garden."],
        explain: "First the wing is stuck, then Mia helps it into the cup, then they set it free." },
      { type: "evidence", skill: "Details", answer: 7,
        prompt: "Tap the sentence that tells you where the class sets the butterfly free.",
        explain: "\"They open the cup near a pink flower\" tells you where the butterfly is set free." },
      { type: "tf", skill: "Inference", evidence: 2,
        prompt: "The children want to hurt the butterfly.", answer: false,
        explain: "The story says, \"The children want to help the butterfly,\" not hurt it." },
      { type: "mc", skill: "Main idea", evidence: 10,
        prompt: "Why does the class cheer at the end?",
        options: ["The butterfly is free and safe", "School is over", "They see a rainbow"], answer: 0,
        explain: "The class cheers because the butterfly flies away, free and safe." }
    ]
  }
];
