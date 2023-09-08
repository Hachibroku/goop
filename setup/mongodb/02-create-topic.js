conn = Mongo();
db = conn.getDB("module3-project-gamma-mongo");

db.topics.insertMany([
  {
    title: "starfield regression",
    image_url: "exampleimage.jpg",
    description:
      "Starfield is a regression of Bethesda's well established RPG formula when compared to their prior titles, such as Oblivion and Fallout 3.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
  },
  {
    title: "fromsoft growth",
    image_url: "exampleimage.jpg",
    description:
      "Armored Core 6 shows the lessons From Software has learned from the Souls series and Elden Ring.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
  },
  {
    title: "baldurs gate 3",
    image_url: "",
    description:
      "The somewhat unexpected amount of success that Baldur's Gate 3 has enjoyed shows that people are ready for a new era of CRPGs.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
  },
  {
    title: "witcher",
    image_url: "",
    description:
      "While many enjoyed the rich and detailed open world of The Witcher 3, the next game in the series should go back to its more linear roots.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
  },
  {
    title: "ubisoft",
    image_url: "",
    description: "Ubisoft did nothing wrong.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
  },
]);
