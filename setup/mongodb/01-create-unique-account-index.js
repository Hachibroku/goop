conn = Mongo();
db = conn.getDB("module3-project-gamma-mongo");

db.accounts.insertOne({
  email: "murphey@example.com",
  hashed_password:
    "$2b$12$Xj4tYoDmfBj3dhosnpa8huPj.2r1DG/38ZSoY6YM5KT7dTw6IjOoq",
  username: "Murphey",
});
db.accounts.insertOne({
  email: "alex@example.com",
  hashed_password:
    "$2b$12$Xj4tYoDmfBj3dhosnpa8huPj.2r1DG/38ZSoY6YM5KT7dTw6IjOoq",
  username: "Alex",
});
db.accounts.insertOne({
  email: "sung@example.com",
  hashed_password:
    "$2b$12$Xj4tYoDmfBj3dhosnpa8huPj.2r1DG/38ZSoY6YM5KT7dTw6IjOoq",
  username: "Sung",
});
db.accounts.insertOne({
  email: "luis@example.com",
  hashed_password:
    "$2b$12$Xj4tYoDmfBj3dhosnpa8huPj.2r1DG/38ZSoY6YM5KT7dTw6IjOoq",
  username: "Luis",
});
db.accounts.createIndex({ email: 1 }, { unique: true });
