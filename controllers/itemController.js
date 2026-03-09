const db = require("../db/queries");

async function getItems(req, res) {
  const items = await db.getAllItems();
  res.render("index", { items });
}

async function createItemGet(req, res) {
  res.render("createItem");
}

async function createItemPost(req, res) {
  const { item } = req.body;
  await db.insertItem(item);
  res.redirect("items");
}

async function searchItemGet(req, res) {
  const { search } = req.query;
  const searched = await db.searchItem(search);
  res.render("searchItem", { items: searched });
}

async function deleteItemGet(req, res) {
  await db.deleteItem();
  res.render("items");
}

async function deleteAllItems(req, res) {
  await db.deleteAllItems();
  res.render("category");
}

module.exports = {
  getItems,
  createItemGet,
  createItemPost,
  searchItemGet,
  deleteItemGet,
  deleteAllItems,
};
