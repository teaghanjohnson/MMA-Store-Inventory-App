const db = require("../db/queries");

async function getItemsByCategory(req, res) {
  const { category } = req.query;
  const categories = await db.getAllCategories();
  const items = category
    ? await db.getItemsByCategory(category)
    : await db.getAllItems();
  res.render("items", { items, categories });
}

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  const categories = await db.getAllCategories();
  res.render("items", { items, categories });
}
async function createItemGet(req, res, error) {
  const categories = await db.getAllCategories();
  res.render("createItem", { categories });
}

async function createItemPost(req, res, error) {
  const { name, stock, category_id } = req.body;
  if (!name) {
    const categories = await db.getAllCategories();
    return res.render("createItem", { error: "Name is required", categories });
  }
  if (!stock) {
    const categories = await db.getAllCategories();
    return res.render("createItem", { error: "Stock is required", categories });
  }
  const existing = await db.getItemByName(name);
  if (existing.length > 0) {
    const categories = await db.getAllCategories();
    return res.render("createItem", {
      error: "An item with that name already exists.",
      categories,
    });
  }
  await db.insertItem(name, stock, category_id);
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

async function updateItemsPost(req, res, error) {
  const { id } = req.params;
  const { name, stock } = req.body;
  if (!name || !stock) {
    return res.redirect("/items");
  }
  const existing = await db.getItemByName(name);
  if (existing.length > 0 && existing[0].id !== parseInt(id)) {
    return res.redirect("/items");
  }
  await db.updateItems(id, name, stock);
  res.redirect("/items");
}

async function updateAllItemsPost(req, res) {
  const items = req.body.items;
  if (items) {
    for (const fields of items) {
      if (!fields) continue;
      const { id, name, stock, category_id } = fields;
      if (id && name && stock && category_id) {
        await db.updateItems(id, name, stock, category_id);
      }
    }
  }
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
  updateAllItemsPost,
};
