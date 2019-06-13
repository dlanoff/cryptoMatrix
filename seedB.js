const { db } = require("./server/db");
const { green, red } = require("chalk");

const seed = async () => {
  await db.sync({ force: true });
  console.log(green("Seeding Successful"));
  db.close();
};

seed().catch(err => {
  console.error(red("Something went awry :/"));
  console.error(err);
  db.close();
});
