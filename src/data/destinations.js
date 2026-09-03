const destinations = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    category: "Modern & Cultural",
    tagline: "Where ancient traditions meet neon futures.",
    description:
      "A dynamic megalopolis where ancient Shinto shrines, serene gardens, Michelin-starred gastronomy, and futuristic pop culture exist side-by-side.",
    latitude: 35.6762,
    longitude: 139.6503,
    currency: "Japanese Yen (¥)",
    language: "Japanese",
    bestMonths: "March – May & Sept – Nov",
    idealDays: "5–7 Days",
    budget: "$$$ (Moderate - High)",
    imageQuery: "tokyo city night japan",
    places: [
      {
        name: "Shibuya Crossing & Hachiko",
        tag: "Iconic Landmark",
        description:
          "The world's busiest pedestrian intersection, pulsating with neon giant screens and relentless urban energy.",
      },
      {
        name: "Sensō-ji Temple",
        tag: "Ancient Heritage",
        description:
          "Tokyo's oldest Buddhist temple in Asakusa, entered through the imposing Kaminarimon Gate with its giant red lantern.",
      },
      {
        name: "Meiji Shrine & Harajuku",
        tag: "Nature & Culture",
        description:
          "A tranquil 170-acre forest shrine dedicated to Emperor Meiji, right next to the vibrant Takeshita Street.",
      },
      {
        name: "Tokyo Skytree",
        tag: "Observation Deck",
        description:
          "A 634-meter broadcasting tower offering breathtaking 360-degree views across Mount Fuji and the Tokyo skyline.",
      },
    ],
  },

  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    category: "Romantic & Historical",
    tagline: "The timeless capital of art, fashion & gastronomy.",
    description:
      "Stroll along tree-lined boulevards, savor buttery croissants at sidewalk cafes, and admire world-renowned art collections along the romantic banks of the Seine.",
    latitude: 48.8566,
    longitude: 2.3522,
    currency: "Euro (€)",
    language: "French",
    bestMonths: "April – June & Sept – Oct",
    idealDays: "4–6 Days",
    budget: "$$$ (High)",
    imageQuery: "paris eiffel tower france",
    places: [
      {
        name: "Eiffel Tower",
        tag: "World Wonder",
        description:
          "Gustave Eiffel's wrought-iron masterpiece soaring 330 meters above the Champ de Mars with sparkling evening lights.",
      },
      {
        name: "Louvre Museum",
        tag: "World Class Art",
        description:
          "The world's largest art museum housed in a historic royal palace, home to the Mona Lisa and Venus de Milo.",
      },
      {
        name: "Montmartre & Sacré-Cœur",
        tag: "Artistic District",
        description:
          "A historic hilltop village famous for cobblestone alleyways, street painters, and the majestic white basilica.",
      },
      {
        name: "Musée d'Orsay",
        tag: "Impressionism",
        description:
          "A grand former railway station showcasing masterworks by Monet, Van Gogh, Renoir, and Degas.",
      },
    ],
  },

  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Tropical & Beach",
    tagline: "The Island of the Gods.",
    description:
      "A tropical paradise of emerald rice terraces, cliffside ocean temples, volcanic mountains, vibrant wellness culture, and world-class surf breaks.",
    latitude: -8.3405,
    longitude: 115.092,
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian & Balinese",
    bestMonths: "April – October (Dry Season)",
    idealDays: "6–9 Days",
    budget: "$$ (Budget Friendly)",
    imageQuery: "bali temple beach indonesia",
    places: [
      {
        name: "Uluwatu Temple",
        tag: "Cliffside Temple",
        description:
          "A dramatic sea temple perched 70 meters above crashing Indian Ocean waves, famous for sunset Kecak fire dances.",
      },
      {
        name: "Tegallalang Rice Terraces",
        tag: "Natural Landscape",
        description:
          "Cascading green rice paddies engineered with ancient Subak irrigation systems in the lush hills of Ubud.",
      },
      {
        name: "Sacred Monkey Forest Sanctuary",
        tag: "Wildlife & Nature",
        description:
          "A natural forest sanctuary in Ubud inhabited by hundreds of grey long-tailed macaques and moss-covered temples.",
      },
      {
        name: "Nusa Penida Kelingking Beach",
        tag: "Coastal Wonder",
        description:
          "An iconic T-Rex-shaped cliff formation overlooking turquoise waters and pristine white sands.",
      },
    ],
  },

  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Asia",
    category: "Luxury & Futuristic",
    tagline: "The city where impossible architectural dreams come true.",
    description:
      "A glamorous oasis in the Arabian Desert featuring record-breaking skyscrapers, artificial palm islands, luxury shopping, and golden sand dunes.",
    latitude: 25.2048,
    longitude: 55.2708,
    currency: "UAE Dirham (AED)",
    language: "Arabic & English",
    bestMonths: "November – March",
    idealDays: "4–5 Days",
    budget: "$$$$ (Ultra Luxury)",
    imageQuery: "dubai skyline burj khalifa",
    places: [
      {
        name: "Burj Khalifa",
        tag: "Architectural Marvel",
        description:
          "The world's tallest building standing at 828 meters, featuring observation decks on the 124th and 148th floors.",
      },
      {
        name: "Palm Jumeirah",
        tag: "Man-made Island",
        description:
          "An iconic palm-tree-shaped artificial archipelago lined with luxury resorts, beach clubs, and fine dining.",
      },
      {
        name: "Museum of the Future",
        tag: "Innovation & Design",
        description:
          "A striking torus-shaped architectural masterpiece adorned with Arabic calligraphy, showcasing futuristic technology.",
      },
      {
        name: "Dubai Desert Safari",
        tag: "Adventure",
        description:
          "Dune bashing in 4x4 vehicles, camel riding, sandboarding, and traditional Bedouin starlit dinners.",
      },
    ],
  },

  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    category: "Historical & Culinary",
    tagline: "The Eternal City.",
    description:
      "An open-air museum where ancient gladiatorial arenas, Baroque fountains, Renaissance palaces, and heavenly pasta trattorias line every street corner.",
    latitude: 41.9028,
    longitude: 12.4964,
    currency: "Euro (€)",
    language: "Italian",
    bestMonths: "April – June & Sept – Oct",
    idealDays: "4–5 Days",
    budget: "$$$ (Moderate - High)",
    imageQuery: "rome colosseum italy",
    places: [
      {
        name: "The Colosseum",
        tag: "Ancient Wonder",
        description:
          "The legendary stone amphitheatre constructed in 80 AD, once holding 50,000 spectators for gladiatorial contests.",
      },
      {
        name: "Trevi Fountain",
        tag: "Baroque Masterpiece",
        description:
          "Rome's largest Baroque fountain where visitors toss coins over their shoulder to ensure a return to the city.",
      },
      {
        name: "Vatican City & St. Peter's",
        tag: "Sacred Heritage",
        description:
          "The world's smallest sovereign state, home to Michelangelo's Sistine Chapel ceiling and St. Peter's Basilica.",
      },
      {
        name: "The Pantheon",
        tag: "Roman Engineering",
        description:
          "A 2,000-year-old preserved Roman temple featuring the world's largest unreinforced concrete dome and oculus.",
      },
    ],
  },

  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    region: "Americas",
    category: "Metropolitan & Culture",
    tagline: "The city that never sleeps.",
    description:
      "A fast-paced global capital of theatre, gastronomy, finance, and art, anchored by towering skyscrapers and diverse neighborhood cultures.",
    latitude: 40.7128,
    longitude: -74.006,
    currency: "US Dollar ($)",
    language: "English",
    bestMonths: "Sept – Nov & April – June",
    idealDays: "5–7 Days",
    budget: "$$$$ (High)",
    imageQuery: "new york skyline Manhattan",
    places: [
      {
        name: "Central Park",
        tag: "Urban Oasis",
        description:
          "843 acres of sprawling green lawns, winding paths, lakes, and bridges right in the center of Manhattan.",
      },
      {
        name: "Times Square & Broadway",
        tag: "Entertainment",
        description:
          "The dazzling heart of the Theatre District illuminated by towering digital billboards and world-class shows.",
      },
      {
        name: "Statue of Liberty & Ellis Island",
        tag: "Freedom Symbol",
        description:
          "France's gift of freedom standing tall in New York Harbor, accessible via ferry from Battery Park.",
      },
      {
        name: "Empire State Building",
        tag: "Skyline View",
        description:
          "The iconic 102-story Art Deco skyscraper offering unobstructed 360-degree views of New York City.",
      },
    ],
  },

  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    category: "Historical & Culture",
    tagline: "A majestic fusion of royalty, history & modernity.",
    description:
      "Explore royal palaces, historic riverfront bridges, world-class free museums, West End theatre shows, and cozy pub culture.",
    latitude: 51.5074,
    longitude: -0.1278,
    currency: "British Pound (£)",
    language: "English",
    bestMonths: "May – September",
    idealDays: "4–6 Days",
    budget: "$$$ (High)",
    imageQuery: "london big ben tower bridge",
    places: [
      {
        name: "Big Ben & Houses of Parliament",
        tag: "Royal Landmark",
        description:
          "The iconic Elizabeth Tower clock face overlooking the River Thames in the heart of Westminster.",
      },
      {
        name: "Tower Bridge & Tower of London",
        tag: "Victorian History",
        description:
          "The famous suspension bridge alongside the historic fortress housing the Crown Jewels.",
      },
      {
        name: "The British Museum",
        tag: "World History",
        description:
          "A vast museum dedicated to human history, art, and culture housing the Rosetta Stone and Egyptian mummies.",
      },
      {
        name: "London Eye",
        tag: "Observation Wheel",
        description:
          "A 135-meter cantilevered observation wheel offering panoramic views over Big Ben and St. Paul's Cathedral.",
      },
    ],
  },

  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    category: "Coastal & Harbor",
    tagline: "Harbor beauty meets sun-drenched outdoor lifestyle.",
    description:
      "A coastal paradise defined by its world-famous harbor, architectural icons, golden surf beaches, lush national parks, and relaxed dining.",
    latitude: -33.8688,
    longitude: 151.2093,
    currency: "Australian Dollar (AUD)",
    language: "English",
    bestMonths: "September – November & Feb – April",
    idealDays: "5–7 Days",
    budget: "$$$ (Moderate - High)",
    imageQuery: "sydney opera house australia",
    places: [
      {
        name: "Sydney Opera House",
        tag: "Architectural Icon",
        description:
          "Jørn Utzon's UNESCO World Heritage sail-like masterpiece dominating Bennelong Point on Sydney Harbour.",
      },
      {
        name: "Bondi Beach to Coogee Walk",
        tag: "Coastal Trail",
        description:
          "A breathtaking 6km cliffside coastal trail passing golden sand beaches, natural ocean pools, and cafes.",
      },
      {
        name: "Sydney Harbour Bridge",
        tag: "Steel Arch",
        description:
          "Known locally as 'The Coathanger', offering BridgeClimb tours for dramatic harbor panoramas.",
      },
      {
        name: "The Rocks District",
        tag: "Historic Quarter",
        description:
          "Sydney's oldest historic neighborhood with cobblestone lanes, weekend markets, and heritage pubs.",
      },
    ],
  },

  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    category: "Heritage & Nature",
    tagline: "The cultural heart of Japan.",
    description:
      "Step back in time amidst thousands of classical Buddhist temples, serene zen gardens, traditional wooden machiya townhouses, and Geisha districts.",
    latitude: 35.0116,
    longitude: 135.7681,
    currency: "Japanese Yen (¥)",
    language: "Japanese",
    bestMonths: "March – May (Cherry Blossom) & Oct – Nov",
    idealDays: "3–5 Days",
    budget: "$$$ (Moderate)",
    imageQuery: "kyoto bamboo forest japan",
    places: [
      {
        name: "Fushimi Inari-taisha",
        tag: "Torii Gate Shrine",
        description:
          "A dramatic mountain shrine famous for its pathway lined with over 10,000 vibrant vermilion Torii gates.",
      },
      {
        name: "Arashiyama Bamboo Grove",
        tag: "Natural Wonder",
        description:
          "An ethereal forest of soaring green bamboo stalks swaying gently in the mountain wind.",
      },
      {
        name: "Kinkaku-ji (Golden Pavilion)",
        tag: "Zen Temple",
        description:
          "A breathtaking Zen Buddhist temple whose top two floors are completely covered in pure gold leaf.",
      },
    ],
  },

  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    category: "Nature & Coastal",
    tagline: "Where dramatic mountains plunge into two oceans.",
    description:
      "A spectacular coastal city crowned by Table Mountain, featuring pristine white beaches, penguin colonies, vineyards, and rich multi-cultural history.",
    latitude: -33.9249,
    longitude: 18.4241,
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans, Xhosa",
    bestMonths: "November – March",
    idealDays: "5–7 Days",
    budget: "$$ (Great Value)",
    imageQuery: "cape town table mountain south africa",
    places: [
      {
        name: "Table Mountain",
        tag: "Natural Wonder",
        description:
          "A flat-topped mountain landmark accessible via rotating cable car, giving 360-degree views over the Atlantic.",
      },
      {
        name: "Boulders Beach Penguin Colony",
        tag: "Wildlife Encounter",
        description:
          "A sheltered beach home to a thriving wild colony of African penguins nesting on white granite sands.",
      },
      {
        name: "Cape of Good Hope",
        tag: "Scenic Reserve",
        description:
          "The southwesternmost tip of the African continent with wild ocean views, baboons, and coastal hiking trails.",
      },
    ],
  },
];

export default destinations;
