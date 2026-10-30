// ==================== CEFR A2 DATA STORE (ENGLISH FILE 5TH ELEMENTARY UNITS 1-12) ====================
window.LEVEL_DATA = window.LEVEL_DATA || {};

const DATA_A2 = {
  // -------------------- UNITS 1 & 2 (World • Desk Objects • Feelings & Imperatives) --------------------
  "u12": {
    title: "Units 1 & 2",
    subtitle: "World • Desk • Feelings",
    icon: "🌎",
    unlocked: true,
    part1: [
      { q: "Where are you from? What is your hometown famous for?", h: "I'm from [Ho Chi Minh City]. It's famous for [delicious street food and friendly people].", kw: "hometown, famous" },
      { q: "When do you have English classes? Why are you learning English?", h: "I have English classes on [Monday and Thursday]. I'm learning English for [my future job].", kw: "English classes" },
      { q: "What things do you usually have on your study desk?", h: "On my desk, I usually have [a laptop, a notebook, a lamp, and some pens].", kw: "study desk" },
      { q: "Are you a tidy or an untidy person? Why?", h: "I'm a [tidy] person because I always put my things in the right place.", kw: "tidy, untidy" },
      { q: "What is your favourite American food, film, or music?", h: "My favourite American food is [burgers], and I love watching [American action films].", kw: "American" },
      { q: "How are you feeling right now? Are you tired or hungry?", h: "Right now, I'm feeling [happy and relaxed], but I'm a little [hungry].", kw: "feeling" },
      { q: "What do you usually do when you feel stressed or sad?", h: "When I feel stressed, I usually [listen to music or go for a walk].", kw: "stressed, sad" },
      { q: "Do you prefer studying alone or in a group? Why?", h: "I prefer studying [in a group] because we can help each other with difficult exercises.", kw: "studying" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "Study Desk & Bedroom Workspace",
            img: "img/a2/spot_2.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 💻 On the desk", a: "Silver laptop", b: "Notebook & red dictionary", sentence: "In Picture A, there is a silver laptop on the desk, but in Picture B, there is an open notebook and a red dictionary." },
              { label: "2. 💡 Desk lamp", a: "Blue lamp", b: "Yellow lamp", sentence: "In Picture A, the desk lamp is blue, whereas in Picture B, it is yellow." },
              { label: "3. ☕ Drink on desk", a: "Hot coffee", b: "Orange juice", sentence: "In Picture A, there is a cup of hot coffee, but in Picture B, there is a glass of orange juice." },
              { label: "4. 🎒 Beside the desk", a: "Black backpack", b: "Brown guitar", sentence: "In Picture A, there is a black backpack on the floor, while in Picture B, there is a brown guitar leaning against the desk." },
              { label: "5. 🕘 Wall clock", a: "9:00", b: "3:00", sentence: "In Picture A, the clock on the wall shows nine o'clock, but in Picture B, it shows three o'clock." },
              { label: "6. 🪑 Desk chair", a: "Green chair", b: "Red chair", sentence: "In Picture A, the desk chair is green, but in Picture B, the chair is red." },
              { label: "7. 🎧 Accessories", a: "Glasses", b: "Headphones", sentence: "In Picture A, there is a pair of glasses on the desk, whereas in Picture B, there are headphones." },
              { label: "8. 🌤️ Window weather", a: "Sunny weather", b: "Rainy weather", sentence: "In Picture A, it is sunny outside the window, but in Picture B, it is raining." }
            ],
            followUp: {
              A: {
                q: "Do you prefer studying at a desk in your bedroom or at a café? Why?",
                h: "I prefer studying at a desk in my bedroom because it is quiet and I can concentrate better."
              },
              B: {
                q: "What is the most important object on your desk when you study? Why?",
                h: "The most important object on my desk is my laptop because I use it to search for information and do homework."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? How are you feeling today?" },
              { label: "2. Ask reason", q: "Why are you feeling so sad? What happened?" },
              { label: "3. Advice: Walk & relax", q: "You should go for a walk in the park and relax." },
              { label: "4. Advice: Talk to friend", q: "Why don't you talk to a close friend about it?" }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Tired)",
            give: [
              { label: "1. Your Feeling", val: "😴 Tired & sleepy", a: "I'm feeling really tired and sleepy today." },
              { label: "2. Your Reason 1", val: "📚 Prepared for exam", a: "Because I stayed up late last night to prepare for my exam." },
              { label: "3. Your Reason 2", val: "⏰ Slept only 3 hours", a: "I only slept for three hours last night." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thanks for your advice! That's a good idea, I'll go to bed early tonight." }
            ],
            followUp: {
              q: "When you have problems, who do you usually talk to?",
              h: "When I have problems, I usually talk to my mother or my best friend because they always listen and give me great advice."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Sad)",
            give: [
              { label: "1. Your Feeling", val: "😢 Very sad", a: "I'm feeling really sad and upset today." },
              { label: "2. Your Reason 1", val: "📝 Failed English test", a: "Because I failed my English test this morning." },
              { label: "3. Your Reason 2", val: "🖊️ Lost favourite pen", a: "And I also lost my favourite pen on the way to class." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you so much! I'll try going for a walk and talking to my friend." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? Is everything OK?" },
              { label: "2. Ask reason", q: "Why? What makes you feel so tired?" },
              { label: "3. Advice: Water & nap", q: "You should drink some water and take a short nap now." },
              { label: "4. Advice: Bed early", q: "Don't stay up late! You should go to bed early tonight." }
            ],
            followUp: {
              q: "Do you like giving advice to your friends when they have problems? Why or why not?",
              h: "Yes, I do, because I care about my friends and I want to help them feel happier and less stressed."
            }
          }
        }
      ]
    }
  },

  // -------------------- UNITS 3 & 4 (Work • Pets • Family Photos • Healthy Routine) --------------------
  "u34": {
    title: "Units 3 & 4",
    subtitle: "Work • Family • Lifestyle",
    icon: "🏡",
    unlocked: true,
    part1: [
      { q: "Do you like to work in a team? Why or why not?", h: "Yes, I like working in a team because we can share ideas and help each other.", kw: "work in a team" },
      { q: "What time do you usually go to bed at night?", h: "I usually go to bed at around [11:00 p.m.] on weekdays.", kw: "go to bed" },
      { q: "What do you usually do after school or work?", h: "After school, I usually [go home, help my parents, and do my homework].", kw: "after school" },
      { q: "Are you a 'dog person' or a 'cat person'? Why?", h: "I'm a [dog person] because dogs are very friendly, loyal, and playful.", kw: "dog person" },
      { q: "Would you prefer to work in an office or work from home?", h: "I prefer working [in an office] because I enjoy talking with my colleagues.", kw: "office, home" },
      { q: "Who are you closest to in your family? What are they like?", h: "I'm closest to my [sister]. She is very kind, funny, and helpful.", kw: "family" },
      { q: "How often do you eat fast food or eat out with friends?", h: "I eat out with my friends [once a week], and I rarely eat fast food.", kw: "fast food, eat out" },
      { q: "What do you do to stay healthy and live a long life?", h: "I try to eat lots of vegetables, do exercise three times a week, and sleep 7 hours a night.", kw: "healthy" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "Two Houses in the Neighbourhood",
            img: "img/a2/spot_1.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 🏠 Big house (left)", a: "Yellow house", b: "Blue house", sentence: "In Picture A, the big two-storey house on the left is yellow, but in Picture B, it is blue." },
              { label: "2. 🪟 Upstairs windows", a: "4 closed windows", b: "3 open windows", sentence: "In Picture A, the big house has four closed windows upstairs, whereas in Picture B, it has three open windows." },
              { label: "3. 🏡 Small house (right)", a: "Blue house", b: "Red house", sentence: "In Picture A, the smaller house on the right is blue, but in Picture B, it is red." },
              { label: "4. 🐱 Small house window", a: "Closed (no cat)", b: "Open with a cat", sentence: "In Picture A, the window of the small house is closed, while in Picture B, it is open and there is a cat inside." },
              { label: "5. 👩 Woman on the lawn", a: "Gardening / planting", b: "Sitting & reading a book", sentence: "In Picture A, the woman is gardening near the flowers, but in Picture B, she is sitting on the grass reading a book." },
              { label: "6. 🐕 Man on the pavement", a: "Walking a black dog", b: "Talking to another man", sentence: "In Picture A, a man is walking a black dog, whereas in Picture B, two men are standing and talking." },
              { label: "7. 🚲 Bicycle (left)", a: "Blue bicycle", b: "Red bicycle", sentence: "In Picture A, the bicycle next to the house is blue, but in Picture B, the bicycle is red." },
              { label: "8. 🪑 Porch & front path", a: "Orange armchair & brick path", b: "Small table/lamp & stone path", sentence: "In Picture A, there is an orange armchair on the porch and a brick path, but in Picture B, there is a small table with a lamp and a grey stone path." }
            ],
            followUp: {
              A: {
                q: "Do you like to live in the countryside or in big cities? Why?",
                h: "I like to live in big cities because there are more good jobs, modern hospitals, and exciting places to go."
              },
              B: {
                q: "Do you like to live in a large or small family? Why?",
                h: "I like to live in a small family because the house is quieter and parents have more time to take care of each child."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? You look really stressed!" },
              { label: "2. Ask reason", q: "Why are you feeling so stressed? What happened at work?" },
              { label: "3. Advice: Make a list", q: "You should make a to-do list and finish one task at a time." },
              { label: "4. Advice: Ask for help", q: "Why don't you talk to your manager or ask a colleague for help?" }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Worried)",
            give: [
              { label: "1. Your Feeling", val: "😟 Very worried", a: "I'm feeling really worried and anxious right now." },
              { label: "2. Your Reason 1", val: "🐶 My dog is sick", a: "Because my pet dog is sick and doesn't want to eat anything today." },
              { label: "3. Your Reason 2", val: "🏥 Vet is far away", a: "And the animal hospital is quite far from my house." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you for your advice! I'll call the vet right now and take him there." }
            ],
            followUp: {
              q: "What do you usually do to relax after a busy week at school or work?",
              h: "After a busy week, I usually sleep in on Sunday morning, drink coffee with friends, and play sports."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Stressed)",
            give: [
              { label: "1. Your Feeling", val: "😫 Very stressed", a: "I'm feeling really stressed out and exhausted today." },
              { label: "2. Your Reason 1", val: "💻 Too much homework", a: "Because I have three big group projects and too much homework this week." },
              { label: "3. Your Reason 2", val: "⏳ Deadline is tomorrow", a: "And the deadline for my presentation is tomorrow morning." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thanks a lot! Making a to-do list is a great idea, I'll try it right now." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? Why do you look so worried?" },
              { label: "2. Ask reason", q: "Oh no, what happened? Why are you worried?" },
              { label: "3. Advice: Take to vet", q: "You should take your dog to see a vet as soon as possible." },
              { label: "4. Advice: Warm water", q: "And you should give him some warm water and let him rest." }
            ],
            followUp: {
              q: "Do you think having a pet helps people feel happier and less stressed? Why?",
              h: "Yes, definitely! Playing with a dog or cat helps us forget our daily stress and makes us feel loved."
            }
          }
        }
      ]
    }
  },

  // -------------------- UNITS 5 & 6 (Abilities Can/Can't • London • Free Time & Music) --------------------
  "u56": {
    title: "Units 5 & 6",
    subtitle: "Skills • London • Music",
    icon: "🎸",
    unlocked: true,
    part1: [
      { q: "Can you play a musical instrument?", h: "Yes, I can play the [guitar] a little. / No, I can't, but I love listening to music.", kw: "musical instrument" },
      { q: "What do you think of Ho Chi Minh City?", h: "I think Ho Chi Minh City is a very dynamic, modern, and exciting place to live.", kw: "Ho Chi Minh City" },
      { q: "What's your favourite day of the week? Why?", h: "My favourite day is [Saturday] because I can relax and go out with my friends.", kw: "favourite day" },
      { q: "What social media do you use?", h: "I usually use [Facebook, TikTok, and Instagram] to read news and chat with friends.", kw: "social media" },
      { q: "Can you swim or cook well? What special skill do you want to learn?", h: "I can cook simple dishes, and I want to learn how to [speak Japanese / swim].", kw: "swim, cook, skill" },
      { q: "What is the weather like in your city at the moment?", h: "At the moment, the weather is [very hot and sunny] during the day.", kw: "weather" },
      { q: "What kind of music do you like listening to when you study or travel?", h: "I like listening to [chill pop music and lo-fi music] because it helps me relax.", kw: "music" },
      { q: "What activities do you love doing on Sunday mornings?", h: "On Sunday mornings, I love [sleeping late and having breakfast with my family].", kw: "Sunday" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "Weekend in the City Park",
            img: "img/a2/spot_3.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 🎸 Man on the bench", a: "Playing the guitar", b: "Headphones & newspaper", sentence: "In Picture A, the young man on the bench is playing the guitar, but in Picture B, he is wearing headphones and reading a newspaper." },
              { label: "2. 🏃‍♀️ Two women on path", a: "Jogging / running", b: "Riding bicycles", sentence: "In Picture A, two women on the path are jogging, whereas in Picture B, they are riding bicycles." },
              { label: "3. ☕ Coffee van (left)", a: "Green coffee van", b: "Yellow coffee van", sentence: "In Picture A, the coffee kiosk on the left is green, but in Picture B, it is yellow." },
              { label: "4. 🪁 Little boy", a: "Flying a red kite", b: "Playing with a football", sentence: "In Picture A, a boy is flying a red kite, while in Picture B, he is playing with a football." },
              { label: "5. 🦢 In the park pond", a: "One white swan", b: "Three ducks", sentence: "In Picture A, there is a white swan in the pond, but in Picture B, there are three ducks." },
              { label: "6. 🧥 Woman on the grass", a: "Blue jacket", b: "Pink sweater", sentence: "In Picture A, the woman sitting on the grass is wearing a blue jacket, whereas in Picture B, she is wearing a pink sweater." },
              { label: "7. 🌳 Under the tree", a: "Sleeping dog", b: "Picnic basket", sentence: "In Picture A, there is a dog sleeping under the tree, but in Picture B, there is a picnic basket." },
              { label: "8. 🌈 In the sky", a: "Sunny with white clouds", b: "Rainbow in the sky", sentence: "In Picture A, the sky is sunny with clouds, while in Picture B, there is a rainbow in the sky." }
            ],
            followUp: {
              A: {
                q: "Do you like going to parks or outdoor places at the weekend? Why?",
                h: "Yes, I love going to the park at the weekend because the air is fresh and I can walk or exercise with friends."
              },
              B: {
                q: "Do you prefer playing sports outdoors or listening to music at home? Why?",
                h: "I prefer listening to music at home on hot days, but in the afternoon I like playing badminton outdoors."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? Why do you look so nervous?" },
              { label: "2. Ask reason", q: "Why are you feeling so nervous? What's happening?" },
              { label: "3. Advice: Practice", q: "You should practice your song slowly and take deep breaths." },
              { label: "4. Advice: Be confident", q: "Don't worry! Just smile and enjoy the music on stage." }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Bored)",
            give: [
              { label: "1. Your Feeling", val: "🥱 Very bored", a: "I'm feeling really bored and lonely today." },
              { label: "2. Your Reason 1", val: "🌧️ Raining all day", a: "Because it's raining heavily outside and I can't go out." },
              { label: "3. Your Reason 2", val: "📵 Friends are busy", a: "And all my friends are busy studying today." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "That sounds great! Thanks for your advice, I'll watch a comedy film now." }
            ],
            followUp: {
              q: "What do you usually do when the weather is rainy and you have to stay at home?",
              h: "When it rains, I usually stay in my room, listen to music, watch movies, or cook hot noodles."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Nervous)",
            give: [
              { label: "1. Your Feeling", val: "😰 Very nervous", a: "I'm feeling really nervous and scared right now." },
              { label: "2. Your Reason 1", val: "🎤 Music show tonight", a: "Because I have to sing a song in the university music show tonight." },
              { label: "3. Your Reason 2", val: "👀 Many people watching", a: "There are more than two hundred students in the audience." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you so much! I'll take deep breaths and practice one more time." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? Are you feeling OK?" },
              { label: "2. Ask reason", q: "Why are you feeling so bored today?" },
              { label: "3. Advice: Watch film", q: "Why don't you watch an interesting movie or read a book?" },
              { label: "4. Advice: Video call", q: "You can also play an online game or video call your family." }
            ],
            followUp: {
              q: "Do you feel nervous when you speak or perform in front of a lot of people? How do you prepare?",
              h: "Yes, I feel quite nervous, so I always prepare carefully and practice with my partner many times before speaking."
            }
          }
        }
      ]
    }
  },

  // -------------------- UNITS 7 & 8 (Past Simple Was/Were & Verbs • Mystery • Houses & Rooms) --------------------
  "u78": {
    title: "Units 7 & 8",
    subtitle: "Past Events • Mystery • Home",
    icon: "🕵️",
    unlocked: true,
    part1: [
      { q: "Where were you yesterday evening at 8:00 p.m.? What did you do?", h: "Yesterday evening at 8:00, I was at home. I had dinner and watched TV.", kw: "yesterday evening" },
      { q: "What did you do last weekend? Did you go out with friends?", h: "Last weekend, I went to a café with my friends and played badminton.", kw: "last weekend" },
      { q: "Tell me about a memorable birthday or party you went to in the past.", h: "Last year, I went to my friend's birthday party. We ate cake and took many photos.", kw: "party, birthday" },
      { q: "Do you like taking selfies or photos when you travel? Why?", h: "Yes, I love taking photos when I travel because I want to keep good memories.", kw: "selfies, photos" },
      { q: "Do you enjoy reading detective stories or watching mystery films?", h: "Yes, I enjoy watching mystery films because they are exciting and interesting.", kw: "mystery films" },
      { q: "Do you live in a house or a flat? What is your favourite room?", h: "I live in a house. My favourite room is my bedroom because it's comfortable and quiet.", kw: "favourite room" },
      { q: "Would you like to live in an old historic house or a modern flat? Why?", h: "I'd like to live in a modern flat because it is clean, bright, and convenient.", kw: "historic, modern" },
      { q: "Did you sleep well last night? What time did you get up this morning?", h: "Yes, I slept very well. I got up at [6:30] this morning.", kw: "last night, get up" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "Cozy Living Room in the Evening",
            img: "img/a2/spot_4.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 🛋️ Sofa colour", a: "Grey sofa", b: "Green sofa", sentence: "In Picture A, the sofa in the living room is grey, but in Picture B, the sofa is green." },
              { label: "2. 👨 Man on the sofa", a: "Watching football on TV", b: "Sleeping on the sofa", sentence: "In Picture A, the man is watching football on TV, whereas in Picture B, he is sleeping on the sofa." },
              { label: "3. 👩 Woman in armchair", a: "Drinking tea", b: "Talking on her phone", sentence: "In Picture A, the woman is sitting in an armchair drinking tea, but in Picture B, she is talking on her mobile phone." },
              { label: "4. 🖼️ Above fireplace", a: "Painting of a ship", b: "Round mirror", sentence: "In Picture A, there is a painting of a ship on the wall, while in Picture B, there is a large round mirror." },
              { label: "5. 🍕 On coffee table", a: "Plate of pizza", b: "Bowl of fruit", sentence: "In Picture A, there is a plate of pizza on the table, but in Picture B, there is a bowl of fruit." },
              { label: "6. 🐾 Pet on the rug", a: "White dog", b: "Black cat", sentence: "In Picture A, a white dog is lying on the rug, whereas in Picture B, there is a black cat." },
              { label: "7. 📚 Next to the sofa", a: "Floor lamp", b: "Tall bookshelf", sentence: "In Picture A, there is a floor lamp next to the sofa, but in Picture B, there is a tall bookshelf." },
              { label: "8. 🪟 Window curtains", a: "Blue curtains", b: "Red curtains", sentence: "In Picture A, the curtains on the window are blue, while in Picture B, they are red." }
            ],
            followUp: {
              A: {
                q: "Which room in your house do your family spend the most time in? Why?",
                h: "My family spends the most time in the living room because we like watching TV and talking together after dinner."
              },
              B: {
                q: "Do you prefer staying at home or going out with friends on Saturday nights? Why?",
                h: "On Saturday nights, I prefer going out with friends to a café because I study at home all week."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? Why do you look so angry?" },
              { label: "2. Ask reason", q: "What happened last night? Why are you angry?" },
              { label: "3. Advice: Talk politely", q: "You should knock on their door and ask them politely to turn down the music." },
              { label: "4. Advice: Earplugs", q: "Or you can wear earplugs and tell the building manager." }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Frightened)",
            give: [
              { label: "1. Your Feeling", val: "😨 Scared & tired", a: "I'm feeling really scared and tired this morning." },
              { label: "2. Your Reason 1", val: "👻 Watched horror film", a: "Because I watched a terrifying horror film alone at midnight." },
              { label: "3. Your Reason 2", val: "🔊 Heard strange noises", a: "And then I heard strange noises outside my bedroom window." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Haha, you're right! Thanks for your advice, I won't watch horror films at night anymore." }
            ],
            followUp: {
              q: "Have you ever had a noisy neighbour? How did you deal with the problem?",
              h: "Yes, my neighbour once played loud karaoke at night, so my father talked to him politely and he turned it down."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Angry)",
            give: [
              { label: "1. Your Feeling", val: "😠 Very angry", a: "I'm feeling really angry and annoyed today." },
              { label: "2. Your Reason 1", val: "🔊 Noisy neighbours", a: "Because my neighbours had a loud party until 2:00 a.m. last night." },
              { label: "3. Your Reason 2", val: "😵 Couldn't sleep at all", a: "The music was so loud that I couldn't sleep at all." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you for the advice! I'll talk to my neighbour politely tonight." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? You look really pale and scared!" },
              { label: "2. Ask reason", q: "Why? What happened to you last night?" },
              { label: "3. Advice: No horror films", q: "You shouldn't watch horror films alone late at night!" },
              { label: "4. Advice: Funny video", q: "Next time, you should watch a funny comedy or keep a small light on." }
            ],
            followUp: {
              q: "What things or animals are you most afraid of? Why?",
              h: "I'm most afraid of snakes and spiders because they look scary and some of them are dangerous."
            }
          }
        }
      ]
    }
  },

  // -------------------- UNITS 9 & 10 (Food & Diet • Comparative/Superlative Cities • Future Plans) --------------------
  "u910": {
    title: "Units 9 & 10",
    subtitle: "Food • Cities • Future Plans",
    icon: "🥗",
    unlocked: true,
    part1: [
      { q: "What did you have for breakfast and lunch today?", h: "Today I had [noodles] for breakfast and [rice with chicken] for lunch.", kw: "breakfast, lunch" },
      { q: "Do you prefer cooking meals at home or eating at restaurants? Why?", h: "I prefer cooking at home because the food is cleaner, healthier, and cheaper.", kw: "cooking, restaurants" },
      { q: "How much water do you drink every day? Do you like sweet drinks?", h: "I drink about two litres of water a day. I don't drink much soda because it has too much sugar.", kw: "water, sweet drinks" },
      { q: "What is the most beautiful city or place you have visited in Vietnam?", h: "The most beautiful place I've visited is [Da Lat] because the weather is cool and fresh.", kw: "most beautiful city" },
      { q: "Compare your hometown with Ho Chi Minh City. Which one is better for you?", h: "Ho Chi Minh City is bigger and more exciting, but my hometown is quieter and cheaper.", kw: "Compare, hometown" },
      { q: "What are you going to do this evening after class?", h: "This evening, I'm going to go home, have dinner, and review my English lessons.", kw: "going to, evening" },
      { q: "Where are you going to go on your next holiday?", h: "On my next holiday, I'm going to travel to [Da Nang] with my family.", kw: "next holiday" },
      { q: "When you travel, do you prefer staying in a hotel or a homestay? Why?", h: "I prefer staying in a homestay because it is cosy and I can learn about local life.", kw: "hotel, homestay" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "Having Lunch at a Café Restaurant",
            img: "img/a2/spot_5.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 🥩 Man's food", a: "Steak and chips", b: "Bowl of pasta", sentence: "In Picture A, the man is eating steak and chips, but in Picture B, he is eating a bowl of pasta." },
              { label: "2. 🥗 Woman's food", a: "Green salad", b: "Chocolate cake", sentence: "In Picture A, the woman is eating a green salad, whereas in Picture B, she is eating a slice of chocolate cake." },
              { label: "3. 🥤 Drinks on table", a: "Bottle of mineral water", b: "Two glasses of orange juice", sentence: "In Picture A, there is a bottle of mineral water on the table, but in Picture B, there are two glasses of orange juice." },
              { label: "4. 🧑‍🍳 Server", a: "Waiter in shirt & tie", b: "Waitress in blue apron", sentence: "In Picture A, a waiter wearing a white shirt and black tie is serving, while in Picture B, a waitress in a blue apron is serving." },
              { label: "5. 🍽️ Tablecloth", a: "Red & white checked", b: "Plain white tablecloth", sentence: "In Picture A, the tablecloth is red and white checked, but in Picture B, it is plain white." },
              { label: "6. 🌻 Centre of table", a: "Vase with yellow flowers", b: "Small candle", sentence: "In Picture A, there is a vase with yellow flowers on the table, whereas in Picture B, there is a small candle." },
              { label: "7. 🧥 Man's clothes", a: "Blue suit jacket", b: "Grey sweater", sentence: "In Picture A, the man is wearing a blue suit jacket, but in Picture B, he is wearing a grey sweater." },
              { label: "8. 🚌 Outside window", a: "Red double-decker bus", b: "Yellow taxi", sentence: "In Picture A, you can see a red double-decker bus through the window, while in Picture B, there is a yellow taxi." }
            ],
            followUp: {
              A: {
                q: "Do you prefer eating traditional Vietnamese food or foreign food (like pizza or pasta)? Why?",
                h: "I prefer eating traditional Vietnamese food like Pho and Com Tam because it is fresh, tasty, and healthy."
              },
              B: {
                q: "What makes a good restaurant in your opinion: delicious food, cheap prices, or friendly service?",
                h: "In my opinion, clean and delicious food is the most important thing, and friendly service also makes customers happy."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? You don't look well today!" },
              { label: "2. Ask reason", q: "Why are you feeling sick? What did you eat?" },
              { label: "3. Advice: Warm water & medicine", q: "You should drink some warm ginger tea and take stomach medicine." },
              { label: "4. Advice: See a doctor", q: "If it still hurts this afternoon, you should go to see a doctor." }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Confused / Worried)",
            give: [
              { label: "1. Your Feeling", val: "😕 Worried about trip", a: "I'm feeling quite worried about my family holiday next week." },
              { label: "2. Your Reason 1", val: "🏨 Hotels are full", a: "Because I forgot to book a hotel in Da Lat and most places are full." },
              { label: "3. Your Reason 2", val: "💸 Tickets are expensive", a: "And bus tickets are getting very expensive right now." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "That's a great idea! Thanks a lot, I'll check homestay apps right now." }
            ],
            followUp: {
              q: "Do you like planning everything carefully before a trip, or deciding when you arrive?",
              h: "I always like planning and booking hotels carefully before a trip so I can save money and avoid problems."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Sick / Stomachache)",
            give: [
              { label: "1. Your Feeling", val: "🤢 Feeling sick", a: "I'm feeling really sick and I have a bad stomachache." },
              { label: "2. Your Reason 1", val: "🍢 Ate spicy street food", a: "Because I ate too much spicy street food at the night market yesterday." },
              { label: "3. Your Reason 2", val: "🧊 Drank iced soda", a: "And I also drank two large cups of iced soda late at night." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you for your advice! I'll drink warm water and go to the pharmacy." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? Why do you look so worried?" },
              { label: "2. Ask reason", q: "Why are you worried about your holiday next week?" },
              { label: "3. Advice: Homestay app", q: "Why don't you look for a local homestay on Booking or Agoda?" },
              { label: "4. Advice: Book today", q: "You should book your bus tickets online today before they sell out." }
            ],
            followUp: {
              q: "What should people do to stay healthy when they travel to a new city?",
              h: "When travelling, people should drink bottled water, eat at clean restaurants, and bring basic medicine."
            }
          }
        }
      ]
    }
  },

  // -------------------- UNITS 11 & 12 (Adverbs • Ambitions • Smartphones • Present Perfect) --------------------
  "u1112": {
    title: "Units 11 & 12",
    subtitle: "Ambitions • Tech • Experiences",
    icon: "✈️",
    unlocked: true,
    part1: [
      { q: "What would you like to do after you finish university?", h: "After I finish university, I'd like to work for [an international company in Ho Chi Minh City].", kw: "finish university" },
      { q: "What is one dream or ambition on your 'bucket list'?", h: "One big dream on my bucket list is to [travel to Japan and see cherry blossoms].", kw: "bucket list, dream" },
      { q: "How many hours a day do you use your smartphone? What apps do you use most?", h: "I use my phone for about [4 hours] a day. I use [Zalo, YouTube, and dictionary apps] the most.", kw: "smartphone, apps" },
      { q: "Do you think people today spend too much time on their phones?", h: "Yes, I think many people spend too much time on social media instead of talking face to face.", kw: "too much time" },
      { q: "Have you ever visited another country or a famous tourist city?", h: "I haven't visited another country yet, but I have been to [Nha Trang and Da Lat].", kw: "Have you ever" },
      { q: "Have you ever watched a film or read a book more than three times?", h: "Yes, I have! I've watched [Harry Potter] four times because the story is amazing.", kw: "watched a film" },
      { q: "Have you ever tried an unusual or foreign dish? Did you like it?", h: "Yes, I have tried [Japanese sushi and Korean tokbokki]. They were very delicious.", kw: "foreign dish" },
      { q: "Have you ever lost something important, like your phone or wallet?", h: "Yes, I lost my wallet last year, and I felt very worried.", kw: "lost something" }
    ],
    part2: {
      taskName: "Spot Differences & What's the matter?",
      scenarios: [
        {
          id: 1,
          label: "#1 Spot Diff",
          spotDiff: {
            title: "At the Airport Departure Hall",
            img: "img/a2/spot_6.png",
            instruction: "Work in pairs. Look at Picture A and Picture B. Identify, describe, and compare at least 6 of the 8 differences.",
            diffs: [
              { label: "1. 🧳 Woman's luggage", a: "Large red suitcase", b: "Blue backpack", sentence: "In Picture A, the young woman is pulling a large red suitcase, but in Picture B, she is carrying a blue backpack." },
              { label: "2. 👒 Woman's clothes", a: "Sunglasses & sun hat", b: "Winter scarf & coat", sentence: "In Picture A, she is wearing sunglasses and a sun hat, whereas in Picture B, she is wearing a winter scarf and coat." },
              { label: "3. 💳 At ticket counter", a: "Paying by credit card", b: "Paying with cash", sentence: "In Picture A, the man at the counter is paying by credit card, but in Picture B, he is paying with cash." },
              { label: "4. 🛫 Departure board", a: "Paris — 10:30", b: "Tokyo — 11:00", sentence: "In Picture A, the departure board shows a flight to Paris at 10:30, while in Picture B, it shows a flight to Tokyo at 11:00." },
              { label: "5. 👦 Boy on the seat", a: "Playing on a tablet", b: "Eating a sandwich", sentence: "In Picture A, the boy on the seat is playing on a tablet, but in Picture B, he is eating a sandwich." },
              { label: "6. 🪧 Shop sign (left)", a: "Café sign", b: "Bookshop sign", sentence: "In Picture A, there is a café sign on the left, whereas in Picture B, there is a bookshop sign." },
              { label: "7. 👨‍✈️ Near the gate", a: "Two pilots", b: "Two flight attendants", sentence: "In Picture A, two pilots are walking near the gate, but in Picture B, two flight attendants are standing there." },
              { label: "8. 🪴 Beside the bench", a: "Green potted plant", b: "Luggage trolley", sentence: "In Picture A, there is a potted plant next to the bench, while in Picture B, there is a luggage trolley." }
            ],
            followUp: {
              A: {
                q: "Do you prefer travelling by plane, by train, or by car? Why?",
                h: "I prefer travelling by plane for long trips because it is the fastest and most comfortable way to travel."
              },
              B: {
                q: "If you could fly to any country in the world tomorrow, where would you go and why?",
                h: "If I could fly anywhere tomorrow, I would go to Japan because I love Japanese culture, food, and technology."
              }
            }
          }
        },
        {
          id: 2,
          label: "#2 Feelings",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's the matter? Why do you look so upset?" },
              { label: "2. Ask reason", q: "Oh no, what happened to your laptop?" },
              { label: "3. Advice: Repair shop", q: "You should take your laptop to a computer repair shop immediately." },
              { label: "4. Advice: Borrow / Cloud", q: "And you can borrow my laptop tonight and save your files on Google Drive." }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Feeling: Homesick)",
            give: [
              { label: "1. Your Feeling", val: "🥺 Homesick & lonely", a: "I'm feeling quite homesick and lonely this week." },
              { label: "2. Your Reason 1", val: "🏠 Far from family", a: "Because I moved to the city for university and I miss my family a lot." },
              { label: "3. Your Reason 2", val: "🍲 Miss mother's food", a: "And I really miss my mother's home-cooked meals." },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "Thank you so much! I'll video call my parents tonight and join a student club." }
            ],
            followUp: {
              q: "Have you ever lived away from your family? What is the hardest thing about living away from home?",
              h: "Yes, I live in a dormitory now. The hardest thing is taking care of myself when I am sick and missing my family."
            }
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Feeling: Upset / Frustrated)",
            give: [
              { label: "1. Your Feeling", val: "😣 Upset & frustrated", a: "I'm feeling really upset and frustrated right now." },
              { label: "2. Your Reason 1", val: "💻 Laptop broke down", a: "Because my laptop suddenly broke down ten minutes ago." },
              { label: "3. Your Reason 2", val: "📄 Unsaved English essay", a: "And I haven't saved my English essay for tomorrow's class!" },
              { label: "4. Your Reaction", val: "🙏 Thank & agree to try", a: "You're so kind! Thanks for lending me your laptop, I'll take mine to the repair shop." }
            ],
            askTitle: "PART 2: ASK A ABOUT FEELING & GIVE ADVICE",
            ask: [
              { label: "1. Ask feeling", q: "What's wrong? Why are you looking so sad?" },
              { label: "2. Ask reason", q: "Why are you feeling homesick today?" },
              { label: "3. Advice: Video call", q: "You should video call your parents every evening to talk to them." },
              { label: "4. Advice: Join a club", q: "Why don't you join a university club to make new friends?" }
            ],
            followUp: {
              q: "How does technology (like smartphones and video calls) help students who live far from home?",
              h: "Smartphones and video calls help students see and talk to their parents every day for free, so they feel much closer to home."
            }
          }
        }
      ]
    }
  },

  // -------------------- FINAL REVIEW (ALL UNITS 1-12) --------------------
  "final": {
    title: "Final Speaking Test Review",
    subtitle: "All Units 1–12 • 4 Random Questions & Both Official Exam Tasks",
    icon: "🏆",
    unlocked: true,
    part1: [],
    part2: {
      taskName: "Spot the Differences (6 Sets) & What's the matter? (6 Sets)",
      scenarios: []
    }
  }
};

