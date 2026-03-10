const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { categories });
}

async function createCategoryGet(req, res) {
  res.render("createCategory");
}

async function createCategoryPost(req, res) {
  const { category } = req.body;
  await db.insertCategory(category);
  res.redirect("/");
}
async function searchCategoryGet(req, res) {
  const { search } = req.query;
  const searched = await db.searchCategory(search);
  res.render("searchCategory", { categories: searched });
}

async function deleteCategoryGet(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/category");
}

async function deleteAllCategoriesGet(req, res) {
  await db.deleteAllCategories();
  res.redirect("/index");
}

async function updateCategoryGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  res.render("updateCategory", { category: category[0] });
}

async function updateCategoryPost(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  await db.updateCategoryById(id, name, description);
  res.redirect("/category");
}

module.exports = {
  getCategories,
  createCategoryGet,
  createCategoryPost,
  searchCategoryGet,
  deleteCategoryGet,
  deleteAllCategoriesGet,
  updateCategoryGet,
  updateCategoryPost,
};
