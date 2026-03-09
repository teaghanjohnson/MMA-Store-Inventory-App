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
  await db.deleteCategory();
  res.render("/");
}

async function deleteAllCategoriesGet(req, res) {
  await db.deleteAllCategories();
  res.render("/");
}

module.exports = {
  getCategories,
  createCategoryGet,
  createCategoryPost,
  searchCategoryGet,
  deleteCategoryGet,
  deleteAllCategoriesGet,
};
