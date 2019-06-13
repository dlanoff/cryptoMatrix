"use strict";

const { db } = require("./server/db");
const app = require("./server");
const PORT = 3000;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`Serving on ${PORT}`));
});
