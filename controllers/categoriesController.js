const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("category");
}

async function createUsernameGet(req, res)
