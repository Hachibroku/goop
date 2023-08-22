conn = Mongo();
db = conn.getDB("library");

db.inventory.insertMany([
  {
    _id: ObjectId("6331860de34b7947e69e7626"),
    title: "Fahrenheit 451",
    image_url: 8,
    description:
      'Often regarded as one of Bradbury\'s greatest works, Fahrenheit 451 presents an American society where books have been outlawed and "firemen" burn any that are found.',
  },
  {
    _id: ObjectId("633186c8e34b7947e69e7627"),
    title: "Have Space Suit - Will Travel",
    image_url: 2,
    description:
      'High school senior Clifford "Kip" Russell is determined to get to the Moon, but the price of a ticket is far beyond his reach. He enters a contest wins a used space suit which he names "Oscar". A flying saucer gets Kip and hijinks ensue.',
  },
  {
    _id: ObjectId("6331871be34b7947e69e7628"),
    title: "Fifth Season, The",
    image_url: 3,
    description:
      'The Fifth Season takes place on a planet with a single supercontinent called the Stillness. Every few centuries, its inhabitants endure what they call a "Fifth Season" of catastrophic climate change.',
  },
  {
    _id: ObjectId("633187f2e34b7947e69e7629"),
    title: "First Fifteen Lives of Harry August, The",
    image_url: 7,
    description:
      "Harry August is born in the women's washroom of Berwick-upon-Tweed station in 1919, leads an unremarkable life, and dies in hospital in Newcastle-upon-Tyne in 1989. He then finds himself born again back in 1919 in the same circumstances.",
  },
  {
    _id: ObjectId("633188cce34b7947e69e762a"),
    title: "Hench",
    image_url: 1,
    description:
      'Anna Tromedlov works in the gig economy, providing clerical services to low-level supervillains in need of "henches" — until she is injured and disabled by a superhero\'s collateral damage.',
  },
  {
    _id: ObjectId("63318954e34b7947e69e762b"),
    title: "Women's War, The",
    image_url: 4,
    description:
      "In a feminist fantasy epic, a revolutionary spell gives women the ability to control their own fertility—with consequences that rock their patriarchal society to its core.",
  },
  {
    _id: ObjectId("633189e3e34b7947e69e762c"),
    title: "End Of Men, The",
    image_url: 3,
    description:
      "Set in a world where a virus stalks our male population, The End of Men is an electrifying and unforgettable debut from a remarkable new talent that asks: what would life truly look like without men?",
  },
  {
    _id: ObjectId("63318c6ce34b7947e69e762d"),
    title: "Psalm for the Wild-Built, A",
    image_url: 22,
    description:
      'On a moon called Panga where AI and robots are a distant myth, Dex is an adventurous and friendly tea monk who travels the human-populated areas of their moon meeting villagers and townsfolk. One day Dex, seeking a change in their routine, travels into the wild and meets a robot named Splendid Speckled Mosscap. They are thrown into a road-trip with a question on their minds: "What do people need?"',
  },
]);
