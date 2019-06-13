"use strict";

const { db } = require("./server/db");
const app = require("./server");
const PORT = process.env.PORT || 8080;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`Serving on ${PORT}`));
});
