const db = require("../db/queries");

async function getItemsByCategory(req, res) {
  const { category } = req.query;
  const items = category
    ? await db.getItemsByCategory(category)
    : await db.getAllItems();
  res.render("items", { items });
}

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items", { items });
}
async function createItemGet(req, res, error) {
  const categories = await db.getAllCategories();
  res.render("createItem", { categories });
}

async function createItemPost(req, res) {
  const { name, description, price, stock, categories } = req.body;
  await db.insertItem(name, description, price, stock, categories);
  res.redirect("/items");
}

async function searchItemGet(req, res) {
  const { search } = req.query;
  const searched = await db.searchItem(search);
  res.render("searchItem", { items: searched });
}

async function deleteItemGet(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect("/items");
}

async function deleteAllItemsGet(req, res) {
  await db.deleteAllItems();
  res.redirect("/category");
}

async function updateItemsGet(req, res) {
  const { id } = req.params;
  const item = await db.getItemsById(id);
  res.render("updateItems", { item: item[0] });
}

async function updateItemsPost(req, res) {
  const { name, description, price, stock, category_id } = req.body;
  await db.updateItems(name, description, price, stock, category_id);
  res.redirect("/items");
}

module.exports = {
  getItemsByCategory,
  getAllItems,
  createItemGet,
  createItemPost,
  searchItemGet,
  deleteItemGet,
  deleteAllItemsGet,
  updateItemsGet,
  updateItemsPost,
};
