// ==================== CEFR A1 DATA STORE (ENGLISH FILE BEGINNER UNITS 1-12) ====================
window.LEVEL_DATA = window.LEVEL_DATA || {};

const DATA_A1 = {
  // -------------------- UNITS 1 & 2 (Spec Task 1: Form p. 79 & 83) --------------------
  "u12": {
    title: "Units 1 & 2",
    subtitle: "Name • Country • Number",
    icon: "🪪",
    unlocked: true,
    part1: [
      { q: "What's your first name? How do you spell it?", h: "My first name is... It's [T-R-U-N-G].", kw: "first name" },
      { q: "What's your surname? How do you spell it?", h: "My surname is... It's [N-G-U-Y-E-N].", kw: "surname" },
      { q: "Where are you from? What nationality are you?", h: "I'm from Vietnam. I'm Vietnamese.", kw: "nationality" },
      { q: "What days are your English classes?", h: "They are on [Monday] and [Saturday].", kw: "English classes" },
      { q: "How old are you?", h: "I'm [19] years old.", kw: "years old" },
      { q: "Are you single or married?", h: "I'm single. / I'm married.", kw: "single, married" },
      { q: "What's your phone number?", h: "It's [090...]. (0 = oh / zero)", kw: "phone number" },
      { q: "What's your email address?", h: "It's [...@gmail.com]. (@ = at, . = dot)", kw: "email address" }
    ],
    part2: {
      taskName: "Interview & Complete a Form",
      scenarios: [
        {
          id: 1,
          label: "#1",
          A: {
            askFirst: true,
            askTitle: "PART 1: INTERVIEW B & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Chris (C-H-R-I-S)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Lennox (L-E-N-N-O-X)" },
              { label: "Nationality", q: "What nationality are you?", ans: "American" },
              { label: "Address", q: "What's your address?", ans: "81 West St, Bridport" },
              { label: "Postcode", q: "What's your postcode?", ans: "DT6 3NR" },
              { label: "Age", q: "How old are you?", ans: "31" },
              { label: "Marital status", q: "Are you single or married?", ans: "Married" },
              { label: "Home phone", q: "What's your home phone number?", ans: "01308 496 0841" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "07700 900029" },
              { label: "Email address", q: "What's your email address?", ans: "chris7155@uk.com" }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Hold for answer)",
            give: [
              { label: "First name", val: "Alex", a: "My first name is Alex. A-L-E-X." },
              { label: "Surname", val: "Barrett", a: "My surname is Barrett. B-A-R-R-E-T-T." },
              { label: "Nationality", val: "British", a: "I'm British." },
              { label: "Address", val: "15 Park Rd, York", a: "It's 15 Park Road, York." },
              { label: "Postcode", val: "YO6 4PX", a: "It's YO6 4PX." },
              { label: "Age", val: "25", a: "I'm 25 years old." },
              { label: "Marital status", val: "Single", a: "I'm single." },
              { label: "Home phone", val: "01904 496 0752", a: "It's 01904 496 0752." },
              { label: "Mobile phone", val: "07700 900528", a: "It's 07700 900528." },
              { label: "Email address", val: "abarrett65@uk.com", a: "It's abarrett65@uk.com." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Hold for answer)",
            give: [
              { label: "First name", val: "Chris", a: "My first name is Chris. C-H-R-I-S." },
              { label: "Surname", val: "Lennox", a: "My surname is Lennox. L-E-N-N-O-X." },
              { label: "Nationality", val: "American", a: "I'm American." },
              { label: "Address", val: "81 West St, Bridport", a: "It's 81 West Street, Bridport." },
              { label: "Postcode", val: "DT6 3NR", a: "It's DT6 3NR." },
              { label: "Age", val: "31", a: "I'm 31 years old." },
              { label: "Marital status", val: "Married", a: "I'm married." },
              { label: "Home phone", val: "01308 496 0841", a: "It's 01308 496 0841." },
              { label: "Mobile phone", val: "07700 900029", a: "It's 07700 900029." },
              { label: "Email address", val: "chris7155@uk.com", a: "It's chris7155@uk.com." }
            ],
            askTitle: "PART 2: INTERVIEW A & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Alex (A-L-E-X)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Barrett (B-A-R-R-E-T-T)" },
              { label: "Nationality", q: "What nationality are you?", ans: "British" },
              { label: "Address", q: "What's your address?", ans: "15 Park Rd, York" },
              { label: "Postcode", q: "What's your postcode?", ans: "YO6 4PX" },
              { label: "Age", q: "How old are you?", ans: "25" },
              { label: "Marital status", q: "Are you single or married?", ans: "Single" },
              { label: "Home phone", q: "What's your home phone number?", ans: "01904 496 0752" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "07700 900528" },
              { label: "Email address", q: "What's your email address?", ans: "abarrett65@uk.com" }
            ]
          }
        },
        {
          id: 2,
          label: "#2",
          A: {
            askFirst: true,
            askTitle: "PART 1: INTERVIEW B & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Jacek (J-A-C-E-K)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Gorski (G-O-R-S-K-I)" },
              { label: "Nationality", q: "What nationality are you?", ans: "Polish" },
              { label: "Address", q: "What's your address?", ans: "19 Market St, Krakow" },
              { label: "Postcode", q: "What's your postcode?", ans: "KR 31042" },
              { label: "Age", q: "How old are you?", ans: "40" },
              { label: "Marital status", q: "Are you single or married?", ans: "Married" },
              { label: "Home phone", q: "What's your home phone number?", ans: "012 442 8810" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "012 3456 7890" },
              { label: "Email address", q: "What's your email address?", ans: "jgorski@pl.com" }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Hold for answer)",
            give: [
              { label: "First name", val: "Bianca", a: "My first name is Bianca. B-I-A-N-C-A." },
              { label: "Surname", val: "Costa", a: "My surname is Costa. C-O-S-T-A." },
              { label: "Nationality", val: "Brazilian", a: "I'm Brazilian." },
              { label: "Address", val: "42 Ocean Ave, Rio", a: "It's 42 Ocean Avenue, Rio." },
              { label: "Postcode", val: "RJ 22070", a: "It's RJ 22070." },
              { label: "Age", val: "20", a: "I'm 20 years old." },
              { label: "Marital status", val: "Single", a: "I'm single." },
              { label: "Home phone", val: "021 334 5501", a: "It's 021 334 5501." },
              { label: "Mobile phone", val: "021 9876 5432", a: "It's 021 9876 5432." },
              { label: "Email address", val: "bianca@brmail.com", a: "It's bianca@brmail.com." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Hold for answer)",
            give: [
              { label: "First name", val: "Jacek", a: "My first name is Jacek. J-A-C-E-K." },
              { label: "Surname", val: "Gorski", a: "My surname is Gorski. G-O-R-S-K-I." },
              { label: "Nationality", val: "Polish", a: "I'm Polish." },
              { label: "Address", val: "19 Market St, Krakow", a: "It's 19 Market Street, Krakow." },
              { label: "Postcode", val: "KR 31042", a: "It's KR 31042." },
              { label: "Age", val: "40", a: "I'm 40 years old." },
              { label: "Marital status", val: "Married", a: "I'm married." },
              { label: "Home phone", val: "012 442 8810", a: "It's 012 442 8810." },
              { label: "Mobile phone", val: "012 3456 7890", a: "It's 012 3456 7890." },
              { label: "Email address", val: "jgorski@pl.com", a: "It's jgorski@pl.com." }
            ],
            askTitle: "PART 2: INTERVIEW A & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Bianca (B-I-A-N-C-A)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Costa (C-O-S-T-A)" },
              { label: "Nationality", q: "What nationality are you?", ans: "Brazilian" },
              { label: "Address", q: "What's your address?", ans: "42 Ocean Ave, Rio" },
              { label: "Postcode", q: "What's your postcode?", ans: "RJ 22070" },
              { label: "Age", q: "How old are you?", ans: "20" },
              { label: "Marital status", q: "Are you single or married?", ans: "Single" },
              { label: "Home phone", q: "What's your home phone number?", ans: "021 334 5501" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "021 9876 5432" },
              { label: "Email address", q: "What's your email address?", ans: "bianca@brmail.com" }
            ]
          }
        },
        {
          id: 3,
          label: "#3",
          A: {
            askFirst: true,
            askTitle: "PART 1: INTERVIEW B & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Celine (C-E-L-I-N-E)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Dubois (D-U-B-O-I-S)" },
              { label: "Nationality", q: "What nationality are you?", ans: "French" },
              { label: "Address", q: "What's your address?", ans: "57 King St, Paris" },
              { label: "Postcode", q: "What's your postcode?", ans: "PR 75008" },
              { label: "Age", q: "How old are you?", ans: "22" },
              { label: "Marital status", q: "Are you single or married?", ans: "Single" },
              { label: "Home phone", q: "What's your home phone number?", ans: "014 268 5500" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "020 7946 0415" },
              { label: "Email address", q: "What's your email address?", ans: "celine@fr.com" }
            ],
            giveTitle: "PART 2: YOU — ANSWER B (Hold for answer)",
            give: [
              { label: "First name", val: "Mateo", a: "My first name is Mateo. M-A-T-E-O." },
              { label: "Surname", val: "Garcia", a: "My surname is Garcia. G-A-R-C-I-A." },
              { label: "Nationality", val: "Mexican", a: "I'm Mexican." },
              { label: "Address", val: "304 High St, Monterrey", a: "It's 304 High Street, Monterrey." },
              { label: "Postcode", val: "MT 64000", a: "It's MT 64000." },
              { label: "Age", val: "19", a: "I'm 19 years old." },
              { label: "Marital status", val: "Single", a: "I'm single." },
              { label: "Home phone", val: "081 224 9001", a: "It's 081 224 9001." },
              { label: "Mobile phone", val: "081 8150 9304", a: "It's 081 8150 9304." },
              { label: "Email address", val: "mateo@mx.com", a: "It's mateo@mx.com." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU — ANSWER A (Hold for answer)",
            give: [
              { label: "First name", val: "Celine", a: "My first name is Celine. C-E-L-I-N-E." },
              { label: "Surname", val: "Dubois", a: "My surname is Dubois. D-U-B-O-I-S." },
              { label: "Nationality", val: "French", a: "I'm French." },
              { label: "Address", val: "57 King St, Paris", a: "It's 57 King Street, Paris." },
              { label: "Postcode", val: "PR 75008", a: "It's PR 75008." },
              { label: "Age", val: "22", a: "I'm 22 years old." },
              { label: "Marital status", val: "Single", a: "I'm single." },
              { label: "Home phone", val: "014 268 5500", a: "It's 014 268 5500." },
              { label: "Mobile phone", val: "020 7946 0415", a: "It's 020 7946 0415." },
              { label: "Email address", val: "celine@fr.com", a: "It's celine@fr.com." }
            ],
            askTitle: "PART 2: INTERVIEW A & FILL FORM (Hold for question)",
            ask: [
              { label: "First name", q: "What's your first name? How do you spell it?", ans: "Mateo (M-A-T-E-O)" },
              { label: "Surname", q: "What's your surname? How do you spell it?", ans: "Garcia (G-A-R-C-I-A)" },
              { label: "Nationality", q: "What nationality are you?", ans: "Mexican" },
              { label: "Address", q: "What's your address?", ans: "304 High St, Monterrey" },
              { label: "Postcode", q: "What's your postcode?", ans: "MT 64000" },
              { label: "Age", q: "How old are you?", ans: "19" },
              { label: "Marital status", q: "Are you single or married?", ans: "Single" },
              { label: "Home phone", q: "What's your home phone number?", ans: "081 224 9001" },
              { label: "Mobile phone", q: "What's your mobile number?", ans: "081 8150 9304" },
              { label: "Email address", q: "What's your email address?", ans: "mateo@mx.com" }
            ]
          }
        }
      ]
    }
  },

  // -------------------- UNITS 3 & 4 (Spec Task 2: Buying Lunch p. 22-23 & Souvenirs p. 79/83) --------------------
  "u34": {
    title: "Units 3 & 4",
    subtitle: "Things • Prices • Family",
    icon: "🛍️",
    unlocked: true,
    part1: [
      { q: "What do you have in your bag today?", h: "In my bag, I have a phone, keys, and a pen.", kw: "in your bag" },
      { q: "What are typical souvenirs in your country?", h: "Typical souvenirs are key rings, caps, and T-shirts.", kw: "souvenirs" },
      { q: "How much is a cup of coffee in your city?", h: "It's about [25,000 VND / $1.50].", kw: "cup of coffee" },
      { q: "Do you have a big or a small family?", h: "I have a [small] family. There are [4] people.", kw: "family" },
      { q: "Do you have any brothers or sisters?", h: "Yes, I have a [sister]. / No, I don't.", kw: "brothers, sisters" },
      { q: "What is your mother's or father's name?", h: "My mother's name is... / My father's name is...", kw: "mother, father" },
      { q: "What colour is your motorbike or car? Is it fast or slow?", h: "It's [black]. It's [fast].", kw: "colour, motorbike" },
      { q: "Do you prefer big cities or small cities?", h: "I prefer [big cities] because they're exciting.", kw: "prefer, cities" }
    ],
    part2: {
      taskName: "Buying Lunch (Ask Prices → Order)",
      scenarios: [
        {
          id: 1,
          label: "#1 Three Kings Pub",
          A: {
            askFirst: false,
            giveTitle: "STEP 1: FULL MENU — ANSWER B'S PRICES FIRST",
            give: [
              { label: "Three Kings Burger", val: "£7.99", a: "It's £7.99." },
              { label: "Pies (steak / chicken)", val: "£9.20", a: "It's £9.20." },
              { label: "Sandwiches (cheese / tuna)", val: "£4.15", a: "It's £4.15." },
              { label: "Salad (chicken / egg)", val: "£5.99", a: "It's £5.99." },
              { label: "Mineral water", val: "£1.90", a: "It's £1.90." },
              { label: "Orange juice", val: "£2.80", a: "It's £2.80." },
              { label: "Coke / Diet Coke", val: "£2.60", a: "It's £2.60." },
              { label: "Beer", val: "£3.25", a: "It's £3.25." },
              { label: "Coffee / Tea", val: "£1.95", a: "It's £1.95." }
            ],
            askTitle: "STEP 2: SERVE STUDENT B (Hold step for question)",
            ask: [
              { label: "1. Ask food order", q: "Who's next? Can I help you?", ans: "B orders 1 food" },
              { label: "2. Ask drink order", q: "Anything else?", ans: "B orders 1 drink" },
              { label: "3. Offer ice/lemon", q: "Ice and lemon?", ans: "Yes, please / No, thanks" },
              { label: "4. Give food & total", q: "There you go. It's [£...]. — Thanks. Here's your change.", ans: "Food + Drink (£)" }
            ]
          },
          B: {
            askFirst: true,
            askTitle: "STEP 1: TORN MENU — ASK PRICES FIRST (Hold item)",
            ask: [
              { label: "Three Kings Burger", q: "How much is a Three Kings burger?", ans: "£7.99" },
              { label: "Steak / Chicken Pie", q: "How much is a chicken pie?", ans: "£9.20" },
              { label: "Cheese / Tuna Sandwich", q: "How much is a cheese sandwich?", ans: "£4.15" },
              { label: "Chicken / Egg Salad", q: "How much is a chicken salad?", ans: "£5.99" },
              { label: "Mineral water", q: "How much is a mineral water?", ans: "£1.90" },
              { label: "Orange juice", q: "How much is an orange juice?", ans: "£2.80" },
              { label: "Coke / Diet Coke", q: "How much is a Coke?", ans: "£2.60" },
              { label: "Beer", q: "How much is a beer?", ans: "£3.25" },
              { label: "Coffee / Tea", q: "How much is a coffee or tea?", ans: "£1.95" }
            ],
            giveTitle: "STEP 2: ORDER LUNCH & PAY (Hold step for sentence)",
            give: [
              { label: "1. Order 1 Food", val: "Choose 1 food item", a: "Can I have a cheese sandwich, please?" },
              { label: "2. Order 1 Drink", val: "Choose 1 drink item", a: "And a Coke, please." },
              { label: "3. Ice & lemon?", val: "Answer Barman", a: "No, thanks. / Yes, please." },
              { label: "4. Ask total & Pay", val: "Ask total & give money", a: "Thanks. How much is it? — Here you are." }
            ]
          }
        },
        {
          id: 2,
          label: "#2 NY Deli ($)",
          A: {
            askFirst: true,
            askTitle: "STEP 1: TORN MENU — ASK PRICES FIRST (Hold item)",
            ask: [
              { label: "Croissant", q: "How much is a croissant?", ans: "$3.50" },
              { label: "Cheese Toast", q: "How much is a cheese toast?", ans: "$6.25" },
              { label: "Egg Salad", q: "How much is an egg salad?", ans: "$7.50" },
              { label: "Pizza Slice", q: "How much is a pizza slice?", ans: "$4.99" },
              { label: "Espresso", q: "How much is an espresso?", ans: "$2.75" },
              { label: "Green Tea", q: "How much is a green tea?", ans: "$2.50" },
              { label: "Orange Juice", q: "How much is an orange juice?", ans: "$4.20" },
              { label: "Diet Coke", q: "How much is a Diet Coke?", ans: "$2.60" }
            ],
            giveTitle: "STEP 2: ORDER LUNCH & PAY (Hold step for sentence)",
            give: [
              { label: "1. Order 1 Food", val: "Choose 1 food item", a: "Can I have a croissant, please?" },
              { label: "2. Order 1 Drink", val: "Choose 1 drink item", a: "And an espresso, please." },
              { label: "3. Ice?", val: "Answer Server", a: "No, thanks. / Yes, please." },
              { label: "4. Ask total & Pay", val: "Ask total & give money", a: "Thanks. How much is it? — Here you are." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "STEP 1: FULL MENU — ANSWER A'S PRICES FIRST",
            give: [
              { label: "Croissant", val: "$3.50", a: "It's $3.50." },
              { label: "Cheese Toast", val: "$6.25", a: "It's $6.25." },
              { label: "Egg Salad", val: "$7.50", a: "It's $7.50." },
              { label: "Pizza Slice", val: "$4.99", a: "It's $4.99." },
              { label: "Espresso", val: "$2.75", a: "It's $2.75." },
              { label: "Green Tea", val: "$2.50", a: "It's $2.50." },
              { label: "Orange Juice", val: "$4.20", a: "It's $4.20." },
              { label: "Diet Coke", val: "$2.60", a: "It's $2.60." }
            ],
            askTitle: "STEP 2: SERVE STUDENT A (Hold step for question)",
            ask: [
              { label: "1. Ask food order", q: "Who's next? Can I help you?", ans: "A orders 1 food" },
              { label: "2. Ask drink order", q: "Anything else?", ans: "A orders 1 drink" },
              { label: "3. Offer ice", q: "Would you like ice?", ans: "Yes, please / No, thanks" },
              { label: "4. Give food & total", q: "There you go. It's [$...]. — Thanks. Here's your change.", ans: "Food + Drink ($)" }
            ]
          }
        },
        {
          id: 3,
          label: "#3 Souvenirs (3B)",
          A: {
            askFirst: true,
            askTitle: "PART 1: YOU ARE CUSTOMER — ASK B PRICES FIRST",
            ask: [
              { label: "Hats (those)", q: "Excuse me. How much are those hats?", ans: "£30" },
              { label: "T-shirt (that)", q: "How much is that T-shirt?", ans: "£17" },
              { label: "Teddy (this)", q: "How much is this teddy?", ans: "£9" },
              { label: "Mug (this)", q: "How much is this mug?", ans: "£13" }
            ],
            giveTitle: "PART 2: YOU ARE SELLER — ANSWER B'S QUESTIONS",
            give: [
              { label: "Watches (these)", val: "£15", a: "They're £15." },
              { label: "Umbrella (that)", val: "£20", a: "It's £20." },
              { label: "Scarf (this)", val: "£12", a: "It's £12." },
              { label: "Key rings (these)", val: "£11", a: "They're £11." },
              { label: "Bag (that)", val: "£22", a: "It's £22." },
              { label: "Football shirt (that)", val: "£45", a: "It's £45." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOU ARE SELLER — ANSWER A'S QUESTIONS",
            give: [
              { label: "Hats (those)", val: "£30", a: "They're £30." },
              { label: "T-shirt (that)", val: "£17", a: "It's £17." },
              { label: "Teddy (this)", val: "£9", a: "It's £9." },
              { label: "Mug (this)", val: "£13", a: "It's £13." }
            ],
            askTitle: "PART 2: YOU ARE CUSTOMER — ASK A PRICES",
            ask: [
              { label: "Watches (these)", q: "Excuse me. How much are these watches?", ans: "£15" },
              { label: "Umbrella (that)", q: "How much is that umbrella?", ans: "£20" },
              { label: "Scarf (this)", q: "How much is this scarf?", ans: "£12" },
              { label: "Key rings (these)", q: "How much are these key rings?", ans: "£11" },
              { label: "Bag (that)", q: "How much is that bag?", ans: "£22" },
              { label: "Football shirt (that)", q: "How much is that football shirt?", ans: "£45" }
            ]
          }
        }
      ]
    }
  },

  // -------------------- UNITS 5 & 6 (Spec Task 3: Telling the Time) --------------------
  "u56": {
    title: "Units 5 & 6",
    subtitle: "Food • Jobs • Time",
    icon: "⏰",
    unlocked: true,
    part1: [
      { q: "What do you usually have for breakfast?", h: "I usually have [bread and eggs] for breakfast.", kw: "breakfast" },
      { q: "Where do you usually have lunch?", h: "I usually have lunch [at home / at a café].", kw: "lunch" },
      { q: "Do you drink a lot of coffee or tea?", h: "Yes, I drink coffee every day. / No, I prefer water.", kw: "coffee, tea" },
      { q: "Do you live in a house or a flat?", h: "I live in a [house / small flat].", kw: "house, flat" },
      { q: "What do you do? Where do you study or work?", h: "I'm a student. I study at university.", kw: "study, work" },
      { q: "What does your father or mother do?", h: "He / She is a [teacher / doctor / worker].", kw: "teacher, doctor" },
      { q: "What time do you usually get up in the morning?", h: "I usually get up at [6:30 / half past six].", kw: "get up" },
      { q: "What time do you usually go to bed at night?", h: "I usually go to bed at [11:00 / eleven o'clock].", kw: "go to bed" }
    ],
    part2: {
      taskName: "Telling the Time & Routine",
      scenarios: [
        {
          id: 1,
          label: "#1 School Day",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK STUDENT B (Hold for question)",
            ask: [
              { label: "Have breakfast", q: "What time do you have breakfast?", ans: "8:00 a.m." },
              { label: "Go to school", q: "What time do you go to school?", ans: "8:30 a.m." },
              { label: "Have lunch", q: "What time do you have lunch?", ans: "12:00 p.m." },
              { label: "Go home", q: "What time do you go home?", ans: "5:00 p.m." }
            ],
            giveTitle: "PART 2: ANSWER STUDENT B (Hold for answer)",
            give: [
              { label: "Do homework", val: "🕖 7:00 p.m.", a: "I do homework at seven o'clock." },
              { label: "Watch TV", val: "🕗 8:00 p.m.", a: "I watch TV at eight o'clock." },
              { label: "Go to bed", val: "🕙 10:00 p.m.", a: "I go to bed at ten o'clock." },
              { label: "Read a book", val: "🕘 9:00 p.m.", a: "I read a book at nine o'clock." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: ANSWER STUDENT A (Hold for answer)",
            give: [
              { label: "Have breakfast", val: "🕗 8:00 a.m.", a: "I have breakfast at eight o'clock." },
              { label: "Go to school", val: "🕣 8:30 a.m.", a: "I go to school at half past eight." },
              { label: "Have lunch", val: "🕛 12:00 p.m.", a: "I have lunch at twelve o'clock." },
              { label: "Go home", val: "🕔 5:00 p.m.", a: "I go home at five o'clock." }
            ],
            askTitle: "PART 2: ASK STUDENT A (Hold for question)",
            ask: [
              { label: "Do homework", q: "What time do you do homework?", ans: "7:00 p.m." },
              { label: "Watch TV", q: "What time do you watch TV?", ans: "8:00 p.m." },
              { label: "Go to bed", q: "What time do you go to bed?", ans: "10:00 p.m." },
              { label: "Read a book", q: "What time do you read a book?", ans: "9:00 p.m." }
            ]
          }
        },
        {
          id: 2,
          label: "#2 Workday",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK STUDENT B (Hold for question)",
            ask: [
              { label: "Have a coffee", q: "What time do you have a coffee?", ans: "10:15 a.m." },
              { label: "Go to the gym", q: "What time do you go to the gym?", ans: "6:15 p.m." },
              { label: "Make dinner", q: "What time do you make dinner?", ans: "7:30 p.m." },
              { label: "Go to sleep", q: "What time do you go to sleep?", ans: "11:00 p.m." }
            ],
            giveTitle: "PART 2: ANSWER STUDENT B (Hold for answer)",
            give: [
              { label: "Get up", val: "🕡 6:30 a.m.", a: "I get up at half past six." },
              { label: "Have a shower", val: "🕖 6:45 a.m.", a: "I have a shower at quarter to seven." },
              { label: "Start work", val: "🕘 9:00 a.m.", a: "I start work at nine o'clock." },
              { label: "Finish work", val: "🕠 5:30 p.m.", a: "I finish work at half past five." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: ANSWER STUDENT A (Hold for answer)",
            give: [
              { label: "Have a coffee", val: "🕙 10:15 a.m.", a: "I have a coffee at quarter past ten." },
              { label: "Go to the gym", val: "🕕 6:15 p.m.", a: "I go to the gym at quarter past six." },
              { label: "Make dinner", val: "🕢 7:30 p.m.", a: "I make dinner at half past seven." },
              { label: "Go to sleep", val: "🕚 11:00 p.m.", a: "I go to sleep at eleven o'clock." }
            ],
            askTitle: "PART 2: ASK STUDENT A (Hold for question)",
            ask: [
              { label: "Get up", q: "What time do you get up?", ans: "6:30 a.m." },
              { label: "Have a shower", q: "What time do you have a shower?", ans: "6:45 a.m." },
              { label: "Start work", q: "What time do you start work?", ans: "9:00 a.m." },
              { label: "Finish work", q: "What time do you finish work?", ans: "5:30 p.m." }
            ]
          }
        },
        {
          id: 3,
          label: "#3 Weekend",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK STUDENT B (Hold for question)",
            ask: [
              { label: "Get up (Sunday)", q: "What time do you get up on Sunday?", ans: "9:00 a.m." },
              { label: "Go shopping", q: "What time do you go shopping?", ans: "10:30 a.m." },
              { label: "Meet friends", q: "What time do you meet your friends?", ans: "3:15 p.m." },
              { label: "Have dinner", q: "What time do you have dinner?", ans: "7:45 p.m." }
            ],
            giveTitle: "PART 2: ANSWER STUDENT B (Hold for answer)",
            give: [
              { label: "Do housework", val: "🕤 9:30 a.m.", a: "I do housework at half past nine." },
              { label: "Play football", val: "🕓 4:00 p.m.", a: "I play football at four o'clock." },
              { label: "Watch a film", val: "🕣 8:30 p.m.", a: "I watch a film at half past eight." },
              { label: "Go to bed", val: "🕦 11:30 p.m.", a: "I go to bed at half past eleven." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: ANSWER STUDENT A (Hold for answer)",
            give: [
              { label: "Get up (Sunday)", val: "🕘 9:00 a.m.", a: "I get up at nine o'clock on Sunday." },
              { label: "Go shopping", val: "🕥 10:30 a.m.", a: "I go shopping at half past ten." },
              { label: "Meet friends", val: "🕒 3:15 p.m.", a: "I meet my friends at quarter past three." },
              { label: "Have dinner", val: "🕗 7:45 p.m.", a: "I have dinner at quarter to eight." }
            ],
            askTitle: "PART 2: ASK STUDENT A (Hold for question)",
            ask: [
              { label: "Do housework", q: "What time do you do housework?", ans: "9:30 a.m." },
              { label: "Play football", q: "What time do you play football?", ans: "4:00 p.m." },
              { label: "Watch a film", q: "What time do you watch a film?", ans: "8:30 p.m." },
              { label: "Go to bed", q: "What time do you go to bed?", ans: "11:30 p.m." }
            ]
          }
        }
      ]
    }
  },

  // -------------------- UNITS 7 & 8 (Spec Task 4: Dates & Task 5: Places) --------------------
  "u78": {
    title: "Units 7 & 8",
    subtitle: "Dates • Places • Can",
    icon: "📅",
    unlocked: true,
    part1: [
      { q: "What do you usually do at the weekend?", h: "At the weekend, I usually [meet friends and relax].", kw: "weekend" },
      { q: "Do you do sport or exercise at the weekend?", h: "Yes, I [play football / go to the gym]. / No, I don't.", kw: "sport, exercise" },
      { q: "What kinds of film do you like?", h: "I like [action films and comedies].", kw: "action films, comedies" },
      { q: "When is your birthday?", h: "My birthday is on the [15th of August].", kw: "birthday" },
      { q: "In your country, at what age can you get a driving licence?", h: "In my country, you can get a driving licence at [18].", kw: "driving licence" },
      { q: "Can you swim or play a musical instrument?", h: "Yes, I can swim, but I can't play the piano.", kw: "musical instrument" },
      { q: "Do you like reading books?", h: "Yes, I love reading books. / No, I prefer watching films.", kw: "reading books" },
      { q: "What activities do you like doing with your friends?", h: "I like [going shopping and drinking coffee] with my friends.", kw: "activities, friends" }
    ],
    part2: {
      taskName: "Dates (Task 4) & Places (Task 5)",
      scenarios: [
        {
          id: 1,
          label: "#1 Dates",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT DATES (Hold for question)",
            ask: [
              { label: "New Year's Day", q: "When is New Year's Day?", ans: "January 1" },
              { label: "Valentine's Day", q: "When is Valentine's Day?", ans: "February 14" },
              { label: "Women's Day", q: "When is International Women's Day?", ans: "March 8" },
              { label: "Christmas Day", q: "When is Christmas Day?", ans: "December 25" }
            ],
            giveTitle: "PART 2: ANSWER B ABOUT DATES (Hold for answer)",
            give: [
              { label: "Your birthday", val: "May 15", a: "My birthday is on the fifteenth of May." },
              { label: "Teachers' Day", val: "November 20", a: "It's on the twentieth of November." },
              { label: "Independence Day", val: "September 2", a: "It's on the second of September." },
              { label: "Children's Day", val: "June 1", a: "It's on the first of June." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: ANSWER A ABOUT DATES (Hold for answer)",
            give: [
              { label: "New Year's Day", val: "January 1", a: "It's on the first of January." },
              { label: "Valentine's Day", val: "February 14", a: "It's on the fourteenth of February." },
              { label: "Women's Day", val: "March 8", a: "It's on the eighth of March." },
              { label: "Christmas Day", val: "December 25", a: "It's on the twenty-fifth of December." }
            ],
            askTitle: "PART 2: ASK A ABOUT DATES (Hold for question)",
            ask: [
              { label: "Partner's birthday", q: "When is your birthday?", ans: "May 15" },
              { label: "Teachers' Day", q: "When is Vietnamese Teachers' Day?", ans: "November 20" },
              { label: "Independence Day", q: "When is Independence Day?", ans: "September 2" },
              { label: "Children's Day", q: "When is Children's Day?", ans: "June 1" }
            ]
          }
        },
        {
          id: 2,
          label: "#2 HCMC Place",
          A: {
            askFirst: true,
            askTitle: "PART A: ASK STUDENT B ABOUT HCMC (Hold item)",
            ask: [
              { label: "Buy souvenirs", q: "Where can I buy souvenirs?", ans: "Ben Thanh Market" },
              { label: "Watch sports", q: "Where can I watch sports?", ans: "A sports centre" },
              { label: "Shop on Sundays", q: "Can I go shopping on Sundays?", ans: "Yes, you can." },
              { label: "Have lunch", q: "Where can I have lunch?", ans: "A food court" }
            ],
            giveTitle: "PART B: ANSWER STUDENT B ABOUT HCMC (Hold item)",
            give: [
              { label: "Visit a museum", val: "War Remnants Museum", a: "You can visit the War Remnants Museum." },
              { label: "Go swimming", val: "A public swimming pool", a: "You can go swimming at a public swimming pool." },
              { label: "Buy cheap clothes", val: "Ben Thanh Market", a: "You can buy cheap clothes at Ben Thanh Market." },
              { label: "Have coffee", val: "A café near city centre", a: "You can have coffee at a café near the city centre." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART A: ANSWER STUDENT A ABOUT HCMC (Hold item)",
            give: [
              { label: "Buy souvenirs", val: "Ben Thanh Market", a: "You can buy souvenirs at Ben Thanh Market." },
              { label: "Watch sports", val: "A sports centre", a: "You can watch sports at a sports centre." },
              { label: "Shop on Sundays", val: "Yes", a: "Yes, you can go shopping on Sundays." },
              { label: "Have lunch", val: "A food court", a: "You can have lunch at a food court." }
            ],
            askTitle: "PART B: ASK STUDENT A ABOUT HCMC (Hold item)",
            ask: [
              { label: "Visit a museum", q: "Where can I visit a museum?", ans: "War Remnants Museum" },
              { label: "Go swimming", q: "Where can I go swimming?", ans: "Public swimming pool" },
              { label: "Buy cheap clothes", q: "Where can I buy cheap clothes?", ans: "Ben Thanh Market" },
              { label: "Have coffee", q: "Where can I have coffee?", ans: "Café near city centre" }
            ]
          }
        },
        {
          id: 3,
          label: "#3 Town Place",
          A: {
            askFirst: true,
            askTitle: "PART A: ASK B ABOUT THIS TOWN (Hold item)",
            ask: [
              { label: "Cheap meal", q: "Where can I have a good, cheap meal?", ans: "Street market" },
              { label: "Films in English", q: "Where can I see films in English?", ans: "City Cinema" },
              { label: "Go in evening", q: "Where can I go in the evening?", ans: "Pubs & cafés" },
              { label: "Park in centre", q: "Can I park in the town centre?", ans: "No, you can't." }
            ],
            giveTitle: "PART B: ANSWER B ABOUT THIS TOWN (Hold item)",
            give: [
              { label: "Go for a walk", val: "River Park", a: "You can go for a nice walk in River Park." },
              { label: "Eat good food", val: "Old Town restaurants", a: "You can eat good food in the Old Town." },
              { label: "Pay by card", val: "No (Small shops: cash)", a: "No, you can't pay by card in all shops." },
              { label: "Shop on Sundays", val: "Yes (11 a.m. - 6 p.m.)", a: "Yes, you can go shopping on Sundays." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART A: ANSWER A ABOUT THIS TOWN (Hold item)",
            give: [
              { label: "Cheap meal", val: "The street market", a: "You can have a cheap meal at the street market." },
              { label: "Films in English", val: "City Cinema", a: "You can see films in English at City Cinema." },
              { label: "Go in evening", val: "Pubs & cafés by river", a: "You can go to pubs and cafés by the river." },
              { label: "Park in centre", val: "No (No parking)", a: "No, you can't park in the town centre." }
            ],
            askTitle: "PART B: ASK A ABOUT THIS TOWN (Hold item)",
            ask: [
              { label: "Go for a walk", q: "Where can I go for a nice walk?", ans: "River Park" },
              { label: "Eat good food", q: "Where can I eat really good food?", ans: "Old Town" },
              { label: "Pay by card", q: "Can I pay by card in all shops?", ans: "No, you can't." },
              { label: "Shop on Sundays", q: "Can I go shopping on Sundays?", ans: "Yes, you can." }
            ]
          }
        }
      ]
    }
  },

  // -------------------- UNITS 9 & 10 (Spec Task 6: Room Objects 10A p. 81 & 85) --------------------
  "u910": {
    title: "Units 9 & 10",
    subtitle: "Clothes • Hotel • Was/Were",
    icon: "🏨",
    unlocked: true,
    part1: [
      { q: "What are you doing right now?", h: "I'm speaking English. I'm not playing games.", kw: "right now" },
      { q: "What are you wearing today?", h: "I'm wearing [a shirt and jeans]. I'm not wearing [a jacket].", kw: "wearing" },
      { q: "What clothes do you usually wear at the weekend?", h: "At the weekend, I usually wear [a T-shirt]. I don't wear [a suit].", kw: "clothes" },
      { q: "Would you like to visit another country?", h: "Yes, I'd love to visit [Japan]. / No, I wouldn't.", kw: "another country" },
      { q: "What is there in your bedroom?", h: "There's a [bed and a desk], but there isn't a [TV].", kw: "bedroom" },
      { q: "Is there a lift or a swimming pool in your university?", h: "There's a lift, but there isn't a swimming pool.", kw: "lift, swimming pool" },
      { q: "Where were you yesterday at 7:00 p.m.? Were you at school?", h: "No, I wasn't at school. I was [at home].", kw: "yesterday" },
      { q: "Where were you last Saturday night? Were you at home?", h: "No, I wasn't at home. I was [in a café with friends].", kw: "last Saturday" }
    ],
    part2: {
      taskName: "Room Objects (+ / − There is & There are)",
      scenarios: [
        {
          id: 1,
          label: "#1 Spec Room",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT THEIR ROOM (Hold item)",
            ask: [
              { label: "🛋️ A sofa", q: "Is there a sofa in the room? Where is it?", ans: "✓ Opposite the TV" },
              { label: "📚 A bookshelf", q: "Is there a bookshelf? Where is it?", ans: "✗ No, there isn't" },
              { label: "💡 A lamp", q: "Is there a lamp in the room? Where is it?", ans: "✓ On the small table" },
              { label: "🪞 A mirror", q: "Is there a mirror? Where is it?", ans: "✓ On the wall" },
              { label: "🪑 Any chairs", q: "Are there any chairs? Where are they?", ans: "✓ Next to the table" },
              { label: "🪴 Any plants", q: "Are there any plants in the room?", ans: "✗ No, there aren't" }
            ],
            giveTitle: "PART 2: PICTURE OF YOUR ROOM (Answer B: + / −)",
            give: [
              { label: "🛏️ A bed", val: "✓ Next to window", a: "Yes, there is. It's next to the window." },
              { label: "🪑 A desk", val: "✓ Under window", a: "Yes, there is. It's under the window." },
              { label: "🚪 A wardrobe", val: "✗ No wardrobe", a: "No, there isn't a wardrobe in the room." },
              { label: "📺 A TV", val: "✓ On the desk", a: "Yes, there is. It's on the desk." },
              { label: "🖼️ Pictures", val: "✗ No pictures", a: "No, there aren't any pictures on the wall." },
              { label: "🪟 Windows", val: "✓ Behind the bed", a: "Yes, there are. They're behind the bed." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: PICTURE OF YOUR ROOM (Answer A: + / −)",
            give: [
              { label: "🛋️ A sofa", val: "✓ Opposite the TV", a: "Yes, there is. It's opposite the TV." },
              { label: "📚 A bookshelf", val: "✗ No bookshelf", a: "No, there isn't a bookshelf in the room." },
              { label: "💡 A lamp", val: "✓ On small table", a: "Yes, there is. It's on the small table." },
              { label: "🪞 A mirror", val: "✓ On the wall", a: "Yes, there is. It's on the wall." },
              { label: "🪑 Chairs", val: "✓ Next to table", a: "Yes, there are. They're next to the table." },
              { label: "🪴 Plants", val: "✗ No plants", a: "No, there aren't any plants in the room." }
            ],
            askTitle: "PART 2: ASK A ABOUT THEIR ROOM (Hold item)",
            ask: [
              { label: "🛏️ A bed", q: "Is there a bed in the room? Where is it?", ans: "✓ Next to window" },
              { label: "🪑 A desk", q: "Is there a desk? Where is it?", ans: "✓ Under window" },
              { label: "🚪 A wardrobe", q: "Is there a wardrobe in the room?", ans: "✗ No, there isn't" },
              { label: "📺 A TV", q: "Is there a TV in the room? Where is it?", ans: "✓ On the desk" },
              { label: "🖼️ Any pictures", q: "Are there any pictures on the wall?", ans: "✗ No, there aren't" },
              { label: "🪟 Any windows", q: "Are there any windows? Where are they?", ans: "✓ Behind the bed" }
            ]
          }
        },
        {
          id: 2,
          label: "#2 Hotel 10A",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT ROOM 1 (Hold for question)",
            ask: [
              { label: "🧥 A coat", q: "Is there a coat? Where is it?", ans: "✓ On the chair" },
              { label: "🔑 Any keys", q: "Are there any keys? Where are they?", ans: "✓ On the desk" },
              { label: "🧳 A suitcase", q: "Is there a suitcase? Where is it?", ans: "✓ Under the bed" },
              { label: "💻 A laptop", q: "Is there a laptop in the room?", ans: "✗ No, there isn't" },
              { label: "🥤 Any Cokes", q: "Are there any Cokes in the room?", ans: "✗ No, there aren't" },
              { label: "📰 A newspaper", q: "Is there a newspaper? Where is it?", ans: "✓ In the bag" }
            ],
            giveTitle: "PART 2: YOUR ROOM 2 PICTURE (Answer B: + / −)",
            give: [
              { label: "💻 A laptop", val: "✓ On the bed", a: "Yes, there is. It's on the bed." },
              { label: "🧺 Towels", val: "✓ On the floor", a: "Yes, there are. They're on the floor." },
              { label: "📚 Books", val: "✗ No books", a: "No, there aren't any books in the room." },
              { label: "📱 Remote control", val: "✓ On the table", a: "Yes, there is. It's on the table." },
              { label: "⏰ A clock", val: "✗ No clock", a: "No, there isn't a clock in the room." },
              { label: "🛏️ Extra pillows", val: "✓ On wardrobe", a: "Yes, there are. They're on the wardrobe." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: YOUR ROOM 1 PICTURE (Answer A: + / −)",
            give: [
              { label: "🧥 A coat", val: "✓ On the chair", a: "Yes, there is. It's on the chair." },
              { label: "🔑 Keys", val: "✓ On the desk", a: "Yes, there are. They're on the desk." },
              { label: "🧳 A suitcase", val: "✓ Under the bed", a: "Yes, there is. It's under the bed." },
              { label: "💻 A laptop", val: "✗ No laptop", a: "No, there isn't a laptop in the room." },
              { label: "🥤 Cokes", val: "✗ No Cokes", a: "No, there aren't any Cokes in the room." },
              { label: "📰 A newspaper", val: "✓ In the bag", a: "Yes, there is. It's in the bag." }
            ],
            askTitle: "PART 2: ASK A ABOUT ROOM 2 (Hold for question)",
            ask: [
              { label: "💻 A laptop", q: "Is there a laptop? Where is it?", ans: "✓ On the bed" },
              { label: "🧺 Any towels", q: "Are there any towels? Where are they?", ans: "✓ On the floor" },
              { label: "📚 Any books", q: "Are there any books in the room?", ans: "✗ No, there aren't" },
              { label: "📱 Remote control", q: "Is there a remote control? Where is it?", ans: "✓ On the table" },
              { label: "⏰ A clock", q: "Is there a clock in the room?", ans: "✗ No, there isn't" },
              { label: "🛏️ Extra pillows", q: "Are there any extra pillows? Where?", ans: "✓ On wardrobe" }
            ]
          }
        },
        {
          id: 3,
          label: "#3 Bedroom",
          A: {
            askFirst: true,
            askTitle: "PART 1: ASK B ABOUT THEIR ROOM (Hold item)",
            ask: [
              { label: "👢 Any boots", q: "Are there any boots in the room? Where are they?", ans: "✓ Under the chair" },
              { label: "👜 Any bags", q: "Are there any bags? Where are they?", ans: "✓ In the cupboard" },
              { label: "🛏️ Extra pillows", q: "Are there any extra pillows in the room?", ans: "✗ No, there aren't" },
              { label: "👛 A wallet", q: "Is there a wallet in the room? Where is it?", ans: "✓ On the bed" },
              { label: "📷 A camera", q: "Is there a camera in the room?", ans: "✗ No, there isn't" },
              { label: "⌚ A watch", q: "Is there a watch? Where is it?", ans: "✓ Next to the lamp" }
            ],
            giveTitle: "PART 2: PICTURE OF YOUR ROOM (Answer B: + / −)",
            give: [
              { label: "👓 Glasses", val: "✓ On the book", a: "Yes, there are. They're on the book." },
              { label: "🔌 Phone charger", val: "✓ In the drawer", a: "Yes, there is. It's in the drawer." },
              { label: "🛂 A passport", val: "✗ No passport", a: "No, there isn't a passport in the room." },
              { label: "☂️ An umbrella", val: "✓ Under the table", a: "Yes, there is. It's under the table." },
              { label: "🖊️ Pens", val: "✗ No pens", a: "No, there aren't any pens on the desk." },
              { label: "🎒 A bag", val: "✓ On the floor", a: "Yes, there is. It's on the floor." }
            ]
          },
          B: {
            askFirst: false,
            giveTitle: "PART 1: PICTURE OF YOUR ROOM (Answer A: + / −)",
            give: [
              { label: "👢 Boots", val: "✓ Under the chair", a: "Yes, there are. They're under the chair." },
              { label: "👜 Bags", val: "✓ In the cupboard", a: "Yes, there are. They're in the cupboard." },
              { label: "🛏️ Extra pillows", val: "✗ No pillows", a: "No, there aren't any extra pillows." },
              { label: "👛 A wallet", val: "✓ On the bed", a: "Yes, there is. It's on the bed." },
              { label: "📷 A camera", val: "✗ No camera", a: "No, there isn't a camera in the room." },
              { label: "⌚ A watch", val: "✓ Next to lamp", a: "Yes, there is. It's next to the lamp." }
            ],
            askTitle: "PART 2: ASK A ABOUT THEIR ROOM (Hold item)",
            ask: [
              { label: "👓 Any glasses", q: "Are there any glasses in the room? Where are they?", ans: "✓ On the book" },
              { label: "🔌 Phone charger", q: "Is there a phone charger? Where is it?", ans: "✓ In the drawer" },
              { label: "🛂 A passport", q: "Is there a passport in the room?", ans: "✗ No, there isn't" },
              { label: "☂️ An umbrella", q: "Is there an umbrella? Where is it?", ans: "✓ Under the table" },
              { label: "🖊️ Any pens", q: "Are there any pens on the desk?", ans: "✗ No, there aren't" },
              { label: "🎒 A bag", q: "Is there a bag in the room? Where is it?", ans: "✓ On the floor" }
            ]
          }
        }
      ]
    }
  },

  // -------------------- UNITS 11 & 12 (Spec Task 7: Directions Map PE6 p. 80 & 85) --------------------
  "u1112": {
    title: "Units 11 & 12",
    subtitle: "Past Simple • Directions",
    icon: "🗺️",
    unlocked: true,
    part1: [
      { q: "What time did you get up this morning?", h: "I got up at [6:30] this morning.", kw: "got up" },
      { q: "What did you have for breakfast this morning?", h: "I had [bread and coffee] for breakfast.", kw: "had for breakfast" },
      { q: "How did you come to class today?", h: "I came to class by [motorbike / bus].", kw: "came to class" },
      { q: "What did you do yesterday evening?", h: "Yesterday evening, I [did my homework and watched TV].", kw: "yesterday evening" },
      { q: "What did you do last Sunday?", h: "Last Sunday, I [went out with my friends].", kw: "last Sunday" },
      { q: "Did you go shopping last week? What did you buy?", h: "Yes, I did. I bought [a new T-shirt].", kw: "bought" },
      { q: "What did you do on your last birthday?", h: "On my last birthday, I [had a party with my family].", kw: "last birthday" },
      { q: "Where did you go for your last summer holiday?", h: "I went to [Da Nang / Vung Tau] with my family.", kw: "summer holiday" }
    ],
    part2: {
      taskName: "Asking & Giving Directions (Map)",
      scenarios: [
        {
          id: 1,
          label: "#1 PE6 Map",
          interactiveMap: {
            vRoad: "EAST ROAD",
            hRoadTop: "NORTH STREET",
            hRoadBot: "SOUTH STREET",
            lots: [
              [
                { num: 1, knownBy: "A", name: "⚽ SPORTS CENTRE", dir: "Go straight on East Rd. Turn left on North St. It's on the right." }
              ],
              [
                { num: null, knownBy: "BOTH", name: "📱 PHONE SHOP", dir: "Landmark on North Street." },
                { num: 2, knownBy: "B", name: "🏛️ UNIVERSITY", dir: "Go straight on East Rd. Turn right on North St. Next to Phone Shop." }
              ],
              [
                { num: 3, knownBy: "B", name: "🏦 THE BANK", dir: "Go straight on East Rd, cross South St. Opposite Park Hotel." },
                { num: null, knownBy: "BOTH", name: "🏨 PARK HOTEL", dir: "Landmark on the corner of East Road and South Street." }
              ],
              [
                { num: 4, knownBy: "A", name: "📮 POST OFFICE", dir: "Go straight on East Rd, cross South St. Opposite Park Hotel." }
              ],
              [
                { num: 5, knownBy: "A", name: "👟 SHOE FACTORY", dir: "Turn left into South Street. It's on the left." }
              ],
              [
                { num: 6, knownBy: "B", name: "🚌 BUS STATION", dir: "Turn right into South Street. It's on the right." }
              ]
            ]
          },
          A: {
            give: [],
            askTitle: "ASK B FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "🏛️ The University", q: "Excuse me. How can I get to the university?", ans: "Building [2]" },
              { label: "🏦 The Bank", q: "Excuse me. Where's the bank, please?", ans: "Building [3]" },
              { label: "🚌 The Bus Station", q: "Excuse me. How can I get to the bus station?", ans: "Building [6]" }
            ]
          },
          B: {
            give: [],
            askTitle: "ASK A FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "⚽ Sports Centre", q: "Excuse me. How can I get to the sports centre?", ans: "Building [1]" },
              { label: "📮 Post Office", q: "Excuse me. Where's the post office, please?", ans: "Building [4]" },
              { label: "👟 Shoe Factory", q: "Excuse me. How can I get to the shoe factory?", ans: "Building [5]" }
            ]
          }
        },
        {
          id: 2,
          label: "#2 King St",
          interactiveMap: {
            vRoad: "KING STREET",
            hRoadTop: "NORTH ROAD",
            hRoadBot: "LONDON ROAD",
            lots: [
              [
                { num: 1, knownBy: "B", name: "🥟 CHINESE REST.", dir: "Go straight on King St. Turn left on North Rd. It's on the right." }
              ],
              [
                { num: null, knownBy: "BOTH", name: "🏥 HOSPITAL", dir: "Landmark on North Road." },
                { num: 2, knownBy: "A", name: "🛒 SUPERMARKET", dir: "Go straight on King St. Turn right on North Rd. Next to Hospital." }
              ],
              [
                { num: null, knownBy: "BOTH", name: "🏋️ THE GYM", dir: "Landmark on King Street." },
                { num: 3, knownBy: "A", name: "🍝 ITALIAN REST.", dir: "Go straight on King St, cross London Rd. Next to the Gym." }
              ],
              [
                { num: 4, knownBy: "B", name: "📚 BOOKSHOP", dir: "Go straight on King St, cross London Rd. Opposite the Gym." }
              ],
              [
                { num: 5, knownBy: "B", name: "🎬 CINEMA", dir: "Turn left into London Road. It's on the left." }
              ],
              [
                { num: 6, knownBy: "A", name: "☕ COFFEE SHOP", dir: "Turn right into London Road. It's on the right." }
              ]
            ]
          },
          A: {
            give: [],
            askTitle: "ASK B FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "🥟 Chinese Rest.", q: "Excuse me. Where's the Chinese restaurant, please?", ans: "Building [1]" },
              { label: "📚 The Bookshop", q: "Excuse me. How can I get to the bookshop?", ans: "Building [4]" },
              { label: "🎬 The Cinema", q: "Excuse me. Is there a cinema near here?", ans: "Building [5]" }
            ]
          },
          B: {
            give: [],
            askTitle: "ASK A FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "🛒 Supermarket", q: "Excuse me. How can I get to the supermarket?", ans: "Building [2]" },
              { label: "🍝 Italian Rest.", q: "Excuse me. Where's the Italian restaurant, please?", ans: "Building [3]" },
              { label: "☕ Coffee Shop", q: "Excuse me. Is there a coffee shop near here?", ans: "Building [6]" }
            ]
          }
        },
        {
          id: 3,
          label: "#3 High St",
          interactiveMap: {
            vRoad: "PARK ROAD",
            hRoadTop: "HIGH STREET",
            hRoadBot: "STATION ROAD",
            lots: [
              [
                { num: null, knownBy: "BOTH", name: "🖼️ MUSEUM", dir: "Landmark on High Street." },
                { num: 1, knownBy: "A", name: "🎨 ART GALLERY", dir: "Go straight on Park Rd. Turn left on High St. Next to Museum." }
              ],
              [
                { num: 2, knownBy: "B", name: "🅿️ CAR PARK", dir: "Go straight on Park Rd. Turn right on High St. It's on the left." }
              ],
              [
                { num: 3, knownBy: "B", name: "🚆 TRAIN STATION", dir: "Go straight on Park Rd, cross Station Rd. Opposite the School." }
              ],
              [
                { num: null, knownBy: "BOTH", name: "🏫 SCHOOL", dir: "Landmark on Park Road." },
                { num: 4, knownBy: "A", name: "🥖 BAKERY", dir: "Go straight on Park Rd, cross Station Rd. Next to the School." }
              ],
              [
                { num: 5, knownBy: "A", name: "🌳 CITY PARK", dir: "Turn left into Station Road. It's on the left." }
              ],
              [
                { num: 6, knownBy: "B", name: "💊 PHARMACY", dir: "Turn right into Station Road. It's on the right." }
              ]
            ]
          },
          A: {
            give: [],
            askTitle: "ASK B FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "🅿️ Car Park", q: "Excuse me. Is there a car park near here?", ans: "Building [2]" },
              { label: "🚆 Train Station", q: "Excuse me. How can I get to the train station?", ans: "Building [3]" },
              { label: "💊 Pharmacy", q: "Excuse me. Where's the pharmacy, please?", ans: "Building [6]" }
            ]
          },
          B: {
            give: [],
            askTitle: "ASK A FOR DIRECTIONS (All 3 are ❓ on your map)",
            ask: [
              { label: "🎨 Art Gallery", q: "Excuse me. How can I get to the art gallery?", ans: "Building [1]" },
              { label: "🥖 The Bakery", q: "Excuse me. Where's the bakery, please?", ans: "Building [4]" },
              { label: "🌳 City Park", q: "Excuse me. How can I get to the city park?", ans: "Building [5]" }
            ]
          }
        }
      ]
    }
  },

  // -------------------- FINAL REVIEW (ALL UNITS 1-12) --------------------
  "final": {
    title: "Final Speaking Test Review",
    subtitle: "All Units 1–12 • 4 Random Questions & All 7 Exam Tasks",
    icon: "🏆",
    unlocked: true,
    part1: [],
    part2: {
      taskName: "All 7 Official Exam Tasks",
      scenarios: []
    }
  }
};

// Build Final Review Bank automatically from Units 1-12 (All 7 Tasks x 3 Sets = 21 Exam Cards)
(function initFinalBankA1() {
  const unitKeys = ["u12", "u34", "u56", "u78", "u910", "u1112"];
  let allQuestions = [];
  unitKeys.forEach(k => {
    DATA_A1[k].part1.forEach(item => {
      allQuestions.push({ ...item, unitTitle: DATA_A1[k].title });
    });
  });
  DATA_A1.final.allPart1 = allQuestions;

  const clone = obj => JSON.parse(JSON.stringify(obj));

  const datesSet2 = {
    id: 2,
    label: "Set 2",
    A: {
      askFirst: true,
      askTitle: "PART 1: ASK B ABOUT DATES (Hold for question)",
      ask: [
        { label: "Halloween", q: "When is Halloween?", ans: "October 31" },
        { label: "May Day", q: "When is International Workers' Day?", ans: "May 1" },
        { label: "Final exam", q: "When is our English exam?", ans: "June 12" },
        { label: "Mother's birthday", q: "When is your mother's birthday?", ans: "August 23" }
      ],
      giveTitle: "PART 2: ANSWER B ABOUT DATES (Hold for answer)",
      give: [
        { label: "Father's birthday", val: "April 3", a: "My father's birthday is on the third of April." },
        { label: "School starts", val: "September 5", a: "It starts on the fifth of September." },
        { label: "Summer holiday", val: "July 15", a: "It starts on the fifteenth of July." },
        { label: "New Year's Eve", val: "December 31", a: "It's on the thirty-first of December." }
      ]
    },
    B: {
      askFirst: false,
      giveTitle: "PART 1: ANSWER A ABOUT DATES (Hold for answer)",
      give: [
        { label: "Halloween", val: "October 31", a: "It's on the thirty-first of October." },
        { label: "May Day", val: "May 1", a: "It's on the first of May." },
        { label: "Final exam", val: "June 12", a: "It's on the twelfth of June." },
        { label: "Mother's birthday", val: "August 23", a: "It's on the twenty-third of August." }
      ],
      askTitle: "PART 2: ASK A ABOUT DATES (Hold for question)",
      ask: [
        { label: "Father's birthday", q: "When is your father's birthday?", ans: "April 3" },
        { label: "School starts", q: "When does the school year start?", ans: "September 5" },
        { label: "Summer holiday", q: "When does the summer holiday start?", ans: "July 15" },
        { label: "New Year's Eve", q: "When is New Year's Eve?", ans: "December 31" }
      ]
    }
  };

  const datesSet3 = {
    id: 3,
    label: "Set 3",
    A: {
      askFirst: true,
      askTitle: "PART 1: ASK B ABOUT DATES (Hold for question)",
      ask: [
        { label: "Vietnamese Women's Day", q: "When is Vietnamese Women's Day?", ans: "October 20" },
        { label: "Earth Day", q: "When is Earth Day?", ans: "April 22" },
        { label: "Music concert", q: "When is the school music concert?", ans: "November 9" },
        { label: "Best friend's birthday", q: "When is your best friend's birthday?", ans: "January 18" }
      ],
      giveTitle: "PART 2: ANSWER B ABOUT DATES (Hold for answer)",
      give: [
        { label: "Football match", val: "March 26", a: "It's on the twenty-sixth of March." },
        { label: "Music festival", val: "August 11", a: "It's on the eleventh of August." },
        { label: "Sister's birthday", val: "February 2", a: "It's on the second of February." },
        { label: "Winter holiday", val: "December 20", a: "It starts on the twentieth of December." }
      ]
    },
    B: {
      askFirst: false,
      giveTitle: "PART 1: ANSWER A ABOUT DATES (Hold for answer)",
      give: [
        { label: "Vietnamese Women's Day", val: "October 20", a: "It's on the twentieth of October." },
        { label: "Earth Day", val: "April 22", a: "It's on the twenty-second of April." },
        { label: "Music concert", val: "November 9", a: "It's on the ninth of November." },
        { label: "Best friend's birthday", val: "January 18", a: "It's on the eighteenth of January." }
      ],
      askTitle: "PART 2: ASK A ABOUT DATES (Hold for question)",
      ask: [
        { label: "Football match", q: "When is the big football match?", ans: "March 26" },
        { label: "Music festival", q: "When is the music festival?", ans: "August 11" },
        { label: "Sister's birthday", q: "When is your sister's birthday?", ans: "February 2" },
        { label: "Winter holiday", q: "When does the winter holiday start?", ans: "December 20" }
      ]
    }
  };

  const placeSet3 = {
    id: 3,
    label: "Set 3",
    A: {
      askFirst: true,
      askTitle: "PART A: ASK B ABOUT DA NANG CITY (Hold item)",
      ask: [
        { label: "Eat fresh seafood", q: "Where can I eat fresh seafood?", ans: "Restaurants by the beach" },
        { label: "Go swimming", q: "Where can I go swimming?", ans: "My Khe Beach" },
        { label: "Take nice photos", q: "Where can I take nice photos?", ans: "Dragon Bridge" },
        { label: "Swim in winter", q: "Can I swim in the sea in winter?", ans: "No, it's cold." }
      ],
      giveTitle: "PART B: ANSWER B ABOUT DA NANG CITY (Hold item)",
      give: [
        { label: "Buy local gifts", val: "Han Market", a: "You can buy local gifts at Han Market." },
        { label: "Drink good coffee", val: "Cafés by Han River", a: "You can drink coffee at cafés by the Han River." },
        { label: "Rent a motorbike", val: "At the hotel", a: "You can rent a motorbike at your hotel." },
        { label: "Travel by bus", val: "Yes (cheap & easy)", a: "Yes, you can travel around the city by bus." }
      ]
    },
    B: {
      askFirst: false,
      giveTitle: "PART A: ANSWER A ABOUT DA NANG CITY (Hold item)",
      give: [
        { label: "Eat fresh seafood", val: "Restaurants by beach", a: "You can eat fresh seafood at restaurants by the beach." },
        { label: "Go swimming", val: "My Khe Beach", a: "You can go swimming at My Khe Beach." },
        { label: "Take nice photos", val: "Dragon Bridge", a: "You can take nice photos at Dragon Bridge." },
        { label: "Swim in winter", val: "No (too cold)", a: "No, you can't swim in winter because it's cold." }
      ],
      askTitle: "PART B: ASK A ABOUT DA NANG CITY (Hold item)",
      ask: [
        { label: "Buy local gifts", q: "Where can I buy local gifts?", ans: "Han Market" },
        { label: "Drink good coffee", q: "Where can I drink good coffee?", ans: "Cafés by Han River" },
        { label: "Rent a motorbike", q: "Where can I rent a motorbike?", ans: "At the hotel" },
        { label: "Travel by bus", q: "Can I travel around the city by bus?", ans: "Yes, you can." }
      ]
    }
  };

  DATA_A1.final.part2.scenarios = [
    { label: "1. Form", variants: clone(DATA_A1.u12.part2.scenarios) },
    { label: "2. Lunch", variants: clone(DATA_A1.u34.part2.scenarios) },
    { label: "3. Time", variants: clone(DATA_A1.u56.part2.scenarios) },
    { label: "4. Dates", variants: [clone(DATA_A1.u78.part2.scenarios[0]), datesSet2, datesSet3] },
    { label: "5. Place", variants: [clone(DATA_A1.u78.part2.scenarios[1]), clone(DATA_A1.u78.part2.scenarios[2]), placeSet3] },
    { label: "6. Room", variants: clone(DATA_A1.u910.part2.scenarios) },
    { label: "7. Map", variants: clone(DATA_A1.u1112.part2.scenarios) }
  ];
})();

window.LEVEL_DATA["A1"] = DATA_A1;
