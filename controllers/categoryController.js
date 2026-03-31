const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { categories });
}

async function createCategoryGet(req, res, error) {
  res.render("createCategory", { error: null });
}

async function createCategoryPost(req, res, error) {
  const { name } = req.body;
  if (!name) {
    return res.render("createCategory", { error: "Name is required." });
  }
  await db.insertCategory(name);
  res.redirect("/categories");
}
async function searchCategoryGet(req, res) {
  const { search } = req.query;
  const searched = await db.searchCategory(search);
  res.render("searchCategory", { categories: searched });
}
async function deleteCategoryPageGet(req, res) {
  const categories = await db.getAllCategories();
  res.render("deleteCategory", { categories });
}

async function deleteCategoryGet(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/categories");
}

async function deleteAllCategoriesGet(req, res) {
  await db.deleteAllCategories();
  res.redirect("/");
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
  res.redirect("/categories");
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
  deleteCategoryPageGet,
};
