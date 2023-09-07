conn = Mongo();
db = conn.getDB("module3-project-gamma-mongo");

db.accounts.insertOne({
  email: "user@example.com",
  password: "$2b$12$gqB.kZtNIbyKcYxStjtVTenCwLcqmUSFN/Yda2rP1znKlTHX6wukq",
  username: "User",
});
db.accounts.insertOne({
  email: "user2@example.com",
  password: "$2b$12$BnCFBYWNZI1dpQ3djPS5DuWszH3nc2v6nYPcz8OZpr6LPZSysrJty",
  username: "User Two",
});
db.accounts.createIndex({ email: 1 }, { unique: true });
