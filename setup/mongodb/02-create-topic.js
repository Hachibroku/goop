conn = Mongo();
db = conn.getDB("module3-project-gamma-mongo");

db.topics.insertMany([
  {
    title: "Starfield Regression",
    image_url:
      "https://beanstalk-9fcd.kxcdn.com/wp-content/uploads/2022/10/25-1.png",
    description:
      "Starfield is a regression of Bethesda's well established RPG formula when compared to their prior titles, such as Oblivion and Fallout 3.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
    used_as_topic_of_the_day: false,
  },
  {
    title: "Fromsoft Growth",
    image_url:
      "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/04/27/armored-core-6-header.jpg",
    description:
      "Armored Core 6 shows the lessons From Software has learned from the Souls series and Elden Ring.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
    used_as_topic_of_the_day: false,
  },
  {
    title: "Baldurs Gate 3",
    image_url: "https://images5.alphacoders.com/132/1325553.jpg",
    description:
      "The somewhat unexpected amount of success that Baldur's Gate 3 has enjoyed shows that people are ready for a new era of CRPGs.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
    used_as_topic_of_the_day: false,
  },
  {
    title: "Witcher 3",
    image_url:
      "https://beanstalk-9fcd.kxcdn.com/wp-content/uploads/2022/12/Witcher-3-Wallpaper.jpg",
    description:
      "While many enjoyed the rich and detailed open world of The Witcher 3, the next game in the series should go back to its more linear roots.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
    used_as_topic_of_the_day: false,
  },
  {
    title: "Ubisoft",
    image_url:
      "https://e0.pxfuel.com/wallpapers/449/857/desktop-wallpaper-fond-d-ecran-ubisoft-ubisoft-logo.jpg",
    description: "Ubisoft did nothing wrong.",
    voting: {
      user_votes: {},
      agree_count: 0,
      disagree_count: 0,
    },
    comments: [],
    used_as_topic_of_the_day: false,
  },
]);