// Build Final Review Bank automatically from Units 1-12
(function initFinalBankA2() {
  const unitKeys = ["u12", "u34", "u56", "u78", "u910", "u1112"];
  let allQuestions = [];
  unitKeys.forEach(k => {
    DATA_A2[k].part1.forEach(item => {
      allQuestions.push({ ...item, unitTitle: DATA_A2[k].title });
    });
  });
  DATA_A2.final.allPart1 = allQuestions;

  const clone = obj => JSON.parse(JSON.stringify(obj));

  // Put Official Test Spec sample (Two Houses) first in Final Review Spot the Differences!
  const spotVariants = [
    clone(DATA_A2.u34.part2.scenarios[0]),
    clone(DATA_A2.u12.part2.scenarios[0]),
    clone(DATA_A2.u56.part2.scenarios[0]),
    clone(DATA_A2.u78.part2.scenarios[0]),
    clone(DATA_A2.u910.part2.scenarios[0]),
    clone(DATA_A2.u1112.part2.scenarios[0])
  ];

  // Put Official Test Spec sample (Sad vs Tired) first in Final Review What's the matter!
  const feelingVariants = [
    clone(DATA_A2.u12.part2.scenarios[1]),
    clone(DATA_A2.u34.part2.scenarios[1]),
    clone(DATA_A2.u56.part2.scenarios[1]),
    clone(DATA_A2.u78.part2.scenarios[1]),
    clone(DATA_A2.u910.part2.scenarios[1]),
    clone(DATA_A2.u1112.part2.scenarios[1])
  ];

  DATA_A2.final.part2.scenarios = [
    { label: "1. Spot Differences", variants: spotVariants },
    { label: "2. What's the matter?", variants: feelingVariants }
  ];
})();

window.LEVEL_DATA["A2"] = DATA_A2;
